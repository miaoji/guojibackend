import { request, config, pageParams } from '../utils'
const { audit } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: audit.all,
    method: 'get',
    params,
  })
}

export async function refuse (params) {
  return request({
    url: audit.refuse,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: audit.update,
    method: 'post',
    params,
  })
}

// export async function remove (params) {
//   return request({
//     url: audit.hide,
//     method: 'delete',
//     params,
//   })
// }
