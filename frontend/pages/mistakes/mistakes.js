// pages/mistakes/mistakes.js - 错题本
const api = require('../../utils/api.js')

Page({
  data: {
    mistakeList: [],
    loading: false,
    
    // 筛选条件
    currentSubject: 'all',
    currentStatus: 'all',
    
    // 统计数据
    stats: {
      total: 0,
      unreviewed: 0,
      reviewed: 0
    },
    
    // 科目名称
    subjectNames: {
      chinese: '📖 语文',
      math: '🔢 数学',
      english: '🔤 英语'
    }
  },

  onLoad() {
    this.loadMistakeList()
  },

  onShow() {
    // 每次显示时刷新数据
    this.loadMistakeList()
  },

  // 加载错题列表
  async loadMistakeList() {
    this.setData({ loading: true })
    
    try {
      // TODO: 调用后端 API
      // const res = await api.get('/mistakes', {
      //   subject: this.data.currentSubject,
      //   reviewed: this.data.currentStatus === 'all' ? undefined : this.data.currentStatus === 'reviewed'
      // })
      
      // 模拟数据
      const mockData = this.getMockMistakeList()
      const stats = this.calculateStats(mockData)
      
      this.setData({
        mistakeList: mockData,
        stats,
        loading: false
      })
    } catch (error) {
      console.error('加载错题失败:', error)
      this.setData({ loading: false })
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 获取模拟数据
  getMockMistakeList() {
    const data = [
      {
        id: 1,
        subject: 'math',
        question: '25 + 17 = ?',
        userAnswer: '32',
        correctAnswer: '42',
        knowledgePoint: '两位数加法',
        errorType: 'calculation_error',
        reviewed: false,
        createTime: '2026-03-11'
      },
      {
        id: 2,
        subject: 'chinese',
        question: '《春晓》的作者是谁？',
        userAnswer: '李白',
        correctAnswer: '孟浩然',
        knowledgePoint: '古诗文',
        errorType: 'knowledge_error',
        reviewed: true,
        createTime: '2026-03-10'
      },
      {
        id: 3,
        subject: 'english',
        question: 'apple 的中文意思是？',
        userAnswer: '香蕉',
        correctAnswer: '苹果',
        knowledgePoint: '单词记忆',
        errorType: 'memory_error',
        reviewed: false,
        createTime: '2026-03-11'
      }
    ]
    
    // 筛选
    return data.filter(item => {
      if (this.data.currentSubject !== 'all' && item.subject !== this.data.currentSubject) {
        return false
      }
      if (this.data.currentStatus !== 'all') {
        const isReviewed = this.data.currentStatus === 'reviewed'
        if (item.reviewed !== isReviewed) {
          return false
        }
      }
      return true
    })
  },

  // 计算统计数据
  calculateStats(data) {
    const total = data.length
    const reviewed = data.filter(item => item.reviewed).length
    const unreviewed = total - reviewed
    
    return { total, unreviewed, reviewed }
  },

  // 选择科目
  selectSubject(e) {
    const subject = e.currentTarget.dataset.subject
    this.setData({
      currentSubject: subject
    })
    this.loadMistakeList()
  },

  // 选择状态
  selectStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({
      currentStatus: status
    })
    this.loadMistakeList()
  },

  // 录入错题
  addMistake() {
    wx.navigateTo({
      url: '/pages/mistakes/submit/submit'
    })
  },

  // 导出错题
  exportMistakes() {
    wx.showModal({
      title: '导出错题',
      content: '将错题导出为 PDF 或图片，方便打印复习',
      confirmText: '去导出',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '导出功能开发中',
            icon: 'none'
          })
        }
      }
    })
  },

  // 错题练习
  mistakePractice() {
    wx.showToast({
      title: '错题练习开发中',
      icon: 'none'
    })
  },

  // 错题分析
  mistakeAnalysis() {
    wx.showToast({
      title: '错题分析开发中',
      icon: 'none'
    })
  },

  // 跳转到错题详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mistakes/detail/detail?id=${id}`
    })
  }
})
