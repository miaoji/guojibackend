import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, update, remove, query, pushMsg } from '../services/locus'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'locus',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    locusDate: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/locus') {
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
      if (payload.orderId) {
        window.sessionStorage.orderId = payload.orderId
      } else {
        payload.orderId = window.sessionStorage.orderId
      }
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
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    *create({ payload }, { call, put }) {
      payload.orderInfoId = Number(window.sessionStorage.orderId)
      let locusDateInfo = null
      if (payload.locusDate.length !== 0) {
        locusDateInfo = payload.locusDate.map((item) => {
          return { ...item, orderInfoId: Number(window.sessionStorage.orderId) }
        })
      } else {
        payload.routeTime = payload.routeTime._d.getTime()
        delete payload.locusDate
        locusDateInfo = [payload]
      }
      const data = yield call(create, locusDateInfo)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        yield put({
          type: 'setStates',
          payload: {
            locusDate: []
          }
        })
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ locus }) => locus.currentItem.id)
      payload.routeTime = payload.routeTime._d.getTime()
      delete payload.locusDate
      const data = yield call(update, { ...payload, id })
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('修改成功')
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *'delete'({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload })
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *pushMsg({ payload }, { call, put }) {
      const data = yield call(pushMsg, payload)
      if (data.code === 200) {
        message.success('推送成功')
        yield put({ type: 'query' })
      } else {
        throw data.msg || '网络连接失败'
      }
    },

    *setLocusData({ payload }, { put }) {
      yield put({
        type: 'setStates',
        payload: {
          locusDate: payload,
        },
      })
    },

  },

  reducers: {

    setStates(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true, locusDate: [] }
    },

    hideModal(state) {
      return { ...state, modalVisible: false, locusDate: [] }
    },

  },
})
