import { request, config } from '../utils'
const { api } = config
const { province, city, county } = api

export async function query ({ params, type }) {
  return request({
    url: api[type].show,
    method: 'get',
    data: params,
  })
}

export async function create ({ params, type }) {
  return request({
    url: api[type].create,
    method: 'get',
    data: params,
  })
}
