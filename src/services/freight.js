import { request, config } from '../utils'
const { api } = config
const { freight,freightadd, freightup } = api

export async function query (params) {
  return request({
    url: freight,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: freightadd,
    method: 'post',
    params
  })
}

export async function remove (params) {
  return request({
    url: freight,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: freightup,
    method: 'post',
    params,
  })
}
