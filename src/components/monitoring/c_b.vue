<template>
<!-- 供配电 分类 -->
			<div class="ght_listn">
				<section  class="png_ygts">
				<ul class="gpn_siItem">
						<li v-for="(item, index) in datalist" :key="index" :class="{'show_warn_class':item.TopValue.length,'no_warn_class':!item.TopValue.length}">
						<router-link :to="{ name: 'detail_info',params:{ id:item.DeviceItemID,SingleType:1}}">
						<p class="u_tle">{{item.DeviceItemTitle}}</p>
						
						<div class="u_cen">
							 <div class="icon_lig">
							 	<p v-for="(lis, key) in item.TopValue" class="r">
							 		<i class="icon iconfont set_imgColor" :class="[lis.AlarmWebIcon]"  :data="lis.AlarmType"></i>&nbsp;{{lis.AlarmCount}}&nbsp;</span>
								 
								</p>
								</div>
								
								<div class="tl_t"><p style="color: #F1F1F2; font-size: 10px;">{{item.TargetTitle}}</p><p style="color: #F1F1F2; font-size: 22px;">{{item.TargetValue}}</p></div>
								<div class="numb_t">
									<p v-for="(abc, key) in item.TargetDetail">{{abc.STargetValue}}</p>
								</div>							
							 <div class="u_acr"  :id='settitle+index'> </div>
						</div>
						</router-link>
						</li>
				</ul>
				
				</section>
			</div>
 
</template>
<style>

 
</style>
<script>
	var echarts = require('echarts');
	import * as comm from '@/assets/js/pro_common';
	import {project} from '@/request/api';
 export default {
      data() {
        return {
					datalist:[],
					settitle:"lig_",
         }
      },
			created(){
				
				
			  
			},
			methods: {
				
				Pro() {
					 //返回一个Promise对象
					 return new Promise((resolve, reject) => {
						 project({
							 FAction:"GetPrjDeviceItemInfo"
						 })
						 .then(data => {
								this.datalist=data.FObject
								resolve("succ")
						 })
						 .catch(err => {
							 reject()
						 })
					 })
				  
				  },
				
				Pro2() {
					
					let _this=this;
				   //返回一个Promise对象
				    return new Promise(function (resolve, reject) {
				      let arr=_this.datalist;
							for(var g=0;g<_this.datalist.length;g++){
								_this.Pie_list(_this.settitle+g,g)
							}
							
							/*给所有图动态加色*/
						 var doc_all=document.getElementsByTagName("i")
						 for(var gg=0;gg<doc_all.length;gg++){
						 	if(doc_all[gg].getAttribute("data")){
						 		
						 		var hg=Number(doc_all[gg].getAttribute("data"));
						 		var ggg=comm.resetColor(hg)
						 		doc_all[gg].style.color=ggg
						 	}
						 	
						 }
					   /*给所有图动态加色*/ 
					   
					   
					    /*区域数据位置div 显示top位置*/
					  var docs=document.querySelectorAll(".numb_t")
					  for(let r=0;r<docs.length;r++){
					  	//console.log(docs[r].children.length)
					  	if(docs[r].className.indexOf("tns_")==-1){
					  		docs[r].className+=" "+"tns_"+docs[r].children.length;
					  	}
					  	
					  }					     
				     /*区域数据位置top*/	
				     
				     
				     
				     
				     
							
				   })
				},
				
				
				
				/*....处理图表....*/
				Pie_list(d,n){
					
					var arrs01=[],arrs02=[],gcolor=[];
					var arr03=this.datalist[n].TargetDetail;
					for(var j=0;j<arr03.length;j++){
						arrs02.push(arr03[j].STargetTitle);//取['运行','停止','故障'],
						arrs01.push({value:arr03[j].STargetValue,name:arr03[j].STargetTitle,color:arr03[j].SColor}) //取{value:10, name:'运行',}
						gcolor.push(comm.resetColor(arr03[j].SColor))//设置图色
											
					}
					
					
				var dom_right =document.getElementById(d);
				var myChart = echarts.init(dom_right);
				var app = {};
				app.title = '环形图';				  						
				var option = {
					tooltip: {
						trigger: 'item',
						formatter: "{b}: {c} ({d}%)"
					},
					legend: {
							orient: 'vertical',
							x: '195px',
							y:'center',
						//data:['运行','停止','故障'],
				    	data:arrs02,
							textStyle: { color: '#fff' },
							itemWidth: 10,
							itemHeight: 10,
							itemGap: 15,
					
					},
					series: [
							{
									name:'访问来源',
									type:'pie',
								center : ['35%', '51%'], //图形显示位置
									radius: ['50', '60'],
									label: {
											normal: {
													show: false,//文字显示在图中间位置
													position: 'center',				
											}
									},
		
									/* data:[
											{value:10, name:'运行',},
											{value:30, name:'停止'},
											{value:60, name:'故障'},
									] */
									 data:arrs01,
							}
					],
					//color:['#1bd1a1','#73777a','#8f1c2d']
					color:gcolor
				};
				;
				if (option && typeof option === "object") {
					myChart.setOption(option, true);
				} 
					
				}
				
				
				},
			
				mounted:function(){  				
					let _this=this;
					function settimeouts_data_b(){
						 
						_this.Pro()
						    .then(function(d){	
						  return _this.Pro2(d)
						})
						.then(function(){
						 
						})
						.catch(function(err){
						//  throw new Error(err)
						})
						let timeoutId_b=setTimeout(settimeouts_data_b, 4000);
						let router_currt=_this.$route.name;
					     if(router_currt!="product"){
							 clearTimeout(timeoutId_b);
						}
					   
					}
					
				  settimeouts_data_b()
				 

				
				}
     
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
	margin: 0;
}

