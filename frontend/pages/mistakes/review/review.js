// pages/mistakes/review/review.js - 错题复习页
const MockDB = require('../../../data/mock')

Page({
  data: {
    mistakes: [],
    currentIndex: 0,
    total: 0,
    progress: 0,
    currentMistake: null
  },

  onLoad() {
    this.loadReviewQueue()
  },

  // 加载复习队列
  loadReviewQueue() {
    // 获取待复习的错题
    const mistakes = MockDB.mistakes.getAll({ status: 'unreviewed' })
    
    if (mistakes.length === 0) {
      wx.showToast({ title: '没有待复习的错题', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1500)
      return
    }
    
    this.setData({
      mistakes,
      total: mistakes.length,
      currentIndex: 0,
      currentMistake: mistakes[0],
      progress: 100 / mistakes.length
    })
  },

  // 标记为不会
  markIncorrect() {
    const current = this.data.currentMistake
    
    // 更新错题
    MockDB.mistakes.review(current.id, {
      isCorrect: false
    })
    
    wx.showToast({ title: '已加入复习计划', icon: 'none' })
    
    this.nextQuestion()
  },

  // 标记为掌握
  markCorrect() {
    const current = this.data.currentMistake
    
    // 更新错题
    MockDB.mistakes.review(current.id, {
      isCorrect: true
    })
    
    // 添加积分
    MockDB.points.add('复习错题', 8)
    
    wx.showToast({ title: '太棒了！+8 积分', icon: 'success' })
    
    this.nextQuestion()
  },

  // 下一题
  nextQuestion() {
    const nextIndex = this.data.currentIndex + 1
    
    if (nextIndex >= this.data.total) {
      // 复习完成
      this.showReviewComplete()
      return
    }
    
    this.setData({
      currentIndex: nextIndex,
      currentMistake: this.data.mistakes[nextIndex],
      progress: ((nextIndex + 1) / this.data.total) * 100
    })
  },

  // 显示复习完成
  showReviewComplete() {
    wx.showModal({
      title: '复习完成！',
      content: `本次复习了 ${this.data.total} 道错题，继续加油！`,
      showCancel: false,
      success: () => {
        wx.navigateBack()
      }
    })
  }
})
