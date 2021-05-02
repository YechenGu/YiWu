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
    console.log('submit')
  },
})