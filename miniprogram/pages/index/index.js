Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageCur: 'home'
  },

  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

  onGotUserInfo(e){
    console.log(e.detail)
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

    if (e.detail.userInfo){
      wx.navigateTo({
        url: '/pages/publish/publish',
      })
    }
    else if(e.detail.userInfo == undefined){
      wx.showToast({
        title: '请先授权登录哟!',
        icon: 'none',
        duration: 2000
      })
    }
  }
})