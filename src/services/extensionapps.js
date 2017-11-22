import { request, config, pageParams } from '../utils'
const { extensionapp } = config.api

export async function query (params) {
  params = pageParams(params)
  console.log('params', params)
  return request({
    url: extensionapp.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: extensionapp.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: extensionapp.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: extensionapp.hide,
    method: 'delete',
    params,
  })
}
