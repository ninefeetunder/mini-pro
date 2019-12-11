// pages/cart/cart.js
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow () {
    this.getAddressData()
    this.getCartData()
  },
  // ----------- 事件处理函数 ------------
  getCartData () {
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter(v => v.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalNum += v.num
      totalPrice += v.num * v.goods_price
    })
    this.setData({
      cart,
      totalNum,
      totalPrice
    })
  },
  getAddressData () {
    const address = wx.getStorageSync('address')
    this.setData({
      address
    })
  },
  handlePay () {
    let token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '../auth/auth'
      })
      return
    }
    console.log('token已经存在')

  }
})