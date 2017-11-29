// 函数需要传入两个参数 第一个将 数组中存放 时间戳的字段 以字符串的形式传入
// 第二个参数传入的是 字段所在的数组

export const formatTime = function (val) {
  if (val == null || val == '') {
    return '未知时间'
  }
  let date = new Date(parseInt(val))
  let y = date.getFullYear()
  let m = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1)
  let d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  let mm = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  let s = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

  return (`${y}/${m}/${d} ${h}:${mm}:${s}`)
}

export const rebuildTime = function (val) {
  if (val === null || val === '' || !val) {
    return '未知时间'
  }
  const oldDate = Number(val)
  const newDate = new Date().getTime()
  const date = Number(newDate - oldDate)
  if (date > 0 && date < 60000) {
    return '刚刚'
  } else if (date > 60000 && date < 3600000) {
    const m = Math.floor(date / 60000)
    return `${m}分钟前`
  } else if (date > 3600000 && date < 86400000) {
    const h = Math.floor(date / 3600000)
    return `${h}小时前`
  } else if (date >= 86400000) {
    const day = Math.floor(date / 86400000)
    if (day < 21) {
      return `已到件${day}天`
    } else if (day > 21 < 22) {
      return '超出免费保存时间不到一天'
    }
    return `超出免费保存时间${day - 21}天`
  }
}
