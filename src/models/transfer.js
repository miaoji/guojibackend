import React from 'react'
import modelExtend from 'dva-model-extend'
import { message, Select } from 'antd'
import { query, create, remove, update } from '../services/transfers'
import * as location from '../services/countries'
import { pageModel } from './common'
// import { config } from '../utils'

const getCountry = location.query // 获取国家信息
const getProvince = location.getProvinceId // 获取省份信息
const getCity = location.getCityId // 获取市级信息
const getCounty = location.getCountyId // 获取县区级信息
// const getCountryId = location.getCountryId // 通过国家姓名获取国家ID

// const { prefix } = config
const Option = Select.Option

export default modelExtend(pageModel, {
  namespace: 'transfer',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isMotion: false,
    selectedRowKeys: [],
    selectNation: [],
    provinceDis: true,
    cityDis: true,
    districtDis: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(locations => {
        if (locations.pathname === '/transfer') {
          dispatch({
            type: 'query',
            payload: locations.query,
          })
        }
      })
    },
  },

  effects: {

    *query({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data.code === 200 && data.success) {
        for (let item in data.obj) {
          if (item) {
            data.obj[item].countryName = data.obj[item].country.countryCn
            data.obj[item].provincesName = data.obj[item].provinces.province
            data.obj[item].citiesName = data.obj[item].cities.city
            data.obj[item].districtsName = data.obj[item].districts.district
            data.obj[item].countryId = data.obj[item].country.id
            data.obj[item].provincesId = data.obj[item].provinces.id
            data.obj[item].citiesId = data.obj[item].cities.id
            data.obj[item].districtsId = data.obj[item].districts.id
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

    // 获取国家信息
    *getCountry({ payload = {} }, { call, put }) {
      const data = yield call(getCountry)
      if (data.code === 200) {
        let obj = data.obj
        let children = []
        if (data.obj) {
          for (let i = 0; i < obj.length; i++) {
            let item = obj[i]
            let str = {
              code: item.country_code,
              id: item.id,
            }
            str = JSON.stringify(str)
            children.push(<Option key={str}>{item.country_cn}</Option>)
          }
        }
        yield put({
          type: 'setAddress',
          payload: {
            selectNation: children,
          },
        })
      } else {
        throw data.msg
      }
    },

    // 获取省份信息
    *getProvince({ payload = {} }, { call, put }) {
      payload = JSON.parse(payload).code
      const data = yield call(getProvince, { countryCode: payload })
      if (data.code === 200) {
        let children = []
        if (data.obj) {
          for (let i = 0; i < data.obj.length; i++) {
            let item = data.obj[i]
            let str = {
              code: item.province_code,
              id: item.id,
            }
            str = JSON.stringify(str)
            children.push(<Option key={str}>{item.province}</Option>)
          }
        }
        yield put({
          type: 'setAddress',
          payload: {
            selectProvince: children,
            provinceDis: false,
          },
        })
      } else {
        throw data.msg
      }
    },

    // 获取市级信息
    *getCity({ payload = {} }, { call, put }) {
      payload = JSON.parse(payload).code
      const data = yield call(getCity, { provinceCode: payload })
      if (data.code === 200) {
        let children = []
        if (data.obj) {
          for (let i = 0; i < data.obj.length; i++) {
            let item = data.obj[i]
            let str = {
              code: item.city_code,
              id: item.id,
            }
            str = JSON.stringify(str)
            children.push(<Option key={str}>{item.city}</Option>)
          }
        }
        yield put({
          type: 'setAddress',
          payload: {
            selectCity: children,
            cityDis: false,
          },
        })
      } else {
        throw data.msg
      }
    },

    // 获取县区级信息
    *getCounty({ payload = {} }, { call, put }) {
      payload = JSON.parse(payload).code
      const data = yield call(getCounty, { cityCode: payload })
      if (data.code === 200) {
        let children = []
        if (data.obj) {
          for (let i = 0; i < data.obj.length; i++) {
            let item = data.obj[i]
            children.push(<Option key={item.id}>{item.district}</Option>)
          }
        }
        yield put({
          type: 'setAddress',
          payload: {
            selectCounty: children,
            districtDis: false,
          },
        })
      } else {
        throw data.msg
      }
    },

    *'delete'({ payload }, { call, put }) {
      const data = yield call(remove, { ids: payload.toString() })
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        throw data.msg || data
      }
    },

    *create({ payload }, { call, put }) {
      payload.transferCountry = JSON.parse(payload.transferCountry).id
      payload.transferProv = JSON.parse(payload.transferProv).id
      payload.transferCity = JSON.parse(payload.transferCity).id
      const data = yield call(create, payload)
      if (data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const newCurrentItem = yield select(({ transfer }) => transfer.currentItem)
      payload.id = newCurrentItem.id
      // 判断修改时的国家是否与加载时的国家相同 相同则不修改
      if (payload.transferCountry === newCurrentItem.country.countryCn) {
        delete payload.transferCountry
      } else {
        payload.transferCountry = JSON.parse(payload.transferCountry).id
      }
      // 判断修改时的省是否与加载时的省相同 相同则不修改
      if (payload.transferProv === newCurrentItem.provinces.province) {
        delete payload.transferProv
      } else {
        payload.transferProv = JSON.parse(payload.transferProv).id
      }
      // 判断修改时的市是否与加载时的市相同 相同则不修改
      if (payload.transferCity === newCurrentItem.cities.city) {
        delete payload.transferCity
      } else {
        payload.transferCity = JSON.parse(payload.transferCity).id
      }
      // 判断修改时的区是否与加载时的区相同 相同则不修改
      if (payload.transferCounty === newCurrentItem.districts.district) {
        delete payload.transferCounty
      }
      const data = yield call(update, payload)
      if (data.code === 200) {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data.msg
      }
    },

  },

  reducers: {

    setAddress(state, { payload }) {
      return { ...state, ...payload }
    },

    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false, provinceDis: true, cityDis: true, districtDis: true }
    },

  },
})
