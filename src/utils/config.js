const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

module.exports = {
  name: '国际快递后台管理系统',
  prefix: '国际快递后台',
  footerText: '国际快递 后台 © 2017 圈嘀科技',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    user: `${APIV1}/user/:id`,
    wxuser: `${APIV1}/wxuser/:id`,
    wxusers: `${APIV1}/wxusers`,
    order: `${APIV1}/order/:id`,
    orders: `${APIV1}/orders`,
    dashboard: `${APIV1}/dashboard`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
