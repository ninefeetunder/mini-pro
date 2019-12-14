import request from './request'

const baseURL = 'https://api.zbztb.cn'

export function getHistoryData (type) {
  return request({
    url: baseURL + '/api/public/v1/my/orders/all',
    data: {
      type
    }
  })
}