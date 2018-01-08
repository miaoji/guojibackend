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

// export async function create (params) {
//   console.log(111)
//   return request({
//     url: audit.create,
//     method: 'post',
//     params,
//   })
// }

export async function update (params) {
  return request({
    url: audit.update,
    method: 'post',
    params,
  })
}

// export async function remove (params) {
//   console.log('delete', params)
//   return request({
//     url: audit.hide,
//     method: 'delete',
//     params,
//   })
// }
