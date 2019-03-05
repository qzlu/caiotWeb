<template>
  <div class="Ins_records">
    <!--弹出框(物联抄表)-->
    <!-- <el-button type="text" @click="make_paf">点击打开 Dialog</el-button>-->
    <el-dialog :visible.sync="centerDialogVisible" width="1350px">
      <!--html-->
      <section class="ppt_item" id="pdf_htmls">
        <div class="htbn">
          <section v-for="(item,key) in Dialog_table0">
            <div class="hdr">
              <p class="pn02">物联抄表日报</p>
              <p class="l pn">
                项目名称：{{projectNames}}
                <!--新都汇-->
              </p>
              <p class="r pn03">日期：
                <!--2018-09-20-->
                {{item.InspectionDate.split(" ")[0]}}
              </p>
            </div>
            <div class="ng_item">
              <img
                src="/static/image/task/bicon_1.png"
                class="pimg"
                :class="{nnor:Dialog_table2.length>0}"
              >
              <img
                src="/static/image/task/bicon_2.png"
                class="pimg"
                :class="{nnor:Dialog_table2.length==0}"
              >
              <div class="r list">
                <ul>
                  <li>抄表次数:
                    <span>
                      {{item.InspectionCount}}
                      <!--4-->
                      次
                    </span>
                  </li>
                  <li>抄表点数:
                    <span>
                      {{item.InspectionDeviceCount}}
                      <!--4-->
                      个
                    </span>
                  </li>
                  <li>正常点数:
                    <span>
                      {{item.NormalCount}}
                      <!--4-->
                      个
                    </span>
                  </li>
                  <li>异常点数:
                    <span class="no">
                      {{item.FaultCount}}
                      <!--4-->
                      个
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <div class="table-c">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr class="gg">
                <td width="28%">抄表区域</td>
                <td width="18%">抄表情况</td>
                <td width="18%">抄表点数</td>
                <td width="18%">正常点数</td>
                <td width="18%">异常点数</td>
              </tr>
              <tr v-for="(item,key) in Dialog_table1">
                <td>{{item.AreaName}}</td>
                <td :class="{reding:item.InspectionState=='异常'}">{{item.InspectionState}}</td>
                <td>{{item.InspectionDeviceCount}}</td>
                <td>{{item.NormalCount}}</td>
                <td :class="{reding:item.FaultCount>0}">{{item.FaultCount}}</td>
              </tr>
            </table>
          </div>

          <div class="table-red">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr class="gg">
                <td width="25%">异常抄表点名称</td>
                 <td width="25%">时间</td>
                <td width="25%">异常描述</td>
                <td width="25%">处理情况</td>
              </tr>
              <tr v-for="(item,key) in  Dialog_table2">
                <td>{{item.InspectionObject}}</td>
                <td>{{item.InspectionTime}}</td>
                <td style="color: red;">{{item.InspectionResult}}</td>
                <td></td>
              </tr>
            </table>
          </div>

          <div class="person">备注：</div>
          <div class="person_pg">
            <span style="width: 180px; height: 30px; display: inline-block; text-align: left;">抄表人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">审核人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">管理员:</span>
          </div>
        </div>
      </section>
      <!--html-->
    </el-dialog>
    <!-- 人工抄表月报 -->
    <el-dialog :visible.sync="showReport" width="1350px">
      <!--html-->
      <section class="ppt_item month-report" id="month-report" v-if="monthReport.Table">
        <div class="htbn">
          <section>
            <div class="hdr">
              <p class="pn02">人工抄表月报</p>
              <p class="l pn">
                项目名称：{{projectNames}}
                <!--新都汇-->
              </p>
              <p class="r pn03">日期：
                <!--2018-09-20-->
                {{time.toJSON().split('T')[0]}}
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
                  <li class="l">抄表点数　<span>{{item.PointCount}}</span></li>
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
                <td width="12.5%">抄表情况</td>
                <td width="12.5%">能耗值</td>
                <td width="12.5%">抄表点数</td>
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
                <td width="33%">异常抄表点名称</td>
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
            <span style="width: 180px; height: 30px; display: inline-block; text-align: left;">抄表人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">审核人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">管理员:</span>
          </div>
        </div>
      </section>
      <p v-else style="padding:50px">暂无数据</p>
      <!--html-->
    </el-dialog>
    <!--弹出框-->
    <!---抄表记录-->
    <div class="top">
      <ul>
        <!-- <li :class="{active:activeIndex === 0}" @click="activeIndex = 0">物联抄表</li> -->
        <li :class="{active:activeIndex === 1}" @click="activeIndex = 1">人工抄表</li>
        <!-- <li>综合抄表</li> -->
      </ul>
    </div>
    <div class="bg_are" v-show="activeIndex === 0">
      <div class="ich">
        <div
          class="gre_btns"
          style="position: absolute; top: 57px; left: 485px; height: 46px; width: 119px; background: #093b7c; opacity: 0.8;"
        ></div>
        <div
          class="gre_btns02"
          style="position: absolute; top: 57px; left: 839px; height: 46px; width: 84px; background: #093b7c; opacity: 0.8;"
        ></div>

        <div class="time">
          <p class="l name">日期</p>
          <div class="date_chs">
            <div class="block" style="margin-top: 5px; height: 20px;">
              <el-date-picker
                v-model="value1"
                value-format="yyyy-MM-dd"
                type="date"
                @change="start_barData"
                placeholder="选择日期"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div
          class="ntb01_pp"
          :class="{divsh:currt==0}"
          style="position: absolute; top: 57px; left: 358px; height: 46px; width: 119px; background: #093b7c; opacity: 0.8;"
        ></div>
        <div
          class="ntb01_pp yuh"
          :class="{isod:exl_hef!=''}"
          style="position: absolute; top: 57px; left: 741px; height: 46px; width: 86px; background: #093b7c; opacity: 0.8;"
        ></div>
        <div class="ntb01" @click="one_change">一键抄表</div>
        <div class="ntb02">自动抄表</div>
        <div class="ntb03" @click="make_paf">报告预览</div>
        <a :href="exl_hef">
          <div class="ntb04">导出</div>
        </a>
        <div class="ntb05">审核</div>
      </div>

      <div class="title">
        <p class="l ti_n">
          <span class="icon iconfont icon-Automaticinspection abc"></span>
          <span>抄表总况</span>
        </p>
      </div>
      <section class="btn_baritems">
        <div class="l showitem01" v-if="bar_value">
          <section id="show_bar" style="height:183px; width: 90%;"></section>
          <div>
            <div class="atc_title">
              <p>抄表点数</p>
              <p>
                {{bar_value.InspectionDeviceCount}}
                <!--100-->
              </p>
            </div>
            <div class="act_num">抄表次数：
              <span>
                <!--6-->
                {{bar_value.InspectionCount}}次
              </span>
            </div>
            <div class="act_num02">
              <p>
                <!--70-->
                {{bar_value.NormalCount}}
              </p>
              <p>
                <!--50-->
                {{bar_value.FaultCount}}
              </p>
            </div>
          </div>
          <!--	<img src="/static/image/task/test.png">-->
        </div>
        <ul>
          <li
            v-for="(item,key) in table2"
            :class="{currt_ing:ings==key}"
            @click="li_item_click(key,item.InspectionTime,item.ID)"
          >
            <section class="ui_box">
              <img src="/static/image/task/icon_1.png" class="l" style="margin: 5px 0 0 12px;">
              <div class="r itext">
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
                {{item.InspectionTime.split(" ")[1]}}
              </span>
              <span>
                {{item.InspectionBy}}
                <!--自动抄表-->
              </span>
            </p>
          </li>

          <!--
	  		  		<li :class="{currt_ing:ings==1}"  @click="click_btn(1)">
	  		  		<section class="ui_box">
	  		  		<img src="/static/image/task/icon_1.png" class="l" style="margin: 5px 0 0 12px;">
	  		  		<div class="r itext">
	  		  			<p><span class="colors"></span><span class="igh">正常</span><span class="hgy">70</span></p>
	  		  			<p><span class="colors colors_red"></span><span class="igh">异常</span><span class="hgy">30</span></p>
	  		  		</div>
	  		  		</section>
	  		  		<p class="ghj_time"><span >04:00</span><span>自动抄表</span></p>
	  		  	</li>		
          -->
        </ul>
      </section>

      <div class="title">
        <p class="l ti_n">
          <span class="icon iconfont icon-Inspectionreport abc"></span>
          <span>抄表记录</span>
        </p>
      </div>
      <div class="show_exl">
        <!--table-->
        <div id="is_table_spid">
            <el-table
               :data="all_table"
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
                 show-overflow-tooltip
                >
               </el-table-column>
            </el-table>
        </div>

        <!--end of table-->
        <!--<iframe :src="exl_url"    frameborder="0" scrolling="yes"  class="iframe_tiem"></iframe>-->
      </div>
    </div>
    <div class="bg_are" v-show="activeIndex === 1">
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
          <span class="label">抄表路线名称</span>
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
          <span>抄表总况</span>
        </p>
      </div>
      <section class="btn_baritems">
        <div class="l showitem01">
          <section id="record-chart" style="height:183px; width: 90%;"></section>
          <div>
            <div class="atc_title">
              <p>抄表点数</p>
              <p>
                {{totalInfo.MeterReadingPointCount}}
                <!--100-->
              </p>
            </div>
            <div class="act_num">待抄表计划：
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
                  <span class="igh">待抄表</span>
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
                <!--自动抄表-->
              </span>
            </p>
          </li>
        </ul>
      </section>

      <div class="title">
        <p class="l ti_n">
          <span class="icon iconfont icon-Inspectionreport abc"></span>
          <span>抄表记录</span>
        </p>
      </div>
      <div class="show_exl">
        <!--table-->
        <div id="is_table_spid">
            <el-table
               :data="records"
               max-height="360"
               style="width: 100%"
               v-loadmore='loadMore'
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
import {Inspection,FileUpLoad,project,MeterReading} from '@/request/api.js'//api接口（接口统一管理）;
import table from '@/mixins/table' //表格混入数据
export default {
  mixins:[table],
  data() {
    return {
      projectNames: localStorage.getItem("projectname"),
      centerDialogVisible: false, //用于弹出框
      htmlTitle: "抄表报告", //抄表报告生成名称
      Dialog_table0: [], //抄表报告弹出框正常、框异值-总数表格
      Dialog_table1: [], //抄表报告弹出框正常值-表格
      Dialog_table2: [], //抄表报告弹出框异常值-表格

      value1: new Date(), //时间选择值
      bar_value: "", //把环形图值付给这里
      table2: "",
      ings: 0, //点击抄表li标签高亮
      exl_url: "", //用于在div内浏览的地址
      exl_hef: "", //用于导出exl，用split()分割后，得到直接地址
      currt: 0, //一键抄表遮罩层

      all_table: [], //所有表格数据。
      activeIndex: 1,
      // exl_url:"http://www.szqianren.cn/CreateFile/新都汇/新都汇物联抄表记录2018112612.xls",
      //人工抄表
      time:new Date(),
      filterText:'',
      totalInfo:0,//抄表总况统计信息
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
            label: '抄表区域'
          },
          {
              prop: 'MeterReadingObject',
              label: '抄表点'
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
              label: '抄表时间',
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
      inspectionStateArr:['待抄表','抄表中','已完成','逾期'],
      table:[
        {EnergyTypeName:'电',EnergyTypeUnit:'3000Kw/h',PointCount:40,MeterReadingDataNormalCount:38,MeterReadingDataFaultCount:0,DeviceFaultCount:0},
        {EnergyTypeName:'水',EnergyTypeUnit:'3000Kw/h',PointCount:40,MeterReadingDataNormalCount:38,MeterReadingDataFaultCount:0,DeviceFaultCount:0},
        {EnergyTypeName:'气',EnergyTypeUnit:'3000Kw/h',PointCount:40,MeterReadingDataNormalCount:38,MeterReadingDataFaultCount:0,DeviceFaultCount:0},
      ]
    };
  },
  methods: {
    async make_paf() {
      //生成pdf文件的方法
      /*抄表报告弹ajax请求数据*/
      let ch_time = "";
      if (this.value1 == "" || this.value1 == null) {
        ch_time = comm.CurentTime().clock.split(" ")[0]; //默认为当天
      } else {
        ch_time = this.value1;
      }
      await new Promise((resolve,reject) => {
        Inspection({
          FAction: "QueryInspectionReportByDate",
          FDateTime: ch_time
        })
        .then(data => {
          this.Dialog_table0 = data.FObject.Table;
          this.Dialog_table1 = data.FObject.Table1;
          this.Dialog_table2 = data.FObject.Table2;
          resolve()
        })
        .catch(error => {
          reject()
        })
      })
      /*抄表报告弹ajax请求数据*/

      this.centerDialogVisible = true; //弹出-弹出框
      /*生成pdf名称*/
      let now_times = ""; //如果日期为空，默认为昨天的
      now_times = this.value1.toJSON().split('T')[0].replace(/-/gi, "");
      /*生成pdf名称*/
        if (this.Dialog_table2 != "") {
          //如果没有数据，就不生成pdf文件
          let fileName = localStorage.getItem("projectname") + '物联抄表' +  now_times
          await new Promise(resolve => {
            this.$nextTick(() => {
              resolve()
            })
          })
          this.getPdf('#pdf_htmls',fileName);
          /* 生成base64传给后台 */
          html2Canvas(document.querySelector("#pdf_htmls")).then(canvas => {
            var srccc = canvas.toDataURL("image/png");
            /*生成图片传给服务器*/
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
            /*end of 生成图片传给服务器*/
          });
        }
    },

    logTimeChange(val) {
      //选择时间
      //console.log(this.value1)
    },

    li_item_click(x = 0, gettime, id) {
      //点击抄表总况 列表事件,把id带过来，去查列表数据
      this.ings = x; //当前的点击的li高亮
      this.all_table = [];
      Inspection({
        FAction: "QueryInspectionRecordByInfoID",
        ID: id,
      })
      .then(data => {
          let obj = data.FObject
          Object.keys(obj).forEach(key => {
            this.all_table = this.all_table.concat(obj[key])
          })
      })
      .catch(error => {

      })
      if (this.table2 != "" && x == 0) {
        gettime = this.table2[0].InspectionTime; //默认为第一个li的时间值
      }

      let dates = gettime.split(" ")[0];
      dates = dates.replace(/-/gi, "");
      let hour =
        gettime.split(" ")[1].split(":")[0] +
        gettime.split(" ")[1].split(":")[1]; //加上时分秒
      let groud_time = dates + hour;
      let urls =
        "https://view.officeapps.live.com/op/view.aspx?src=http://www.szqianren.cn/CreateFile/PID/ABC物联抄表记录time.xls";
      let reg_urls = urls
        .replace(/ABC/gi, localStorage.getItem("projectname"))
        .replace(/time/i, groud_time)
        .replace(/PID/i, localStorage.getItem("projectid"));
      //console.log(this.table2)
      if (this.table2 == "") {
        //如果没有数据，exl路径就清空
        reg_urls = "";
        this.exl_hef = ""; //如果没有数据，导出exl的a href="" 路径就清空
      } else {
        this.exl_hef = reg_urls.split("=")[1]; //分割地址，用于导出exl文档
      }

      this.exl_url = reg_urls;

      //  console.log(reg_urls)
    },
    start_barData(val) {
      //初始化取数据及点击时间选择器
      let timesh = "";
      if (!val) {
        timesh = comm.CurentTime().clock.split(" ")[0] + " " + "00:00:00"; //传当前时间
      } else {
        timesh = val + " " + "00:00:00"; //传当前时间
        /*如果选择时间为今天时间，一键抄表就可以点击*/

        if (val == comm.CurentTime().clock.split(" ")[0]) {
          this.currt = 0;
        } else {
          this.currt = 1;
        }
        /*enf of 如果选择时间为今天时间，一键抄表就可以点击*/
      }
      project({
        FAction: "GetPrjInspection",
        ProjectID: localStorage.getItem("projectid"),
        FDateTime: timesh,
      })
      .then(data => {
          this.bar_value = data.FObject.Table[0]; //把环形图值付给它。再在页面读取总数等值
          this.table2 = data.FObject.Table1; //把抄表总况列表值付给table2。
          let datas = [{value:data.FObject.Table[0].NormalCount,name:"正常"},{value:data.FObject.Table[0].FaultCount,name:"异常"}]
          this.$nextTick(()=>{
            this.showPieChart('show_bar',datas)
          })
          if (data.FObject.Table1.length > 0) {
            this.li_item_click("0", timesh, data.FObject.Table1[0].ID); //默认第一个li点击，把第一个id带过去
          }
      })
      .catch(error => {

      })
    },

    one_change() {
      //一键抄表只能查当前的
      project({
        FAction: "CreateCaiotInspectionByProject",
        ProjectID: localStorage.getItem("projectid"),
      })
      .then(data => {
        ProjectID: localStorage.getItem("projectid")
      })
      .catch(error => {
        
      })
    },
    /**
     * 人工抄表选择时间
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
     * 查询人工抄表信息
     */
    queryPlanRecord(){
        this.active = 0
        MeterReading({
          FAction:'QueryUMeterReadingPlanByCount',
          StartDateTime:this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1),
          EndDateTime:this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1)
        })
        .then(data => {
          this.totalInfo = data.FObject.Table?data.FObject.Table[0]:{}
          this.plans = data.FObject.Table1?data.FObject.Table1:{}
          this.queryPlan(this.plans[0].ID)
          let datas = [{value:this.totalInfo.NormalCount,name:"正常"},{value:this.totalInfo.FaultCount,name:"异常"}]
          this.$nextTick(() => {
            this.showPieChart('record-chart',datas)
          })
        })
        .catch(error => {
          console.log(error);
        })
    },
    /**
     * 根据计划ID查询抄表记录
     * id 计划ID
     * scroll 为true时是滚动加载
     */
    queryPlan(id,scroll = false){
        if(!scroll){
          this.pageIndex = 1
        }
        this.planID = id
        MeterReading({
          FAction:'QueryUMeterReadingPlanRecord',
          FDateTime:this.time.getFullYear() + '-' + comm.formatNumber(this.time.getMonth()+1),
          ID:id,
          PageIndex:this.pageIndex,
          PageSize:'20'
        })
        .then(data => {
          if(scroll){
            if(data.FObject.length !==0){
              this.records = this.records.concat(data.FObject)
            }else{
              this.pageIndex--
            }
          }else{
            this.records = data.FObject
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    /**
     * 滚动加载
     */
    loadMore(){
      this.pageIndex ++
      this.queryPlan(this.planID,true)
    },
    /**
     * 查询人工抄表月报
     */
    async queryDateReport(){
      await new Promise((resolve,reject) => {
        MeterReading({
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
      let fileName = localStorage.getItem("projectname") + '人工抄表' +  this.time.toJSON().split('T')[0].replace(/-/ig,'')
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
        MeterReading({
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
    activeIndex(val){
      if(val===1){
          let datas = [{value:this.totalInfo.NormalCount,name:"正常"},{value:this.totalInfo.FaultCount,name:"异常"}]
          this.$nextTick(() => {
            this.showPieChart('record-chart',datas)
          })
      }
    }
  },
  created() {
    // this.start_barData();
    this.queryPlanRecord()
    let tt = comm.CurentTime().clock.split(" ")[0];
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import '../InspectionRecords.scss';
.Ins_records .ppt_item.month-report .ng_item{
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
</style>
