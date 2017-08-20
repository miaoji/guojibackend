import { request, config } from '../utils'
const { api } = config
const { order, modOrder, addOrder } = api

const statusGroup = {
  '待付款': '1',
  '付款完成': '2',
  '中通完成': '3',
  'fpx完成': '0',
  '异常订单': '4',
  '取消订单': '5',
}

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
  const newParams = {
    id: params.id,
    starte: statusGroup[params.starte] ? statusGroup[params.starte] : params.starte,
    fpxno: params.FPXNO,
  }
  return request({
    url: modOrder,
    method: 'post',
    params: newParams,
  })
}
