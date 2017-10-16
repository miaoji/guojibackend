import { request, config, pageParams,} from '../utils'
const { wxconfig } = config.api

export async function query (params) {
  params = pageParams(params)
  console.log('params',params)
  return request({
    url: wxconfig.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: wxconfig.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: wxconfig.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: wxconfig.hide,
    method: 'delete',
    params,
  })
}
