import {getGoodsDetailData} from '../../request/goods_detail.js'

Page({
  data: {
    goodsId: '',
    goodsInfo: {}
  },
  GoodsInfo: {},
  onLoad: function (options) {
    const { goods_id } = options
    this.setData({
      goodsId: goods_id
    })
    this._getGoodsDetailData()
  },
  // -------------- 网络请求处理函数 ---------
  _getGoodsDetailData () {
    const data = {
      goods_id: this.data.goodsId
    }
    getGoodsDetailData(data).then(res => {
      const goodsInfo = res.data.message
      this.GoodsInfo = goodsInfo
      this.setData({
        goodsInfo: {
          goods_name: goodsInfo.goods_name,
          goods_price: goodsInfo.goods_price,
          goods_introduce: goodsInfo.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: goodsInfo.pics
        }
      })
    })
    .catch(err => {
      console.log('商品详情信息获取失败', err)
    })
  },
  // -------------- 事件处理函数 ---------
  handleImgPreview (e) {
    const urls = this.data.goodsInfo.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    })
  },
  handleAddCart () {
    const cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(i => i.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      cart[index].num++
    }
    wx.setStorageSync("cart", cart)
    wx.showToast({
      title: '成功加入购物车',
      icon: 'none',
      mask: true
    })
  }
})