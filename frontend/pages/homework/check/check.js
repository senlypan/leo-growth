// pages/homework/check/check.js - 检查作业
const api = require('../../../utils/api.js')

Page({
  data: {
    homeworkId: 0,
    homework: {},
    latestSubmission: {},
    
    checkResult: {
      isCorrect: null,
      score: null,
      feedback: ''
    },
    
    canSubmit: false,
    
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
        submissions: [
          {
            id: 1,
            content: '第 5 题不太确定',
            images: ['/tmp/image1.jpg', '/tmp/image2.jpg'],
            submitTime: '2026-03-11 20:30',
            isCorrect: null,
            score: null,
            feedback: ''
          }
        ]
      }
      
      this.setData({
        homework: mockData,
        latestSubmission: mockData.submissions[0] || {}
      })
      
      this.checkCanSubmit()
    } catch (error) {
      console.error('加载作业详情失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 检查是否可以提交
  checkCanSubmit() {
    const { checkResult } = this.data
    const canSubmit = checkResult.isCorrect !== null
    this.setData({ canSubmit })
  },

  // 选择正确性
  selectCorrect(e) {
    const isCorrect = e.currentTarget.dataset.value === 'true'
    this.setData({
      'checkResult.isCorrect': isCorrect,
      'checkResult.score': isCorrect ? this.data.checkResult.score : null
    })
    this.checkCanSubmit()
  },

  // 选择评分
  selectScore(e) {
    const score = e.currentTarget.dataset.score
    this.setData({
      'checkResult.score': score
    })
  },

  // 输入反馈
  onFeedbackInput(e) {
    this.setData({
      'checkResult.feedback': e.detail.value
    })
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.latestSubmission.images[index],
      urls: this.data.latestSubmission.images
    })
  },

  // 提交检查
  async submitCheck() {
    if (!this.data.canSubmit) {
      wx.showToast({
        title: '请选择作业完成情况',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认检查',
      content: '确定要提交检查结果吗？',
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '提交中...',
            mask: true
          })

          try {
            const checkData = {
              homeworkId: this.data.homeworkId,
              ...this.data.checkResult,
              checkedAt: new Date().toISOString()
            }

            // TODO: 调用后端 API
            // await api.post(`/homework/${this.data.homeworkId}/check`, checkData)
            
            // 模拟 API 调用
            await new Promise(resolve => setTimeout(resolve, 800))
            
            wx.hideLoading()
            
            wx.showToast({
              title: '检查完成',
              icon: 'success'
            })

            // 延迟返回
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)

          } catch (error) {
            console.error('提交检查失败:', error)
            wx.hideLoading()
            wx.showToast({
              title: '提交失败，请重试',
              icon: 'none'
            })
          }
        }
      }
    })
  }
})
