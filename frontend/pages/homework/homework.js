// pages/homework/homework.js - 作业列表
const api = require('../../utils/api.js')

Page({
  data: {
    homeworkList: [],
    loading: false,
    
    // 筛选条件
    currentSubject: 'all',
    currentStatus: 'all',
    selectedDate: '',
    
    // 日期显示
    today: '',
    tomorrow: '',
    todayStr: '',
    tomorrowStr: '',
    
    // 科目名称
    subjectNames: {
      chinese: '📖 语文',
      math: '🔢 数学',
      english: '🔤 英语'
    },
    
    // 状态名称
    statusNames: {
      pending: '⏳ 未完成',
      completed: '✅ 已完成',
      checked: '✓ 已检查'
    }
  },

  onLoad() {
    this.initDates()
    this.loadHomeworkList()
  },

  onShow() {
    // 每次显示时刷新数据
    this.loadHomeworkList()
  },

  // 初始化日期
  initDates() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const todayStr = `${today.getMonth() + 1}/${today.getDate()}`
    const tomorrowStr = `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`
    
    this.setData({
      today: this.formatDate(today),
      tomorrow: this.formatDate(tomorrow),
      todayStr,
      tomorrowStr,
      selectedDate: this.formatDate(today)
    })
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  // 加载作业列表
  async loadHomeworkList() {
    this.setData({ loading: true })
    
    try {
      // TODO: 调用后端 API
      // const res = await api.get('/homeworks', {
      //   date: this.data.selectedDate,
      //   subject: this.data.currentSubject,
      //   status: this.data.currentStatus
      // })
      
      // 暂时使用模拟数据
      const mockData = this.getMockHomeworkList()
      
      this.setData({
        homeworkList: mockData,
        loading: false
      })
    } catch (error) {
      console.error('加载作业失败:', error)
      this.setData({ loading: false })
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 获取模拟数据
  getMockHomeworkList() {
    const data = [
      {
        id: 1,
        subject: 'chinese',
        content: '完成练习册第 5 页，背诵古诗《春晓》',
        status: 'pending',
        dueDate: this.data.todayStr
      },
      {
        id: 2,
        subject: 'math',
        content: '口算题卡 20 道，完成试卷第一单元',
        status: 'completed',
        dueDate: this.data.todayStr
      },
      {
        id: 3,
        subject: 'english',
        content: '背诵单词 Unit 1，完成听力练习',
        status: 'pending',
        dueDate: this.data.todayStr
      },
      {
        id: 4,
        subject: 'chinese',
        content: '阅读课外书 30 分钟，写读后感',
        status: 'pending',
        dueDate: this.data.tomorrowStr
      }
    ]
    
    // 筛选
    return data.filter(item => {
      if (this.data.currentSubject !== 'all' && item.subject !== this.data.currentSubject) {
        return false
      }
      if (this.data.currentStatus !== 'all' && item.status !== this.data.currentStatus) {
        return false
      }
      return true
    })
  },

  // 选择科目
  selectSubject(e) {
    const subject = e.currentTarget.dataset.subject
    this.setData({
      currentSubject: subject
    })
    this.loadHomeworkList()
  },

  // 选择状态
  selectStatus(e) {
    const status = e.currentTarget.dataset.status
    this.setData({
      currentStatus: status
    })
    this.loadHomeworkList()
  },

  // 选择日期
  selectDate(e) {
    const date = e.currentTarget.dataset.date
    this.setData({
      selectedDate: date
    })
    this.loadHomeworkList()
  },

  // 显示日期选择器
  showDatePicker() {
    // TODO: 实现日期选择器
    wx.showToast({
      title: '日期选择器开发中',
      icon: 'none'
    })
  },

  // 跳转到作业详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/homework/detail/detail?id=${id}`
    })
  },

  // 去提交作业
  goToSubmit(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/homework/submit/submit?id=${id}`
    })
  },

  // 去检查作业（家长）
  goToCheck(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/homework/check/check?id=${id}`
    })
  },

  // 查看提交记录
  goToSubmission(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/homework/submission/submission?id=${id}`
    })
  }
})
