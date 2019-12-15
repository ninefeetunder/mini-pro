import request from './request.js'
const baseURL = 'https://api.zbztb.cn'

export function getSearchList (value) {
  return request({
    url: baseURL + '/api/public/v1/goods/qsearch',
    data: {
      query: value
    }
  })
}