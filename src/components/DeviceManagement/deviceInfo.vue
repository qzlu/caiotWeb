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
            <li>
                <router-link :to="{name:'log'}">
                    启停日志
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'file'}">
                    相关资料
                </router-link>
            </li>
        </ul>
        <div class="tab-content">
            <router-view :deviceID = 'deviceID'>

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
    },
    mounted(){
        // this.queryDeviceRunngStopRecord()
    },
    methods:{

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
        }
    }
</style>
