import { request, config, pageParams } from '../utils'
const { api } = config
const { cargo } = api


export async function query (params) {
  params = pageParams(params)
  return request({
    url: cargo.all,
    method: 'get',
    data: params,
  })
}

