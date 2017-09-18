import modelExtend from 'dva-model-extend'
// import { create, remove, update } from '../services/province'
import * as provincesService from '../../services/provinces'
import { pageModel } from '../common'
import { config, storage, } from '../../utils'

const { query, create, } = provincesService
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
          //清空module原有的数据
          dispatch({
            type: 'setListEmpty'
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
    	if(payload.countryid){
    		storage({
    			key:'countryid',
    			val:Number(payload.countryid),
    			type:"set"
    		})
    	}else{
    		payload.countryid=storage({
    			key:'countryid',
    			type:'get'
    		})
    	}
      const data = yield call(query, payload)
      console.log('data', data)
      if (data.code=='200') {
      	if(data.obj.length<1){
      		data.obj={show:true, name: "暂无该城市的信息"}
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
        throw data.mess || data
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
      payload.countryid=storage({
          key:'countryid',
          type:'get'
        })
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
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
      return { ...state, list: [] }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
