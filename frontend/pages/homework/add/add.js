// pages/homework/add/add.js - 作业录入
Page({
  data: {
    subject: '',
    images: [],
    recognizedText: '',
    deadline: '',
    note: ''
  },

  onLoad() {
    // 默认选择第一个科目
    this.setData({ subject: 'math' })
  },

  // 选择科目
  selectSubject(e) {
    this.setData({ subject: e.currentTarget.dataset.subject })
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
        // 上传图片后自动 AI 识别
        if (this.data.images.length > 0) {
          this.recognizeText()
        }
      }
    })
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images.filter((_, i) => i !== index)
    this.setData({ images })
  },

  // AI 识别文字
  async recognizeText() {
    wx.showLoading({ title: 'AI 识别中...', mask: true })
    
    try {
      // TODO: 调用 OCR API
      // const res = await wx.cloud.callFunction({
      //   name: 'ocr',
      //   data: { image: this.data.images[0] }
      // })
      
      // 模拟识别
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockText = '数学练习册 P35-36\n1. 计算题\n2. 应用题\n3. 思考题'
      
      this.setData({ recognizedText: mockText })
      
      wx.hideLoading()
      wx.showToast({ title: '识别完成', icon: 'success' })
    } catch (error) {
      console.error('识别失败:', error)
      wx.hideLoading()
      wx.showToast({ title: '识别失败', icon: 'none' })
    }
  },

  // 重新识别
  reRecognize() {
    this.recognizeText()
  },

  // 编辑识别结果
  editRecognized() {
    // textarea 已经可编辑
  },

  // 识别内容变化
  onRecognizedChange(e) {
    this.setData({ recognizedText: e.detail.value })
  },

  // 选择截止时间
  chooseDateTime() {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    wx.showDatePicker({
      value: Math.floor(tomorrow.getTime() / 1000),
      step: 5,
      success: (res) => {
        const date = new Date(res.date * 1000)
        this.setData({
          deadline: `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
        })
      }
    })
  },

  // 备注变化
  onNoteChange(e) {
    this.setData({ note: e.detail.value })
  },

  // 提交作业
  async submitHomework() {
    // 验证
    if (!this.data.subject) {
      wx.showToast({ title: '请选择科目', icon: 'none' })
      return
    }
    
    if (this.data.images.length === 0) {
      wx.showToast({ title: '请上传作业照片', icon: 'none' })
      return
    }
    
    if (!this.data.recognizedText) {
      wx.showToast({ title: '请确认识别内容', icon: 'none' })
      return
    }
    
    wx.showLoading({ title: '创建中...', mask: true })
    
    try {
      // TODO: 调用 API 创建作业
      // await api.post('/homework', {
      //   subject: this.data.subject,
      //   images: this.data.images,
      //   content: this.data.recognizedText,
      //   deadline: this.data.deadline,
      //   note: this.data.note
      // })
      
      // 模拟创建
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      wx.hideLoading()
      wx.showToast({ title: '创建成功', icon: 'success' })
      
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    } catch (error) {
      console.error('创建失败:', error)
      wx.hideLoading()
      wx.showToast({ title: '创建失败', icon: 'none' })
    }
  }
})
