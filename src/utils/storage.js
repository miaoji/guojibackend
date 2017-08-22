import { localPrefix } from './config' 
const localStorage = window.localStorage
/**
 * [对localStorage操作进行封装]
 * @param  {String}  key    [存储的字段名字]
 * @param  {String}  val    [存储的字段值]
 * @param  {Boolean} prefix [是否加前缀，默认为true]
 * @param  {String}  type   [localStorage的操作方式 get、set、remove、clear]
 * @return {String} res     [localStorage.getItem(key)时返回的值]
 */
export default function storage ({key, val, prefix = true, type = 'get'}) {
	let typeCheck = type === 'get'
	if (prefix && typeCheck) {
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
