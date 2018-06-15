import { request, config, pageParams } from '../utils'
const { wxreply } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: wxreply.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: wxreply.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: wxreply.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: wxreply.hide,
    method: 'delete',
    params,
  })
}

