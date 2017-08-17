const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = 'http://api.didalive.net/DHL'
const APIV4 = 'http://192.168.0.225:8080/DHL/Internationalprice'

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
		userLogin: `${APIV3}/login`,         
//		userLogin: `${APIV1}/user/login`,         
		userLogout: `${APIV1}/user/logout`,
		userInfo: `${APIV1}/userInfo`,
		users: `${APIV1}/users`,
		user: `${APIV1}/user/:id`,
		wxuser: `${APIV1}/wxuser/:id`,
		wxusers: `${APIV1}/wxusers`,
		order: `${APIV1}/order/:id`,
		orders: `${APIV1}/orders`,//全部订单
		
		ztorder: `${APIV1}/ztorder/:id`,
		ztorders: `${APIV1}/ztorders`,//中通订单
		
		fpxorder: `${APIV1}/fpxorder/:id`,
		fpxorders: `${APIV1}/fpxorders`,//4PX订单
		
		success: `${APIV1}/success`,
		successs: `${APIV1}/successs`,//已完成订单
		
		demo: `${APIV1}/demo/:id`,
		demos: `${APIV1}/demos`,//测试
		
		parceltype: `${APIV1}/parceltype/:id`,//包裹类型管理
		parceltypes: `${APIV1}/parceltypes`,//包裹类型管理
		
		product: `${APIV1}/product/:id`,
		products: `${APIV1}/products`,//产品类型管理
		
		destination: `${APIV1}/destination/:id`,//目的地管理
		destinations: `${APIV1}/destinations`,//目的地管理
		
//		freights: `${APIV1}/freights`,//运费管理
		freights: `${APIV4}/ShowInternational`,//运费管理
		freightadd: `${APIV4}/InsertInternationalprice`,//新增运费管理
		freightup: `${APIV4}/UpadteInternationalprice`,//新增运费管理
		
		producefreights: `${APIV1}/producefreights`,//生产运费管理
		
		dashboard: `${APIV1}/dashboard`,
		v1test: `${APIV1}/test`,
		v2test: `${APIV2}/test`,
	},
}