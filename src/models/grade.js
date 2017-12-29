import modelExtend from 'dva-model-extend'
import { message, Select } from 'antd'
import { query, create, remove, update } from '../services/grade'
import { pageModel } from './common'
import { config, storage } from '../utils'

const { prefix } = config
const Option = Select.Option

export default modelExtend(pageModel, {
  namespace: 'grade',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    selectNation: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/grade') {
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
      console.log('123')
      const data = yield call(query, payload)
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
      const id = yield select(({ grade }) => grade.currentItem.id)
      console.log('id', id)
      const data = yield call(remove, { ids: payload })
      if (data.msg === '删除成功' && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *create ({ payload }, { call, put }) {
      payload.spreadConsumption = payload.spreadConsumption*100
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

    *update ({ payload }, { select, call, put }) {
      payload.spreadConsumption = payload.spreadConsumption * 100
      const id = yield select(({ grade }) => grade.currentItem.id)
      const data = yield call(update, {...payload, id})
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

    setNation (state, { payload }) {
      return { ...state, ...payload }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

  },
})
