// pages/study/study.js - 学业规划首页
Page({
  data: {},

  // 跳转到能力评估
  goToAssessment() {
    wx.navigateTo({
      url: '/pages/assessment/assessment'
    })
  },

  // 跳转到学习路径
  goToPath() {
    wx.navigateTo({
      url: '/pages/learning/path/path'
    })
  },

  // 跳转到目标管理
  goToGoals() {
    wx.navigateTo({
      url: '/pages/goals/goals'
    })
  },

  // 跳转到学习报告
  goToReport() {
    wx.navigateTo({
      url: '/pages/report/report'
    })
  }
})
