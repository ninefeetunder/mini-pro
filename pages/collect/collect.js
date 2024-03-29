// pages/collect/collect.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      }
    ],
    collect: []
  },
  onShow () {
    this.getCollectData()
  },
  // ------------ 事件处理函数 ---------
  handleTabItemChange (e) {
    const {index} = e.detail
    const {tabs} = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false )
    this.setData({
      tabs
    })
  },
  getCollectData () {
    const collect = wx.getStorageSync('collect') || []
    this.setData({
      collect
    })
  }
})