import { request, config } from '../utils'
const { api } = config
const { country } = api

export async function query (params) {
  return request({
    url: country.show,
    method: 'get',
    data: params,
  }
)}

export async function getCountryId (params) {
	return request({
		url: country.getCountryId,
		method: 'get',
		params
	})
}