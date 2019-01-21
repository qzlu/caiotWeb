

<template>
  <div class="container" style="background: none; text-align: center; ">
  	<!--<router-link :to="{ name: 'monitoring',}">
		<p>请返回....</p>
		</router-link>-->
    <section class="ab_container"  style="">
    	<div style="height: 45px; background:#0a3c7b ;">
    		<!--时间选择器-->
    		<div class="block" style="padding: 7px 0 0 0;">
		    <span class="demonstration">请选择日期 </span>
		    <el-date-picker
		      v-model="value1"
		      type="date"
		      value-format="yyyy-MM-dd HH:mm:ss"
		      placeholder="选择日期"
		      @change="logTimeChange">
		      
		    </el-date-picker>
		  </div>
		  
		  
    		
    	</div>
    	<div class="table_info" style="  margin-top: 25px; border: solid 1px #112e6a; margin: 0 auto; background: #03234c;">
    		 <div class="table_ltop">
    		 	<ul><li>设备编号</li><li>设备ID<!--名称--></li><li>内容</li><li>温度</li><li>时间</li><li>操作</li></ul>
    		 </div>
    		 
    		 <div class="table_ltop data_item_gh" v-for="(item,key) in arrs_page">
    		  	<ul :AreaID="item.AreaID" :AlarmID="item.AlarmID">
    		  		<li >{{item.AlarmID}}</li>
    		  		<li>{{item.DeviceID}}</li>
    		  		<li>{{item.AlarmText}}</li>
    		  		<li>{{item.AlarmData}}</li>
    		  		<li>{{item.AlarmTime}}</li>
    		  		<li><a>删除</a> <a>新增</a> <a>编辑</a></li>
    		  	</ul>
    		 </div>
    		 
    		 
    		 
    	</div>
    	<div style="text-align:left; margin-left: -5px;">
    		
    
    		<el-pagination
				  :page-size="pagesize"
				  :pager-count="5"
				  :current-page="currentPage" 
				  @current-change="handleCurrentChange"
				  layout="prev, pager, next"
				  :total="all_datas.length">
		  	</el-pagination>
    	</div>
    	
    	
    </section>
    
    
  </div>
</template>
 <style>
 	
 .ab_container .el-input__inner {
    background: none;
    border: none;
    font-size: 14px;
    color: #6A7DB1;
}
 .ab_container	.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: none;
    padding: 0 32px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 95%; 
}
 .ab_container .el-input__icon{ line-height: 30px;}


 .table_ltop{ height: 65px; font-size: 14px;}
 .table_ltop ul{padding: 0 15px; overflow: hidden;}
 .table_ltop ul li{ height: 65px;line-height: 65px; float: left; }
 .table_ltop ul li:nth-child(1){ width: 200px;}
 .table_ltop ul li:nth-child(2){ width: 220px;}
 .table_ltop ul li:nth-child(3){ width: 360px;}
 .table_ltop ul li:nth-child(4){ width: 160px;}
 .table_ltop ul li:nth-child(5){ width: 225px;}
 .table_ltop ul li:nth-child(6){ width: 215px;}
 .table_ltop ul li:nth-child(6) a{ color: #fff;}
 .table_ltop ul:hover{ background: #1e4483;}
 
 .data_item_gh:nth-child(odd){
        background-color:#032c62;
    }
    /*偶数*/
 .data_item_gh:nth-child(even){
     background-color: #0b3975;
 }
 
 
 </style>
<script>

	
export default {
  data () {
    return {
    	
     pickerOptions1: {
       disabledDate(time) {
       return time.getTime() > Date.now();
          },
          
    },
    value1: '',
    all_datas:'',//总数据
    arrs_page:"", //点击页码，显示的数据
    currentPage:1,//默认当前页
    pagesize:12//默认每页显示5条
    
    }
  },
  components: {
    
  },
  methods: {
  	
  	 handleCurrentChange(val) {//点击分页页码
  	 	 this.arrs_page=this.all_datas.slice((val-1)*this.pagesize,val*this.pagesize)
        console.log(`当前页: ${val}`);
      },
  	
  	logTimeChange(val){
  		console.log(val)
  		this.Pro(val)
  	},
    Pro(gettime){
    	let _this=this;
    	 return new Promise(function (resolve, reject) {  	
    	   // console.log(gettime)    	     	
				    _this.$axios.post(_this.mypro+'Caiot/Project',{
						        "FTokenID":"43324155-7af5-475b-ad7d-50321483f945",
						        "FAction":"GetHisAlarmData",
						        "FVersion":"1.0.0",
                    "ProjectID":localStorage.getItem("projectid"),
						        "FDateTime":gettime
							}).then(function(jsons){
								// console.log(jsons.data.FObject)
								 _this.all_datas=jsons.data.FObject	
								 var len= jsons.data.FObject.length;
								 if(len){ 
								 	 var pageNum=Math.ceil(len/_this.pagesize) ;//总页数除每页显示个数，得出总共几页。
								 	 if(pageNum==1){                           //如果当前页只有一页，默认显示出来，不需要处理
								 	 	 _this.arrs_page=jsons.data.FObject
								 	 }else{   //如果超出第一页，就用slice截取数据
								 	 	 _this.arrs_page=jsons.data.FObject.slice(0,_this.currentPage*_this.pagesize)
								 	 }
								 }else{
								 	_this.arrs_page=''
								 }
								  
								  
								//console.log(Math.ceil(1/5))
								//_this.get_datas=jsons
								if(jsons){
									
									resolve("succ")
								} 
								
	
								
							}).catch(function(err){
							
							});
    	 })
    },
    
    
    getNowFormatDate() {
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
    
  },
  mounted:function(){
  	var _this=this;
  	var curr_time=this.getNowFormatDate()
 
  		_this.Pro(curr_time).then(function(){
						 
						}).then(function(){
						 
						}).catch(function(err){
						
						})
  },
  computed: {
    
  }
}
</script>
 
<style type="text/css" scoped>
  .container {
    background-color: #efefef;
    min-height: 100%;
  }
  
  
  
  
  
</style>
