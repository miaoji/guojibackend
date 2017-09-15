import { request, config, pageParams } from '../utils'
const { api } = config
const { province } = api

export async function query (params) {
	params = pageParams(params)
  return request({
    url: province.show,
    method: 'post',
    params
  })
}
