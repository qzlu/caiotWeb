<template>
    <div class="compre-hensive">
        <div class="aside">
            <card title="设备态势">
                <div class="pie-chart">
                    <pie-chart :data='deviceCount' :color='["#00D294","#747474","#F19E40","#2A91FC", "#F1E240"]' :setting="{center:['98','50%']}"></pie-chart>
                    <div class="border-dashed">
                        <p class="title">设备总数</p>
                        <p class="value">{{this.count.DeviceCount}}</p>
                    </div>
                    <ul>
                        <li v-for="(item,i) in deviceCount.rows||[]" :key="i">
                            {{item.value}}
                        </li>
                    </ul>
                </div>
                <div class="top5">
                    <h5>
                        <p>设备类型完好率</p>
                        <p><span class="sort-type" @click="sortType = !sortType ;queryDeviceTypeRanking()"><i :class="['iconfont',sortType?'icon-Godown':'icon-Goup']"></i></span>TOP5</p>
                    </h5>
                    <ul>
                        <li v-for="(item,i) in intactRate" :key="i">
                            <span class="index">{{i+1}}</span>
                            <span class="device-type" :title="item.DeviceTypeName">{{item.DeviceTypeName}}</span>
                            <div class="bar-out">
                                <div class="bar-inner" :style="{width:item.Report+'%'}">
                                </div>
                            </div>
                            <span class="value">{{item.Report+'%'}}</span>
                        </li>
                    </ul>
                </div>
            </card>
            <card title="能耗态势">
                <ul class="item-list">
                    <li>
                        <p class="label">计划电耗</p>
                        <p class="value">{{energyCount.PlanEnergy>10000?`${(energyCount.PlanEnergy/10000).toFixed(1)}W`:energyCount.PlanEnergy||'--'}}</p>
                    </li>
                    <li>
                        <p class="label">本月电耗</p>
                        <p class="value">{{energyCount.CurEnergy>10000?`${(energyCount.CurEnergy/10000).toFixed(1)}W`:energyCount.CurEnergy||'--'}}</p>
                    </li>
                    <li>
                        <p class="label">上月电耗</p>
                        <p class="value">{{energyCount.PriorEnergy>10000?`${(energyCount.PriorEnergy/10000).toFixed(1)}W`:energyCount.PriorEnergy||'--'}}</p>
                    </li>
                </ul>
                <div class="chart">
                    <bar-chart :data = 'energyChartData'></bar-chart>
                </div>
            </card>    
        </div>
        <div class="main">
            <div class="main-top">
                <div class="main-top-left main-top-side">
                    <div class="number-container">
                        <h5>实时告警</h5>
                        <number :data="count.RealAlarmCount"></number>
                    </div>
                    <div class="button first">
                        <div class="icon">
                            <p><i class="iconfont icon-Equipment"></i></p>
                            <p>设备数</p>
                        </div>
                        <p class="value">{{count.DeviceCount||0}}</p>
                    </div>
                    <div class="button">
                        <div class="icon">
                            <p><i class="iconfont icon-JTJC-Totalenergyconsumption"></i></p>
                            <p>本月耗电</p>
                        </div>
                        <p class="value">{{energyCount.CurEnergy>10000?`${(energyCount.CurEnergy/10000).toFixed(1)}W`:energyCount.CurEnergy||'--'}}</p>
                    </div>
                </div>
                <div class="main-top-center">
                    <ul class="octagon">
                        <li v-for="(item,i) in systemList" :class="{'un-use':item.FState==2,'unnormal':item.FState==1}" :key='i'>
                            <p>{{item.SystemParamName}}</p>
                            <div class="system-type">
                                <i :class="['iconfont',item.IconName]"></i>
                            </div>
                        </li>
                        <li :class="['state',{'unnormal':isUnnormal}]">
                            <div>
                                <i :class="['iconfont', isUnnormal?'icon-Alarm':'icon-Onlinerate']"></i>
                            </div>
                            <p>{{isUnnormal?'异常':'正常'}}</p>
                        </li>
                    </ul>
                </div>
                <div class="main-top-right main-top-side">
                    <div class="number-container">
                        <h5>实时工单</h5>
                        <number :data="count.RealOrderCount"></number>
                    </div>
                    <div class="button first">
                        <p class="value">{{count.TodayAlarmCount||0}}</p>
                        <div class="icon">
                            <p><i class="iconfont icon-SZXFY-Earlywarning"></i></p>
                            <p>今日告警</p>
                        </div>
                    </div>
                    <div class="button">
                        <p class="value">{{count.TodayOrder||0}}</p>
                        <div class="icon">
                            <p><i class="iconfont icon-Workingodd"></i></p>
                            <p>今日工单</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-footer">
                <monitor-data></monitor-data>
            </div>
        </div>
        <div class="aside">
            <card title="告警态势">
                <div class="pie-chart">
                    <pie-chart :series='alarmCount' :color='["#00D294","#747474","#89192E","#F19E40"]' :setting="{center:['98','50%']}"></pie-chart>
                    <div class="border-dashed">
                        <p class="title">今日告警</p>
                        <p class="value">{{count.TodayAlarmCount}}</p>
                    </div>
                    <ul>
                        <li v-for="(item,i) in alarmCount[0].data||[]" :key="i">
                            {{item.value}}
                        </li>
                        <li v-for="(item,i) in alarmCount[1].data||[]" :key="i+'2'">
                            {{item.value}}
                        </li>
                    </ul>
                </div>
                <div class="top5">
                    <h5>
                        <p>告警类型排名</p>
                        <p><span class="sort-type" @click="sortType1 = !sortType1 ;queryAlarmRanking()"><i :class="['iconfont',sortType1?'icon-Godown':'icon-Goup']"></i></span>TOP5</p>
                    </h5>
                    <ul>
                        <li v-for="(item,i) in alarmIntactRate" :key="i">
                            <span class="index">{{i+1}}</span>
                            <span class="device-type" :title="item.AlarmTypeName">{{item.AlarmTypeName}}</span>
                            <div class="bar-out">
                                <div class="bar-inner" :style="{width:item.AlarmCount+'%'}">
                                </div>
                            </div>
                            <span class="value">{{item.AlarmCount+'%'}}</span>
                        </li>
                    </ul>
                </div>
            </card>
            <card title="工单态势">
                <ul class="item-list">
                    <li>
                        <p class="label">今日工单</p>
                        <p class="value">{{this.count.TodayOrder}}</p>
                    </li>
                    <li>
                        <p class="label">完成率</p>
                        <p class="value">{{this.count.CompletionRate}}%</p>
                    </li>
                    <li>
                        <p class="label">及时率</p>
                        <p class="value">{{this.count.Timeliness}}%</p>
                    </li>
                </ul>
                <div class="chart">
                    <bar-chart :data='orderChartData'></bar-chart>
                </div>
            </card>
        </div>
    </div>
