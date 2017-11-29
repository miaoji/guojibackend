import { request, config, pageParams } from '../utils'
const { api } = config
const { cargodetail, order } = api

// 获取分页信息
export async function query (params) {
  params = pageParams(params)
  return request({
    url: cargodetail.all,
    method: 'get',
    params,
  })
}

// 获取合单modal父级订单下拉框
export async function parentOrder (params) {
  return request({
    url: cargodetail.all,
    method: 'get',
    params: {
      parentId: -10,
      ...params,
    },
  })
}

// 合单
export async function merge (params, data) {
  return request({
    url: cargodetail.merge,
    method: 'post',
    params,
    data,
  })
}

// 撤销合单
export async function cancel (params, data) {
  return request({
    url: cargodetail.cancel,
    method: 'post',
    params,
    data,
  })
}

// 定价
export async function freight (params) {
  return request({
    url: cargodetail.setFreight,
    method: 'post',
    params,
  })
}

// 在撤销订单的时候通过订单Id过去订单的信息
export async function getOrderInfo (params) {
  return request({
    url: order.getOrderInfoById,
    method: 'get',
    params,
  })
}
