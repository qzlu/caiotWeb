
<template>
  <div class="container ele_outbox" style="background: none; text-align: center; ">
  	<!--实时告警页面-->
  	<section class="cout_allitem">
    <section class="ab_container now_coutn_ki" >
    	 <div class="cout_title">
	       <a :href="xls_adress"> <button class="zw-btn zw-btn-export">导出</button></a>
	       <button class="zw-btn zw-btn-refrest" @click="openFullScreen" style="margin-left:10px;">刷新</button>
  	<!--<p class="r btn_02" @click="handleCurrentChange(1)">刷新</p>-->
    	 </div>

    	<div class="table_info" >
    		 <div class="table_ltop">
    		 	<ul><li>设备名称</li><li>区域名称</li><li>告警级别</li><li>告警类型</li><li>告警内容</li><li>告警值</li><li>告警条件</li><li>告警时间</li></ul>
    		 	<div class="table_ltop data_item_gh">
    		 		<p  v-if="(!arrs_page.length)" style="background: #0b3975;height: 65px; line-height: 65px;">暂无数据</p>
    		 		<ul v-for="(item,key) in arrs_page">
    		 			<li>{{item.DeviceName}}</li>
    		 			<li>{{item.AreaName}}</li>
    		 			<li>{{item.AlarmLevel}}</li>
    		 			<li>{{item.AlarmTypeName}}</li>
    		 			<li>{{item.AlarmText}}</li>
    		 			<li>{{item.AlarmData}}</li>
    		 			<li>>{{item.LimitValue}}</li>
    		 			<li>{{item.AlarmTime}}</li>
    		 		</ul>
    		   	<!--<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li></ul>-->
    		   	
    		   </div>
    		 	</div>
    		 
    	
    		 		 
    	</div>
    	
     <el-pagination
		  :page-size="pagesize"
		  :pager-count="11"
		  @current-change="handleCurrentChange"
		  layout="prev, pager, next"
		  :total="Total_count">
		</el-pagination> 
    	
 
    	
    </section>
   </section> 

   
   
   
   
  
  </div>
</template>
 <style>
 	
 .now_coutn_ki .el-button--primary	{width: 88px; height: 46px;text-indent:25px;background: url(/static/image/count/btn3.png);cursor: pointer; float: left; border: none;}
  .now_coutn_ki .el-button--primary:hover{ background:url(/static/image/count/btn4.png);}
.now_coutn_ki .el-loading-mask{ background-color: #000; opacity: 0.5;}
.now_coutn_ki .el-pagination{ float: left; margin-left: 18px; margin-top: 10px;}
.now_coutn_ki .el-pager li{ background: none; color: #2A91FC;}
.now_coutn_ki .el-pager li.active{color: #fff; font-size: 16px;}
.now_coutn_ki  .el-pagination .btn-next,.ab_container  .el-pagination .btn-prev{background:none; color: #2A91FC;}
 </style>
<script>
 export default {
    data() {
      return {
      	
         arrs_page:"",     //点击页码，显示的数据
         currentPage:1,   //默认当前页
         pagesize:10,    //默认每页显示几条
         Total_count:null, //总共有几条数据
        
         xls_adress:"",
      };
    },
    methods: {
	    handleCurrentChange(val=1) {//点击分页页码
	  		let _this=this;
	  	      _this.$axios.post(_this.mypro+'Caiot/Alarm',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"QueryCaiotRealTimeAlarmByProject",
						        "FVersion":"1.0.0",
						        "PageIndex":val,  //默认为第一页
						        "PageSize":_this.pagesize,   //每页显示10条
						        "ProjectID":localStorage.getItem("projectid")
							}).then(function(jsons){
								   console.log(jsons.data.FObject)
								_this.Total_count=jsons.data.FObject.Table[0].FTotalCount;
							  _this.arrs_page=jsons.data.FObject.Table1;	
							  
							}).catch(function(err){
							
							});
	  	      return "ok"

	        //console.log(`当前页: ${val}`);
	      },
     
     openFullScreen() { //loading弹出框
         const loading = this.$loading({
          customClass: 'hahahah',
          background: 'rgba(0, 0, 0, 0.7)',
          text:'正在加载......'
        });
       let stat= this.handleCurrentChange()
       if(stat){
       	 loading.close();
       }
     
       
      },
     
     
   
     
     
     
     
     
    },
   mounted:function(){
  	this.handleCurrentChange(this.currentPage)
  	
  	
  	      let _this=this;
	  	      _this.$axios.post(_this.mypro+'Caiot/Alarm',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"CreatCaiotRealTimeAlarmByProject",
						        "FVersion":"1.0.0",  
						        "ProjectID":localStorage.getItem("projectid")
							}).then(function(jsons){
							   _this.xls_adress=_this.mypro+jsons.data.FObject
								 // console.log(jsons.data.FObject)
 
							}).catch(function(err){
							
							});
  	
  	
  	

  },
  };
	

</script>
 
<style type="text/css" scoped>
  .container {
    background-color: #efefef;
    min-height: 100%;
  }
  
  
 :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #fff;  
}
 
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #fff;
}
 
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
    color: #fff;
}
 
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
    color: #fff;
}
  
 .cout_allitem{ height: 920px; width: 1563px; background: url(/static/image/index/count_back.png);}
 .ab_container{ padding: 5px 20px;}	
 .ab_container .cout_title{ height: 50px; padding: 55px 15px 0 25px ;text-align: left;}

.table_info{width: 97%; margin: 0 auto; height: 700px;  margin-top: 15px; border: solid 1px #112e6a;  background: #03234c;}
 .table_ltop{ height: 65px; font-size: 14px; }
 .table_ltop ul{padding: 0 15px; overflow: hidden; cursor: pointer;}
 .table_ltop ul li{ height: 65px;line-height: 65px; float: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap; }
 .table_ltop ul li:nth-child(1){ width: 200px;}
 .table_ltop ul li:nth-child(2){ width: 200px;}
 .table_ltop ul li:nth-child(3){ width: 150px;}
 .table_ltop ul li:nth-child(4){ width: 150px;}
 .table_ltop ul li:nth-child(5){ width: 200px;}
 .table_ltop ul li:nth-child(6){ width: 150px;}
 .table_ltop ul li:nth-child(7){ width: 150px;}
 .table_ltop ul li:nth-child(8){ width: 180px;}

 
 .data_item_gh ul:hover{ background: #1e4483!important;}
 
 .data_item_gh ul:nth-child(even){
        background-color:#052d68;
    }
    /*偶数*/
 .data_item_gh ul:nth-child(odd){
     background-color: #0b3975;
 }
  
</style>
