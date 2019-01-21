

<template>
  <div class="container ele_outbox" style="background: none; text-align: center; ">
  	<section class="cout_allitem">
    <section class="ab_container" >
    	 <div class="cout_title">
    	 	<p class="l text">输入框</p><p class="ipt l put01"><input placeholder=" 请输入内容"  @click="dialogVisible = true" v-model="value1"></p>
    	 	<p class="l text">设备类型</p><p class="ipt l put02"><input placeholder=" 请输入内容"></p>
    	 	<p class="l text">告警级别</p><p class="ipt l put03"><input placeholder=" 请输入内容"></p>
    	 	<p class="l text">告警类型</p><p class="ipt l put04"><input placeholder=" 请输入内容"></p>
    	 	<p class="l text">时间段</p>
    	 	<div class="block time_inputs">
				   <!-- {{value6}}-->
				    <el-date-picker
				      v-model="value6"
				      type="daterange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期">
				    </el-date-picker>
		  </div>
    	 	
    	 	
    	 	<p class="r btn_02">刷新</p>
    	 	<p class="r btn_01">导出</p>
    	 
    	 	
    	 </div>

    	<div class="table_info" >
    		 <div class="table_ltop">
    		 	<ul><li>设备名称</li><li>区域名称</li><li>告警级别</li><li>告警类型</li><li>告警内容</li><li>告警值</li><li>告警条件</li><li>告警时间</li><li>恢复时间</li></ul>
    		 	<div class="table_ltop data_item_gh">
    		 		
    		   	<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li><li>2018.10.12  9:15:20</li></ul>
    		   	<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li><li>2018.10.12  9:15:20</li></ul>
    		   	<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li><li>2018.10.12  9:15:20</li></ul>
    		   	<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li><li>2018.10.12  9:15:20</li></ul>
    		   	<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li><li>2018.10.12  9:15:20</li></ul>
    		   	<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li><li>2018.10.12  9:15:20</li></ul>
    		   	<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li><li>2018.10.12  9:15:20</li></ul>
    		   	<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li><li>2018.10.12  9:15:20</li></ul>
    		   	<ul><li>1#变压器</li><li>商业配电房</li><li>3</li><li>超温告警</li><li>超温告警</li><li>85</li><li>>80</li><li>2018.10.12  9:15:20</li><li>2018.10.12  9:15:20</li></ul>
    		   	
    		   </div>
    		 	</div>
    		 
    	
    		 		 
    	</div>
    	
    	
    	
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
		  <div class="tree_search">
		  	<input  placeholder="请输入关键字"/>
		  	
		  </div>
		   <el-tree :data="tree_data" :props="defaultProps" node-key="pppp" @node-click="handleNodeClick"></el-tree>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
   <!--弹出框-->
   
   
   
   
  
  </div>
</template>
 <style>
.time_inputs{ width: 300px ; height: 46px; float: left;}
 .aabbb{background: url(/static/image/count/out/pop_bg_1.png);}	
 .aabbb	.el-dialog__headerbtn{top: 31px;right: 35px;  font-size: 20px; }
 .aabbb .el-dialog__headerbtn .el-dialog__close{color: #fff;}
 .aabbb .el-dialog__body{ padding-bottom: 5px;}
 .aabbb .el-dialog__header{padding: 35px 0 0 45px;}
.aabbb .el-dialog__title{ text-align:left; color: #fff; float: left; }	
.aabbb  .myHtml{height:330px; text-align: left; padding: 0 25px; color: #fff;} 	
 .aabbb	.el-dialog__footer{ padding: 0px 55px  30px 0;}
 .aabbb .el-tree{ background: none; color: #fff;}
  .aabbb .el-tree .el-tree-node__content:hover{color: #30a6ec;background:none }
   .aabbb .el-tree-node:focus>.el-tree-node__content{ background:none;color: #30a6ec;}
   .aabbb .el-icon-caret-right:before {
     color: #31a1ff;
    font-size: 16px;
}
 
.aabbb .tree_search{ height: 48px; border: solid 1px #36AAEC; width: 545px; margin: 15px auto; background: url(/static/image/count/out/search.png) no-repeat 9px 10px;}
 .aabbb .tree_search input{ height: 30px; width: 485px; padding:8px 0 0 50px; background:none; border: none; color: #fff; font-size: 14px;}
 .ab_container .el-input__inner{ height: 46px!important; background: #042E74!important;}
  .ab_container .el-range-input{ background: #042E74!important;color: #fff;}
  .ab_container  .el-date-editor .el-range-separator{ color: #eaf5f5;}
 </style>
<script>
 export default {
    data() {
      return {
      	value1:'',
      	value6: '',//时间选择参数
        dialogVisible: false,//弹出框参数
        defaultProps: { //树形菜单参数
          children: 'children',
          label: 'label'
        },
         tree_data: [{    //树形菜单数据
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        
      };
    },
    methods: {
     handleClose(done) {  /*弹出框事件*/
     	done();
     },
     handleNodeClick(data) {/*树形菜单事件*/
        console.log(data);
     },
     
     
    },
   mounted:function(){
  	var _this=this; 

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
  .ab_container .cout_title input{ height: 33px; width: 100%; background:none; border: none; color: #fff;}	
  .ab_container .cout_title .put01{ width: 116px; height: 46px; background: url(/static/image/count/button_bg_1.png);}
  .ab_container .cout_title .put02{ width: 116px; height: 46px; background: url(/static/image/count/button_nor_Equipment.png);}
  .ab_container .cout_title .put03{ width: 116px; height: 46px; background: url(/static/image/count/button_nor_down.png);}
 	.ab_container .cout_title .put04{ width: 116px; height: 46px; background: url(/static/image/count/button_nor_down.png);}
 	.ab_container .cout_title .put05{ width: 174px; height: 46px; background: url(/static/image/count/button_nor_time.png);}
 	
 	.ab_container .cout_title p.btn_01{ width: 88px; height: 46px; text-indent:25px;background: url(/static/image/count/btn1.png); margin: 0 10px; cursor: pointer;}
 		.ab_container .cout_title p.btn_01:hover{background: url(/static/image/count/btn2.png);}
  .ab_container .cout_title p.btn_02{ width: 88px; height: 46px;text-indent:25px;background: url(/static/image/count/btn3.png);cursor: pointer;}
 	.ab_container .cout_title p.btn_02:hover{background: url(/static/image/count/btn4.png);}
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
