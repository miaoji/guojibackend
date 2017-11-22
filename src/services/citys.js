import { request, config } from '../utils'
const { api } = config
const { city } = api

export async function query (params) {
  return request({
    url: city.show,
    method: 'get',
    params,
  })
}

export async function create (params) {
  return request({
    url: city.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: city.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: city.hide,
    method: 'delete',
    params,
  })
}
