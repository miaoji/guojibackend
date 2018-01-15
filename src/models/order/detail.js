import { getOrderInfo, queryByCompany } from '../../services/order'

export default {

  namespace: 'orderDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/orderdetail' || location.pathname === '/cargodetailInfo') {
          const match = location.search.split('?orderNo=')[1]
          if (match) {
            dispatch({ type: 'setListEmpty' })
            dispatch({ type: 'query', payload: { orderNo: match } })
          }
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(getOrderInfo, payload)
      let detailDate = data.obj
      // 获取快递信息(开始)
      // 未查询到数据的时候 data返回的code也是200,但是没有obj
      if (data.code === 200 && data.obj) {
        if (data.obj.cnNo) {
          const cnInfo = yield call(queryByCompany, { num: data.obj.cnNo || '', company: data.obj.kdCompanyCodeCn || 'zhongtong', source: 'backend' })
          // 未查询到快递轨迹的时候,返回的code是500
          if (cnInfo.code === 200) {
            detailDate.cnExpressInfo = cnInfo.obj.data
          }
        }
        if (data.obj.intlNo) {
          const gjInfo = yield call(queryByCompany, { num: data.obj.intlNo || '', company: data.obj.kdCompanyCode || '', source: 'backend' })
          if (gjInfo.code === 200) {
            detailDate.gjExpressInfo = gjInfo.obj.data
          }
        }
      } else {
        console.info('error', data)
        return '查询无果'
      }
      // 获取快递信息(结束)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: detailDate,
          },
        })
      }
      throw data.msg
    },
  },

  reducers: {
    setListEmpty(state) {
      return { ...state, data: {} }
    },
    querySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
