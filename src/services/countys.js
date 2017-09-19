import { request, config, } from '../utils'
const { api } = config
const { county } = api

export async function query (params) {
  return request({
    url: county.show,
    method: 'get',
    params
  })
}

export async function create (params) {
 	return request({
 		url: county.create,
 		method: 'post',
 		params
 	})
}

export async function update (params) {
	return request({
		url: county.update,
		method: 'post',
		params
	})
}

export async function remove (params) {
	return request({
		url: county.hide,
		method: 'delete',
		params
	})
}