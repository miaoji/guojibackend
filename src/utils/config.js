const APIV1 = '/api/v1'
// const APIV2 = '/api/v2'
let APIV3 = ''

// 重构API
// 线下地址
// APIV3 = 'http://192.168.231.239:8077'
// 线上地址(测试)
// APIV3 = 'http://api.didalive.net/mzkd'
// 正式地址(生产)
APIV3 = 'http://api.mingz-tech.com'
// APIV3 = 'http://192.168.231.237:8080'

// 生产环境时api固定为线上url
if (process.env.NODE_ENV !== 'development') {
  APIV3 = 'http://api.mingz-tech.com'
  // APIV3 = 'http://api.didalive.net/mzkd'
}

module.exports = {
  name: '国际快递后台管理系统',
  prefix: '国际快递后台',
  localPrefix: 'guojipc_',
  footerText: '国际快递 后台 © 2017 明彰科技',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    dashboard: {
      all: `${APIV1}/dashboard`,
      line: `${APIV3}/api/orderInfo/getOrderCount`
    },
    // 根据国家查询包裹类型
    showPTypeByCounId: `${APIV3}/api/packageType/getPackageTypeByCountry`,
    // 根据包裹类型id获取对应的产品类型
    showproductName: `${APIV3}/api/productType/getProductByPackage`,
    login: {
      accountLogin: `${APIV3}/login`,
      getVerifyImage: `${APIV3}/login/imageCode`,
      getMobileCode: `${APIV3}/login/sendCode`,
      mobileLogin: `${APIV3}/login/loginByCode`
    },
    wxuser: {
      all: `${APIV3}/api/wxUser/index`, // 查询所有微信用户
      update: `${APIV3}/api/wxUser/modWxUserById`
    },
    order: {
      all: `${APIV3}/api/orderInfo/index`, // 全部订单
      show: `${APIV1}/order/:id`,
      add: `${APIV3}/api/orderInfo/add`, // 直邮订单的创建
      create: `${APIV3}/api/orderInfo/addCargo`, // 创建订单
      update: `${APIV3}/wx/OrderInfo/modOrderInfo`, // 根据id更新订单
      mod: `${APIV3}/api/orderInfo/modOrderInfoById`, // 根据id更新订单 仝周
      modIntlNoById: `${APIV3}/api/orderInfo/modIntlNoById`, // 添加国际快递信息
      hide: `${APIV3}/api/orderInfo/delOrderInfoById`, // 根据id更新订单 仝周
      createChinaOrder: `${APIV3}/api/order/createOrder`, // 新增国内(中通)订单
      getKdCompany: `${APIV3}/api/kdCompany/index`, // 动态获取国际段快递公司
      getOrderInfo: `${APIV3}/api/orderInfo/getOrderDetailByOrderNo`, // 根据订单号查询订单详细信息,用户微信信息,包裹信息
      getOrderInfoByOrderNo: `${APIV3}/api/orderInfo/getOrderInfoByOrderNo`, // 根据订单号查询快件信息
      queryByCompany: `${APIV3}/api/order/queryByCompany`, // 根据快件信息查询快递信息
      getOrderInfoById: `${APIV3}/api/orderInfo/getOrderInfoById`, // 根据订单Id查询订单信息
      getIntlPrice: `${APIV3}/api/intlPrice/getIntlPrice` // 根据对应参数查询预付款金额
    },
    boot: {
      all: `${APIV3}/api/closingPrice/index`, // 查询所有差价(补价)信息
      show: `${APIV3}/api/closingPrice/getByOrderNo`, // 根据单号查询差价信息
      add: `${APIV3}/api/closingPrice/add`, // 新增差价(补价)信息
      update: `${APIV3}/api/closingPrice/modClosingPriceById`, // 更新差价(补价)信息
      hide: `${APIV3}/api/closingPrice/delClosingPriceById`
    },
    transfer: {
      all: `${APIV3}/api/transfer/index`,
      create: `${APIV3}/api/transfer/add`,
      update: `${APIV3}/api/transfer/modTransferById`,
      hide: `${APIV3}/api/transfer/delTransferById`
    },
    // 包裹类型管理
    parceltype: {
      all: `${APIV3}/api/packageType/index`,
      show: `${APIV3}/api/packageType/getPackageTypeById`,
      create: `${APIV3}/api/packageType/add`,
      update: `${APIV3}/api/packageType/modPackageTypeById`,
      hide: `${APIV3}/api/packageType/delPackageTypeById`
    },
    // 产品类型管理
    product: {
      all: `${APIV3}/api/productType/index`,
      show: `${APIV3}/api/productType/getProductTypeById`,
      create: `${APIV3}/api/productType/add`,
      update: `${APIV3}/api/productType/modProductTypeById`,
      hide: `${APIV3}/api/productType/delProductTypeById`
    },
    // 目的地管理
    destination: {
      all: `${APIV3}/wx/Country/ShowCountry`
    },
    // 运费管理
    freight: {
      all: `${APIV3}/api/intlPrice/index`,
      show: `${APIV3}/api/intlPrice/getIntlPriceById`,
      create: `${APIV3}/api/intlPrice/add`,
      update: `${APIV3}/api/intlPrice/modIntlPriceById`,
      hide: `${APIV3}/api/intlPrice/delIntlPriceById`
    },
    // 国家api
    country: {
      show: `${APIV3}/api/country/index`,
      create: `${APIV3}/api/country/add`,
      update: `${APIV3}/api/country/modCountryById`,
      hide: `${APIV3}/api/country/delCountryById`,
      getCountryId: `${APIV3}/api/country/getCountryIdByName` // 通过国家名称获取国家id
    },
    // 省份/州api
    province: {
      show: `${APIV3}/api/provinces/index`,
      create: `${APIV3}/api/provinces/add`,
      update: `${APIV3}/api/provinces/modProvincesById`,
      hide: `${APIV3}/api/provinces/delProvincesById`
    },
    // 市级api
    city: {
      show: `${APIV3}/api/cities/index`,
      create: `${APIV3}/api/cities/add`,
      update: `${APIV3}/api/cities/modCitiesById`,
      hide: `${APIV3}/api/cities/delCitiesById`
    },
    // 区县api
    county: {
      show: `${APIV3}/api/districts/index`,
      create: `${APIV3}/api/districts/add`,
      update: `${APIV3}/api/districts/modDistrictsById`,
      hide: `${APIV3}/api/districts/delDistrictsById`
    },
    // 二维码推广接口
    qr: {
      all: `${APIV3}/api/qr/getQrAll`,
      show: `${APIV3}/wx/selectQrById`,
      create: `${APIV3}/api/qr/createQr`,
      update: `${APIV3}/api/qr/modWxQrById`,
      del: `${APIV3}/api/qr/delWxQrById`
    },
    // app推广接口
    extensionapp: {
      all: `${APIV3}/api/app/index`,
      show: `${APIV3}/api/app/getWxAppById`,
      create: `${APIV3}/api/app/add`,
      update: `${APIV3}/api/app/modWxAppById`,
      hide: `${APIV3}/api/app/delById`
    },
    // 微信回复配置
    wxconfig: {
      all: `${APIV3}/api/reply/index`,
      create: `${APIV3}/api/reply/add`,
      update: `${APIV3}/api/reply/modWxReplyById`,
      hide: `${APIV3}/api/reply/delWxReplyById`
    },
    // 微信回复配置
    wxmenu: {
      all: `${APIV3}/api/wxMenu/index`,
      create: `${APIV3}/api/wxMenu/add`,
      update: `${APIV3}/api/wxMenu/modWxMenuById`,
      hide: `${APIV3}/api/wxMenu/delWxMenuById`,
      setmenu: `${APIV3}/api/wxMenu/setMenu`
    },
    marketing: {
      setmenu: `${APIV3}/api/wxCoupon/sendCouponAll`
    },
    // 集运订单
    cargo: {
      all: `${APIV3}/api/orderInfo/listBatch`
    },
    // 集运订单详情页
    cargodetail: {
      all: `${APIV3}/api/orderInfo/listCargoOrder`, // 查询订单
      merge: `${APIV3}/api/orderInfo/mergeCargo`, // 合并订单
      cancel: `${APIV3}/api/orderInfo/cancelMergeCargo`, // 撤销合并订单
      setFreight: `${APIV3}/api/orderInfo/sendPayRemindMsg`, // 设置集运运费价格
      shelf: `${APIV3}/api/orderInfo/getShelfCount` // 根据货架号查询该货架上的订单量
    },
    // 推广等级配置
    grade: {
      all: `${APIV3}/api/spreadLevel/index`, // 查询
      create: `${APIV3}/api/spreadLevel/add`, // 新增
      update: `${APIV3}/api/spreadLevel/modById`, // 修改
      hide: `${APIV3}/api/spreadLevel/delById` // 删除
    },
    // 推广用户管理
    spreaduser: {
      all: `${APIV3}/api/spreadUser/index`, // 查询
      create: `${APIV3}/api/spreadUser/add`, // 新增
      update: `${APIV3}/api/spreadUser/modById`, // 修改
      hide: `${APIV3}/api/quartz/pauseJob`, // 暂停通知
      // hide: `${APIV3}/api/spreadUser/delById`, // 删除
      setPushTime: `${APIV3}/api/quartz/modQuartzTrigger` // 设置推送时间
    },
    // 推广用户列表
    spreaduserlist: {
      all: `${APIV3}/api/spreadUser/getSpreadGroupUser`
    },
    // 提现审核
    audit: {
      all: `${APIV3}/api/withdrawalsRecord/index`,
      // update: `${APIV3}/api/withdrawalsRecord/modById`,
      // refuse: `${APIV3}/api/withdrawalsRecord/dealWithdrawals`
      update: `${APIV3}/api/withdrawalsRecord/dealWithdrawals`
    },
    // 路由轨迹的增删改查
    locus: {
      all: `${APIV3}/api/route/getByOrderId`,
      create: `${APIV3}/api/route/add`,
      update: `${APIV3}/api/route/modById`,
      hide: `${APIV3}/api/route/delById`,
    },

    // websockt
    websockt: 'ws://api.mingz-tech.com/webSocket/',

    // 登陆用户管理
    userinfo: {
      all: `${APIV3}/api/userInfo/index`,
      create: `${APIV3}/api/userInfo/add`,
      update: `${APIV3}/api/userInfo/modUserInfoById`,
      hide: `${APIV3}/api/userInfo/delUserInfoById`,
    }
  }
}
