import { accountLogin, getVerifyImage, getVerifyCodeByMobile, mobileLogin } from '../services/login'
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { queryURL, storage } from '../utils'
import md5 from 'js-md5'
import { api } from '../utils/config'

const loginApi = api.login

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
    codeLoading: false,
    loginUUID: '',
    verifyImage: '',
    loginType: 'account',
    getCodeAuth: true,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/login') {
          const loginUUID = `mz_uuid${new Date().getTime()}`
          dispatch({
            type: 'setVerifyImage',
            payload: {
              loginUUID,
              verifyImage: `${loginApi.getVerifyImage}?uuid=${loginUUID}`,
            },
          })
        }
      })
    },
  },

  effects: {
    /**
     * 帐号登录
     */
    *accountLogin ({ payload }, { put, call, select }) {
      yield put({ type: 'showLoginLoading' })
      const loginUUID = yield select(({ login }) => login.loginUUID)
      payload.uuid = loginUUID
      const data = yield call(accountLogin, payload)
      yield put({ type: 'hideLoginLoading' })
      if (data.status === 200) {
      	// 将 token, user信息 保存在本地localStorage
        storage({
          key: 'token',
          val: data.token,
          type: 'set',
        })
        storage({
          key: 'user',
          val: JSON.stringify(data.user),
          type: 'set',
        })
        const from = queryURL('from')
        yield put({ type: 'app/query' })
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        yield put({
          type: 'handleRefreshImage',
        })
        throw data.msg || '无法跟服务器建立有效连接'
      }
    },
    /**
     * 刷新图片验证码
     */
    *handleRefreshImage ({ payload }, { put }) {
      const loginUUID = `mz_uuid${new Date().getTime()}`
      yield put({
        type: 'setVerifyImage',
        payload: {
          loginUUID,
          verifyImage: `${loginApi.getVerifyImage}?uuid=${loginUUID}`,
        },
      })
    },
    /**
     * 根据手机号获取验证码
     */
    *getVerifyCodeByMobile ({ payload }, { put, call }) {
      yield put({ type: 'showCodeLoading' })
      const data = yield call(getVerifyCodeByMobile, payload)
      yield put({ type: 'hideCodeLoading' })
      if (data.success && data.code === 200) {
        message.success(data.msg)
        yield put({
          type: 'setCodeAuth',
          payload: {
            getCodeAuth: false,
          },
        })
      } else {
        throw data.msg || data
      }
    },
    /**
     * 根据手机号验证码登录
     */
    *mobileLogin ({ payload }, { put, call }) {
      yield put({ type: 'showLoginLoading' })
      const data = yield call(mobileLogin, payload)
      yield put({ type: 'hideLoginLoading' })
      if (data.status === 1) {
        // 将 token, user信息 保存在本地localStorage
        storage({
          key: 'token',
          val: data.token,
          type: 'set',
        })
        storage({
          key: 'user',
          val: JSON.stringify(data.user),
          type: 'set',
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
    showCodeLoading (state) {
      return {
        ...state,
        CodeLoading: true,
      }
    },
    hideCodeLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
    setVerifyImage (state, { payload }) {
      const { loginUUID, verifyImage } = payload
      return { ...state, loginUUID, verifyImage }
    },
    switchLoginType (state, { payload }) {
      let { loginType } = payload
      loginType = loginType === 'account' ? 'mobile' : 'account'
      return { ...state, loginType }
    },
    setCodeAuth (state, { payload }) {
      const getCodeAuth = payload.getCodeAuth
      return { ...state, getCodeAuth }
    },
  },
}
