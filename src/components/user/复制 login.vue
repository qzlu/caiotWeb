<template>
	<div class="scree_fix">
		
  <div class="login_center">
		<div class="l_pay_item"></div>
		
		
   <div class="login_item">
		  <div class="title"><router-link :to="{ name: 'home',}"><img src="/static/image/user/logo_1.png" /></router-link></div>			
		  <div class="lcen">
				
				<h1>用户登录</h1>
			<!-- 	<div class="name">
					<label class="name-label _uname" for="user_name"></label>
					<input name="user_name" type="text" class="itemsy" placeholder="用户名">
				</div>
				
				<div class="passw">
					<label class="name-label _uname" for="passw"></label>
					<input name="passw" type="password" class="itemsy" placeholder="密码">
				</div>
	
	     <div class="stoage">
				 <span class="s-a" :class="{'active0':isActive==0,'active1':isActive==1}" @click="ch_active()"></span><span class="s-b">住密码</span>
			 </div>
	      <div class="btn_go">
					<a href="javascript:;" style="outline: none;">登 录</a>
				</div> -->
				
				<!-- 自定义 -->
				
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0px" class="demo-ruleForm login_box">
					<p class="ng_name"></p>
					<p class="ng_pw"></p>
					<el-form-item label="" prop="username" >
						<el-input type="text" v-model="ruleForm2.username" auto-complete="off" ></el-input>
					</el-form-item>
					<el-form-item label="" prop="checkPass">
						<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
					</el-form-item>
					<div class="stoage" >
						<span class="s-a" :class="{'active0':isActive==0,'active1':isActive==1}" @click="ch_active()"></span><span class="s-b">用户和密码</span>
					</div>
					<div class="btn_go">
						<a href="javascript:;" style="outline: none;"  @click="submitForm('ruleForm2')">登 录</a>
					</div>
					 <!--
					<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm2')" class="btn_sumit">提交</el-button>
						 <el-button @click="resetForm('ruleForm2')" class="btn_resumit">重置</el-button> 
					</el-form-item>
					-->
				</el-form>
				
				
	
			</div>
	 </div>	

  </div>
	
</div>	
</template>

