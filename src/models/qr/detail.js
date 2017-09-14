import { query } from '../../services/qr'
import { queryURL } from '../../utils'

export default {

  namespace: 'qrDetail',

  state: {
    name: '',
    ticket: '',
    parameter: ''
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/qrdetail') {
          const name = queryURL('name')
          const ticket = queryURL('ticket')
          const parameter = queryURL('parameter')
          dispatch({ type: 'querySuccess', payload: { 
            name,
            ticket,
            parameter
          }})
        }
      })
    },
  },

  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      const { code, obj, mess } = data
      if (code === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: obj,
          },
        })
      } else {
        throw mess
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
