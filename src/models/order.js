import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, remove, update, markBlack, createChinaOrder, getKdCompany, getIntlPrice } from '../services/order'
import * as location from '../services/countries'
import * as showPTypeByCounIdsService from '../services/showPTypeByCounIds'
import * as showproductNamesService from '../services/showproductNames'
import { query as quertWeChatUser } from '../services/wxuser'
import { create as addBoot } from '../services/boot'
import * as ordersService from '../services/orders'
import { pageModel } from './common'
import { config, time, storage } from '../utils'

const { query } = ordersService
const { prefix } = config

const getCountry = location.query // 获取国家信息
const getProvince = location.getProvinceId // 获取省份信息
const getCity = location.getCityId // 获取市级信息
const getCounty = location.getCountyId // 获取县区级信息
const getCountryId = location.getCountryId // 通过国家姓名获取国家ID

const parceltypeQuery = showPTypeByCounIdsService.query // 通过国家信息获取包裹类型
const producttypeQuery = showproductNamesService.query // 通过包裹类型获取产品类型

// 状态,1.待付款，2.付款完成，3.国内完成，4.国际完成，5异常订单，6取消订单
const realtext = {
  1: '待付款',
  2: '付款完成',
  3: '国内完成',
  4: '国际完成',
  5: '异常订单',
  6: '取消订单',
}

