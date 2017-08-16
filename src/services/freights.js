import { request, config } from '../utils'
const { api } = config
const { freights } = api

export async function query (params) {
  return request({
    url: freights,
    method: 'get',
    data: params,
  })
}
