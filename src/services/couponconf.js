import { request, config, pageParams } from '../utils'
const { couponconf } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: couponconf.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: couponconf.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: couponconf.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: couponconf.hide,
    method: 'delete',
    params,
  })
}

export async function couponToWxUser (params) {
  return request({
    url: couponconf.couponToWxUser,
    method: 'post',
    params
  })
}

export async function enable (params) {
  return request({
    url: couponconf.enable,
    method: 'post',
    params
  })
}
