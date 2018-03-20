import { request, config } from '../utils'
const { api } = config
const { dashboard } = api

export async function myCity (params) {
  return request({
    url: 'http://www.zuimeitianqi.com/zuimei/myCity',
    data: params,
  })
}

export async function queryWeather (params) {
  return request({
    url: 'http://www.zuimeitianqi.com/zuimei/queryWeather',
    data: params,
  })
}

export async function query(params) {
  return request({
    url: dashboard.all,
    method: 'get',
    data: params,
  })
}

export async function line(params) {
  return request({
    url: dashboard.line,
    method: 'get',
    data: params,
  })
}
