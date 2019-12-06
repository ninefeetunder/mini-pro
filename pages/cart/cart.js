// pages/cart/cart.js
Page({
  data: {
    address: {}
  },
  onShow () {
    const address = wx.getStorageSync('address')
    this.setData({
      address
    })
  },
  // ----------- 事件处理函数 ------------
  handleChooseAddress () {
    wx.getSetting({
      success: (res) => {
        const addressAuth = res.authSetting['scope.address']
        if (addressAuth === true || addressAuth === undefined) {
          wx.chooseAddress({
            success: (result) => {
              wx.setStorageSync('address', result)
            }
          })
        } else {
          wx.openSetting({
            success: () => {
              // 成功授予权限
              wx.chooseAddress({
                success: (result) => {
                  wx.setStorageSync('address', result)
                }
              })
            }
          })
        }
      }
    })

  }
})