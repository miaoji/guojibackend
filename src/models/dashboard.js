import { color } from '../utils/theme'
import { myCity, query } from '../services/dashboard'
import { parse } from 'qs'

export default {
  namespace: 'dashboard',
  state: {
    sales: [],
    quote: {
      name: '明彰科技',
      title: '名言',
      content: '学如逆水行舟，不进则退',
      avatar: 'http://www.feizl.com/upload2007/2011_11/111114031328587.jpg',
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
      email: 'winner@qq.com',
      avatar: 'http://pic.qbaobei.com/Uploads/Picture/2016-01-14/569781503c21f.jpg',
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
    },
  },
  reducers: {
  },
}
