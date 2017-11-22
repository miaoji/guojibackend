import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query, merge, cancel, freight, getOrderInfo } from '../services/cargodetails'
import { remove, update as status } from '../services/order'
import { pageModel } from './common'
import { config, time, storage, queryURL } from '../utils'

const { prefix } = config

// 状态,1.待付款，2.付款完成，3.国内完成，4.国际完成，5异常订单，6取消订单
const realState = {
  1: '待付款',
  2: '付款完成',
  3: '国内完成',
  4: '国际完成',
  5: '异常订单',
  6: '取消订单',
  7: '未到件',
  8: '已到件',
}

export default modelExtend(pageModel, {
  namespace: 'cargodetail',

  state: {
    currentItem: {},
    modalVisible: false,
    bootModalVisible: false,
    stateModalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    list: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cargodetail') {
          dispatch({ type: 'setSelectedEmpty' })
          dispatch({ type: 'setListEmpty' })
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
      if (data.code === 200 && data.success && data.obj) {
        for (let i = 0; i < data.obj.length; i++) {
          const item = data.obj[i]
          console.log('parentId', data.obj[i].parentId)
          console.log('orderInfoSubset', data.obj[i].orderInfoSubset)
          if (item.orderInfoSubset.length) {
            item.children = item.orderInfoSubset
            delete item.orderInfoSubset
          }else if (item.parentId === -1 || item.parentId === -2) {
            const data = yield call(remove, { ids: item.id })
            if (data.code===200&&data.success) {
              console.log('删除订单----',data.msg)
              yield put({ type: 'query', payload: { batch: queryURL('batch') } })
            }else{
              console.log('删除订单失败----',data.msg)
              console.log('错误代码----',data.code)
            }
          }
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
      const data = yield call(remove, { ids: payload })
      if (data.success) {
        message.success('订单删除成功!!!')
        yield put({ type: 'query', payload: { batch: queryURL('batch') } })
      } else {
        throw data || '无法跟服务器建立有效连接'
      }
    },

    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    // 合单
    *mergeOrder ({ payload }, { select, call, put }) {
      const ids = yield select(({ cargodetail }) => cargodetail.currentItem.ids)
      const data = yield call(merge, {
        cargoType: payload.cargoType,
        type: 1,
      }, ids)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query', payload: { batch: queryURL('batch') } })
        yield put({ type: 'setSelectedEmpty' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 撤销合单
    *setCancel ({ payload }, { put, call }) {
      console.log('parentId', payload.parentId)
      const parentData = yield call(getOrderInfo, {id: payload.parentId})
      console.log('parentDatass', parentData)
      if (parentData.code===200&&parentData.success&&parentData.obj) {
        if (parentData.obj.status>1) {
          message.warn('已付款订单不允许撤销合单')
          return
        }
      }else{
        throw parentData.msg || '无法跟服务器建立有效连接'
      }
      const data = yield call(cancel, {}, [payload.id])
      if (data.code === 200 && data.success) {
        message.success('撤销成功')
        yield put({ type: 'query', payload: { batch: queryURL('batch') } })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 定价
    *setFreight ({ payload }, { select, put, call }) {
      const currentItem = yield select(({ cargodetail }) => cargodetail.currentItem)
      const realPayload = {
        orderId: currentItem.id,
        wxUserId: currentItem.wxUserId,
        totalFee: Number(payload.totalFee) * 100,
        orderNo: payload.orderNo,
        remark: payload.remark,
      }
      const data = yield call(freight, realPayload)
      if (data.code === 200 && data.success) {
        message.success('定价完成,已成功向用户推送付款信息!')
        yield put({ type: 'hideBootModal' })
        yield put({ type: 'query', payload: { batch: queryURL('batch') } })
      } else if (data.code === 500) {
        message.error('定价失败,用户可能取消关注,请用其他方式通知用户付款')
        yield put({ type: 'hideBootModal' })
      } else if (data.code === 501) {
        message.error('定价失败,未查询到用户')
        yield put({ type: 'hideBootModal' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
        yield put({ type: 'hideBootModal' })
      }
    },

    // 确认是否收到用户的包裹
    *setStatus ({ payload }, { select, put, call }) {
      const realStates = {
        未到件: 7,
        已到件: 8,
      }
      const id = yield select(({ cargodetail }) => cargodetail.currentItem.id)
      console.log('realState[payload.status]', realStates[payload.status])
      const data = yield call(status, {
        id,
        status: realStates[payload.status],
      })
      if (data.code === 200 && data.success) {
        message.success('操作成功')
        yield put({ type: 'query', payload: { batch: queryURL('batch') } })
        yield put({ type: 'hideStateModal' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

  },

  reducers: {
    // 在选中待合单订单进行合单动作完成后,清除订单的选中状态
    setSelectedEmpty (state, { payload }) {
      return { ...state, selectedRowKeys: [] }
    },
    // 解决页面加载时的缓存问题(页面加载时,会优先加载缓存)
    setListEmpty (state, { payload }) {
      return { ...state, list: [] }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },


    // 确定运费
    showBootModal (state, { payload }) {
      return { ...state, ...payload, bootModalVisible: true }
    },

    hideBootModal (state) {
      return { ...state, bootModalVisible: false }
    },

    // 是否到件
    showStateModal (state, { payload }) {
      return { ...state, ...payload, stateModalVisible: true }
    },

    hideStateModal (state) {
      return { ...state, stateModalVisible: false }
    },


    switchIsMotion (state) {
      localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
