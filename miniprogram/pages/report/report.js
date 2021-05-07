// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    report:'',
    contact:''
  },

  reportChange(event) {
    console.log(event)
  },

  contactChange(event) {
    this.setData({
      contact: event.detail
    })
  },

  submit() {
    // console.log('submit')
    if (this.data.contact=='') {
      wx.showToast({
        title: '请输入联系方式',
        icon:'none'
      })
      return
    }
    wx.showToast({
      title: '该功能正在开发中',
      icon:'none'
    })
  },
})