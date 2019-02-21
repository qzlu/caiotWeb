<template>
    <div class="report">
        <ul class="report-header clearfix">
            <li class="l"><button class="zw-btn zw-btn-primary">保存</button></li>
            <li class="l"><button class="zw-btn zw-btn-primary">放弃</button></li>
            <li class="l"><button class="zw-btn zw-btn-add">新增</button></li>
        </ul>
        <ul class="add-road">
            <li class="l">巡检路线名称<el-input></el-input></li>
            <li class="l">巡检周期
                <el-select v-model="InspectionCycle"  placeholder="请选择">
                    <el-option v-for="time in timeList" :key="time.value" :label="time.label" :value="time.value"></el-option>
                </el-select>
            </li>
            <li class="l" v-if="InspectionCycle === 1">
                频次　每日
                <div class="r time-input">
                    <el-popover
                      placement="bottom"
                      width="200"
                      trigger="click"
                     >
                       <i class="el-icon-circle-plus-outline" slot="reference"></i>
                      <p class="time-title">选择时间</p>
                      <div>

                      </div>
                    </el-popover>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
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
            },
            {
                label:'年巡检',
                value:4
            }],
            InspectionCycle:1, //巡检周期
            time:'',
        }
    }
}
</script>
<style lang="scss">
.add-road{
    li{
        margin-left: 20px;
        font-size: 17px;
        line-height: 46px;
        .el-input{
            width: 146px;
            height: 46px;
             margin-left: 10px;
             &__inner{
                 height: 46px;
                 background: #042E74;
                 border:1px solid rgba(12,55,110,1);
                 font-size: 14px;
                 color: #F1F1F2
             }
        }
        .time-input{
            width:254px;
            height:44px;
            margin-left: 10px;
            position: relative;
            background: #042E74;
            border:1px solid rgba(12,55,110,1);
            .el-icon-circle-plus-outline{
                position: absolute;
                right: 10px;
                top: 14px;
                cursor: pointer;
                background: #042E74;
            }
        }
        .el-input.el-input--suffix{
            width: 116px;
        }
    }
.time-title{
    font-size: 14px;
    color: #525E7E;
    background: #DEDBDB
}
}
</style>
