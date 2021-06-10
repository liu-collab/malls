//封装home页面的网络请求
//只封装地址

import { request } from "./request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}