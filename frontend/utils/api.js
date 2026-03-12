// utils/api.js - API 请求封装
const app = getApp()

// API 基础地址
const BASE_URL = app.globalData.apiBaseUrl || 'http://localhost:3000/api'

/**
 * 封装请求
 */
function request(options) {
  return new Promise((resolve, reject) => {
    // 获取 token
    const token = wx.getStorageSync('token')
    
    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          // 未授权，跳转登录
          wx.removeStorageSync('token')
          wx.reLaunch({
            url: '/pages/login/login'
          })
          reject(new Error('未授权'))
        } else {
          wx.showToast({
            title: res.data.message || '请求失败',
            icon: 'none'
          })
          reject(res.data)
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

/**
 * GET 请求
 */
function get(url, data) {
  return request({
    url,
    method: 'GET',
    data
  })
}

/**
 * POST 请求
 */
function post(url, data) {
  return request({
    url,
    method: 'POST',
    data
  })
}

/**
 * PUT 请求
 */
function put(url, data) {
  return request({
    url,
    method: 'PUT',
    data
  })
}

/**
 * DELETE 请求
 */
function del(url, data) {
  return request({
    url,
    method: 'DELETE',
    data
  })
}

/**
 * 文件上传
 */
function uploadFile(url, filePath, name = 'file') {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')
    
    wx.uploadFile({
      url: BASE_URL + url,
      filePath,
      name,
      header: {
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        const data = JSON.parse(res.data)
        if (data.code === 200) {
          resolve(data)
        } else {
          wx.showToast({
            title: data.message || '上传失败',
            icon: 'none'
          })
          reject(data)
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

module.exports = {
  request,
  get,
  post,
  put,
  del,
  uploadFile
}
