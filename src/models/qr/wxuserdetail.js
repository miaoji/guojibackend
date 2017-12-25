import { getwxuserdetail as query } from '../../services/qr'
// import { query } from '../../services/wxusers'
import { queryURL } from '../../utils'

export default {

  namespace: 'qrWxUserDetail',

  state: {
    qrTicket: '',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/wxuserdetail') {
          const qrTicket = queryURL('qrTicket')
          dispatch({
            type: 'setListEmpty',
          })
          dispatch({ type: 'query', payload: { qrTicket } })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(query, payload)
      if (data.code === 200) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.obj,
          },
        })
      } else {
        throw data.msg
      }
    },
  },

  reducers: {

    setListEmpty (state) {
      return { ...state, data: [{ ID: true, NICK_NAME: '国家信息正在加载,请稍等...' }] }
    },

    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        ...payload,
      }
    },
  },
}
