import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, update, remove, query, setmenu, sendVoucher } from '../services/marketings'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'marketing',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/marketing') {
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
      const parentId = '0'
      const newPayload = { ...payload, parentId }
      const data = yield call(query, newPayload)
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
      const newPayload = {
        coupon_stock_id: payload.name,
      }
      const data = yield call(create, newPayload)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ marketing }) => marketing.currentItem.id)
      const newPayload = {
        url: payload.url,
        name: payload.name,
        id,
      }
      const data = yield call(update, newPayload)
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
        message.success('发送优惠卷成功')
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *sendVoucher({ payload }, { call, put, select }) {
      const wxUserIds = yield select(({ marketing }) => marketing.selectedRowKeys)
      console.log('payload', payload)
      const data = yield call(sendVoucher, {
        wxUserIds: wxUserIds.toString(),
        coupon_stock_id: payload.name,
        couponMoney: payload.couponMoney
      })
      if (data.code === 200) {
        message.success('发送优惠卷成功')
        yield put({ type: 'query' })
        yield put({
          type: 'updateState', payload: {
            selectedRowKeys: []
          }
        })
      } else {
        throw data.msg || data
      }
    },

    *pushMsgByUser({ payload }, { call, put, select }) {
      const wxUserIds = yield select(({ marketing }) => marketing.currentItem.ID)
      console.log('payload', payload)
      const data = yield call(sendVoucher, {
        wxUserIds: wxUserIds.toString(),
        coupon_stock_id: payload.name,
        couponMoney: payload.couponMoney
      })
      if (data.code === 200) {
        message.success('发送优惠卷成功')
        yield put({ type: 'query' })
        yield put({
          type: 'updateState', payload: {
            selectedRowKeys: []
          }
        })
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