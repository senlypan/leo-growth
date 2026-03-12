// pages/homework/detail/detail.js - 作业详情
const api = require('../../../utils/api.js')

Page({
  data: {
    homeworkId: 0,
    homework: {},
    submissions: [],
    
    subjectNames: {
      chinese: '📖 语文',
      math: '🔢 数学',
      english: '🔤 英语'
    },
    
    statusNames: {
      pending: '⏳ 未完成',
      completed: '✅ 已完成',
      checked: '✓ 已检查'
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        homeworkId: parseInt(options.id)
      })
      this.loadHomeworkDetail()
      this.loadSubmissions()
    }
  },

  // 加载作业详情
  async loadHomeworkDetail() {
    try {
      // TODO: 调用后端 API
      // const res = await api.get(`/homeworks/${this.data.homeworkId}`)
      
      // 模拟数据
      const mockData = {
        id: this.data.homeworkId,
        subject: 'chinese',
        content: '完成练习册第 5 页，背诵古诗《春晓》',
        status: 'pending',
        assignDate: '2026-03-11',
        dueDate: '2026-03-12'
      }
      
      this.setData({
        homework: mockData
      })
    } catch (error) {
      console.error('加载作业详情失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 加载提交记录
  async loadSubmissions() {
    try {
      // TODO: 调用后端 API
      // const res = await api.get(`/homeworks/${this.data.homeworkId}/submissions`)
      
      // 模拟数据（用 emoji 代替图片）
      const mockSubmissions = [
        {
          id: 1,
          submitTime: '2026-03-11 20:30',
          isCorrect: null,
          imageEmojis: ['📝', '✏️'], // 用 emoji 代替图片
          feedback: '',
          checkedAt: ''
        }
      ]
      
      this.setData({
        submissions: mockSubmissions
      })
    } catch (error) {
      console.error('加载提交记录失败:', error)
    }
  },

  // 去提交作业
  goToSubmit() {
    wx.navigateTo({
      url: `/pages/homework/submit/submit?id=${this.data.homeworkId}`
    })
  },

  // 去检查作业（家长）
  goToCheck() {
    wx.navigateTo({
      url: `/pages/homework/check/check?id=${this.data.homeworkId}`
    })
  },

  // 查看提交记录
  goToSubmission() {
    wx.navigateTo({
      url: `/pages/homework/submission/submission?id=${this.data.homeworkId}`
    })
  },

  // 预览图片
  previewImage(e) {
    const src = e.currentTarget.dataset.src
    wx.previewImage({
      current: src,
      urls: [src]
    })
  }
})
