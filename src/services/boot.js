import { request, config } from '../utils'
const { api } = config
const { boot } = api

export async function query (params) {
  return request({
    url: boot.show,
    method: 'get',
    params,
  })
}

export async function create (params) {
  return request({
    url: boot.add,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: boot.update,
    method: 'post',
    params,
  })
}
