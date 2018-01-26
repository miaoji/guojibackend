import { request, config, pageParams } from '../utils'
const { locus } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: locus.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: locus.create,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: locus.update,
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request({
    url: locus.hide,
    method: 'delete',
    params,
  })
}
