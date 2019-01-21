<template>
  <div class="home_banner">
  	<!--一级菜单组件页面-->
    <ul>
						 <router-link :to="{ name: 'monitoring',}">
						 <li  :class="{'active':curr=='monitoring'}"  @click="ichange('monitoring')"><p>					
						 <img src="static/image/nav_new/nav_icon_1.png"></p><h2>实时监测</h2>
						 </li>
						 </router-link>
						 
              <router-link :to="{ name: 'foreshow',}">
						 <li class="e manu_downs" :class="{'active':curr=='foreshow'}" @click="ichange('foreshow')"><p><img src="static/image/nav_new/nav_icon_2.png"></p><h2>预告警管理</h2>
						 	   <div class="dowList01">
										  <router-link :to="{ name: 'now_count',}"><div class="ity">实时告警</div></router-link>
										  <router-link :to="{ name: 'history_count',}"><div class="ity">历史告警</div></router-link>
										  
										  <router-link :to="{ name: 'foreshow_count',}"><div class="ity">告警统计</div></router-link>
										   	
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
</template>






<script>
 export default {
      data() {
        return {
          	curr:"monitoring",
        }
      },
      methods: {
      	ichange(x){
					let _this=this;
					this.curr=x;				 
				},	
      },
			created(){
				let _this=this;
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
				
				
			
			},
    }

</script>
<style>

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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


/*报表总计下拉*/
.home_banner ul li.manu_downs { position: relative; }
.home_banner ul li.manu_downs .dowList01{ display: none;}
.home_banner ul li.manu_downs:hover .dowList01{ display: block;}

.home_banner ul li.manu_downs .dowList01{   position: absolute; top: 75px; left: 0; width: 158px; z-index: 300; background: #0b396d;}
.home_banner ul li.manu_downs .dowList01 .ity{ position: relative; height: 40px; line-height: 40px;  font-size: 20px; color: #9FC1FD;}
.home_banner ul li.manu_downs .dowList01 .ity:hover{background: #355b95;}

.home_banner ul li.manu_downs .dowList01 .ity:hover .dow02{ display: block;}
.home_banner ul li.manu_downs .dowList01 .ity .dow02{ display: none; position: absolute; top: 0px; right: -158px; width: 158px; z-index: 300; background: #0b396d;}
.home_banner ul li.manu_downs .dowList01 .ity .dow02 dl dd{height: 40px; line-height: 40px;  font-size: 20px; color: #9FC1FD;}
.home_banner ul li.manu_downs .dowList01 .ity .dow02 dl dd:hover{background: #355b95;}

.home_banner ul li.manu_downs .dowList01 .ity img{ position: absolute; top: 15px; right: 10px; width: 5px; height: 10px; }
/*end of 报表总计下拉*/

	.home_banner ul{ padding: 25px 0 46px 150px; }
	.home_banner ul li{ width: 137px; height: 80px; float: left; cursor: pointer; }
	.home_banner ul li.active{background: url(/static/image/index/nav_sel_font.png) -13px 131px;}
	.home_banner ul li.active h2{color:#DFEAFC ;}
	.home_banner_a ul li img{ width: 50px; height: 36px;}


	.home_banner ul li h2{ font-size: 22px; color: #4379CD;}
	
		.home_banner ul li:hover h2{ color: #fff;}
	
	


</style>
