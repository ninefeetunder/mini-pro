// 只能使用相对路径
import { getSwiperData,
         getCateList,
         getFloorList
        } from '../../request/home.js'


Page({
  data: {
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: []
  },
  onLoad: function (options) {
    this._getSwiperData()
    this._getCateList()
    this._getFloorList()
  },
  // ----------- 处理网络请求的函数 ---------
  _getSwiperData () {
    getSwiperData().then(res => {
      // console.log(res)
      const swiperList = res.data.message
      this.setData({
        swiperList
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  _getCateList () {
    getCateList().then(res => {
      // console.log(res)
      const catesList = res.data.message
      this.setData({
        catesList
      })

    })
    .catch(err => {
      console.log(err)
    })
  },
  _getFloorList () {
    getFloorList().then(res => {
      // console.log(res)
      const floorList = res.data.message
      this.setData({
        floorList
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
})
