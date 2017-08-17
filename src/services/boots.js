import { request, config, pageParams } from '../utils'
const { api } = config
const { boots } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: boots,
    method: 'get',
    data: params,
  })
}
