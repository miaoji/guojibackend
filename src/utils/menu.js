module.exports = [
  {
    id: 1,
    icon: 'laptop',
    name: '主页',
    router: '/dashboard',
  },
  {
    id: 2,
    bpid: 1,
    name: '微信用户',
    icon: 'message',
    router: '/wxuser',
  },
  {
    id: 21,
    bpid: 2,
    mpid: -1,
    name: '微信用户详细',
    router: '/wxuser/:id'
  },
  {
    id: 3,
    bpid: 1,
    name: '订单',
    icon: 'tags-o',
//  router: '/order',
  },{
    id: 31,
    bpid: 3,
    mpid: 3,
    name: '全部订单',
    icon: 'tags',
    router: '/order',
  },{
    id: 311,
    bpid: 3,
    mpid: -1,
    name: '订单详细',
    router: '/order/:id'
  },{
    id: 32,
    bpid: 3,
    mpid: 3,
    name: '中通订单',
    icon: 'tag-o',
    router: '/ztorder',
  },{
    id: 321,
    bpid: 3,
    mpid: -1,
    name: '中通订单详细',
    router: '/ztorder/:id',
  },{
    id: 33,
    bpid: 3,
    mpid: 3,
    name: '国际订单',
    icon: 'tag',
    router: '/fpxorder',
  },{
    id: 331,
    bpid: 3,
    mpid: -1,
    name: '国际订单',
    router: '/fpxorder/:id',
  },{
    id: 34,
    bpid: 3,
    mpid: 3,
    name: '已完成订单',
    icon: 'tag-o',
    router: '/success',
  },
  {
    id: 4,
    bpid: 1,
    name: '类型管理',
    icon: 'setting',
//  router: '/parceltype',
  },{
    id: 41,
    bpid: 4,
    mpid: 4,
    name: '包裹类型管理',
    icon: 'gift',
    router: '/parceltype',
  },{
    id: 42,
    bpid: 4,
    mpid: 4,
    name: '产品类型管理',
    icon: 'filter',
    router: '/product',
  },{
    id: 43,
    bpid: 4,
    mpid: 4,
    name: '目的地管理',
    icon: 'api',
    router: '/destination',
  },{
    id: 45,
    bpid: 4,
    mpid: 4,
    name: '生产运费',
    icon: 'pay-circle',
    router: '/producefreight',
  },{
    id: 44,
    bpid: 4,
    mpid: 4,
    name: '运费',
    icon: 'pay-circle-o',
    router: '/freight',
  },{
    id: 46,
    bpid: 4,
    mpid: 4,
    name: '测试用',
    icon: 'api',
    router: '/demo',
  },
]
