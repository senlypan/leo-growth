// pages/assessment/assessment.js - 能力评估
Page({
  data: {
    currentSubject: 'math',
    hasStarted: false,
    isAssessing: false,
    isCompleted: false,
    
    currentIndex: 0,
    selectedOption: null,
    inputAnswer: '',
    progress: 0,
    
    questions: [],
    currentQuestion: {},
    answers: [],
    
    result: {
      score: 0,
      answeredCount: 0,
      totalCount: 0,
      accuracy: 0,
      timeSpent: 0
    },
    
    startTime: 0
  },

  onLoad() {
    this.loadQuestions()
  },

  // 加载题目
  async loadQuestions() {
    // TODO: 从后端 API 获取题目
    // const res = await api.get('/assessment/questions', {
    //   subject: this.data.currentSubject
    // })
    
    // 模拟题目数据
    const mockQuestions = [
      {
        id: 1,
        questionType: '选择题',
        questionContent: '25 + 17 = ?',
        options: ['32', '42', '52', '40'],
        correctAnswer: '42',
        score: 5
      },
      {
        id: 2,
        questionType: '选择题',
        questionContent: '《春晓》的作者是谁？',
        options: ['李白', '杜甫', '孟浩然', '白居易'],
        correctAnswer: '孟浩然',
        score: 5
      },
      {
        id: 3,
        questionType: '填空题',
        questionContent: '8 × 7 = ___',
        correctAnswer: '56',
        score: 5
      }
    ]
    
    this.setData({
      questions: mockQuestions,
      currentQuestion: mockQuestions[0]
    })
  },

  // 选择科目
  selectSubject(e) {
    const subject = e.currentTarget.dataset.subject
    this.setData({
      currentSubject: subject,
      hasStarted: false,
      isAssessing: false
    })
    this.loadQuestions()
  },

  // 开始评估
  startAssessment() {
    wx.showModal({
      title: '📝 准备好了吗？',
      content: '认真答题，相信自己！遇到不会的题也不要急，慢慢思考～',
      confirmText: '开始答题',
      cancelText: '再看看',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            hasStarted: true,
            isAssessing: true,
            startTime: Date.now()
          })
          wx.showToast({
            title: '加油！💪',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },

  // 选择选项
  selectOption(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      selectedOption: index
    })
  },

  // 输入答案
  onInputAnswer(e) {
    this.setData({
      inputAnswer: e.detail.value
    })
  },

  // 上一题
  prevQuestion() {
    if (this.data.currentIndex > 0) {
      const currentIndex = this.data.currentIndex - 1
      this.setData({
        currentIndex,
        currentQuestion: this.data.questions[currentIndex],
        selectedOption: null,
        inputAnswer: ''
      })
    }
  },

  // 下一题
  nextQuestion() {
    const { currentIndex, questions, selectedOption, inputAnswer } = this.data
    
    // 保存答案
    const answer = questions[currentIndex].options 
      ? questions[currentIndex].options[selectedOption]
      : inputAnswer
    
    this.data.answers[currentIndex] = answer
    
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1
      const progress = Math.round((nextIndex / questions.length) * 100)
      
      this.setData({
        currentIndex: nextIndex,
        currentQuestion: questions[nextIndex],
        selectedOption: null,
        inputAnswer: '',
        progress
      })
      
      // 鼓励语
      const encouragements = [
        '继续加油！💪',
        '做得很好！🌟',
        '坚持就是胜利！🏆',
        '你真棒！👍',
        '越来越好了！✨'
      ]
      const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
      
      wx.showToast({
        title: randomEncouragement,
        icon: 'none',
        duration: 1000
      })
    } else {
      // 提交评估
      this.submitAssessment()
    }
  },

  // 提交评估
  async submitAssessment() {
    wx.showModal({
      title: '✓ 完成答题',
      content: '太棒了！所有题目都完成了！现在提交答案看看结果吧～',
      confirmText: '提交答案',
      cancelText: '再检查',
      success: async (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '批改中...',
            mask: true
          })

          try {
            // 计算结果
            const endTime = Date.now()
            const timeSpent = Math.round((endTime - this.data.startTime) / 60000)
            
            let correctCount = 0
            this.data.questions.forEach((q, index) => {
              if (this.data.answers[index] === q.correctAnswer) {
                correctCount++
              }
            })
            
            const score = Math.round((correctCount / this.data.questions.length) * 100)
            const accuracy = Math.round((correctCount / this.data.questions.length) * 100)
            
            this.setData({
              isAssessing: false,
              isCompleted: true,
              result: {
                score,
                answeredCount: this.data.questions.length,
                totalCount: this.data.questions.length,
                accuracy,
                timeSpent
              }
            })
            
            wx.hideLoading()
            
            // 根据分数显示不同鼓励
            if (score >= 90) {
              wx.showModal({
                title: '🎉 太厉害了！',
                content: `你得了${score}分！真是太棒了！继续保持哦～🌟`,
                showCancel: false,
                confirmText: '耶！'
              })
            } else if (score >= 70) {
              wx.showModal({
                title: '👍 做得很好！',
                content: `你得了${score}分！继续加油，你会更棒的！💪`,
                showCancel: false,
                confirmText: '好的'
              })
            } else {
              wx.showModal({
                title: '💪 继续努力！',
                content: `你得了${score}分。没关系，多练习就会进步的！老师相信你可以的！🌟`,
                showCancel: false,
                confirmText: '我会加油'
              })
            }
          } catch (error) {
            console.error('提交评估失败:', error)
            wx.hideLoading()
            wx.showToast({
              title: '提交失败',
              icon: 'none'
            })
          }
        }
      }
    })
  },

  // 查看详细报告
  viewReport() {
    wx.navigateTo({
      url: `/pages/assessment/report/report?subject=${this.data.currentSubject}`
    })
  },

  // 重新评估
  retake() {
    this.setData({
      hasStarted: false,
      isAssessing: false,
      isCompleted: false,
      currentIndex: 0,
      selectedOption: null,
      inputAnswer: '',
      progress: 0,
      answers: []
    })
  }
})
