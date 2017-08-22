import { request, config, pageParams } from '../utils'
const { api } = config
const { all } = api.qr

export async function query (params) {
  params = pageParams(params)
  return request({
    url: all,
    method: 'get',
    data: params,
  })
}
