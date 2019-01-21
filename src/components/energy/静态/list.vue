

<template>
  <section class="en_container" >
  	<section class="e_header">
  		 <div class="en_left">
  		 	 <p class="titles">总能耗</p>
  		 	 <p class="en_refre"><img src="/static/image/energy/refre.png"></p>
  		 	 <section class="ech_time">
  		 	 	 <div class="e_tg">
  		 	 	 	 <ul>
  		 	 	 	 	<li :class="{en_active:active==0}" @click="ech_date(0)">日</li>
  		 	 	 	 	<li :class="{en_active:active==1}" @click="ech_date(1)">周</li>
  		 	 	 	 	<li :class="{en_active:active==2}" @click="ech_date(2)">月</li>
  		 	 	 	 	<li :class="{en_active:active==3}" @click="ech_date(3)">年</li>
  		 	 	 	 </ul>
  		 	 	 	 <div class="e_set_time">
  		 	 	 	 	<p class="l"><img src="/static/image/energy/button_1.png"></p>
  		 	 	 	 	<div class="en_tpn">2018-10-15</div>
  		 	 	 	 	<p class="l"><img src="/static/image/energy/button_2.png"></p>
  		 	 	 	 </div>
  		 	 	 	
  		 	 	 </div>
  		 	 </section>
  		 	 
  		 	  <section class="e_bigdate">
  		 	  	<div class="it01"><p class="t">今日</p><p class="nt">20357</p></div>
  		 	  	<div class="it01 nobg"><p class="t">今日</p><p class="np">20357</p><p class="gy">15%</p></div>
  		 	  	<div class="it01 nobg"><p class="t">今日</p><p class="np">20357</p><p class="gy gc">15%</p></div>
  		 	  </section>
  		 	 
  		 	 
  		 	 
  		 </div>
  		 <div class="en_right">
  		 	<div  class="itext" style="float: left; width: 150px; padding: 30px 15px;">
  		 		  <p style="font-size: 18px; float:">总能耗</p>
  		 			<p style="font-size: 18px; line-height: 35px;">（kwh）</p>
  		 	</div>
  		 	 <div id="en_line" class="en_line"></div>
  		 	
  		 </div>
  		
  	</section>
   
    <section  class="big_Are" >
    	<div class="en_bigitem01" style="height: 347px; overflow: hidden;">
    	   <iline_bar></iline_bar>
    	 </div>
    	 <div class="en_bigitem02" style="height: 347px; overflow: hidden;">
    	   <iline_bar02></iline_bar02>
    	 </div>
    	 
    </section>
  
  </section>
</template>
 <style>

 </style>
<script>
	import line_bar from './line_bar.vue' //中间图片
	import line_bar02 from './line_bar02.vue' //中间图片
 var echarts = require('echarts');
