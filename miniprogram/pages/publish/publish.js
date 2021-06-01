import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const db = wx.cloud.database()
// let finallimgUrl = []
let finallimgUrl = ''

Page({
  data: {
    fileList: [],
    popUp: false,
    radio: '',
    title: '',
    area: '',
    price: '',
    priceSe: '1',
    waySe: '1',
    placePrice: '元',
    disPrice: false,
    region: '',
    showPick: false,
    columns: ['东校区', '中部校区', '西校区', '新校区'],
    openid: ''
  },

  upload(event) {
    let _that = this
    wx.showLoading({
      title: '上传中',
    })
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.jpg', // 上传至云端的路径
      filePath: event.detail.file.url, // 小程序临时文件路径
      success: res => {
        finallimgUrl= res.fileID
        console.log("final "+finallimgUrl)
        console.log("file "+event.detail.file.url)
        _that.setData({
          fileList: _that.data.fileList.concat({url:event.detail.file.url})
        })
        wx.hideLoading({
          success: (res) => {},
        })
      },
      fail: console.error
    })
  },

  delete(event){
    wx.cloud.deleteFile({
      fileList: [finallimgUrl],
      success: res => {
        finallimgUrl = ''
        this.setData({
          fileList: []
        })
      },
      fail: err => {
        console.log("error")
      }
    })
  },

  preview(event){
    wx.previewImage({
      urls: [finallimgUrl],
    })
  },

  /**
   * 提交表单
   * @param {*} e 
   */
  formSubmit: function (e) {
    if (e.detail.value.title.length == 0 || e.detail.value.describe.length == 0 || e.detail.value.price.length == 0) {
      wx.showToast({
        title: '标题、描述与价格不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (finallimgUrl == '') {
      wx.showToast({
        title: '请上传至少一张图片',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.radio == '' || this.data.region == '') {
      wx.showToast({
        title: '请选择商品分类与所在校区',
        icon: 'none',
        duration: 2000
      })
      return
    }

    console.log('form发生了submit事件，携带数据为：', e.detail.value)

    let publishimg = [finallimgUrl]
    let title = e.detail.value.title
    let describe = e.detail.value.describe
    let price = e.detail.value.price
    let priceType = this.data.priceSe
    let transType = this.data.waySe
    let type = this.data.radio
    let region = this.data.region

    let publishobj = {
      img: publishimg,
      title: title,
      detail: describe,
      price: price,
      time: new Date().toLocaleString(),
      priceType: priceType,
      transType: transType,
      type: type,
      region: region
    }

    wx.showLoading({
      title: '提交中',
    })

    db.collection('good').add({
        // data 字段表示需新增的 JSON 数据
        data: publishobj
      })
      .then(res => {
        this.formReset()
        wx.switchTab({
          url: '../index/index',
        })
        wx.hideLoading({
          success: (res) => {},
        })
      })

  },

  /**
   * 重置表单
   */
  formReset: function () {
    this.setData({
      finallimgUrl: [],
      fileList: [],
      popUp: false,
      radio: '',
      title: '',
      area: '',
      price: '',
      priceSe: '1',
      waySe: '1',
      placePrice: '元',
      disPrice: false,
      region: '',
      showPick: false,
    })
  },


  /**
   * 弹出层相关
   */
  showPopup() {
    this.setData({
      popUp: true
    });
  },

  popClose() {
    this.setData({
      popUp: false
    });
  },

  /**
   * 单选框相关
   */
  radioChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  radioClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    // console.log(event.currentTarget.dataset)
    this.setData({
      radio: name,
      popUp: false
    });
  },

  /**
   * 价格与途径选择相关
   */
  priceChange(event) {
    this.setData({
      priceSe: event.detail,
    });
    // 处理价格输入框的提示符与禁用状态相关
    if (event.detail == 3) {
      this.setData({
        placePrice: '0',
        price: '0',
        disPrice: true
      });
    } else {
      if (event.detail == 1) {
        this.setData({
          placePrice: '元',
          price: '',
          disPrice: false
        });
      } else {
        this.setData({
          placePrice: '积分',
          price: '',
          disPrice: false
        });
      }
    }
  },

  wayChange(event) {
    this.setData({
      waySe: event.detail,
    });
  },

  /**
   * 校区选择器相关
   */
  pickChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
  },

  pickPopup() {
    this.setData({
      showPick: true
    });
  },

  pickConfirm(event) {
    this.setData({
      showPick: false,
      region: event.detail.value
    });
  },

  pickCancel() {
    console.log('取消')
    this.setData({
      showPick: false
    });
  },

  pickClose() {
    this.setData({
      showPick: false
    });
  },

  onShow: function (options) {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid:', res.result.openid)
        var openid = res.result.openid;
        this.setData({
          openid: openid
        })
        db.collection("info")
          .doc(openid)
          .get()
          .then(res => {
            if (res.data.phone == "" && res.data.wechat == "" && res.data.qq == "") {
              Dialog.alert({
                title: '请补充个人信息',
                message: '只有补充完善您的个人信息,买家才方便联系您哦',
              }).then(() => {
                wx.navigateTo({
                  url: '../info/info',
                })
              });
            }
          })
          .catch(console.error)
      }
    })
  }
})

  /**
   * 上传图片
   */
  // unloadimg() {
  //   let _that = this
  //   wx.chooseImage({
  //     count: 1,
  //     success(res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFilePaths
  //       let uploads = [];
  //       wx.showLoading({
  //         title: '上传中',
  //       })
  //       for (let i = 0; i < tempFilePaths.length; i++) {
  //         uploads[i] = new Promise((resolve, reject) => {
  //           wx.cloud.uploadFile({
  //             cloudPath: new Date().getTime() + '.jpg', // 上传至云端的路径
  //             filePath: tempFilePaths[i], // 小程序临时文件路径
  //             success: res => {
  //               console.log(res.fileID)
  //               finallimgUrl.push(res.fileID)
  //               console.log(finallimgUrl)
  //               resolve(res)
  //               console.log("test"+tempFilePaths)
  //               _that.setData({
  //                 fileList: _that.data.fileList.concat(tempFilePaths)
  //               })
  //               wx.hideLoading({
  //                 success: (res) => {},
  //               })
  //             },
  //             fail: console.error
  //           })
  //         })
  //       }

  //       Promise.all(uploads).then((result) => {
  //         console.log("result is:" + result)
  //       })
  //     }
  //   })
  // },


  // /**
  //  * 关闭图片
  //  * @param {*} e 
  //  */
  // closeimg(e) {
  //   let currentTargetimgindex = e.currentTarget.dataset.index
  //   console.log("currentTargetimgindex is" + currentTargetimgindex)
  //   this.data.fileList.splice(currentTargetimgindex, 1)
  //   console.log("index is" + finallimgUrl[currentTargetimgindex])
  //   wx.cloud.deleteFile({
  //     fileList: [finallimgUrl[currentTargetimgindex]],
  //     success: res => {
  //       // handle success
  //       console.log("list is" + res.fileList)
  //     },
  //     fail: err => {
  //       console.log("error")
  //     }
  //   })

  //   finallimgUrl.splice(currentTargetimgindex, 1)
  //   this.setData({
  //     fileList: this.data.fileList
  //   })
  // }