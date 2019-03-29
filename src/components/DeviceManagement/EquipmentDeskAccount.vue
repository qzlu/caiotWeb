<template>
    <div class="report">
        <el-dialog title="新增设备台账" class="zw-dialog add-device" :visible.sync='show'>
            <h5><span class="icon-border"></span>设备铭牌</h5>
            <el-form inline :model='deviceInfo'>
                <el-form-item label="设备名称"><el-input v-model="deviceInfo.DeviceName"></el-input></el-form-item>
                <el-form-item label="设备编号"><el-input v-model="deviceInfo.DeviceCode"></el-input></el-form-item>
                <el-form-item label="设备参数"><el-input v-model="deviceInfo.DeviceCode"></el-input></el-form-item>
                <el-form-item label="生产厂家"><el-input v-model="deviceInfo.Manufacturer"></el-input></el-form-item>
                <el-form-item label="出厂型号"><el-input v-model="deviceInfo.SpecificationsCode"></el-input></el-form-item>
                <el-form-item label="出厂编号"><el-input v-model="deviceInfo.ManufacturingNumber"></el-input></el-form-item>
                <el-form-item label="使用年限"><el-input v-model="deviceInfo.ServiceLife"></el-input></el-form-item>
                <el-form-item label="出厂日期">
                    <el-date-picker
                        type="date"
                        v-model="deviceInfo.ManufacturingTime"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="质保期限">
                    <el-date-picker
                        type="date"
                        v-model="deviceInfo.PleaseTime"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="设备图片">
                    <el-upload
                      action="/Caiot/FileUpLoad"
                      list-type="picture-card"
                      :data="{FAction:'UpLoadFile',FVersion:'1.0.0',FTokenID:token,ProjectID:projectId}"
                     >
                        <p><i class="el-icon-plus"></i><br><span>上传</span></p>
                    </el-upload>                
                </el-form-item>
                <el-form-item label="设备二维码">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      list-type="picture-card"
                    >
                        <p><i class="el-icon-plus"></i><br><span>上传</span></p>
                    </el-upload>                
                </el-form-item>
            </el-form>
            <h5><span class="icon-border"></span>使用登记</h5>
            <el-form inline :model="deviceInfo">
                <el-form-item label="购买日期">
                    <el-date-picker
                        type="date"
                        v-model="deviceInfo.BuyEventsTime"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="安装日期">
                    <el-date-picker
                        type="date"
                        v-model="deviceInfo.InstallationEventsTime"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="验收日期">
                    <el-date-picker
                        type="date"
                        v-model="deviceInfo.AcceptanceEventsTime"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="项目名称">
                    <el-select>

                    </el-select>
                </el-form-item>
                <el-form-item label="区域名称">
                    <el-select>
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="投运日期">
                    <el-date-picker
                        type="date"
                        v-model="deviceInfo.CastEventsTime"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <h5><span class="icon-border"></span>相关资料<button class="zw-btn zw-btn-add">新增</button></h5>
        </el-dialog>
        <ul class="clearfix report-header">
            <li class="l"><button class="zw-btn zw-btn-add" @click="editDevice">新增</button></li>
            <li class="l">
                <!-- 详情 -->
                <router-link :to="{name:'DeviceInfo',params:{deviceID:selectArr[0].DeviceID}}" v-if="this.selectArr.length === 1">
                    <button class="zw-btn zw-btn-detail"></button>
                </router-link>
                <button class="zw-btn zw-btn-detail" v-else></button>
            </li>
            <!-- 编辑 -->
            <li class="l"><button class="zw-btn zw-btn-edit"></button></li>
            <!-- 删除 -->
            <li class="l"><button class="zw-btn zw-btn-delete" @click="deleteDeviceInfo"></button></li>
            <li class="l">
                <el-dropdown>
                    <button class="zw-btn zw-btn-import">导入</button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <el-upload
                                action="/Caiot/Device"
                                :data="{FAction:'ImportDeviceInfo',FVersion:'1.0.0',FTokenID:token,ProjectID:projectId}"
                                :on-success="handleSuccess"
                            >
                                选择文件
                            </el-upload>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li class="l"><button class="zw-btn zw-btn-export" @click="queryExportDeviceInfo">导出</button></li>
            <li class="r">
                <el-input class="search-input" placeholder="搜索设备关键字" v-model="filterText">
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
                @selection-change="handleSelectionChange"
               >
               <el-table-column
                type="selection"
                width="55"
               >
               
               </el-table-column>   
               <el-table-column
                 v-for="item in tableLabel"
                 :key="item.prop"
                 :prop="item.prop"
                 :label="item.label"
                 :width="item.width"
                 show-overflow-tooltip
                >
               </el-table-column>
            </el-table>
        </div>
        <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
    </div>
