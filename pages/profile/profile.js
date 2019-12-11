Page({
  data: {
    userInfo: {}
  },
  onShow () {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    })
  },
  // ---------- 事件处理函数 ---------
  handleUserLogin () {
    wx.navigateTo({
      url: '../login/login'
    })
  }
})