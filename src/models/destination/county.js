/**
 * 目的地model
 */
import modelExtend from 'dva-model-extend'
import { message, Row, Col } from 'antd'
//import { create, remove } from '../services/county'
import * as countysService from '../../services/countys'
import * as locationService from '../../services/location'
import { pageModel } from '../common'

const { query } = countysService
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
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/county') {
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
      if (data) {
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
        throw data.mess || data
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

    *update ({ payload }, { select, call, put }) {
      const id = yield select(({ county }) => county.currentItem.id)
      const newcounty = { ...payload, id }
      const data = yield call(update, newcounty)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload.toString() })
      if (data.success && data.code === 200) {
        message.success(data.mess)
        yield put({ type: 'query' })
      } else {
        throw data.mess
      }
    },

    *queryLocation ({ payload = {} }, { select, call, put }) {
      const countryId = payload.currentItem.id
      const params = {countryid: countryId}
      const data = yield call(queryLocation, {params, type: 'province'})
      if (data) {
        yield put({
          type: 'showLocationModal',
          payload: {
            locationData: data.obj,
            currentItem: payload.currentItem,
            type: payload.type
          },
        })
      } else {
        throw data.mess || data
      }
    },

    *createProvince ({ payload = {} }, { select, call, put }) {
      const currentItem = yield select(({ county }) => county.currentItem)
      const countryId = currentItem.id
      const params = {countryid: countryId, name: payload.name, englishname: payload.englishname}
      const data = yield call(createLocation, {params, type: 'province'})
      if (data.success && data.code === 200) {
        const queryData = yield call(queryLocation, {params: {countryid: countryId}, type: 'province'})
        if (!queryData.success) throw queryData.mess
        yield put({
          type: 'showLocationModal',
          payload: {
            locationData: queryData.obj,
            currentItem,
            type: payload.type
          },
        })
      } else {
        throw data.mess || data
      }
    }

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showLocationModal (state, { payload }) {
      let { currentItem, locationData, type } = payload
      const visible = type + 'ModalVisible'
      locationData = locationData.map(function(elem) {
        return <Row gutter={16}>
                <Col className="gutter-row" span={8}>
                  <div className="gutter-box">{elem['id']}</div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div className="gutter-box">{elem['name']}</div>
                </Col>
              </Row>;
      })
      let res = { ...state, currentItem, locationData }
      res[visible] = true
      return res
    },

    hideLocationModal (state, { payload }) {
      const { type } = payload
      const visible = type + 'ModalVisible'
      let res = { ...state }
      res[visible] = false
      return res
    }

  },
})
