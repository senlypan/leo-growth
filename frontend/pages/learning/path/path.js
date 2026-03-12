// pages/learning/path/path.js - 学习路径
Page({
  data: {
    currentSubject: 'math',
    progress: 30,
    learnedCount: 15,
    learningCount: 5,
    pendingCount: 30,
    
    knowledgePoints: [],
    nextStep: null
  },

  onLoad() {
    this.loadPath()
  },

  // 加载学习路径
  async loadPath() {
    // TODO: 从后端 API 获取
    // const res = await api.get('/learning/path', {
    //   studentId: 1,
    //   subject: this.data.currentSubject
    // })
    
    // 模拟数据
    const mockPoints = [
      {
        id: 1,
        name: '10 以内加减法',
        status: 'learned',
        expanded: false
      },
      {
        id: 2,
        name: '20 以内加减法',
        status: 'learned',
        expanded: false
      },
      {
        id: 3,
        name: '两位数加法',
        status: 'learning',
        expanded: true,
        children: [
          { id: 31, name: '不进位加法', status: 'learned' },
          { id: 32, name: '进位加法', status: 'learning' },
          { id: 33, name: '连续加法', status: 'pending' }
        ]
      },
      {
        id: 4,
        name: '两位数减法',
        status: 'pending',
        expanded: false,
        children: [
          { id: 41, name: '不退位减法', status: 'pending' },
          { id: 42, name: '退位减法', status: 'pending' }
        ]
      },
      {
        id: 5,
        name: '乘法口诀',
        status: 'pending',
        expanded: false
      }
    ]
    
    const nextStep = {
      pointName: '进位加法',
      description: '学习两位数加法的进位运算，掌握进位规则',
      difficulty: 2,
      estimatedTime: 30
    }
    
    this.setData({
      knowledgePoints: mockPoints,
      nextStep
    })
  },

  // 选择科目
  selectSubject(e) {
    const subject = e.currentTarget.dataset.subject
    this.setData({
      currentSubject: subject
    })
    this.loadPath()
  },

  // 展开/收起
  toggleExpand(e) {
    const index = e.currentTarget.dataset.index
    const key = `knowledgePoints[${index}].expanded`
    this.setData({
      [key]: !this.data.knowledgePoints[index].expanded
    })
  },

  // 标记已掌握
  async markLearned(e) {
    const pointId = e.currentTarget.dataset.pointId
    const point = this.findPointById(pointId)
    
    wx.showModal({
      title: '📚 学会了吗？',
      content: `确定已经掌握"${point.name}"这个知识点了吗？\n\n掌握后就可以学习下一个知识点啦！`,
      confirmText: '学会啦',
      cancelText: '再练练',
      success: async (res) => {
        if (res.confirm) {
          // TODO: 调用后端 API
          // await api.post('/learning/mark-learned', {
          //   studentId: 1,
          //   pointId
          // })
          
          wx.showModal({
            title: '🎉 真棒！',
            content: `你又学会了一个知识点！\n\n继续加油，离目标又近了一步！💪`,
            showCancel: false,
            confirmText: '继续学习'
          })
          
          this.loadPath()
        }
      }
    })
  },
  
  // 根据 ID 查找知识点
  findPointById(pointId) {
    for (const point of this.data.knowledgePoints) {
      if (point.id === pointId) return point
      if (point.children) {
        for (const child of point.children) {
          if (child.id === pointId) return child
        }
      }
    }
    return {}
  },

  // 开始学习
  startLearning() {
    const { nextStep } = this.data
    
    wx.showModal({
      title: '📖 准备学习',
      content: `接下来学习：${nextStep.pointName}\n\n预计用时：${nextStep.estimatedTime}分钟\n\n准备好了吗？`,
      confirmText: '开始学习',
      cancelText: '等会',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '加油！💪',
            icon: 'none',
            duration: 1500
          })
          // TODO: 跳转到学习内容页面
        }
      }
    })
  }
})
