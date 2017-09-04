import { login } from '../services/login'
import { routerRedux } from 'dva/router'
import { queryURL, storage } from '../utils'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    *login ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' })
      const data = yield call(login, payload)
      yield put({ type: 'hideLoginLoading' })
      if (data.status === 1) {
      	// 将 token 保存在本地localStorage
        storage({
          key: 'token',
          val: data.token,
          type: 'set'
        })
        storage({
          key: 'user',
          val: JSON.stringify(data.user),
          type: 'set'
        })
        const from = queryURL('from')
        yield put({ type: 'app/query' })
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data.msg || data
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
