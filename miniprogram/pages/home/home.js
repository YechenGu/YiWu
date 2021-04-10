Page({  
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    active:0,
    tabs:[
      {
        id:0,
        value:"推荐"
      },
      {
        id:1,
        value:"教材图书"
      },
      {
        id:2,
        value:"服饰鞋包"
      },
      {
        id:3,
        value:"数码产品"
      },
      {
        id:4,
        value:"运动户外"
      },
    ]
  },

  /**
   * 搜索框事件
   */
  onChange(e) {
    this.setData({
      active:e.detail.index
    });
    //console.log(this.data.active)
  },

  onSearch() {
    console.log('1')
  },
  onClick() {
    console.log(this.data)
  },

  /**
   * 图片事件
   */
  joinUs(){
    wx.navigateTo({
      url: '../joinUs/joinUs',
    })
  },
})