<script>
	
	
	export default {
    data() { var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          /* if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          } */
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
      	console.log("---?>>>>")
      	console.log(value)
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
		 callback();

		}
      };
      
      return {
      
		isActive:0,
        ruleForm2: {
          username: '',
          checkPass: '',
         
        },
        rules2: {
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
      	
        this.$refs[formName].validate((valid) => {
        	
        	 let _this=this;
          if (valid) {
          	
          	  this.$axios.post(this.mypro+'Caiot/Check',{
			 // FUserName:'szqr',
			 // FPassword:'123456',
			  FUserName:this.ruleForm2.username,
			  FPassword:this.ruleForm2.checkPass,
			  FAction:"Web",
			  FVersion:"1.0.0",
			})
			.then(function(datas){		
				//console.log(datas.data.Result)
				if(datas.data.Result==200){
					 _this.$message({
					  message: '登录成功！',
					  type: 'success'
						});
							
						_this.getprojectID()
					setTimeout(function(){
						_this.$router.push({path: 'home', });
					},1000)
                    
						
						
				}else{
					
					_this.$message.error('用户名或密码错误,请重新输入！');
					
				     _this.$refs[formName].resetFields();
					
				}
				
			})
			.catch(function(err){
			
			});



							
							
          } else {
						
				if(this.ruleForm2.username!=""&& this.ruleForm2.checkPass!=""){
				 this.$message.error('密码或用户名错误!');
				}
            
          
					 
           this.ruleForm2.username=""
           this.ruleForm2.checkPass=""
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      
      getprojectID(){

      	let _this=this;
				 _this.$axios.post(_this.mypro+'Caiot/Project',{
						        "FTokenID":"43324155-7af5-475b-ad7d-50321483f945",
						        "FAction":"GetProject",
						        "FVersion":"1.0.0",
						        
						        
							}).then(function(jsons){
			
								localStorage.setItem("projectid",jsons.data.FObject[0].ProjectID);
							    localStorage.setItem("projectname",jsons.data.FObject[0].ShortName);
								

								
							}).catch(function(err){
							
							});
      	
      	
      	
      },
      
      
      
		ch_active(){ //记住用户名和密码
				
				let u=this.ruleForm2.username;
                let p=this.ruleForm2.checkPass;
              
			if(this.isActive==0){
				
				localStorage.setItem('name',u);
				localStorage.setItem('password',p);
                  
				this.isActive=1

			}else{
				  localStorage.setItem('name','');
				 localStorage.setItem('password','');
				this.isActive=0
				
			}
		  }
    },
		
		created(){
			//local:{u:'',p:''}, //记录用户名本地存储
			
            let user=  localStorage.getItem('name');
            let pw= localStorage.getItem('password');
            if(user&&pw) this.isActive=1
               this.ruleForm2.username=user;
               this.ruleForm2.checkPass=pw;
           

		
		},
		
		
		
		
  }
	


</script>
<style>
	.l_pay_item{ position: absolute;top: 0; left: 0; width:960px; height: 880px; background: url(/static/image/user/bgicon3.png) no-repeat ;}
	
	
	.login_box{position: relative;}
	.login_box input{height: 76px; border: solid 1px #3fb0fe; background: #162953;padding-left: 60px; color: #c5cfd9;}
	.login_box .ng_name{ width: 27px; height: 27px; position: absolute;top: 23px; left:18px;  background: url(/static/image/user/icon_2.png) no-repeat ; z-index: 55;}
	.login_box .ng_pw{ width: 27px; height: 33px; position: absolute;top: 130px; left:18px;  background: url(/static/image/user/icon_1.png) no-repeat 0 0; z-index: 55;}
.login_box .el-form-item {
    margin-bottom: 32px;
}
.login_box .el-input__inner{border-radius:0}
.login_box .el-form-item__content{ text-align: left;}
.login_box .btn_sumit{ padding:23px 155px; font-size: 30px; border-radius:0}
.login_box .el-button--primary{background-color: #0ba5ff;}
.login_box .el-form-item__error{ padding-top: 12px;}
.login_box .el-input{ font-size: 25px;}

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
.scree_fix{ position:absolute;top: 0; left: 0; right: 0; bottom: 0;background: #0a0929;/* display: flex;justify-content:center;align-items:center */}
.login_center{ width: 1920px; height: 1080px; background: url(/static/image/user/bg.png); margin: 0 auto; position: relative;}
.login_item{ width: 627px; height:567px; float: right; position:absolute; top:230px; right: 86px;}
.login_item .title{ margin-bottom: 27px;}
.login_item .lcen{ width: 461px; padding: 0 83px; height: 485px;  background: url(/static/image/user/bg_blue.png); }
.login_item .lcen h1{ font-size: 30px; color: #3aaffc; padding: 30px 0 26px 0;}
.login_item .lcen .name{ height: 76px; border: solid 1px #3fb0fe;}
.login_item .lcen .passw{ height: 76px; border: solid 1px #3fb0fe; margin: 26px 0 42px;}

.login_item .lcen .name .name-label,.login_item .lcen .passw .name-label {
    width: 41px;
    height: 42px;
    display: block;
    float: left;
    margin: 23px 0 0 20px;
}

.login_item .lcen .name ._uname {
    background: url(/static/image/user/icon_2.png) no-repeat 0 0;
}

.login_item .lcen .passw ._uname {
    background: url(/static/image/user/icon_1.png) no-repeat 0 0;
}


.login_item .lcen .name .itemsy,.login_item .lcen .passw .itemsy {
    height: 28px;
    line-height: 28px;
    width: 379px;
    padding: 24px 5px 5px 5px;
    border: 0 none;
    font-size: 26px;
		 color: #c5cfd9;
		 background: no-repeat; border: none;

}


.stoage{ height: 30px; text-align:left; line-height: 30px;}
.stoage span.s-b{  display: inline-block; float: left; font-size: 22px; padding: 0 0 0 22px; color: #c5cfd9;margin-top: -2px; }	
.stoage span.s-a{ width: 27px; height: 27px; display: inline-block;/* border: solid 1px #3fb0fe; */float: left; cursor: pointer;}
.stoage span.active0{background: url(/static/image/user/button_nor_1.png)}
.stoage span.active1{background: url(/static/image/user/button_sel_1.png)}
.btn_go{     
	  width: 100%;
    height: 78px;
		margin-top:22px ;
    line-height: 78px;
    font-size: 30px;
    color: #fff;
    text-align: center;
    display: block;
   
    cursor: pointer;}

.btn_go a{ color: #fff; background: #25a7f6; display: block;}
.btn_go a:active  {background: #016ead;}
::-moz-placeholder { color: #c5cfd9; }
::-webkit-input-placeholder { color:#c5cfd9; }
:-ms-input-placeholder { color:#c5cfd9; }












</style>
<style>
	/* body{ background: #0a0929;} */
</style>