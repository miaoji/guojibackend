import { request, config, pageParams } from '../utils'
const { api } = config
const { country } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: country.show,
    method: 'get',
    data: params,
  })
}
