import modelExtend from 'dva-model-extend'
import { create } from '../services/destination'
import * as destinationsService from '../services/destinations'
import { pageModel } from './common'
import { config } from '../utils'

const { query } = destinationsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'destination',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/destination') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.obj,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    }

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    }

  },
})
