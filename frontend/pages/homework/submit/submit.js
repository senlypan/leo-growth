// pages/homework/submit/submit.js - 提交作业
const api = require('../../../utils/api.js')

Page({
  data: {
    homeworkId: 0,
    homework: {},
    images: [],
    note: '',
    canSubmit: false,
    isResubmit: false,
    maxImages: 9
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ homeworkId: parseInt(options.id) })
      this.loadHomeworkDetail()
    }
  },

  // 加载作业详情
  async loadHomeworkDetail() {
    try {
      // TODO: 调用后端 API
      // const res = await api.get(`/homework/${this.data.homeworkId}`)
      
      // 模拟数据
      const mockData = {
        id: this.data.homeworkId,
        subject: 'math',
        content: '数学作业：口算题卡 20 道',
        status: 'pending',
        assignDate: '2026-03-11',
        submissions: []
      }
      
      this.setData({
        homework: mockData,
        isResubmit: mockData.status === 'completed'
      })
      
      this.checkCanSubmit()
    } catch (error) {
      console.error('加载作业详情失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 检查是否可以提交
  checkCanSubmit() {
    const { images, homework } = this.data
    const canSubmit = images.length > 0 && homework.status !== 'checked'
    this.setData({ canSubmit })
  },

  // 选择图片
  chooseImage() {
    const remaining = this.data.maxImages - this.data.images.length
    
    if (remaining <= 0) {
      wx.showToast({
        title: `最多上传${this.data.maxImages}张照片`,
        icon: 'none'
      })
      return
    }

    const that = this
    wx.chooseMedia({
      count: remaining,
      mediaType: ['image'],
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFiles = res.tempFiles
        const newImages = tempFiles.map(file => file.tempFilePath)
        
        that.setData({
          images: [...that.data.images, ...newImages]
        })
        that.checkCanSubmit()
      }
    })
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.images[index],
      urls: this.data.images
    })
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images
    images.splice(index, 1)
    this.setData({ images })
    this.checkCanSubmit()
  },

  // 输入文字说明
  onNoteInput(e) {
    this.setData({ note: e.detail.value })
  },

  // 提交作业
  async submitHomework() {
    if (!this.data.canSubmit) {
      if (this.data.images.length === 0) {
        wx.showToast({
          title: '请至少上传一张照片',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '作业已检查，不能重复提交',
          icon: 'none'
        })
      }
      return
    }

    wx.showModal({
      title: '确认提交',
      content: `确定要提交${this.data.isResubmit ? '重新' : ''}作业吗？`,
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '提交中...',
            mask: true
          })

          try {
            const submitData = {
              homeworkId: this.data.homeworkId,
              studentId: 1, // TODO: 从全局获取
              content: this.data.note.trim(),
              images: this.data.images,
              submitTime: new Date().toISOString()
            }

            // TODO: 调用后端 API
            // await api.post(`/homework/${this.data.homeworkId}/submit`, submitData)
            
            // 模拟 API 调用
            await new Promise(resolve => setTimeout(resolve, 800))
            
            wx.hideLoading()
            
            wx.showToast({
              title: '提交成功',
              icon: 'success'
            })

            // 延迟返回
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)

          } catch (error) {
            console.error('提交作业失败:', error)
            wx.hideLoading()
            wx.showToast({
              title: '提交失败，请重试',
              icon: 'none'
            })
          }
        }
      }
    })
  }
})
