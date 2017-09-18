import { request, config, pageParams } from '../utils'
const { api } = config
const { county } = api

export async function query (params) {
	params = pageParams(params)
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