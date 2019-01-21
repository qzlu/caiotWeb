<template>
 <div class="dl_a">
 	  <div class="pr_top">
 	    <p class="pr_title"><img src="/static/image/indexdetail/content_icon_2.png" /> 大事记</p>
 	    
 	     <section class="pr_are">
 	     	<ul>
 	     	   <li class="fist">{{t}}<!--2018--></li>
 	     	    <li v-for="(items,key) in dl_datalist"   :class="{'d':key%2!=0}">
 	     	    	<h2>{{items.HappenContext}}<!--报废--></h2><p class="gt">{{items.HappenTime}}<!--2017.6.12 22:23--></p>
 	     	    	<div class="imtems">
 	     	    		<p>
 	     	    		 <i class="icon iconfont " :class="items.WebIconName"  style="font-size: 30px;"></i>
 	     	    		 <!--<img src="/static/image/indexdetail/avb.png">-->
                       </p>
 	     	    	</div>
 	     	    </li>
 	     	    
 	     	    
 	     	   <!-- <li class="d">
 	     	    	<h2>告警</h2><p class="gt">2017.6.12 22:23</p>
 	     	    	<div class="imtems"><p><img src="/static/image/indexdetail/avb.png"></p></div>
 	     	    </li>
 	     	    
 	     	    <li >
 	     	    	<h2>保养</h2><p class="gt">2017.6.12 22:23</p>
 	     	    	<div class="imtems"><p><img src="/static/image/indexdetail/avb.png"></p></div>
 	     	    </li>
 	     	    <li class="d">
 	     	    	<h2>故障</h2><p class="gt">2017.6.12 22:23</p>
 	     	    	<div class="imtems"><p><img src="/static/image/indexdetail/avb.png"></p></div>
 	     	    </li>
 	     	    <li >
 	     	    	<h2>保养</h2><p class="gt">2017.6.12 22:23</p>
 	     	    	<div class="imtems"><p><img src="/static/image/indexdetail/avb.png"></p></div>
 	     	    </li>
 	     	    <li class="d">
 	     	    	<h2>故障</h2><p class="gt">2017.6.12 22:23</p>
 	     	    	<div class="imtems"><p><img src="/static/image/indexdetail/avb.png"></p></div>
 	     	    </li>
 	     	    <li >
 	     	    	<h2>保养</h2><p class="gt">2017.6.12 22:23</p>
 	     	    	<div class="imtems"><p><img src="/static/image/indexdetail/avb.png"></p></div>
 	     	    </li>-->
 	     	   
 	     	</ul>
 	     	
 	     	
 	     </section>
 	  </div>
	 
	
  </div>
</template>
<style>

</style>
<script>
import * as comm from '../../assets/js/pro_common';
 export default {
      data() {
        return {
  	      dl_datalist:'',
  	      t:''
        }
      },
	created(){
        var myDate = new Date();
            this.t=myDate.getFullYear()
           
	},
	methods: {
			
			 
		ajaxd(){
				let _this=this;
				   //返回一个Promise对象
			 return new Promise(function (resolve, reject) {
			       _this.$axios.post(_this.mypro+'Caiot/Project',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"GetDeviceMemorabilia",
						        "FVersion":"1.0.0",
						        "ProjectID":localStorage.getItem("projectid"),
						        "DeviceID":_this.$route.params.id, //产品自己id
						        
							}).then(function(jsons){
								//console.log(jsons.data)
								 //comm.messageErr(jsons.data.Result) //公共状态提示
								_this.dl_datalist=jsons.data.FObject;
								if(jsons){
									
									resolve("succ")
								} 
									
								
							}).catch(function(err){
							
							});
			})				
		}
			 
			 
	},
    mounted:function(){  	

	let _this=this;
	       this.ajaxd()
	       .then(function(){
	          
			}).then(function(){
    
			}).catch(function(err){})
	
	
	}
     
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {font-weight: normal;}
ul { list-style-type: none;padding: 0;margin: 0;}
a { color: #42b983;}
.pr_top{ height: 290px; background: url(/static/image/indexdetail/content_img.png) no-repeat 22px 51px; margin: 10px 30px 10px 30px;}	
.pr_top .pr_title{ text-align: left; font-size: 20px; color: #18A1EC;}
.pr_top .pr_title img{ vertical-align: -5px;}
.pr_top .pr_are{ height: 250px; }

.pr_top .pr_are ul li{ position: relative; width: 170px; height: 250px; float:left; color:#F1F1F2;background: url(/static/image/indexdetail/content_circle_1.png) 39px 20px no-repeat}
.pr_top .pr_are ul li.fist{ background:none; font-size: 24px; line-height: 230px; }
.pr_top .pr_are ul li h2{ font-size: 20px; color: #2A91FC; position: absolute;top:-10px; left: 0; width: 170px; overflow: hidden;}
.pr_top .pr_are ul li .gt{ width: 100px; height: 30px; position: absolute;top: 22px; left: -7px; font-size: 14px; color: #F1F1F2; }
.pr_top .pr_are ul li .imtems{ width: 66px; height: 66px;  position: absolute;top: 81px; left: 52px;display: flex;justify-content:center; align-items:center;align-content:center; }
.pr_top .pr_are ul li.d{background: url(/static/image/indexdetail/content_circle_2.png) 38px 71px no-repeat}
.pr_top .pr_are ul li.d h2{ top:214px; }
.pr_top .pr_are ul li.d .gt{ top: 172px; }





</style>
