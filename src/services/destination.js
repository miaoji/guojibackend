import { request, config } from '../utils'
const { api } = config
const { destination } = api

export async function query (params) {
  return request({
    url: destination,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: destination.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: destination,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: destination,
    method: 'patch',
    data: params,
  })
}
