import { request, config } from '../utils'
const { api } = config
const { product } = api

export async function query (params) {
  return request({
    url: product,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: product.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: product,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: product,
    method: 'patch',
    data: params,
  })
}
