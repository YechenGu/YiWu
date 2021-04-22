// pages/my/my.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    options: [{
        name: '微信',
        icon: 'wechat',
        openType: 'share'
      },
      {
        name: '微博',
        icon: 'weibo'
      },
      {
        name: '复制链接',
        icon: 'link'
      }
    ],
    showShare: false
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userinfo = wx.getStorageSync('userinfo');
    this.setData({
      userInfo: userinfo
    })

  },

  /**
   * 跳转到登录界面
   */
  goToLogin(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res),
        this.setData({
          userInfo: res.userInfo
        }),
        wx.setStorageSync('userinfo', res.userInfo)
      }
    })
  },

  /**
   * 分享界面相关
   */
  onClick(event) {
    this.setData({
      showShare: true
    });
  },

  onClose() {
    this.setData({
      showShare: false
    });
  },

  onSelect(event) {
    this.onClose();
  },

})