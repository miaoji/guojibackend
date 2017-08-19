import pathToRegexp from 'path-to-regexp'
import { query } from '../../services/boot'

export default {

  namespace: 'orderbootDetail',

  state: {
    data: {},
    serialnumber: ''
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/orderboot/:id').exec(location.pathname)
        if (match) {
          dispatch({ type: 'query', payload: { serialnumber : match[1] } })
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
            serialnumber: payload.serialnumber
          },
        })
      } else {
        throw mess
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data, serialnumber } = payload
      return {
        ...state,
        data,
        serialnumber
      }
    },
  },
}