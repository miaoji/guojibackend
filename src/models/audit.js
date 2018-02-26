import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query, create, refuse, remove, update } from '../services/audit'
import { pageModel } from './common'
import { storage } from '../utils'

export default modelExtend(pageModel, {
  namespace: 'audit',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    disReasonInput: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/audit') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query({ payload = {} }, { call, put }) {
      const data = yield call(query, { ...payload })
      if (data.code === 200 && data.success) {
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
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    *'delete'({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload })
      if (data.msg === '删除成功' && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *create({ payload }, { call, put }) {
      payload.consumptionRatio = payload.consumptionRatio / 100
      payload.spreadConsumption = payload.spreadConsumption * 100
      const data = yield call(create, payload)
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    *update({ payload }, { select, call, put }) {
      const status = yield select(({ audit }) => audit.currentItem.status)
      const id = yield select(({ audit }) => audit.currentItem.id)
      const cash = yield select(({ audit }) => audit.currentItem.cash)
      const spreadUserId = yield select(({ audit }) => audit.currentItem.spreadUserId)
      const confirmUserId = JSON.parse(storage({ type: 'get', key: 'user' })).id
      if (payload.status === status) {
        message.warn('状态未发生改变,本次操作以取消')
        yield put({ type: 'hideModal' })
        return
      }
      if (status !== 0) {
        message.warn('禁止修改提现成功或者拒绝的审核状态')
        return
      }
      if (payload.status && payload.status === 2) {
        const data = yield call(update, { id, status: payload.status, cash, spreadUserId, reason: payload.reason, confirmUserId })
        if (data.msg === '修改成功' && data.code === 200) {
          message.success(data.msg)
          yield put({ type: 'hideModal' })
          yield put({ type: 'query' })
        } else {
          throw data.msg || '无法跟服务器建立有效连接'
        }
      } else {
        const data = yield call(update, { status: payload.status, spreadUserId, cash, id, confirmUserId, reason: '' })
        if (data.msg === '修改成功' && data.code === 200) {
          message.success(data.msg)
          yield put({ type: 'hideModal' })
          yield put({ type: 'query' })
        } else {
          throw data.msg || '无法跟服务器建立有效连接'
        }
      }
    },

    *setStates({ payload }, { put }) {
      if (payload.status && payload.status === 2) {
        yield put({
          type: 'setState',
          payload: {
            disReasonInput: false,
          },
        })
      } else {
        yield put({
          type: 'setState',
          payload: {
            disReasonInput: true,
          },
        })
      }
    },

  },

  reducers: {

    setState(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

  },
})
