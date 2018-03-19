// 函数需要传入两个参数 第一个将 数组中存放 时间戳的字段 以字符串的形式传入
// 第二个参数传入的是 字段所在的数组

export const formatTime = function (val) {
  if (!val || val === null || val === '') {
    return '未知时间'
  }
  let date = new Date(Number(val))
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
    } else if (day > 21 && day < 22) {
      return '超出免费保存时间不到一天'
    }
    return `超出免费保存时间${day - 20}天`
  }
  return '未知时间'
}

// 弥补创建时间控件获取的时间戳是带当前时间的问题
// @val  [type:number] 13的时间戳
// @type [type:string] 要转换的时间是开始时间还是结束时间

export const repairTime = function (val) {
  if (val[0] !== null && val[1] !== null) {
    const date = new Date(val[0]._d)
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    const ms = date.getMilliseconds()

    const times = (h * 60 * 60 * 1000) + (m * 60 * 1000) + (s * 1000) + ms

    const startTime = new Date(val[0]._d).getTime() - times
    const endTime = new Date(val[1]._d).getTime() - times
    return {
      startTime,
      endTime,
    }
  }
  const startTime = undefined
  const endTime = undefined
  return {
    startTime,
    endTime,
  }
}

// val 时间戳
export function getToday(val) {
  let date = new Date(val)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m > 9 ? m : `0${m}`
  let d = date.getDate()
  d = d > 9 ? d : `0${d}`
  return (`${y}-${m}-${d}`)
}

export function getLineTime() {
  let date = []

  for (let i = 0; i < 30; i++) {
    date.unshift(getToday((new Date().getTime() - (86400000 * (i + 1)))))
  }
  return date
}
