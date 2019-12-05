let ajaxTimes = 0

export default function (options) {
  // 显示加载中 效果
  ajaxTimes++
  wx.showLoading({
    title: '加载中...',
    mask: true
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || "get",
      data: options.data || null,
      success (res) {
        ajaxTimes--
        resolve(res)
      },
      fail (err) {
        ajaxTimes--
        reject(err)
      },
      complete () {
        if (ajaxTimes === 0) {
          wx.hideLoading()
        }
      }
    })
  })
}
