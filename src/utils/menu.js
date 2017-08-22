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
    router: '/order',
  },{
    id: 31,
    bpid: 3,
    mpid: -1,
    name: '补价详细',
    router: '/orderboot/:id'
  },{
    id: 4,
    bpid: 1,
    name: '类型管理',
    icon: 'setting',
  },{
    id: 41,
    bpid: 4,
    mpid: 4,
    name: '目的地管理',
    icon: 'api',
    router: '/destination',
  },{
    id: 42,
    bpid: 4,
    mpid: 4,
    name: '包裹类型管理',
    icon: 'gift',
    router: '/parceltype',
  },{
    id: 43,
    bpid: 4,
    mpid: 4,
    name: '产品类型管理',
    icon: 'filter',
    router: '/product',
  },{
    id: 44,
    bpid: 4,
    mpid: 4,
    name: '运费',
    icon: 'pay-circle-o',
    router: '/freight',
  },/*{
    id: 45,
    bpid: 4,
    mpid: 4,
    name: '生产运费',
    icon: 'pay-circle',
    router: '/producefreight',
  },{
    id: 46,
    bpid: 4,
    mpid: 4,
    name: '测试用',
    icon: 'api',
    router: '/demo',
  },*/{
    id: 5,
    bpid: 1,
    name: '补价管理',
    icon: 'api',
    router: '/boot',
  }, {
    id: 51,
    bpid: 5,
    mpid: -1,
    name: '补价详情',
    router: '/boot/:id',
  },
]
