import modelExtend from 'dva-model-extend'
import { create, remove, update, markBlack } from '../services/freight'
import * as freightsService from '../services/freights'
import { pageModel } from './common'
import { config } from '../utils'
import { gettimes } from '../utils/time'

const { query } = freightsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'freight',

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
        if (location.pathname === '/freight') {
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

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *'multiDelete' ({ payload }, { call, put }) {
      const data = yield call(wxusersService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *'markBlackList' ({ payload }, { call, put, select }) {
      const newWxUser = payload
      const data = yield call(update, newWxUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
    	const time = new Date().getTime()
    	const username = JSON.parse(window.localStorage.getItem("guojipc_user")).userName
    	const confirmor = username
      const newFreight = {...payload, time, confirmor}
    	
      const data = yield call(create, newFreight)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ freight }) => freight.currentItem.id)
      const time = new Date().getTime()
      const username = JSON.parse(window.localStorage.getItem("guojipc_user")).userName
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
