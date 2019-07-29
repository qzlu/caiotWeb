<template>
    <div class="area-browse">
        <div class="aside">
            <card title="天气信息" :showMoreIcon = 'false' :height='214'>
                <div class="weather">
                    <p class="time">{{time}}</p>
                    <p class="date">{{date}}</p>
                    <p>
                      <i :class="['iconfont', weather.WeatherIconID]"></i>
                      <i class="high-temp"><span>{{weather.HighTemp}}</span>℃</i>/<i class="" style="margin-left: 5px;">{{weather.LowTemp}}℃</i>
                    </p>
                </div>
            </card>
            <card title="实时告警"  :height='328'>
                <div class="alarm-list">
                    <el-scrollbar>
                        <ul>
                            <li v-for="(item,i) in alarmData" :key="i">
                                <span>{{item.AlarmTime}}</span>
                                <span>{{item.AlarmText}}</span>
                            </li>
                        </ul>
                    </el-scrollbar>
                </div>
            </card>
            <card title="实时工单"  :height='331'>
                <div class="alarm-list">
                    <el-scrollbar>
                        <ul>
                            <li v-for="(item,i) in orderData" :key="i">
                                <span>{{item.OrderCreateDateTime}}</span>
                                <span>{{item.OrderContent}}</span>
                            </li>
                        </ul>
                    </el-scrollbar>
                </div>
            </card>
        </div>
        <div class="main">
            <div class="main-top">
                <div :class="['l', 'operation', 'pre',{'no-click':lastIndex === 4}]" @click="pre()">
                    <i class="iconfont icon-Leftparentheses"></i>
                </div>
                <div :class="['r', 'operation', 'next',{'no-click':lastIndex === areaCount.length-1}]" @click="next()">
                    <i class="iconfont icon-Rightparentheses"></i>
                </div>
                <div class="area-container">
                    <ul class="area-list l" :style="{left:-(lastIndex-4)*290+'px'}">
                        <li :class="['item',{alarm:item.AlarmCount>0,active:item.AreaID == activeArea.AreaID}]" v-for="(item,i) in areaCount" :key="i" @click="selectArea(item)">
                            <p class="area-name">{{item.AreaName}}</p>
                            <div class="area-param">
                                <ul class="data-item">
                                    <li v-for="(obj,j) in item.DataDetail" :key="j">
                                        <div class="item-name">
                                            <p>{{obj.ShowName}}</p>
                                            <p>({{obj.ShowUnit}})</p>
                                        </div>
                                        <p class="value">{{obj.CollectData}}</p>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <div class="statu">
                                            <span class="icon run"></span>
                                            运行
                                        </div>
                                        <p class="value">{{item.RunCount}}</p>
                                    </li>
                                    <li>
                                        <div class="statu">
                                            <span class="icon stop"></span>
                                            停止
                                        </div>
                                        <p class="value">{{item.StopCount}}</p>
                                    </li>
                                    <li>
                                        <div class="statu">
                                            <span class="icon alarm"></span>
                                            告警
                                        </div>
                                        <p class="value">{{item.AlarmCount}}</p>
                                    </li>
                                    <li>
                                        <div class="statu">
                                            <span class="icon repair"></span>
                                            维修
                                        </div>
                                        <p class="value">{{item.RepairCount}}</p>
                                    </li>
                                    <li>
                                        <div class="statu">
                                            <span class="icon maintain"></span>
                                            保养
                                        </div>
                                        <p class="value">{{item.MaintainCount}}</p>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main-bottom">
                <device-list :data="areaDevice" @change="getPrjSingleInfo()"></device-list>
            </div>
        </div>
    </div>
