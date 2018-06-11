import React from 'react'
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query, merge, cancel, freight, getOrderInfo, parentOrder, getShelfCountByshelfNo } from '../services/cargodetails'
import { remove, update as status, getKdCompany } from '../services/order'
import { create as addBoot } from '../services/boot'
import { pageModel } from './common'
import { storage, queryURL } from '../utils'

export default modelExtend(pageModel, {
  namespace: 'cargodetail',

  state: {
    currentItem: {},
    // 合单
    modalVisible: false,
    // 定价
    bootModalVisible: false,
    // 到件
    stateModalVisible: false,
    // 称重
    weightModalVisible: false,
    // 添加国际单号
    modifyModalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    list: [],
    modalDis: true,
    modalRadioDis: false,
    // 补价modal
    repairModalVisible: false,
    shelfDis: true,
    shelfCount: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cargodetail') {
          dispatch({
            type: 'setStates',
            payload: {
              selectedRowKeys: [],
              selectParentOrder: [],
            },
          })
          dispatch({
            type: 'setStates',
            payload: {
              list: [],
            },
          })
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query({ payload = {} }, { call, put }) {
      // if (payload.batch) {
      //   window.sessionStorage.cargoBatch = payload.batch
      // } else {
      //   payload.batch = window.sessionStorage.cargoBatch
      // }
      const data = yield call(query, payload)
      if (data.code === 200 && data.obj) {
        for (let i = 0; i < data.obj.length; i++) {
          const item = data.obj[i]
          if (item.orderDetailList.length) {
            item.children = item.orderDetailList
            delete item.orderDetailList
          } else if (item.parentId === -1 || item.parentId === -2) {
            const datas = yield call(remove, { ids: item.id })
            if (datas.code === 200 && datas.success) {
              console.info('删除订单----', datas.msg)
              yield put({ type: 'query' })
            } else {
              console.info('删除订单失败----', datas.msg)
              console.info('错误代码----', datas.code)
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
        if (data.msg === '暂未查询到信息') return
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    *'delete'({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload })
      if (data.success) {
        message.success('订单删除成功!!!')
        yield put({ type: 'query' })
      } else {
        throw data || '无法跟服务器建立有效连接'
      }
    },

    // *create({ payload }, { call, put }) {
    //   const data = yield call(create, payload)
    //   if (data.success) {
    //     yield put({ type: 'hideModal' })
    //     yield put({ type: 'query' })
    //   } else {
    //     throw data.msg || '无法跟服务器建立有效连接'
    //   }
    // },

    // 合单
    *mergeOrder({ payload }, { select, call, put }) {
      if (payload.cargoType < 0) {
        payload.parentId = undefined
      } else if (!payload.parentId) {
        message.warn('请选择需指定到的订单单号')
        return
      } else {
        payload.parentId = payload.parentId.split('/-/')[1]
      }
      // ids 选中的订单号的一个数组集合
      const ids = yield select(({ cargodetail }) => cargodetail.currentItem.ids)
      const data = yield call(merge, {
        // cargoType -1:普货 -2:特货
        cargoType: payload.cargoType,
        // type 1:集运订单 0:直邮订单
        type: 1,
        // parentId: 订单父级Id
        parentId: payload.parentId,
      }, ids)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
        yield put({
          type: 'setStates',
          payload: {
            selectedRowKeys: [],
            selectParentOrder: [],
          },
        })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 撤销合单
    *setCancel({ payload }, { put, call }) {
      const parentData = yield call(getOrderInfo, { id: payload.parentId })
      if (parentData.code === 200 && parentData.success && parentData.obj) {
        if (parentData.obj.status > 1) {
          message.warn('已付款订单不允许撤销合单')
          return
        }
      } else {
        throw parentData.msg || '无法跟服务器建立有效连接'
      }
      const data = yield call(cancel, {}, [payload.id])
      if (data.code === 200 && data.success) {
        message.success('撤销成功')
        yield put({ type: 'query' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 定价
    *setFreight({ payload }, { select, put, call }) {
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
        yield put({ type: 'query' })
      } else if (data.code === 500) {
        message.error('定价失败,用户可能取消关注,请用其他方式通知用户付款')
        yield put({ type: 'hideBootModal' })
      } else if (data.code === 501) {
        message.error('定价失败,未查询到用户')
        yield put({ type: 'hideBootModal' })
      } else {
        yield put({ type: 'hideBootModal' })
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 到件处理
    *setStatus({ payload }, { select, put, call }) {
      if (payload.shelfNo && payload.shelfNo.length !== 3 && payload.cargoStatus === '已到件') {
        const shelf = JSON.parse(payload.shelfNo)
        payload.shelfNo = `${shelf.str || 'A'}${shelf.num}`
      } else if (payload.cargoStatus === '未到件') {
        payload.shelfNo = ''
      } else if (payload.shelfNo === 'A01') {
        payload.shelfNo = 'A01'
      } else {
        payload.shelfNo = undefined
      }
      const realStates = {
        未到件: 0,
        已到件: 1,
      }
      const id = yield select(({ cargodetail }) => cargodetail.currentItem.id)
      const date = new Date()
      const newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      const data = yield call(status, {
        id,
        cargoStatus: realStates[payload.cargoStatus],
        confirmTime: newDate,
        shelfNo: payload.shelfNo,
      })
      if (data.code === 200 && data.success) {
        message.success('操作成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideStateModal' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 订单状态
    *setOrderState({ payload }, { call, put, select }) {
      let state = yield select(({ cargodetail }) => cargodetail.currentItem.status)
      const realState = {
        待付款: 1,
        已付款: 2,
      }
      if (realState[payload.cargoStatus]) {
        state = realState[payload.cargoStatus]
      }
      const id = yield select(({ cargodetail }) => cargodetail.currentItem.id)
      const data = yield call(status, {
        id,
        status: state,
        userId: JSON.parse(storage({ key: 'user' })).id,
      })
      if (data.code === 200) {
        message.success('操作成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideStateModal' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 称重
    *setWeight({ payload }, { select, put, call }) {
      const id = yield select(({ cargodetail }) => cargodetail.currentItem.id)
      const data = yield call(status, {
        id,
        length: payload.length,
        width: payload.width,
        height: payload.height,
        weight: payload.weight,
      })
      if (data.code === 200 && data.success) {
        message.success('添加成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideWeightModal' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 补价
    *setRepair({ payload }, { select, put, call }) {
      const id = yield select(({ cargodetail }) => cargodetail.currentItem.id)
      const data = yield call(addBoot, {
        priceSpread: Number(payload.priceSpread) * 100,
        orderNo: payload.orderNo,
        reason: payload.reason,
        status: 1,
        id,
        createUserId: JSON.parse(storage({ key: 'user' })).roleId,
      })
      if (data.code === 200 && data.success) {
        message.success(data.msg)
        yield put({ type: 'query' })
        yield put({ type: 'hideRepairModal' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 设置国际段快递信息
    *setIntlNo({ payload }, { select, put, call }) {
      const id = yield select(({ cargodetail }) => cargodetail.currentItem.id)
      const data = yield call(status, {
        intlNo: payload.intlNo,
        kdCompanyCode: payload.kdCompanyCode.split('/-/')[1],
        status: 7,
        id,
      })
      if (data.code === 200 && data.success) {
        message.success('添加成功')
        yield put({ type: 'query' })
        yield put({ type: 'hideModifyModal' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    // 获取合单modal父级订单下拉框
    *getParentOrder({ payload }, { call, put }) {
      const data = yield call(parentOrder, { batch: queryURL('batch') })
      if (data.code === 200 && data.success) {
        let children = []
        let dis = false
        if (data.obj) {
          for (let i = 0; i < data.obj.length; i++) {
            dis = false
            let item = data.obj[i]
            children.push(<Option key={`${item.orderNo}/-/${item.id}`}>{item.orderNo}</Option>)
          }
        } else {
          dis = true
          children.push(<Option key={'10'}>请选择其他方式合单</Option>)
        }
        yield put({
          type: 'setStates',
          payload: {
            selectParentOrder: children,
            modalRadioDis: dis,
          },
        })
      } else {
        throw data.msg || '获取订单列表失败'
      }
    },

    // 设置合单modal下拉菜单的禁用
    *setMergeSelectState({ payload }, { put }) {
      if (payload.parentId !== '10' && payload.cargoType === '1') {
        yield put({
          type: 'setStates',
          payload: {
            modalDis: false,
          },
        })
      } else {
        yield put({
          type: 'setStates',
          payload: {
            modalDis: true,
          },
        })
      }
    },

    // 获取国际快递下拉菜单
    *getKdCompany({ payload }, { call, put }) {
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
        throw data.msg || '获取国际段快递公司列表失败'
      }
    },

    // 通过货架号获取该货架上的订单数量
    *getShelfCount({ payload }, { call, put }) {
      const data = yield call(getShelfCountByshelfNo, { ...payload })
      if (data.code === 200) {
        const shelfCount = data.obj
        yield put({
          type: 'setStates',
          payload: {
            shelfCount,
          },
        })
      } else {
        throw data.msg || '货架信息获取失败'
      }
    },

  },

  reducers: {
    // 修改state的参数
    setStates(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true, modalDis: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false, modalDis: true }
    },


    // 确定运费
    showBootModal(state, { payload }) {
      return { ...state, ...payload, bootModalVisible: true }
    },

    hideBootModal(state) {
      return { ...state, bootModalVisible: false }
    },

    // 是否到件
    showStateModal(state, { payload }) {
      return { ...state, ...payload, stateModalVisible: true }
    },

    // 控制货架号Input的显示与隐藏
    setShelfDis(state, { payload }) {
      return { ...state, ...payload, shelfDis: false }
    },

    hideStateModal(state) {
      return { ...state, stateModalVisible: false, shelfDis: true }
    },

    // 称重
    showWeightModal(state, { payload }) {
      return { ...state, ...payload, weightModalVisible: true }
    },

    hideWeightModal(state) {
      return { ...state, weightModalVisible: false }
    },

    // 添加国际单号
    showModifyModal(state, { payload }) {
      return { ...state, ...payload, modifyModalVisible: true }
    },

    hideModifyModal(state) {
      return { ...state, modifyModalVisible: false }
    },

    // 补价
    showRepairModal(state, { payload }) {
      return { ...state, ...payload, repairModalVisible: true }
    },

    hideRepairModal(state) {
      return { ...state, repairModalVisible: false }
    },

  },
})
