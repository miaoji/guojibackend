import { query } from '../../services/boot'
import { message } from 'antd'
import { rebuildVal } from '../../utils'
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
            dispatch({ type: 'query', payload: { orderNo: match[1] } })
          }
        }
      })
    },
  },

  effects: {
    *query ({
      payload,
    }, { call, put }) {
      payload.orderNo = rebuildVal(payload.orderNo)
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
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
