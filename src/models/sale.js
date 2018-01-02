import modelExtend from 'dva-model-extend'
import { message, Select } from 'antd'
import { create, remove, update, markBlack } from '../services/parceltype'
import * as salesService from '../services/parceltypes'
import * as countriesService from '../services/countries'
import { pageModel } from './common'
import { config, storage } from '../utils'

const { query } = salesService
const contryQuery = countriesService.query
const getCountryId = countriesService.getCountryId
const { prefix } = config
const Option = Select.Option

export default modelExtend(pageModel, {
  namespace: 'sale',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    selectNation: [],
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
      if (data.code === 200 && data.success) {
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

    *getNation ({ payload = {} }, { call, put }) {
      const data = yield call(contryQuery)
      if (data.code === 200) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            children.push(<Option key={item.country_cn}>{item.country_cn}</Option>)
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

    *'delete' ({ payload }, { call, put }) {
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
      // 通过国家名称获取国家id
      const destination = yield call(getCountryId, { name: payload.destination.toString() })
      if (destination.code === 200) {
        payload.destination = destination.obj.id
      } else {
        throw '获取国家ID失败'
        return
      }
      // return
      const createUserId = JSON.parse(storage({ key: 'user' })).roleId
      // 用nameCn 来判断 nameEn 的值
      let nameEn = ''
      if (payload.nameCn == '包裹') {
        nameEn = 'P'
      } else if (payload.nameCn == '文件') {
        nameEn = 'D'
      } else if (payload.nameCn == '大货') {
        nameEn = 'PPS'
      } else {
        nameEn = '*'
      }
      const newFreight = { ...payload, createUserId, nameEn }
      const data = yield call(create, newFreight)
      if (data.success && data.code == '200') {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ sale }) => sale.currentItem.ID)
      const country_cn = yield select(({ sale }) => sale.currentItem.country_cn)
      const DESTINATION = yield select(({ sale }) => sale.currentItem.DESTINATION)
      const createUserId = JSON.parse(storage({ key: 'user' })).roleId
      let nameEn = ''
      // 判断修改是输入的目的地国家的值有没有变化,没有变化则返回它本身的DESTINATION,改变了则通过接口获取一个国家id
      // 若没有获取到国家ID则提示用户,并return
      if (payload.destination == country_cn) {
        payload.destination = DESTINATION
      } else {
        const destination = yield call(getCountryId, { name: payload.destination.toString() })
        if (destination.code === 200) {
          payload.destination = destination.obj.id
        } else {
          throw '获取国家ID失败'
          return
        }
      }
      if (payload.nameCn == '包裹') {
        nameEn = 'P'
      } else if (payload.nameCn == '文件') {
        nameEn = 'D'
      } else {
        nameEn = '*'
      }
      const newFreight = { ...payload, id, createUserId, nameEn }
      const data = yield call(update, newFreight)
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

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

  },
})
