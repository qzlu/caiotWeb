<template>
    <div class="report inspection-item">
        <el-dialog :title="type?'编辑':'新增'" :visible.sync="show" width="700px" class="zw-dialog">
            <el-form :model="addInfo" inline ref="form">
                <el-form-item label="项目名称"  prop='DeviceID'  :rules="[{ required: true, message: '请选择'}]">
<!--                   <el-select v-model="addInfo.ProjectID"  value-key="ProjectID" filterable  placeholder="请选择" >
                    <el-option v-for="list in projectList" :key="list.ProjectID" :label="list.ShortName" :value="list.ProjectID"></el-option>
                  </el-select> -->
                  <el-input readonly :value="projectName"></el-input>
                </el-form-item>
                <el-form-item label="区域名称" prop="AreaName" :rules="[{ required: true, message: '请输入'}]">
                    <el-input v-model="addInfo.AreaName">
                    </el-input>
                </el-form-item>
                <el-form-item label="区域位置" prop="Location" :rules="[{ required: true, message: '请输入'}]">
                    <el-input v-model="addInfo.Location">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="submit">
                <button class="zw-btn zw-btn-primary" @click="addOrUpdateUProject()">确定</button>
            </div>
        </el-dialog>    
        <ul class="report-header clearfix">
            <li class="l"><button class="zw-btn zw-btn-add" @click="beforeAdd">新增</button></li>
            <li class="l"><button class="zw-btn zw-btn-export" @click="exportFile">导出</button></li>
            <li class="l"><button class="zw-btn" style="width:120px;padding:0 10px" @click="exportUAreaQrCode"><i class="iconfont icon-QRcode" style="color:#3593ed"></i>导出二维码</button></li>
            <li class="r">
                <el-input class="search-input" placeholder="搜索关键字" v-model="filterText">
                    <i class="el-icon-search" slot="suffix"></i>
                </el-input>
            </li>
        </ul>
        <div class="zw-table">
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
                 :sortable="item.sortble"
                 :formatter="item.formatter"
                 show-overflow-tooltip
                >
               </el-table-column>
               <el-table-column
                 prop=""
                 label="操作">
                 <template slot-scope="scoped">
                     <div class="role-operation">
                        <span class="pointer" @click="updatedProject(scoped.row)">编辑</span>
                        <span class="pointer" @click="deleteULdas(scoped.row)">删除</span>
                     </div>
                 </template>
               </el-table-column>
            </el-table>
        </div>
        <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
    </div>
</template>
<script>
import table from '@/mixins/table' //表格混入数据
import {project,system} from '@/request/api.js';
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
                    prop:'ProjectName',
                    label:'项目名称'
                },
                {
                    prop: 'LDasName',
                    label: '网关名称',
                },
                {
                    prop: 'AreaName',
                    label: '区域名称',
                },
                {
                    prop: 'IsEnable',
                    label: '是否启用',
                },
            ],
            type:0,
            projectName:localStorage.getItem('projectname'),
            defaultAddInfo:{//新增项目参数默认数据
                ProjectID:null,
                LDasID:null,
                IsEnable:null,
                LDasName:null,
                Position:0,
                OldLDasID:null
            },
            addInfo:{ //新增或修改项目参数
                ProjectID:null,
                LDasID:null,
                IsEnable:null,
                LDasName:null,
                Position:0,
                OldLDasID:null
            },
            title:'新增',
            show:false,
        }
    },
    computed:{
        projectList(){
            return this.$store.state.projectList
        }
    },
    watch:{
        filterText(val){
            this.queryData()
        }
    },
    created(){
        this.queryData()
    },
    methods:{
        /**
         * 269.分页查询网关列表
         */
        queryData(){
            project({
                FAction:'QueryPageULdas',
                SearchKey:this.filterText,
                PageIndex:this.pageIndex,
                PageSize:10
            })
            .then((data) => {
                this.total = data.FObject.Table ? data.FObject.Table[0].FTotalCount : 0
                this.tableData = data.FObject.Table1 ? data.FObject.Table1 : []
            })
            .catch((err) => {
                
            });
        },
        /**
         * handleCurrentChange 页码改变时触发
         */
        handleCurrentChange(val){
            this.pageIndex = val
            this.queryData()
        },
        /**
         * 点击新增
         */
        beforeAdd(){
            this.show =true
            this.type = 0
            this.addInfo = Object.assign({},this.defaultAddInfo)
        },
        /**
         * 修改项目
         */
        updatedProject(row) {
            this.show = true
            this.type = 1
            Object.keys(this.addInfo).forEach(key => {
                this.addInfo[key] = row[key]
            })
        },
        /**
         * 265.新增/修改网关
         */
        addOrUpdateULdas(){
            system({
                FAction:'AddOrUpdateULdas',
                mULdas:this.addInfo
            })
            .then(data => {
                this.pageIndex = 1
                this.queryData()
            })
            .catch(err => {
                console.log(err);
            })
        },
        /**
         * 268.删除网关
         */
        async deleteULdas(row){
            await new Promise(resove => {
                this.$DeleteMessage([`确认删除`,'删除区域信息'])
                .then(() => {
                    resove()
                })
                .catch(error => {

                })
            })
            project({
                FAction:'DeleteULdas',
                ID:row.ProjectID
            })
            .then(data => {
                this.pageIndex  = 1
                this.queryData()
            })
            .catch(err => {})
        },
        /**
         * exportFile 导出
         */
        exportFile(){
            system({
                FAction:'ExportUArea',
                SearchKey:this.filterText,
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
        },
    }
}
</script>
<style lang="scss">
@import '@/components/TaskManagement/InspectionItem.scss';
.inspection-item {
    .el-form-item{
        .condition{
            .el-input {
                width: 120px;
                &__inner{
                    width: 120px
                }
            }
        }
        .limit-value{
            display: inline-block;
            padding: 0 4px;
            background: #2a90fb;
            position: relative;
            left: -8px;
            border-radius: 4px;
        }
        .unit{
            display: inline-block;
            padding: 0 20px;
            background: #2a90fb;
            border-radius: 4px;
            position: relative;
            left: 4px;
        }
    }
}
 


</style>
