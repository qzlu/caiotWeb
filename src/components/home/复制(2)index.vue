<template>
  <div class="home">

  	<audio class="success" id="music"  loop="loop" src="/static/mp3/new_warn.mp3"></audio>
  	
		<div class="homme_center">
    <div class="header_item">
			   <div class="list_a">
					 
					 <!--  notice-->
					 <section class="notice_items" :class="addclass" id="tuhn_pin">
						  <p style="margin-top: 2px;"><span ><img src="/static/image/index/nav_red_a.png" class="up_di"> </span>
						  	<span id="gh_warn_gh"></span>
						  	<img src="/static/image/index/warn45.png" :class="{'active01':is_li==1}" @click="play_warn_hg('stop')" class="prngy r ingb_gh_a" style="margin: 5px 10px 0 0;"> 
						    <img src="/static/image/index/wrb02.png":class="{'active01':is_li==0}" @click="play_warn_hg('play')" class="prngy r ingb_gh_b" style="margin: 2px 10px 0 0;"> 
						  	<span style="font-size: 14px; float: right; margin: 0px 10px 0 0;"> {{datalist.length}}条告警 </span> &nbsp;&nbsp;
						  </p>
						 <div class="er_message" id="tuhn_tnh">
						 	<div class="errMessage_list" >
						    <div class="cc rowup" id="pin_wanr">
						        <div class="item" v-for="(items,key) in datalist">
						        	<div> <p class="l">{{items.AlarmText}}</p><p class="r">{{items.AlarmTime}}</p></div>
						        </div>
						        
						       
						    </div>
						</div>
							 
						 </div>
						
					 </section>
					 <!--  notice-->

					 
					 <ul>
						 <router-link :to="{ name: 'monitoring',}">
						 <li  :class="{'active':curr=='monitoring'}"  @click="ichange('monitoring')"><p>					
						 <img src="static/image/nav_new/nav_icon_1.png"></p><h2>实时监测</h2>
						 </li>
						 </router-link>
						 
              <router-link :to="{ name: 'foreshow',}">
						 <li class="e manu_downs" :class="{'active':curr=='foreshow'}" @click="ichange('foreshow')"><p><img src="static/image/nav_new/nav_icon_2.png"></p><h2>预告警管理</h2>
						 	   <div class="dowList01">
										  <div class="ity">实时告警</div>
										  <router-link :to="{ name: 'history_count',}"><div class="ity">历史告警</div></router-link>
										  
										  <router-link :to="{ name: 'foreshow_count',}"><div class="ity">告警统计</div></router-link>
										    <!--<div class="ity">
										    	
											          日常统计<img src="/static/image/energy/selecttype.png"> 
										    </div>	-->		
										</div>
						 	
						 </li>
						 </router-link>
						 
						 <li class="e" :class="{'active':curr==3}" @click="ichange(3)">
             	 <p><img src="static/image/nav_new/nav_icon_3.png"></p><h2>设备管理</h2>
             </li>
						 
              <router-link :to="{ name: 'energy',}">
						     <li class="e" :class="{'active':curr=='energy'}" @click="ichange('energy')"><p><img src="static/image/nav_new/nav_icon_4.png"></p><h2>能源管理</h2></li>
						 </router-link>
						 
						 <li class="e" :class="{'active':curr==5}" @click="ichange(5)">
             	 <p><img src="static/image/nav_new/nav_icon_5.png"></p><h2>任务管理</h2>
             </li>
						 
						 <router-link :to="{ name: 'Count',}">
						 <li class="e manu_downs" :class="{'active':curr=='Count'}" @click="ichange('Count')">
						    	<p><img src="static/image/nav_new/nav_icon_6.png"></p><h2>报表统计</h2>
						    	 <div class="dowList01">
										  <div class="ity">告警统计</div>
										     <div class="ity">
											        日常统计<img src="/static/image/energy/selecttype.png">
											    <section class="dow02">
												   <dl><dd>设备统计</dd><dd>能源统计</dd></dl>
											   </section>
										  </div>			
										</div>
						 </li>
              </router-link>
              
             <li class="e" :class="{'active':curr==4}" @click="ichange(4)">
             	 <p><img src="static/image/nav_new/nav_icon_7.png"></p><h2>系统管理</h2>
             </li>
              
					 </ul>
					 
				 </div>
				 <div class="list_b">
					 <div class="in"></div>
           <div class="name_select">
						 <p><span>{{curr_selectdata}}</span><span style="padding: 11px 5px 0 0; float: right;"><img src="/static/image/index/nav_user_button_nor.png" class="sh01"></span></p>
						 <div class="list_sel">  
								<p v-for="(item,key) in seledata" @click="ccName(item)">{{item.ShortName}}</p>
						 </div>
					 </div>
				 </div>
         <div class="list_c">
					  <div class="inl">
							<p class="u"><img src="/static/image/index/nav_user_icon_1.png "></p>
							<div class="ise">
								<div class="name_select admincc">
									<p><span>{{curr_selectdata02}}</span><span style="padding: 11px 5px 0 0; float: right;"><img src="/static/image/index/nav_user_button_nor.png" class="sh01"></span></p>
									<div class="list_sel" style="top: 62px;">  
										<p v-for="(item,key) in seledata02" @click="ccName_item(item)">{{item}}</p>
										<p @click="all_out()">退出</p>
									</div>
								</div>
								
							</div>
						</div>
				 </div>
				
		</div>
		
		<router-view></router-view>

		
		
    </div>
  </div>
