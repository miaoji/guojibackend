import modelExtend from 'dva-model-extend'
import { create, update } from '../services/boot'
import * as bootsService from '../services/boots'
import { pageModel } from './common'

const { query } = bootsService

export default modelExtend(pageModel, {
  namespace: 'boot',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/boot') {
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
      if (data.code === 200) {  
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
      }else{
        throw data.msg
      }
    },

    *create ({ payload }, { call, put }) {
      const time = new Date().getTime()
      const username = JSON.parse(window.localStorage.getItem("guojipc_user")).userId || 0
      const confirmor = username
      const newFreight = {...payload, time, confirmor}
      
      const data = yield call(create, newFreight)
      if (data.code===200) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ freight }) => freight.currentItem.id)
      const time = new Date().getTime()
      const username = JSON.parse(window.localStorage.getItem("guojipc_user")).userId || 0
      const confirmor = username
      const newFreight = {...payload, id, time, confirmor}
      
      const data = yield call(update, newFreight)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

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
