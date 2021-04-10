Page({
  data: {
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

});