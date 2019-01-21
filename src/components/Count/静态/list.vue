<template>
	<section class="con_container">
		<div class="con_header">
			<div class="con_left">
				<p class="c_t">总数<span>（个）</span></p>
				<div class="c_text">1080</div>
			</div>
			<div class="con_right">
				<div  class="itext" style="float: left; width: 150px; padding: 30px 15px;">
  		 		    <p style="font-size: 18px; float:">总能耗</p>
  		 			<p style="font-size: 18px; line-height: 35px;">（kwh）</p>
  		    	</div>
  		 	 <div id="con_bar" class="con_bar"></div>
				
				
			</div>
			
		</div>
		
		<div class="con_bigAea">
			<section class="con_item01">
				<div class="con_a">
					  <div class="entitle_">
					   <p>分区统计</p>
					  </div>
				</div>
				
				<div class="con_b" >
					<!--组件-->
					<line_bar01></line_bar01>
				</div>
				
			</section>
			<section class="con_item01">
				<div class="con_a">
					  <div class="entitle_">
					   <p>设备类型统计</p>
					  </div>
				</div>
				<div class="con_b" >
					<!--组件-->
					<line_bar02></line_bar02>
					
				</div>
			</section>
			
			
		</div>
		
		
	</section>
	
	
</template>
<style>


</style>
<script>
	
import line_bar01 from './line_bar01.vue' 
import line_bar02 from './line_bar02.vue' 
 var echarts = require('echarts');
export default {
  data () {
    return {
      
    }
  },
  components: {
    line_bar01,line_bar02
  },
  methods: {
  	
           con_bar(){
			  	var dom = document.getElementById("con_bar");
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
								   color:'#fff',
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
								   color:'#fff',
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
			  },
			  	
  	
  	
  	
  },
  mounted:function(){
   this.con_bar()
  
  },
  computed: {
    
  }
}	
	
</script>

<style scoped>
	
.con_container .con_bigAea{  width: 1557px; height: 690px;background: url(/static/image/indexdetail/content_fg_1.png);}
.con_container .con_bigAea .con_item01{height: 347px; overflow: hidden;}
.con_container .con_bigAea .con_item01 .con_a{ float: left; height: 150px; width: 123px; padding: 50px 0 0 50px; font-size: 18px;}
.con_container .con_bigAea .con_item01 .con_b{height:275px; width: 1375px; float: left; margin: 55px 0 0 -28px;}

.con_container .con_bigAea .con_item02{height: 347px; overflow: hidden;}
	
	
	
	
.con_header{height: 227px;position: relative;}	
.con_header .con_left{ position: relative;  width: 459px; height: 224px; margin-top: -7px; background: url(/static/image/energy/count_bg.png); float: left;}
.con_header .con_left .c_t{ padding: 30px 0 10px 50px; font-size: 24px; color: #525E7E; text-align: left;}
.con_header .con_left .c_t span{ font-size: 14px;}
.con_header .con_left .c_text{ width: 60%; height: 120px; line-height: 120px; margin: 0 auto; background: #0b2b64; font-size: 54px;letter-spacing:25px}

.con_header .con_right{ width: 1086px; height: 227px; margin-top: -7px;margin-left: 18px;background: url(/static/image/indexdetail/bg_blue_2.png) no-repeat; float: left;}
.con_header .con_right .con_bar{ height: 240px; width: 845px; float: left; margin-top: -30px;}
</style>