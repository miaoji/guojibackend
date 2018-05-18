import { request, config } from '../utils'
const { api } = config
const { login } = api

export async function accountLogin (data) {
  return request({
    url: login.accountLogin,
    method: 'get',
    data,
  })
}

export async function getVerifyImage () {
  return request({
    url: login.getVerifyImage,
    method: 'get',
  })
}

export async function getVerifyCodeByMobile (data) {
  return request({
	  url: login.getMobileCode,
	  method: 'get',
	  data,
  })
}

export async function mobileLogin (data) {
  return request({
    url: login.mobileLogin,
    method: 'get',
    data,
  })
}
