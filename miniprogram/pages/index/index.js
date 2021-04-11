Page({  
  /**
   * 页面的初始数据
   */
  data: {
    toSearch: '',
    tabActive:0,
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
      {
        id:5,
        value:"家居用品"
      },
      {
        id:6,
        value:"玩具乐器"
      },
      {
        id:7,
        value:"办公用品"
      },
      {
        id:8,
        value:"票务卡券"
      },
      {
        id:9,
        value:"其他"
      },
    ]
  },

  /**
   * tab栏事件
   */
  tabChange(e) {
    this.setData({
      tabActive:e.detail.index
    });
    //console.log(this.data.active)
  },

  /**
   * 搜索框事件
   */
  searchChange(e) {
    this.setData({
      toSearch: e.detail,
    });
  },

  search() {
    console.log(this.data.toSearch)
    wx.navigateTo({
      url: '../goodlist/goodlist',
    })
  },

  /**
   * 按钮事件
   */
  full(){
    
  },

  score(){

  },

  free(){
    
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