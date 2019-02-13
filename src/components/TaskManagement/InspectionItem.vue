<template>
    <div class="">
        <ul class="clearfix report-header">
            <li class="l" @click=""><button class="zw-btn zw-btn-add">新增</button></li>
            <li class="l"><button class="zw-btn zw-btn-export">导出</button></li>
            <li class="l"><button class="zw-btn zw-btn-refrest">刷新</button></li>
            <li class="r">
                <el-input class="search-input" placeholder="搜索设备关键字" v-model="filterText">
                    <i class="el-icon-search" slot="suffix"></i>
                </el-input>
                <el-button type="primary">
                  高级搜索<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
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

</style>

