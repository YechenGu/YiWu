const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    region:'',
    show: false,
    columns: ['东校区', '中部校区', '西校区', '新校区'],
    phone:'',
    wechat:'',
    qq:''
  },

  phoneChange(event) {
    this.setData({
      phone: event.detail
    })
  },

  wechatChange(event) {
    this.setData({
      wechat: event.detail
    })
  },

  qqChange(event) {
    this.setData({
      qq: event.detail
    })
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    console.log(event.detail)
  },
  showPopup() {
    this.setData({ show: true });
  },

  onConfirm(event) {
    this.setData({ 
      show: false ,
      region: event.detail.value
    });
  },

  onCancel() {
    console.log('取消')
    this.setData({ show: false });
  },

  onClose() {
    this.setData({ show: false });
  },
  
  submit() {
    if (this.data.region=='' || (this.data.phone=='' &&
    this.data.wechat=='' && this.data.qq=='')) {
      wx.showToast({
        title: '请输入必要信息',
        icon:'none'
      })
    } else {
      db.collection('info')
      .doc(this.data.openid)
      .set({
        data:{
          region:this.data.region,
          phone:this.data.phone,
          wechat:this.data.wechat,
          qq:this.data.qq
        }
      }).then(res=>{
        console.log(res)
      })
    }
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
        that.setData({
          openid:openid
        })
      }
    })
  }
})