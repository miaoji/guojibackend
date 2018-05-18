import { request, config } from '../utils'
const { api } = config
const { showproductName } = api

export async function query (params) {
  return request({
    url: showproductName,
    method: 'get',
    data: params,
  })
}
