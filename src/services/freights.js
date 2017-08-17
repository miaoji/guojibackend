import { request, config, pageParams } from '../utils'
const { api } = config
const { freights } = api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: freights,
    method: 'get',
    data: params,
  })
}
