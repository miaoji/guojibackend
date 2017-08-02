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
    icon: 'copy',
    router: '/order',
  },
  {
    id: 31,
    bpid: 3,
    mpid: -1,
    name: '订单详细',
    router: '/order/:id'
  }
]
