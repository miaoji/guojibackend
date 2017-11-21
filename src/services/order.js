import { request, config } from '../utils'
const { api } = config
const { order } = api

export async function query (params) {
  return request({
    url: order.show,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: order.create,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: order.hide,
    method: 'delete',
    params
  })
}

export async function update (params) {
  return request({
    url: order.mod,
    method: 'post',
    params
  })
}

// 新增国内(中通)订单
export async function createChinaOrder (params) {
  return request({
    url: order.createChinaOrder,
    method: 'post',
    params,
  })
}

// 动态获取国际段快递公司
export async function getKdCompany (params) {
  return request({
    url: order.getKdCompany,
    method: 'get',
    params
  })
}
// 获取orderdetail页面信息
export async function getOrderInfo (params) {
  return request({
    url: order.getOrderInfo,
    method: 'get',
    params
  })
}

// 根据订单号获取快件信息
export async function getOrderInfoByOrderNo (params) {
  return request({
    url: order.getOrderInfoByOrderNo,
    method: 'get',
    params
  })
}

// 根据订单号获取快递信息
export async function queryByCompany (params) {
  return request({
    url: order.queryByCompany,
    method: 'get',
    params
  })
}