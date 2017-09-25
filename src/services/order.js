import { request, config } from '../utils'
const { api } = config
const { order } = api

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
  const newParams = {
    id: params.id,
    status: statusGroup[params.starte] ? statusGroup[params.starte] : params.starte,
    intlNo: params.FPXNO,
    transferCompany: params.nation_express_com
  }
  return request({
    url: order.mod,
    method: 'post',
    params: newParams,
  })
}

export async function createChinaOrder (params) {
  return request({
    url: order.createChinaOrder,
    method: 'post',
    params,
  })
}
