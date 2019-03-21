<template>
  <div class="Ins_records">
    <!-- 人工巡更月报 -->
    <el-dialog :visible.sync="showReport" width="1350px">
      <!--html-->
      <section class="ppt_item month-report" id="date-report" v-if="dateReport.Table">
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
                :class="{nnor:dateReport.Table1.length>0}"
              >
              <img
                src="/static/image/task/bicon_2.png"
                class="pimg"
                :class="{nnor:dateReport.Table1.length==0}"
              >
              <div class="r list">
                <ul v-for="item in dateReport.Table">
                  <li class="l">巡更次数　<span>{{item.PatrolPlanCount}}</span></li>
                  <li class="l">待巡更　<span>{{item.UnPatrolCount}}</span></li>
                  <li class="l">正常点数　<span>{{item.NormalCount}}</span></li>
                  <li class="l">异常点数　<span>{{item.FaultCount}}</span></li>
                </ul>
              </div>
            </div>
          </section>
          <div class="table-red">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr class="gg">
                <td width="33%">异常巡更点名称</td>
                 <td width="33%">时间</td>
                <td width="33%">异常描述</td>
                <!-- <td width="25%">处理情况</td> -->
              </tr>
              <tr v-for="(item,key) in  dateReport.Table2">
                <td>{{item.PatrolObject}}</td>
                <td>{{item.PatrolTime}}</td>
                <td style="color: red;">{{item.PatrolNote}}</td>
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
            type="date"
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
      projectNames: localStorage.getItem("projectname"),
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
      dateReport:{},
      tableLabel:[
          {
            prop: 'RowNum',
            label: '序号'
          },
          {
            prop: 'PatrolObject',
            label: '巡更路线'
          },
          {
              prop: 'PatrolItem',
              label: '巡更点'
          },
          {
              prop: 'PatrolTime',
              label: '巡更时间',
              width:160
          },
          {
              prop: 'PatrolResult',
              label: '巡更结果'
          },
          {
              prop: 'PatrolNote',
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
          StartDateTime:this.time.toLocaleDateString().replace(/\//g,'-'),
          EndDateTime:this.time.toLocaleDateString().replace(/\//g,'-')
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
          ID:id
        })
        .then(data => {
            this.records = data.FObject
        })
        .catch(error => {
          console.log(error);
        })
    },
    /**
     * 查询人工巡更日报
     */
    async queryDateReport(){
      await new Promise((resolve,reject) => {
        Patrol({
          FAction:'QueryUPatrolReportByDay',
          FDateTime:this.time.toLocaleDateString().replace(/\//ig,'-')
        })
        .then(data => {
          console.log(data);
          this.dateReport = data.FObject
          this.showReport = true
        })
        .catch(error => {
          reject()
        })
      })
      return
      if(this.dateReport.Table.length ===0){
        return
      }
      let fileName = localStorage.getItem("projectname") + '人工巡更' +  this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1)
      await new Promise(resolve => {
        this.$nextTick(() => {
          resolve()
        })
      })
      this.getPdf('#date-report', fileName);
      this.fileUpload('#date-report',fileName)
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
