import { query } from '../../services/qr'
import { queryURL } from '../../utils'

export default {

  namespace: 'qrDetail',

  state: {
    name: '',
    ticket: '',
    parameter: '',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/qrdetail' || location.pathname === '/spreadqr') {
          const name = queryURL('name')
          const ticket = queryURL('ticket')
          const parameter = queryURL('parameter')
          dispatch({ type: 'querySuccess', payload: {
            name,
            ticket,
            parameter,
          } })
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
        ...payload,
      }
    },
  },
}