export default {
  data () {
    return {
       active:0
    }
  },
  components: {
    "iline_bar":line_bar,"iline_bar02":line_bar02
  },
  methods: {
  	ech_date(x){ //选择日期
  		this.active=x
  	},
  	
  	e_line01(){
  		var dom = document.getElementById("en_line");
			var myChart = echarts.init(dom);
			var app = {};
			var option = null;
			option = {
			    title: {
			       // text: '折线图堆叠'
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    textStyle: {
				      fontWeight: 'normal',              //标题颜色
				      color:'#fff' 
				      },
			    legend: {
			        data:['今日','昨日','历史平均'],
			        x:'right',  //x,y 显示位置
			        y:"20px",
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
			    toolbox: {
			        feature: {
			           // saveAsImage: {}
			        }
			    },
			    xAxis: {
			        type: 'category',
			        boundaryGap: false,
			       // data: ['周一','周二','周三','周四','周五','周六','周日']
			         data: ['1','4','7','10','13','16','19','22','25']
			    },
			    yAxis: {
			        type: 'value',
			         splitLine:{show: false},//去除网格线
			    },
			    series: [
			        {
			            name:'今日',
			            type:'line',
			            stack: '总量',
			            data:[120, 132, 101, 134, 90, 230, 210, 310, 210]
			        },
			        {
			            name:'昨日',
			            type:'line',
			            stack: '总量',
			            data:[220, 182, 191, 234, 290, 330, 310]
			        },
			        {
			            name:'历史平均',
			            type:'line',
			            stack: '总量',
			            data:[150, 232, 201, 154, 190, 330, 410]
			        }
			    ],
			     color:['#ff7206','#18d094','#1385f7']
			};
			;
			if (option && typeof option === "object") {
			    myChart.setOption(option, true);
			}
  	},
  	
  	
  	
  	
  	
  },
  mounted:function(){
    this.e_line01()
   
  },
  computed: {
    
  }
}
</script>
 
<style type="text/css" scoped>

 .en_container .big_Are{  
 	  width: 1557px;
    height: 690px;
    background: url(/static/image/indexdetail/content_fg_1.png);
}

.en_container .e_header{ height: 227px; position: relative; }
 .en_container .e_header .en_left{ position: relative;  width: 459px; height: 224px; margin-top: -7px; background: url(/static/image/energy/un_ger.png); float: left;}
 .en_container .e_header .en_left .en_refre{ cursor: pointer; width: 20px; position: absolute; top: 36px; right: 11px;}
 .en_container .e_header .en_left .titles{ width: 126px; height: 25px; position: absolute;top: 0; left: 0; color: #607AB3; font-size: 18px;}
 .en_container .e_header .en_left .ech_time{ height: 35px; padding: 30px 0 0 0;}
  .en_container .e_header .en_left .ech_time .e_tg{ width: 320px; height: 28px; float: right;}  
  .en_container .e_header .en_left .ech_time .e_tg ul{ width: 136px; height: 25px; float: left; border:1px solid rgba(143,156,191,1);border-radius:5px}  
  .en_container .e_header .en_left .ech_time .e_tg ul li{ cursor: pointer; float: left; width: 34px; height: 25px; line-height: 25px; border-right:1px solid rgba(143,156,191,1) ;box-sizing:border-box;
-moz-box-sizing:border-box; /* Firefox */
-webkit-box-sizing:border-box; /* Safari */}
.en_container .e_header .en_left .ech_time .e_tg ul li:nth-child(4){ border: none;}
.en_container .e_header .en_left .ech_time .e_tg ul li.en_active{ background: #0f7ae2;}
.en_container .e_header .en_left .ech_time .e_tg .e_set_time{ margin: 6px 0 0 20px; width: 130px; height: 20px; float: left;}  
.en_container .e_header .en_left .ech_time .e_tg .en_tpn { cursor: pointer; width: 108px; height: 20px; float: left; font-size: 14px; color: #F1F1F2; margin: -2px 0 0 0;}  
   

 .en_container .e_header .e_bigdate{ height: 125px; padding: 16px 15px;}
 .en_container .e_header .e_bigdate .it01{ width: 142px; height: 120px; float: left; background: #092962;}
  .en_container .e_header .e_bigdate .nobg{ background: none;}
.en_container .e_header .e_bigdate .it01 .t{ color: #607AB3; font-size: 16px; padding: 25px 0 0 0; color: #DFEAFC;}
 .en_container .e_header .e_bigdate .it01 .nt{ font-size: 32px; padding-top: 12px;}
 .en_container .e_header .e_bigdate .it01 .np{ font-size: 24px;color: #607AB3;padding-top: 10px;}
  .en_container .e_header .e_bigdate .it01 .gy{ margin:10px 0 0 50px; width: 43px; height: 20px ; line-height: 20px; background:#06A167;border-radius :5px}
   .en_container .e_header .e_bigdate .it01 .gc{ background: #A21D32;}
 .en_container .e_header .en_right{ width: 1086px; height: 227px; margin-top: -7px;margin-left: 18px;background: url(/static/image/indexdetail/bg_blue_2.png) no-repeat; float: left;}
.en_container .e_header .en_right .en_line{ height: 200px; width: 845px; float: left; margin-top: 10px;}
  
  
  
  
  
</style>
