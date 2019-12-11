import request from './request.js'

const baseURL = 'https://api.zbztb.cn'

export function getToken (data) {
  return request({
    url: baseURL + '/api/public/v1/users/wxlogin',
    data,
    method: 'post'
  })
}