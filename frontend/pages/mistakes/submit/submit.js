// pages/mistakes/submit/submit.js - 错题录入（更新版）
const MockDB = require('../../../data/mock')

Page({
  data: {
    subject: 'math',
    question: '',
    userAnswer: '',
    correctAnswer: '',
    errorType: '',
    knowledgePoint: '',
    note: '',
    images: [],
    isSubmitting: false,
    homeworkId: null
  },

  onLoad(options) {
    // 从作业详情加入错题
    if (options.homeworkId) {
      const homework = MockDB.homework.getById(options.homeworkId)
      if (homework) {
        this.setData({
          homeworkId: homework.id,
          question: homework.content,
          subject: homework.subject
        })
      }
    }
  },

  // 选择科目
  selectSubject(e) {
    this.setData({ subject: e.currentTarget.dataset.subject })
  },

  // 题目内容变化
  onQuestionChange(e) {
    this.setData({ question: e.detail.value })
  },

  // 错误答案变化
  onUserAnswerChange(e) {
    this.setData({ userAnswer: e.detail.value })
  },

  // 正确答案变化
  onCorrectAnswerChange(e) {
    this.setData({ correctAnswer: e.detail.value })
  },

  // 选择错误类型
  selectErrorType(e) {
    this.setData({ errorType: e.currentTarget.dataset.type })
  },

  // 知识点变化
  onKnowledgeChange(e) {
    this.setData({ knowledgePoint: e.detail.value })
  },

  // 备注变化
  onNoteChange(e) {
    this.setData({ note: e.detail.value })
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

  // 提交错题
  async submitMistake() {
    if (this.data.isSubmitting) return
    
    if (!this.data.subject) {
      wx.showToast({ title: '请选择科目', icon: 'none' })
      return
    }
    
    if (!this.data.question) {
      wx.showToast({ title: '请输入题目内容', icon: 'none' })
      return
    }
    
    if (!this.data.userAnswer) {
      wx.showToast({ title: '请输入你的答案', icon: 'none' })
      return
    }
    
    if (!this.data.correctAnswer) {
      wx.showToast({ title: '请输入正确答案', icon: 'none' })
      return
    }
    
    if (!this.data.errorType) {
      wx.showToast({ title: '请选择错误类型', icon: 'none' })
      return
    }
    
    this.setData({ isSubmitting: true })
    wx.showLoading({ title: '保存中...', mask: true })
    
    try {
      const mistake = {
        id: 'mk_' + Date.now(),
        subject: this.data.subject,
        subjectName: this.getSubjectName(this.data.subject),
        question: this.data.question,
        userAnswer: this.data.userAnswer,
        correctAnswer: this.data.correctAnswer,
        errorType: this.data.errorType,
        errorTypeName: this.getErrorTypeName(this.data.errorType),
        knowledgePoint: this.data.knowledgePoint,
        note: this.data.note,
        images: this.data.images,
        status: 'unreviewed',
        statusText: '待复习',
        createTime: this.formatDate(new Date()),
        reviewCount: 0,
        homeworkId: this.data.homeworkId
      }
      
      MockDB.mistakes.add(mistake)
      MockDB.points.add('录入错题', 5)
      
      wx.hideLoading()
      wx.showToast({ title: '保存成功', icon: 'success' })
      
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    } catch (error) {
      console.error('保存失败:', error)
      wx.hideLoading()
      wx.showToast({ title: '保存失败', icon: 'none' })
      this.setData({ isSubmitting: false })
    }
  },

  getSubjectName(subject) {
    const names = { chinese: '语文', math: '数学', english: '英语' }
    return names[subject] || subject
  },

  getErrorTypeName(type) {
    const names = {
      calculation: '计算错误',
      concept: '概念不清',
      careless: '审题错误',
      method: '方法不当',
      other: '其他'
    }
    return names[type] || type
  },

  formatDate(date) {
    return date.toISOString().replace('T', ' ').substring(0, 16)
  }
})
