import { getCategoryData } from '../../request/category.js'

Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    //  右侧的商品数据
    rightContent: [],
    // 当前激活的菜单
    currentIndex: 0,
    // 右侧商品内容距离顶部的距离
    scrollTop: 0
  },
  // 接口返回的所有数据
  cates: [],
  onLoad: function (options) {
    // 数据本地缓存
    const cates = wx.getStorageSync('cates')
    if (!cates) {
      this._getCategoryData()
    } else {
      // 过期时间为10分钟
      if (Date.now() - cates.time > 1000 * 60 * 10) {
        this._getCategoryData()
      } else {
        // 数据未过期
        this.cates = cates.cates
        // 拿到左边菜单数据
        const leftMenuList = this.cates.map(item => item.cat_name)
        // 拿到右边商品数据
        const rightContent = this.cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // -------- 处理网络请求函数 ----------
  _getCategoryData () {
    getCategoryData().then(res => {
      // console.log(res)
      const cates = res.data.message
      wx.setStorageSync('cates', {time: Date.now(), cates})
      this.cates = cates
      // 拿到左边菜单数据
      const leftMenuList = this.cates.map(item => item.cat_name)
      // 拿到右边商品数据
      const rightContent = this.cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
    .catch(err => {
      console.log('分类页数据请求失败', err)
    })
  },
  // ------------- 处理事件函数 -----------
  handleMenuChange (e) {
    // console.log(e.currentTarget.dataset.index)
    const currentIndex = e.currentTarget.dataset.index
    const rightContent = this.cates[currentIndex].children
    this.setData({
      currentIndex,
      rightContent,
      // 让新的商品列表页回到顶部
      scrollTop: 0
    })
  }

})