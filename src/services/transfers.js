import { request, config } from '../utils'
const { api } = config
const { transfer } = api

export async function query (params) {
  return request({
    url: transfer.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: transfer.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: transfer.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: transfer.hide,
    method: 'delete',
    params,
  })
}
