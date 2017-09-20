import { message, Select } from 'antd'
import modelExtend from 'dva-model-extend'
import { create, remove, update, markBlack } from '../services/product'
import * as productsService from '../services/products'
import * as countriesService from '../services/countries'
import * as showPTypeByCounIdsService from '../services/showPTypeByCounIds'
import { pageModel } from './common'
import { config } from '../utils'

const { query } = productsService
const { prefix } = config
const contryQuery = countriesService.query
const parceltypeQuery = showPTypeByCounIdsService.query
const Option = Select.Option

export default modelExtend(pageModel, {
  namespace: 'product',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    selectNation:[],
    selectParcelType:[],
    productDis: true
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

     *getNation ({ payload }, { select, call, put }) {
      const data = yield call(contryQuery)
      if (data) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            children.push(<Option key={item.id}>{item.country_cn}</Option>);
          }
        }
        yield put({
          type: 'setNation',
          payload: {
            selectNation: children,
          },
        })
      } else {
        throw data.msg
      }
    },
    
    *getParcelType ({ payload = {} }, { call, put }) {
      const destNation={countryId:payload}
      const data = yield call(parceltypeQuery,destNation)

      if (data) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            children.push(<Option key={item.id}>{item.name_cn}</Option>);
          }
        }
        yield put({
          type: 'setParcelType',
          payload: {
            selectParcelType: children,
          },
        })
      } else {
        throw data.msg
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { ids: payload.toString() })
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
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
    	const createUserId = JSON.parse(window.localStorage.getItem("guojipc_user")).userId
    	const productCode = Math.floor(Math.random()*600000)
    	const newWxUser = { ...payload, createUserId, productCode,}
    	
      const data = yield call(create, newWxUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      //获取对应的id
      const id = yield select(({ product }) => product.currentItem.ID)
      //获取对应的包裹类型的中文名称
      const NAME_CN = yield select(({ product }) => product.currentItem.NAME_CN)
      //获取包裹类型的id
      const PACKAGE_TYPE = yield select(({ product }) => product.currentItem.PACKAGE_TYPE)

      //判断提交的包裹类型是否被修改..相同则提交之前查询到的包裹类型的id..不同则提交表单传输过来的id 
      if (payload.packageType==NAME_CN) {
        payload.packageType = PACKAGE_TYPE
      }
      const createUserId = JSON.parse(window.localStorage.getItem("guojipc_user")).userId
      const productCode = yield select(({ product }) => product.currentItem.PRODUCT_CODE)
    	const newWxUser = { ...payload, id, createUserId, productCode,}
      const data = yield call(update, newWxUser)
      if (data.success) {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

  },

  reducers: {

    setNation (state, { payload }) {
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
