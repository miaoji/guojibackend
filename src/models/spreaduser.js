import modelExtend from 'dva-model-extend'
import { message, Select } from 'antd'
import { query, create, remove, update, gradeInfo, wxuserInfo } from '../services/spreaduser'
import { pageModel } from './common'
import { config, storage } from '../utils'

const { prefix } = config
const Option = Select.Option

export default modelExtend(pageModel, {
  namespace: 'spreaduser',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: false,
    selectGrade: [],
    selectWxuser: [],
    spreadTypeDis: true,
    qrTypeDis: true
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/spreaduser') {
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

    *create({ payload }, { call, put }) {
      const wxUserId = JSON.parse(payload.wxUserId).id
      const spreadUserRatio = payload.spreadType === 1 ? payload.spreadeUserRatio : JSON.parse(payload.spreadLevelId).consumptionRatio
      const spreadLevelId = payload.spreadType === 0 ? JSON.parse(payload.spreadLevelId).id : undefined
      const seconds = payload.qrType=== 0 ? payload.seconds : undefined
      
      const replPayload = {
        qrType: payload.qrType,
        spreadType: payload.spreadType,
        seconds,
        spreadUserRatio,
        spreadLevelId,
        wxUserId
      }
      console.log('replPayload', replPayload)
      const data = yield call(create, replPayload)
      if (data.success && data.code == '200') {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    *update({ payload }, { select, call, put }) {
      payload.spreadConsumption = payload.spreadConsumption * 100
      const id = yield select(({ spreaduser }) => spreaduser.currentItem.id)
      const data = yield call(update, { ...payload, id })
      if (data.msg === '修改成功') {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },

    *'delete'({ payload }, { select, call, put }) {
      const id = yield select(({ spreaduser }) => spreaduser.currentItem.id)
      const data = yield call(remove, { ids: payload })
      if (data.msg === '删除成功' && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *getGradeInfo({ }, { call, put }) {
      const data = yield call(gradeInfo)
      if (data.code === 200) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            let str = {
              code: item.spreadName,
              id: item.id,
              consumptionRatio: item.consumptionRatio
            }
            str = JSON.stringify(str)
            children.push(<Option key={str}>{item.spreadName}</Option>)
          }
        }
        yield put({
          type: 'setStates',
          payload: {
            selectGrade: children,
          },
        })
      } else {
        throw data.msg
      }
    },

    *getWxuserInfo({ }, { call, put }) {
      const data = yield call(wxuserInfo)
      if (data.code === 200) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            let str = {
              code: item.NICK_NAME,
              id: item.ID
            }
            str = JSON.stringify(str)
            children.push(<Option key={str}>{item.NICK_NAME}</Option>)
          }
        }
        yield put({
          type: 'setStates',
          payload: {
            selectWxuser: children,
          },
        })
      } else {
        throw data.msg
      }
    },
    
    *updateState({ payload }, { put }) {
      console.log('aaa', payload)
      if (payload.spreadType && payload.spreadType === 1) {
        yield put({
          type: 'setStates',
          payload: {
            spreadTypeDis: false
          }
        })
      } else if (payload.spreadType === 0) {
        yield put({
          type: 'setStates',
          payload: {
            spreadTypeDis: true
          }
        })
      }
      if (payload.qrType && payload.qrType === 1) {
        console.log(111)
        yield put({
          type: 'setStates',
          payload: {
            qrTypeDis: true
          }
        })
      } else if (payload.qrType === 0) {
        console.log(2222)
        yield put({
          type: 'setStates',
          payload: {
            qrTypeDis: false
          }
        })
      }
    }

  },

  reducers: {

    setStates(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return {
        ...state, modalVisible: false, spreadTypeDis: true, qrTypeDis: true }
    },

  },
})
