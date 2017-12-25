import { request, config } from '../utils'
const { api } = config
const { wxuser } = api

export async function query (params) {
  return request({
    url: wxuser.all,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: wxuser,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: wxuser.update,
    method: 'post',
    params,
  })
}
