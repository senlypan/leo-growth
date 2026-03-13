// pages/assessment/report/report.js - 评估报告
Page({
  data: {
    subject: '',
    subjectName: '',
    subjectIcon: '',
    reportDate: '',
    
    report: {
      score: 0,
      strengths: [],
      weaknesses: [],
      suggestions: []
    },
    
    radarData: []
  },

  onLoad(options) {
    const subject = options.subject || 'math'
    this.setData({
      subject,
      subjectName: this.getSubjectName(subject),
      subjectIcon: this.getSubjectIcon(subject),
      reportDate: new Date().toLocaleDateString()
    })
    
    this.loadReport()
  },

  // 获取科目名称
  getSubjectName(subject) {
    const names = {
      chinese: '语文',
      math: '数学',
      english: '英语'
    }
    return names[subject] || subject
  },

  // 获取科目图标
  getSubjectIcon(subject) {
    const icons = {
      chinese: '📖',
      math: '🔢',
      english: '🔤'
    }
    return icons[subject] || '📚'
  },

  // 加载报告
  async loadReport() {
    // TODO: 从后端 API 获取报告
    // const res = await api.get('/assessment/report', {
    //   studentId: 1,
    //   subject: this.data.subject
    // })
    
    // 模拟报告数据
    const mockReport = {
      score: 85,
      strengths: [
        { name: '计算能力', score: 90 },
        { name: '逻辑思维', score: 85 }
      ],
      weaknesses: [
        { name: '空间想象', score: 70, suggestion: '多练习立体几何题目' },
        { name: '应用题', score: 75, suggestion: '每天做 2 道应用题' }
      ],
      suggestions: [
        { icon: '📐', content: '多练习立体几何题目，培养空间想象力' },
        { icon: '📝', content: '每天做 2 道应用题，提高解题能力' },
        { icon: '⏰', content: '建议每周安排 3 次，每次 30 分钟练习' }
      ]
    }
    
    // 雷达图数据 - 微信风格
    const radarData = [
      { name: '计算能力', value: 90, color: '#07C160' },
      { name: '逻辑思维', value: 85, color: '#07C160' },
      { name: '空间想象', value: 70, color: '#FF9F00' },
      { name: '概念理解', value: 80, color: '#07C160' },
      { name: '细心程度', value: 75, color: '#FF9F00' }
    ]
    
    this.setData({
      report: mockReport,
      radarData
    })
    
    // 绘制雷达图
    this.drawRadarChart(radarData)
  },

  // 绘制雷达图
  drawRadarChart(data) {
    const query = wx.createSelectorQuery()
    query.select('.radar-canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0]) return
        
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio
        const width = res[0].width * dpr
        const height = res[0].height * dpr
        
        canvas.width = width
        canvas.height = height
        ctx.scale(dpr, dpr)
        
        const centerX = width / dpr / 2
        const centerY = height / dpr / 2
        const radius = Math.min(width, height) / dpr / 2 * 0.8
        const angleStep = (Math.PI * 2) / data.length
        
        // 绘制背景网格
        ctx.strokeStyle = '#e0e0e0'
        ctx.lineWidth = 1
        for (let i = 1; i <= 5; i++) {
          const r = radius * i / 5
          ctx.beginPath()
          for (let j = 0; j <= data.length; j++) {
            const angle = angleStep * j - Math.PI / 2
            const x = centerX + r * Math.cos(angle)
            const y = centerY + r * Math.sin(angle)
            if (j === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.closePath()
          ctx.stroke()
        }
        
        // 绘制轴线
        ctx.strokeStyle = '#d0d0d0'
        for (let i = 0; i < data.length; i++) {
          const angle = angleStep * i - Math.PI / 2
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(x, y)
          ctx.stroke()
        }
        
        // 绘制数据区域 - 微信风格
        ctx.fillStyle = 'rgba(7, 193, 96, 0.2)'
        ctx.strokeStyle = '#07C160'
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let i = 0; i <= data.length; i++) {
          const index = i % data.length
          const angle = angleStep * i - Math.PI / 2
          const value = data[index].value
          const r = radius * value / 100
          const x = centerX + r * Math.cos(angle)
          const y = centerY + r * Math.sin(angle)
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        
        // 绘制数据点
        ctx.fillStyle = '#07C160'
        for (let i = 0; i < data.length; i++) {
          const angle = angleStep * i - Math.PI / 2
          const value = data[i].value
          const r = radius * value / 100
          const x = centerX + r * Math.cos(angle)
          const y = centerY + r * Math.sin(angle)
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fill()
        }
      })
  },

  // 重新评估
  retake() {
    wx.navigateBack()
  },

  // 返回
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})
