const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    good: '',
    transType: '',
    type: '',
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
    showShare: false,
    showPick:false
  },

  /**
   * 举报
   */
  report() {
    wx.navigateTo({
      url: '../report/report',
    })
  },

  /**
   * 底部栏功能
   */
  collect() {
    let id = this.data.good._id
    let title = this.data.good.title
    let detail = this.data.good.detail
    let price = this.data.good.price
    let img = this.data.good.img[0]
    db.collection('collect')
    .add({
      data:{
        goodId:id,
        title:title,
        detail:detail,
        price:price,
        img:img
      }
    })
    .then(res=> {
      wx.showToast({
        title: '添加成功',
      })
    })
  },

  exchange() {
  },

  contact() {
    this.setData({
      showPick: true
    });
  },

  pickClose() {
    this.setData({
      showPick: false
    });
  },

  /**
   * 联系卖家相关
   * @param {*} event 
   */
  copyPhone(){
    let seller = this.data.good._openid
    db.collection("info")
    .doc(seller)
    .get()
    .then(res=>{
      let phone = res.data.phone
      if (phone == "") {
        wx.showToast({
          title: '暂未提供手机号',
          icon: 'error'
        })
      } else {
        wx.setClipboardData({
          data: phone,
          success: function(res) {
            wx.showToast({
              title: '手机号已复制',
            })
          }
        })
      }
      this.setData({
        showPick:false
      })
    })
    .catch(console.error)
  },

  copyWechat(){
    let seller = this.data.good._openid
    db.collection("info")
    .doc(seller)
    .get()
    .then(res=>{
      let wechat = res.data.wechat
      if (wechat == "") {
        wx.showToast({
          title: '暂未提供微信号',
          icon: 'error'
        })
      } else {
        wx.setClipboardData({
          data: wechat,
          success: function(res) {
            wx.showToast({
              title: '微信号已复制',
            })
          }
        })
      }
      this.setData({
        showPick:false
      })
    })
    .catch(console.error)
  },

  copyQQ(){
    let seller = this.data.good._openid
    db.collection("info")
    .doc(seller)
    .get()
    .then(res=>{
      let QQ = res.data.qq
      if (QQ == "") {
        wx.showToast({
          title: '暂未提供QQ号',
          icon: 'error'
        })
      } else {
        wx.setClipboardData({
          data: QQ,
          success: function(res) {
            wx.showToast({
              title: 'QQ号已复制',
            })
          }
        })
      }
      this.setData({
        showPick:false
      })
    })
    .catch(console.error)
  },
  
  copyCancel(){
    this.setData({
      showPick: false
    });
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

  onLoad: function (options) {
    let that = this
    db.collection('good')
      .where({
        _id: _.eq(options.id)
      })
      .get()
      .then(res => {
        that.setData({
          good: res.data[0]
        })
        var type1 = ''
        var transType1 = ''
        switch (this.data.good.type) {
          case "1":
            type1 = "教材图书"
            break;
          case "2":
            type1 = "服饰鞋包"
            break;
          case "3":
            type1 = "数码产品"
            break;
          case "4":
            type1 = "运动户外"
            break;
          case "5":
            type1 = "家具用品"
            break;
          case "6":
            type1 = "玩具乐器"
            break;
          case "7":
            type1 = "办公用品"
            break;
          case "8":
            type1 = "票务卡券"
            break;
          default:
            type1 = "其他"
            break;
        }
        switch (this.data.good.transType) {
          case "1":
            transType1 = "面交"
            break;
          case "1":
            transType1 = "自取"
            break;
          default:
            transType1 = "快递"
            break;
        }
        this.setData({
          type: type1,
          transType: transType1
        })
        // console.log(this.data.good)
      })
  }
})