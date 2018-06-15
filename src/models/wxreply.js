import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, update, remove, query } from '../services/wxreply'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'wxreply',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/wxreply') {
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
      const id = yield select(({ wxreply }) => wxreply.currentItem.id)
      const newPayload = {
        keyword: payload.keyword,
        content: payload.content,
        remark: payload.remark,
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

    *'delete' ({ payload }, { call, put }) {
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
    },

  },
})
