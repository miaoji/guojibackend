import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, update, remove } from '../services/qr'
import * as bootsService from '../services/qrs'
import { pageModel } from './common'

const { query } = bootsService

export default modelExtend(pageModel, {
  namespace: 'qr',

  state: {
    currentItem: {},
    modalVisible: false,
    inputDis: true,
    modalType: 'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/qr') {
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
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    *create ({ payload }, { call, put }) {
      delete payload.key
      if (payload.type && payload.type == 1) {
        delete payload.seconds
      } else if (payload.seconds) {
        payload.seconds = payload.seconds * 60 * 60 * 24
      }
      const data = yield call(create, payload)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *update ({ payload }, { select, call, put }) {
      // 获取当前要修改数据的id
      const id = yield select(({ qr }) => qr.currentItem.ID)

      // 删除多余的参数
      delete payload.key
      delete payload.seconds
      delete payload.type
      const newQr = { ...payload, id }
      const data = yield call(update, newQr)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success('更新成功')
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { ids: payload })
      if (data.code === 200) {
        message.success('删除成功')
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true, inputDis: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false, inputDis: false }
    },

    showInput (state) {
      return { ...state, inputDis: false }
    },

    hideInput (state) {
      return { ...state, inputDis: true }
    },

  },
})
