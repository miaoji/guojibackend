import { query } from '../../services/boot'

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
      console.log('payload', payload)
      console.log('data', data)
      const { code, obj, msg } = data
      if (code === 200) {
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
