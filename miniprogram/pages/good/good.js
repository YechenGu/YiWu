// pages/good/good.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: [
      { name: '微信', icon: 'wechat', openType: 'share' },
      { name: '微博', icon: 'weibo' },
      { name: '复制链接', icon: 'link' }
    ],
    showShare:false
  },

  /**
   * 举报
   */
  report(){
    wx.navigateTo({
      url: '../report/report',
    })
  },

  /**
   * 底部栏功能
   */
  collect(){

  },

  exchange(){

  },

  contact(){

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
    this.onClose();
  },
})