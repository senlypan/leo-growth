/**
 * Leo Growth - 本地 Mock 数据库
 * 用于在后端 API 完成前模拟真实数据
 */

const MockDB = {
  // 初始化数据库
  init() {
    if (!wx.getStorageSync('mock_initialized')) {
      this.seed()
      wx.setStorageSync('mock_initialized', true)
    }
  },

  // 种子数据
  seed() {
    // 用户信息
    wx.setStorageSync('user', {
      id: 'user_001',
      nickname: 'Leo',
      avatar: '',
      grade: '三年级',
      createdAt: new Date().toISOString()
    })

    // 作业数据
    wx.setStorageSync('homework', [
      {
        id: 'hw_001',
        subject: 'math',
        subjectName: '数学',
        content: '练习册 P35-36：计算题 1-10 题',
        status: 'pending',
        statusText: '未完成',
        createTime: '2026-03-13 08:00',
        deadline: '2026-03-13 21:00',
        images: [],
        note: ''
      },
      {
        id: 'hw_002',
        subject: 'chinese',
        subjectName: '语文',
        content: '背诵古诗《春晓》，并默写',
        status: 'completed',
        statusText: '已完成',
        createTime: '2026-03-12 08:00',
        deadline: '2026-03-12 21:00',
        images: [],
        note: ''
      }
    ])

    // 错题数据
    wx.setStorageSync('mistakes', [
      {
        id: 'mk_001',
        subject: 'math',
        subjectName: '数学',
        question: '计算：25 × 4 = ?',
        userAnswer: '25 × 4 = 90',
        correctAnswer: '25 × 4 = 100',
        errorType: 'calculation',
        errorTypeName: '计算错误',
        knowledgePoint: '两位数乘法',
        status: 'unreviewed',
        statusText: '待复习',
        createTime: '2026-03-12 10:30',
        reviewCount: 0,
        images: []
      },
      {
        id: 'mk_002',
        subject: 'chinese',
        subjectName: '语文',
        question: '《春晓》的作者是谁？',
        userAnswer: '李白',
        correctAnswer: '孟浩然',
        errorType: 'concept',
        errorTypeName: '概念不清',
        knowledgePoint: '古诗常识',
        status: 'reviewed',
        statusText: '已掌握',
        createTime: '2026-03-10 14:20',
        reviewCount: 3,
        lastReviewTime: '2026-03-12 20:00',
        images: []
      }
    ])

    // 积分数据
    wx.setStorageSync('points', {
      total: 150,
      history: [
        { id: 1, action: '完成作业', points: 10, time: '2026-03-13 09:00' },
        { id: 2, action: '录入错题', points: 5, time: '2026-03-13 09:30' },
        { id: 3, action: '复习错题', points: 8, time: '2026-03-13 10:00' }
      ]
    })

    // 设置
    wx.setStorageSync('settings', {
      notifications: true,
      reminder: true,
      reminderTime: '20:00'
    })
  },

  // 通用 CRUD 操作
  get(collection) {
    return wx.getStorageSync(collection) || []
  },

  getById(collection, id) {
    const items = this.get(collection)
    return items.find(item => item.id === id)
  },

  add(collection, item) {
    const items = this.get(collection)
    item.id = item.id || `${collection}_${Date.now()}`
    item.createdAt = item.createdAt || new Date().toISOString()
    items.unshift(item)
    wx.setStorageSync(collection, items)
    return item
  },

  update(collection, id, updates) {
    const items = this.get(collection)
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() }
      wx.setStorageSync(collection, items)
      return items[index]
    }
    return null
  },

  delete(collection, id) {
    const items = this.get(collection)
    const filtered = items.filter(item => item.id !== id)
    wx.setStorageSync(collection, filtered)
    return true
  },

  // 作业相关操作
  homework: {
    getAll(filters = {}) {
      let homework = MockDB.get('homework')
      
      if (filters.subject) {
        homework = homework.filter(h => h.subject === filters.subject)
      }
      
      if (filters.status) {
        homework = homework.filter(h => h.status === filters.status)
      }
      
      return homework
    },

    add(data) {
      return MockDB.add('homework', {
        ...data,
        status: 'pending',
        statusText: '未完成'
      })
    },

    complete(id, submitData) {
      return MockDB.update('homework', id, {
        status: 'submitted',
        statusText: '待批改',
        ...submitData,
        submitTime: new Date().toISOString()
      })
    },

    check(id, checkData) {
      return MockDB.update('homework', id, {
        status: 'checked',
        statusText: '已批改',
        ...checkData,
        checkTime: new Date().toISOString()
      })
    }
  },

  // 错题相关操作
  mistakes: {
    getAll(filters = {}) {
      let mistakes = MockDB.get('mistakes')
      
      if (filters.subject) {
        mistakes = mistakes.filter(m => m.subject === filters.subject)
      }
      
      if (filters.status) {
        mistakes = mistakes.filter(m => m.status === filters.status)
      }
      
      return mistakes
    },

    add(data) {
      return MockDB.add('mistakes', {
        ...data,
        status: 'unreviewed',
        statusText: '待复习',
        reviewCount: 0
      })
    },

    review(id, reviewData) {
      const mistake = MockDB.getById('mistakes', id)
      return MockDB.update('mistakes', id, {
        ...reviewData,
        reviewCount: (mistake.reviewCount || 0) + 1,
        lastReviewTime: new Date().toISOString()
      })
    },

    master(id) {
      return MockDB.update('mistakes', id, {
        status: 'reviewed',
        statusText: '已掌握'
      })
    }
  },

  // 积分相关操作
  points: {
    getTotal() {
      const points = MockDB.get('points')
      return points.total || 0
    },

    add(action, points) {
      const data = MockDB.get('points')
      const record = {
        id: Date.now(),
        action,
        points,
        time: new Date().toISOString().replace('T', ' ').substring(0, 16)
      }
      data.history.unshift(record)
      data.total += points
      wx.setStorageSync('points', data)
      return record
    }
  }
}

// 自动初始化
MockDB.init()

module.exports = MockDB
