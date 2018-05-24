import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, update, remove, query, couponToWxUser } from '../services/couponconf'
import { filterTime } from '../utils'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'couponconf',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/couponconf') {
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
      payload = filterTime(payload)
      console.log('payload', payload)
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
      delete payload.key
      // 生效时间
      payload.effectiveDate = `${payload.effectiveDate.format('YYYY-MM-DD')} 00:00:00`
      // 截至时间
      payload.expiryDate = `${payload.expiryDate.format('YYYY-MM-DD')} 23:59:59`
      // payload.couponDigit = Number(payload.couponDigit)
      // payload.couponCount = Number(payload.couponCount)
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
      payload.id = yield select(({ couponconf }) => couponconf.currentItem.id)
      delete payload.key
      // 生效时间
      payload.effectiveDate = `${payload.effectiveDate.format('YYYY-MM-DD')} 00:00:00`
      // 截至时间
      payload.expiryDate = `${payload.expiryDate.format('YYYY-MM-DD')} 23:59:59`
      const data = yield call(update, payload)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
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

    *enable({ payload }, { call, put, select }) {
      console.log('payload', payload)
      payload.id = yield select(({ couponconf }) => couponconf.currentItem.id)
      const data = yield call(update, payload)
      if (data.code === 200) {
        message.success('启用成功')
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *couponToWxUser({ payload }, { call, put }) {
      payload.type = 1
      const data = yield call(couponToWxUser, payload)
      console.log('data', data)
      if (data.code === 200) {
        message.success('发送成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideModal' })
      } else {
        throw data.msg || data
      }
    }

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
