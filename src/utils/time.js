//函数需要传入两个参数 第一个将 数组中存放 时间戳的字段 以字符串的形式传入	
//第二个参数传入的是 字段所在的数组
	
//export function gettimes(oTimes,data){
//	for (let item in data) {
//		if (data[item][oTimes] == null || data[item][oTimes] == "") {
//			data[item][oTimes] = "未知时间"
//		} else {
//    		let date = new Date(parseInt(data[item][oTimes]));
//    		let y = date.getFullYear();
//                let m = date.getMonth() + 1;
//                let d = date.getDate();
//                let h = date.getHours();
//                let mm = date.getMinutes();
//                let s = date.getSeconds();
//                data[item][oTimes]=(y+"/"+m+"/"+d+" "+h+":"+mm+":"+s);
//		}
//	}
//}

export function gettimes(oTimes){
	if (oTimes == null || oTimes == "" || oTimes.toString().length < 11) {
		oTimes = "未知时间"
	} else {
  		let date = new Date(parseInt(oTimes));
  		let y = date.getFullYear();
              let m = date.getMonth() + 1;
              let d = date.getDate();
              let h = date.getHours();
              let mm = date.getMinutes();
              let s = date.getSeconds();
             return oTimes = (y+"/"+m+"/"+d+" "+h+":"+mm+":"+s);
	}
}

//export function gettimes(data){
//	for (let item in data) {
//    		if(data[item].createtime==null||data[item].createtime==""){
//    			data[item]['createtime']="未知时间"
//    		}else{
//    			let date=new Date(parseInt(data[item].createtime));
//						let y = date.getFullYear();
//          let m = date.getMonth() + 1;
//          let d = date.getDate();
//          let h = date.getHours();
//          let mm = date.getMinutes();
//          let s = date.getSeconds();
//          data[item]['createtime']=(y+"/"+m+"/"+d+" "+h+":"+mm+":"+s);
//    		}
//    	}
//}

//    	for (let item in data) {
//    		if(data[item].createtime==null||data[item].createtime==""){
//    			data[item]['createtime']="未知时间"
//    		}else{
//    			let date=new Date(parseInt(data[item].createtime));
//						let y = date.getFullYear();
//          let m = date.getMonth() + 1;
//          let d = date.getDate();
//          let h = date.getHours();
//          let mm = date.getMinutes();
//          let s = date.getSeconds();
//          data[item]['createtime']=(y+"/"+m+"/"+d+" "+h+":"+mm+":"+s);
//    		}
//    	}