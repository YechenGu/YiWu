const db = wx.cloud.database()
const _ = db.command

Page({
  data: {
    order: '0',
    region: '4',
    toSearch: '',
    goodlist: [],
    itemTitle: '筛选',
    option1: [{
        text: '综合',
        value: 0
      },
      {
        text: '价格升序',
        value: 1
      },
      {
        text: '价格降序',
        value: 2
      },
      {
        text: '最新发布',
        value: 3
      },
    ],
    value1: 0,
    option2: [{
        text: '全部',
        value: 4
      },
      {
        text: '东校区',
        value: 0
      },
      {
        text: '中部校区',
        value: 1
      },
      {
        text: '西校区',
        value: 2
      },
      {
        text: '新校区',
        value: 3
      },
    ],
    value2: 4,
    minPrice: '',
    maxPrice: '',
    radioTrans: '1',
    radioPrice: '1',
  },

  /*
   * 价格设置相关
   */
  setMinPrice(event) {
    this.setData({
      minPrice: event.detail
    })
  },

  setMaxPrice(event) {
    this.setData({
      maxPrice: event.detail
    })
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
  /**
   * 提交筛选
   */
  submit() {
    this.selectComponent('#item').toggle();
    this.query(this.data.region, this.data.order)
  },


  /**
   * 价格与时间排序方式选择
   * @param {*} e 
   */
  priceChoose(e) {
    this.setData({
      order: e.detail + ''
    })
    this.query(this.data.region, this.data.order)
  },

  /**
   * 地区选择
   * @param {*} e 
   */
  regionChoose(e) {
    this.setData({
      region: e.detail + ''
    })
    this.query(this.data.region, this.data.order)

  },

  /**
   * 传递搜索参数
   * @param {*} options 
   */
  onLoad: function (options) {
    let that = this
    db.collection('good').where({
      title: {
        $regex: '.*' + options.name,
        $options: 'i'
      }
    }).get().then(res => {
      that.setData({
        toSearch: options.name,
        goodlist: res.data
      })
    })
  },

  query: function (campus, order) {
    var min = (this.data.minPrice == '') ? '0' : this.data.minPrice + ''
    var max = (this.data.maxPrice == '') ? '99999' : this.data.maxPrice + ''
    var campus1
    switch (campus) {
      case "0":
        campus1 = ["东校区"]
        break;
      case "1":
        campus1 = ["中部校区"]
        break;
      case "2":
        campus1 = ["西校区"]
        break;
      case "3":
        campus1 = ["新校区"]
        break;
      case "4":
        campus1 = ["东校区","中部校区","西校区","新校区"]
        break;
      default:
        console.log("出错啦")
        return;
    }
    switch (order) {
      case "1":
        db.collection('good').where({
          title: {
            $regex: '.*' + this.data.toSearch,
            $options: 'i'
          },
          region: _.in(campus1),
          price: _.and(_.gte(min), _.lte(max)),
          priceType: _.eq(this.data.radioPrice + ''),
          transType: _.eq(this.data.radioTrans + '')
        }).orderBy('price', 'asc').get().then(res => {
          this.setData({
            goodlist: res.data
          })
        })
        break;
      case "2":
        db.collection('good').where({
          title: {
            $regex: '.*' + this.data.toSearch,
            $options: 'i'
          },
          region: _.in(campus1),
          price: _.and(_.gte(min), _.lte(max)),
          priceType: _.eq(this.data.radioPrice + ''),
          transType: _.eq(this.data.radioTrans + '')
        }).orderBy('price', 'desc').get().then(res => {
          this.setData({
            goodlist: res.data
          })
        })
        break;
      case "3":
        db.collection('good').where({
          title: {
            $regex: '.*' + this.data.toSearch,
            $options: 'i'
          },
          region: _.in(campus1),
          price: _.and(_.gte(min), _.lte(max)),
          priceType: _.eq(this.data.radioPrice + ''),
          transType: _.eq(this.data.radioTrans + '')
        }).orderBy('time', 'desc').get().then(res => {
          this.setData({
            goodlist: res.data
          })
        })
        break;
      default:
        db.collection('good').where({
          title: {
            $regex: '.*' + this.data.toSearch,
            $options: 'i'
          },
          region: _.in(campus1),
          price: _.and(_.gte(min), _.lte(max)),
          priceType: _.eq(this.data.radioPrice + ''),
          transType: _.eq(this.data.radioTrans + '')
        }).get().then(res => {
          this.setData({
            goodlist: res.data
          })
        })
        break;
    }

  }
});