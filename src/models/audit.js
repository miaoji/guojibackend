import modelExtend from 'dva-model-extend'
import { message, Select } from 'antd'
import { query, create, remove, update } from '../services/audit'
import { pageModel } from './common'
import { config, storage } from '../utils'

const { prefix } = config
const Option = Select.Option

export default modelExtend(pageModel, {
  namespace: 'audit',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    selectNation: [],
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
      let spreadUserId
      if (payload.userId) {
        window.localStorage.userId = payload.userId
        spreadUserId = payload.userId
        delete payload.userId
      } else if (!payload.userId && window.localStorage.userId) {
        spreadUserId = window.localStorage.userId
      } else if (!payload.userId && !window.localStorage.userId) {
        message.error('您查询的用户不存在')
        return
      }
      const data = yield call(query, { ...payload, spreadUserId })
      console.log('data', data)
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

    *'delete'({ payload }, { select, call, put }) {
      const id = yield select(({ audit }) => audit.currentItem.id)
      console.log('id', id)
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
      console.log('data', data)
      if (data.success && data.code == '200') {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    *update({ payload }, { select, call, put }) {
      payload.consumptionRatio = payload.consumptionRatio / 100
      payload.spreadConsumption = payload.spreadConsumption * 100
      const id = yield select(({ audit }) => audit.currentItem.id)
      const data = yield call(update, { ...payload, id })
      if (data.msg === '修改成功') {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

  },

  reducers: {

    setNation(state, { payload }) {
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
