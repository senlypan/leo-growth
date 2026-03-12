// pages/goals/goals.js - 目标管理
Page({
  data: {
    currentFilter: 'all',
    showModal: false,
    
    stats: {
      total: 0,
      active: 0,
      completed: 0
    },
    
    goals: [],
    
    form: {
      goalType: 'short-term',
      goalTitle: '',
      goalDescription: '',
      targetDate: ''
    }
  },

  onLoad() {
    this.loadGoals()
  },

  // 加载目标列表
  async loadGoals() {
    // TODO: 从后端 API 获取
    // const res = await api.get('/goals', {
    //   studentId: 1,
    //   status: this.data.currentFilter === 'all' ? undefined : this.data.currentFilter
    // })
    
    // 模拟数据
    const mockGoals = [
      {
        id: 1,
        goalType: 'long-term',
        goalTitle: '背诵 10 首古诗',
        goalDescription: '本学期完成 10 首古诗的背诵',
        targetDate: '2026-03-31',
        progress: 80,
        status: 'active'
      },
      {
        id: 2,
        goalType: 'short-term',
        goalTitle: '掌握乘法口诀',
        goalDescription: '熟练背诵 1-9 的乘法口诀',
        targetDate: '2026-03-25',
        progress: 60,
        status: 'active'
      },
      {
        id: 3,
        goalType: 'short-term',
        goalTitle: '每天阅读 30 分钟',
        goalDescription: '培养阅读习惯',
        targetDate: '2026-03-20',
        progress: 100,
        status: 'completed'
      }
    ]
    
    const stats = {
      total: mockGoals.length,
      active: mockGoals.filter(g => g.status === 'active').length,
      completed: mockGoals.filter(g => g.status === 'completed').length
    }
    
    this.setData({
      goals: mockGoals,
      stats
    })
  },

  // 选择筛选
  selectFilter(e) {
    const filter = e.currentTarget.dataset.filter
    this.setData({
      currentFilter: filter
    })
    this.loadGoals()
  },

  // 显示添加弹窗
  showAddModal() {
    this.setData({
      showModal: true
    })
  },

  // 隐藏弹窗
  hideModal() {
    this.setData({
      showModal: false,
      form: {
        goalType: 'short-term',
        goalTitle: '',
        goalDescription: '',
        targetDate: ''
      }
    })
  },

  // 选择类型
  selectType(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      'form.goalType': type
    })
  },

  // 输入标题
  onTitleInput(e) {
    this.setData({
      'form.goalTitle': e.detail.value
    })
  },

  // 输入描述
  onDescInput(e) {
    this.setData({
      'form.goalDescription': e.detail.value
    })
  },

  // 选择日期
  onDateChange(e) {
    this.setData({
      'form.targetDate': e.detail.value
    })
  },

  // 添加目标
  async addGoal() {
    const { form } = this.data
    
    if (!form.goalTitle.trim()) {
      wx.showToast({
        title: '请先写目标名称哦',
        icon: 'none'
      })
      return
    }
    
    if (!form.targetDate) {
      wx.showToast({
        title: '要选个日期哦',
        icon: 'none'
      })
      return
    }
    
    // TODO: 调用后端 API
    // await api.post('/goals', {
    //   studentId: 1,
    //   ...form
    // })
    
    wx.showModal({
      title: '🎯 目标设定成功！',
      content: `"${form.goalTitle}"\n\n加油！老师相信你一定可以完成的！💪`,
      showCancel: false,
      confirmText: '我会努力'
    })
    
    this.hideModal()
    this.loadGoals()
  },

  // 更新进度
  updateProgress(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showActionSheet({
      itemList: ['25%', '50%', '75%', '100%'],
      success: (res) => {
        const progress = [25, 50, 75, 100][res.tapIndex]
        
        // TODO: 调用后端 API
        // await api.put(`/goals/${id}/progress`, { progress })
        
        wx.showToast({
          title: '已更新',
          icon: 'success'
        })
        
        this.loadGoals()
      }
    })
  },

  // 标记完成
  async markComplete(e) {
    const id = e.currentTarget.dataset.id
    
    wx.showModal({
      title: '🎉 太棒了！',
      content: '真的要标记为完成吗？这可是你的努力成果哦！',
      confirmText: '完成啦',
      cancelText: '再想想',
      success: async (res) => {
        if (res.confirm) {
          // TODO: 调用后端 API
          // await api.put(`/goals/${id}/progress`, { progress: 100 })
          
          // 播放庆祝动画
          wx.showModal({
            title: '🏆 恭喜你！',
            content: '目标完成！你真棒！继续加油，去实现下一个目标吧！🌟',
            showCancel: false,
            confirmText: '耶～'
          })
          
          this.loadGoals()
        }
      }
    })
  }
})
