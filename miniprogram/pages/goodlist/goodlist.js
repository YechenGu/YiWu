const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    toSearch:'',
    goodlist:[],
    itemTitle: '筛选',
    option1: [
      { text: '综合', value: 0 },
      { text: '价格升序', value: 1 },
      { text: '价格降序', value: 2 },
      { text: '最新发布', value: 3 },
    ],
    value1: 0,
    option2: [
      { text: '东校区', value: 0 },
      { text: '中部校区', value: 1 },
      { text: '西校区', value: 2 },
      { text: '新校区', value: 3 },
    ],
    value2: 0,
    minPrice:'',
    maxPrice:'',
    radioTrans: '1',
    radioPrice: '1',
    radioTime: '1',
  },

  /*
  * 价格设置相关
  */
  setMinPrice(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },

  setMaxPrice(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  /**
   * 交易方式设置
   */
  radioTransChange(event) {
    this.setData({
      radioTrans: event.detail,
    });
  },
  radioPriceChange(event) {
    this.setData({
      radioPrice: event.detail,
    });
  },
  radioTimeChange(event) {
    this.setData({
      radioTime: event.detail,
    });
  },
  /**
   * 提交筛选
   */
  submit(){
    this.selectComponent('#item').toggle();
  },


  /**
   * 价格与时间排序方式选择
   * @param {*} e 
   */
  priceChoose(e){
    switch (e.detail) {
      case 1:
        db.collection('good').where({
          title:{
            $regex:'.*'+ this.data.toSearch,
            $options: 'i'
          }
        }).orderBy('price', 'asc').get().then(res=>{
          this.setData({
            goodlist:res.data
          })
        })
        break;
      case 2:
        db.collection('good').where({
          title:{
            $regex:'.*'+ this.data.toSearch,
            $options: 'i'
          }
        }).orderBy('price', 'desc').get().then(res=>{
          this.setData({
            goodlist:res.data
          })
        })
        break;
      case 3:
        db.collection('good').where({
          title:{
            $regex:'.*'+ this.data.toSearch,
            $options: 'i'
          }
        }).orderBy('time', 'desc').get().then(res=>{
          this.setData({
            goodlist:res.data
          })
        })
        break;
      default:
        db.collection('good').where({
          title:{
            $regex:'.*'+ this.data.toSearch,
            $options: 'i'
          }
        }).get().then(res=>{
          this.setData({
            goodlist:res.data
          })
        })
        break;
    }
  },

  regionChoose(e){
    switch (e.detail) {
      case 0:
        db.collection('good').where({
          title:{
            $regex:'.*'+ this.data.toSearch,
            $options: 'i'
          },
          region:"东校区"
        }).get().then(res=>{
          this.setData({
            goodlist:res.data
          })
        })
        break;
      case 1:
        db.collection('good').where({
          title:{
            $regex:'.*'+ this.data.toSearch,
            $options: 'i'
          },
          region:"中部校区"
        }).get().then(res=>{
          this.setData({
            goodlist:res.data
          })
        })
        break;
      case 2:
        db.collection('good').where({
          title:{
            $regex:'.*'+ this.data.toSearch,
            $options: 'i'
          },
          region:"西校区"
        }).get().then(res=>{
          this.setData({
            goodlist:res.data
          })
        })
        break;
      case 3:
        db.collection('good').where({
          title:{
            $regex:'.*'+ this.data.toSearch,
            $options: 'i'
           },
          region:"新校区"
        }).get().then(res=>{
          this.setData({
            goodlist:res.data
          })
        })
        break;
      default:
        db.collection('good').where({
          title:{
            $regex:'.*'+ this.data.toSearch,
            $options: 'i'
          }
        }).get().then(res=>{
          this.setData({
            goodlist:res.data
          })
        })
        break;
    }
  },

  /**
   * 传递搜索参数
   * @param {*} options 
   */
  onLoad: function(options) {
    let that = this
    db.collection('good').where({
      title:{
        $regex:'.*'+ options.name,
        $options: 'i'
      }
    }).get().then(res=>{
      that.setData({
        toSearch:options.name,
        goodlist:res.data
      })
    })
  }
});