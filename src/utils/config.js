const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
let APIV3 = ''

// 重构API
// 线下地址
APIV3 = 'http://192.168.1.112:8080'
// 线上地址
// APIV3 = 'http://api.didalive.net'


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
		dashboard: `${APIV1}/dashboard`,
		//根据国家查询包裹类型
		showPTypeByCounId: `${APIV3}/api/packageType/getPackageTypeByCountry`,
		//根据包裹类型id获取对应的产品类型
		showproductName: `${APIV3}/api/productType/getProductByPackage`,
		login: {
			accountLogin: `${APIV3}/login`,
			getVerifyImage: `${APIV3}/login/imageCode`,
			getMobileCode: `${APIV3}/login/sendCode`,
			mobileLogin: `${APIV3}/login/loginByCode`
		},
		wxuser: {
			all: `${APIV3}/api/wxUser/index`,
			update: `${APIV3}/api/wxUser/modWxUserById`,
		},
		order: {
			all: `${APIV3}/api/orderInfo/index`,//全部订单
			show: `${APIV1}/order/:id`,
			create: `${APIV3}/wx/OrderInfo/addOrderInfo`,//创建订单
			update: `${APIV3}/wx/OrderInfo/modOrderInfo`,// 根据id更新订单
			mod: `${APIV3}/api/orderInfo/modOrderInfoById`,// 根据id更新订单 仝周
			hide: `${APIV3}/api/orderInfo/delOrderInfoById`,// 根据id更新订单 仝周
			createChinaOrder: `${APIV3}/api/order/createOrder`,// 新增国内(中通)订单	
		},
		boot: {
			all: `${APIV3}/api/closingPrice/index`,// 查询所有差价(补价)信息
			show: `${APIV3}/api/closingPrice/getByOrderNo`,// 根据单号查询差价信息
			add: `${APIV3}/api/closingPrice/add`,// 新增差价(补价)信息
			update: `${APIV3}/api/closingPrice/modClosingPriceById`,// 更新差价(补价)信息
			hide: `${APIV3}/api/closingPrice/delClosingPriceById`
		},
		//包裹类型管理
		parceltype: {
			all: `${APIV3}/api/packageType/index`,
			show: `${APIV3}/api/packageType/getPackageTypeById`,
			create: `${APIV3}/api/packageType/add`,
			update: `${APIV3}/api/packageType/modPackageTypeById`,
			hide: `${APIV3}/api/packageType/delPackageTypeById`,
		},
		//产品类型管理
		product: {
			all: `${APIV3}/api/productType/index`,
			show: `${APIV3}/api/productType/getProductTypeById`,
			create: `${APIV3}/api/productType/add`,
			update: `${APIV3}/api/productType/modProductTypeById`,
			hide: `${APIV3}/api/productType/delProductTypeById`
		},
		//目的地管理
		destination: {
			all: `${APIV3}/wx/Country/ShowCountry`
		},
		//运费管理
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
		  getCountryId: `${APIV3}/api/country/getCountryIdByName`,// 通过国家名称获取国家id
		},
		// 省份/州api
		province: {
		  show: `${APIV3}/api/provinces/index`,
		  create: `${APIV3}/api/provinces/add`,
		  update: `${APIV3}/api/provinces/modProvincesById`,
		  hide: `${APIV3}/api/provinces/delProvincesById`,
		},
		// 市级api
		city: {
		  show: `${APIV3}/api/cities/index`,
		  create: `${APIV3}/api/cities/add`,
		  update: `${APIV3}/api/cities/modCitiesById`,
		  hide: `${APIV3}/api/cities/delCitiesById`,
		},
		// 区县api
		county: {
		  show: `${APIV3}/api/districts/index`,
		  create: `${APIV3}/api/districts/add`,
		  update: `${APIV3}/api/districts/modDistrictsById`,
		  hide: `${APIV3}/api/districts/delDistrictsById`,
		},
		// 二维码推广接口
		qr: {
	      all: `${APIV3}/api/qr/getQrAll`,
	      show: `${APIV3}/wx/selectQrById`,
	      create: `${APIV3}/api/qr/createQr`,
	      update: `${APIV3}/api/qr/modWxQrById`,
	      del: `${APIV3}/api/qr/delWxQrById`
		}
	},
}