import { request, config } from '../utils'
const { api } = config
const { product, productadd, productup } = api

export async function query (params) {
  return request({
    url: product,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: productadd,
    method: 'post',
    params,
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
    url: productup,
    method: 'post',
    params,
  })
}
