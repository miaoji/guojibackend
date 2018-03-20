import { message } from 'antd'
import { color } from '../utils/theme'
import { line } from '../services/dashboard'
import { time } from '../utils'


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
      dispatch({
        type: 'getLineData',
        payload: {
          type: 0
        }
      })
      dispatch({
        type: 'getLineData',
        payload: {
          type: 1
        }
      })
    },
  },
  effects: {
    // type 0直邮 1集运
    *getLineData({ payload }, { call, put }) {
      const data = yield call(line, payload)
      if (data.code === 200 && data.obj) {
        const times = time.getLineTime()
        const lineData = times.map((item) => {
          let tmparr = [item, 0]
          data.obj.map((value) => {
            if (value.createTime === item) {
              tmparr[1] = value.count * 10
            }
            return value
          })
          return tmparr
        })
        // type为0的时候更新直邮信息
        if (payload.type === 0) {
          yield put({
            type: 'setStates',
            payload: {
              orderLine: lineData
            }
          })
          // type为1时更新集运信息
        } else if (payload.type === 1) {
          yield put({
            type: 'setStates',
            payload: {
              cargoLine: lineData
            }
          })
        }
      } else {
        message.warning(data.msg || '当前网络无法使用')
      }
    },
  },
  reducers: {
    setStates(state, { payload }) {
      return { ...state, ...payload }
    }
  },
}
