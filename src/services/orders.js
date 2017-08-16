import { request, config } from '../utils'
const { api } = config
const { orders } = api

export async function query (params) {
  return request({
    url: orders,
    method: 'get',
    data: params,
  })
}
