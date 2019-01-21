<template>
	<section class="icontainer">
		<section class="det_top">
			
			  <div class="det_left">
			  	<p class="dtitle">供配电</p>
			  	<div  class="dmes" style="text-align: right;"></div>
			  	<div  class="dt_kgs"><!----></div>
			  	<div class="de_arc_li" id="utb_01">
			  	
			  		
			  	</div>
			  		<div class="ge_pelin"><p>设备总数</p><p style="font-size: 20px;">3333</p></div>
			  </div>
			  
			  <div class="det_rightItem">
			  	 <div class="det_titles">分类统计</div>
			  	 <section id="count_01" style="width: 900px; height: 185px; float: left; color: #fff; margin-top: 25px;" ></section>
			  	
			  </div>
		</section>
		
		
		<div class="con_bigAea">
			<section class="con_item01">
				<div class="con_a">
					  <div class="entitle_">
					   <p>设备类型</p>
					  </div>
				</div>
				
				<div class="con_b" id="count_02" >
					
				
				</div>
				
			</section>
			<section class="con_item01">
				<div class="con_a">
					  <div class="entitle_">
					   <p>告警排名Top10</p>
					  </div>
				</div>
				<div class="con_b" id="count_03" >
					<!--组件-->
					
					
				</div>
			</section>
			
			
		</div>
		
	</section>

</template>
<style>

</style>
<script>
	var echarts = require('echarts');
	import * as comm from '../../assets/js/pro_common';

 export default {
 	   
      data() {
        return {
        	
			
        }
        
      },
			created(){
				let _this=this;
	
        
			},
			methods: {
			
				
				},
			
				mounted:function(){  	
					/*左一图*/
				var dom = document.getElementById("utb_01");
				var myChart = echarts.init(dom);
				var app = {};
				option = null;
				app.title = '环形图';
				var option = {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
							orient: 'vertical',
							x: '169px',
							y:'center',
						data:['运行','停止','故障'],
				    	
							textStyle: { color: '#fff' },
							itemWidth: 10,
							itemHeight: 10,
							itemGap: 15,
					
					},
					series: [
							{
									name:'显示来源',
									type:'pie',
							    	center : ['25%', '48%'], //图形显示位置
									radius: ['50', '60'],
									label: {
											normal: {
													show: false,//文字显示在图中间位置
													position: 'center',				
											}
									},
		
									 data:[
											{value:10, name:'运行',},
											{value:30, name:'停止'},
											{value:60, name:'故障'},
									]
									
							}
					],
					color:['#1bd1a1','#73777a','#8f1c2d']
				
				};
				
			
				if (option && typeof option === "object") {
				    myChart.setOption(option, true);
				}
										
					
					
	           /*右一图*/         	
						var dom = document.getElementById("count_01");
						var myChart = echarts.init(dom);
						var app = {};
						var option = null;
						app.title = '堆叠条形图';
						
						option = {
						    tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        }
						    },
						    legend: {
						      data: ['运行', '停止','营运'],
						      textStyle: {
				        	  fontWeight: 'normal',              //标题颜色
				        	  color:'#fff' , 	
				          },
						     
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis:  {
						    	 type: 'category',
						         data: ["变压器", "进线柜", "馈线柜", "联络柜1" ],
						         axisLine:{ //y轴色
											   lineStyle:{
											   color:'#d5d5d5',
											    width:1,
											   }
											  }
						      
						    },
						    yAxis: {
						         type: 'value',
						          splitLine:{show: false},//去除网格线
						          axisLine:{ //y轴色
											   lineStyle:{
											   color:'#d5d5d5',
											    width:1,
											   }
											  }
						    },
						   
						    series: [
						        {
						            name: '运行',
						            type: 'bar',
						            stack: '总量',
						            barWidth: '30',
						            label: {
						                normal: {
						                    show: true,
						                    position: 'insideRight'
						                }
						            },
						            data: [320, 302, 301, 334,]
						        },
						        {
						            name: '停止',
						            type: 'bar',
						            stack: '总量',
						            barWidth: '30',
						            label: {
						                normal: {
						                    show: true,
						                    position: 'insideRight'
						                }
						            },
						            data: [120, 132, 101, 134]
						        },
						        {
						            name: '营运',
						            type: 'bar',
						            stack: '总量',
						            barWidth: '30',
						            label: {
						                normal: {
						                    show: true,
						                    position: 'insideRight'
						                }
						            },
						            data: [220, 182, 191, 234]
						        }
						    ]
						};;
						if (option && typeof option === "object") {
						    myChart.setOption(option, true);
						}
						



             /*中一图*/         	
						var dom = document.getElementById("count_02");
						var myChart = echarts.init(dom);
						var app = {};
						var option = null;
						app.title = '堆叠条形图';
						
						option = {
						    tooltip : {
						        trigger: 'axis',
						        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						        }
						    },
						    legend: {
						      data: ['运行', '停止','营运'],
						      textStyle: {
				        	  fontWeight: 'normal',              //标题颜色
				        	  color:'#fff' , 	
				          },
						     
						    },
						    grid: {
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        containLabel: true
						    },
						    xAxis:  {
						    	 type: 'category',
						         data: ["变压器", "进线柜", "馈线柜", "联络柜1" ],
						         axisLine:{ //y轴色
											   lineStyle:{
											   color:'#d5d5d5',
											    width:1,
											   }
											  }
						      
						    },
						    yAxis: {
						         type: 'value',
						          splitLine:{show: false},//去除网格线
						          axisLine:{ //y轴色
											   lineStyle:{
											   color:'#d5d5d5',
											    width:1,
											   }
											  }
						    },
						   
						    series: [
						        {
						            name: '运行',
						            type: 'bar',
						            stack: '总量',
						            barWidth: '30',
						            label: {
						                normal: {
						                    show: true,
						                    position: 'insideRight'
						                }
						            },
						            data: [320, 302, 301, 334,]
						        },
						        {
						            name: '停止',
						            type: 'bar',
						            stack: '总量',
						            barWidth: '30',
						            label: {
						                normal: {
						                    show: true,
						                    position: 'insideRight'
						                }
						            },
						            data: [120, 132, 101, 134]
						        },
						        {
						            name: '营运',
						            type: 'bar',
						            stack: '总量',
						            barWidth: '30',
						            label: {
						                normal: {
						                    show: true,
						                    position: 'insideRight'
						                }
						            },
						            data: [220, 182, 191, 234]
						        }
						    ]
						};
						if (option && typeof option === "object") {
						    myChart.setOption(option, true);
						}
						
    
           /*下图*/
          
          var dom = document.getElementById("count_03");
				var myChart = echarts.init(dom);
				var app = {};
				var option = null;
				app.title = '坐标轴刻度与标签对齐';
				
				option = {
				    color: ['#3398DB'],
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : ['供配电', '给排水', '中央空调', '电梯', '门禁', '门禁'],
				            axisTick: {
				                alignWithLabel: true
				            },
				            axisLine:{ //y轴色
								   lineStyle:{
								   color:'#d5d5d5',
								    width:1,
								   }
								  }
				        },
				        
				    ],
				    yAxis : [
				        {
				            type : 'value',
				             splitLine:{show: false},//去除网格线
				             axisLine:{ //y轴色
								   lineStyle:{
								   color:'#d5d5d5',
								    width:1,
								   }
								  }
				        }
				    ],
				    series : [
				        {
				            name:'直接访问',
				            type:'bar',
				            barWidth: '30',
				            data:[900, 302, 200, 534, 890, 330]
				        }
				    ]
				};
				;
				if (option && typeof option === "object") {
				    myChart.setOption(option, true);
				}
          
          
          
	          
					
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

