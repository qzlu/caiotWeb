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
                    <el-form-item label="账号" prop="FUserName" :rules="[{ required: true, message: '请输入账号'}]">
                        <el-input v-model="addFormData.FUserName"></el-input>
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
        <ul class="user-head clearfix">
            <li class="l user-head-add" @click="add">新增</li>
            <li class="l user-head-export" @click ="exportUser()">导出</li>
            <li class="l user-head-refrest" @click="pageIndex=1;filterText = '';queryData()">刷新</li>
            <li class="r">
                <el-input class="search" v-model="filterText"></el-input>
                <i class="el-icon-search"></i>
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
                        <span @click="deleteUser(scoped.row.FGUID)">删除</span>
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
        return{
            tableLabel:[
                {
                    prop: 'RowNum',
                    label: '序号'
                },
                {
                    prop: 'ProjectName',
                    label: '所属项目'
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
                    prop: 'FUserName',
                    label: '账号'
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
            })
            .catch(err => {

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
         * @param {type String} guid 用户唯一ID
         */
        async deleteUser(guid){
            await new Promise(resolve => {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    resolve()
                }).catch(() => {

                });
            })
            system({
                FAction:'DeleteTUsers',
                FGUID:guid
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
         * exportUser 导出
         */
        exportUser(){
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
        margin-bottom: 15px;
        li{
            width: 44px;
            height: 46px;
            line-height: 46px;
            margin-left: 10px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(241,241,242,1);
            font-size: 14px;
            padding-left: 44px;
            text-align: left;
            cursor: pointer;
        }
        &-add{
            background: url('#{$img-url}admin/added.png') #0a3c7b no-repeat 16px 13px;
        }
        &-export{
            background-image: url('#{$img-url}count/btn1.png')
        }
        &-refrest{
            background-image: url('#{$img-url}count/btn3.png')
        }
        li:last-of-type{
           width: auto;
           position: relative;
        }
        .search{
            width: 174px;
            .el-input__inner{
                width:174px;
                height:46px;
                background:rgba(0,80,153,1);
                border:1px solid rgba(12,55,110,1);
                color: white
            }
        }
        .el-icon-search{
            position: absolute;
            left: 182px;
            top: 10px;
            font-size: 24px;
            color: #2A91FC;
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
