import { request, config } from '../utils'
const { api } = config
const { freight } = api

export async function query (params) {
  return request({
    url: freight,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: freight.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: freight,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: freight,
    method: 'patch',
    data: params,
  })
}