</template>
<style>

</style>
<script>
	var sta=0;//控制报警声，第一次响，关闭后，数据更新，再也不会自动报警。
 export default {
      data() {
        return {
        	is_li:0,
					curr:"monitoring",
					seledata:[],//["新都会","云平台","新都会","云平台","新都会","云平台"],
					curr_selectdata:'',//"新都会",
					seledata02:[localStorage.getItem("iuserName")],//["admin","user","新都会","云平台","新都会","云平台"],
					curr_selectdata02:localStorage.getItem("iuserName"),
					datalist:'', //告警数据列表
					addclass:"",
         }
      },
    
			created(){
				let _this=this;
			  	//console.log(this.$route.path)
			/* 刷新页面，导航保留当着页面高亮 */
				let ref_router=this.$route.path.split("/")[2]
				this.curr=ref_router
				
				/*动态用户一级菜单Banner */
				 	 _this.$axios.post(_this.mypro+'Caiot/System',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"QueryUsersMenu",
						        "FVersion":"1.0.0",
							}).then(function(jsons){
							 	console.log(jsons.data)
								_this.seledata=jsons.data.FObject;
						
								
								
							}).catch(function(err){
							
							});
				
				
				
				
			
				/*取得当前用户所有项目*/
				
				 _this.$axios.post(_this.mypro+'Caiot/Project',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"GetProject",
						        "FVersion":"1.0.0",
							}).then(function(jsons){
								//console.log(jsons.data)
								_this.seledata=jsons.data.FObject;
																
								/*保存当前用户所有项目的第一个项目projectid*/
								var d=localStorage.getItem("projectid");
								
								if(!d){
									localStorage.setItem("projectid",jsons.data.FObject[0].ProjectID);
									localStorage.setItem("projectname",jsons.data.FObject[0].ShortName);
									_this.curr_selectdata=jsons.data.FObject[0].ShortName;
								}else{
									_this.curr_selectdata=localStorage.getItem("projectname")
								}
									/*保存当前用户所有项目的第一个项目projectid*/
								
								
								
							}).catch(function(err){
							
							});
				
				
				
			
			},
			methods: {
				 all_out(){ //退出按钮
				 	localStorage.setItem("Token","");
					localStorage.setItem("iuserName","");
					localStorage.setItem("projectid","");
					localStorage.setItem("projectname","");
					this.$router.push({path: '/', });
				 },
				 getNowFormatDate() { //处理时间2018-10-15 例如
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
	       },
			
				play_warn_hg(x){
					//console.log(x)
					var eles=document.getElementById('tuhn_pin');
					var e=eles.className.indexOf('notice_green');
					 if(e==-1){
					 	var audio = document.getElementById('music');
						if(x=="play"){
							this.is_li=0;
							  audio.play();
						}else if("stop"){	
							this.is_li=1;
							 audio.pause();
						}
					 }

					
	
             
				},
				ichange(x){
					let _this=this;
					setTimeout(function(){
					//	console.log(_this.$route.path)
					},100)					
					this.curr=x;				 
				},	
				ccName(obj){  //设置用户选择的项目id
					localStorage.setItem("projectid",obj.ProjectID);
					localStorage.setItem("projectname",obj.ShortName);
					this.curr_selectdata=obj.ShortName;
					
					location.reload()
					
				},
				ccName_item(x){	
					this.curr_selectdata02=x;
					
				},


         Pro(gettime) {
         	//console.log(gettime)
				 	//红色警告消息列表
				 	let _this=this;
				   //返回一个Promise对象
				   return new Promise(function (resolve, reject) {
				  
				       _this.$axios.post(_this.mypro+'Caiot/Project',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"GetAlarmRealData",
						        "FVersion":"1.0.0",
						        "ProjectID":localStorage.getItem("projectid"),
						        "FDateTime":gettime
							}).then(function(jsons){
								if(jsons.data.Result==104||jsons.data.Result==103){ 
									localStorage.setItem("name","")
									localStorage.setItem("Token","")
								}
								//console.log(jsons.data.FObject)
								_this.datalist=jsons.data.FObject
								if(sta==0){ //开始只响一次，第二次刷新数据也不会响		
									
									if(jsons.data.FObject!=""){
										_this.is=0
										_this.play_warn_hg("play")
									}else{
										_this.is=1
									}
									sta=1
								}
													
								if(jsons){
									_this.datalist=jsons.data.FObject
									resolve("succ")
								} 
														
							}).catch(function(err){
							
							});
				    
				   })
				  
				  },
				
				Pro2() {					
				 	let _this=this;
				   //返回一个Promise对象
				    return new Promise(function (resolve, reject) {
				      
				   })
				   
				 },


				},
				mounted:function(){
					
					
					var curr_time=this.getNowFormatDate()
					let _this=this;
					function settimeouts_warn(){
						
						var html_tem=document.getElementById("pin_wanr").children;
						var len=html_tem.length;
						
						if(len){
							_this.addclass="" 
						   
						}else{
							   setTimeout(function(){
							   	_this.addclass="notice_green";
							   	
							   },100)						  
							//document.getElementById("tuhn_pin").style.backgroundColor="rgb(66, 185, 131)"	
						}
          
           
						var user=localStorage.getItem("iuserName");//用户清空缓存，跳到登录页
						var token=localStorage.getItem("Token");
					//	console.log(user+"--"+token)
						if(!user||!token){
							_this.$router.push({path: '/', });
						}
						
						
						_this.Pro(curr_time).then(function(d){
						  return _this.Pro2(d)
						}).then(function(){
						 
						}).catch(function(err){
						
						})
	
	      }
					
				 settimeouts_warn()
				 setInterval(settimeouts_warn,1000);	
					
					
					
					
					
					
				},
				 computed:{
			 
  }
			
     
    }