a {
  color: #fff;
}
.ght_listn{ height: 245px;
    position: relative;
    margin-top: -15px;
    overflow-y: auto;}
    
.ght_listn::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 5px;
    }
.ght_listn::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #c1c1c1;
    }
.ght_listn::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
          
    }
    
.ght_listn .png_ygts{width: 130%; height: 233px; position: relative;}    
.ght_listn ul{ position: absolute;top:0; left: 0; right: 0; bottom: 0;}
.ght_listn ul li{ cursor: pointer; width: 313px; height: 234px; float: left;  background: url(/static/image/index/content_bg_1.png)  no-repeat;font-size: 16px;}

.ght_listn ul li:hover{background: url(/static/image/index/hover_09.png) no-repeat 0 1px;/*background: url(/static/image/index/content_bg_2.png) no-repeat 0 1px;*/}
.ght_listn ul li:hover  .icon_lig{ display: block;}
.ght_listn ul li.show_warn_class:hover{ background: url(/static/image/index/content_bg_2.png);}
.ght_listn ul li.show_warn_class{ background: url(/static/image/index/content_bg_2.png);}


.ght_listn ul li .u_tle{ padding: 3px 0 0 0;}
.ght_listn ul li .u_cen{ position: relative;height: 200px}
 .icon_lig{ font-size: 15px; /*color: #941413;*/ position: absolute; top: 16px; right: 23px; /*display: none;*/}
 .icon_lig img{ vertical-align: -2px;}
 .ght_listn ul li .u_cen .u_acr{ height: 200px;}
 .ght_listn ul li .u_cen { height: 200px; z-index: 100; background: url(/static/image/index/leftbar_bg_circle.png) no-repeat 39px 30px; color: #fff;}
 .ght_listn ul li .u_cen  .tl_t { position: absolute;top:82px;left:81px;min-width: 60px;}
 .ght_listn ul li .u_cen  .numb_t{ position: absolute; width:50px;top:57px; right: 10px; font-size: 20px;line-height: 28px; text-align: left;}
  .ght_listn ul li .u_cen .tns_1{top:86px;}
  .ght_listn ul li .u_cen .tns_2{top:72px;}
  .ght_listn ul li .u_cen .tns_3{top:58px;}
  .ght_listn ul li .u_cen .tns_4{top:43px;}
.ght_listn .fin_item{ height: 700px; background: url(/static/image/index/content_bg_6.png) no-repeat ;}
 

</style>
