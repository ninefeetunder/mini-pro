// pages/cart/cart.js
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow () {
    this.getAddressData()
    this.getCartData()
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

  },
  handleCheckedChange (e) {
    // console.log(e.currentTarget.dataset.goodsid)
    const goodsId = e.currentTarget.dataset.goodsid
    const cart = this.data.cart
    // console.log(cart)
    cart.forEach(v => {
      if (v.goods_id === goodsId) {
        v.checked = !v.checked
      }
    })
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.getCartData()
  },
  handleAllChoose () {
    const cart = this.data.cart
    cart.forEach(v => {
      if (!v.checked) {
        v.checked = true
      }
    })
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.getCartData()
  },
  getCartData () {
    const cart = wx.getStorageSync('cart') || []
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalNum += v.num
        totalPrice += v.num * v.goods_price
      } else {
        allChecked = false
      }
    })

    if (!cart.length) {
      allChecked = false
    }
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
  },
  getAddressData () {
    const address = wx.getStorageSync('address')
    this.setData({
      address
    })
  }
})