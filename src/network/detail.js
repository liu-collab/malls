import { request } from './request'

export function getdetalil(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })

}