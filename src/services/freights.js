import { request, config, pageParams } from '../utils'
const { api } = config
const { freight } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: freight.all,
    method: 'get',
    data: params,
  })
}
