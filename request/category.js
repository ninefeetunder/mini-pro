import request from './request.js'

const baseURL = 'https://api.zbztb.cn'

export function getCategoryData () {
  return request({
    url: baseURL + '/api/public/v1/categories'
  })
}