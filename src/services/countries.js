import { request, config } from '../utils'
const { api } = config
const { country, province, city, county, } = api

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

export async function getProvinceId (params) {
	return request({
		url: province.show,
		method: 'get',
		params
	})
}

export async function getCityId (params) {
	return request({
		url: city.show,
		method: 'get',
		params
	})
}

export async function getCountyId (params) {
	return request({
		url: county.show,
		method: 'get',
		params
	})
}