import { request, config } from '../utils'
const { api } = config
const { boot, addBoot, updateBoot } = api

export async function query (params) {
  return request({
    url: boot,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  console.log('params', params)
  return request({
    url: addBoot,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: updateBoot,
    method: 'post',
    params,
  })
}
