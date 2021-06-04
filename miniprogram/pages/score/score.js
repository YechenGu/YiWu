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
        var openid = res.result.openid;
        that.setData({
          openid: openid
        })
        db.collection('score')
          .where({
            _openid: openid
          })
          .get()
          .then(res => {
            that.setData({
              score: res.data[0].score
            })
          })
          .catch(err => {
            db.collection('score')
              .doc(this.data.openid)
              .set({
                data:{
                  score:20
                }
              })
              .then(res => {
                that.setData({
                  score: 20
                })
              })
          })
      }
    })
  },

})