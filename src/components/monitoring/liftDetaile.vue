<template>
    <div class="lift-detaile">
        <h3>
            <i class="iconfont icon-Passengerlift"></i>
            电梯数据
        </h3>
        <ul class="lift-info">
            <li v-for="(item,i) in dataLabel" :key="i">
                <span class="label">{{item.label}} :</span>
                <span class="value">{{liftInfo[item.prop]}}</span>
            </li>
        </ul>
        <h3>
            <i class="iconfont icon-Transformer"></i>
            大事记
        </h3>
        <div class="event-list">
            <event-list :data='eventData' :showTitle='false'></event-list>
        </div>
    </div>
</template>
<script>
import eventList from './d_l_a.vue'
import {project} from '../../request/api.js'
export default {
    data(){
        return{
            dataLabel:[
                {
                    label: '运行方向',
                    prop: 'DeviceName'
                },
                {
                    label: '设备编码',
                    prop: 'DeviceCode'
                },
                {
                    label: '电梯速度',
                    prop: 'DeviceName'
                },
                {
                    label: '安装地址',
                    prop: 'DeviceName'
                },
                {
                    label: '所在楼层',
                    prop: 'DeviceName'
                },
                {
                    label: '维保人员1',
                    prop: 'DeviceName'
                },
                {
                    label: '是否有人',
                    prop: 'DeviceName'
                },
                {
                    label: '维保人员2',
                    prop: 'DeviceName'
                },
                {
                    label: '厅门状态',
                    prop: 'DeviceName'
                },
                {
                    label: '维保单位',
                    prop: 'DeviceName'
                },
                {
                    label: '是否在门区',
                    prop: ''
                },
                {
                    label: '使用单位',
                    prop: ''
                },
            ],
            liftInfo:{}
        }
    },
    props:{
        data:Array,
        eventData:Array,
    },
    components:{
        eventList
    },
    created(){
        this.getSingleDeviceBaseInfo()
    },
    methods:{
        getSingleDeviceBaseInfo(){
          project({
            FAction: "GetSingleDeviceBaseInfo",
            DeviceID: this.$route.params.id
          })
          .then(data => {
            this.liftInfo = data.FObject[0] || {};
            console.log(data);
          })
          .catch(err => {})
        },
    }
}
</script>
<style lang="scss">
    .lift-detaile{
        height: 100%;
        background: url(/static/image/index/count_back.png);
        padding:32px 22px;
        box-sizing: border-box;
        h3{
            height:55px;
            line-height: 55px;
            padding-left: 50px;
            background:linear-gradient(90deg,rgba(17,45,69,0.34),rgba(16,52,78,0.34),rgba(15,60,89,0.34),rgba(15,64,94,0.34),rgba(16,71,101,0.34),rgba(15,66,95,0.34),rgba(15,61,87,0.34),rgba(16,50,77,0.34),rgba(18,45,72,0.34));
            border-radius:10px 6px 6px 10px;
            text-align: left;
            color: #18A1EC;
            font-size: 20px;
            font-weight: normal;
            .iconfont{
                font-size: 30px;
                vertical-align: middle;
            }   
        }
        .lift-info{
            width: 900px;
            height: 353px;
            padding-top: 20px;
            li{
                float: left;
                width: 50%;
                line-height: 50px;
                font-size: 17px;
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                span{
                    display: inline-block;
                }
                .label{
                    width: 150px;
                    margin-right: 30px;
                    text-align: right;
                    color: #737373;
                }
                .value{
                    color: #00D294
                }
            }
        }
        .event-list{
            height: 393px;
        }
    }
</style>