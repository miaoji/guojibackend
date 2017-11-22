import { request, config, pageParams } from '../utils'
const { wxmenu, wxuser, marketing } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: wxuser.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  // console.log('add',params)
  return request({
    url: marketing.setmenu,
    method: 'post',
    params,
  })
}

export async function update (params) {
  return
  return request({
    url: wxmenu.update,
    method: 'post',
    params,
  })
}

export async function remove (params) {
  return
  return request({
    url: wxmenu.hide,
    method: 'delete',
    params,
  })
}

export async function setmenu (params) {
  // console.log('params',params)
  return
  return request({
    url: marketing.setmenu,
    method: 'post',
    params,
  })
}
