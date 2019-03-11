<template>
    <div class="work-list">
        <ul class="tab-header clearfix">
            <li :class="{active:tabIndex === 1}" @click="tabIndex = 1">全部</li>
            <li :class="{active:tabIndex === 2}" @click="tabIndex = 2">待完成</li>
            <li :class="{active:tabIndex === 3}" @click="tabIndex = 3">已完成</li>
            <li :class="{active:tabIndex === 4}" @click="tabIndex = 4">待接单</li>
            <li :class="{active:tabIndex === 5}" @click="tabIndex = 5">待派单</li>
            <li :class="{active:tabIndex === 6}" @click="tabIndex = 6">已逾期</li>
            <li class="select">
                <span>工单类型</span> 
                <div class="select-box" @click="showSelectOption = !showSelectOption">{{selectType.name}}<i :class="{'el-icon-caret-bottom':!showSelectOption,'el-icon-caret-top':showSelectOption}"></i></div>
                <ul class="select-option" v-if="showSelectOption">
                    <li v-for="item in workTypeList" :key="item.value" @click="selectType = item;showSelectOption = false">{{item.name}}</li>
                </ul>
            </li>
            <li class="select-time">
                <span>时间段</span>
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <button class="zw-btn" style="background:#042E74;" @click="queryAllOrders()"><i class="el-icon-search"></i>查询</button>
                <button class="zw-btn zw-btn-export">导出</button>
            </li>
        </ul>
        <div class="tab-content" >
            <div class="tab-item" v-if="tabIndex === 1">
                <div>
                    <el-table
                       :data="tableData0"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                         show-overflow-tooltip
                        >
                       </el-table-column>
                       <el-table-column
                         prop=""
                         label="操作">
                         <template slot-scope="scoped">
                             <div class="detail" @click="queryDetail(scoped.row)">
                                <span>详情</span>
                             </div>
                         </template>
                       </el-table-column>
                    </el-table>
                </div>
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex0' :total='total0'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 2">
                <div>
                    <el-table
                       :data="tableData1"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                        >
                       </el-table-column>
                       <el-table-column
                         prop=""
                         label="操作">
                         <template slot-scope="scoped">
                             <div>
                                <span>详情</span>
                             </div>
                         </template>
                       </el-table-column>
                    </el-table>
                </div>
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex1' :total='total1'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 3">
                <div>
                    <el-table
                       :data="tableData2"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                        >
                       </el-table-column>
                       <el-table-column
                         prop=""
                         label="操作">
                         <template slot-scope="scoped">
                             <div class="detail">
                                <span>详情</span>
                             </div>
                         </template>
                       </el-table-column>
                    </el-table>
                </div>
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex2' :total='total2'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 4">
                <div>
                    <el-table
                       :data="tableData3"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                        >
                       </el-table-column>
                       <el-table-column
                         prop=""
                         label="操作">
                         <template slot-scope="scoped">
                             <div>
                                <span>详情</span>
                             </div>
                         </template>
                       </el-table-column>
                    </el-table>
                </div>
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex3' :total='total3'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 5">
                <div>
                    <el-table
                       :data="tableData4"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                        >
                       </el-table-column>
                       <el-table-column
                         prop=""
                         label="操作">
                         <template slot-scope="scoped">
                             <div>
                                <span>详情</span>
                             </div>
                         </template>
                       </el-table-column>
                    </el-table>
                </div>
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex4' :total='total4'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 6">
                <div>
                    <el-table
                       :data="tableData5"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
                         :width="item.width"
                        >
                       </el-table-column>
                       <el-table-column
                         prop=""
                         label="操作">
                         <template slot-scope="scoped">
                             <div>
                                <span>详情</span>
                             </div>
                         </template>
                       </el-table-column>
                    </el-table>
                </div>
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex5' :total='total5'></zw-pagination>
            </div>
        </div>
        <el-dialog title="工单详情" class="show-detail" :visible.sync="showDetail">
            <el-scrollbar>
                <div style="height:760px">
                    <div>
                        <p class="title"><span class="icon-title"></span>工单信息</p>
                        <ul class="info" v-if="workInfo">
                            <li class="l">
                                <span class="item-title">工单类型:</span>
                                <span class="item-info">{{workInfo.OrderTypeName}}</span>
                            </li>
                            <li class="l">
                                <span class="item-title">工单进度:</span>
                                <span class="item-info">{{workInfo.OrderStateName}}</span>
                            </li>
                            <li class="l">
                                <span class="item-title">工单名称:</span>
                                <span class="item-info">{{workInfo.OrderContent}}</span>
                            </li>
                            <li class="l">
                                <span class="item-title">创建时间:</span>
                                <span class="item-info">{{workInfo.OrderCreateDateTime}}</span>
                            </li>
                            <li class="l">
                                <span class="item-title">计划时间:</span>
                                <span class="item-info">{{workInfo.RunningOrderDateTime}}</span>
                            </li>
                            <li class="l">
                                <span class="item-title">负责人:</span>
                                <span class="item-info">{{workInfo.FContacts}}</span>
                            </li>
                        </ul>
                    </div>
                    <div style="margin-top:39px;">
                        <p class="title"><span class="icon-title"></span>工单进度</p>
                        <ul class="progress clearfix">
                            <li class="clearfix" v-for="(item,index) in areaArr" :key="index">
                                <div class="l area-name">
                                    <div>
                                        <span>{{item.AreaName}}</span>
                                        <div :class="{circle:true,finish:!item.FaultCount&&item.AreaState==1,error:item.FaultCount>0,running:!item.FaultCount&&item.AreaState==2,waiting:item.AreaState==3}">
                                            <div class="circle-inner"></div>
                                        </div>
                                    </div>
                                    <div class="border r"></div>
                                </div>
                                <ul class="area-info clearfix">
                                    <li class="l "><span>待巡检:</span>{{item.WaitingCount}}</li>
                                    <li class="l "><span>正常:</span>{{item.NormalCount}}</li>
                                    <li class="l "><span>异常:</span>{{item.FaultCount}}</li><br>
                                    <li class="time"><span>开始时间:{{item.FStartInspectionTime}}</span><span>结束时间:{{item.FLastInspectionTime}}</span></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-scrollbar>
        </el-dialog>
    </div>
