import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, remove, update, markBlack, createChinaOrder, getKdCompany, } from '../services/order'
import { create as addBoot } from '../services/boot'
import * as ordersService from '../services/orders'
import { pageModel } from './common'
import { config, time, } from '../utils'

const { query } = ordersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'order',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    bootModalVisible: false,
    selectedRowKeys: [],
    isMotion: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/order') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data.code === 200) {
        for(var item in data.obj){
          data.obj[item].CREATE_TIME=time.formatTime(data.obj[item].CREATE_TIME)
        }
        // data.obj.forEach((item) => {
        //   item.CREATE_TIME=time.formatTime(item.CREATE_TIME)
        // })
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
        throw data.msg
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
      payload['serialnumber'] = 'MZ' + new Date().getTime()
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
      const newOrder = { ...payload, id }
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
      console.log('payload111', payload)
      const other = {
        'createUserId': JSON.parse(window.localStorage.getItem('guojipc_user'))['roleId'],
        'status': 1
      }
      console.log('other', other)
      const data = yield call(addBoot, {
        priceSpread: Number(payload.priceSpread)*100,
        orderNo: payload.orderNo,
        reason: payload.reason,
        ...other
      })
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'hideBootModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    *createChinaOrder ({ payload }, { call, put }) {
      console.log('payload', payload)
      const data = yield call(createChinaOrder, {...payload})
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'hideBootModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

    *getKdCompany ({ payload }, { call, put,}) {
      const data = yield call(getKdCompany)
      console.log('data', data)
      if (data.code === 200 ) {
        let children = []
        if (data.obj) {
          for (let i = 0; i < data.obj.length; i++) {
            let item = data.obj[i]
            children.push(<Option key={item.company_code}>{item.company_name} / {item.company_code}</Option>)
          }
        }
        yield put({
          type: 'setKdCompany',
          payload: {
            selectKdCompany: children
          }
        })
      } else {
        throw '获取国际段快递公司失败'
      }
    }

  },

  reducers: {

    setKdCompany (state, { payload }) {
      return { ...state, ...payload }
    },

    showAddModal (state, { payload }) {
      return { ...state, ...payload, addModalVisible: true }
    },

    hideAddModal (state, { payload }) {
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
    }

  },
})
