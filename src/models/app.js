// import { query, logout } from '../services/app'
import { routerRedux } from 'dva/router'
// import { parse } from 'qs'
import { config, storage } from '../utils'
// const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    menuPopoverVisible: false,
    siderFold: storage({ key: 'siderFold' }) === 'true',
    darkTheme: storage({ key: 'darkTheme' }) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(storage({ key: 'navOpenKeys' })) || [],
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {

    *query ({ payload }, { put }) {
      const token = storage({ key: 'token' })
      if (token && token.length > 0) {
        let user = storage({ key: 'user' })
        user = typeof user === 'string' && JSON.parse(user)
        yield put({
          type: 'querySuccess',
          payload: user,
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    },

    *logout ({ payload }, { put }) {
      storage({ type: 'clear' })
      yield put({ type: 'query' })
    },

    *changeNavbar ({ payload }, { put, select }) {
      const { app } = yield(select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    querySuccess (state, { payload: user }) {
      return {
        ...state,
        user,
      }
    },

    switchSider (state) {
      storage({
        key: 'siderFold',
        val: !state.siderFold,
        type: 'set',
      })
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      storage({
        key: 'darkTheme',
        val: !state.darkTheme,
        type: 'set',
      })
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
