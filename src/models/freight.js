import { message, Select } from 'antd'
import modelExtend from 'dva-model-extend'
import { create, remove, update, markBlack } from '../services/freight'
import * as freightsService from '../services/freights'
import * as countriesService from '../services/countries'
import * as showPTypeByCounIdsService from '../services/showPTypeByCounIds'
import * as showproductNamesService from '../services/showproductNames'
import { pageModel } from './common'
import { config } from '../utils'
import { gettimes } from '../utils/time'

const { query } = freightsService
const contryQuery = countriesService.query
const parceltypeQuery = showPTypeByCounIdsService.query
const producttypeQuery = showproductNamesService.query
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
    selectProductType: [],
    productDis:true,
    freightDis:true,
    ifPackageJson: false
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

    *getParcelType ({ payload = {} }, { select, call, put }) {
      const destNation={destNation:payload}
      let currentItem = yield select(({ freight }) => freight.currentItem)
      currentItem.cargotype = null
      currentItem.producttypeid = null
      const data = yield call(parceltypeQuery,destNation)

      if (data) {
        let obj = data.obj
        let children = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          let str = JSON.stringify({
            id: item.id,
            name: item.nameCh
          })
          children.push(<Option key={str}>{item.nameCh}</Option>);
        }
        yield put({
          type: 'setParcelType',
          payload: {
            selectParcelType: children,
            currentItem: currentItem
          },
        })
      } else {
        throw data.mess
      }
    },

    *getProductType ({ payload = {} }, { select, call, put }) {
      const packageType={packageType:payload}
      let currentItem = yield select(({ freight }) => freight.currentItem)
      currentItem.producttypeid = null

      const data = yield call(producttypeQuery,packageType)


      if (data) {
        let obj = data.obj
        let children = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          children.push(<Option key={item.productName}>{item.productName}</Option>);
        }
        yield put({
          type: 'setProductType',
          payload: {
            selectProductType: children,
            currentItem: currentItem,
          },
        })
      } else {
        throw data.mess
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      console.log('payload', payload)
      const data = yield call(remove, { ids: payload.toString() })
      if (data.success) {
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
    	const username = JSON.parse(window.localStorage.getItem("guojipc_user")).userId || 0
    	const confirmor = username
      let newFreight = {...payload, time, confirmor}
      newFreight.cargotype = JSON.parse(newFreight.cargotype).name
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
      const ifPackageJson = yield select(({ freight }) => freight.ifPackageJson)
      const time = new Date().getTime()
      const username = JSON.parse(window.localStorage.getItem("guojipc_user")).userId || 0
      const confirmor = username
      let newFreight = {...payload, id, time, confirmor}
      newFreight.cargotype = ifPackageJson ? JSON.parse(payload.cargotype).name : payload.cargotype
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
      return { ...state, ...payload }
    },

    setParcelType (state, { payload }) {
      return { ...state, ...payload, productDis: false }
    },

    setProductType (state, { payload }) {
      return { ...state, ...payload, ifPackageJson: true,freightDis:false, }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true,ifPackageJson:false  }
    },

    hideModal (state) {
      return { ...state, modalVisible: false, productDis: true,ifPackageJson:true,freightDis:true, }
    }

  },
})
