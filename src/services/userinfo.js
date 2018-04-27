import { request, config, pageParams } from '../utils'
const { userinfo } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: userinfo.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: userinfo.create,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: userinfo.update,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: userinfo.hide,
    method: 'delete',
    params,
  })
}
