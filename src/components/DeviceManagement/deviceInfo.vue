<template>
    <div class="device-info">
        <router-link :to="{name:'EquipmentDeskAccount'}">
            <button class="zw-btn back" ><i class="el-icon-arrow-left"></i>返回</button>
        </router-link>
        <ul class="tab-header clearfix">
            <li>
                <router-link :to="{name:'basicInfo'}">
                    基本信息
                </router-link>
            </li>
            <li>
                <router-link :to ="{name:'breakingNews',params:{id:deviceID}}">
                    大事件
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'alarmRecord'}">
                    告警记录
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'fixRecord'}">
                    维修记录
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'deviceMaintenanceRecord'}">
                    保养记录
                </router-link>
            </li>
<!--             <li>
                <router-link >
                    启停日志
                </router-link>
            </li> -->
        </ul>
        <div class="tab-content">
            <router-view>

            </router-view>
        </div>
    </div>
</template>
<script>
import {Device} from '@/request/api.js';
export default {
    data(){
        return{
            deviceID:''
        }
    },
    created(){
        this.deviceID = this.$route.params.deviceID
        console.log(this.$route.params);
        this.queryDeviceRunngStopRecord()
    },
    methods:{
        /**
         * 237.查询设备启停日志
         */
        queryDeviceRunngStopRecord(){
            console.log(this.deviceID);
            Device({
                FAction:'QueryDeviceRunngStopRecord',
                DeviceID:this.deviceID
            })
            .then((data) => {
                console.log(data);
            }).catch((err) => {
                
            });
        }
    }
}
</script>
<style lang="scss">
    $img-url:'/static/image/';
    .device-info{
        position: relative;
        .back{
            position: absolute;
            top: -32px;
            left: 0;
            background: #DCDFDE;
            opacity:0.16;
            color: #607AB3;
            font-size: 20px;
        }
        .tab-header{
            padding-left: 40px;
            >li{
                width: 137px;
                height: 46px;
                line-height: 46px;
                font-size: 16px;
                margin: 0 3px;
                float: left;
                cursor: pointer;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: white;
                    background: url(#{$img-url}task/t2.png);
                }
                .router-link-exact-active{
                    background: url(#{$img-url}task/t1.png);
                }
            }
        }
        .tab-content{
            height: 864px;
            background: url(#{$img-url}task/bg_1.png)  no-repeat;
            box-sizing: border-box;
            padding: 26px 26px;
            &-item{
                height: 100%;
                .header{
                    height:55px;
                    line-height: 55px;
                    background:linear-gradient(90deg,rgba(17,45,69,0.34),rgba(16,52,78,0.34),rgba(15,60,89,0.34),rgba(15,64,94,0.34),rgba(16,71,101,0.34),rgba(15,66,95,0.34),rgba(15,61,87,0.34),rgba(16,50,77,0.34),rgba(18,45,72,0.34));
                    border-radius:10px 6px 6px 10px;
                    text-align: left;
                    padding-left: 50px;
                    img{
                        width:30px;
                        height:25px;
                        vertical-align: middle;
                    }
                    span{
                        font-size:16px;
                        font-family:MicrosoftYaHeiUI;
                        font-weight:400;
                        color:#18A1EC;
                    }
                }
                .info-content,.use-time{
                    width: 100%;
                    height: 216px;
                    ul{
                        margin-top: 30px;
                        li{
                            width: 33.33%;
                            font-size: 17px;
                            color: #737373;
                            line-height: 40px;
                            span{
                                color: #00D294
                            }
                        }
                    }
                }
                .use-time{
                    height: 120px;
                }
            }
        }
    }
</style>
