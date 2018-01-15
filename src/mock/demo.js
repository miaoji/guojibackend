const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let demosListData = Mock.mock({
  data: [{
    str: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'list|99': [
      {
        'number|+1': 1,
      },
    ],
  }],
})

let database = demosListData.data

module.exports = {

  [`GET ${apiPrefix}/demos`](req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 100
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
    })
  },

}
