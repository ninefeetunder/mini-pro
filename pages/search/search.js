import { getSearchList } from '../../request/search.js'

Page({
  data: {
    searchList: [],
    inputVal: '',
    isFocus: false
  },
  timer: 0,
  // ------ 事件处理函数 --------
  handleSearchInput (e) {
    let timer = this.timer
    // 函数防抖
    clearTimeout(timer)
    let { value } = e.detail
    if(!value.trim()) {
      this.setData({
        searchList: [],
        isFocus: false
      })
      return
    } else {
      this.timer = setTimeout(() => {
        this._getSearchList(value)
      }, 1000)
      this.setData({
        isFocus: true
      })
    }
  },
  handleCancel () {
    this.setData({
      searchList: [],
      inputVal: '',
      isFocus: false
    })
  },
  // --------- 网络请求函数 ---------
  _getSearchList (value) {
    getSearchList(value).then(res => {
      const {message} = res.data
      this.setData({
        searchList: message
      })
    })
    .catch(err => {
      console.log('商品搜索失败', err)
    })
  }
})