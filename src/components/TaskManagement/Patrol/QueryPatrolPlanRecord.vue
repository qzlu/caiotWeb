<template>
    <div class="report">
        <ul class="report-header clearfix">
            <li class="l"> 
                <span class="label">时间　</span>
                <el-date-picker type="daterange" v-model="time">
                </el-date-picker>
            </li>
            <li class="l"><button class="zw-btn" @click="queryData()">查询</button></li>
            <li class="l"><button class="zw-btn zw-btn-export" @click="exportFile()">导出</button></li>
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
            </el-table>
        </div>
        <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
    </div>
</template>
<script>
import table from '@/mixins/table' //表格混入数据
import {Patrol} from '@/request/api.js';
export default {
    mixins:[table],
    data(){
        return{
            time:[new Date(), new Date()],
            tableLabel:[
                {
                    prop: 'RowNum',
                    label: '序号',
                    width:80
                },
                {
                    prop:'PatrolPlanName',
                    label:'巡更计划名称'
                },
                {
                    prop: 'PatrolPlanDatetime',
                    label: '计划时间',
                },
                {
                    prop: 'PatrolObject',
                    label: '巡更点',
                },
                {
                    prop: 'PatrolTime',
                    label: '巡更时间',
                },
                {
                    prop: 'PatrolResult',
                    label: '巡更结果',
                },
                {
                    prop: 'PatrolNote',
                    label: '异常描述',
                },
                {
                    prop:'FContacts',
                    label:'巡更人',
                }
            ],
        }
    },
    created(){
        this.queryData()
    },
    methods:{
        /**
         * 274.分页查询巡更记录
         */
        queryData(){
            Patrol({
                FAction:'QueryPageUPatrolPlanRecord',
                SearchKey:this.filterText,
                PageIndex:this.pageIndex,
                PageSize:10,
                StartDateTime:this.time[0].toLocaleDateString() + ' 00:00',
                EndDateTime:this.time[1].toLocaleDateString() + ' 23:59',
            })
            .then((data) => {
                console.log(data)
                this.total = data.FObject.Table ? data.FObject.Table[0].FTotalCount : 0
                this.tableData =  data.FObject.Table1 || []
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
         * exportFile 导出
         */
        exportFile(){
            Patrol({
                FAction:'QueryExportUPatrolPlanRecordByDate',
                SearchKey:this.filterText,
                StartDateTime:this.time[0].toLocaleDateString() + ' 00:00',
                EndDateTime:this.time[1].toLocaleDateString() + ' 23:59',
            })
            .then(data => {
                window.location = data.FObject;
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
