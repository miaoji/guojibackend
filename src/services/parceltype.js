import { request, config } from '../utils'
const { api } = config
const { parceltype, parceltypesadd, parceltypesup } = api

export async function query (params) {
  return request({
    url: parceltype,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: parceltypesadd,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: parceltype,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: parceltypesup,
    method: 'post',
    params,
  })
}
