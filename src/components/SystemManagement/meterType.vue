<template>
    <div class="report inspection-item system-type">
        <el-dialog :title="type?'编辑':'新增'" :visible.sync="show" width="400px" class="zw-dialog">
            <el-form  inline ref="form">
                <el-form-item label="仪表类型">
                    <el-input v-model="FName">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="submit">
                <button class="zw-btn zw-btn-primary" @click="addOrUpdate()">确定</button>
            </div>
        </el-dialog>    
        <ul class="report-header clearfix">
            <li class="l"><button class="zw-btn zw-btn-add" @click="beforeAdd">新增</button></li>
            <li class="l"><button class="zw-btn zw-btn-export" @click="exportFile">导出</button></li>
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
                 :width="item.width"
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
                        <span class="pointer" @click="deleteItem(scoped.row)">删除</span>
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
import '@/components/TaskManagement/InspectionItem.scss';
export default {
    mixins:[table],
    data(){
        return{
            tableLabel:[
                {
                    prop: 'RowNum',
                    label: '序号',
                    width:80
                },
                {
                    prop:'MeterTypeID',
                    label:'仪表类型ID'
                },
                {
                    prop: 'MeterTypeName',
                    label: '仪表类型名称',
                },
            ],
            type:0,
            ID:0,
            FName:null,
            title:'新增',
            show:false,
    
        }
    },
    computed:{
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
         * 337.标准配置-分页查询仪表类型
         */
        queryData(){
            system({
                FAction:'QueryPageSMeterType',
                SearchKey:this.filterText,
                PageIndex:this.pageIndex,
                PageSize:10
            })
            .then((data) => {
                this.total = data.FObject.Table ? data.FObject.Table[0].FTotalCount : 0
                this.tableData = data.FObject.Table1 ? data.FObject.Table1 : []
                /**
                 * 删除操作时，当前页面无数据时跳到上一页
                 */
                if(this.tableData.length === 0&&this.pageIndex > 1){
                    --this.pageIndex
                    this.queryData()
                }
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
            this.ID = 0
            this.FName =null
        },
        /**
         * 编辑
         */
        updatedProject(row) {
            this.show = true
            this.type = 1
            this.FName = row.MeterTypeName
            this.ID = row.MeterTypeID
        },
        /**
         * 338.标准配置-新增/修改仪表类型
         */
        addOrUpdate(){
            if(this.FName === ''|| this.FName ===null) return
            this.show = false
            system({
                FAction:'AddOrUpdateSMeterType',
                ID:this.ID,
                FName:this.FName,
            })
            .then(data => {
                this.$message({
                  type: 'success',
                  message: '配置成功！'
                });
                this.queryData()
            })
            .catch(err => {
                console.log(err);
            })
        },
        /**
         * 268.删除告警类型
         */
        async deleteItem(row){
            await new Promise(resove => {
                this.$DeleteMessage([`确认删除`,'删除仪表类型'])
                .then(() => {
                    resove()
                })
                .catch(error => {
                })
            })
            system({
                FAction:'DeleteSMeterType',
                ID:row.MeterTypeID
            })
            .then(data => {
                this.queryData()
            })
            .catch(err => {})
        },
        /**
         * exportFile 导出
         */
        exportFile(){
            project({
                FAction:'QueryExportULdas',
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
</style>
