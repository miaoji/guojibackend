import { color } from '../utils/theme'
import { myCity, query } from '../services/dashboard'
import { parse } from 'qs'

export default {
  namespace: 'dashboard',
  state: {
    sales: [],
    quote: {
      name: '圈嘀',
      title: '名言',
      content: '逆水行舟，不进则退',
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
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
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      name: '管理员',
      email: '2467254599@qq.com',
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
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
    }, { call, put }) {
      const data = yield call(query, parse(payload))
    }
  },
  reducers: {
  },
}