.icontainer .con_bigAea{  width: 1557px; height: 690px;background: url(/static/image/indexdetail/content_fg_1.png);}
.icontainer .con_bigAea .con_item01{height: 347px; overflow: hidden;}
.icontainer .con_bigAea .con_item01 .con_a{ float: left; height: 150px; width: 123px; padding: 50px 0 0 50px; font-size: 18px;}
.icontainer .con_bigAea .con_item01 .con_b{height:219px; width: 1375px; float: left; margin: 55px 0 0 -28px;}

.icontainer .con_bigAea .con_item02{height: 347px; overflow: hidden;}


.det_top{
    height: 226px;
    position: relative;
}

.det_top .det_left  {
    position: relative;
    margin-top: -15px;
    width: 456px;
    height: 230px;
    float: left;
    background: url(/static/image/indexdetail/bg_blue_1.png) no-repeat;
}
.det_top .det_left .dtitle{
    height: 20px;
    width: 130px;
    margin: 0 auto;
    padding: 3px 0;
    overflow: hidden;
    font-size: 16px;
    color: #F1F1F2;
}

.det_top .det_left .dmes  {
    height: 25px;
    font-size: 15px;
    padding: 10px 15px;
}

.det_top .det_left .dt_kgs  {
    width: 92px;
    height: 108px;
    float: left;
    padding: 0 15px 0 20px;
}

.det_top .det_left .de_arc_li {
    width: 280px;
    margin-left: 25px;
    height: 148px;
    margin-top: -8px;
    float: left;
    background: url(/static/image/index/leftbar_bg_circle.png) no-repeat;
}


 .det_left .ge_pelin {
    position: absolute;
    top: 117px;
    left: 193px;
}

 .det_left .uib_1{top: 125px;}  
.det_left .uib_2{top: 110px;}  
 .det_left .uib_3{top: 98px;} 
.det_left .de_two{top: 111px; right: -1px;}
 
 
 
 
.det_titles {
    width: 110px;
    height: 165px;
    padding: 25px 0px 0px 20px;
    float: left;
    font-size: 18px;
    color: rgb(241, 242, 242);
}

.det_top .det_rightItem{
    width: 1086px;
    height: 227px;
    margin: -5px 15px 0 0;
    background: url(/static/image/indexdetail/bg_blue_2.png) no-repeat;
    float: right;
}
</style>
