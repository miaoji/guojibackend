import { request, config, pageParams } from '../utils'
const { api } = config
const { county } = api

export async function query (params) {
	params = pageParams(params)
  return request({
    url: county.show,
    method: 'post',
    params
  })
}
