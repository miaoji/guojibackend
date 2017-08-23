import { message, Select } from 'antd'
import modelExtend from 'dva-model-extend'
import { create, remove, update, markBlack } from '../services/freight'
import * as freightsService from '../services/freights'
import * as countriesService from '../services/countries'
import * as showPTypeByCounIdsService from '../services/showPTypeByCounIds'
import { pageModel } from './common'
import { config } from '../utils'
import { gettimes } from '../utils/time'

const { query } = freightsService
const contryQuery = countriesService.query
const parceltypeQuery = showPTypeByCounIdsService.query
const { prefix } = config
const Option = Select.Option

export default modelExtend(pageModel, {
  namespace: 'freight',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    selectPackage: [],
    selectParcelType: [],
    productDis:true,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/freight') {
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
      if (data) {
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
      }
    },

    *getPackage ({ payload = {} }, { call, put }) {
      const data = yield call(contryQuery)
      if (data) {
        let obj = data.obj
        let children = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          children.push(<Option key={item.name}>{item.name}</Option>);
        }
        yield put({
          type: 'setPackage',
          payload: {
            selectPackage: children,
          },
        })
      } else {
        throw data.mess
      }
    },

    *getParcelType ({ payload = {} }, { call, put }) {
      const destNation={destNation:payload}
      console.log('payload22',destNation)

      const data = yield call(parceltypeQuery,destNation)
      console.log("data2222",data)

      if (data) {
        let obj = data.obj
        let children = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          children.push(<Option key={item.nameCh}>{item.nameCh}</Option>);
        }
        yield put({
          type: 'setParcelType',
          payload: {
            selectParcelType: children,
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
    	const time = new Date().getTime()
    	const username = JSON.parse(window.localStorage.getItem("guojipc_user")).userName
    	const confirmor = username
      const newFreight = {...payload, time, confirmor}
      const data = yield call(create, newFreight)
      if (data.success) {
        yield put({ type: 'hideModal' })
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess || data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ freight }) => freight.currentItem.id)
      const time = new Date().getTime()
      const username = JSON.parse(window.localStorage.getItem("guojipc_user")).userName
      const confirmor = username
      const newFreight = {...payload, id, time, confirmor}
      
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

    setPackage (state, { payload }) {
      console.log('dataaa payload', payload)
      return { ...state, ...payload }
    },

    setParcelType (state, { payload }) {
      return { ...state, ...payload, productDis: false }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false, productDis: true }
    }

  },
})
