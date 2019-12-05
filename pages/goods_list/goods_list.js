// pages/goods_list/goods_list.js
import { getGoodsList } from '../../request/goods_list.js'
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive:true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],
    goodsList: []
  },
  // 网络请求需要的参数
  queryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  // 数据总页数
  totalPages: 1,
  onLoad: function (options) {
    this.queryParams.cid = options.cid
    this._getGoodsList()
  },
  // 滚动条到最底部处理事件
  onReachBottom () {
    if (this.queryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有更多了~',
        icon: 'none'
      })
    } else {
      this.queryParams.pagenum++
      this._getGoodsList()
    }
  },
  // 下拉刷新事件
  onPullDownRefresh () {
    this.queryParams.pagenum = 1
    this.setData({
      goodsList: []
    })
    this._getGoodsList()
  },
  // ----------- 事件处理函数 ------------
  handleTabItemActive (e) {
    const {index} = e.detail
    const {tabs} = this.data
    tabs.forEach((item, i) => {
      if (i === index) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    this.setData({
      tabs
    })
  },
  // ------------ 网络请求处理函数 -----------
  _getGoodsList () {
    getGoodsList(this.queryParams).then(res => {
      const {goods, total} = res.data.message
      this.totalPages = Math.ceil(total / this.queryParams.pagesize)
      this.setData({
        goodsList: [...this.data.goodsList, ...goods]
      })
    })
    .catch(err => {
      console.log('goods_list数据获取失败', err)
    })
  }
})