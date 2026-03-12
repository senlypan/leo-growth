// pages/report/report.js - 学习报告
const api = require('../../utils/api.js')

Page({
  data: {
    currentPeriod: 'weekly',
    loading: false,
    
    // 概览数据
    overview: {
      totalHomework: 0,
      completedHomework: 0,
      completionRate: 0,
      avgScore: 0,
      totalMistakes: 0,
      reviewedMistakes: 0,
      mistakeReviewRate: 0
    },
    
    // 科目统计
    subjectStats: {
      chinese: { homework: 0, avgScore: 0, mistakes: 0 },
      math: { homework: 0, avgScore: 0, mistakes: 0 },
      english: { homework: 0, avgScore: 0, mistakes: 0 }
    },
    
    // 错题分析
    mistakeAnalysis: {
      totalMistakes: 0,
      reviewedCount: 0,
      reviewRate: 0,
      weakKnowledgePoints: []
    },
    
    // 学习建议
    suggestions: []
  },

  onLoad() {
    this.loadReport()
  },

  onShow() {
    this.loadReport()
  },

  // 加载报告
  async loadReport() {
    this.setData({ loading: true })
    
    try {
      // TODO: 调用后端 API
      // const res = await api.get('/report/full-report', {
      //   studentId: 1,
      //   period: this.data.currentPeriod
      // })
      
      // 模拟数据
      await new Promise(resolve => setTimeout(resolve, 500))
      const mockData = this.getMockReport()
      
      this.setData({
        overview: mockData.overview,
        subjectStats: mockData.subjectStats,
        mistakeAnalysis: mockData.mistakeAnalysis,
        suggestions: mockData.suggestions,
        loading: false
      })
    } catch (error) {
      console.error('加载报告失败:', error)
      this.setData({ loading: false })
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 获取模拟报告数据
  getMockReport() {
    return {
      overview: {
        totalHomework: 15,
        completedHomework: 12,
        completionRate: 80,
        avgScore: 88.5,
        totalMistakes: 23,
        reviewedMistakes: 18,
        mistakeReviewRate: 78.3
      },
      subjectStats: {
        chinese: { homework: 5, avgScore: 90, mistakes: 8 },
        math: { homework: 6, avgScore: 85, mistakes: 10 },
        english: { homework: 4, avgScore: 92, mistakes: 5 }
      },
      mistakeAnalysis: {
        totalMistakes: 23,
        reviewedCount: 18,
        reviewRate: 78.3,
        weakKnowledgePoints: [
          { point: '两位数加法', count: 5, subject: 'math' },
          { point: '古诗文背诵', count: 4, subject: 'chinese' },
          { point: '单词记忆', count: 3, subject: 'english' },
          { point: '乘法口诀', count: 3, subject: 'math' },
          { point: '阅读理解', count: 2, subject: 'chinese' }
        ]
      },
      suggestions: [
        {
          type: 'strength',
          priority: 'high',
          title: '英语表现优秀',
          content: '本周英语作业正确率 92%，继续保持！',
          icon: '🌟'
        },
        {
          type: 'improvement',
          priority: 'high',
          title: '数学需要加强',
          content: '数学错题最多（10 道），建议重点复习两位数加法和乘法口诀',
          icon: '📚'
        },
        {
          type: 'improvement',
          priority: 'medium',
          title: '减少粗心错误',
          content: '粗心错误 7 道，做题时要更仔细哦',
          icon: '⚠️'
        },
        {
          type: 'encouragement',
          priority: 'low',
          title: '错题复习很认真',
          content: '已复习 18 道错题，复习率 78%，继续加油！',
          icon: '💪'
        }
      ]
    }
  },

  // 选择周期
  selectPeriod(e) {
    const period = e.currentTarget.dataset.period
    this.setData({ currentPeriod: period })
    this.loadReport()
  },

  // 选择日期范围
  selectDateRange() {
    wx.showToast({
      title: '自定义日期开发中',
      icon: 'none'
    })
  }
})
