import modelExtend from 'dva-model-extend'
import { message, Select } from 'antd'
import { create, remove, update, markBlack } from '../services/parceltype'
import * as parceltypesService from '../services/parceltypes'
import * as countriesService from '../services/countries'
import { pageModel } from './common'
import { config } from '../utils'

const { query } = parceltypesService
const contryQuery = countriesService.query
const { prefix } = config
const Option = Select.Option

export default modelExtend(pageModel, {
  namespace: 'parceltype',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    selectNation:[],
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
        console.log('total', data)
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

     *getNation ({ payload = {} }, { call, put }) {
      const data = yield call(contryQuery)
      if (data) {
        let obj = data.obj
        let children = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          children.push(<Option key={item.name}>{item.name}</Option>);
        }
        yield put({
          type: 'setNation',
          payload: {
            selectNation: children,
          },
        })
      } else {
        throw data.mess
      }
    },

    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload.toString() })
      if (data.success && data.code === 200) {
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
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
      const createUser = JSON.parse(window.localStorage.getItem("guojipc_user")).userId || 0 
      const destNation = payload.nation
      const maxRange = payload.max_range
      const minRange = payload.min_range
      const nameCh = payload.name_ch
      const nameEn = payload.name_en
      const newFreight = {...payload, createUser, destNation, maxRange, minRange, nameCh, nameEn}
      
      const data = yield call(create, newFreight)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ parceltype }) => parceltype.currentItem.id)
      const createUser = JSON.parse(window.localStorage.getItem("guojipc_user")).userId || 0 
      const destNation = payload.nation
      const maxRange = payload.max_range
      const minRange = payload.min_range
      const nameCh = payload.name_ch
      const nameEn = payload.name_en
      const newFreight = {...payload, id, createUser, destNation, maxRange, minRange, nameCh, nameEn}
      
      const data = yield call(update, newFreight)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
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
    }

  },
})
