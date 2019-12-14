import {getHistoryData} from '../../request/order'

Page({
  data: {
    tabs: [
      {
        id: 0,
        isActive: true,
        value: '我的订单'
      },
      {
        id: 1,
        isActive: false,
        value: '待付款'
      },
      {
        id: 2,
        isActive: false,
        value: '待收货'
      },
      {
        id: 3,
        isActive: false,
        value: '退货/退款'
      }
    ]
  },
  onShow () {
    this._getHistoryData()
  },
  // ------------- 事件处理函数 --------------
  handleTabItemChange (e) {
    const { index } = e.detail
    const tabs = this.data.tabs
    tabs.forEach(v => {
      if (v.id === index) {
        v.isActive = true
      } else {
        v.isActive = false
      }
    })

    this.setData({
      tabs
    })
  },
  // ------------- 网络请求函数 -------------
  _getHistoryData () {
    // 获取小程序当前的页面
    const currentPages = getCurrentPages()
    // 获取调转到当前页面的参数
    const type = currentPages[currentPages.length - 1].options.type
    // console.log(type)
    getHistoryData(type).then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }
})