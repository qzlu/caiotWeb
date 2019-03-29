<template>
    <div class="report">
        <ul class="report-header clearfix">
            <li class="l">
                <span class="label" style="font-size:14px;">月份　</span>
                <el-date-picker
                  class="month-picker"
                  v-model="time"
                  type="month"
                  @change="queryData()"
                  placeholder="选择日期"
                ></el-date-picker>
            </li>
            <li class="l">
                <button class="zw-btn zw-btn-export">导出</button>
            </li>
            <li class="l">
               <!--  <button class="zw-btn zw-btn-report">报事月报</button> -->
            </li>
            <li class="r">
                <el-input class="search-input" placeholder="搜索关键字" v-model="filterText">
                    <i class="el-icon-search" slot="suffix"></i>
                </el-input>
            </li>
        </ul>
        <div>
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
                 show-overflow-tooltip
                >
               </el-table-column>
               <el-table-column
                 prop=""
                 label="查看">
                 <template slot-scope="scoped">
                     <div class="role-operation">
                        <span class="pointer" @click="queryDetail(scoped.row)">记录</span>
                     </div>
                 </template>
               </el-table-column>
            </el-table>
        </div>
        <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
        <!-- 报事记录 -->
        <el-dialog class="report-dialog"  title="报事记录" :visible.sync="show">
            <div class="export-container"><button class="zw-btn export " @click="exportRecord"><i class="iconfont icon-Export"></i>导出</button></div>
            <div id='record' style="width: 1150px;margin-left: -50px;padding: 0 50px;">
                <div class="clearfix project-name"><p class="l">项目名称: {{projectName}}</p><p class="r">月份:{{time.getFullYear() + '-' + (time.getMonth()+1)}}</p></div>
                <ul class="clearfix report-info" >
                    <li class="l">报事对象<span v-if="recordsInfo.Table">{{recordsInfo.Table[0].ReportMatterObjectName}}</span></li>
                    <li class="l">报事时间<span v-if="recordsInfo.Table">{{recordsInfo.Table[0].OrderCreateDateTime}}</span></li>
                    <li class="l">报事类型<span v-if="recordsInfo.Table">{{recordsInfo.Table[0].ReportMatterEventType}}</span></li>
                    <li class="l">处理时间<span v-if="recordsInfo.Table">{{recordsInfo.Table[0].RunningOrderDateTime}}</span></li>
                </ul>
            </div>
            <div class="maintenance-img" v-if="recordsInfo.Table">
                <h5>处理前</h5>
                <ul class="clearfix">
                    <li class="l" v-for="img in recordsInfo.Table[0].ReportMatterBeforeImg.split(',')">
                        <img :src="'http://www.szqianren.com/'+img" alt="">
                    </li>
                </ul>
            </div>
            <div class="maintenance-img" v-if="recordsInfo.Table">
                <h5>处理后</h5>
                <ul class="clearfix">
                    <li class="l" v-for="img in recordsInfo.Table[0].ReportMatterAfterImg.split(',')">
                        <img :src="'http://www.szqianren.com/'+img" alt="">
                    </li>
                </ul>
            </div>
            <div class="maintenance-img" v-if="recordsInfo.Table">
                <h5>处理结果</h5>
                <p style="text-align:left;padding-left:20px">{{recordsInfo.Table[0].ReportMatterAfterDescription}}</p>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import table from '@/mixins/table' //表格混入数据
import { ReportMatter } from '@/request/api.js';
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
                    prop:'OrderContent',
                    label:'报事名称'
                },
                {
                    prop: 'OrderCreateDateTime',
                    label: '报事时间',
                    sortble:'custom'
                },
                {
                    prop: 'ReportMatterObjectName',
                    label: '报事对象'
                },
                {
                    prop: 'ReportMatterEventType',
                    label: '报事类型'
                },
                {
                    prop: 'RunningOrderDateTime',
                    label: '处理时间'
                },
                {
                    prop: 'FContacts',
                    label: '处理人'
                },
            ],
            projectName:localStorage.getItem('projectname'),
            time:new Date(),
            filterText:'',
            show:false,
            recordsInfo:[]
        }
    },
    components:{
        zwPagination
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
         * 查询报事记录
         */
        queryData(text = ''){
            ReportMatter({
                FAction:'QueryPageUReportMatter',
                FDateTime:this.time.toLocaleDateString(),
                Field:this.orderProp,
                FOrder:this.order,
                PageIndex:this.pageIndex,
                PageSize:10,
                FType:'2',
                SearchKey:text
            })
            .then((data) => {
                this.total = data.FObject.Table?data.FObject.Table[0].FTotalCount:0
                this.tableData = data.FObject.Table1?data.FObject.Table1:[]  
            }).catch((err) => {
                
            });
        },
        /**
         * handleCurrentChange 页码改变时触发
         */
        handleCurrentChange(val){
            this.pageIndex = val
            this.queryData(this.filterText)
        },
        /**
         * 查询报事记录详情
         * 
         */
        queryDetail(row){
            this.show = true
            ReportMatter({
                FAction:'QueryUReportMatterByRecord',
                ID:row.ID
            })
            .then(data => {
                console.log(data);
                this.recordsInfo = data.FObject
            })
            .catch(err => {})
        },
        /**
         * 导出记录详情
         */
        exportRecord(){
            let fileName = this.recordsInfo.Table[0].ReportMatterObjectName + '报事记录'
            this.getPdf('#record',fileName);
        },
    }
}
</script>
<style lang="scss">
@import 'record.scss';
</style>
