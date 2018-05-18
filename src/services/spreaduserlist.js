import { request, config, pageParams } from '../utils'
const { spreaduserlist } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: spreaduserlist.all,
    method: 'get',
    params,
  })
}

// export async function create (params) {
//   return request({
//     url: spreaduserlist.create,
//     method: 'post',
//     params,
//   })
// }

// export async function update (params) {
//   return request({
//     url: spreaduserlist.update,
//     method: 'post',
//     params,
//   })
// }

// export async function remove (params) {
//   return request({
//     url: spreaduserlist.hide,
//     method: 'delete',
//     params,
//   })
// }
