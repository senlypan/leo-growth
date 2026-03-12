// pages/mistakes/submit/submit.js - 录入错题
const api = require('../../../utils/api.js')

Page({
  data: {
    currentSubject: 'math',
    question: '',
    userAnswer: '',
    correctAnswer: '',
    currentErrorType: 'calculation_error',
    knowledgePoint: '',
    images: [],
    canSubmit: false
  },

  onInput() {
    // 检查是否可以提交
    const { currentSubject, question, userAnswer, correctAnswer } = this.data
    const canSubmit = currentSubject && question.trim() && userAnswer.trim() && correctAnswer.trim()
    this.setData({ canSubmit })
  },

  // 选择科目
  selectSubject(e) {
    const subject = e.currentTarget.dataset.subject
    this.setData({ currentSubject: subject })
    this.onInput()
  },

  // 输入题目
  onQuestionInput(e) {
    this.setData({ question: e.detail.value })
    this.onInput()
  },

  // 输入用户答案
  onUserAnswerInput(e) {
    this.setData({ userAnswer: e.detail.value })
    this.onInput()
  },

  // 输入正确答案
  onCorrectAnswerInput(e) {
    this.setData({ correctAnswer: e.detail.value })
    this.onInput()
  },

  // 选择错误类型
  selectErrorType(e) {
    const errorType = e.currentTarget.dataset.type
    this.setData({ currentErrorType: errorType })
  },

  // 输入知识点
  onKnowledgePointInput(e) {
    this.setData({ knowledgePoint: e.detail.value })
  },

  // 上传图片
  uploadImage() {
    const that = this
    wx.chooseMedia({
      count: 9 - this.data.images.length,
      mediaType: ['image'],
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFiles = res.tempFiles
        const newImages = tempFiles.map(file => file.tempFilePath)
        
        this.setData({
          images: [...this.data.images, ...newImages]
        })
      }
    })
  },

  // 删除图片
  deleteImage(e) {
    const index = e.currentTarget.dataset.index
    const images = this.data.images
    images.splice(index, 1)
    this.setData({ images })
  },

  // 提交错题
  async submitMistake() {
    if (!this.data.canSubmit) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '保存中...',
      mask: true
    })

    try {
      const mistakeData = {
        studentId: 1, // TODO: 从全局获取当前学生 ID
        subject: this.data.currentSubject,
        question: this.data.question.trim(),
        userAnswer: this.data.userAnswer.trim(),
        correctAnswer: this.data.correctAnswer.trim(),
        errorType: this.data.currentErrorType,
        knowledgePoint: this.data.knowledgePoint.trim(),
        reviewed: false
      }

      // TODO: 调用后端 API
      // const res = await api.post('/mistakes', mistakeData)
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 500))
      
      wx.hideLoading()
      
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      })

      // 延迟返回
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)

    } catch (error) {
      console.error('保存错题失败:', error)
      wx.hideLoading()
      wx.showToast({
        title: '保存失败，请重试',
        icon: 'none'
      })
    }
  }
})
