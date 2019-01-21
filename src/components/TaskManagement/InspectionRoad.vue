<template>
    <div class="road">
        <ul class="road-head clearfix">
            <li class="l road-head-add" @click="">新增</li>
            <li class="l road-head-export">导出</li>
            <li class="l road-head-print"><i class="el-icon-printer"></i>打印</li>
            <li class="r">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
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
                >
               </el-table-column>
               <el-table-column
                 prop=""
                 label="操作">
                 <template slot-scope="scoped">
                     <div class="role-operation">
                        <span @click="">删除</span>
                        <span @click="">编辑</span>
                     </div>
                 </template>
               </el-table-column>
            </el-table>
        </div>
        <zw-pagination @pageIndexChange='' :pageIndex='pageIndex' :total='total'></zw-pagination>
    </div>
</template>
<script>
import table from '@/mixins/table' //表格混入数据
import {zwPagination} from '@/zw-components/index'
export default {
    mixins:[table],
    data(){
        return{
            tableLabel:[
                {
                    prop: 'FName',
                    label: '序号'
                },
                {
                    prop: 'FSimpleName',
                    label: '路线ID'
                },
                {
                    prop: 'CreatorBy',
                    label: '路线名称'
                },
                {
                    prop: 'LastUpdateby',
                    label: '设备总数'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '频次'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '巡检周期'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '巡检时间'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '制单人'
                },
                {
                    prop: 'FLastUpdateTime',
                    label: '制单时间'
                }
            ],
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
.road{
    height: 920px;
    padding: 56px 46px 85px 57px;
    box-sizing: border-box;
    background: url('#{$img-url}index/count_back.png') center no-repeat;
    .road-head{
        margin-bottom: 15px;
        li.l{
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
        &-print{
            background: #0a3c7b;
            padding-left: 0!important;
            width: 88px!important;
            text-align: center!important;
        }
    }
}
</style>

