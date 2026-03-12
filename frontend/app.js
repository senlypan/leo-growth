// app.js - Leo Growth 小程序入口
App({
  onLaunch() {
    console.log('🌟 Leo Growth 小程序启动')
    
    // 初始化用户信息
    this.initUserInfo()
    
    // 检查更新
    this.checkUpdate()
  },

  // 初始化用户信息
  initUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      // 默认用户信息
      const defaultUser = {
        id: 1,
        nickname: '潘灏成',
        avatar: '',
        grade: '二年级'
      }
      wx.setStorageSync('userInfo', defaultUser)
      this.globalData.userInfo = defaultUser
    } else {
      this.globalData.userInfo = userInfo
    }
  },

  // 检查小程序更新
  checkUpdate() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: (res) => {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    apiBaseUrl: 'http://localhost:3000/api', // 后端 API 地址
    version: '1.0.0'
  }
})
