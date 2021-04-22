// pages/publish/publish.js

Page({
    data: {
        fileList: [],
        title:'',
        popUp: false,
        radio:'',
        priceSe:'1',
        waySe:'1',
        price:'',
        placePrice:'元',
        disPrice:false,
        region:'',
        showPick: false,
        columns: ['东校区', '中部校区', '西校区', '新校区'],

    },

    /**
     * 上传图像相关
     * @param {*} event 参数
     */
    afterRead(event) {
        const path = event.detail.file.url;
        if (!path.length) {
          wx.showToast({ title: '请选择图片', icon: 'none' });
        } else {
          const cloudPath = "ranzar"+Date.now()+".jpg";
          wx.cloud.uploadFile({
            //云路径暂时以时间为路径
            cloudPath:cloudPath,
            filePath: path
          }).then(res=>{
            wx.showToast({
              title: '上传成功',
            })
            var addedFile = {
              url:res.fileID
            }
            this.data.fileList.push(addedFile)
            console.log(this.data.fileList)
          })
        }
      },

    formSubmit: function (e) {
      console.log(e)
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
        this.setData({ popUp: true });
      },
    
    popClose() {
        this.setData({ popUp: false });
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
        const { name } = event.currentTarget.dataset;
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
                placePrice:'0',
                disPrice:true
            });
        } else {
            if (event.detail == 1) {
                this.setData({
                    placePrice:'元',
                    disPrice:false
                });
            } else {
                this.setData({
                    placePrice:'积分',
                    disPrice:false
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
        const { picker, value, index } = event.detail;
        console.log(event.detail)
      },

    pickPopup() {
        this.setData({ showPick: true });
      },
    
    pickConfirm(event) {
        console.log('成功')
        this.setData({ 
          showPick: false ,
          region: event.detail.value
        });
      },
    
    pickCancel() {
        console.log('取消')
        this.setData({ showPick: false });
      },
    
    pickClose() {
        this.setData({ showPick: false });
      },
  
})
