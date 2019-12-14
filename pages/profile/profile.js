Page({
  data: {
    userInfo: {},
    collectList: []
  },
  onShow () {
    const userInfo = wx.getStorageSync('userInfo')
    const collectList = wx.getStorageSync('collect')
    this.setData({
      userInfo,
      collectList
    })
  },
  // ---------- 事件处理函数 ---------
  handleUserLogin () {
    wx.navigateTo({
      url: '../login/login'
    })
  }
})