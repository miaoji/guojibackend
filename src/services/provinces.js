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

export async function create (params) {
	console.log('params', params)
	return request({
		url: province.create,
		method: 'post',
		params
	})
}