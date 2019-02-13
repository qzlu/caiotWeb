<template>
    <div class="user-main">
        <!-- 新增或编辑用户弹框 -->
        <div class="config-dialog">
            <el-dialog  :title="title" :visible.sync="show" width="676">
                <el-form :model='addFormData' ref='form' inline>
                    <el-form-item label="所属角色" prop="FRoleGUID" :rules="[{ required: true, message: '请选择'}]">
                      <el-select v-model="addFormData.FRoleGUID"   placeholder="请选择角色">
                        <el-option v-for="role in roleList" :key="role.FGUID" :label="role.FName" :value="role.FGUID"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="用户名称" prop="FUserNickname" :rules="[{ required: true, message: '请输入用户名称'}]">
                        <el-input v-model="addFormData.FUserNickname"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="FUserName" :rules="FUserNameRule">
                        <el-input v-model="addFormData.FUserName"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="FContacts" :rules="[{ required: true, message: '请输入联系人'}]">
                        <el-input v-model="addFormData.FContacts"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="FTelephone" :rules="FTelephoneRule">
                        <el-input v-model="addFormData.FTelephone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="FPassword">
                        <span style="margin-left:10px;">{{addFormData.FPassword}}</span>
                        <!-- <el-input v-model="addFormData.FPassword" :disabled="true"></el-input> -->
                    </el-form-item>
                </el-form>
                <div class="submit">
                    <button class="zw-btn zw-btn-primary" @click="submit()">确定</button>
                </div>
            </el-dialog>
        </div>
        <ul class="user-head clearfix report-header">
            <li class="l" @click="add"><button class="zw-btn zw-btn-add">新增</button></li>
            <li class="l" @click ="exportFile()"><button class="zw-btn zw-btn-export">导出</button></li>
            <li class="l" @click="pageIndex=1;filterText = '';queryData()"><button class="zw-btn zw-btn-refrest">刷新</button></li>
            <li class="r">
                <el-input class="search-input" v-model="filterText" placeholder="搜索用户关键字">
                     <i class="el-icon-search" slot="suffix"></i>
                </el-input>
                <button class="zw-btn zw-btn-primary" @click="filterText = '' ">重置</button>
            </li>
        </ul>
        <div class="role-table">
            <el-table
               :data="tableData"
               style="width: 100%"
               header-row-class-name="el-table-header"
               :row-class-name="tableRowClassName"
               >
               <el-table-column
                 v-for="item in tableLabel"
                 show-overflow-tooltip
                 :key="item.prop"
                 :prop="item.prop"
                 :label="item.label"
                >
               </el-table-column>
               <el-table-column
                 prop=""
                 label="操作">
                 <template slot-scope="scoped">
                     <div class="user-operation">
                        <span @click="deleteUser(scoped.row)">删除</span>
                        <span @click="updateUser(scoped.row)">编辑</span>
                        <span @click="resetUsers(scoped.row)">初始化</span>
                     </div>
                 </template>
               </el-table-column>
            </el-table>
        </div>
        <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
    </div>
