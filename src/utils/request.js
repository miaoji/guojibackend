import axios from 'axios'
import qs from 'qs'
// import { YQL, CORS } from './config'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { browserHistory } from 'dva/router'
import { storage } from '../utils'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    params,
    fetchType,
    url,
    timeout = 60000,
  } = options

  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message.error(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`
    data = null
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios({
        url,
        method: 'get',
        params: cloneData || params,
        timeout,
        headers: {
          token: storage({ key: 'token' }),
        },
      })
    case 'delete':
      return axios({
        url,
        method: 'delete',
        params: cloneData || params,
        timeout,
        headers: {
          token: storage({ key: 'token' }),
        },
      })
    case 'post':
      return axios({
        url,
        method: 'post',
        data: cloneData,
        params,
        timeout,
        headers: {
          token: storage({ key: 'token' }),
        },
      })
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  // 判断如果不是登陆页 在localStorage 中没有token的话  就跳转到login页面上
  if (window.location.pathname !== '/login') {
    const token = storage({ key: 'token' })
    if (!token || token === '') { return browserHistory.push('/login') }
  }
  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = response.data
    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
      // 判断token是否失效
      if (response.status === 401) {
        storage({ type: 'clear' })
        setTimeout(() => {
          window.location.href = `${window.location.origin}/login`
        }, 3000)
        return { success: false, statusCode, msg: '用户登陆状态已失效,页面将在3秒后自动跳转回登录页,请登录' }
      }
    } else {
      statusCode = 600
      msg = '网络错误'
    }
    return { success: false, statusCode, message: msg }
  })
}
