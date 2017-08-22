import modelExtend from 'dva-model-extend'
import { create, remove, update, markBlack } from '../services/product'
import * as productsService from '../services/products'
import { pageModel } from './common'
import { config } from '../utils'

const { query } = productsService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'product',

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
        if (location.pathname === '/product') {
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
      	console.log('aadata',data)
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
    	console.log(payload)
    	const createUser = JSON.parse(window.localStorage.getItem("guojipc_user")).userName
    	const productCode = Math.floor(Math.random()*600000)
    	const productName = payload.product_name
    	const packageType = payload.producttypeid
    	const newWxUser = { ...payload, createUser, productCode,  productName, packageType,}
    	
      const data = yield call(create, newWxUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ product }) => product.currentItem.id)
      const createUser = JSON.parse(window.localStorage.getItem("guojipc_user")).userName
    	const productCode = yield select(({ product }) => product.currentItem.product_code)
    	const productName = payload.product_name
      const packageType = payload.producttypeid
    	const newWxUser = { ...payload, id, createUser, productCode,  productName, packageType,}
    	
      const data = yield call(update, newWxUser)
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
