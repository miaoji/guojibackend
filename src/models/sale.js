import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query } from '../services/cargos'
import { create, getKdCompany } from '../services/order'
import { pageModel } from './common'
import { config, time } from '../utils'
import * as location from '../services/countries'
import * as showPTypeByCounIdsService from '../services/showPTypeByCounIds'
import * as showproductNamesService from '../services/showproductNames'
import { query as quertWeChatUser } from '../services/wxuser'
import { create as addBoot } from '../services/boot'

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
  namespace: 'sale',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isMotion: false,

    selectNation: [],

    selectParcelType: [],
    selectProductType: [],
    parcelDis: true,
    productDis: true,

    selectWeChatUser: [],
    intlPrice: {},

    insuredVisiable: false,
    packageBin: []
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/sale') {
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
    
    *create ({ payload }, { call, put }) {
      let ss = []
      payload.receiverCountry?payload.receiverCountry=JSON.parse(payload.receiverCountry).name:payload.receiverCountry=undefined
      payload.wxUserId?payload.wxUserId = payload.wxUserId.split('/--/')[0]:payload.wxUserId = undefined
      if (payload.packageBin.length) {
        for (let i=0; i < payload.packageBin.length; i++) {
          const item = payload.packageBin[i]
          ss.push({
            wxUserId: payload.wxUserId,
            // 微信userId
            receiverName: payload.receiverName,
            // 收件人姓名
            receiverMobile: payload.receiverMobile,
            // 收件人手机号码
            receiverCountry: payload.receiverCountry,
            // 收件人国家
            receiverAddress: payload.receiverAddress,
            // 收件人地址
            receiverPostcode: payload.receiverPostcode,
            // 收件地址邮编
            orderName: item.orderName,
            // 包裹名称
            totalFee: Number(item.totalFee) * 100,
            // 价值
            kdCompanyCodeCn: item.kdCompanyCodeCn.split('/-/')[1] || undefined,
            // 国内快递公司
            cnNo: item.cnNo,
            // 国内单号
            type: 1,
            // 订单类型： 0直邮， 1集运
            status: 1
          })
        }
      }
      const data = yield call(create, ss)
      if (data.code === 200) {
        yield put({ type: 'hideModal' })
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    // 设置包裹详情内容的展示数据
    *setPackageBin ({ payload }, { call, put, select }) {
      const packageBin = payload.packageBin
      packageBin.push({
        orderName:payload.orderName,
        totalFee:payload.totalFee,
        kdCompanyCodeCn:payload.kdCompanyCodeCn,
        cnNo:payload.cnNo,
      })
      yield put({
        type: 'setStates',
        payload: {
          packageBin: packageBin,
        },
      })
    },

    // 获取国家信息
    *getCountry ({ payload = {} }, { call, put }) {
      const data = yield call(getCountry)
      if (data.code === 200) {
        delete data.obj[0]
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 1; i < obj.length; i++) {
            let item = obj[i]
            let str = {
              code: item.country_code,
              id: item.id,
              name: item.country_cn,
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

    // 获取微信用户信息
    *getWeChatUser ({}, { select, call, put }) {
      const data = yield call(quertWeChatUser, { page: 1, rows: 10000000 })
      if (data.code === 200 && data.obj) {
        let obj = data.obj
        let children = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          children.push(<Option key={`${item.ID}/--/${item.NICK_NAME}/--/${item.MOBILE}`}>{item.NICK_NAME}</Option>)
        }
        yield put({
          type: 'setStates',
          payload: {
            selectWeChatUser: children,
          },
        })
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

  },

  reducers: {

    // 设置状态
    setStates (state, { payload }) {
      return { ...state, ...payload }
    },
    
    // 显示modal
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    // 隐藏modal
    hideModal (state) {
      return { ...state, modalVisible: false, insuredVisiable: false, parcelDis: true, productDis: true }
    },
    
    // 显示modal里面的保价金额输入框
    showInsured (state) {
      return { ...state, insuredVisiable: true }
    },
    // 隐藏modal里面的保价金额输入框
    hideInsured (state) {
      return { ...state, insuredVisiable: false }
    },

  },
})
