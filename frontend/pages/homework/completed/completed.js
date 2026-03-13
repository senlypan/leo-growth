// pages/homework/completed/completed.js - 作业完成页
const MockDB = require('../../../data/mock')

Page({
  data: {
    homework: null,
    score: 0,
    resultClass: 'excellent',
    isFullMarks: false,
    totalPoints: 10,
    hasWrongQuestions: false
  },

  onLoad(options) {
    const homeworkId = options.id
    if (homeworkId) {
      this.loadHomework(homeworkId)
    }
  },

  // 加载作业数据
  loadHomework(id) {
    const homework = MockDB.homework.getById(id)
    if (homework) {
      // 计算分数（模拟）
      const score = homework.score || 95
      const resultClass = score >= 90 ? 'excellent' : score >= 70 ? 'good' : 'need-improve'
      const isFullMarks = score === 100
      
      // 计算积分
      let totalPoints = 10 // 完成作业基础积分
      if (isFullMarks) {
        totalPoints += 5 // 满分奖励
      }
      
      // 是否有错题
      const hasWrongQuestions = score < 100
      
      this.setData({
        homework,
        score,
        resultClass,
        isFullMarks,
        totalPoints,
        hasWrongQuestions
      })
      
      // 添加积分（只添加一次）
      if (!homework.pointsAdded) {
        MockDB.points.add('完成作业', totalPoints)
        MockDB.homework.update(id, { pointsAdded: true })
      }
    }
  },

  // 加入错题本
  addToMistakes() {
    if (!this.data.homework) return
    
    wx.navigateTo({
      url: `/pages/mistakes/submit/submit?homeworkId=${this.data.homework.id}`
    })
  },

  // 开始复习
  startReview() {
    wx.navigateTo({
      url: '/pages/mistakes/review/review'
    })
  },

  // 查看报告
  viewReport() {
    wx.navigateTo({
      url: '/pages/report/report'
    })
  },

  // 返回首页
  goHome() {
    wx.navigateBack({
      delta: 2
    })
  },

  // 继续作业
  continueHomework() {
    wx.navigateBack({
      delta: 1
    })
  }
})
