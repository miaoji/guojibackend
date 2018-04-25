let user = window.localStorage.guojipc_user
user = user ? JSON.parse(window.localStorage.guojipc_user) : ''
module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: '主页',
    router: '/dashboard',
  }, {
    id: 2,
    bpid: 1,
    name: '微信用户',
    icon: 'message',
    router: '/wxuser',
  }, {
    id: 10,
    bpid: 1,
    mpid: user.userName === 'admin' ? 0 : -1,
    name: '登陆用户管理',
    icon: 'user',
    router: '/userinfo',
  }, {
    id: 3,
    bpid: 1,
    name: '订单管理',
    icon: 'tags-o',
  }, {
    id: 31,
    bpid: 1,
    mpid: 3,
    name: '直邮订单管理',
    icon: 'tag',
    router: '/order',
  }, {
    id: 311,
    bpid: 31,
    mpid: -1,
    name: '订单轨迹管理',
    router: '/locus',
  }, {
    id: 32,
    bpid: 1,
    mpid: 3,
    name: '集运批次管理',
    icon: 'tags',
    router: '/cargo',
  }, {
    id: 33,
    bpid: 32,
    mpid: -1,
    name: '集运订单管理',
    router: '/cargodetail',
  }, {
    id: 34,
    bpid: 33,
    mpid: -1,
    name: '集运订单详情明细',
    router: '/cargodetailInfo',
  }, {
    id: 311,
    bpid: 31,
    mpid: -1,
    name: '订单详情',
    router: '/orderdetail',
  }, {
    id: 4,
    bpid: 1,
    name: '类型管理',
    icon: 'setting',
  }, {
    id: 41,
    bpid: 1,
    mpid: 4,
    name: '目的地国家管理',
    icon: 'flag',
    router: '/destination',
  }, {
    id: 411,
    bpid: 41,
    mpid: -1,
    name: '省份',
    router: '/province',
  }, {
    id: 412,
    bpid: 411,
    mpid: -1,
    name: '市级',
    router: '/city',
  }, {
    id: 413,
    bpid: 412,
    mpid: -1,
    name: '县区',
    router: '/county',
  }, {
    id: 42,
    bpid: 1,
    mpid: 4,
    name: '包裹类型管理',
    icon: 'gift',
    router: '/parceltype',
  }, {
    id: 43,
    bpid: 1,
    mpid: 4,
    name: '产品类型管理',
    icon: 'filter',
    router: '/product',
  }, {
    id: 44,
    bpid: 1,
    mpid: 4,
    name: '运费',
    icon: 'pay-circle-o',
    router: '/freight',
  }, {
    id: 45,
    bpid: 1,
    mpid: 4,
    name: '中转地址管理',
    icon: 'fork',
    router: '/transfer',
  }, {
    id: 5,
    bpid: 1,
    name: '补价管理',
    icon: 'api',
    router: '/boot',
  }, {
    id: 52,
    bpid: 5,
    mpid: -1,
    name: '补价详情',
    router: '/bootdetail',
  }, {
    id: 6,
    name: '推广管理',
    icon: 'bars',
  }, {
    id: 61,
    bpid: 1,
    mpid: 6,
    name: '二维码推广',
    icon: 'qrcode',
    router: '/qr',
  }, {
    id: 62,
    bpid: 1,
    mpid: 6,
    name: 'APP推广管理',
    icon: 'tablet',
    router: '/extensionapp',
  }, {
    id: 61,
    bpid: 61,
    mpid: -1,
    name: '二维码图片',
    router: '/qrdetail',
  }, {
    id: 63,
    bpid: 61,
    mpid: -1,
    name: '微信用户详情',
    router: '/wxuserdetail',
  }, {
    id: 7,
    name: '微信配置',
    icon: 'api',
  }, {
    id: 71,
    bpid: 1,
    mpid: 7,
    name: '微信回复配置',
    icon: 'setting',
    router: '/wxconfig',
  }, {
    id: 72,
    bpid: 1,
    mpid: 7,
    name: '微信菜单配置',
    icon: 'setting',
    router: '/wxmenu',
  }, {
    id: 74,
    bpid: 1,
    mpid: 7,
    name: '微信营销配置',
    icon: 'setting',
    router: '/marketing',
  }, {
    id: 73,
    bpid: 72,
    mpid: -1,
    name: '微信子菜单配置',
    router: '/wxmenudetail',
  },
  {
    id: 8,
    name: '营销管理',
    icon: 'api',
  }, {
    id: 81,
    bpid: 1,
    mpid: 8,
    name: '等级配置',
    icon: 'setting',
    router: '/grade',
  }, {
    id: 82,
    bpid: 1,
    mpid: 8,
    name: '用户管理',
    icon: 'setting',
    router: '/spreaduser',
  }, {
    id: 86,
    bpid: 1,
    mpid: 8,
    name: '提现审核',
    icon: 'setting',
    router: '/audit',
  }, {
    id: 83,
    bpid: 1,
    mpid: -1,
    name: '分销管理',
    icon: 'setting',
    router: '/sale',
  },
  {
    id: 84,
    bpid: 82,
    mpid: -1,
    name: '二维码图片',
    router: '/spreadqr'
  }, {
    id: 85,
    bpid: 82,
    mpid: -1,
    name: '用户详情',
    router: '/spreaduserlist'
  },
]
