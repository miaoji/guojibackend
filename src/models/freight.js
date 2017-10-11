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
const getCountryId = countriesService.getCountryId
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
      if (data.code === 200) {
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
      }else {
        throw data.msg
      }
    },

    *getPackage ({ payload = {} }, { call, put }) {
      const data = yield call(contryQuery)
      if (data) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            children.push(<Option key={item.country_cn}>{item.country_cn}</Option>);
          }
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
      const countryId = yield call(getCountryId,{name:payload.toString()})
      if (countryId.code === 200) {
        payload = countryId.obj.id
      }else{
        throw '获取国家ID失败'
        return
      }
      console.log("payload", payload)
      // return
      const destNation={countryId:payload}
      let currentItem = yield select(({ freight }) => freight.currentItem)
      const data = yield call(parceltypeQuery,destNation)

      if (data) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            let str = JSON.stringify({
              id: item.id,
              name: item.nameCh
            })
            children.push(<Option key={str}>{item.name_cn}</Option>);
          }
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
      console.log('packagid', payload)
      const packageType={packageTypeId:payload}
      let currentItem = yield select(({ freight }) => freight.currentItem)
      // currentItem.product_name = null

      const data = yield call(producttypeQuery,packageType)


      if (data) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            children.push(<Option key={item.id}>{item.product_name}</Option>);
          }
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
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg
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
      const createTime = new Date().getTime()
      const createUserId = JSON.parse(window.localStorage.getItem("guojipc_user")).roleId
      let newFreight = {...payload, createUserId}
      console.log('newFreight1', newFreight)
      newFreight.packageType = JSON.parse(newFreight.packageType).id
      const countryId = yield call(getCountryId,{name:payload.destination.toString()})
      if (countryId.code === 200) {
        newFreight.destination = countryId.obj.id
      }else{
        throw '获取国家ID失败'
        return
      }
      console.log('newFreight2222', newFreight)
      const data = yield call(create, newFreight)
      if (data.code=='200') {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const createUserId = JSON.parse(window.localStorage.getItem("guojipc_user")).roleId
      const id = yield select(({ freight }) => freight.currentItem.ID )// 运费id
      const destination = yield select(({ freight }) => freight.currentItem.country_cn )// 国家名称
      const packageType = yield select(({ freight }) => freight.currentItem.name_cn )// 包裹类型名称
      const productType = yield select(({ freight }) => freight.currentItem.product_name )// 产品类型名称
      const DESTINATION = yield select(({ freight }) => freight.currentItem.DESTINATION )// 国家id
      const PACKAGE_TYPE = yield select(({ freight }) => freight.currentItem.PACKAGE_TYPE )// 包裹类型id
      const PRODUCT_TYPE = yield select(({ freight }) => freight.currentItem.PRODUCT_TYPE )// 产品类型id
      // 判断国家是否修改
      if (payload.destination==destination) {
        payload.destination=DESTINATION
      }else{
        const countryId = yield call(getCountryId,{name:payload.destination})
        if (countryId.code === 200) {
          payload.destination = countryId.obj.id
        }else{
          throw '获取国家ID失败'
          return
        }
      }
      // 判断产品类型是否修改
      if (payload.packageType==packageType) {
        payload.packageType=PACKAGE_TYPE
      }else{
        payload.packageType=JSON.parse(payload.packageType).id
      }
      // 判断包裹类型是否修改
      if (payload.productType==productType) {
        payload.productType=PRODUCT_TYPE
      }
      let newFreight = {...payload, id, createUserId,}
      console.log('newFreight222', newFreight)
      const data = yield call( update, newFreight )
      console.log('data', data)
      if (data.code='200') {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      }else {
        throw data.msg
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