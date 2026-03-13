// pages/homework/submit/submit.js - 提交作业
const MockDB = require('../../../data/mock')

Page({
  data: {
    homework: null,
    images: [],
    note: '',
    isSubmitting: false
  },

  onLoad(options) {
    const homeworkId = options.id
    if (homeworkId) {
      const homework = MockDB.homework.getById(homeworkId)
      this.setData({ homework })
    }
  },

  // 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 9 - this.data.images.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: (res) => {
        const tempFiles = res.tempFiles.map(file => file.tempFilePath)
        this.setData({
          images: [...this.data.images, ...tempFiles]
        })
      }
    })
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images.filter((_, i) => i !== index)
    this.setData({ images })
  },

  // 备注变化
  onNoteChange(e) {
    this.setData({ note: e.detail.value })
  },

  // 提交作业
  async submitHomework() {
    if (this.data.isSubmitting) return
    
    if (this.data.images.length === 0) {
      wx.showToast({ title: '请上传作业照片', icon: 'none' })
      return
    }
    
    this.setData({ isSubmitting: true })
    wx.showLoading({ title: '提交中...', mask: true })
    
    try {
      // 更新作业状态
      MockDB.homework.complete(this.data.homework.id, {
        images: this.data.images,
        note: this.data.note
      })
      
      // 添加积分
      MockDB.points.add('提交作业', 5)
      
      wx.hideLoading()
      wx.showToast({ title: '提交成功', icon: 'success' })
      
      // 跳转到完成页
      setTimeout(() => {
        wx.navigateTo({
          url: `/pages/homework/completed/completed?id=${this.data.homework.id}`
        })
      }, 1500)
    } catch (error) {
      console.error('提交失败:', error)
      wx.hideLoading()
      wx.showToast({ title: '提交失败', icon: 'none' })
      this.setData({ isSubmitting: false })
    }
  }
})
