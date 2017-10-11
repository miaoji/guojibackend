import { request, config } from '../utils'
const { api } = config
const { product } = api

export async function query (params) {
  return request({
    url: product.show,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: product.create,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: product.hide,
    method: 'delete',
    params
  })
}

export async function update (params) {
  return request({
    url: product.update,
    method: 'post',
    params,
  })
}
