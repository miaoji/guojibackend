import { request, config, pageParams } from '../utils'
const { couponlog } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: couponlog.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: couponlog.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: couponlog.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: couponlog.hide,
    method: 'delete',
    params,
  })
}
