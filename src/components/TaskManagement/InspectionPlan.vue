<template>
    <div class="report plan">
        <ul class="report-header plan-header clearfix"> 
            <li class="l"><button class="zw-btn zw-btn-add">新增</button></li>
            <li class="l"><button class="zw-btn zw-btn-export">导出</button></li>
            <li class="l select-plan-time">
                <span class="label">生成计划</span>
                <el-date-picker
                  v-model="year"
                  type="year"
                  @change='selectYear'
                  placeholder="选择年">
                </el-date-picker>
            </li>
            <li class="r">
                <el-input class="search-input" v-model="filterText" placeholder="搜索计划关键字">
                     <i class="el-icon-search" slot="suffix"></i>
                </el-input>
                <el-button type="primary" @click="showFilterBox = !showFilterBox">
                  高级搜索<i class=" el-icon--right" :class="{'el-icon-arrow-down':!showFilterBox,'el-icon-arrow-up':showFilterBox}"></i>
                </el-button>
                <transition>
                    <ul class="search-box"  v-if="showFilterBox">
                        <li>
                            <span>计划名称</span>
                            <el-input v-model="filterObj.InspectionPlanName"></el-input>
                        </li>
                        <li>
                            <span>路线名称</span>
                            <el-input v-model="filterObj.InspectionLineName"></el-input>
                        </li>
                        <li class="plan-select-time">
                            <span>巡检时间</span>
                            <el-date-picker
                              v-model="time"
                              type="datetimerange"
                              :picker-options="pickerOptions2"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              @change="selectTime"
                              align="right">
                            </el-date-picker>
                        </li>
                        <li >
                            <span>负责人</span>
                            <el-select v-model="filterObj.InspectionUserGUID"  placeholder="请选择">
                                <el-option v-for="user in users" :key="user.FGUID" :label="user.FContacts" :value="user.FGUID"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <span>巡检周期</span>
                            <el-select v-model="filterObj.InspectionCycle"  placeholder="请选择">
                                <el-option v-for="time in timeList" :key="time.value" :label="time.label" :value="time.value"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <button class="zw-btn zw-btn-primary" @click="queryType = 1;queryData()">查询</button>
                            <button class="zw-btn zw-btn-primary" @click="resetFilter()">重置</button>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
        <div class="zw-table plan-table">
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
                 show-overflow-tooltip
                >
               </el-table-column>
               <el-table-column
                 prop=""
                 show-overflow-tooltip
                 label="负责人">
                 <template slot-scope="scoped">
                    <el-select v-model="scoped.row.InspectionUserGUID"  placeholder="请选择" @change="changeUser(scoped.row)">
                        <el-option v-for="user in users" :key="user.FGUID" :label="user.FContacts" :value="user.FGUID"></el-option>
                    </el-select>
                 </template>
               </el-table-column>
               <el-table-column
                 prop=""
                 label="操作">
                 <template slot-scope="scoped">
                     <div class="role-operation">
                        <span class="pointer" @click="deletePlan(scoped.row)">删除</span>
                        <span class="pointer" @click="">编辑</span>
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
import * as comm from "../../assets/js/pro_common";
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
                    prop: 'InspectionPlanName',
                    label: '计划名称'
                },
                {
                    prop: 'InspectionPlanTypeText',
                    label: '状态'
                },
                {
                    prop: 'InspectionLineName',
                    label: '路线名称'
                },
                {
                    prop: 'PointCount',
                    label: '设备数'
                },
                {
                    prop: 'InspectionCycleName',
                    label: '巡检周期'
                },