</script>
<style>
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*报表总计下拉*/
.home ul li.manu_downs { position: relative; }
.home ul li.manu_downs .dowList01{ display: none;}
.home ul li.manu_downs:hover .dowList01{ display: block;}

.home ul li.manu_downs .dowList01{   position: absolute; top: 75px; left: 0; width: 158px; z-index: 300; background: #0b396d;}
.home ul li.manu_downs .dowList01 .ity{ position: relative; height: 40px; line-height: 40px;  font-size: 20px; color: #9FC1FD;}
.home ul li.manu_downs .dowList01 .ity:hover{background: #355b95;}

.home ul li.manu_downs .dowList01 .ity:hover .dow02{ display: block;}
.home ul li.manu_downs .dowList01 .ity .dow02{ display: none; position: absolute; top: 0px; right: -158px; width: 158px; z-index: 300; background: #0b396d;}
.home ul li.manu_downs .dowList01 .ity .dow02 dl dd{height: 40px; line-height: 40px;  font-size: 20px; color: #9FC1FD;}
.home ul li.manu_downs .dowList01 .ity .dow02 dl dd:hover{background: #355b95;}

.home ul li.manu_downs .dowList01 .ity img{ position: absolute; top: 15px; right: 10px; width: 5px; height: 10px; }


/*end of 报表总计下拉*/
	
	
.active01{ display: none;}
.home .notice_items{ position: absolute; top: 100px; left:730px; width: 413px; height: 23px; z-index: 120; background: #8e1615; cursor: pointer;}
.home .notice_items:hover .er_message{ height:115px}
	.home .notice_items .up_di{ 
		        transition: All 0.14s ease-in-out;
            -webkit-transition: All 0.14s ease-in-out;
            -moz-transition: All 0.14s ease-in-out;}
.home .notice_items:hover .up_di{	transform:rotate(180deg);
-ms-transform:rotate(180deg); 	/* IE 9 */
-moz-transform:rotate(180deg); 	/* Firefox */
-webkit-transform:rotate(180deg); /* Safari 和 Chrome */

}


.home .notice_items p span{ color: #fff;}
.home .er_message{border-bottom-right-radius:10px; 
border-bottom-left-radius:10px; /*border-top: solid 1px #c62625;*/ position: absolute; top: 23px; left: 0; right: 0; width: 413px; height:0; overflow: hidden; background: #a91718; 
             transition: All 0.14s ease-in-out;
            -webkit-transition: All 0.14s ease-in-out;
            -moz-transition: All 0.14s ease-in-out;
          

}
.home .list_a .notice_items dl dd{ width: 100%; font-size: 16px; line-height: 30px; border-bottom: dashed 1px #c62625;}
.home .list_a .notice_items dl dd:hover{ background: #951313;}

.home	.name_select{ position: absolute; width: 160px; height:63px; top: 35px; right:40px;z-index: 120;}
.home	.name_select p{ font-size:23px; }
.home	.name_select p span{ float: left;}
.home	.name_select p img{ float: right;  }
.home	.name_select:hover .list_sel{ display: block;}
.home	.name_select .sh01{
	           -webkit-transition: 0.3s;
  transition: 0.3s;
}
.home	.name_select:hover .sh01{ transform:rotate(180deg);
-ms-transform:rotate(180deg); 	/* IE 9 */
-moz-transform:rotate(180deg); 	/* Firefox */
-webkit-transform:rotate(180deg); /* Safari 和 Chrome */}
.home	.name_select .list_sel{ position: absolute; width: 160px; overflow:hidden; top:54px; right:0;  background: #082f5a;display:none;}
.home	.name_select .list_sel p{ padding: 5px 0 5px 0; font-size: 20px; color: #4370b3;}
.home	.name_select .list_sel p:hover{ color: #fff; background: #365a96; cursor: pointer;}

.home .admincc{width: 120px;top: 40px;}

.home .notice_green{ overflow: hidden; background: #02961a;}
	
	.home{  position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: #031432;}
	.header_item{ height: 133px; padding: 0 0 0 13px;}
	.homme_center{ width: 1900px; height: 1080px; background: url(/static/image/index/bg_1.png); margin: 0 auto;}
	.header_item{ height: 143px; padding: 0 0 0 0px; }
	.header_item .list_a{ width: 1296px; height: 133px;float: left; background: url(/static/image/index/nav_bg_menu_bar.png); position: relative;}
	.header_item .list_a ul{ padding: 25px 0 46px 150px; }
	.header_item .list_a ul li{ width: 137px; height: 80px; float: left; cursor: pointer; }
	.header_item .list_a ul li.active{background: url(/static/image/index/nav_sel_font.png) -13px 131px;}
	.header_item .list_a ul li.active h2{color:#DFEAFC ;}
	.header_item .list_a ul li img{ width: 50px; height: 36px;}

	/* .header_item .list_a ul li.e img{ width: 27px; height: 27px;} */

	.header_item .list_a ul li h2{ font-size: 22px; color: #4379CD;}
	
		.header_item .list_a ul li:hover h2{ color: #fff;}
	
	
	.header_item .list_b{ width: 343px; height: 101px;float: left; position: relative;    margin-left: -9px; }
	.header_item .list_b .in{width: 348px; height: 101px; background: url(/static/image/index/nav_logo.png); position: absolute; top: 0; left: 0;}
	.header_item .list_c{ width:270px; height: 120px;float: left;  position: relative;}
	.header_item .list_c .inl{width:228px; height: 85px; padding: 35px 0 0 40px; background: url(/static/image/index/nav_bg_user.png); position: absolute; top: 0; left: 0;}
.header_item .list_c .inl p.u{ float: left; width: 50px; height: 50px;}
.header_item .list_c .inl p.u img{width: 50px; height: 50px;border-radius:50%}
.header_item .list_c .inl .ise{ width:125px; height: 30px ; float: left;}



/*警告动画*/
@keyframes rowup {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        -webkit-transform: translate3d(0, -307px, 0);
        transform: translate3d(0, -307px, 0);
        display: none;
    }
}
.errMessage_list{
   width:100%;height:118px;
   /*background:#8e1615;*/

    position: relative;
   
    overflow: auto;
}

.errMessage_list .rowup{
    /*-webkit-animation: 15s rowup linear infinite normal;
    animation: 15s rowup linear infinite normal;*/
    position: relative;
    overflow:hidden;
}
.errMessage_list .rowup .item{  overflow:hidden;border-bottom: dashed 1px #fff; line-height: 25px; color: #fff; padding: 5px; text-align: left; font-size: 14px;}
.errMessage_list .rowup .item:hover{  background: #74100f;}
.errMessage_list:hover .rowup{-webkit-animation-play-state:paused;animation-play-state:paused;}


h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
