<template>
    <div class="compre-hensive">
        <div class="aside">
            <card title="设备态势">
                <div class="pie-chart">
                    <pie-chart :data='deviceCount' :color='["#00D294","#747474","#F19E40","#2A91FC", "#F1E240"]' :setting="{center:['98','50%']}"></pie-chart>
                    <div class="border-dashed">
                        <p class="title">设备总数</p>
                        <p class="value">250</p>
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
                        <p>TOP5</p>
                    </h5>
                    <ul>
                        <li v-for="(item,i) in intactRate" :key="i">
                            <span class="index">{{i+1}}</span>
                            <span class="device-type">{{item.DeviceTypeName}}</span>
                            <div class="bar-out">
                                <div class="bar-inner" :style="{width:item.value}">
                                </div>
                            </div>
                            <span class="value">{{item.value}}</span>
                        </li>
                    </ul>
                </div>
            </card>
            <card title="能耗态势">
                <ul class="item-list">
                    <li>
                        <p class="label">计划电耗</p>
                        <p class="value">10000</p>
                    </li>
                    <li>
                        <p class="label">本月电耗</p>
                        <p class="value">8000</p>
                    </li>
                    <li>
                        <p class="label">上月电耗</p>
                        <p class="value">7900</p>
                    </li>
                </ul>
            </card>    
        </div>
        <div class="main">
            <div class="main-top">
                <div class="main-top-left main-top-side">
                    <div class="number-container">
                        <h5>实时告警</h5>
                        <number data="5"></number>
                    </div>
                    <div class="button first">
                        <div class="icon">
                            <p><i class="iconfont icon-Equipment"></i></p>
                            <p>设备数</p>
                        </div>
                        <p class="value">260</p>
                    </div>
                    <div class="button">
                        <div class="icon">
                            <p><i class="iconfont icon-Equipment"></i></p>
                            <p>本月耗电</p>
                        </div>
                        <p class="value">260</p>
                    </div>
                </div>
                <div class="main-top-center">
                    <ul class="octagon">
                        <li v-for="(item,i) in systemList" :class="{'un-use':item.state==0,'unnormal':item.state==2}" :key='i'>
                            <p>{{item.name}}</p>
                            <div class="system-type">
                                <i :class="['iconfont',item.icon]"></i>
                            </div>
                        </li>
                        <li :class="['state','unnormal']">
                            <div>
                                <i :class="['iconfont', true?'icon-Alarm':'icon-Onlinerate']"></i>
                            </div>
                            <p>{{true?'异常':'正常'}}</p>
                        </li>
                    </ul>
                </div>
                <div class="main-top-right main-top-side">
                    <div class="number-container">
                        <h5>实时工单</h5>
                        <number data="5"></number>
                    </div>
                    <div class="button first">
                        <p class="value">260</p>
                        <div class="icon">
                            <p><i class="iconfont icon-Equipment"></i></p>
                            <p>设备数</p>
                        </div>
                    </div>
                    <div class="button">
                        <p class="value">260</p>
                        <div class="icon">
                            <p><i class="iconfont icon-Equipment"></i></p>
                            <p>本月耗电</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-footer">
                <div class="main-footer-item">
                    <h5><i class="iconfont icon-SZXFY-Earlywarning"></i> 实时告警 <i class="iconfont icon-Up"></i></h5>
                    <table class="table-header">
                      <tr>
                        <th v-for="(item,i) in alarmLabels" :key="i" :width='item.width' :style="{'text-align':item.align}">{{item.label}}</th>
                      </tr>
                    </table>
                    <div class="table-body" v-if="alarmData.length>0">
                        <el-scrollbar>
                            <table>
                              <tr v-for="(obj,i) in alarmData" :key="i" @click="rowClick(obj)">
                                <td v-for="(item,j) in labels" :key="j" :width='item["width"]' :style="{'text-align':item.align,'color':item.color}" :title="item.formatter?item.formatter.call(null,obj[item.prop]):obj[item.prop]">{{item.formatter?item.formatter.call(null,obj[item.prop]):obj[item.prop]}}</td>
                              </tr>
                            </table>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="main-footer-item">
                    <h5><i class="iconfont icon-SZXFY-Earlywarning"></i> 实时告警 <i class="iconfont icon-Up"></i></h5>
                </div>
            </div>
        </div>
        <div class="aside">
            <card title="告警态势">
                <div class="pie-chart">
                    <pie-chart :series='alarmCount' :color='["#00D294","#747474","#89192E","#F19E40"]' :setting="{center:['98','50%']}"></pie-chart>
                    <div class="border-dashed">
                        <p class="title">设备总数</p>
                        <p class="value">250</p>
                    </div>
                    <ul>
                        <li v-for="(item,i) in alarmCount[0].data||[]" :key="i">
                            {{item.value}}
                        </li>
                        <li v-for="(item,i) in alarmCount[1].data||[]" :key="i">
                            {{item.value}}
                        </li>
                    </ul>
                </div>
                <div class="top5">
                    <h5>
                        <p>告警类型排名</p>
                        <p>TOP5</p>
                    </h5>
                    <ul>
                        <li v-for="(item,i) in intactRate" :key="i">
                            <span class="index">{{i+1}}</span>
                            <span class="device-type">{{item.DeviceTypeName}}</span>
                            <div class="bar-out">
                                <div class="bar-inner" :style="{width:item.value}">
                                </div>
                            </div>
                            <span class="value">{{item.value}}</span>
                        </li>
                    </ul>
                </div>
            </card>
            <card title="工单态势">
                <ul class="item-list">
                    <li>
                        <p class="label">今日工单</p>
                        <p class="value">500</p>
                    </li>
                    <li>
                        <p class="label">完成率</p>
                        <p class="value">50%</p>
                    </li>
                    <li>
                        <p class="label">及时率</p>
                        <p class="value">50%</p>
                    </li>
                </ul>
            </card>
        </div>
    </div>
