import { request, config } from '../utils'
const { api } = config
const { fpxorders } = api

export async function query (params) {
  return request({
    url: fpxorders,
    method: 'get',
    data: params,
  })
}
