<template>
  <div class="Ins_records">
    <!-- 人工巡更月报 -->
    <el-dialog :visible.sync="showReport" width="1350px">
      <!--html-->
      <section class="ppt_item month-report" id="month-report" v-if="monthReport.Table">
        <div class="htbn">
          <section>
            <div class="hdr">
              <p class="pn02">人工巡更月报</p>
              <p class="l pn">
                项目名称：{{projectNames}}
                <!--新都汇-->
              </p>
              <p class="r pn03">日期：
                <!--2018-09-20-->
                {{time.toLocaleDateString().replace(/\//ig,'-')}}
              </p>
            </div>
            <div class="ng_item">
              <img
                src="/static/image/task/bicon_1.png"
                class="pimg"
                :class="{nnor:monthReport.Table2.length>0}"
              >
              <img
                src="/static/image/task/bicon_2.png"
                class="pimg"
                :class="{nnor:monthReport.Table2.length==0}"
              >
              <div class="r list">
                <ul v-for="item in monthReport.Table">
                  <li class="l">{{item.EnergyTypeName}}　<span>{{item.EnergyTypeUnit}}</span></li>
                  <li class="l">巡更点数　<span>{{item.PointCount}}</span></li>
                  <li class="l">能耗正常　<span>{{item.MeterReadingDataNormalCount}}</span></li>
                  <li class="l">能耗异常　<span>{{item.MeterReadingDataFaultCount}}</span></li>
                  <li class="l">设备异常　<span>{{item.DeviceFaultCount}}</span></li>
                </ul>
              </div>
            </div>
          </section>

          <div class="table-c">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr class="gg">
                <td width="12.5%">能源类型</td>
                <td width="12.5%">分区能耗</td>
                <td width="12.5%">巡更情况</td>
                <td width="12.5%">能耗值</td>
                <td width="12.5%">巡更点数</td>
                <td width="12.5%">正常点数</td>
                <td width="12.5%">异常点数</td>
                <td width="12.5%">设备异常</td>
              </tr>
              <tr v-for="(item,key) in monthReport.Table1">
                <td>{{item.EnergyTypeName}}</td>
                <td>{{item.EnergyTypeValueDiffCount}}</td>
                <td :class="{reding:item.MeterReadingDataFaultCount>0||item.DeviceFaultCount>0}">{{(item.MeterReadingDataFaultCount>0||item.DeviceFaultCount>0)?'异常':'正常'}}</td>
                <td>{{item.EnergyTypeValueDiffCount}}</td>
                <td>{{item.AreaPointCount}}</td>
                <td>{{item.MeterReadingDataNormalCount?item.MeterReadingDataNormalCount:0}}</td>
                <td :class="{reding:item.MeterReadingDataFaultCount>0}">{{item.MeterReadingDataFaultCount?item.MeterReadingDataFaultCount:0}}</td>
                <td :class="{reding:item.DeviceFaultCount>0}">{{item.DeviceFaultCount?item.DeviceFaultCount:0}}</td>
              </tr>
            </table>
          </div>

          <div class="table-red">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr class="gg">
                <td width="33%">异常巡更点名称</td>
                 <td width="33%">时间</td>
                <td width="33%">异常描述</td>
                <!-- <td width="25%">处理情况</td> -->
              </tr>
              <tr v-for="(item,key) in  monthReport.Table2">
                <td>{{item.MeterReadingObject}}</td>
                <td>{{item.MeterReadingTime}}</td>
                <td style="color: red;">{{item.PointResult}}</td>
                <!-- <td></td> -->
              </tr>
            </table>
          </div>

          <div class="person">备注：</div>
          <div class="person_pg">
            <span style="width: 180px; height: 30px; display: inline-block; text-align: left;">巡更人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">审核人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">管理员:</span>
          </div>
        </div>
      </section>
      <p v-else style="padding:50px">暂无数据</p>
      <!--html-->
    </el-dialog>
    <!--弹出框-->
    <!---巡更记录-->
    <div class="bg_are">
      <ul class="ich record-header">
        <li class="l">
          <span class="label">日期</span>
          <el-date-picker
            class=""
            v-model="time"
            type="month"
            @change="selectTime"
            placeholder="选择日期"
          ></el-date-picker>
        </li>
<!--         <li class="l">
          <span class="label">巡更路线名称</span>
          <el-input class="search-input" v-model="filterText" placeholder="搜索路线关键字">
              <i class="el-icon-search" slot="suffix"></i>
          </el-input>
          <button class="zw-btn zw-btn-primary">查询</button>
        </li> -->
        <li class="l">
            <button class="zw-btn zw-btn-export" @click="exportFile">导出</button>
            <button class="zw-btn ntb03" @click="queryDateReport">报告预览</button>
        </li>
      </ul>
      <div class="title">
        <p class="l ti_n">
          <span class="icon iconfont icon-Automaticinspection abc"></span>
          <span>巡更总况</span>
        </p>
      </div>
      <section class="btn_baritems">
        <div class="l showitem01">
          <section id="record-chart" style="height:183px; width: 90%;"></section>
          <div>
            <div class="atc_title">
              <p>巡更点数</p>
              <p>
                {{totalInfo.MeterReadingPointCount}}
                <!--100-->
              </p>
            </div>
            <div class="act_num">待巡更计划：
              <span>
                <!--6-->
                {{totalInfo.WaitingCount}}个
              </span>
            </div>
            <div class="act_num02">
              <p>
                <!--70-->
                {{totalInfo.NormalCount?totalInfo.NormalCount:0}}
              </p>
              <p>
                <!--50-->
                {{totalInfo.FaultCount?totalInfo.FaultCount:0}}
              </p>
            </div>
          </div>
          <!--	<img src="/static/image/task/test.png">-->
        </div>
        <ul>
          <li
            v-for="(item,key) in plans"
            :key="item.ID"
            :class="{currt_ing:active==key}"
            @click="active=key;queryPlan(item.ID)"
          >
            <section class="ui_box">
              <h5>{{item.MeterReadingPlanName}}</h5>
              <div class="l status">
                  {{inspectionStateArr[item.MeterReadingState]}}
              </div>
              <div class="r itext">
                <p>
                  <span class="colors"></span>
                  <span class="igh">待巡更</span>
                  <span class="hgy">
                    <!--70-->
                    {{item.MeterReadingPointCount - item.NormalCount - item.FaultCount}}
                  </span>
                </p>
                <p>
                  <span class="colors"></span>
                  <span class="igh">正常</span>
                  <span class="hgy">
                    <!--70-->
                    {{item.NormalCount}}
                  </span>
                </p>
                <p>
                  <span class="colors colors_red"></span>
                  <span class="igh">异常</span>
                  <span class="hgy">
                    <!--30-->
                    {{item.FaultCount}}
                  </span>
                </p>
              </div>
            </section>
            <p class="ghj_time">
              <span>
                <!--00:00-->
                {{item.MeterReadingStartDateTime?item.MeterReadingStartDateTime.split(' ')[1]:"--"}}
              </span>
              <span>
                {{item.FUserNickname}}
                <!--自动巡更-->
              </span>
            </p>
          </li>
        </ul>
      </section>

      <div class="title">
        <p class="l ti_n">
          <span class="icon iconfont icon-Inspectionreport abc"></span>
          <span>巡更记录</span>
        </p>
      </div>
      <div class="show_exl">
        <!--table-->
        <div id="is_table_spid">
            <el-table
               :data="records"
               max-height="360"
               style="width: 100%"
               header-row-class-name="el-table-header"
               :row-class-name="tableRowClassName"
               >
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

        <!--end of table-->
        <!--<iframe :src="exl_url"    frameborder="0" scrolling="yes"  class="iframe_tiem"></iframe>-->
      </div>
    </div>
  </div>
</template>
<script>
import html2Canvas from "html2canvas";
var echarts = require("echarts");
import * as comm from "@/assets/js/pro_common";
import {Inspection,FileUpLoad,project,Patrol} from '@/request/api.js'//api接口（接口统一管理）;
import table from '@/mixins/table' //表格混入数据
export default {
  mixins:[table],
  data() {
    return {
      //人工巡更
      time:new Date(),
      filterText:'',
      totalInfo:0,//巡更总况统计信息
      waitingPlan:0,
      pointsInfo:{},
      plans:[],
      active:0,//默认选中第一个计划
      planID:'',
      records:[],
      showReport:false,
      monthReport:{},
      tableLabel:[
          {
            prop: 'RowNum',
            label: '序号'
          },
          {
            prop: 'AreaName',
            label: '巡更区域'
          },
          {
              prop: 'MeterReadingObject',
              label: '巡更点'
          },
          {
              prop: 'EnergyTypeName',
              label: '能耗类型'
          },
          {
              prop: 'EnergyTypeUnit',
              label: '单位'
          },
          {
              prop: 'LastMeterReadingValue',
              label: '上次读数'
          },
          {
              prop: 'MeterReadingValue',
              label: '本次读数'
          },
          {
              prop: 'UseValue',
              label: '本期用量'
          },
          {
              prop: 'MeterReadingTime',
              label: '巡更时间',
              width:160
          },
          {
              prop: 'MeterReadingResult',
              label: '设备状态'
          },
          {
              prop: 'ComparedValue',
              label: '同比用量'
          },
          {
              prop: 'MeterReadingNote',
              label: '异常描述'
          }
      ],
      tableLabel1:[
          {
            prop: 'AreaName',
            label: '巡更区域'
          },
          {
              prop: 'DeviceName',
              label: '巡更点'
          },
          {
              prop: 'EnergyTypeName',
              label: '能耗类型'
          },
          {
              prop: 'EnergyTypeUnit',
              label: '单位'
          },
          {
              prop: 'LastMeterReadingValue',
              label: '上次读数'
          },
          {
              prop: 'NowMeterReadingValue',
              label: '本次读数'
          },
          {
              prop: 'NowDiffValue',
              label: '本期用量'
          },
          {
              prop: 'NowMeterReadingDateTime',
              label: '巡更时间',
              width:160
          },
          {
              prop: 'NowLastDiffPercent',
              label: '同比用量'
          },
          {
              prop: 'MeterReadingNote',
              label: '异常描述'
          }
      ],
      inspectionStateArr:['待巡更','巡更中','已完成','逾期'],
    };
  },
  methods: {
    /**
     * 人工巡更选择时间
     */
    selectTime(val){
      this.queryPlanRecord()
    },
    /**
     * 绘制饼图
     * id 图形容器id
     * data 数据
     */
    showPieChart(id,data){
        var dom = document.getElementById(id);
        var myChart = echarts.init(dom);
        var app = {};
        var option = null;
        app.title = "环形图";

        option = {
          tooltip: {
            trigger: "item",
            formatter: "{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "219px",
            y: "center",
            textStyle: { color: "#fff" },
            itemWidth: 13,
            itemHeight: 13,
            data: ["正常", "异常"]
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["50", "60"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center"
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: "30",
                    fontWeight: "bold"
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: data
            }
          ],
          color: ["#00D294", "#89192E"]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
    },
    /**
     * 164.查询人工巡更计划信息
     */
    queryPlanRecord(){
        Patrol({
          FAction:'QueryUPatrolPlanByCount',
          StartDateTime:this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1),
          EndDateTime:this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1)
        })
        .then(data => {
          this.totalInfo = data.FObject.Table?data.FObject.Table[0]:{}
          this.plans = data.FObject.Table1?data.FObject.Table1:[]
          let datas = [{value:this.totalInfo.NormalCount,name:"正常"},{value:this.totalInfo.FaultCount,name:"异常"}]
          this.$nextTick(() => {
            this.showPieChart('record-chart',datas)
          })
          if(this.plans[0]){
            this.queryPlan(this.plans[0].ID)
          }else{
            this.records = []
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    /**
     * 根据计划ID查询巡更记录(168.查询人工巡更记录)
     * id 计划ID
     */
    queryPlan(id){
        this.planID = id
        Patrol({
          FAction:'QueryUPatrolPlanRecord',
          FDateTime:this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1),
          ID:id,
          PageIndex:this.pageIndex,
          PageSize:'20'
        })
        .then(data => {
            this.records = data.FObject
        })
        .catch(error => {
          console.log(error);
        })
    },
    /**
     * 查询人工巡更月报
     */
    async queryDateReport(){
      await new Promise((resolve,reject) => {
        Patrol({
          FAction:'QueryUMeterReadingCountByMoneth',
          FDateTime:this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1) + '-01'
        })
        .then(data => {
          this.monthReport = data.FObject
          this.showReport = true
        })
        .catch(error => {
          reject()
        })
      })
      return
      if(this.monthReport.Table.length ===0){
        return
      }
      let fileName = localStorage.getItem("projectname") + '人工巡更' +  this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1)
      await new Promise(resolve => {
        this.$nextTick(() => {
          resolve()
        })
      })
      this.getPdf('#date-report', fileName);
      html2Canvas(document.querySelector("#date-report")).then(canvas => {
        var srccc = canvas.toDataURL("image/png");
        FileUpLoad({
            FAction:'SaveInspectionReportJpg2Pdf',
            FData: srccc.replace("data:image/png;base64,", ""),
            FName: fileName
        })
        .then(data => {
        })
        .catch(error => {
          console.log('cuowu',error);
        })
      });
    },
    /**
     * exportFile 导出
     */
    exportFile(){
        Patrol({
            FAction:'QueryExportUMeterReadingPlanRecord',
            ID:this.planID,
            FDateTime:this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1),
            FName:''
        })
        .then(data => {
            window.location = "http://www.szqianren.com/" + data.FObject;
        })
        .catch(error => {
            this.$message({
              type: 'error',
              message: '导出失败!请重试'
            });
        })
    },
    
  },
  watch:{

  },
  created() {
    this.queryPlanRecord()
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' >
@import '../InspectionRecords.scss';
$img-url:'/static/image/';
.Ins_records  {
  .ppt_item.month-report{
    .ng_item{
      height: 150px;
      padding-bottom: 10px;
      overflow: hidden;
      .pimg{
        top: 0;
      }
      .list ul li{
        width: 20%
      }
    }
  }

  .bg_are{
    .ich{
      .ntb02{
        background-size: 100% 100%;
        padding-left: 14px;
      }
      .ntb02:hover,.ntb02:active{
        background-size: 100% 100%;
      }
    }
  }
}
</style>