</template>
<script>
import {Device} from '@/request/api.js'
import table from '@/mixins/table' //表格混入数据
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
                    prop: 'DeviceName',
                    label: '设备名称'
                },
                {
                    prop: 'DeviceCode',
                    label: '设备编号'
                },
                {
                    prop: 'Manufacturer',
                    label: '生产厂家',
                    width:160
                },
                {
                    prop: 'SpecificationsCode',
                    label: '出厂型号'
                },
                {
                    prop: 'ManufacturingNumber',
                    label: '出厂编号'
                },
                {
                    prop: 'ManufacturingTime',
                    label: '出厂日期',
                    width:'160'
                },
                {
                    prop: 'ServiceLife',
                    label: '使用年限'
                },
                {
                    prop: 'PleaseTime',
                    label: '质保截止',
                    width:'160'
                },
                {
                    prop: '',
                    label: '是否物联设备',
                    width:130
                },
                {
                    prop: 'stateText',
                    label: '设备使用状态',
                    width:130
                }
            ],
            show:false,
            deviceInfo:{ //详情请看接口文档
                DeviceID:null,
                DeviceName:null,
                DeviceCode:null,
                SpecificationsCode:null,
                Manufacturer:null,
                ManufacturingTime:null,
                ManufacturingNumber:null,
                ServiceLife:null,
                PleaseTime:null,
                DevicePhoto:null,
                DeviceQrCode:null,
                DeviceTypeID:null,
                AreaID:null,
                InfoNameStr:null,
                BuyEventsTime:null,
                InstallationEventsTime:null,
                AcceptanceEventsTime:null,
                CastEventsTime:null
            },
            token:localStorage.getItem("Token"),
            projectId:localStorage.getItem('projectid')
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
    computed:{

    },
    created(){
        this.queryData()
    },
    mounted(){

    },
    methods:{
        /**
         * 233.查询分页设备台账
         */
        queryData(){
            Device({
                FAction:'QueryPageDeviceInfo',
                SearchKey:this.filterText,
                PageIndex:this.pageIndex,
                PageSize:10
            })
            .then(data => {
                this.total = data.FObject.Table[0].Count
                this.tableData = data.FObject.Table1
                this.tableData.forEach(element => {
                    this.$set(element,'stateText',element.RunState?'启用':'停用')
                });
            })
            .catch(err => {})
        },
        handleCurrentChange(val){
            this.pageIndex = val
            this.queryData()
        },
        /**
         * 编辑设备台账
         */
        editDevice(){
            this.show = true
            Object.keys(this.deviceInfo).forEach(key => {
                if(this.selectArr[0][key]){
                    this.deviceInfo[key] = this.selectArr[0][key]
                }
            })
        },
        /**
         * 238.查询导出设置台账信息
         */
        queryExportDeviceInfo(){
            Device({
                FAction:'QueryExportDeviceInfo'
            })
            .then(data => {
                window.location = "http://www.szqianren.com/" + data.FObject;
            })
            .catch(err => {})
        },
        /**
         * 导入excel
         */
        handleSuccess(res,file){
            console.log(res,file);
        },
        /**
         * 236.批量删除设备台账信息
         */
        deleteDeviceInfo(){
            Device({
                FAction:'QueryPageDeviceInfo',
                IDStr:''
            })
            .then(data => {

            })
            .catch(err => {})
        }
    }
}
</script>
<style lang="scss">
$img-url:'/static/image/';
.zw-dialog.add-device{
    .el-dialog{
        width: 950px;
        height: 770px;
        background: url(#{$img-url}admin/btn3.png);
        background-size: 100% 100%;
        padding-left: 48px!important;
        h5{
            margin-bottom: 33px;
            .icon-border{
                width:4px;
                height:12px;
                margin-right: 6px;
                vertical-align: middle;
                display: inline-block;
                background:rgba(44,146,252,1);
            }
        }
        .el-form{
            &-item{
                &__label{
                    width: 82px;
                    text-align: right;
                    font-size: 14px;
                    color: #F1F1F2
                }
                .el-date-editor.el-input, .el-date-editor.el-input__inner{
                    width:165px;
                }
                .el-input__inner{
                    width:165px;
                    height:39px;
                    background:rgba(24,64,107,1);
                    border:1px solid rgba(5,103,158,1);
                }
                .el-upload--picture-card{
                    width:165px;
                    height:128px;
                    background:rgba(24,64,107,1);
                    border:1px solid rgba(5,103,158,1);
                    p{
                        line-height: 26px;
                        display: inline-block;
                    }
                }
            }
        }
    }
}
</style>