</template>
<script>
import Card from './card.vue'
import formatDate from '@/utils/formatDate'
import {project,ProjectTrend, Orders} from '@/request/api.js'
import deviceList from './deviceList.vue'
import { setTimeout, clearTimeout } from 'timers';
export default {
    data(){
        return{
            time:null, //日期时间
            date:null,
            timer:null,
            timer1:null,
            weather:{
                HighTemp:null,
                LowTemp:null,
                WhetherIconID:null
            },
            areaCount:[], //所有区域
            lastIndex:4, //记录区域当前显示的最后一个index
            activeArea:null,
            areaDevice:[], //区域设备
            alarmData:[], //实时告警数据
            orderData: [], //实时工单数据
        }
    },
    components:{
        Card,
        deviceList
    },
    created(){
        this.getTime()
        this.queryData()
    },
    beforeDestroy(){
        clearTimeout(this.timer)
        clearTimeout(this.timer1)
        this.timer = null
        this.timer1 = null
    },
    methods:{
        /**
         * 点击区域列表上一个
         */
        pre(){
            this.lastIndex > 4 && this.lastIndex --
        },
        /**
         * 点击区域列表下一个
         */
        next(){
            this.lastIndex < this.areaCount.length-1 && this.lastIndex ++
        },
        /**
         * 获取时间
         */
        getTime(){
            this.time = formatDate(new Date(),'YYYY-MM-DD HH:mm')
            this.date = formatDate(new Date(),'EEE')
            setTimeout(this.getTime,1000)
        },
        queryData(){
            this.getWeather()
            this.queryUAreaDeviceByCount()
            this.getAlarmRealData()
            this.queryPageUOrdersByDate()
            this.timer1 = setTimeout(this.queryData,5000)
        },
        /**
         * getWeather 获取天气信息
         * @private
         */
        getWeather() {
          project({
	    	    FAction: "GetPrjWeatherData",
	        })
	        .then(data => {
                this.weather = data.FObject[0]
	        })
	        .catch(error => {
	        })
        },
        /**
         * 390.区域态势（区域设备统计）
         */
        queryUAreaDeviceByCount(){
            ProjectTrend({
                FAction: 'QueryUAreaDeviceByCount'
            })
            .then((result) => {
                this.areaCount = result.FObject
                !this.activeArea && (this.activeArea = this.areaCount[0])
                this.getPrjSingleInfo()
            }).catch((err) => {
                
            });
        },
        /**
         * 6.根据类别获取项目单个信息详情
         */
        getPrjSingleInfo(){
            if(!this.activeArea.AreaID) return
            project({
                FAction: 'GetPrjSingleInfo',
                SingleType:2,
                SingleID:this.activeArea.AreaID
            })
            .then((result) => {
                let data = result.FObject
                let areaDevice = data.ProjectDeviceTypeValue.map(item => {
                    return Object.assign(item,{
                        data:data.ProjectDeviceDataDetail.filter(obj => obj.DeviceTypeID == item.DeviceTypeID)
                    })
                })
                this.areaDevice = areaDevice.filter(item => item.data.length>0)
            }).catch((err) => {
                
            });
        },
        /**
         * 选择区域
         */
        selectArea(item){
            this.activeArea = item
            this.getPrjSingleInfo()
        },
        /**
         * 7.获取项目实时未恢复告警
         */
        getAlarmRealData(){
            project({
                FAction: 'GetAlarmRealData'
            })
            .then((result) => {
                this.alarmData = result.FObject||[]
            }).catch((err) => {
                
            });
        },
        /**
         * 实时工单
         */
        queryPageUOrdersByDate(){
            Orders({
                FAction: 'QueryPageUOrdersByDate',
                FState: -1,
                PageIndex:1,
                PageSize: 1000
            })
            .then((result) => {
                this.orderData = result.FObject
            }).catch((err) => {
                
            });
        },
    }
}
</script>
<style lang="scss">
$url:'/static/image';
.area-browse{
    display: flex;
    height: 912px;
    justify-content: space-around;
    .aside{
        width: 300px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .weather{
            margin-top: 23px;
            font-size:20px;
            font-family:BigYoungBoldGB20;
            font-weight:400;
            color:rgba(96,122,179,1);
            p:last-of-type{
                line-height: 60px;
                .iconfont{
                    color: #2A91FC;
                    font-size: 60px;
                    vertical-align: middle;
                }
                .high-temp{
                    color: #2A91FC;
                    span{
                        font-size: 32px;
                    }
                }
            }
        }
        .alarm-list{
            margin-top: 10px;
            height: 260px;
            padding:  0 10px;
            ul{
                li{
                    line-height: 50px;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px dashed #FFFFFF
                }
            }
        }
    }
    .main{
        width: 1540px;
        height: 100%;
        &-top{
            width: 100%;
            height: 215px;
            .operation{
                width:47px;
                height:210px;
                line-height: 210px;
                background:rgba(12,52,104,1);
                cursor: pointer;
                .iconfont{
                    font-size: 40px;
                    font-weight: bolder;
                }
            }
            .operation.no-click{
                background: #35405d;
                cursor: not-allowed;
                .iconfont{
                    color: #6f757d
                }
            }
            .area-container{
                height: 230px;
                margin: 0 62px;
                overflow: hidden;
                position: relative;
                top: -15px;
                .area-list{
                    white-space: nowrap;
                    position: relative;
                    transition:all 0.5s;
                    .item{
                        display: inline-block;
                        width: 279px;
                        height: 230px;
                        background: url(#{$url}/index/content_bg_1.png);
                        background-size: 100% 100%;
                        cursor: pointer;
                        overflow: hidden;
                        .area-name{
                            line-height: 30px;
                            position: relative;
                            top: 0px;
                            font-size:16px;
                        }
                        .area-param{
                            padding: 0 20px;
                            height: 200px;
                            display: flex;
                            justify-content: space-between;
                            ul{
                                width: 100px;
                                height: 100%;
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                li{
                                    width: 100%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                }
                            }
                            ul.data-item{
                                li{
                                    height: 60px;
                                    .value{
                                        font-size: 25px;
                                        color:rgba(3,205,130,1);
                                    }
                                }
                            }
                            ul:last-of-type{
                                li{
                                    .statu{
                                        font-size: 14px;
                                        line-height: 18px;
                                        .icon{
                                            display: inline-block;
                                            width: 12px;
                                            height: 12px;
                                            border-radius: 4px;
                                            vertical-align: middle;
                                        }
                                        .run{
                                            background: #00D294;                                       
                                        }
                                        .stop{
                                            background: #747474;      
                                        }
                                        .alarm{
                                            background: #E89F52;   
                                        }
                                        .repair{
                                            background: #2E90F5;   
                                        }
                                        .maintain{
                                            background: #F5DC5B;   
                                        }
                                    }
                                    .value{
                                        font-size: 20px
                                    }
                                }
                            }
                        }
                    }
                    .item+.item{
                        margin-left: 6px
                    }
                    .item.alarm{
                        background: url(#{$url}/index/content_bg_2.png);
                        background-size: 100% 100%;
                    }
                    .item.active{
                    }
                }
            }
        }
        &-bottom{
            width:1550px;
            height:662px;
            margin-top: 36px;
        }
    }
}
</style>
