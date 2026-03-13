// pages/homework/homework.js - 使用 Mock 数据
const MockDB = require('../../data/mock')

Page({
  data: {
    homeworkList: [],
    filteredList: [],
    currentSubject: 'all',
    currentStatus: 'all',
    isLoading: true,
    isEmpty: false
  },

  onLoad() {
    this.loadHomework()
  },

  onShow() {
    // 每次显示时刷新数据
    this.loadHomework()
  },

  // 加载作业数据
  async loadHomework() {
    this.setData({ isLoading: true })
    
    try {
      // 从 Mock 数据库加载
      const homework = MockDB.homework.getAll()
      
      this.setData({
        homeworkList: homework,
        filteredList: homework,
        isLoading: false,
        isEmpty: homework.length === 0
      })
    } catch (error) {
      console.error('加载作业失败:', error)
      this.setData({ 
        isLoading: false,
        isEmpty: true
      })
    }
  },

  // 筛选作业
  filterHomework() {
    let filtered = [...this.data.homeworkList]
    
    // 按科目筛选
    if (this.data.currentSubject !== 'all') {
      filtered = filtered.filter(h => h.subject === this.data.currentSubject)
    }
    
    // 按状态筛选
    if (this.data.currentStatus !== 'all') {
      filtered = filtered.filter(h => h.status === this.data.currentStatus)
    }
    
    this.setData({ filteredList: filtered })
  },

  // 选择科目
  selectSubject(e) {
    const subject = e.currentTarget.dataset.subject
    this.setData({ currentSubject: subject })
    this.filterHomework()
  },

  // 选择状态
  selectStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({ currentStatus: status })
    this.filterHomework()
  },

  // 添加作业
  addHomework() {
    wx.navigateTo({
      url: '/pages/homework/add/add'
    })
  },

  // 查看详情
  viewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/homework/detail/detail?id=${id}`
    })
  },

  // 提交作业
  submitHomework(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/homework/submit/submit?id=${id}`
    })
  },

  // 检查作业
  checkHomework(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/homework/check/check?id=${id}`
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadHomework().then(() => {
      wx.stopPullDownRefresh()
    })
  }
})
