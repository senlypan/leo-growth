// pages/index/index.js - 首页
Page({
  data: {
    userInfo: {
      nickname: '潘灏成',
      avatar: ''
    },
    stats: {
      homeworkCount: 0,
      mistakeCount: 0,
      continueDays: 0
    }
  },

  onLoad() {
    this.loadUserInfo()
    this.loadStats()
  },

  onShow() {
    this.loadStats()
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
  },

  // 加载统计数据
  loadStats() {
    // TODO: 从后端 API 获取真实数据
    // 暂时使用模拟数据
    this.setData({
      stats: {
        homeworkCount: 3,
        mistakeCount: 12,
        continueDays: 7
      }
    })
  },

  // 跳转到作业辅导
  goToHomework() {
    wx.switchTab({
      url: '/pages/homework/homework'
    })
  },

  // 跳转到学业规划
  goToStudy() {
    wx.navigateTo({
      url: '/pages/study/assessment/assessment'
    })
  },

  // 跳转到体能训练
  goToFitness() {
    wx.navigateTo({
      url: '/pages/fitness/test/test'
    })
  },

  // 跳转到错题本
  goToMistakes() {
    wx.switchTab({
      url: '/pages/mistakes/mistakes'
    })
  },

  // 跳转到学习报告
  goToReport() {
    wx.switchTab({
      url: '/pages/report/report'
    })
  },

  // 跳转到学习计划
  goToPlan() {
    wx.navigateTo({
      url: '/pages/study/goals/goals'
    })
  },

  // 跳转到个人中心
  goToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    })
  }
})
