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
        }, {
          path: 'order',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order'))
              cb(null, require('./routes/order/'))
            }, 'order')
          },
        }, {
          path: 'orderdetail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order/detail'))
              cb(null, require('./routes/order/detail'))
            }, 'orderdetail')
          },
        }, {
          path: 'cargo',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/cargo'))
              cb(null, require('./routes/cargo/'))
            }, 'cargo')
          },
        }, {
          path: 'cargodetail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/cargodetail'))
              cb(null, require('./routes/cargodetail/'))
            }, 'cargodetail')
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
          path: 'bootdetail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/boot/detail'))
              cb(null, require('./routes/boot/detail'))
            }, 'boot-detail')
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
          path: 'province',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/destination/province'))
              cb(null, require('./routes/destination/province'))
            }, 'province')
          },
        },{
          path: 'city',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/destination/city'))
              cb(null, require('./routes/destination/city'))
            }, 'city')
          },
        },
        {
          path: 'county',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/destination/county'))
              cb(null, require('./routes/destination/county'))
            }, 'county')
          },
        },
        {
          path: 'freight',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/freight'))
              cb(null, require('./routes/freight/'))
            }, 'freight')
          },
        },{
          path: 'transfer',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/transfer'))
              cb(null, require('./routes/transfer/'))
            }, 'transfer')
          },
        },{
          path: 'qr',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/qr'))
              cb(null, require('./routes/qr/'))
            }, 'qr')
          }
        },{
          path: 'extensionapp',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/extensionapp'))
              cb(null, require('./routes/extensionapp/'))
            }, 'extensionapp')
          }
        },{
          path: 'qrdetail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/qr/detail'))
              cb(null, require('./routes/qr/detail'))
            }, 'qr-detail')
          }
        },{
          path: 'wxuserdetail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxuser'))
              cb(null, require('./routes/wxuser'))
            }, 'qr-wxuserdetail')
          }
        },{
          path: 'producefreight',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/producefreight'))
              cb(null, require('./routes/producefreight/'))
            }, 'producefreight')
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
          path: 'wxconfig',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxconfig'))
              cb(null, require('./routes/wxconfig/'))
            }, 'wxconfig')
          },
        },{
          path: 'wxmenu',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxmenu'))
              cb(null, require('./routes/wxmenu/'))
            }, 'wxmenu')
          },
        },{
          path: 'marketing',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/marketing'))
              cb(null, require('./routes/marketing/'))
            }, 'marketing')
          },
        },{
          path: 'wxmenudetail',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wxmenu/wxmenudetail'))
              cb(null, require('./routes/wxmenu/wxmenudetail/'))
            }, 'wxmenudetail')
          },
        },{
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ]
    }
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
