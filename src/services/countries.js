import { request, config } from '../utils'
const { api } = config
const { country } = api

export async function query (params) {
  return request({
    url: country.show,
    method: 'get',
    data: params,
  }
)}
