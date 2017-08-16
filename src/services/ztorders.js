import { request, config } from '../utils'
const { api } = config
const { ztorders } = api

export async function query (params) {
  return request({
    url: ztorders,
    method: 'get',
    data: params,
  })
}
