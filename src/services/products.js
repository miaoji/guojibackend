import { request, config } from '../utils'
const { api } = config
const { products } = api

export async function query (params) {
  return request({
    url: products,
    method: 'get',
    data: params,
  })
}
