import request from './request.js'

const baseURL = 'https://api.zbztb.cn'

export function getSwiperData () {
  return request({
    url: baseURL + '/api/public/v1/home/swiperdata'
  })
}

export function getCateList () {
  return request({
    url: baseURL + '/api/public/v1/home/catitems'
  })
}

export function getFloorList() {
  return request({
    url: baseURL + '/api/public/v1/home/floordata'
  })
}