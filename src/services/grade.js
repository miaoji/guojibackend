import { request, config, pageParams } from '../utils'
const { grade } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: grade.all,
    method: 'get',
    params,
  })
}

export async function create (params) {
  return request({
    url: grade.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: grade.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: grade.hide,
    method: 'delete',
    params,
  })
}
