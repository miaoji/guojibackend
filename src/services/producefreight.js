import { request, config } from '../utils'
const { api } = config
const { producefreight } = api

export async function query (params) {
  return request({
    url: producefreight,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: producefreight.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: producefreight,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: producefreight,
    method: 'patch',
    data: params,
  })
}
