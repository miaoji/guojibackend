import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, remove, update, markBlack } from '../services/parceltype'
import * as parceltypesService from '../services/parceltypes'
import { pageModel } from './common'
import { config } from '../utils'

const { query } = parceltypesService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'parceltype',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/parceltype') {
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
//    	message.success(data.mess)
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
      	throw data.mess
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *'multiDelete' ({ payload }, { call, put }) {
      const data = yield call(wxusersService.remove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *'markBlackList' ({ payload }, { call, put, select }) {
      const newWxUser = payload
      const data = yield call(update, newWxUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create ({ payload }, { call, put }) {
      const createUser = JSON.parse(window.localStorage.getItem("guojipc_user")).userName 
      const destNation = payload.nation
      const maxRange = payload.max_range
      const minRange = payload.min_range
      const nameCh = payload.name_ch
      const nameEn = payload.name_en
      const newFreight = {...payload, createUser, destNation, maxRange, minRange, nameCh, nameEn}
      
      const data = yield call(create, newFreight)
      console.log('data',data)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ parceltype }) => parceltype.currentItem.id)
      const createUser = JSON.parse(window.localStorage.getItem("guojipc_user")).userName 
      const destNation = payload.nation
      const maxRange = payload.max_range
      const minRange = payload.min_range
      const nameCh = payload.name_ch
      const nameEn = payload.name_en
      const newFreight = {...payload, id, createUser, destNation, maxRange, minRange, nameCh, nameEn}
      
      console.log(payload)
      console.log(newFreight)
      
//    const newWxUser = { ...payload, id }
      const data = yield call(update, newFreight)
      console.log(data)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
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
