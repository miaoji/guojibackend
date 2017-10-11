import { request, config } from '../utils'
const { api } = config
const { freight } = api

export async function query (params) {
  return request({
    url: freight.show,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: freight.create,
    method: 'post',
    params
  })
}

export async function remove (params) {
  return request({
    url: freight.hide,
    method: 'delete',
    params
  })
}

export async function update (params) {
  return request({
    url: freight.update,
    method: 'post',
    params,
  })
}
