import { request, config, pageParams } from '../utils'
const { api } = config
const { destinations } = api

export async function query (params) {
  params = pageParams(params)
  console.log('params',params)
  return request({
    url: destinations,
    method: 'get',
    data: params,
  })
}
