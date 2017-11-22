import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { create, remove, update, markBlack, createChinaOrder, getKdCompany } from '../services/order'
import { create as addBoot } from '../services/boot'
import * as ordersService from '../services/orders'
import { pageModel } from './common'
import { config, time } from '../utils'

const { query } = ordersService
const { prefix } = config

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
      payload.serialnumber = `MZ${new Date().getTime()}`
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
      const kdCompanyCode = payload.kdCompanyCode.split('/-/')[1]
      const newOrder = {
        intlNo: payload.intlNo,
        kdCompanyCode,
        id,
      }
      console.log('newOrder', newOrder)
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
        createUserId: JSON.parse(window.localStorage.getItem('guojipc_user')).roleId,
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
        console.log('children', children)
        yield put({
          type: 'setKdCompany',
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
    },

    showStateModal (state, { payload }) {
      return { ...state, ...payload, stateModalVisible: true }
    },

    hideStateModal (state) {
      return { ...state, stateModalVisible: false }
    },

  },
})
