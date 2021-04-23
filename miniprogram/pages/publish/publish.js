// pages/publish/publish.js
let finallimgUrl = []

Page({
  data: {
    fileList: [],
    popUp: false,
    radio: '',
    priceSe: '1',
    waySe: '1',
    placePrice: '元',
    disPrice: false,
    region: '',
    showPick: false,
    columns: ['东校区', '中部校区', '西校区', '新校区'],

  },

  /**
   * 上传图片
   */
  unloadimg() {
    // console.log('hello')
    let _that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)

        _that.setData({
          fileList: _that.data.fileList.concat(tempFilePaths)
        })

        let __that = _that
        let uploads = [];
        for (let i = 0; i < tempFilePaths.length; i++) {
          uploads[i] = new Promise((resolve, reject) => {
            wx.cloud.uploadFile({
              cloudPath: new Date().getTime() + '.jpg', // 上传至云端的路径
              filePath: tempFilePaths[i], // 小程序临时文件路径
              success: res => {
                console.log(res)
                finallimgUrl.push(res.fileID)
                resolve(result)
              },
              fail: console.error
            })
          })
        }
        Promise.all(uploads).then((result) => {
          console.log(result)
        })
      }
    })
  },


  /**
   * 关闭图片
   * @param {*} e 
   */
  closeimg(e) {
    let currentTargetimgindex = e.currentTarget.dataset.index
    // console.log(currentTargetimgindex)
    this.data.fileList.splice(currentTargetimgindex, 1)
    finallimgUrl.splice(currentTargetimgindex, 1)

    console.log(finallimgUrl[currentTargetimgindex])

    wx.cloud.deleteFile({
      fileList: [finallimgUrl[currentTargetimgindex]],
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: err => {
        console.log("error")
      }
    })

    this.setData({
      fileList: this.data.fileList
    })
  },


  /**
   * 提交表单
   * @param {*} e 
   */
  formSubmit: function (e) {
    if (e.detail.value.title.length == 0 || e.detail.value.describe.length == 0 || e.detail.value.price.length == 0) {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    
    let publishimg = finallimgUrllet 
    let title = e.detail.value.title
    let describe = e.detail.value.describe
    let price = e.detail.value.price //想卖的价格

    let publishobj = {
      description: textarea,
      publishimgarr: publishimg,
      Wanttosell: Wanttosell,
      originalprice: originalprice,
      publishTime: new Date().toLocaleString(),
      placeofdispatch: placeofdispatch,
      Allofsort: Allofsort,
      CommonUse: CommonUse,
      Wantpeople: 1,
      Thumbupnumber: 0,
      collectnumber: 0,
      pageviewnumber: 0,
      style: {
        "color": "red"
      },
    }


    db.collection('publish').add({
        // data 字段表示需新增的 JSON 数据
        data: publishobj
      })
      .then(res => {
        var _id = res._id
        wx.redirectTo({
          url: '../index/indexlistshow/indexlistshow?id=' + _id
        })
      })
  },

  formReset: function () {
    console.log(1)
  },
  /**
   * 标题相关
   */
  titleChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  /**
   * 价格相关
   */
  setPrice(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
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
    console.log('1')
    this.setData({
      radio: event.detail,
    });
  },

  radioClick(event) {
    const {
      name
    } = event.currentTarget.dataset;
    console.log(event.currentTarget.dataset)
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
        disPrice: true
      });
    } else {
      if (event.detail == 1) {
        this.setData({
          placePrice: '元',
          disPrice: false
        });
      } else {
        this.setData({
          placePrice: '积分',
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
    console.log(event.detail)
  },

  pickPopup() {
    this.setData({
      showPick: true
    });
  },

  pickConfirm(event) {
    console.log('成功')
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

})