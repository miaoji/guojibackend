import { request, config } from '../utils'
const { api } = config
const { parceltype } = api

export async function query (params) {
  return request({
    url: parceltype,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: parceltype.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: parceltype,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: parceltype,
    method: 'patch',
    data: params,
  })
}