</template>
<script>
import {pieChart, barChart,Number} from '@/zw-components/index.js'
import {ProjectTrend} from '@/request/api.js'
import card from './card.vue'
import monitorData from './monitorData.vue'
export default {
    data(){
        return{
            deviceCount:{
                colums:['运行','停止','告警','维修', '保养'],
                rows: [
                    {
                      name: '运行',
                      value: 0
                    },
                    {
                        name: '停止',
                        value: 0
                    },
                    {
                        name: '告警',
                        value: 0
                    },
                    {
                        name: '维修',
                        value: 0
                    },
                    {
                        name: '保养',
                        value: 0
                    }
                ]
            },
            count:{},//设备统计  告警统计 工单统计
            sortType:0,//设备完好率排序方式
            intactRate: [],//完好率排名
            sortType1:0,//告警排名排序方式 0 为降序
            alarmIntactRate: [], //告警排名
            energyCount:{}, //能耗统计
            energyChartData:{}, //分项能耗
            orderChartData:{},//工单类型柱形图数据
            alarmCount:[
                {
                    type:'pie',
                    radius: ["52", "60"],
                    center:['98','50%'],
                    label:{
                        show:false
                    },
                    data: [
                        {
                            name: '已恢复',
                            value: 200
                        },
                        {
                            name: '未恢复',
                            value: 50
                        }
                    ]
                },
                {
                    type:'pie',
                    radius: ["39", "44"],
                    center:['98','50%'],
                    label:{
                        show:false
                    },
                    data: [
                        {
                            name: '严重',
                            value: 10
                        },
                        {
                            name: '一般',
                            value: 240
                        }
                    ]
                }
            ],
            systemList:[],//中间八边形
            isUnnormal:false,//是否有异常（系统）中间八边形
            timer:null,
        }
    },
    components:{
        card,
        pieChart,
        barChart,
        Number,
        monitorData
    },
    created(){
        this.queryData()
    },
    beforeDestroy(){
        clearTimeout(this.timer)
        this.timer = null
    },
    methods:{
        queryData(){
            this.querySystemAlarmState()
            this.queryUSituationStatistics()
            this.queryDeviceTypeRanking()
            this.queryAlarmRanking()
            this.queryEnergyByMonth()
            this.queryCompleteOrder()
            this.timer = setTimeout(this.queryData,5000)
        },
        /**
         * 388.综合态势（系统分类状态）中间八边形图
         */
        querySystemAlarmState(){
            ProjectTrend({
                FAction: 'QuerySystemAlarmState'
            })
            .then((result) => {
                this.systemList = result.FObject
                this.isUnnormal = this.systemList.some(item => item.FState ==1)
            }).catch((err) => {
                console.log(err)
            });
        },
        /**
         * 386.综合态势（设备统计  告警统计 工单统计）
         */
        queryUSituationStatistics(){
            ProjectTrend({
                FAction: 'QueryUSituationStatistics'
            })
            .then((result) => {
                this.count = result.FObject[0]||{}
                this.deviceCount = {
                    colums:['运行','停止','告警','维修', '保养'],
                    rows: [
                        {
                          name: '运行',
                          value: this.count.RunCount
                        },
                        {
                            name: '停止',
                            value: this.count.StopCount
                        },
                        {
                            name: '告警',
                            value: this.count.AlarmCount
                        },
                        {
                            name: '维修',
                            value: this.count.RepairCount
                        },
                        {
                            name: '保养',
                            value: this.count.MaintainCount
                        }
                    ]
                }
                this.alarmCount = [
                    {
                        type:'pie',
                        radius: ["52", "60"],
                        center:['98','50%'],
                        label:{
                            show:false
                        },
                        data: [
                            {
                                name: '已恢复',
                                value: this.count.RecoveryCount
                            },
                            {
                                name: '未恢复',
                                value: this.count.NotRecoveryCount
                            }
                        ]
                    },
                    {
                        type:'pie',
                        radius: ["39", "44"],
                        center:['98','50%'],
                        label:{
                            show:false
                        },
                        data: [
                            {
                                name: '严重',
                                value: this.count.SeriousCount
                            },
                            {
                                name: '一般',
                                value: this.count.CommonlyCount
                            }
                        ]
                    }
                ]
            }).catch((err) => {
                
            });
        },
        /**
         * 382.综合态势柱形（设备类型完好率 top 5）
         */
        queryDeviceTypeRanking(){
            ProjectTrend({
                FAction: 'QueryDeviceTypeRanking',
                FSort: this.sortType?'asc':'desc',
            })
            .then((data) => {
                this.intactRate = data.FObject
            }).catch((err) => {
                
            });
        },
        /**
         * 383.告警类型排名 top 5）
         */
        queryAlarmRanking(){
            ProjectTrend({
                FAction: 'QueryAlarmRanking',
                FSort: this.sortType1?'asc':'desc',
            })
            .then((data) => {
                this.alarmIntactRate = data.FObject     
            }).catch((err) => {
                
            });
        },
        /**
         * 385.综合态势柱形（能耗态势）
         */
        queryEnergyByMonth(){
            ProjectTrend({
                FAction: 'QueryEnergyByMonth'
            })
            .then((data) => {
                this.energyCount = data.FObject.Table[0]||{}
                let columns = data.FObject.Table1.map(item => item.DeviceItemName)
                let rows = [
                    {
                        name: '上月',
                        type: 'bar',
                        barWidth: 10,
                        data: data.FObject.Table1.map(item => item.PriorEnergy)
                    },
                    {
                        name: '本月',
                        type: 'bar',
                        barWidth: 10,
                        data: data.FObject.Table1.map(item => item.CurEnergy)
                    },
                ]
                this.energyChartData = {
                    title:'分项能耗（kwh）',
                    rows,
                    columns,
                    colorsArr:['#2A91FC','#18DE94']
                }
            }).catch((err) => {
                
            });
        },
        /**
         * 384.综合态势柱形（工单类型完成率及时率）
         */
        queryCompleteOrder(){
            ProjectTrend({
                FAction: 'QueryCompleteOrder'
            })
            .then((result) => {
                let data = result.FObject||[]
                let columns = data.map(item => item.OrderTypeName)
                let rows = [
                    {
                        name: '及时率',
                        type: 'bar',
                        barWidth: 10,
                        data:data.map(item => item.Timely)
                    },
                    {
                        name: '完成率',
                        type: 'bar',
                        barWidth: 10,
                        data:data.map(item => item.Complete)
                    }
                ]
                this.orderChartData = {
                    title:'工单类型（个）',
                    rows,
                    columns,
                    colorsArr:['#2A91FC','#18DE94']
                }
            }).catch((err) => {
                
            });
        }
    }
}
</script>
<style lang="scss">
.compre-hensive{
    display: flex;
    height: 912px;
    justify-content: space-around;
    .aside{
        width: 336px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .pie-chart{
            width: 100%;
            height: 142px;
            margin: 22px 0;
            position: relative;
            .border-dashed{
                position: absolute;
                width: 142px;
                height: 142px;
                border: 1px dashed #1A478B;
                border-radius: 50%;
                left: 27px;
                top:0;
                z-index: 5;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .title{
                    font-size: 12px;
                    color: #F1F1F2;
                }
                .value{
                    margin-top: 10px;
                    font-size: 22px;
                    color: #00D294
                }
            }
            ul{
                position: absolute;
                height: 100%;
                top:0;
                right: 40px;
                text-align: right;
                font-size: 17px;
                color: #F1F1F2;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }
        .top5{
            padding: 0 22px;
            h5{
                display: flex;
                justify-content: space-between;
                font-size:14px;
                p{
                    position: relative;
                    .sort-type{
                        position: absolute;
                        width:16px;
                        height:18px;
                        line-height: 18px;
                        left: -20px;
                        top: -4px;
                        cursor: pointer;
                        background:rgba(170,29,48,1);
                        border-radius:4px;
                        .iconfont{
                            font-size: 12px;
                        }
                    }
                }
            }
            ul{
                margin-top: 10px;
                li{
                    display: flex;
                    align-items: center;
                    line-height: 30px;
                    font-size: 14px;
                    .index{
                        margin-right: 10px;
                    }
                    .device-type{
                        width: 80px;
                        text-align: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .bar-out{
                        width: 140px;
                        height: 8px;
                        .bar-inner{
                            width: 0;
                            height: 100%;
                            transition: 0.3s;
                            background: #18DE94;
                        }
                    }
                    .value{
                        width: 50px;
                        text-align: right;
                    }
                }
            }
        }
        .item-list{
            margin-top: 20px;
            display: flex;
            justify-content: space-around;
            line-height: 40px;
            color: #607AB3;
            li{
                .label{
                    font-size: 16px;
                }
                .value{
                    font-size: 24px;
                }
            }
        }
        .chart{
            width: 100%;
            height: 313px;
        }
    }
    .main{
        width: 1177px;
        height: 100%;
        &-top{
            width: 100%;
            height: 614px;
            padding: 0 22px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            border-radius:10px 6px 6px 10px;
            background: rgba($color: #052256, $alpha: 0.4);
            box-shadow: 0 0 8px 8px rgba($color: #052256, $alpha: 1) inset;
            .number-container{
                width:230px;
                height:144px;
                margin-top: 36px;
                background: rgba($color: #052256, $alpha: 0.4);
                box-shadow: 0 0 8px 8px rgba($color: #052256, $alpha: 1) inset;
                border-radius:10px 6px 6px 10px;
                border: 1px solid rgba($color: #07A6FF, $alpha: 0.2);
                h5{
                    margin-top: 22px;
                    padding-left: 10px;
                    text-align: left;
                    font-size: 18px;
                    color: #525E7E
                }
            }
            .button{
                width:236px;
                height:78px;
                margin-top: 65px;
                background:linear-gradient(90deg,rgba(3,20,50,0.45),rgba(24,90,157,0.51));
                border-radius:39px;
                color: #2A91FC;
                display: flex;
                align-items: center;
                justify-content: space-around;
                .icon{
                    font-size: 14px;
                    .iconfont{
                        font-size: 36px;
                    }
                }
                .value{
                    font-size: 30px;
                    font-weight:bold;
                }
            }
            .main-top-side{
                .button.first{
                    margin-top: 169px;
                }
            }
            .main-top-right{
                .button{
                    background:linear-gradient(90deg,rgba(24,90,157,0.51),rgba(3,20,50,0.45));
                }
            }
            .main-top-center{
                .octagon{
                    width:397px;
                    height: 397px;
                    margin-top: 120px;
                    background: url(/static/image/index/octagon.png);
                    position: relative;
                    li{
                        /* width: 160px; */
                        position: absolute;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        p{
                            width: 100px;
                            font-size:20px;
                            margin: 10px;
                            white-space: nowrap;
                        }
                        .system-type{
                            width:68px;
                            height:68px;
                            line-height: 68px;
                            background: #061239;
                            border:3px solid rgba(3,205,130,1);
                            border-radius:50%;
                            .iconfont{
                                color: rgba(3,205,130,1);
                                font-size: 36px;
                            }
                        }  
                    }
                    li.un-use{
                        color: #747474;
                        .system-type{
                            border:3px solid #747474;
                            .iconfont{
                                color: #747474;
                            }
                        }
                    }
                    li.unnormal{
                        color: #D62445!important;
                        animation: show 1s linear infinite;
                       .system-type{
                           border:3px solid rgba(214,36,69,1);
                           box-shadow: 0 0 4px 4px rgba(214,36,69,0.3);
                           .iconfont{
                               color: #D62445
                           }
                       } 
                    }
                    @keyframes show {
                        0%{opacity: 0.2;}
                        50%{opacity: 1;}
                        100%{opacity: 0.2;}
                    }
                    li:first-of-type{
                        left: 50%;
                        top: -80px;
                        transform: translateX(-50%);
                        flex-direction: column;
                    }
                    li:nth-of-type(2){
                        left: 300px;
                        top: 20px;
                        flex-direction: row-reverse;
                        p{
                            text-align: left;
                        }
                    }
                    li:nth-of-type(3){
                        left: 350px;
                        top: 150px;
                        flex-direction: row-reverse;
                        p{
                            text-align: left;
                        }
                    }
                    li:nth-of-type(4){
                        left: 300px;
                        top: 288px;
                        flex-direction: row-reverse;
                        p{
                            text-align: left;
                        }
                    }
                    li:nth-of-type(5){
                        left: 120px;
                        bottom: -80px;
                        flex-direction: column-reverse;
                    }
                    li:nth-of-type(6){
                        left: -100px;
                        top: 288px;
                        p{
                            text-align: right;
                        }
                    }
                    li:nth-of-type(7){
                        left: -150px;
                        top: 150px;
                        p{
                            text-align: right;
                        }
                    }
                    li:nth-of-type(8){
                        left: -100px;
                        top: 20px;
                        p{
                            text-align: right;
                        }
                    }
                    li.state{
                        flex-direction: column;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        color: #03CD82;
                        p{
                            font-size: 30px;
                        }
                        .iconfont{
                            font-size: 40px;
                            font-weight: bold;
                        }
                    }
                }
                .octagon::after{
                    content: " ";
                    display: block;
                    background-image: linear-gradient(44deg,rgba(0,255,51,0) 50%,#09c);
                    width: 50%;
                    height: 50%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    animation: radar-beam 5s infinite;
                    animation-timing-function: linear;
                    transform-origin: bottom right;
                    border-radius: 100% 0 0 0;
                }
                @keyframes radar-beam {
                    from{transform: rotate(0deg)}
                    to{transform: rotate(360deg)}
                }
            }
        }
        &-footer{
            height: 286px;
            margin-top: 13px;
        }
    }
}
</style>
