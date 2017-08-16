import { request, config } from '../utils'
const { api } = config
const { successs } = api

export async function query (params) {
  return request({
    url: successs,
    method: 'get',
    data: params,
  })
}
