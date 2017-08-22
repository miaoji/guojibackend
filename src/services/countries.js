import { request, config } from '../utils'
const { api } = config
const { ShowCountry } = api

export async function query (params) {
  return request({
    url: ShowCountry,
    method: 'get',
    data: params,
  })
}
