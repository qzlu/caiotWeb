<template>
    <div class="device-container">
        <el-scrollbar>
            <div class="clearfix">
                <div class="system-device l" v-for="(item,i) in data" :key="i">
                    <h5><i :class="['iconfont',item.WebIconName]"></i>{{item.DeviceType}}({{item.data.length}})</h5>
                    <ul class="clearfix device-list">
                        <li class="l" v-for="device in item.data" :key="device.DeviceID" :class="{alarm:device.IsAlarm}" :style="{width:width+'px'}">
                            <i :class="{r:true,'el-icon-star-off':!device.IsFocus,'el-icon-star-on':device.IsFocus}" @click="addOrDeleteUFocusMonitor(device)"></i>
                            <router-link :to="{ name: 'detail_info_list',params:{ id:device.DeviceID,PossionID:device.DataDetail[0].SDataID,getalldata:device}}">
                                <h4>
                                        {{device.DeviceName}}
                                </h4>
                                <el-row>
                                    <el-col :span="11">
                                        <ul>
                                            <li v-for="(obj,j) in device.DataDetail.slice(0,3)" :key="j">
                                                <el-tooltip placement="top" effect="light">
                                                    <div slot="content">
                                                        <span v-for="(value, i) in obj.SDataValue" :key="i" class="value">{{value.DValue}}<i v-if="i<obj.SDataValue.length-1">/</i></span>
                                                    </div>
                                                    <p><span v-for="(value, i) in obj.SDataValue" :key="i" class="value">{{value.DValue}}<i v-if="i<obj.SDataValue.length-1">/</i></span></p>
                                                </el-tooltip>
                                                <p class="value-title">{{obj.SDataTitle}} <i v-if="obj.SDataUnit!=null&&obj.SDataUnit!=''">({{obj.SDataUnit}})</i></p>
                                            </li>
                                        </ul>
                                    </el-col>
                                    <el-col :span="3">
                                        <div class="status" :class="'status-'+device.DeviceStatus">
                                            <p><i :class="['icon','iconfont',device.WebIconName]"></i></p>
                                            <p>{{device.DeviceStatusTitle}}</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="10">
                                        <ul>
                                            <li v-for="(obj,j) in device.DataDetail.slice(3)" :key="j">
                                                <el-tooltip placement="top" effect="light">
                                                    <div slot="content">
                                                        <span v-for="(value, i) in obj.SDataValue" :key="i" class="value">{{value.DValue}}<i v-if="i<obj.SDataValue.length-1">/</i></span>
                                                    </div>
                                                    <p><span v-for="(value, i) in obj.SDataValue" :key="i" class="value">{{value.DValue}}<i v-if="i<obj.SDataValue.length-1">/</i></span></p>
                                                </el-tooltip>
                                                <p class="value-title">{{obj.SDataTitle}} <i v-if="obj.SDataUnit!=null&&obj.SDataUnit!=''">({{obj.SDataUnit}})</i></p>
                                            </li>
                                        </ul>
                                    </el-col>
                                </el-row>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
<script>
import { Monitor } from '@/request/api.js'
export default {
    data(){
        return{

        }
    },
    props:{
        data:Array,
        width:Number,
        height:Number
    },
    methods:{
    	/**
		 * 162.标记或取消重点监测设备
		 */
		addOrDeleteUFocusMonitor(item){
			Monitor({
				FAction:'AddOrDeleteUFocusMonitor',
				DeviceID:item.DeviceID
			})
			.then(data => {
				this.$emit('change',item)
			})
			.catch(err => {})
		}
    }
}
</script>
<style lang="scss" scoped>
$url:'/static/image';
.device-container{
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    border-radius:10px 6px 6px 10px;
    background: rgba($color: #052256, $alpha: 0.4);
    box-shadow: 0 0 8px 8px rgba($color: #052256, $alpha: 1) inset;
    h5{
        padding-left: 20px;
        line-height: 38px;
        text-align: left;
        font-size:16px;
        color:rgba(24,161,236,1);
        background:linear-gradient(90deg,rgba(17,45,69,0.34),rgba(16,52,78,0.34),rgba(15,60,89,0.34),rgba(15,64,94,0.34),rgba(16,71,101,0.34),rgba(15,66,95,0.34),rgba(15,61,87,0.34),rgba(16,50,77,0.34),rgba(18,45,72,0.34));
        .iconfont{
            font-size: 26px;
            vertical-align: middle;
            margin-right: 10px;
        }
    }
    ul.device-list{
        [class*="el-icon-star-"]{
        	font-size:24px;
            cursor: pointer;
            margin-right: 20px;
        }  
        .el-icon-star-off{
        	color:#525E7E
        }
        .el-icon-star-on{
        	color:#2a91fc
        }
        >li.alarm{
            background: url(#{$url}/indexdetail/content_bg_2.png) 10px 0 no-repeat;
            background-size: 100% 100%;
/*            background: rgba($color: #560505, $alpha: 0.3);
           background-position:-10px 0;
           box-shadow: 0px 0px 10px #9c1428 inset;
           border-radius: 10px; */
        }
        >li{
            width: 25%;
            height: 192px;
            box-sizing: border-box;
            background: url(#{$url}/indexdetail/fvc4e.png) no-repeat;
            background-size: 100% 100%;
            h4{
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                color: #525E7E;
                text-align: left;
                padding:0px 20px;
            }
            .el-row{
                height: 162px;
                .el-col{
                    height: 100%;
                    font-size:16px;
                    position: relative;
                    ul{
                        width: 100%;
                        position: absolute;
                        bottom: 20px;
                        li{
                            width: 100%;
                            text-align: left;
                            padding-left: 10px;
                            margin-top: 10px;
                            box-sizing: border-box;
                            p{
                                width: 100%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                    .status{
                        padding-top: 10px;
                        display: flex;
                        flex-direction: column;
                        align-items: center; 
                    }
                    .status.status-1{
                        color: #1bd1a1
                    }
                    .status.status-2{
                        color: #73777a
                    }
                    .status.status-3{
                        color: #0091fe
                    }
                    .status.status-4{
                        color: #fef500
                    }
                    .status.status-5{
                        color: #9c1428
                    }
                    span.value{
                        color: #03CD82
                    }
                    .value-title{
                        font-size:12px;
                        color: #737373
                    }
                }
                [class*="icon"]{
                    font-size: 50px;
                }
            }
        }
    }
}
</style>
