import { request, config, pageParams } from '../utils'
const { wxmenu } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: wxmenu.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: wxmenu.create,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return request({
    url: wxmenu.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return request({
    url: wxmenu.hide,
    method: 'delete',
    params,
  })
}

export async function setmenu (params) {
  return request({
    url: wxmenu.setmenu,
    method: 'post',
    params,
  })
}