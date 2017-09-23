import { query } from '../../services/boot'
import { message } from 'antd'
export default {

  namespace: 'bootDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/bootdetail') {
          const match = location.search.split('?orderNo=')
          if (match) {
            dispatch({ type: 'query', payload: { orderNo : match[1] } })
          }
        }
      })
    },
  },

  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      const { code, obj, msg } = data
      if (code === 200) {
        if (obj === null) {
          message.success("暂无补价信息")
        }
        yield put({
          type: 'querySuccess',
          payload: {
            data: obj,
          },
        })
      } else {
        throw msg
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
