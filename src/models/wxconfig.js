import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, update, remove, query, } from '../services/wxconfigs'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'wxconfig',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create'
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/wxconfig') {
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
        throw data.msg || "无法跟服务器建立有效链接"
      }
    },

    *create ({ payload }, { call, put }) {
      const newPayload = {
        content: payload.parameter,
        name: payload.name
      }
      return
      const data = yield call(create, newPayload)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ wxconfig }) => wxconfig.currentItem.id)
      const newPayload = {
        content: payload.content,
        id: id
      }
      // console.log('newQr',newQr)
      // return
      const data = yield call(update, newPayload)
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
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    }

  },
})
