import request from './request.js'

const baseURL = 'https://api.zbztb.cn'

export function getGoodsDetailData (data) {
  return request({
    url: baseURL + '/api/public/v1/goods/detail',
    data
  })
}