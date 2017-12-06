import config from './config'
import menu from './menu'
import request from './request'
import * as time from './time'
import classnames from 'classnames'
import { color } from './theme'
import lodash from 'lodash'

const localStorage = window.localStorage
const { localPrefix } = config

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * 对网络请求的params做处理，针对分页
 * @param   {params} Object
 * @return  {params} Object
 */
const pageParams = function (params) {
  params = params || {
    page: 1,
    rows: 10,
  }
  params.page = params.page || 1
  params.rows = params.pageSize || 10
  return params
}

/**
 * [对localStorage操作进行封装]
 * @param  {String}  key    [存储的字段名字]
 * @param  {String}  val    [存储的字段值]
 * @param  {Boolean} prefix [是否加前缀，默认为true]
 * @param  {String}  type   [localStorage的操作方式 get、set、remove、clear]
 * @return {String} res     [localStorage.getItem(key)时返回的值]
 */
export const storage = function ({ key, val, prefix = true, type = 'get' }) {
  let typeCheck = type === 'get'
  if (prefix) {
    key = localPrefix + key
  }
  let res = ''
  switch (type) {
    case 'get':
      res = localStorage.getItem(key)
      break
    case 'set':
      localStorage.setItem(key, val)
      break
    case 'remove':
      localStorage.removeItem(key)
      break
    case 'clear':
      localStorage.clear()
      break
    default:
      break
  }
  if (typeCheck) {
    return res
  }
}

/**
 * [对含有 %20 的数据重新拼接]
 * @param  {String}  key    [要转换的数据]
 * @return {String} res     [返回重新的拼接的值]
 */
export const rebuildVal = function ( key ) {
  console.log('key',key)
  if (!key) {
    return undefined
  }
  const newVal = key.split('%20')  
  return `${newVal[0]} ${newVal[1]} ${newVal[2]}`
}


module.exports = {
  config,
  menu,
  rebuildVal,
  request,
  storage,
  time,
  color,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  pageParams,
}
