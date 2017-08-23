import { request, config } from '../utils'
const { api } = config
const { country } = api

export async function query (params) {
  return request({
    url: country,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: country.create,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: country,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: country,
    method: 'patch',
    data: params,
  })
}
