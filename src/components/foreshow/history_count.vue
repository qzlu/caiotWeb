

<template>
  <div class="container ele_outbox" style="background: none; text-align: center; ">
  		<!--历史告警页面-->
  	<section class="cout_allitem">
    <section class="ab_container history_count" >
    	 <div class="cout_title">
    	 	<p class="l text">设备名称</p><p class="ipt l put01"><input placeholder=" 请输入内容" v-model="value01"></p>
    	 	<p class="l text">设备类型</p><p class="ipt l put02"><input placeholder=" 请输入内容"  @click="tree_input_click" v-model="value_tree"></p>
    	 	<p class="l text">告警级别</p>
    	 	<p class="ipt l put03">
    	 		<select class="select01" v-model="Alarm_levid"><option v-for="(item,key) in Alarm_lev" :value="key">{{item}}</option></select><!--<input placeholder=" 请输入内容">-->
    	 	</p>
    	 	<p class="l text">告警类型</p><p class="ipt l put04">
    	 			<select class="select01" v-model="Alarm_Typeid"><option value="0">全部</option><option v-for="(item,key) in AlarmType" :value="item.AlarmTypeID">{{item.AlarmTypeName}}</option></select>
    	 		<!--<input placeholder=" 请输入内容">-->
    	 	</p>
    	 	<p class="l text">时间段</p>
    	 	<!--时间插件-->
    	 	<div class="block time_inputs">
				    <!-- {{value6}}-->
				      <!-- value-format="yyyy-MM-dd  00:00:00"-->
				    <el-date-picker
				      v-model="value6"
				      value-format="yyyy-MM-dd"
				      type="daterange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期">
				    </el-date-picker>
		  </div>
    	 	
    	 	<a :href="xls_adress" :class="{icrr:abc_currt==0}" class="ok_downlaod"><p class="r btn_01" @click="Exl_report">导出</p></a>
    	   	<p class="r btn_01" :class="{icrr:abc_currt==1}" @click="warning_Exl_report" style="color: #979aa0;">导出</p>
    	 	<p class="r btn_02" @click="btn_selectdata(1,'select')">查询</p>
    	 	
    	 
    	 	
    	 </div>

    	<div class="table_info" >
    		 <div class="table_ltop">
    		 	<ul><li>设备名称</li><li>区域名称</li><li>告警级别</li><li>告警类型</li><li>告警内容</li><li>告警值</li><li>告警条件</li><li>告警时间</li><li>恢复时间</li></ul>
    		 	<div class="table_ltop data_item_gh">
    		 		<p  v-if="(!arrs_page.length)" style="background: #0b3975;height: 65px; line-height: 65px;">暂无数据</p>
    		   	<ul v-for="(item,key) in arrs_page">
    		   		<li> {{item.DeviceName}}</li>
    		   		<li> {{item.AreaName}}</li>
    		   		<li>{{item.AlarmLevel}}</li>
    		   		<li>{{item.AlarmTypeName}}</li>
    		   		<li>{{item.AlarmText}}</li>
    		   		<li>{{item.AlarmData}}</li>
    		   		<li>{{item.LimitValue}}</li>
    		   		<li>{{item.AlarmTime}}</li>
    		   		<li>{{item.RecoveryTime}}</li>
    		   		<!--<li>1#变压器</li>
    		   		<li>商业配电房</li>
    		   		<li>3</li>
    		   		<li>超温告警</li>
    		   		<li>超温告警</li>
    		   		<li>85</li>
    		   		<li>>80</li>
    		   		<li>2018.10.12  9:15:20</li>
    		   		<li>2018.10.12  9:15:20</li>-->
    		   	</ul>
    		   	
    		   	
    		   </div>
    		 	</div>
	 
    	</div>
    	
    <el-pagination
		  :page-size="pagesize"
		  :pager-count="11"
		  @current-change="btn_selectdata"
		  layout="prev, pager, next"
		  :current-page="currentPage"
		  :total="Total_count">
		</el-pagination> 
    	
    </section>
   </section> 
  <!--弹出框-->
		  <el-dialog
		  custom-class="aabbb"
		  title="选择设备类型"
		  :visible.sync="dialogVisible"
		  width="677px"
		 :before-close="handleClose">
		  <div  class="myHtml">
		  <!--这是一段信息-->
		  <!--<div class="tree_search">
		  	<input  placeholder="请输入关键字"/>
		  </div>-->
		   <el-tree :data="tree_info" :props="defaultProps" node-key="pppp" @node-click="handleNodeClick"></el-tree>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="btn_click">确 定</el-button>
		  </span>
		</el-dialog>
   <!--弹出框-->
   
   
   

  
  </div>
