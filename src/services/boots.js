import { request, config, pageParams } from '../utils'
const { api } = config
const { boot } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: boot.all,
    method: 'get',
    data: params,
  })
}