export default modelExtend(pageModel, {
  namespace: 'order',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    bootModalVisible: false,
    stateModalVisible: false,
    selectedRowKeys: [],
    isMotion: false,

    selectNation: [],
    provinceDis: true,
    cityDis: true,
    districtDis: true,
    
    selectParcelType: [],
    selectProductType: [],
    parcelDis: true,
    productDis: true,

    selectWeChatUser: [],
    intlPrice: {}
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/order') {
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
        for (let item in data.obj) {
          data.obj[item].CREATE_TIME = time.formatTime(data.obj[item].CREATE_TIME)
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
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { ids: payload.toString() })
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    *create ({ payload }, { call, put }) {
      payload.wxUserId?payload.wxUserId=Number(payload.wxUserId.split('/--/')[0]):payload.wxUserId=undefined
      payload.receiverCountry?payload.receiverCountry=JSON.parse(payload.receiverCountry).id:payload.receiverCountry=undefined
      payload.packageType?payload.packageType=JSON.parse(payload.packageType).id:payload.packageType=undefined
      payload.receiverCountry?payload.countryId=JSON.parse(payload.receiverCountry).id:payload.countryId=undefined
      payload.packageType?payload.packageTypeId=JSON.parse(payload.packageType).id:payload.packageTypeId=undefined
      payload.productType?payload.productTypeId=payload.productType:payload.productTypeId=undefined
      payload.senderProv?payload.senderProv=JSON.parse(payload.senderProv).id:payload.senderProv=undefined
      payload.senderCity?payload.senderCity=JSON.parse(payload.senderCity).id:payload.senderCity=undefined
      payload.height?payload.height=Number(payload.height):payload.height=undefined
      payload.length?payload.length=Number(payload.length):payload.length=undefined
      payload.weight?payload.weight=Number(payload.weight):payload.weight=undefined
      payload.width?payload.width=Number(payload.width):payload.width=undefined
      payload.type=0
      const data = yield call(create, payload)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ order }) => order.currentItem.ID)
      const newOrder = {
        intlNo: payload.intlNo,
        kdCompanyCode: payload.kdCompanyCode.split('/-/')[1],
        id,
      }
      const data = yield call(update, newOrder)
      if (data.success && data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *addBoot ({ payload }, { call, put }) {
      const other = {
        createUserId: JSON.parse(storage({key: 'user'})).roleId,
        status: 1,
      }
      const data = yield call(addBoot, {
        priceSpread: Number(payload.priceSpread) * 100,
        orderNo: payload.orderNo,
        reason: payload.reason,
        ...other,
      })
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'hideBootModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    *updateState ({ payload }, { call, put, select }) {
      const id = yield select(({ order }) => order.currentItem.ID)
      const state = yield select(({ order }) => order.currentItem.STATUS)
      // 判断是否修改state(订单状态)
      if (!Number(payload.state)) {
        payload.state = state
      }
      const data = yield call(update, {
        id,
        status: payload.state,
      })
      if (data.success && data.code === 200) {
        message.success('状态修改成功')
        yield put({ type: 'hideStateModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    *createChinaOrder ({ payload }, { call, put }) {
      const data = yield call(createChinaOrder, { ...payload })
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'hideBootModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    *getKdCompany ({ payload }, { call, put }) {
      const data = yield call(getKdCompany)
      if (data.code === 200) {
        let children = []
        if (data.obj) {
          for (let i = 0; i < data.obj.length; i++) {
            let item = data.obj[i]
            children.push(<Option key={`${item.companyName}/-/${item.companyCode}`}>{item.companyName}</Option>)
          }
        }
        yield put({
          type: 'setStates',
          payload: {
            selectKdCompany: children,
          },
        })
      } else {
        throw '获取国际段快递公司失败'
      }
    },

    // 获取国家信息
    *getCountry ({ payload = {} }, { call, put }) {
      const data = yield call(getCountry)
      console.log('datatas', data)
      if (data.code === 200) {
        delete data.obj[0]
        console.log('ssss', data)
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 1; i < obj.length; i++) {
            let item = obj[i]
            let str = {
              code: item.country_code,
              id: item.id,
            }
            str = JSON.stringify(str)
            children.push(<Option key={str}>{item.country_cn}</Option>)
          }
        }
        yield put({
          type: 'setStates',
          payload: {
            selectNation: children,
          },
        })
      } else {
        throw data.msg
      }
    },

    // 获取省份信息
    *getProvince ({ payload }, { call, put }) {
      const data = yield call(getProvince, { countryCode: 'CN' })
      if (data.code === 200) {
        let children = []
        if (data.obj) {
          for (let i = 0; i < data.obj.length; i++) {
            let item = data.obj[i]
            let str = {
              code: item.province_code,
              id: item.id,
            }
            str = JSON.stringify(str)
            children.push(<Option key={str}>{item.province}</Option>)
          }
        }
        yield put({
          type: 'setStates',
          payload: {
            selectProvince: children,
            provinceDis: false
          },
        })
      } else {
        throw data.msg
      }
    },

    // 获取市级信息
    *getCity ({ payload = {} }, { call, put }) {
      payload = JSON.parse(payload).code
      const data = yield call(getCity, { provinceCode: payload })
      if (data.code === 200) {
        let children = []
        if (data.obj) {
          for (let i = 0; i < data.obj.length; i++) {
            let item = data.obj[i]
            let str = {
              code: item.city_code,
              id: item.id,
            }
            str = JSON.stringify(str)
            children.push(<Option key={str}>{item.city}</Option>)
          }
        }
        yield put({
          type: 'setStates',
          payload: {
            selectCity: children,
            cityDis: false
          },
        })
      } else {
        throw data.msg
      }
    },

    // 获取县区级信息
    *getCounty ({ payload = {} }, { call, put }) {
      payload = JSON.parse(payload).code
      const data = yield call(getCounty, { cityCode: payload })
      if (data.code === 200) {
        let children = []
        if (data.obj) {
          for (let i = 0; i < data.obj.length; i++) {
            let item = data.obj[i]
            children.push(<Option key={item.id}>{item.district}</Option>)
          }
        }
        yield put({
          type: 'setStates',
          payload: {
            selectCounty: children,
            districtDis: false
          },
        })
      } else {
        throw data.msg
      }
    },
    
    // 获取包裹类型
    *getParcelType ({ payload }, { select, call, put }) {
      const destNation = { countryId: JSON.parse(payload).id }
      const data = yield call(parceltypeQuery, destNation)
      if (data.code === 200 && data.obj) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            let str = JSON.stringify({
              id: item.id,
              name: item.nameCh,
            })
            children.push(<Option key={str}>{item.name_cn}</Option>)
          }
        }
        console.log('children', children)
        yield put({
          type: 'setStates',
          payload: {
            selectParcelType: children,
            parcelDis: false
          },
        })
      } else {
        throw data.mess
      }
    },

    // 获取产品类型
    *getProductType ({ payload = {} }, { select, call, put }) {
      const packageType = { packageTypeId: payload }
      const data = yield call(producttypeQuery, packageType)
      if (data.code === 200 && data.obj) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            children.push(<Option key={item.id}>{item.product_name}</Option>)
          }
        }
        yield put({
          type: 'setStates',
          payload: {
            selectProductType: children,
            productDis: false 
          },
        })
      } else {
        throw data.mess
      }
    },

    // 获取微信用户信息
    *getWeChatUser ({}, { select, call, put }) {
      const data = yield call(quertWeChatUser,{page: 1,rows: 10000000})
      console.log('wxdata',data)
      if (data.code === 200 && data.obj) {
        let obj = data.obj
        let children = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          children.push(<Option key={item.ID+"/--/"+item.NICK_NAME+"/--/"+item.MOBILE}>{item.NICK_NAME}</Option>)
        }
        yield put({
          type: 'setStates',
          payload: {
            selectWeChatUser: children
          }
        })
      }
    },

    // 获取预付款信息
    *getIntlPrice ({ payload = {} }, { call, put }) {
      const data = yield call(getIntlPrice,{...payload})
      if (data.code === 200 && data.obj) {
        const intlPrice = data.obj
        yield put({
          type: 'setStates',
          payload: {
            intlPrice: intlPrice
          }
        })
      }
    }

  },

  reducers: {

    setStates (state, { payload }) {
      return { ...state, ...payload }
    },

    showAddModal (state, { payload }) {
      return { ...state, ...payload, addModalVisible: true }
    },

    hideAddModal (state) {
      return { ...state, addModalVisible: false }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showBootModal (state, { payload }) {
      return { ...state, ...payload, bootModalVisible: true }
    },

    hideBootModal (state) {
      return { ...state, bootModalVisible: false }
    },

    showStateModal (state, { payload }) {
      return { ...state, ...payload, stateModalVisible: true }
    },

    hideStateModal (state) {
      return { ...state, stateModalVisible: false }
    },

  },
})
