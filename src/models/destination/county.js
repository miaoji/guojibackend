/**
 * 目的地 县区级model
 */
import modelExtend from 'dva-model-extend'
import { message, Row, Col } from 'antd'
import * as countysService from '../../services/countys'
import * as locationService from '../../services/location'
import { pageModel } from '../common'
import { queryURL, storage } from '../../utils'

const { query, create, update, remove } = countysService
const queryLocation = locationService.query
const createLocation = locationService.create

export default modelExtend(pageModel, {
  namespace: 'county',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    province: [],
    locationData: [],
    provinceModalVisible: false,
    countyModalVisible: false,
    countyModalVisible: false,
    list: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/county') {
          // 清空module原有的数据
          dispatch({
            type: 'setListEmpty',
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
// 当前跳转的时候获得cityid ,如果获取了 cityCode 则跟新本地存储
// 如果没有 则从 sessionStorage 获取
    *query ({ payload = {} }, { call, put }) {
      if (payload.cityCode) {
        window.sessionStorage.cityCode = payload.cityCode
      } else {
        payload.cityCode = window.sessionStorage.cityCode
      }
      const data = yield call(query, payload)
      if (data.code == '200' || data.code == '500') {
        if (data.obj == null || data.code == '500') {
          data.obj = { show: true, name: '暂无该城市的信息' }
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
        throw data.msg
      }
    },

    *create ({ payload }, { call, put }) {
      payload.cityCode = storage({
        key: 'cityCode',
        type: 'get',
      })
      const data = yield call(create, payload)
      if (data.success) {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ county }) => county.currentItem.id)
      const newcounty = { ...payload, id }
      const data = yield call(update, newcounty)
      if (data.success) {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload.toString() })
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.mess
      }
    },

    *queryLocation ({ payload = {} }, { select, call, put }) {
      const countryId = payload.currentItem.id
      const params = { countryid: countryId }
      const data = yield call(queryLocation, { params, type: 'province' })
      if (data) {
        yield put({
          type: 'showLocationModal',
          payload: {
            locationData: data.obj,
            currentItem: payload.currentItem,
            type: payload.type,
          },
        })
      } else {
        throw data.mess || data
      }
    },

    *createProvince ({ payload = {} }, { select, call, put }) {
      const currentItem = yield select(({ county }) => county.currentItem)
      const countryId = currentItem.id
      const params = { countryid: countryId, name: payload.name, englishname: payload.englishname }
      const data = yield call(createLocation, { params, type: 'province' })
      if (data.success && data.code === 200) {
        const queryData = yield call(queryLocation, { params: { countryid: countryId }, type: 'province' })
        if (!queryData.success) throw queryData.mess
        yield put({
          type: 'showLocationModal',
          payload: {
            locationData: queryData.obj,
            currentItem,
            type: payload.type,
          },
        })
      } else {
        throw data.mess || data
      }
    },

  },

  reducers: {
    setListEmpty (state) {
      return { ...state, list: { show: true, name: '数据加载中...' } }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showLocationModal (state, { payload }) {
      let { currentItem, locationData, type } = payload
      const visible = `${type}ModalVisible`
      locationData = locationData.map((elem) => {
        return (<Row gutter={16}>
                <Col className="gutter-row" span={8}>
                  <div className="gutter-box">{elem.id}</div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div className="gutter-box">{elem.name}</div>
                </Col>
              </Row>)
      })
      let res = { ...state, currentItem, locationData }
      res[visible] = true
      return res
    },

    hideLocationModal (state, { payload }) {
      const { type } = payload
      const visible = `${type}ModalVisible`
      let res = { ...state }
      res[visible] = false
      return res
    },

  },
})
