import { request, config } from '../utils'
const { api } = config
const { success } = api

export async function query (params) {
  return request({
    url: success,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: success.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: success,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: success,
    method: 'patch',
    data: params,
  })
}
