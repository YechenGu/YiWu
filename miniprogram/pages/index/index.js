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
    good:""
  },

  /**
   * tab栏事件
   */
  tabChange(e) {
    this.setData({
      tabActive:e.detail.index
    });
    var index = this.data.tabActive + 1 +"";
    db.collection('good').where({
      type:_.eq(index)
    }).get().then(res=>{
      this.setData({
        goodlist:res.data
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

  search() {
    console.log(this.data.toSearch)
    wx.navigateTo({
      url: '../goodlist/goodlist',
    })
  },

  /**
   * 按钮事件
   */
  rmb(){
    document.getElementById("rmb").style.color = "red"
    document.getElementById("score").style.color = "gray"
    document.getElementById("free").style.color = "gray"
    // db.collection("good").where({
    //   priceType:1
    // }).get().then(res=>{
    //   console.log(res)
    // })
  },

  score(){
    document.getElementById("rmb").style.color = "gray"
    document.getElementById("score").style.color = "red"
    document.getElementById("free").style.color = "gray"
  },

  free(){
    document.getElementById("rmb").style.color = "gray"
    document.getElementById("score").style.color = "gray"
    document.getElementById("free").style.color = "red"
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
    db.collection('good').where({
      type:_.eq(index)
    }).get().then(res=>{
      console.log(res)
      this.setData({
        goodlist:res.data
      })
    })
  },
})