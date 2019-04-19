 import { Message } from 'element-ui';
 import router from '../../router'
 export function CurentTime(){
			        var now = new Date();
			        /*显示星期*/
			        let dates=now.getDay();
			        let arr=["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
			        let currs=arr[dates];
			        /*显示时间*/
			        var year = now.getFullYear();       //年
			        var month = now.getMonth() + 1;     //月
			        var day = now.getDate();            //日
			       
			        var hh = now.getHours();            //时
			        var mm = now.getMinutes();          //分
			       var seconds = now.getSeconds() //秒
			        var clock = year + "-";
			       
			        if(month < 10)
			            clock += "0";
			       
			        clock += month + "-";
			       
			        if(day < 10)
			            clock += "0";
			           
			        clock += day + " ";
			       
			        if(hh < 10)
			            clock += "0";
			           
			        clock += hh + ":";
			        if (mm < 10)clock += '0';
			        clock += mm+":"; 
			        
			         if (seconds < 10) clock += '0'; 
			         clock += seconds; 
			        
			        
			        return {clock,currs}
			       // return(clock); 
 } 

   
			


 export function resetColor(x){
 /*（1-绿色 2-灰色3-蓝色 4-黄色 5-红色）*/	
	 let c='';
		switch(x){
		case 1:
		  c="#1bd1a1";
		  break;
		case 2:
		 c="#73777a";
		  break;
		  case 3:
		 c="#0091fe";
		  break;
		  case 4:
		 c="#fef500";
		  break;
		  case 5:
		 c="#9c1428";
		  break;
		
		}
	
   return c
}
 
 export function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
		}
/**
 * 小于10在前面补0
 * @param {Number} num 
 */
export function formatNumber(num){
	return num<10?'0'+num:num
}
/**
 * 格式化时间
 * @param {Date} val 
 */
export function getFormatTime(val){
	let time = new Date(val)
	return time.getFullYear() + '-' + formatNumber(time.getMonth()+1) + '-' + formatNumber(time.getDate()) + ' ' + 
	formatNumber(time.getHours()) + ':' + formatNumber(time.getMinutes()) + ':' + formatNumber(time.getSeconds())
}
export function chart_utis(o){
	
	
	let DeviceType=[]; //一级分类
	let list=[]//运行、停止、等所有数据
	let ch_name=[],ch_value=[],ch_color=[];//一级分类子分类
	for(let Type of o){
		DeviceType.push(Type.DeviceType);
		let chname=[],chvalue=[];
		for(let ch of Type.DataValue){
			list.push(ch.STargetTitle)//运行、停止、等所有数据，方便去除重复值  
			ch_color.push(ch.SColor); //所有色彩数据，方便去除重复值  
			
			chname.push(ch.STargetTitle);
			chvalue.push(ch.STargetValue);
			  
		}
		ch_name.push(chname)
		ch_value.push(chvalue)
		
	}
	//console.log(DeviceType)
	/*去掉色彩重复分类*/
			let colorset=new Set(ch_color)
			let cc=[...colorset],color_change=[];
			for(let c_color of cc){
				color_change.push(resetColor(c_color))
			}
	      
	     //console.log(color_change)
	
	
	let new_name01=new Set(list);
	let new_name02=[...new_name01]//得到去除重复值  ["运行", "停止", "离线"]
	/*
	 var arr=["运行", "离线", "停止"];
	 var arr2=[["运行", "停止"],["运行"],["运行", "离线"],["运行", "停止", "离线"],["运行","停止"],["离线"]];
	 var arr3=[[4,3],[4],[101,10],[1,1,1],[6,5],[3]]
	 */
	
	var arr=new_name02,
	    arr2=ch_name,
	    arr3=ch_value;

/*补位运算*/
	for(let e=0;e<arr.length;e++ ){ 
		for(let i=0;i<arr2.length;i++){
			if(arr2[i].indexOf(arr[e])==-1){
				arr3[i].splice(e,0,0)
				
			}
		}	
	}
	
	
	let arr_ok=[];  //组装成数组
	for(var h=0;h<arr.length;h++){
		let arr_one=[];
		for(let y=0;y<arr3.length;y++){
		   arr_one.push(arr3[y][h])
		}
		arr_ok.push(arr_one)
	}
	 
	
	let series_arr=[];
	for(let yy=0;yy<arr.length;yy++){
		 	let obj_01={type: 'bar',stack: '总量',barWidth: 45,label: {normal: { show: false,position: 'inside'}}}	 	    
		 	    obj_01.name=arr[yy];
		 	    obj_01.data=arr_ok[yy];
		 	    series_arr.push(obj_01)
		 }
	
	/*console.log(DeviceType)
	console.log(arr)
	console.log(series_arr)
	console.log(color_change)
   */	
   
	return {DeviceType,arr,series_arr,color_change}
	
}

 export function ChangeRouterVal(o) {  //匹配原来写好的路由情况
 
 	var arr_new=o
 	var router01=["monitoring","foreshow","DeviceManagement","energy","TaskManagement","Count","SystemManagement"] //一级路由

 	  for(let sh of arr_new){
	 	  if(sh.FFunctionURLAddress=="PredictivePoliceManagement"){ //匹配开发之前定义 好的 预告警管理
	 			sh.FFunctionURLAddress="foreshow"
	 			  if(sh.FChildMenu.length){
	 			  	 for(let pp of sh.FChildMenu){
	 			  	 	if(pp.FFunctionURLAddress=="RealTimeAlarms"){pp.FFunctionURLAddress="now_count"}   //匹配实时告警
	 			  	 	if(pp.FFunctionURLAddress=="HistoricalAlarm"){pp.FFunctionURLAddress="history_count"}//匹配历史告警
	 			  	 	if(pp.FFunctionURLAddress=="AlarmStatistics"){pp.FFunctionURLAddress="foreshow_count"}//匹配历史统计
	 			  	 }	
	 			  }  
	 			}
	 	  if(sh.FFunctionURLAddress=="EnergyManagement"){  //匹配能源管理
	 	  	sh.FFunctionURLAddress="energy"
	 	   }
	 	     
	 	   if(sh.FFunctionURLAddress=="ReportStatistics"){  //报表总计
	 	  	sh.FFunctionURLAddress="Count"
	 	   }
	 	  
 	  
 	  }
    // console.log("11111----->>>")
    // console.log(arr_new)
     
 	 return arr_new
  

}
 
 
 
 export function messageErr(x,message = ''){
 				 	switch(x)	{
 				 		
					case 100:
					  Message('异常错误');
					  break;
					case 101:
					  Message('验证码错误');
					  break;
					case 102:
					  Message('参数错误');
					  break;
                 	case 103:
					  Message('用户名或密码错误');
					  break;
					case 104:
					  Message('令牌错误或超时');
					  localStorage.setItem("Token","");
					  localStorage.setItem("iuserName","");
					  localStorage.setItem("projectid","");
					  localStorage.setItem("projectname","");
					  localStorage.setItem("refresh",1);//用户退出时，刷新登录页面，避免项目定时器ajax继续执行
					  setTimeout(function(){
					  	 router.push('/') //跳至登录页面
					  },1000)
					 
					  break;
					case 105:
					  Message(message);
					  break;
					case 106:
					  Message('上传文件保存失败');
					  break;  
					
					}
 				 
 				

 				 	
					 
 }
