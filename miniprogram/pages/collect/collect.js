import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  delete: function (event) {
    let id = event.currentTarget.dataset.id
    Dialog.confirm({
        message: '确认取消收藏该商品吗?',
      })
      .then(() => {
        db.collection('collect')
          .doc(id)
          .remove()
          .then(res => {
            this.onLoad()
          })
      })
      .catch(() => {
        console.log("取消")
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid:', res.result.openid)
        var openid = res.result.openid;
        wx.showLoading({
          title: '数据加载中',
        })
        db.collection('collect')
          .where({
            _openid: _.eq(openid)
          })
          .get()
          .then(res => {
            that.setData({
              goodlist: res.data
            })
            wx.hideLoading({
              success: (res) => {},
            })
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  //是否需要验证登录状态，仍然存疑
})