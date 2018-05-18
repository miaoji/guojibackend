import { request, config } from '../utils'
const { api } = config
const { showPTypeByCounId } = api

export async function query (params) {
  return request({
    url: showPTypeByCounId,
    method: 'get',
    params,
  })
}
