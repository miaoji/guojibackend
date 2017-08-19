import { request, config, pageParams } from '../utils'
const { api } = config
const { parceltypes } = api

export async function query (params) {
	params = pageParams(params)
  return request({
    url: parceltypes,
    method: 'get',
    data: params,
  })
}