</template>
<script>
import {pieChart, barChart,Number} from '@/zw-components/index.js'
import {ProjectTrend} from '@/request/api.js'
import card from './card.vue'
export default {
    data(){
        return{
            deviceCount:{
                /* title: {text:'设备总数',left:'88'}, */
                subtitle: '250',
                colums:['运行','停止','告警','维修', '保养'],
                rows: [
                    {
                      name: '运行',
                      value: 200
                    },
                    {
                        name: '停止',
                        value: 30
                    },
                    {
                        name: '告警',
                        value: 10
                    },
                    {
                        name: '维修',
                        value: 10
                    },
                    {
                        name: '保养',
                        value: 10
                    }
                ]
            },
            intactRate: [ //完好率
                {
                    DeviceTypeName: '变压器',
                    value: '99%'
                },
                {
                    DeviceTypeName: '进线柜',
                    value: '98.9%'
                },
                {
                    DeviceTypeName: '水浸',
                    value: '90%'
                },
                {
                    DeviceTypeName: '消防主机',
                    value: '89%'
                },
                {
                    DeviceTypeName: '官网压力',
                    value: '80%'
                },
            ],
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
            systemList:[
                {
                    icon:'icon-Transformer',
                    name: '供配电',
                    state: 1
                },
                {
                    icon:'icon-Flatlight',
                    name: '供配电',
                    state: 1
                },
                {
                    icon:'icon-Transformer',
                    name: '供配电',
                    state: 2
                },
                {
                    icon:'icon-Transformer',
                    name: '供配电',
                    state: 1
                },
                {
                    icon:'icon-Transformer',
                    name: '供配电',
                    state: 1
                },
                {
                    icon:'icon-Transformer',
                    name: '供配电',
                    state: 1
                },
                {
                    icon:'icon-Transformer',
                    name: '供配电',
                    state: 0
                },
                {
                    icon:'icon-Transformer',
                    name: '供配电',
                    state: 0
                },
            ],
            alarmLabels:[
                {
                    prop: '',
                    label: '告警时间'
                },
                {
                    prop: '',
                    label: '告警内容'
                },
                {
                    prop: '',
                    label: '当前值'
                },
                {
                    prop: '',
                    label: '工单状态'
                },
            ],
            alarmData:[]
        }
    },
    components:{
        card,
        pieChart,
        barChart,
        Number
    },
    created(){
        this.queryDeviceTypeRanking()
    },
    methods:{
        /**
         * 382.综合态势柱形（设备类型完好率 top 5）
         */
        queryDeviceTypeRanking(){
            ProjectTrend({
                FAction: 'QueryDeviceTypeRanking',
                FSort: 'desc',
            })
            .then((data) => {
                console.log(data)
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
                    }
                    .bar-out{
                        width: 140px;
                        height: 8px;
                        .bar-inner{
                            height: 100%;
                            background: #18DE94
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
                        width: 160px;
                        position: absolute;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        p{
                            font-size:20px;
                            margin: 10px;
                        }
                        .system-type{
                            width:68px;
                            height:67px;
                            line-height: 67px;
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
                        animation: show 3s linear infinite;
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
                    }
                    li:nth-of-type(3){
                        left: 350px;
                        top: 150px;
                        flex-direction: row-reverse;
                    }
                    li:nth-of-type(4){
                        left: 300px;
                        top: 288px;
                        flex-direction: row-reverse;
                    }
                    li:nth-of-type(5){
                        left: 120px;
                        bottom: -80px;
                        flex-direction: column-reverse;
                    }
                    li:nth-of-type(6){
                        left: -60px;
                        top: 288px;
                    }
                    li:nth-of-type(7){
                        left: -120px;
                        top: 150px;
                    }
                    li:nth-of-type(8){
                        left: -50px;
                        top: 20px;
                    }
                    li.state{
                        flex-direction: column;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        color: #03CD82;
                        .iconfont{
                            font-size: 30px;
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
            display: flex;
            justify-content: space-between;
            &-item{
                width: 578px;
                height: 100%;
                border-radius: 10px;
                background: rgba($color: #112D45, $alpha: 0.34);
                h5{
                    padding-left: 30px;
                    line-height: 38px;
                    color: #18A1EC;
                    font-size: 16px;
                    text-align: left;
                    .iconfont:first-of-type{
                        font-size: 20px;
                        margin-right: 10px;
                    }
                    .icon-Up{
                        margin-left: 10px;
                        display: inline-block;
                        transform: rotate(90deg);
                    }
                }
                .table-header{
                    width: 100%;
                    tr{
                        th{
                            font-size: 16px;
                        }
                    }
                }
                tr{
                    height: 36px;
                    line-height: 36px;
                    th{
                        font-size: 14px;
                        text-align: center;
                        color: #F1F1F2
                    }
                }
                .table-body{
                    height: 201px;
                    table{
                        width: 100%;
                        tr{
                            line-height: 42px;
                            cursor: pointer;
                            text-align: center;
                            td{
                                display: inline-block;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                            td.warning{
                              color: #E0E213
                            }
                        }
                        tr:nth-of-type(2n+1){
                            background:rgba(158,229,243,0.2);
                        }
                        tr:nth-of-type(2n){
                            background:rgba(7,148,207,0.14);
                        }
                      }
                }
            }
        }
    }
}
</style>
