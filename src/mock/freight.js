const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

let freightsListData = Mock.mock({
  'data|40-50': [
    {
      id: '@id',
      did: /^\d{8}$/,
      wxName: '@cname',
      czr: '@cname',
      'mddgj|1': ['中国', '澳大利亚', '美国', '英国', '中国', '中国'], // 目的地国家
      nickName: '@cname',
      wplx: '未定义', // 物品类型
      cplx: '未定义', // 产品类型
      phone: /^1[34578]\d{9}$/,
      belongStore: '@county',
      'newmoney|1-99': 1, // 初始价格
      'sz|5-10': 1, // 首重
      'xz|5-10': 1, // 续重
      'bj|5-10': 1, // 步进范围
      'myc|30-50': 1, // 燃油附加费
      yb: /^\d{6}$/,
      remark: '暂无', // 备注
      'minweight|1-99': 1,
      'status|0-1': 1,
      'blacklist|0-1': 1,
      'consume|0-999': 1,
      createTime: '@datetime',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
    },
  ],
})

let database = freightsListData.data

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`GET ${apiPrefix}/freights`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
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
      total: newData.length,
    })
  },

  [`GET ${apiPrefix}/freight/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${apiPrefix}/freight/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
