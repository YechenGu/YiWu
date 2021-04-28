const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    goodlist:[],
  },

  /**
   * 传递搜索参数
   * @param {*} options 
   */
  onLoad: function(options) {
    let that = this
    db.collection('good').where({
      _openid:_.eq(options.id)
    }).get().then(res=>{
      that.setData({
        goodlist:res.data
      })
      console.log(this.data.goodlist)
    })
  },
});