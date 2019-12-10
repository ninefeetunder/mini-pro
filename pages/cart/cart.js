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
  // 单个商品选择处理
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
  //  商品全选与反选
  handleAllChoose () {
    const cart = this.data.cart
    let allChecked = this.data.allChecked
    if (!allChecked) {
      cart.forEach(v => {
        if (!v.checked) {
          v.checked = true
        }
      })
    } else {
      cart.forEach(v => {
        v.checked = false
      })
    }
    allChecked = !allChecked
    this.setData({
      cart,
      allChecked
    })
    wx.setStorageSync('cart', cart)
    this.getCartData()
  },
  handleDelGoods (e) {
    const goodsId = e.currentTarget.dataset.goodsid
    const cart = this.data.cart
    const index = cart.findIndex(v => v.goods_id === goodsId)
    if (cart[index].num === 1) {
      wx.showModal({
        title: '提示',
        content: '删除该商品？',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1)
            this.setData({
              cart
            })
            wx.setStorageSync('cart', cart)
            this.getCartData()
          }
        }
      })
    } else {
      cart[index].num--
    }
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.getCartData()
  },
  handleAddGoods (e) {
    const goodsId = e.currentTarget.dataset.goodsid
    const cart = this.data.cart
    cart.forEach(v => {
      if (v.goods_id === goodsId) {
        v.num++
      }
    })
    this.setData({
      cart
    })
    wx.setStorageSync('cart', cart)
    this.getCartData()
  },
  handlePay () {
    const {address, totalNum} = this.data
    if (!address.userName) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
      return
    }
    if (!totalNum) {
      wx.showToast({
        title: '购物车里没有商品哦~',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
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