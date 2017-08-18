//函数需要传入两个参数 第一个将 数组中存放 时间戳的字段 以字符串的形式传入	
//第二个参数传入的是 字段所在的数组
	
export const formatTime = function (val) {
	if (val == null || val == '') {
		return '未知时间'
	} else {
      	let date = new Date(parseInt(val))
      	let y = date.getFullYear()
            let m = date.getMonth() + 1
            let d = date.getDate()
            let h = date.getHours()
            let mm = date.getMinutes()
            let s = date.getSeconds()
            return (y+"/"+m+"/"+d+" "+h+":"+mm+":"+s)
	}

}
