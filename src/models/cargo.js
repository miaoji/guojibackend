import modelExtend from 'dva-model-extend'
import { message } from 'antd'
// import { create, remove, update, markBlack, createChinaOrder, getKdCompany, } from '../services/order'
// import { create as addBoot } from '../services/boot'
import { query } from '../services/cargos'
import { pageModel } from './common'
import { config, time } from '../utils'

// const { query } = ordersService
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
  namespace: 'cargo',

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
        if (location.pathname === '/cargo') {
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
  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

  },
})
