import request from './request.js'

const baseURL = 'https://api.zbztb.cn'

export function getGoodsList (data) {
  return request({
    url: baseURL + '/api/public/v1/goods/search',
    data
  })
}