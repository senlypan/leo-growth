// pages/homework/submission/submission.js - 提交记录
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
      checked: '✔️ 已检查'
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({ homeworkId: parseInt(options.id) })
      this.loadHomeworkDetail()
      this.loadSubmissions()
    }
  },

  // 加载作业详情
  async loadHomeworkDetail() {
    try {
      // TODO: 调用后端 API
      // const res = await api.get(`/homework/${this.data.homeworkId}`)
      
      const mockData = {
        id: this.data.homeworkId,
        subject: 'math',
        content: '数学作业：口算题卡 20 道',
        status: 'completed',
        assignDate: '2026-03-11',
        dueDate: '2026-03-12'
      }
      
      this.setData({ homework: mockData })
    } catch (error) {
      console.error('加载作业详情失败:', error)
    }
  },

  // 加载提交记录
  async loadSubmissions() {
    try {
      // TODO: 调用后端 API
      // const res = await api.get(`/homework/${this.data.homeworkId}/submissions`)
      
      // 模拟数据
      const mockSubmissions = [
        {
          id: 1,
          homeworkId: this.data.homeworkId,
          studentId: 1,
          content: '第 5 题不太确定',
          images: ['/tmp/image1.jpg', '/tmp/image2.jpg'],
          submitTime: '2026-03-11 20:30',
          isCorrect: null,
          score: null,
          feedback: '',
          checkedAt: '',
          createTime: '2026-03-11 20:30'
        }
      ]
      
      this.setData({ submissions: mockSubmissions })
    } catch (error) {
      console.error('加载提交记录失败:', error)
    }
  },

  // 去提交
  goToSubmit() {
    wx.navigateTo({
      url: `/pages/homework/submit/submit?id=${this.data.homeworkId}`
    })
  },

  // 预览图片
  previewImages(e) {
    const index = e.currentTarget.dataset.index
    const submission = this.data.submissions.find(s => s.id === e.currentTarget.dataset.id)
    
    if (submission && submission.images) {
      wx.previewImage({
        current: submission.images[index],
        urls: submission.images
      })
    }
  },

  // 查看提交详情
  viewSubmissionDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/homework/submission/detail/detail?id=${id}`
    })
  }
})
