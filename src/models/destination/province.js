/*
  目的地 省份
*/
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import * as provincesService from '../../services/provinces'
import { pageModel } from '../common'
import { config, storage } from '../../utils'

const { query, create, update, remove } = provincesService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'province',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    list: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/province') {
          // 清空module原有的数据
          dispatch({
            type: 'setListEmpty',
          })
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
      if (payload.countryCode) {
        window.sessionStorage.countryCode=payload.countryCode
      } else {
        payload.countryCode=window.sessionStorage.countryCode
      }
      const data = yield call(query, payload)
      if (data.code == '200' || data.code == '500') {
        if (data.code == '500' || data.obj == null) {
          data.obj = { show: true, name: '暂无该城市的信息' }
        }
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
        throw data.msg
      }
    },

    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload.toString() })
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    *'multiDelete' ({ payload }, { call, put }) {
      const data = yield call(provincesService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *'markBlackList' ({ payload }, { call, put, select }) {
      const newprovince = payload
      const data = yield call(update, newprovince)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
      payload.countryCode = storage({
        key: 'countryCode',
        type: 'get',
      })
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
        message.success(data.msg)
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ province }) => province.currentItem.id)
      const newprovince = { ...payload, id }
      const data = yield call(update, newprovince)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },

  reducers: {
    setListEmpty (state) {
      return { ...state, list: { show: true, name: '数据加载中...' } }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      // localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      storage({
        key: 'userIsMotion',
        val: !state.isMotion,
        type: 'set'
      })
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
