import { request, config } from '../utils'
const { api } = config
const { demo } = api

export async function query (params) {
  return request({
    url: demo,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: demo.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: demo,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: demo,
    method: 'patch',
    data: params,
  })
}
