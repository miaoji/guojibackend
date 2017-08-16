import { color } from '../utils/theme'
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config

const Dashboard = Mock.mock({
  'sales|8': [
    {
      'name|+1': 2008,
      'Clothes|200-500': 1,
      'Food|180-400': 1,
      'Electronics|300-550': 1,
    },
  ],
  user: {
    name: '圈嘀',
    email: 'quandi@gmail.com',
    sales: 3241,
    sold: 3556,
    avatar () {
      return Mock.Random.image('48x48', Mock.Random.color(), '#757575', 'png', 'Q')
    },
  },
  'comments|5': [
    {
      name: '@last',
      'status|1-3': 1,
      content: '@sentence',
      avatar () {
        return Mock.Random.image('48x48', Mock.Random.color(), '#757575', 'png', this.name.substr(0, 1))
      },
      date () {
        return `2016-${Mock.Random.date('MM-dd')} ${Mock.Random.time('HH:mm:ss')}`
      },
    },
  ],
  'recentSales|36': [
    {
      'id|+1': 1,
      name: '@last',
      'status|1-4': 1,
      date () {
        return `${Mock.Random.integer(2015, 2016)}-${Mock.Random.date('MM-dd')} ${Mock.Random.time('HH:mm:ss')}`
      },
      'price|10-200.1-2': 1,
    },
  ],
  quote: {
    name: '圈嘀',
    title: '名言',
    content: '逆水行舟，不进则退',
    avatar () {
      return Mock.Random.image('48x48', Mock.Random.color(), '#2CDFE5', 'png', 'T')
    },
  },
  numbers: [
    {
      icon: 'pay-circle-o',
      color: color.green,
      title: '今日收入',
      number: 2781,
    }, {
      icon: 'team',
      color: color.blue,
      title: '新增用户',
      number: 3241,
    }, {
      icon: 'message',
      color: color.purple,
      title: '在线人数',
      number: 253,
    }, {
      icon: 'shopping-cart',
      color: color.red,
      title: '今日购买',
      number: 4324,
    },
  ],
})

module.exports = {
  [`GET ${apiPrefix}/dashboard`] (req, res) {
    res.json(Dashboard)
  },
}
