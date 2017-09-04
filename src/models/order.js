import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, remove, update, markBlack, createChinaOrder } from '../services/order'
import { create as addBoot } from '../services/boot'
import * as ordersService from '../services/orders'
import { pageModel } from './common'
import { config } from '../utils'

const { query } = ordersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'order',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    bootModalVisible: false,
    selectedRowKeys: [],
    isMotion: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/order') {
          dispatch({
            type: 'query',
            payload: location.query
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
      } else {
        throw data.mess
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { ids: payload.toString() })
      if (data.success && data.code === 200) {
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess
      }
    },

    *create ({ payload }, { call, put }) {
      payload['serialnumber'] = 'MZ' + new Date().getTime()
      const data = yield call(create, payload)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ order }) => order.currentItem.id)
      const newOrder = { ...payload, id }
      const data = yield call(update, newOrder)
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *addBoot ({ payload }, { call, put }) {
      const other = {
        'createUser': JSON.parse(window.localStorage.getItem('guojipc_user'))['userId'],
        'status': 1
      }
      const data = yield call(addBoot, {
        boot: Number(payload.boot)*100,
        serialNumber: payload.serialnumber,
        reason: payload.reason,
        ...other
      })
      if (data.success && data.code === 200) {
        message.success(data.mess)
        yield put({ type: 'hideBootModal' })
        yield put({ type: 'query' })
      } else {
        throw data.mess
      }
    },

    *createChinaOrder ({ payload }, { call, put }) {
      const data = yield call(createChinaOrder, {...payload})
      if (data.success && data.code === 200) {
        message.success(data.mess)
        yield put({ type: 'hideBootModal' })
        yield put({ type: 'query' })
      } else {
        throw data.mess
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showBootModal (state, { payload }) {
      return { ...state, ...payload, bootModalVisible: true }
    },

    hideBootModal (state) {
      return { ...state, bootModalVisible: false }
    }

  },
})