</template>
<script>
import {system} from '@/request/api.js'//api接口（接口统一管理）;
import table from '@/mixins/table' //表格混入数据
import {zwPagination} from '@/zw-components/index'
export default {
    mixins:[table],
    data(){
        const validateUserName = (rule,value,callback) => {  
 			var uPattern = /^[a-zA-Z0-9_]{3,16}$/;
	        if(!value) {
	            return callback(new Error('请输入用户名'));
	          }
	        else if(value&& uPattern.test(value)){
	         	callback();
	        } else{
	        	callback(new Error('请输入(3~10)位字母、数字、_'));
	        }
        };
        const phoneNumbre = (rule, value, callback) => {
            var isPhone = /^0?1[3|4|5|7|8][0-9]\d{8}$/;//手机号码
            var isMob= /^([0-9]{3,4}-)?[0-9]{7,8}$/;// 座机格式
            if(isMob.test(value)||isPhone.test(value)){
                callback();
            }
            else{
               callback(new Error('请输入正确的电话号码'));
            }
        }
        return{
            tableLabel:[
                {
                    prop: 'RowNum',
                    label: '序号'
                },
                {
                    prop: 'FUserName',
                    label: '账号'
                },
                {
                    prop: 'FUserNickname',
                    label: '用户名称'
                },
                {
                    prop: 'FName',
                    label: '所属角色'
                },
                {
                    prop: 'ProjectName',
                    label: '所属项目'
                },
                {
                    prop: 'FPassword',
                    label: '密码'
                }
            ],
            roleList:null, // 新增或修改弹框中的角色列表
            //新增用户默认数据
            defaultFormData:{
                FGUID:'',
                FUserName:'',
                FPassword:'123456',
                FUserNickname:null,
                FUserType:'',
                FState:1,
                FContacts:'',
                FTelephone:'',
                FEMailAddress:'',
                FIMG:'',
                FRoleGUID:null
            },
            //新增或修改用户数据
            addFormData:{
                FGUID:'',
                FUserName:'',
                FPassword:'123456',
                FUserNickname:null,
                FUserType:'',
                FState:1,
                FContacts:'',
                FTelephone:'',
                FEMailAddress:'',
                FIMG:'',
                FRoleGUID:null
            },
            title:'新增', //新增或修改用户弹框标题
            show:false, //控制新增弹框是否显示
            type:0,  // 0 :新增用户 1：修改用户
            FUserNameRule: [{required: true, validator: validateUserName}],//用户名规则
            FTelephoneRule:[{required: true, validator: phoneNumbre}], //联系方式规则
            filterText:''
        }
    },
    components:{
        zwPagination
    },
    watch:{
        filterText(){
            clearTimeout(timer)
            var timer = setTimeout(() => {
                this.queryData(this.filterText)
            },500)
        }
    },
    created(){
        this.queryData()
        this.queryRoleData()
    },
    mounted(){

    },
    methods:{
        /**
         * queryRole 分页查询查询用户
         * @param {type String} userName 用户名
         * @param {type Number} pageIndex 页码
         */
        queryData(userName = '',pageIndex = 1) {
            system({
                FAction:"QueryPageTUsers",
                FUserName:userName,
                PageIndex:pageIndex,
                PageSize:10,
                ProjectID:localStorage.getItem("projectid")
            })
            .then(data => {
                this.total = data.FObject.Table[0].Count
                this.tableData = data.FObject.Table1
                this.tableData.forEach(item => {
                    item.ProjectName = item.ProjectName.replace(/,$/,'')
                })
            })
            .catch(err => {
                console.log(err);
            })
        },
        /**
         * queryRoleData 分页查询查询角色
         * @param {type Number} pageIndex 页码
         */
        queryRoleData(pageIndex = 1) {
            system({
                FAction:"QueryPageDataByTRole",
                FName:"",
                PageIndex:pageIndex,
                PageSize:1000000
            })
            .then(data => {
                this.roleList = data.FObject.Table1
            })
            .catch(err => {

            })
        },
        /**
         * handleCurrentChange 页码改变时触发
         */
        handleCurrentChange(val){
            this.pageIndex = val
            this.queryData(this.filterText,val)
        },
        /**
         * add 点击新增按钮
         */
        add(){
            this.title = '新增'
            this.type = 0
            this.show = true,
            this.addFormData = Object.assign({},this.defaultFormData)
        },
        /**
         * updateUser 编辑用户
         */
        updateUser(item) {
            this.title = '修改'
            this.show = true
            this.type = 1
            for(let key in this.addFormData){
                this.addFormData[key] = item [key]?item [key]:''
            }
            this.addFormData.FPassword = '123456'
            this.addFormData.FState = 1
        },
        /**
         * resetUsers 初始化
         */
        async resetUsers(item){
            await new Promise(resolve => {
                this.$confirm('是否初始化？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    resolve()
                }).catch(() => {

                });
            })
            this.type = 1
            for(let key in this.addFormData){
                this.addFormData[key] = item [key]?item [key]:''
            }
            this.addFormData.FPassword = '123456'
            this.addFormData.FState = 1
            this.addUser()
        },
        async submit(){
            await new Promise(resolve => {
                this.$refs.form.validate((valid) => {
                  if (valid) {
                      resolve()
                  } 
                });
            })
            this.addUser()
        },
        /**
         * addUser 新增或修改用户
         * 
         */
        addUser(){
            system({
                FAction:this.type?'UpdateTUsers':'AddTUsers',
                FRoleGUID:this.addFormData.FRoleGUID,
                mTUsers:this.addFormData
            })
            .then(data => {
                this.show = false
                this.queryData()
                this.$message({
                  type: 'success',
                  message: this.type?'修改成功！':'新增成功！'
                });
            })
            .catch(error => {
                this.$message({
                  type: 'error',
                  message: error
                });
            })
        },
        /**
         * deleteRole 删除用户
         * @param {type String} user 用户
         */
        async deleteUser(user){
            await new Promise(resolve => {
                this.$DeleteMessage([user.FUserName,'删除用户'])
                .then(() => {
                    resolve()
                })
                .catch(() => {
                })
            })
            system({
                FAction:'DeleteTUsers',
                FGUID:user.FGUID
            })
            .then(data => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.queryData()
            })
            .catch(error => {
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
            })
        },
        /**
         * exportFile 导出
         */
        exportFile(){
            system({
                FAction:'QueryExportTUsers',
                FUserName:this.filterText,
                FName:''
            })
            .then(data => {
                window.location = "http://www.szqianren.com/" + data.FObject;
            })
            .catch(error => {
                this.$message({
                  type: 'error',
                  message: '导出失败!请重试'
                });
            })
        }   
        
    }
}
</script>
<style lang='scss'>
$img-url:'/static/image/';
.user-main{
    height: 920px;
    padding: 56px 46px 85px 57px;
    position: relative;
    box-sizing: border-box;
    background: url('#{$img-url}index/count_back.png') center no-repeat;
    .user-head{
        li:last-of-type{
           width: auto;
           position: relative;
        }
        .zw-btn{
            margin-left: 10px;
        }
    }
    .user-operation{
        span{
            cursor: pointer;
        }
        span:nth-of-type(2){
            margin: 0 20px;  
        }
    }
    // 新增或编辑弹框样式
    .config-dialog{
        .el-dialog{
            width: 676px;
            height: 528px;
            box-sizing: border-box;
            background: url('#{$img-url}admin/btn3.png') center no-repeat;
            text-align: left;
            padding-left: 48px;
            &__title{
                color: #F1F1F2;
                font-size: 17px;
                font-weight:400;
            }
            &__headerbtn{
                right: 40px;
                .el-dialog__close{
                    color: #9FC1FD;
                    font-size: 16px;
                }
            }
            .el-form{
                &-item{
                    .el-form-item__label{
                        width: 80px;
                        color: #F1F1F2;
                    }
                    .el-input{
                        width: 165px;
                        .el-input__inner{
                            background: #05679E;
                            border-color: #18406B;
                            color: #F1F1F2;
                        }
                    }
                }
                &-item:nth-of-type(2n){
                    margin-left: 30px;
                }
            }
            .submit{
                text-align: center;
                margin-top: 37px;
            }
        }
    }
}
</style>
