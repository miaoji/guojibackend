const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
let APIV3 = ''

// 重构API
APIV3 = 'http://192.168.1.111:8080/api'

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
		showPTypeByCounId: `${APIV3}/packageType/getPackageTypeByCountry`,
		//根据包裹类型id获取对应的产品类型
		showproductName: `${APIV3}/productType/getProductByPackage`,
		login: {
			accountLogin: `${APIV3}/login`,
			getVerifyImage: `${APIV3}/login/imageCode`,
			getMobileCode: `${APIV3}/login/sendCode`,
			mobileLogin: `${APIV3}/login/loginByCode`
		},
		wxuser: {
			all: `${APIV3}/wxUser/index`,
		},
		order: {
			all: `${APIV3}/wx/OrderInfo/getOrderInfo`,//全部订单
			show: `${APIV1}/order/:id`,
			create: `${APIV3}/wx/OrderInfo/addOrderInfo`,//创建订单
			update: `${APIV3}/wx/OrderInfo/modOrderInfo`,// 根据id更新订单
			mod: `${APIV3}/wx/OrderInfo/modOrderById`,// 根据id更新订单 仝周
			hide: `${APIV3}/wx/OrderInfo/delOrderById`,// 根据id更新订单 仝周
			createChinaOrder: `${APIV3}/wx/order/createOrder`,// 新增国内(中通)订单	
		},
		boot: {
			all: `${APIV3}/closingPrice/index`,// 查询所有差价(补价)信息
			show: `${APIV3}/closingPrice/getByOrderNo`,// 根据单号查询差价信息
			add: `${APIV3}/closingPrice/add`,// 新增差价(补价)信息
			update: `${APIV3}/closingPrice/modClosingPriceById`,// 更新差价(补价)信息
			hide: `${APIV3}/closingPrice/delClosingPriceById`
		},
		//包裹类型管理
		parceltype: {
			all: `${APIV3}/packageType/index`,
			show: `${APIV3}/packageType/getPackageTypeById`,
			create: `${APIV3}/packageType/add`,
			update: `${APIV3}/packageType/modPackageTypeById`,
			hide: `${APIV3}/packageType/delPackageTypeById`
		},
		//产品类型管理
		product: {
			all: `${APIV3}/productType/index`,
			show: `${APIV3}/productType/getProductTypeById`,
			create: `${APIV3}/productType/add`,
			update: `${APIV3}/productType/modProductTypeById`,
			hide: `${APIV3}/productType/delProductTypeById`
		},
		//目的地管理
		destination: {
			all: `${APIV3}/wx/Country/ShowCountry`
		},
		//运费管理
		freight: {
			all: `${APIV3}/intlPrice/index`,
			show: `${APIV3}intlPrice/getIntlPriceById`,
			create: `${APIV3}/intlPrice/add`,
			update: `${APIV3}/intlPrice/modIntlPriceById`,
			hide: `${APIV3}/intlPrice/delIntlPriceById`
		},
    	// 国家api
		country: {
		  show: `${APIV3}/country/index`,
		  create: `${APIV3}/country/add`,
		  update: `${APIV3}/country/modCountryById`,
		  hide: `${APIV3}/country/delCountryById`
		},
		// 省份/州api
		province: {
		  show: `${APIV3}/provinces/index`,
		  create: `${APIV3}/provinces/add`,
		  update: `${APIV3}/provinces/modProvincesById`,
		  hide: `${APIV3}/provinces/delProvincesById`,
		},
		// 市级api
		city: {
		  show: `${APIV3}/cities/index`,
		  create: `${APIV3}/cities/add`,
		  update: `${APIV3}/cities/modCitiesById`,
		  hide: `${APIV3}/cities/delCitiesById`,
		},
		// 区县api
		county: {
		  show: `${APIV3}/districts/index`,
		  create: `${APIV3}/districts/add`,
		  update: `${APIV3}/districts/modDistrictsById`,
		  hide: `${APIV3}/districts/delDistrictsById`,
		},
		// 二维码推广接口
		qr: {
	      create: `${APIV3}/wx/createQr`,
	      all: `${APIV3}/wx/getQrAll`,
	      show: `${APIV3}/wx/selectQrById`,
	      update: `${APIV3}/wx/updateQrById`,
	      del: `${APIV3}/wx/delQrById`
		}
	},
}