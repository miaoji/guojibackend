import { request, config } from '../utils'
const { api } = config
const { fpxorder } = api

export async function query (params) {
  return request({
    url: fpxorder,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: fpxorder.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: fpxorder,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: fpxorder,
    method: 'patch',
    data: params,
  })
}
