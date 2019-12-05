import {getGoodsDetailData} from '../../request/goods_detail.js'

Page({
  data: {
    goodsId: '',
    goodsInfo: {}
  },
  onLoad: function (options) {
    const { goods_id } = options
    this.setData({
      goodsId: goods_id
    })
    this._getGoodsDetailData()
  },
  // 网络请求处理函数
  _getGoodsDetailData () {
    const data = {
      goods_id: this.data.goodsId
    }
    getGoodsDetailData(data).then(res => {
      const goodsInfo = res.data.message
      this.setData({
        goodsInfo
      })
    })
    .catch(err => {
      console.log('商品详情信息获取失败', err)
    })
  }
})