import { request, config, pageParams } from '../utils'
const { api } = config
const { city } = api

export async function query (params) {
	params = pageParams(params)
  return request({
    url: city.show,
    method: 'get',
    params
  })
}

export async function create (params) {
	return request({
		url: city.create,
		method: 'post',
		params
	})
}