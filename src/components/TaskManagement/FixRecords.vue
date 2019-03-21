<template>
    <div class="report">
        <ul class="report-header clearfix">
            <li class="l">
                <span class="label">月份　</span>
                <el-date-picker
                  v-model="time"
                  type="month"
                  @change="selectTime"
                  placeholder="选择日期"
                ></el-date-picker>
            </li>
            <li class="l">
                <button class="zw-btn zw-btn-export">导出</button>
            </li>
            <li class="l">
                <button class="zw-btn zw-btn-report">维修月报</button>
            </li>
            <li class="r">
                <el-input class="search-input" placeholder="搜索设备关键字" v-model="filterText">
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
        
    </div>
</template>
<script>
import table from '@/mixins/table' //表格混入数据
import { sort } from 'semver';
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
                    prop: 'OrderCreateDateTime',
                    label: '报事时间',
                    sortble:'custom'
                },
                {
                    prop: 'ReportMatterObjectName',
                    label: '报事对象',
                    sortble:'custom'
                },
                {
                    prop: 'ReportMatterEventType',
                    label: '报事类型',
                },
                {
                    prop: 'RunningOrderDateTime',
                    label: '维修时间',
                    sortble:'custom'
                },
                {
                    prop: 'FContacts',
                    label: '维修人'
                },
            ],
            time:new Date(),
            filterText:''
        }
    }
}
</script>
<style lang="scss">

</style>
