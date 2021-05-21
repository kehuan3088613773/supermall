import {request} from "./request"

export function getHomeMultidate() {
  return request({
    url: 'http://123.207.32.32:8000/api/v1/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
