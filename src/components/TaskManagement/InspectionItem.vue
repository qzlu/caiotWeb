<template>
    <div class="report inspection-item">
        <el-dialog :title="title" :visible.sync="show" width="426" class="zw-dialog">
            <el-form :model="addPoint" ref="form">
                <el-form-item label="巡检点名称"  prop='InspectionPointName' :rules="[{ required: true, message: '请输入巡检点名称'}]">
                    <el-input v-model="addPoint.InspectionPointName"></el-input>
                </el-form-item>
                <el-form-item label="所属区域" prop="AreaID" :rules="[{ required: true, message: '请选择'}]">
                  <el-select v-model="addPoint.AreaID"   placeholder="请选择">
                    <el-option v-for="area in areaList" :key="area.AreaID" :label="area.AreaName" :value="area.AreaID"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属系统" prop="SystemParamID" :rules="[{ required: true, message: '请选择'}]">
                  <el-select v-model="addPoint.SystemParamID"   placeholder="请选择">
                    <el-option v-for="system in systemTypeList" :key="system.Key" :label="system.ParamValue" :value="system.Key"></el-option>
                  </el-select>
                </el-form-item>
            </el-form>
            <div class="submit">
                <button class="zw-btn zw-btn-primary" @click="addUInspectionPoint()">确定</button>
            </div>
        </el-dialog>
        <ul class="clearfix report-header">
            <li class="l" @click="add()"><button class="zw-btn zw-btn-add">新增</button></li>
            <li class="l" @click="exportFile"><button class="zw-btn zw-btn-export">导出</button></li>
             <li class="l" @click="importDevice"><button class="zw-btn zw-btn-import">设备导入</button></li>
            <li class="l" @click="pageIndex=1;filterText = '';queryData()"><button class="zw-btn zw-btn-refrest">刷新</button></li>
            <li class="r">
                <el-input class="search-input" placeholder="搜索设备关键字" v-model="filterText">
                    <i class="el-icon-search" slot="suffix"></i>
                </el-input>
                <button class="zw-btn zw-btn-primary" @click="filterText = '' ">重置</button>
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
                >
               </el-table-column>
               <el-table-column
                 prop=""
                 label="操作">
                 <template slot-scope="scoped">
                     <div class="role-operation">
                        <span class="pointer" @click="deleteItem(scoped.row)">删除</span>
                        <span class="pointer" @click="update(scoped.row)">编辑</span>
                     </div>
                 </template>
               </el-table-column>
            </el-table>
        </div>
        <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
    </div>
</template>
<script>
import {system,Inspection} from '@/request/api.js'//api接口（接口统一管理）;
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
                    prop: 'InspectionPointName',
                    label: '巡检点'
                },
                {
                    prop: 'AreaName',
                    label: '所属区域'
                },
                {
                    prop: 'Value',
                    label: '所属系统'
                }
            ],
            filterText:'',
            title:'新增',
            show:false,
            defalutAddPoint:{//新增巡检点默认数据
                InspectionPointName:'',
                ProjectID:localStorage.getItem('projectid'),
                AreaID:null,
                FDescription:'',
                SystemParamID:null
            },
            addPoint:{ //新增或编辑巡检点数据
                InspectionPointName:'',
                ProjectID:localStorage.getItem('projectid'),
                AreaID:null,
                FDescription:'',
                SystemParamID:null,
                ID:null
            },
            areaList:[], //区域列表
            systemTypeList:[], //系统分类
            type:0
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
        this.queryAreaType()
        this.querySystemType()
    },
    mounted(){

    },
    methods:{
        /**
         * 查询巡检点
         */
        queryData(name = '', pageIndex = 1){
            const loading = this.$loading({
              customClass: 'hahahah',
              background: 'rgba(0, 0, 0, 0.7)',
              text:'正在加载......'
            });
            Inspection({
                FAction:'QueryPageUInspectionPointInfo',
                FName:name,
                PageIndex:pageIndex,
                PageSize:10
            })
            .then(data => {
                this.total = data.FObject.Table[0].Count
                this.tableData = data.FObject.Table1
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setTimeout(() => {
                    loading.close()
                },200)
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
         * 查询区域分类
         */
        queryAreaType(){
            system({
                FAction:'QueryUArea',
                ProjectID:localStorage.getItem("projectid")
            })
            .then(data => {
                this.areaList = data.FObject
            })
            .catch(error => {
                
            })
        },
        /**
         * 查询系统分类
         */
        querySystemType(){
            system({
                FAction:'SSystemParam',
                FName:''
            })
            .then(data => {
                this.systemTypeList = data.FObject
            })
            .catch(error => {

            })
        },
        /**
         * 新增或编辑巡检点
         */
        async addUInspectionPoint(){
            await new Promise(resolve => {
                this.$refs.form.validate((valid) => {
                  if (valid) {
                      resolve()
                  } 
                });
            })
            Inspection({
                FAction:this.type?'UpdateUInspectionPoint':'AddUInspectionPoint',
                mUInspectionPoint:this.addPoint
            })
            .then(data => {
                this.show = false
                this.$message({
                  type: 'success',
                  message: this.type?'修改成功！':'新增成功！'
                });
                this.queryData()
            })
            .catch(error => {
                this.$message({
                  type: 'error',
                  message: error
                });
            })
        },
         /**
         * add 点击新增按钮
         */
        add(){
            this.title = '新增'
            this.type = 0
            this.show = true,
            this.addPoint = Object.assign({},this.defalutAddPoint)
        },
        /**
         * update 修改巡检点
         */
        update(item) {
            this.title = '修改'
            this.show = true
            this.type = 1
            for(let key in this.addPoint){
                if(key != 'ProjectID'){
                    this.addPoint[key] = item [key]?item [key]:''
                }
            }
        },
        /**
         * deleteItem 删除巡检点
         * @param {type Object} item 巡检点
         */
        async deleteItem(item){
            await new Promise(resolve => {
                this.$DeleteMessage([`确定要删除　　${item.InspectionPointName}`,'删除巡检点'])
                .then(() => {
                    resolve()
                })
                .catch(() => {
                })
            })
            Inspection({
                FAction:'DeleteUInspectionPoint',
                ID:item.ID
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
            Inspection({
                FAction:'QueryExportUInspectionPointInfo',
                FName:this.filterText,
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
        /**
         * 设备导入
         * 
         */
        importDevice(){
            Inspection({
                FAction:'AddImportUInspectionPoint',
            })
            .then(data => {
                console.log(data);
                this.queryData()
                this.$message({
                  type: 'success',
                  message: '设备导入成功!'
                });
            })
            .catch(error => {
                this.$message({
                  type: 'error',
                  message: '设备导入失败!请重试'
                });
            })
        }
    }
}
</script>
<style lang="scss">
$img-url:'/static/image/';
.inspection-item{
    .el-dialog{
        width: 426px;
        height: 367px;
        background: url(#{$img-url}task/inspection.png);
        padding-left: 48px;
        &__header{
            text-align: left
        }
    }
    .el-form{
        &-item{
            .el-form-item__label{
                width: 94px;
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
            &__error{
                left: 50%;
                transform: translateX(-50%)
            }
        }
    }
}
</style>

