// pages/mistakes/mistakes.js - 错题本（真实数据版）
Page({
  data: {
    mistakeList: [],
    filteredList: [],
    currentSubject: 'all',
    currentStatus: 'all',
    stats: {
      total: 0,
      unreviewed: 0,
      reviewed: 0
    },
    isLoading: true,
    isEmpty: false
  },

  onLoad() {
    this.loadMistakes()
  },

  onShow() {
    // 每次显示时刷新数据
    this.loadMistakes()
  },

  // 加载错题数据
  async loadMistakes() {
    this.setData({ isLoading: true })
    
    try {
      // TODO: 调用真实 API
      // const res = await api.get('/mistakes', {
      //   studentId: app.globalData.studentId
      // })
      
      // 模拟 API 调用延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 从本地存储获取数据（模拟真实数据）
      const mistakes = this.getLocalMistakes()
      
      // 计算统计数据
      const stats = this.calculateStats(mistakes)
      
      this.setData({
        mistakeList: mistakes,
        filteredList: mistakes,
        stats,
        isLoading: false,
        isEmpty: mistakes.length === 0
      })
    } catch (error) {
      console.error('加载错题失败:', error)
      this.setData({ 
        isLoading: false,
        isEmpty: true
      })
      wx.showToast({ title: '加载失败', icon: 'none' })
    }
  },

  // 从本地存储获取错题
  getLocalMistakes() {
    // 尝试从本地存储获取
    const stored = wx.getStorageSync('mistakes')
    if (stored && stored.length > 0) {
      return stored
    }
    
    // 如果没有数据，返回空数组（而不是假数据）
    return []
  },

  // 计算统计数据
  calculateStats(mistakes) {
    return {
      total: mistakes.length,
      unreviewed: mistakes.filter(m => m.status === 'unreviewed').length,
      reviewed: mistakes.filter(m => m.status === 'reviewed').length
    }
  },

  // 选择科目
  selectSubject(e) {
    const subject = e.currentTarget.dataset.subject
    this.setData({ currentSubject: subject })
    this.filterMistakes()
  },

  // 选择状态
  selectStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ currentStatus: status })
    this.filterMistakes()
  },

  // 筛选错题
  filterMistakes() {
    let filtered = [...this.data.mistakeList]
    
    // 按科目筛选
    if (this.data.currentSubject !== 'all') {
      filtered = filtered.filter(m => m.subject === this.data.currentSubject)
    }
    
    // 按状态筛选
    if (this.data.currentStatus !== 'all') {
      filtered = filtered.filter(m => m.status === this.data.currentStatus)
    }
    
    this.setData({ filteredList: filtered })
  },

  // 录入错题
  addMistake() {
    wx.navigateTo({
      url: '/pages/mistakes/submit/submit'
    })
  },

  // 智能复习
  reviewMistake() {
    if (this.data.stats.unreviewed === 0) {
      wx.showToast({ title: '没有待复习的错题', icon: 'none' })
      return
    }
    
    wx.navigateTo({
      url: '/pages/mistakes/review/review'
    })
  },

  // 导出错题
  exportMistakes() {
    if (this.data.mistakeList.length === 0) {
      wx.showToast({ title: '没有可导出的错题', icon: 'none' })
      return
    }
    
    wx.showLoading({ title: '生成中...', mask: true })
    
    // TODO: 调用 API 生成 PDF
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({ title: '已生成 PDF', icon: 'success' })
    }, 1500)
  },

  // 统计分析
  mistakeStats() {
    if (this.data.mistakeList.length === 0) {
      wx.showToast({ title: '数据不足', icon: 'none' })
      return
    }
    
    wx.navigateTo({
      url: '/pages/mistakes/stats/stats'
    })
  },

  // 查看详情
  viewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mistakes/detail/detail?id=${id}`
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadMistakes().then(() => {
      wx.stopPullDownRefresh()
    })
  }
})
