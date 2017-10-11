import { request, config, pageParams } from '../utils'
const { api } = config
const { wxuser } = api

export async function query (params) {
	params = pageParams(params)
  return request({
    url: wxuser.all,
    method: 'get',
    params
  })
}
