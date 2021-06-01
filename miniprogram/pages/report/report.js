// pages/report/report.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    report: '',
    contact: '',
    openid: ''
  },

  reportChange(event) {
    this.setData({
      report: event.detail
    })
  },

  contactChange(event) {
    this.setData({
      contact: event.detail
    })
  },

  submit() {
    if (this.data.contact == '' || this.data.report == '') {
      wx.showToast({
        title: '请输入反馈内容与联系方式',
        icon: 'none'
      })
      return
    } else {
      db.collection("report")
        .add({
          data: {
            reporter: this.data.openid,
            report: this.data.report,
            contact: this.data.contact
          }
        })
        .then(res => {
          wx.showToast({
            title: '反馈成功!',
            icon: 'none'
          })
          wx.navigateBack({
            delta: 1
          })
        })
    }
  },

  onShow: function (options) {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid:', res.result.openid)
        var openid = res.result.openid;
        this.setData({
          openid: openid
        })
      }
    })
  }
})