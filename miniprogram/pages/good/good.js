import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
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
    showPick: false,
    notScore: true,
    hasCollected: false
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
    if (this.data.hasCollected) {
      db.collection("collect")
        .where({
          _openid: this.data.openid,
          goodId: this.data.good._id
        })
        .remove()
        .then(res => {
          wx.showToast({
            title: '取消收藏成功',
          })
          this.setData({
            hasCollected: false
          })
        })
        .catch(console.error)
    } else {
      db.collection('collect')
        .add({
          data: {
            goodId: id,
            title: title,
            detail: detail,
            price: price,
            img: img
          }
        })
        .then(res => {
          wx.showToast({
            title: '添加成功',
          })
          this.setData({
            hasCollected: true
          })
        })
    }
  },

  exchange() {
    Dialog.confirm({
        title: '确认立即兑换吗',
        message: '请与卖家联系收到物品或快递单号后再点击确定,兑换后您的积分将直接转入卖家账号',
      })
      .then(() => {
        // console.log('确定')
        wx.showToast({
          title: '该功能正在开发中',
          icon: 'none'
        })
      })
      .catch(() => {
        console.log('取消')
      });
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
  copyPhone() {
    let seller = this.data.good._openid
    console.log("seller is " + seller)
    db.collection("info")
      .doc(seller)
      .get()
      .then(res => {
        console.log(res.data)
        let phone = res.data.phone
        if (phone == "") {
          wx.showToast({
            title: '暂未提供手机号',
            icon: 'error'
          })
        } else {
          wx.setClipboardData({
            data: phone,
            success: function (res) {
              wx.showToast({
                title: '手机号已复制',
              })
            }
          })
        }
        this.setData({
          showPick: false
        })
      })
      .catch(console.error)
  },

  copyWechat() {
    let seller = this.data.good._openid
    db.collection("info")
      .doc(seller)
      .get()
      .then(res => {
        let wechat = res.data.wechat
        if (wechat == "") {
          wx.showToast({
            title: '暂未提供微信号',
            icon: 'error'
          })
        } else {
          wx.setClipboardData({
            data: wechat,
            success: function (res) {
              wx.showToast({
                title: '微信号已复制',
              })
            }
          })
        }
        this.setData({
          showPick: false
        })
      })
      .catch(console.error)
  },

  copyQQ() {
    let seller = this.data.good._openid
    db.collection("info")
      .doc(seller)
      .get()
      .then(res => {
        let QQ = res.data.qq
        if (QQ == "") {
          wx.showToast({
            title: '暂未提供QQ号',
            icon: 'error'
          })
        } else {
          wx.setClipboardData({
            data: QQ,
            success: function (res) {
              wx.showToast({
                title: 'QQ号已复制',
              })
            }
          })
        }
        this.setData({
          showPick: false
        })
      })
      .catch(console.error)
  },

  copyCancel() {
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
        let priceType = this.data.good.priceType
        if (priceType == "2") {
          this.setData({
            notScore: false
          })
        } else {
          this.setData({
            notScore: true
          })
        }
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
        wx.cloud.callFunction({
          name: 'getOpenid',
          complete: res => {
            console.log('云函数获取到的openid:', res.result.openid)
            var openid = res.result.openid;
            this.setData({
              openid: openid
            })
            db.collection("collect")
              .where({
                _openid: openid,
                goodId: this.data.good._id
              })
              .get()
              .then(res => {
                if (res.data == "") {
                  this.setData({
                    hasCollected: false
                  })
                } else {
                  this.setData({
                    hasCollected: true
                  })
                }
              })
              .catch(console.error)
          }
        })

        this.setData({
          type: type1,
          transType: transType1
        })
        // console.log(this.data.good)
      })
  }
})

//bug:可能会出现底部功能栏无法显示
//bug:无法查看其他人的商品