</template>
 <style>
 	
.history_count .el-pagination{ float: left; margin-left: 18px; margin-top: 10px;}
.history_count .el-pager li{ background: none; color: #2A91FC;}
.history_count .el-pager li.active{color: #fff; font-size: 16px;}
.history_count  .el-pagination .btn-next,.ab_container  .el-pagination .btn-prev{background:none; color: #2A91FC;}
 .history_count .icrr	{ display: none;}
  .history_count .ok_downlaod	{ color: #fff;}
 	
.history_count .el-input__inner{ height: 46px; line-height: 46px; background: #042E74; border: none; width: 328px;}
 /*.history_count .ele_outbox .el-range-input{ color: #fff;}*/
 .history_count  .el-date-editor .el-range-separator{ color: #fff; line-height: 42px;}
 .history_count .el-range-editor .el-range-input{background: #042E74; color: #fff;}
 .history_count	.el-range-editor.el-input__inner{ background: #042E74;}
 	
.time_inputs{ width: 300px ; height: 46px; float: left;}
 .aabbb{background: url(/static/image/count/out/pop_bg_1.png)!important;}	
 .aabbb	.el-dialog__headerbtn{top: 31px;right: 35px;  font-size: 20px; }
 .aabbb .el-dialog__headerbtn .el-dialog__close{color: #fff;}
 .aabbb .el-dialog__body{ padding-bottom: 5px;}
 .aabbb .el-dialog__header{padding: 35px 0 0 45px;}
.aabbb .el-dialog__title{ text-align:left; color: #fff; float: left; }	
.aabbb  .myHtml{height:330px; text-align: left; padding: 0 25px; color: #fff;} 	
 .aabbb	.el-dialog__footer{ padding: 0px 55px  49px 0;}
 .aabbb .el-tree{ background: none; color: #fff; height: 287px; overflow: auto;}
  .aabbb .el-tree .el-tree-node__content:hover{color: #30a6ec;background:none }
   .aabbb .el-tree-node:focus>.el-tree-node__content{ background:none;color: #30a6ec;}
   .aabbb .el-icon-caret-right:before {
     color: #31a1ff;
    font-size: 16px;
}
 
.aabbb .tree_search{ height: 48px; border: solid 1px #36AAEC; width: 545px; margin: 15px auto; background: url(/static/image/count/out/button_search.png) no-repeat 9px 10px;}
 .aabbb .tree_search input{ height: 30px; width: 485px; padding:8px 0 0 50px; background:none; border: none; color: #fff; font-size: 14px;}

  
  
 .select01{height: 33px; width: 100%;  background: none;border: none;color: #fff;appearance:none;-moz-appearance:none;-webkit-appearance:none;outline: none; text-indent: 5px;} 
 .select01 option{color: #000; height: 35px; line-height: 35px;} 
  
  
#history_count .el-pagination{ float: left; margin: 15px 0 0 22px;}  

.alert_notice .el-message-box__message p{ text-align: center; color: red;}

 </style>
<script>
	import * as comm from '../../assets/js/pro_common';
 export default {
    data() {
      return {
      	value01:'',//用户输入第一个选择框
      	value6:'',//时间选择参数
        dialogVisible: false,//弹出框参数
        defaultProps: { //树形菜单参数
          //children: 'children',
          //label: 'label',
          children: 'DeviceTypes',
          label: 'DeviceTypeName',
         
        },
         /*tree_data: [{    //树形菜单数据
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }],*/
        tree_info:[],//树形菜单数据
        tree_check:{},//点击树形菜单得到id及name
        value_tree:'',//点击树形菜单值显示在输入框内
        
        AlarmType:{},//告警类型
        Alarm_Typeid:0,//告警类型id,默认为0，
        Alarm_lev:["全部","提示","一般","严重"], //告警级别
        Alarm_levid:0,//告警级别 对应id,默认为0
        
        
         arrs_page:"",     //点击页码，显示的数据
         currentPage:1,   //默认当前页
         pagesize:9,    //默认每页显示几条
         Total_count:null, //总共有几条数据
        
        xls_adress:"", //导出exl文件的url
        get_currStart_time:comm.CurentTime().clock.split(" ")[0]+" 00:00:00",//当天时间，时分秒为00：00：00,如果用户没有选择时间，就取当天时间
        get_currEnd_time:comm.CurentTime().clock.split(" ")[0]+" 23:59:59",//当天时间，时分秒为00：00：00,如果用户没有选择时间，就取当天时间
        abc_currt:1,
      };
    },
    methods: {
     handleClose(done) {  /*弹出框事件*/
    	//this.value_tree=this.tree_check.DeviceTypeName //把树形值显示在输入框
     	done();
     },
     
     tree_input_click(){
     	let _this=this;
     	this.dialogVisible=true;
     	 _this.tree_info=[];
     	/*获取树型菜单数据*/
	  	      _this.$axios.post(_this.mypro+'Caiot/System',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"QuerySystemDeviceTypeToTree",
						        "FVersion":"1.0.0",
						        "ProjectID":localStorage.getItem("projectid")
							}).then(function(jsons){
								let o={
									"DeviceTypeID":0,
									"DeviceTypeName":"全部",
									"DeviceTypes":"",
									"$treeNodeId":"0"
								}
								/*加个全部选择*/
				
						  // 	_this.tree_info.push(o)
							    var a = jsons.data.FObject.slice(0);
     //使用unshift方法向a开头添加item
                  a.unshift(o);
							  _this.tree_info=a
							  
								 console.log(jsons.data.FObject)
								
								 

							}).catch(function(err){
							
							});
  	
  	 /*end of 获取树型菜单数据*/
     	
     	
     	
     },
     
     btn_click(){  //弹出框确定铵钮
     //	console.log(this.tree_check)
     	this.value_tree=this.tree_check.DeviceTypeName //把树形值显示在输入框
     	this.dialogVisible=false;
     
     },
     
     handleNodeClick(data) {/*树形菜单事件*/
    	this.tree_check.DeviceTypeID=data.DeviceTypeID; //点击树形菜单得到id
    	this.tree_check.DeviceTypeName=data.DeviceTypeName;//点击树形菜单得到name
    	//console.log(this.tree_check)
      //console.log(data);
     },
     
     /*查询数据按钮*/
     btn_selectdata(val,s){	

     	if(s=="select"){  //当时查询按钮时，返回第一页页码
     			this.currentPage=1
     	}else{
     		this.currentPage=val
     	}
     
     //	console.log(val)
     	/*table告警大列表内容*/
     	 var _this=this; 
     	if(this.value_tree==""){ //如果用户没有选择设备类型，默认为0
     	 this.tree_check.DeviceTypeID=0
     	}
     	
     	
  	_this.$axios.post(_this.mypro+'Caiot/Alarm',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"QueryCaiotHistoryAlarmByProject",
						        "FVersion":"1.0.0",
						        "ProjectID":localStorage.getItem("projectid"),
						        "SearchKey":_this.value01,//第一个输入框
						        "DeviceTypeID":_this.tree_check.DeviceTypeID,   //选择中树形菜单的有值对应的id
						        "AlarmLevel":_this.Alarm_levid,//告警级别 (1~N的数字)
						        "AlarmTypeID":_this.Alarm_Typeid,//告警类型ID
						        "StartDateTime":_this.value6==""?_this.get_currStart_time:_this.value6[0]+" "+"00:00:00",//开始时间
						        "EndDateTime":_this.value6==""?_this.get_currEnd_time:_this.value6[1]+" "+"23:59:59",//结束时间
						        "PageIndex":this.currentPage,  //默认为第一页
						        "PageSize":_this.pagesize,   //每页显示10条
       
							}).then(function(jsons){
								_this.Total_count=jsons.data.FObject.Table[0].FTotalCount
								_this.arrs_page=jsons.data.FObject.Table1
								//  console.log(jsons.data.FObject)
							}).catch(function(err){
							
							});
  	
  	      this.Exl_report("start")
  	/*table告警大列表内容*/
     },
     
     warning_Exl_report(){
     	if(this.value6!=""){
     	    let v1=this.value6[1].split(" ")[0],v2=this.value6[0].split(" ")[0]
		     	let sut=v1.replace(/-/g,"")-v2.replace(/-/g,"")
		     		if(sut>7){
		     			this.$alert('    最多导出七天的数据！', '提示', {
		     			customClass:"alert_notice",
		          dangerouslyUseHTMLString: true
		      });
     	  }
     	}
     },
     /*导出数据按钮*/
     Exl_report(s){
     	/*如果时间大于7天，或不选时间，提示用户，最多导出七天的数据*/
     /*	if(!s){
     	   if(this.value6!=""){
     	    let v1=this.value6[1].split(" ")[0],v2=this.value6[0].split(" ")[0]
		     	let sut=v1.replace(/-/g,"")-v2.replace(/-/g,"")
		     		if(sut>7){
		     			this.$alert('    最多导出七天的数据！', '提示', {
		     			customClass:"alert_notice",
		          dangerouslyUseHTMLString: true
		      });
     	  }
     	}
     	}*/
     	    

     	/*table告警大列表内容*/
     	 var _this=this; 
     	if(this.value_tree==""){ //如果用户没有选择设备类型，默认为0
     	 this.tree_check.DeviceTypeID=0
     	}
     	
     	
  	_this.$axios.post(_this.mypro+'Caiot/Alarm',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"CreateCaiotHistoryAlarmByProject",
						        "FVersion":"1.0.0",
						        "ProjectID":localStorage.getItem("projectid"),
						        "SearchKey":_this.value01,//第一个输入框
						        "DeviceTypeID":_this.tree_check.DeviceTypeID,   //选择中树形菜单的有值对应的id
						        "AlarmLevel":_this.Alarm_levid,//告警级别 (1~N的数字)
						        "AlarmTypeID":_this.Alarm_Typeid,//告警类型ID
						        "StartDateTime":_this.value6==""?_this.get_currStart_time:_this.value6[0]+" "+"00:00:00",//开始时间
						        "EndDateTime":_this.value6==""?_this.get_currEnd_time:_this.value6[1]+" "+"23:59:59",//结束时间
						        "PageIndex":this.currentPage,  //默认为第一页
						        "PageSize":_this.pagesize,   //每页显示10条
       
							}).then(function(jsons){
								//_this.Total_count=jsons.data.FObject.Table[0].FTotalCount
								//_this.arrs_page=jsons.data.FObject.Table1
								 _this.xls_adress=_this.mypro+jsons.data.FObject
								if(jsons.data.FObject.length>0){ //两个导出铵钮，一个没有<a href>, abc_currt=0/1,做切换
									 _this.abc_currt=1
								}else{
									_this.abc_currt=0
								
								}
								 
								 // console.log(jsons.data.FObject)
							}).catch(function(err){
							
							});
  	
     }
     
     
     
    },
   mounted:function(){
  	   var _this=this; 
  	   /*设置默认时间*/
  	    let arrs=[];
  	    let tt=comm.CurentTime().clock.split(" ")[0]//设置时间插件显示时间
  	    arrs.push(tt)
  	    arrs.push(tt)
			 this.value6=arrs
  	 /*设置默认时间*/
  	
  	
  	/*告警类型*/ 	   
  	   _this.$axios.post(_this.mypro+'Caiot/System',{
						        "FTokenID":localStorage.getItem("Token"),
						        "FAction":"QuerySystemAlarmType",
						        "FVersion":"1.0.0",
						        "ProjectID":localStorage.getItem("projectid")
							}).then(function(jsons){
								_this.tree_info=jsons.data.FObject
								// console.log(jsons.data.FObject)
                 _this.AlarmType=jsons.data.FObject
							}).catch(function(err){
							
							});
  	
  	
  	/*end of 告警类型*/
  	
  	
   	_this.btn_selectdata()
   	_this.Exl_report("start")

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
 .ab_container .cout_title{ height: 50px; padding: 55px 15px 0 25px ;}
  .ab_container .cout_title p{ height: 46px; line-height: 46px; padding: 0; text-align: center;}
  .ab_container .cout_title p.text{ font-size: 17px; padding: 0 15px;}
  .ab_container .cout_title input{ height: 33px; width: 100%; text-indent: 5px; background:none; border: none; color: #fff;}	
  .ab_container .cout_title .put01{ width: 116px; height: 46px; background: url(/static/image/count/button_bg_1.png);}
  .ab_container .cout_title .put02{ width: 116px; height: 46px; background: url(/static/image/count/button_nor_Equipment.png);}
  .ab_container .cout_title .put03{ width: 116px; height: 46px; background: url(/static/image/count/button_nor_down.png); text-indent: 5px;}
 	.ab_container .cout_title .put04{ width: 116px; height: 46px; background: url(/static/image/count/button_nor_down.png);}
 	.ab_container .cout_title .put05{ width: 174px; height: 46px; background: url(/static/image/count/button_nor_time.png);}
 	
 	.ab_container .cout_title p.btn_01{ width: 88px; height: 46px; text-indent:25px;background: url(/static/image/count/btn1.png); margin: 0 10px; cursor: pointer;}
 		.ab_container .cout_title p.btn_01:hover{background: url(/static/image/count/btn2.png);}
  .ab_container .cout_title p.btn_02{ width: 88px; height: 46px;text-indent:25px;background: url(/static/image/count/btn3.png);cursor: pointer;}
 	.ab_container .cout_title p.btn_02:hover{background: url(/static/image/count/btn4.png);}
/* .ab_container .el-input__inner {
    background: none;
    border: none;
    font-size: 14px;
    color: #6A7DB1; 
}*/
/* .ab_container	.el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #254c84;
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
}*/
 .ab_container .el-input__icon{ line-height: 30px;}

.table_info{width: 97%; margin: 0 auto; height: 700px;  margin-top: 25px; border: solid 1px #112e6a;  background: #03234c;}
 .table_ltop{ height: 65px; font-size: 14px; }
 .table_ltop ul{padding: 0 15px; overflow: hidden; cursor: pointer;}
 .table_ltop ul li{ height: 65px;line-height: 65px; float: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap; }
 .table_ltop ul li:nth-child(1){ width: 150px;}
 .table_ltop ul li:nth-child(2){ width: 150px;}
 .table_ltop ul li:nth-child(3){ width: 150px;}
 .table_ltop ul li:nth-child(4){ width: 150px;}
 .table_ltop ul li:nth-child(5){ width: 150px;}
 .table_ltop ul li:nth-child(6){ width: 150px;}
 .table_ltop ul li:nth-child(7){ width: 150px;}
 .table_ltop ul li:nth-child(8){ width: 180px;}
 .table_ltop ul li:nth-child(9){ width: 180px;}
 
 .data_item_gh ul:hover{ background: #1e4483!important;}
 
 .data_item_gh ul:nth-child(even){
        background-color:#052d68;
    }
    /*偶数*/
 .data_item_gh ul:nth-child(odd){
     background-color: #0b3975;
 }
  
</style>
