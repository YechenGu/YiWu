const db = wx.cloud.database()
const _ = db.command

Page({  
  /**
   * 页面的初始数据
   */
  data: {
    goodlist:[],
    toSearch: '',
    tabActive:0,
    tabs:[
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
    ],
    good:"",
    showType:0
  },

  /**
   * tab栏事件
   */
  tabChange(e) {
    this.setData({
      tabActive:e.detail.index
    });
    var index = this.data.tabActive + 1 +"";
    db.collection('good').limit(10).where({
      type:_.eq(index)
    }).get().then(res=>{
      this.setData({
        goodlist:res.data,
        showType:0
      })
    })
  },

  /**
   * 搜索框事件
   */
  searchChange(e) {
    this.setData({
      toSearch: e.detail,
    });
  },

  search(){
    wx.navigateTo({
      url: '../goodlist/goodlist?name='+this.data.toSearch,
    })
  },

  /**
   * 按钮事件
   */
  full(){
    var index = this.data.tabActive + 1 +"";
    db.collection("good").limit(10).where({
      type:_.eq(index)
    }).get().then(res=>{
      this.setData({
        goodlist:res.data,
        showType:0
      })
    })
  },

  score(){
    var index = this.data.tabActive + 1 +"";
    db.collection("good").limit(10).where({
      priceType:_.eq("2"),
      type:_.eq(index)
    }).get().then(res=>{
      this.setData({
        goodlist:res.data,
        showType:1
      })
    })
  },

  free(){
    var index = this.data.tabActive + 1 +"";
    db.collection("good").limit(10).where({
      priceType:_.eq("3"),
      type:_.eq(index)
    }).get().then(res=>{
      this.setData({
        goodlist:res.data,
        showType:2
      })
    })
  },
  /**
   * 图片事件
   */
  joinUs(){
    wx.navigateTo({
      url: '../joinUs/joinUs',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var index = this.data.tabActive + 1 +"";
    db.collection('good').limit(10).where({
      type:_.eq(index)
    }).get().then(res=>{
      this.setData({
        goodlist:res.data
      })
    })
  },

  onHide: function(){
    this.setData({
      toSearch:''
    })
  }
})