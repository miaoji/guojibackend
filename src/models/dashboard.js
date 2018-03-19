import { color } from '../utils/theme'
import { query } from '../services/dashboard'
import { parse } from 'qs'

export default {
  namespace: 'dashboard',
  state: {
    sales: [],
    quote: {
      name: '明彰科技',
      title: '名言',
      content: '学如逆水行舟，不进则退',
      avatar: './img003.jpg',
    },
    quotess: {
      name: '明彰科技',
      title: '名言',
      content: '心似平原放马,易放难收',
      avatar: './img002.jpg',
    },
    numbers: [
      {
        icon: 'pay-circle-o',
        color: color.green,
        title: '累计收入',
        number: 5582,
      }, {
        icon: 'team',
        color: color.blue,
        title: '所有用户',
        number: 3241,
      }, {
        icon: 'shopping-cart',
        color: color.red,
        title: '今日收入',
        number: 4324,
      },
    ],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      name: '管理员',
      email: 'winner@qq.com',
      avatar: './img001.jpg',
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call }) {
      const data = yield call(query, parse(payload))
      console.info('data', data)
    },
  },
  reducers: {
  },
}
