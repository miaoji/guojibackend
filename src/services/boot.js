import { request, config } from '../utils'
const { api } = config
const { addBoot, updateBoot } = api

export async function create (params) {
  return request({
    url: addBoot,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: updateBoot,
    method: 'post',
    params,
  })
}