</template>
<script>
import {Inspection,Orders} from '@/request/api.js'//api接口（接口统一管理）;
import table from '@/mixins/table' //表格混入数据
import {zwPagination} from '@/zw-components/index'
export default {
    mixins:[table],
    data(){
        return{
            tabIndex:1,
            tableLabel:[
                {
                    prop: 'RowNum',
                    label: '序号',
                },
                {
                    prop: 'OrderTypeName',
                    label: '工单类型',
                },
                {
                    prop: 'OrderStateName',
                    label: '工单状态',
                },
                {
                    prop: 'OrderContent',
                    label: '工单名称',
                },
                {
                    prop: 'SendOrderDateTime',
                    label: '创建时间',
                },
                {
                    prop: 'RunningOrderDateTime',
                    label: '计划时间',
                },
                {
                    prop: 'EndOrderDateTime',
                    label: '完成时间',
                },
                {
                    prop: 'FContacts',
                    label: '负责人'
                }
            ],
            tableLabel1:[
                {
                    prop: 'RowNum',
                    label: '序号',
                },
                {
                    prop: 'OrderTypeName',
                    label: '工单类型',
                },
                {
                    prop: 'OrderContent',
                    label: '工单名称',
                },
                {
                    prop: 'SendOrderDateTime',
                    label: '创建时间',
                },
                {
                    prop: 'RunningOrderDateTime',
                    label: '计划时间',
                },
                {
                    prop: 'EndOrderDateTime',
                    label: '完成时间',
                },
                {
                    prop: 'FContacts',
                    label: '负责人'
                }
            ],
            workTypeList:[
                {
                    name:'全部',
                    value:0
                },
                {
                    name:'巡检',
                    value:1
                },
                {
                    name:'保养',
                    value:2
                },
                {
                    name:'维修',
                    value:3
                },
                {
                    name:'抄表',
                    value:4
                },
            ],
            selectType:{
                name:'全部',
                value:0
            },
            showSelectOption:false,
            time:[new Date(),new Date()],
            tableData0:[],
            tableData1:[],
            tableData2:[],
            tableData3:[],
            tableData4:[],
            tableData5:[],
            pageIndex0:1,
            pageIndex1:1,
            pageIndex2:1,
            pageIndex3:1,
            pageIndex4:1,
            pageIndex5:1,
            total0:0,
            total1:0,
            total2:0,
            total3:0,
            total4:0,
            total5:0,
            showDetail:false,
            workInfo:null,
            areaArr:[],
        }
    },
    components:{
        zwPagination
    },
    watch:{

    },
    created(){
        this.queryAllOrders()
    },
    mounted(){

    },
    methods:{
        handleCurrentChange(val){
            let pageIndex = 'pageIndex' + (this.tabIndex-1)
            this[pageIndex] = val
            this.queryOrders(val, this.tabIndex-1)
        },
        /**
         * 分页查询工单列表
         * 
         * state 状态 0全部 1处理中 2已完成 3已接单 4未派单 5已派单
         */
        queryOrders(pageIndex,state){
            Orders({
                FAction:'QueryPageUOrders',
                PageIndex:pageIndex,
                PageSize:10,
                mSearchUOrders:{
                    StartDateTime:this.time[0],
                    EndDateTime:this.time[1],
                    OrderType:this.selectType.value,
                    OrderState:state
                }
            })
            .then((data) => {
                console.log(data);
                let key = 'tableData' + state
                this[key] = data.FObject.Table1
                this['total'+state] = data.FObject.Table[0].FTotalCount
            }).catch((err) => {
                
            });
        },
        /**
         * 查询所有状态的
         */
        queryAllOrders(){
            this.queryOrders(this.pageIndex0,0)
            this.queryOrders(this.pageIndex1,1)
            this.queryOrders(this.pageIndex2,2)
            this.queryOrders(this.pageIndex3,3)
            this.queryOrders(this.pageIndex4,4)
            this.queryOrders(this.pageIndex5,5)
        },
        /**
         * 查看详情
         */
        queryDetail(row){
            this.showDetail = true
            this.workInfo = row
            Inspection({
                FAction:'QueryUInspectionAreaByCount',
                ID:row.OrderRelatedTaskID
            })
            .then(data => {
                console.log(data);
                this.areaArr = data.FObject.Table2
            })
            .catch(error => {

            })
        }
    }

}
</script>
<style lang="scss">
    $img-url:'/static/image/';
    .work-list{
        .tab-header{
            >li{
                width: 137px;
                height: 46px;
                line-height: 46px;
                font-size: 16px;
                margin: 0 3px;
                float: left;
                background: url(#{$img-url}task/t2.png);
                cursor: pointer;
            }
            >li.active{
                background: url(#{$img-url}task/t1.png);
            }
            .select{
                width: auto;
                position: relative;
                margin-left: 10px;
                background: none;
                &-box{
                    display: inline-block;
                    width: 80px;
                    height: 46px;
                    line-height: 46px;
                    box-sizing: border-box;
                    margin-left:10px;
                    padding-left: 10px;
                    border:1px solid #134FA4;
                    cursor: pointer;
                    text-align: left;
                    i{
                        position: absolute;
                        top: 14px;
                        right: 4px;
                        font-size: 18px;
                        color: #134FA4
                    }
                }
                &-option{
                    position: absolute;
                    right: 0;
                    z-index: 1000;
                    li{
                        width: 80px;
                        height: 30px;
                        line-height: 30px;
                        background: #134FA4;
                        cursor: pointer;
                    }
                    li:hover{
                        background: #cccccc
                    }
                }
            }
            .select-time{
                width: auto;
                margin-left: 10px;
                background: none;
                .el-date-editor--daterange.el-input__inner{
                    width: 250px;
                    height: 46px;
                    line-height: 46px;
                    background: #042E74;
                    border:1px solid rgba(12,55,110,1);
                    .el-range-separator{
                        line-height: 38px;
                        color: #F1F1F2;
                    }
                    .el-range-input{
                        color: #F1F1F2;
                        background: inherit                   
                    }
                }
            }
        }
        .tab-content{
            height: 864px;
            background: url(#{$img-url}task/bg_1.png)  no-repeat;
            padding: 56px 46px 85px 57px;
            box-sizing: border-box;
            position: relative;
            .detail{
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
        }
        .show-detail {
            .el-dialog{
                width: 1084px;
                height: 860px;
                background: #EDF1F4;
                &__title{
                    font-size:26px;
                    font-family:MicrosoftYaHei-Bold;
                    font-weight:bold;
                    color:rgba(0,0,0,1);
                }
                .title{
                    font-size:24px;
                    color:rgba(0,0,0,1);
                    text-align: left;
                    line-height: 30px;
                    .icon-title{
                        width:4px;
                        height:19px;
                        margin-right: 10px;
                        vertical-align: middle;
                        display: inline-block;
                        background:rgba(44,146,252,1);
                    }
                }
                .info{
                    width: 982px;
                    height: 228px;
                    margin-left: 14px;
                    margin-top: 17px;
                    background:rgba(243,246,247,1);
                    border:1px solid rgba(223,221,221,1);
                    border-radius:6px;
                    li{
                        width: 50%;
                        height: 76px;
                        line-height: 76px;
                        box-sizing: border-box;
                        text-align: left;
                        font-size:20px;
                        .item-title{
                            width: 172px;
                            height: 100%;
                            display: inline-block;
                            background: #D9EAF4;
                            text-align: center;
                            color: #000000
                        }
                        .item-info{
                            padding-left: 10px;
                            color: #6D6D6D
                        }
                    }
                    li:nth-of-type(3),li:nth-of-type(4){
                        border-top: 2px solid #EDEDED;
                        border-bottom: 2px solid #EDEDED;
                    }
                }
                .progress{
                    width: 990px;
                    margin-top: 14px;
                    padding: 30px 20px 20px 20px;
                    box-sizing: border-box;
                    border:1px solid rgba(223,221,221,1);
                    li:first-of-type,li:last-of-type{
                        .area-name{
                            >div:first-child{
                                height: 30px;
                                line-height: 30px;
                            }
                            .circle{
                                width:30px;
                                height:30px;
                                line-height: 25px;
                                position: relative;
                                top:-10px;
                                &-inner{
                                    width:22px;
                                    height:22px;
                                }
                            }
                        }
                        .area-info{
                            margin-left: 250px;
                        }
                    }
                    li:last-of-type{
                        .area-name{
                            .border{
                                display: none
                            }
                        }
                    }
                    li{
                        .area-name{
                            >div:first-child{
                                width: 240px;
                                height: 22px;
                                line-height: 22px;
                            }
                            span{
                                width:183px;
                                display: inline-block;
                                font-size:24px;
                                font-family:MicrosoftYaHei;
                                font-weight:bold;
                                color:rgba(0,0,0,1);
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                text-align: right;
                                margin-right: 20px;
                            }
                            .circle{
                                width:24px;
                                height:24px;
                                border:1px solid ;
                                box-sizing: border-box;
                                border-radius:50%;
                                display: inline-block;
                                line-height: 20px;
                                position: relative;
                                top:-7px;
                                &-inner{
                                    width:18px;
                                    height:18px;
                                    display: inline-block;
                                    border-radius:50%;
                                    vertical-align: middle;
                                }
                            }
                            .circle.finish{
                                border-color: rgba(0,210,148,1);
                                .circle-inner{
                                    background:rgba(0,210,148,1);
                                }
                            }
                            .circle.error{
                                border-color: #EF0F24;
                                .circle-inner{
                                    background:#EF0F24;
                                }
                            }
                            .circle.running{
                                border-color: #2C92FC;
                                .circle-inner{
                                    background:#2C92FC;
                                }
                            }
                            .circle.waiting{
                                border-color: #D7D3D3;
                                .circle-inner{
                                    background:#D7D3D3;
                                }
                            }
                            .border{
                                width:2px;
                                height:121px;
                                background:rgba(215,211,211,1);
                                border-radius:1px;
                                margin-right: 16px;
                            }
                        }
                        .area-info{
                            position: relative;
                            top: -20px;
                            margin-left: 250px;
                            font-size:22px;
                            font-family:MicrosoftYaHei;
                            font-weight:400;
                            color:rgba(0,0,0,1);
                            li+li{
                                margin-left: 20px;
                            }
                            li.time{
                                margin-top: 28px;
                                text-align: left;
                                color: #6D6D6D;
                                span+span{
                                    margin-left: 28px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
