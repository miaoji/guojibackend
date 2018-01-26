import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, update, remove, query, setmenu } from '../services/locus'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'locus',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        console.log('sss')
        console.log('location', location)
        if (location.pathname === '/locus') {
          console.log('ssssss')
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
      console.log('payload', payload)
      payload.routeTime = payload.routeTime._d.getTime()
      payload.orderInfoId = Number(window.sessionStorage.orderId)
      console.log('payload', payload)
      const data = yield call(create, payload)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ locus }) => locus.currentItem.id)
      payload.routeTime = payload.routeTime._d.getTime()
      console.log('payload', payload)
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

    *setmenu({ payload }, { call, put }) {
      const data = yield call(setmenu)
      if (data.code === 200) {
        message.success('设置微信菜单成功')
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

  },

  reducers: {

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

  },
})
