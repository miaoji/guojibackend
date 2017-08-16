import { request, config } from '../utils'
const { api } = config
const { destinations } = api

export async function query (params) {
  return request({
    url: destinations,
    method: 'get',
    data: params,
  })
}
