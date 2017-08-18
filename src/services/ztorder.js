import { request, config } from '../utils'
const { api } = config
const { ztorder, createZtorder } = api

export async function query (params) {
  return request({
    url: ztorder,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: createZtorder,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: ztorder,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: ztorder,
    method: 'patch',
    data: params,
  })
}
