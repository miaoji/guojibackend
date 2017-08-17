import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/dashboard'))
          cb(null, { component: require('./routes/dashboard/') })
        }, 'dashboard')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        },{
          path: 'wxuser',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxuser'))
              cb(null, require('./routes/wxuser/'))
            }, 'wxuser')
          },
        },{
          path: 'wxuser/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxuser/detail'))
              cb(null, require('./routes/wxuser/detail/'))
            }, 'wxuser-detail')
          },
        }, {
          path: 'order',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order'))
              cb(null, require('./routes/order/'))
            }, 'order')
          },
        },{
          path: 'order/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order/detail'))
              cb(null, require('./routes/order/detail/'))
            }, 'order-detail')
          },
        }, {
          path: 'boot',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/boot'))
              cb(null, require('./routes/boot/'))
            }, 'boot')
          },
        }, {
          path: 'demo',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/demo'))
              cb(null, require('./routes/demo/'))
            }, 'demo')
          },
        },{
          path: 'ztorder',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/ztorder'))
              cb(null, require('./routes/ztorder/'))
            }, 'ztorder')
          },
        },{
          path: 'fpxorder',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/fpxorder'))
              cb(null, require('./routes/fpxorder/'))
            }, 'fpxorder')
          },
        },{
          path: 'parceltype',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/parceltype'))
              cb(null, require('./routes/parceltype/'))
            }, 'parceltype')
          },
        },{
          path: 'product',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/product'))
              cb(null, require('./routes/product/'))
            }, 'product')
          },
        },{
          path: 'destination',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/destination'))
              cb(null, require('./routes/destination/'))
            }, 'destination')
          },
        },{
          path: 'freight',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/freight'))
              cb(null, require('./routes/freight/'))
            }, 'freight')
          },
        },{
          path: 'producefreight',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/producefreight'))
              cb(null, require('./routes/producefreight/'))
            }, 'producefreight')
          },
        },{
          path: 'success',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/success'))
              cb(null, require('./routes/success/'))
            }, 'success')
          },
        },{
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        },{
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
