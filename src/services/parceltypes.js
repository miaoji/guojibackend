import { request, config, pageParams } from '../utils'
const { api } = config
const { parceltype } = api

export async function query (params) {
	params = pageParams(params)
  return request({
    url: parceltype.all,
    method: 'get',
    data: params,
  })
}
