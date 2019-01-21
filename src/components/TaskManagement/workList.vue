<template>
    <div class="work-list">
        <ul class="tab-header clearfix">
            <li :class="{active:tabIndex === 1}" @click="tabIndex = 1">全部</li>
            <li :class="{active:tabIndex === 2}" @click="tabIndex = 2">未派单</li>
            <li :class="{active:tabIndex === 3}" @click="tabIndex = 3">已派单</li>
            <li :class="{active:tabIndex === 4}" @click="tabIndex = 4">已接单</li>
            <li :class="{active:tabIndex === 5}" @click="tabIndex = 5">处理中</li>
            <li :class="{active:tabIndex === 6}" @click="tabIndex = 6">已完成</li>
            <div class="r slect">
                <span>工单类型</span> 
                <div @click="showSelectOption = !showSelectOption">{{selectType.name}}<i :class="{'el-icon-caret-bottom':!showSelectOption,'el-icon-caret-top':showSelectOption}"></i></div>
                <ul class="slect-option" v-if="showSelectOption">
                    <li v-for="item in workTypeList" :key="item.value" @click="selectType = item;showSelectOption = false">{{item.name}}</li>
                </ul>
            </div>
        </ul>
        <div class="tab-content">
            <div class="tab-item" v-if="tabIndex === 1">
                <div>
                    <el-table
                       :data="tableData"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
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
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 2">
                <div>
                    <el-table
                       :data="tableData"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
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
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 3">
                <div>
                    <el-table
                       :data="tableData"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
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
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 4">
                <div>
                    <el-table
                       :data="tableData"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
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
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 5">
                <div>
                    <el-table
                       :data="tableData"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
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
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
            </div>
            <div class="tab-item" v-if="tabIndex === 6">
                <div>
                    <el-table
                       :data="tableData"
                       style="width: 100%"
                       header-row-class-name="el-table-header"
                       :row-class-name="tableRowClassName"
                       >
                       <el-table-column
                         v-for="item in tableLabel1"
                         :key="item.label"
                         :prop="item.prop"
                         :label="item.label"
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
                <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import table from '@/mixins/table' //表格混入数据
import {zwPagination} from '@/zw-components/index'
export default {
    mixins:[table],
    data(){
        return{
            tabIndex:1,
            tableLabel:[
                {
                    prop: 'Row',
                    label: '序号'
                },
                {
                    prop: 'FName',
                    label: '工单类型'
                },
                {
                    prop: 'FSimpleName',
                    label: '工单状态'
                },
                {
                    prop: 'CreatorBy',
                    label: '工单内容'
                },
                {
                    prop: 'LastUpdateby',
                    label: '创建时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '派单时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '接单时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '巡检时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '完成时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '负责人'
                }
            ],
            tableLabel1:[
                {
                    prop: 'Row',
                    label: '序号'
                },
                {
                    prop: 'FName',
                    label: '工单类型'
                },
                {
                    prop: 'CreatorBy',
                    label: '工单内容'
                },
                {
                    prop: 'LastUpdateby',
                    label: '创建时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '派单时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '接单时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '巡检时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '完成时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '负责人'
                }
            ],
            workTypeList:[
                {
                    name:'巡检',
                    value:1
                },
                {
                    name:'巡跟',
                    value:2
                },
                {
                    name:'抄表',
                    value:3
                },
                {
                    name:'保养',
                    value:4
                },
                {
                    name:'维修',
                    value:5
                },
                {
                    name:'抽检',
                    value:6
                },
            ],
            selectType:{
                name:'巡检',
                value:1
            },
            showSelectOption:false
        }
    },
    components:{
        zwPagination
    },
    watch:{

    },
    created(){

    },
    mounted(){

    },
    methods:{
        handleCurrentChange(){

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
            .slect{
                position: relative;
                right: 60px;
                div{
                    display: inline-block;
                    width: 70px;
                    height: 30px;
                    line-height: 30px;
                    margin-left:10px;
                    padding-left: 10px;
                    border:1px solid #134FA4;
                    cursor: pointer;
                    text-align: left;
                    i{
                        position: absolute;
                        top: 6px;
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
                        width: 82px;
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
        }
        .tab-content{
            height: 864px;
            background: url(#{$img-url}task/bg_1.png)  no-repeat;
            padding: 56px 46px 85px 57px;
            box-sizing: border-box;
            position: relative;
        }
    }
</style>
