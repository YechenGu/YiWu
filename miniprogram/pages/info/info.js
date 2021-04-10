// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:'',
    show: false,
    columns: ['东校区', '中部校区', '西校区', '新校区'],
    phone:'',
    wechat:'',
    qq:''
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    console.log(event.detail)
  },
  showPopup() {
    this.setData({ show: true });
  },

  onConfirm(event) {
    console.log('成功')
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
    console.log('submit')
  },
})