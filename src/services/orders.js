import { request, config, pageParams } from '../utils'
const { api } = config
const { orders } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: orders,
    method: 'get',
    data: params,
  })
}
