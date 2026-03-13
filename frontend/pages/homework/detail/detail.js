// pages/homework/detail/detail.js - 作业详情页
const MockDB = require('../../../data/mock')

Page({
  data: {
    homework: null,
    isLoading: true
  },

  onLoad(options) {
    const homeworkId = options.id
    if (homeworkId) {
      this.loadHomework(homeworkId)
    }
  },

  loadHomework(id) {
    const homework = MockDB.homework.getById(id)
    if (homework) {
      this.setData({ homework, isLoading: false })
    }
  },

  goBack() {
    wx.navigateBack()
  },

  submitHomework() {
    const id = this.data.homework.id
    wx.navigateTo({
      url: `/pages/homework/submit/submit?id=${id}`
    })
  },

  checkHomework() {
    const id = this.data.homework.id
    wx.navigateTo({
      url: `/pages/homework/check/check?id=${id}`
    })
  },

  viewResult() {
    const id = this.data.homework.id
    wx.navigateTo({
      url: `/pages/homework/completed/completed?id=${id}`
    })
  }
})
