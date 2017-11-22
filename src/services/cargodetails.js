import { request, config, pageParams } from '../utils'
const { api } = config
const { cargodetail, order } = api


export async function query (params) {
  params = pageParams(params)
  return request({
    url: cargodetail.all,
    method: 'get',
    params,
  })
}

export async function merge (params, data) {
  return request({
    url: cargodetail.merge,
    method: 'post',
    params,
    data,
  })
}

export async function cancel (params, data) {
  return request({
    url: cargodetail.cancel,
    method: 'post',
    params,
    data,
  })
}

export async function freight (params) {
  return request({
    url: cargodetail.setFreight,
    method: 'post',
    params,
  })
}

export async function getOrderInfo (params) {
  return request({
    url: order.getOrderInfoById,
    method: 'get',
    params
  })
}