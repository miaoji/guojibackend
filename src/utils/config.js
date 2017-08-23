const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
let APIV3 = ''
// 线上
// APIV3 = 'http://api.didalive.net/DHL'
// 仝舟
// APIV3 = 'http://192.168.0.127:8066'
// 董浩伟
APIV3 = 'http://192.168.0.225:8080/DHL'

// 生产环境时api固定为线上url
if (process.env.NODE_ENV !== 'development') {
	APIV3 = 'http://api.didalive.net/DHL'
}

module.exports = {
	name: '国际快递后台管理系统',
	prefix: '国际快递后台',
	localPrefix: 'guojipc_',
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
		userLogout: `${APIV1}/user/logout`,
		userInfo: `${APIV1}/userInfo`,
		users: `${APIV1}/users`,
		user: `${APIV1}/user/:id`,
		wxuser: `${APIV1}/wxuser/:id`,
		wxusers: `${APIV1}/wxusers`,
		order: `${APIV1}/order/:id`,
		addOrder: `${APIV3}/wx/OrderInfo/addOrderInfo`,//创建订单
		orders: `${APIV3}/wx/OrderInfo/getOrderInfo`,//全部订单
		updateOrder: `${APIV3}/wx/OrderInfo/modOrderInfo`,// 根据id更新订单
		modOrder: `${APIV3}/wx/OrderInfo/modOrderById`,// 根据id更新订单 仝周
		
		boot: `${APIV3}/wx/boot/getBootInfo`,// 根据单号查询差价信息
		boots: `${APIV3}/wx/boot/getBootAll`,// 查询所有差价(补价)信息
		addBoot: `${APIV3}/wx/boot/addBoot`,// 新增差价(补价)信息
		updateBoot: `${APIV3}/wx/boot/modBoot`,// 更新差价(补价)信息

		ztorder: `${APIV1}/ztorder/:id`,
		ztorders: `${APIV1}/ztorders`,//中通订单
		createZtorder: `${APIV3}/wx/order/createOrder`,// 新增中通订单
		
		fpxorder: `${APIV1}/fpxorder/:id`,
		fpxorders: `${APIV1}/fpxorders`,//4PX订单
		
		success: `${APIV1}/success`,
		successs: `${APIV1}/successs`,//已完成订单
		
		demo: `${APIV1}/demo/:id`,
		demos: `${APIV1}/demos`,//测试
		
		//包裹类型管理
		parceltypes: `${APIV3}/wx/PackageType/ShowPackageType`,
		parceltypesadd: `${APIV3}/wx/PackageType/AddPackageType`,
		parceltypesup: `${APIV3}/wx/PackageType/updatePackageType`,
		
		//产品类型管理
		products: `${APIV3}/wx/ProductType/ShowProvince`,
		productadd: `${APIV3}/wx/ProductType/AddPackageType`,
		productup: `${APIV3}/wx/ProductType/updateProductType`,
		
		//目的地管理
		destinations: `${APIV3}/wx/Country/ShowCountry`,
		
		//运费管理
		freights: `${APIV3}/Internationalprice/ShowInternational`,
		freightadd: `${APIV3}/Internationalprice/InsertInternationalprice`,
		freightup: `${APIV3}/Internationalprice/UpadteInternationalprice`,
		
		//生产运费管理
		producefreights: `${APIV1}/producefreights`,
		
		//查看国家
		ShowCountry: `${APIV3}/wx/Country/ShowCountry`,

		//查看省份
		ShowProvinceid: `${APIV3}/wx/Province/ShowProvinceid`,

		//查看市级
		ShowCityid: `${APIV3}/wx/City/ShowCityid`,

		//查看县级
		ShowCountyid: `${APIV3}/wx/County/ShowCountyid`,
		

		//根据国家查询包裹类型
		showPTypeByCounId: `${APIV3}/wx/PackageType/selectPtype`,

		dashboard: `${APIV1}/dashboard`,
		v1test: `${APIV1}/test`,
		v2test: `${APIV2}/test`,

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