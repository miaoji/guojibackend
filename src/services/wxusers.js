import { request, config } from '../utils'
const { api } = config
const { wxusers } = api

export async function query (params) {
  return request({
    url: wxusers,
    method: 'get',
    data: params,
  })
}
