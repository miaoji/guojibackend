import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { create, update, remove, query } from '../services/userinfo'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'userinfo',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/userinfo') {
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
      let user = window.localStorage.guojipc_user
      user = user ? JSON.parse(window.localStorage.guojipc_user) : ''
      if (user.userName !== 'admin') {
        yield put(routerRedux.push('/404'))
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
      const id = yield select(({ userinfo }) => userinfo.currentItem.id)
      const newPayload = {
        // content: payload.content,
        ...payload,
        id,
      }
      const data = yield call(update, newPayload)
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
