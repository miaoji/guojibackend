import { request, config, pageParams } from '../utils'
const { api } = config
const { cargodetail } = api


export async function query (params) {
  params = pageParams(params)
  return request({
    url: cargodetail.all,
    method: 'get',
    params,
  })
}

export async function merge (params, data) {
	return request({
		url: cargodetail.merge,
		method: 'post',
    params,
		data
	})
}