import { request, config } from '../utils'
const { api } = config
const { demos } = api

export async function query (params) {
  return request({
    url: demos,
    method: 'get',
    data: params,
  })
}
