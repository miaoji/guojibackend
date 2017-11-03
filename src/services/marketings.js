import { request, config, pageParams,} from '../utils'
const { wxmenu, wxuser, } = config.api

export async function query (params) {
  params = pageParams(params)
  return request({
    url: wxuser.all,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return
  return request({
    url: wxmenu.create,
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
  return
  return request({
    url: wxmenu.setmenu,
    method: 'post',
    params,
  })
}
