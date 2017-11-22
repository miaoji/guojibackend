import { request, config } from '../utils'
const { api } = config
const { province } = api

export async function query (params) {
  return request({
    url: province.show,
    method: 'get',
    params,
  })
}

export async function create (params) {
  console.log('params', params)
  return request({
    url: province.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: province.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: province.hide,
    method: 'delete',
    params,
  })
}
