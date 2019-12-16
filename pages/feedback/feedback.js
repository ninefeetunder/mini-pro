// pages/feedback/feedback.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '意见反馈',
        isActive: true
      },
      {
        id: 1,
        value: '商品、用户投诉',
        isActive: false
      }
    ],
    imgList: []
  },
  handleTabItemChange (e) {
    const {index} = e.detail
    const tabs = this.data.tabs
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  handleUploadImg () {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        this.setData({
          imgList: [...this.data.imgList, ...tempFilePaths]
        })
      }
    })
  },
  handleDeleteImg (e) {
    const {index} = e.detail
    const {imgList} = this.data
    imgList.splice(index, 1)
    this.setData({
      imgList
    })
  }
})