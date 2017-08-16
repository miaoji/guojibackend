import { request, config } from '../utils'
const { api } = config
const { producefreights } = api

export async function query (params) {
  return request({
    url: producefreights,
    method: 'get',
    data: params,
  })
}
