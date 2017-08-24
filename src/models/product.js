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

     *getNation ({ payload }, { select, call, put }) {
      const data = yield call(contryQuery)
      console.log("data",data)
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
    
    *getParcelType ({ payload = {} }, { call, put }) {
      const destNation={destNation:payload}
      const data = yield call(parceltypeQuery,destNation)
      console.log("data2222",data)

      if (data) {
        let obj = data.obj
        let children = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          children.push(<Option key={item.id}>{item.nameCh}</Option>);
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
      //获取对应的id
      const id = yield select(({ product }) => product.currentItem.id)
      //获取对应的包裹类型的中文名称
      const name_ch = yield select(({ product }) => product.currentItem.name_ch)
      //获取包裹类型的id
      const pid = yield select(({ product }) => product.currentItem.producttypeid)

      const createUser = JSON.parse(window.localStorage.getItem("guojipc_user")).userName
    	const productCode = yield select(({ product }) => product.currentItem.product_code)
    	const productName = payload.product_name
      
      //判断提交的包裹类型是否被修改..相同则提交之前查询到的包裹类型的id..不同则提交表单传输过来的id 
      let packageType = payload.producttypeid
      if (packageType===name_ch) {
        packageType = pid
      }else{
        packageType = payload.producttypeid
      }

    	const newWxUser = { ...payload, id, createUser, productCode,  productName, packageType,}
    	
      console.log('newWxUser',newWxUser)
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
