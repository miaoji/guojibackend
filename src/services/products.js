import { request, config, pageParams } from '../utils'
const { api } = config
const { product } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: product.all,
    method: 'get',
    data: params,
  })
}
