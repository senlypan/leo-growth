// pages/mistakes/detail/detail.js - 错题详情
const api = require('../../../utils/api.js')

Page({
  data: {
    mistakeId: 0,
    mistake: {},
    
    subjectNames: {
      chinese: '📖 语文',
      math: '🔢 数学',
      english: '🔤 英语'
    },
    
    errorTypeNames: {
      calculation_error: '计算错误',
      knowledge_error: '知识点错误',
      memory_error: '记忆错误',
      careless_error: '粗心错误',
      understanding_error: '理解错误'
    }
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        mistakeId: parseInt(options.id)
      })
      this.loadMistakeDetail()
    }
  },

  // 加载错题详情
  async loadMistakeDetail() {
    try {
      // TODO: 调用后端 API
      // const res = await api.get(`/mistakes/${this.data.mistakeId}`)
      
      // 模拟数据
      const mockData = {
        id: this.data.mistakeId,
        subject: 'math',
        question: '25 + 17 = ?',
        userAnswer: '32',
        correctAnswer: '42',
        knowledgePoint: '两位数加法',
        errorType: 'calculation_error',
        reviewed: false,
        createTime: '2026-03-11',
        reviewTime: '',
        analysis: '计算时要注意进位，25+17 应该先算 5+7=12，进位 1，再算 2+1+1=4'
      }
      
      this.setData({
        mistake: mockData
      })
    } catch (error) {
      console.error('加载错题详情失败:', error)
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 切换复习状态
  async toggleReview() {
    const reviewed = !this.data.mistake.reviewed
    
    wx.showLoading({
      title: '更新中...',
      mask: true
    })

    try {
      // TODO: 调用后端 API
      // await api.put(`/mistakes/${this.data.mistakeId}/review`)
      
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 300))
      
      wx.hideLoading()
      
      this.setData({
        'mistake.reviewed': reviewed,
        'mistake.reviewTime': reviewed ? new Date().toLocaleDateString() : ''
      })
      
      wx.showToast({
        title: reviewed ? '已标记为已掌握' : '已标记为待复习',
        icon: 'success'
      })
    } catch (error) {
      console.error('更新复习状态失败:', error)
      wx.hideLoading()
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      })
    }
  },

  // 删除错题
  deleteMistake() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这道错题吗？删除后无法恢复。',
      confirmColor: '#FA5151',
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中...',
            mask: true
          })

          try {
            // TODO: 调用后端 API
            // await api.del(`/mistakes/${this.data.mistakeId}`)
            
            // 模拟 API 调用
            await new Promise(resolve => setTimeout(resolve, 300))
            
            wx.hideLoading()
            
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
            
            setTimeout(() => {
              wx.navigateBack()
            }, 1500)
          } catch (error) {
            console.error('删除失败:', error)
            wx.hideLoading()
            wx.showToast({
              title: '删除失败',
              icon: 'none'
            })
          }
        }
      }
    })
  }
})
