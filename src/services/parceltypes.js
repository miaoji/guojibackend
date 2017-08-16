import { request, config } from '../utils'
const { api } = config
const { parceltypes } = api

export async function query (params) {
  return request({
    url: parceltypes,
    method: 'get',
    data: params,
  })
}
