import { request, config } from '../utils'
const { api } = config
const { country } = api

export async function query (params) {
  return request({
    url: country,
    method: 'get',
    data: params,
  })
}
// 新增国家
export async function create (params) {
  return request({
    url: country.create,
    method: 'post',
    params,
  })
}
// 删除国家
export async function remove (params) {
  return request({
    url: country.hide,
    method: 'delete',
    params,
  })
}
// 修改国家
export async function update (params) {
  return request({
    url: country.update,
    method: 'post',
    params,
  })
}
