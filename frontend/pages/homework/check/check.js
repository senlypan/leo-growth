// pages/homework/check/check.js - 家长批改页
const MockDB = require('../../../data/mock')

Page({
  data: {
    homework: null,
    isLoading: true,
    aiResult: null,
    score: 95,
    checkResult: 'correct',
    comment: ''
  },

  onLoad(options) {
    const homeworkId = options.id
    if (homeworkId) {
      this.loadHomework(homeworkId)
      this.aiCheck(homeworkId)
    }
  },

  // 加载作业数据
  loadHomework(id) {
    const homework = MockDB.homework.getById(id)
    if (homework) {
      this.setData({ homework, isLoading: false })
    }
  },

  // AI 批改（模拟）
  async aiCheck(id) {
    // 模拟 AI 批改延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟 AI 批改结果
    const accuracy = Math.floor(Math.random() * 15) + 85 // 85-100
    const suggestedScore = accuracy
    const scoreClass = accuracy >= 90 ? 'excellent' : accuracy >= 70 ? 'good' : 'need-improve'
    
    const diagnoses = [
      '完成得很好，继续保持！',
      '有少量错误，注意检查',
      '计算需要更仔细一些',
      '概念理解有误，建议复习'
    ]
    const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)]
    
    this.setData({
      aiResult: { accuracy, suggestedScore, scoreClass, diagnosis }
    })
  },

  // 评分变化
  onScoreChange(e) {
    this.setData({ score: e.detail.value })
  },

  // 选择批改结果
  selectCheckResult(e) {
    this.setData({ checkResult: e.currentTarget.dataset.result })
  },

  // 评语变化
  onCommentChange(e) {
    this.setData({ comment: e.detail.value })
  },

  // 预览图片
  previewImage(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      urls: this.data.homework.images,
      current: src
    })
  },

  // 提交批改
  async submitCheck() {
    if (!this.data.homework) return
    
    wx.showLoading({ title: '提交中...', mask: true })
    
    try {
      // 更新作业状态
      MockDB.homework.check(this.data.homework.id, {
        score: parseInt(this.data.score) || 0,
        checkResult: this.data.checkResult,
        comment: this.data.comment,
        checkTime: new Date().toISOString().replace('T', ' ').substring(0, 16)
      })
      
      // 添加积分（给家长）
      MockDB.points.add('批改作业', 5)
      
      wx.hideLoading()
      wx.showToast({ title: '批改完成', icon: 'success' })
      
      // 跳转到完成页
      setTimeout(() => {
        wx.navigateTo({
          url: `/pages/homework/completed/completed?id=${this.data.homework.id}`
        })
      }, 1500)
    } catch (error) {
      console.error('提交批改失败:', error)
      wx.hideLoading()
      wx.showToast({ title: '提交失败', icon: 'none' })
    }
  }
})
