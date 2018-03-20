import { message } from 'antd'
import { color } from '../utils/theme'
import { query, line } from '../services/dashboard'
import { parse } from 'qs'

export default {
  namespace: 'dashboard',
  state: {
    orderLine: [],
    cargoLine: [],
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
    setup({ dispatch }) {
      dispatch({ type: 'query' })
      dispatch({ type: 'getOrderLineData' })
      dispatch({ type: 'getCargoLineData' })
    },
  },
  effects: {
    *query({
      payload,
    }, { call }) {
      const data = yield call(query, parse(payload))
      console.info('data', data)
    },
    // type 0直邮 1集运
    *getOrderLineData(_, { call, put }) {
      const data = yield call(line)
      if (data.code === 200 && data.obj) {
        const lineData = data.obj.map((item) => {
          const { createTime, count } = item
          return [createTime, Number(count) * 10]
        })
        yield put({
          type: 'setStates',
          payload: {
            orderLine: lineData
          }
        })
      } else {
        message.warning(data.msg || '当前网络无法使用')
      }
    },
    *getCargoLineData(_, { call, put }) {
      const data = call(line, { type: 1 })
      if (data.code === 200 && data.obj) {
        const lineData = data.obj.map((item) => {
          const { createTime, count } = item
          return [createTime, Number(count) * 10]
        })
        yield put({
          type: 'setStates',
          payload: {
            cargoLine: lineData
          }
        })
      }
    }
  },
  reducers: {
    setStates(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
