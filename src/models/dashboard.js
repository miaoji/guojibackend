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
      avatar: 'http://img.dongqiudi.com/uploads/avatar/2015/07/25/QM387nh7As_thumb_1437790672318.jpg',
    },
    quotess: {
      name: '明彰科技',
      title: '名言',
      content: '心似平原放马,易放难收',
      avatar: 'http://f.hiphotos.baidu.com/zhidao/pic/item/1ad5ad6eddc451da04b67411b0fd5266d1163283.jpg',
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
