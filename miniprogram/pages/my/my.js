// pages/my/my.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '登录/注册',
      avatarUrl: 'https://pics1.baidu.com/feed/0eb30f2442a7d9337e411e9fbfef831b71f00199.png?token=4218cef735e1a3373678adf78f49aece'
    },
    orderNumber: 0,
    isLogin: false,
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' }
    ],
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      this.setData({
        isLogin: true,
        userInfo: app.globalData.userInfo
      })
    }
  },

    /**
   * 跳转到登录界面
   */
  goToLogin: function () {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/index/index'
      });
    }
  },

  /**
   * 分享界面相关
   */
  onClick(event) {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event) {
    Toast(event.detail.name);
    this.onClose();
  },

})