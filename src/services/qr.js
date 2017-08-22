import { request, config } from '../utils'
const { qr } = config.api

export async function query (params) {
  return request({
    url: qr.show,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: qr.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: qr.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: qr.del,
    method: 'post',
    params,
  })
}