/*                 {
                    prop: 'Frequency',
                    label: '频次'
                }, */
                {
                    prop: 'InspectionDatetime',
                    label: '计划巡检时间'
                }
            ],
            timeList:[{
                label:'日巡检',
                value:1
            },
            {
                label:'周巡检',
                value:2
            },
            {
                label:'月巡检',
                value:3
            }],
            users:[],
            year:'',
            filterText:'',
            defaultFilterObj:{
                InspectionPlanName:'',
                InspectionLineName:'',
                InspectionCycle:1,
                InspectionUserGUID:'',
                StartDateTime:'',
                EndDateTime:''
            },
            filterObj:{ //高级搜索条件
                InspectionPlanName:'',
                InspectionLineName:'',
                InspectionCycle:1,
                InspectionUserGUID:'',
                StartDateTime:'',
                EndDateTime:''
            },
            time:'',
            showFilterBox:false,
            queryType:0,//查询方式，0为普通查询，1为高级搜索
            type:0,//0为新增 1为编辑计划
            defaultAddPlanData:{
                InspectionPlanName:null,
                InspectionLineID:null,
                InspectionDatetime:null,
                InspectionUserGUID:null,
                FDescription:''
            },
            addPlanData:{
                InspectionPlanName:null,
                InspectionLineID:null,
                InspectionDatetime:null,
                InspectionUserGUID:null,
                FDescription:''
            },
            pickerOptions2: {
                shortcuts: [{
                  text: '最近一周',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近一个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                  }
                }, {
                  text: '最近三个月',
                  onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                  }
                }]
            },
        }
    },
    components:{
        zwPagination
    },
    watch:{
        filterText(val){
            this.filterObj.InspectionPlanName = val
            this.queryType = 1
            this.queryData()
        }
    },
    created(){
        this.queryData()
        this.queryUser()
    },
    mounted(){

    },
    methods:{
        /**
         * 查询巡检计划
         * @param { Number } type :1 高级查询 0:普通查询
         */
        queryData(){
            if(this.queryType ===1){
                this.showFilterBox = false
            }
            Inspection({
                FAction:'QueryPageUInspectionPlan',
                FType:this.queryType?'Advanced':'Normal',
                PageIndex:this.pageIndex,
                PageSize:10,
                mSearchInspectionPlan:this.queryType?this.filterObj:{}
            })
            .then(data => {
                this.total = data.FObject.Table?data.FObject.Table[0].FTotalCount:0
                this.tableData = data.FObject.Table1?data.FObject.Table1:[]
                this.tableData.forEach(item => {
                    if(item.InspectionUserGUID=="00000000-0000-0000-0000-000000000000"){
                        item.InspectionUserGUID = ''
                    }
                    this.$set(item,'InspectionPlanTypeText',item.InspectionPlanType==1?'自动生成':'手动生成')
                });
            })
            .catch(error => {

            })
        },
        /**
         * handleCurrentChange 页码改变时触发
         */
        handleCurrentChange(val){
            this.pageIndex = val
            this.queryData()
        },
        /**
         * 查询所有用户
         */
        queryUser(){
            system({
                FAction:'QueryTUsers',
                FName:''
            })
            .then(data => {
                this.users = data.FObject
            })
            .catch(error => {
                console.log(error);
            })
        },
        /**
         * 根据年份一键生成巡检计划
         * @param year 年份
         */
        createPlanByYear(year){
            Inspection({
                FAction:'CreatePlanByYear',
                FYear:year
            })
            .then(data => {
                this.$message({
                  type: 'success',
                  message: '生成成功!'
                });
                this.queryData()
            })
            .catch(error => {
                this.$message({
                  type: 'error',
                  message: '生成失败!'
                });
                console.log(error);
            })
        },
        /**
         * 选择年份
         */
        selectYear(val){
            let year = new Date(val).getFullYear()
            this.$DeleteMessage([`确认生成　　${year}年巡检计划`,'确认信息'])
            .then(() => {
                this.createPlanByYear(year)
            })
            .catch(error => {
                this.year = ''
            })
        },
        /**
         * 删除巡检计划
         * @param {Object} row 删除的计划
         */
        async deletePlan(row){
            await new Promise(resove => {
                this.$DeleteMessage([`确认删除　　${row.InspectionPlanName}`,'删除计划'])
                .then(() => {
                    resove()
                })
                .catch(error => {

                })
            })
            Inspection({
                FAction:'DeleteUInspectionPlanByID',
                ID:row.ID
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
         * 新增或编辑巡检计划
         */
        addPlan(){
            Inspection({
                FAction:this.type?'UpdateUInspectionPlanByID':'AddTempUInspectionPlan',
                mUInspectionPlan:this.addPlanData
            })
        },
        /**
         * 修改负责人
         */
        changeUser(row){
            row.showSelectBox=false
            if(Date.parse(new Date(row.InspectionDatetime))<Date.parse(new Date())){
                row.InspectionUserGUID = ''
                this.$message({
                  type: 'error',
                  message: '计划巡检时间已过，无法修改'
                });
                return
            }
            Inspection({
                FAction:'UpdateUInspectionPlanByID',
                ID:row.ID,
                mUInspectionPlan:{'InspectionDatetime':row.InspectionDatetime,'InspectionUserGUID':row.InspectionUserGUID}
            })
            .then(data => {
                console.log('负责人',data);
            })
            .catch(error => {

            })
        },
        /**
         * 高级搜索弹框选择时间
         */
        selectTime(val){
            this.filterObj.StartDateTime = comm.getFormatTime(val[0])
            this.filterObj.EndDateTime = comm.getFormatTime(val[1])
            console.log(this.filterObj);

        },
        /**
         * 高级搜索弹框重置
         */
        resetFilter(){
            this.filterObj = Object.assign({},this.defaultFilterObj)
            this.time = ''
        }

    }
}
</script>
<style lang="scss">
.plan{
    &-header{
        position: relative;
        li.select-plan-time{
            .label{
                font-size:17px;
                margin-left: 20px;
                margin-right: 4px;
            }
            .el-input__inner{
                width: 122px;
                height: 46px;
                background:rgba(0,80,153,1);
                border:1px solid rgba(12,55,110,1);
            }
        }
        li.r{
            .el-button.el-button--primary{
                width:94px;
                height:46px;
                margin-left: 10px;
                background:#042E74;
                border:1px solid rgba(12,55,110,1);
                padding-left: 4px;
                .el-icon--right{
                    color: #2A91FC
                }
            }
        }
        .search-box{
            width: 1436px;
            height: 163px;
            // line-height: 95px;
            box-sizing: border-box;
            position: absolute;
            top: 65px;
            left: 10px;
            z-index: 100;
            background: #005099;
            border:1px solid rgba(13, 97, 156, 1);
            text-align: left;
            li{
                margin-right: 90px;
                margin-top: 22px;
                display: inline-block;
                >span{
                    width: 110px;
                    text-align: right;
                    display: inline-block;
                    font-size:16px;
                }
                .el-input{
                    width:209px;
                    height:46px;
                    &__inner{
                        width:209px;
                        margin-left: 10px;
                        color: #F1F1F2;
                        background:#042E74;
                        border:1px solid rgba(12,55,110,1);
                    }
                }
                .el-date-editor .el-range-separator{
                     color: #F1F1F2;
                }
                .el-range-input{
                    color: #F1F1F2;
                    background:#042E74;
                }
                button{
                    margin-left: 60px;
                    background: #12559D
                }
                button:last-of-type{
                    margin-left: 39px;
                }
            }
            li.plan-select-time{
                margin-right: 0;
                .el-input__inner{
                    width: 400px;
                }
            }
        }
    }
    &-table{
        .el-select{
            left: 10px;
            .el-input{
                .el-input__suffix{
                    display: none
                }
            }
            .el-input:hover{
                .el-input__suffix{
                    display: block
                }
            }
            .el-input__inner{
                width: 94px;
                height: 40px;
                line-height: 40px;
                background:none;
                border:none;
                color: white
            }
            .el-input__inner:hover{
                background:rgba(4,46,116,1);
                border:1px solid rgba(42,145,252,1);
            }
        }
    }
}
</style>
