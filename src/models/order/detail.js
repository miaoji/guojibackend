import { getOrderInfo, getOrderInfoByOrderNo, queryByCompany, } from '../../services/order'
import { message } from 'antd'
export default {

  namespace: 'orderDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        if (location.pathname === '/orderdetail') {
          const match = location.search.split('?orderNo=')
          if (match) {
            dispatch({ type: 'setListEmpty' })
            dispatch({ type: 'query', payload: { orderNo : match[1] } })
          }
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
      const data = yield call(getOrderInfo, payload)
      let detailDate = data.obj
      // 获取快递信息(开始)
      let orderData = ''
      const orderInfo = yield call(getOrderInfoByOrderNo, payload)
      if (orderInfo.code === 200) {
        const kdInfo = yield call(queryByCompany,{num:orderInfo.obj.cnNo,company:'zhongtong'})
        if (kdInfo.code === 200) {
          orderData = kdInfo.obj.data
          detailDate.orderData = orderData
        }
      }else{
        console.log('error',orderInfo)
      }
      // 获取快递信息(结束)

      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: detailDate,
          },
        })
      } else {
        throw data.msg
      }
    },
  },

  reducers: {
    setListEmpty (state) {
      return { ...state, data:{} }
    },
    querySuccess (state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data
      }
    }
  }
}
