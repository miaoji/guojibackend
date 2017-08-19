import { request, config } from '../utils'
const { api } = config
const { order, updateOrder, addOrder } = api

export async function query (params) {
  return request({
    url: order,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: addOrder,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: order,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: updateOrder,
    method: 'post',
    params,
  })
}
