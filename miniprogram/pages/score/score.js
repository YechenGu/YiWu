const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: '',
    openid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid:', res.result.openid)
        var openid = res.result.openid;
        that.setData({
          openid: openid
        })
        db.collection('score')
          .doc(openid)
          .get()
          .then(res => {
            console.log(res)
            that.setData({
            })
          })
          .catch(err=>{
            console.err
          })
      }
    })
  },

})