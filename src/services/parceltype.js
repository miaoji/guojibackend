import { request, config } from '../utils'
const { api } = config
const { parceltype, country, } = api

export async function query (params) {
  return request({
    url: parceltype.show,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: parceltype.create,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: parceltype.hide,
    method: 'delete',
    data:params
  })
}

export async function update (params) {
  return request({
    url: parceltype.update,
    method: 'post',
    params,
  })
}

export async function getCountyId (params) {
  return request({
    url: country.getCountyId,
    method: 'get',
    params,
  })
}