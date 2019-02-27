<template>
  <div class="Ins_records">
    <!--弹出框(物联巡检)-->
    <!-- <el-button type="text" @click="make_paf">点击打开 Dialog</el-button>-->
    <el-dialog :visible.sync="centerDialogVisible" width="1350px">
      <!--html-->
      <section class="ppt_item" id="pdf_htmls">
        <div class="htbn">
          <section v-for="(item,key) in Dialog_table0">
            <div class="hdr">
              <p class="l pn">
                项目名称：{{projectNames}}
                <!--新都汇-->
              </p>
              <p class="l pn02">物联巡检日报</p>
              <p class="l pn03">日期：
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
                  <li>巡检次数:
                    <span>
                      {{item.InspectionCount}}
                      <!--4-->
                      次
                    </span>
                  </li>
                  <li>巡检点数:
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
                <td width="28%">巡检区域</td>
                <td width="18%">巡检情况</td>
                <td width="18%">巡检点数</td>
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
                <td width="25%">异常巡检点名称</td>
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
            <span style="width: 180px; height: 30px; display: inline-block; text-align: left;">巡检人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">审核人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">管理员:</span>
          </div>
        </div>
      </section>
      <!--html-->
    </el-dialog>
    <!-- 人工巡检日报 -->
    <el-dialog :visible.sync="showReport" width="1350px">
      <!--html-->
      <section class="ppt_item" id="date-report" v-if="dateReport">
        <div class="htbn">
          <section>
            <div class="hdr">
              <p class="l pn">
                项目名称：{{projectNames}}
                <!--新都汇-->
              </p>
              <p class="l pn02">人工巡检日报</p>
              <p class="l pn03">日期：
                <!--2018-09-20-->
                {{time.toJSON().split('T')[0]}}
              </p>
            </div>
            <div class="ng_item">
              <img
                src="/static/image/task/bicon_1.png"
                class="pimg"
                :class="{nnor:dateReport.Table[0].FaultCount>0}"
              >
              <img
                src="/static/image/task/bicon_2.png"
                class="pimg"
                :class="{nnor:dateReport.Table[0].FaultCount==0}"
              >
              <div class="r list">
                <ul>
                  <li>巡检次数:
                    <span>
                      {{dateReport.Table[0].InspectionCount}}
                      <!--4-->
                      次
                    </span>
                  </li>
                  <li>待巡检:
                    <span>
                      {{dateReport.Table[0].WaitingCount}}
                      <!--4-->
                      个
                    </span>
                  </li>
                  <li>正常点数:
                    <span>
                      {{dateReport.Table[0].NormalCount}}
                      <!--4-->
                      个
                    </span>
                  </li>
                  <li>异常点数:
                    <span class="no">
                      {{dateReport.Table[0].FaultCount}}
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
                <td width="28%">巡检区域</td>
                <td width="18%">巡检情况</td>
                <td width="18%">巡检点数</td>
                <td width="18%">正常点数</td>
                <td width="18%">异常点数</td>
              </tr>
              <tr v-for="(item,key) in dateReport.Table1">
                <td>{{item.AreaName}}</td>
                <td :class="{reding:item.InspectionResult=='异常'}">{{item.InspectionResult}}</td>
                <td>{{item.ALLPointCount}}</td>
                <td>{{item.NormalCount?item.NormalCount:0}}</td>
                <td :class="{reding:item.FaultCount>0}">{{item.FaultCount?item.FaultCount:0}}</td>
              </tr>
            </table>
          </div>

          <div class="table-red">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr class="gg">
                <td width="25%">异常巡检点名称</td>
                 <td width="25%">时间</td>
                <td width="25%">异常描述</td>
                <td width="25%">处理情况</td>
              </tr>
              <tr v-for="(item,key) in  dateReport.Table2">
                <td>{{item.InspectionObject}}</td>
                <td>{{item.InspectionTime}}</td>
                <td style="color: red;">{{item.InspectionNote}}</td>
                <td></td>
              </tr>
            </table>
          </div>

          <div class="person">备注：</div>
          <div class="person_pg">
            <span style="width: 180px; height: 30px; display: inline-block; text-align: left;">巡检人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">审核人:</span>
            <span style="width: 180px;height: 30px;display: inline-block;text-align: left;">管理员:</span>
          </div>
        </div>
      </section>
      <!--html-->
    </el-dialog>
    <!--弹出框-->
    <!---巡检记录-->
    <div class="top">
      <ul>
        <li :class="{active:activeIndex === 0}" @click="activeIndex = 0">物联巡检</li>
        <li :class="{active:activeIndex === 1}" @click="activeIndex = 1">人工巡检</li>
        <!-- <li>综合巡检</li> -->
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
        <div class="ntb01" @click="one_change">一键巡检</div>
        <div class="ntb02">自动巡检</div>
        <div class="ntb03" @click="make_paf">报告预览</div>
        <a :href="exl_hef">
          <div class="ntb04">导出</div>
        </a>
        <div class="ntb05">审核</div>
      </div>

      <div class="title">
        <p class="l ti_n">
          <span class="icon iconfont icon-Automaticinspection abc"></span>
          <span>巡检总况</span>
        </p>
      </div>
      <section class="btn_baritems">
        <div class="l showitem01" v-if="bar_value">
          <section id="show_bar" style="height:183px; width: 90%;"></section>
          <div>
            <div class="atc_title">
              <p>巡检点数</p>
              <p>
                {{bar_value.InspectionDeviceCount}}
                <!--100-->
              </p>
            </div>
            <div class="act_num">巡检次数：
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
                <!--自动巡检-->
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
	  		  		<p class="ghj_time"><span >04:00</span><span>自动巡检</span></p>
	  		  	</li>		
          -->
        </ul>
      </section>

      <div class="title">
        <p class="l ti_n">
          <span class="icon iconfont icon-Inspectionreport abc"></span>
          <span>巡检记录</span>
        </p>
      </div>
      <div class="show_exl">
        <!--table-->
        <div id="is_table_spid">
            <el-table
               :data="all_table"
               max-height="300"
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
            value-format="yyyy-MM-dd"
            type="date"
            @change="selectTime"
            placeholder="选择日期"
          ></el-date-picker>
        </li>
<!--         <li class="l">
          <span class="label">巡检路线名称</span>
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
          <span>巡检总况</span>
        </p>
      </div>
      <section class="btn_baritems">
        <div class="l showitem01" v-if="bar_value">
          <section id="record-chart" style="height:183px; width: 90%;"></section>
          <div>
            <div class="atc_title">
              <p>巡检点数</p>
              <p>
                {{points}}
                <!--100-->
              </p>
            </div>
            <div class="act_num">待巡检计划：
              <span>
                <!--6-->
                {{waitingPlan}}个
              </span>
            </div>
            <div class="act_num02">
              <p>
                <!--70-->
                {{pointsInfo.NormalCount?pointsInfo.NormalCount:0}}
              </p>
              <p>
                <!--50-->
                {{pointsInfo.FaultCount?pointsInfo.FaultCount:0}}
              </p>
            </div>
          </div>
          <!--	<img src="/static/image/task/test.png">-->
        </div>
        <ul>
          <li
            v-for="(item,key) in plans"
            :class="{currt_ing:active==key}"
            @click="active=key;queryPlan(item.ID)"
          >
            <section class="ui_box">
              <div class="l status">
                  {{item.InspectionState}}
              </div>
              <div class="r itext">
                <p>
                  <span class="colors"></span>
                  <span class="igh">待巡检</span>
                  <span class="hgy">
                    <!--70-->
                    {{item.InspectionCount - item.NormalCount - item.FaultCount}}
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
                {{item.InspectionDatetime.split(' ')[1]}}
              </span>
              <span>
                {{item.FContacts}}
                <!--自动巡检-->
              </span>
            </p>
          </li>
        </ul>
      </section>

      <div class="title">
        <p class="l ti_n">
          <span class="icon iconfont icon-Inspectionreport abc"></span>
          <span>巡检记录</span>
        </p>
      </div>
      <div class="show_exl">
        <!--table-->
        <div id="is_table_spid">
            <el-table
               :data="records"
               max-height="300"
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
  </div>
</template>


<style>
.Ins_records .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 160px;
}
.Ins_records .el-input__inner {
  background: none;
  border: none;
}
.Ins_records .el-input__inner {
  color: #fff;
}
.Ins_records .divsh {
  display: none;
}
.Ins_records .el-dialog__body {
  padding: 0px 20px;
}
.Ins_records .isod {
  display: none;
}

.Ins_records .nnor {
  display: none;
}
.Ins_records .reding {
  color: red;
}
#is_table_spid {
  height: 330px;
  overflow: auto;
  border: solid 1px #143169;
}
#is_table_spid ul {
  height: 50px;
}
#is_table_spid ul.tiso {
  font-size: 14px;
}
#is_table_spid ul li {
  float: left;
  height: 50px;
  line-height: 50px;
  width: 11%;
}
#is_table_spid ul li.sm_r {
  width: 5%;
}
#is_table_spid ul li.bi_r {
  width: 9%;
}

#is_table_spid ul:nth-child(odd) {
  background-color: #0b3975;
}
#is_table_spid ul:nth-child(even) {
  background-color: #1a4b8b;
}
</style>

<script>
import html2Canvas from "html2canvas";
var echarts = require("echarts");
import * as comm from "@/assets/js/pro_common";
import {Inspection,FileUpLoad} from '@/request/api.js'//api接口（接口统一管理）;
import table from '@/mixins/table' //表格混入数据
export default {
  mixins:[table],
  data() {
    return {
      projectNames: localStorage.getItem("projectname"),
      centerDialogVisible: false, //用于弹出框
      htmlTitle: "巡检报告", //巡检报告生成名称
      Dialog_table0: [], //巡检报告弹出框正常、框异值-总数表格
      Dialog_table1: [], //巡检报告弹出框正常值-表格
      Dialog_table2: [], //巡检报告弹出框异常值-表格

      value1: "", //时间选择值
      bar_value: "", //把环形图值付给这里
      table2: "",
      ings: 0, //点击巡检li标签高亮
      exl_url: "", //用于在div内浏览的地址
      exl_hef: "", //用于导出exl，用split()分割后，得到直接地址
      currt: 0, //一键巡检遮罩层

      all_table: [], //所有表格数据。
      activeIndex: 0,
      // exl_url:"http://www.szqianren.cn/CreateFile/新都汇/新都汇物联巡检记录2018112612.xls",
      //人工巡检
      time:new Date(),
      filterText:'',
      points:0,//巡检点总数
      waitingPlan:0,
      pointsInfo:{},
      plans:[],
      active:0,//默认选中第一个计划
      planID:'',
      records:[],
      showReport:false,
      dateReport:null,
      tableLabel:[
          {
              prop: 'InspectionObject',
              label: '巡检对象'
          },
          {
              prop: 'AreaName',
              label: '区域名称'
          },
          {
              prop: 'InspectionItem',
              label: '巡检项'
          },
          {
              prop: 'InspectionValue',
              label: '巡检值'
          },
          {
              prop: 'LimitValue',
              label: '越限值'
          },
          {
              prop: 'InspectionResult',
              label: '巡检结果'
          },
          {
              prop: 'InspectionNote',
              label: '备注'
          },
          {
              prop: 'InspectionTime',
              label: '巡检时间'
          }
      ],
    };
  },
  methods: {
    make_paf() {
      //生成pdf文件的方法
      let _this = this;
      /*巡检报告弹ajax请求数据*/
      let ch_time = "";
      if (this.value1 == "" || this.value1 == null) {
        ch_time = comm.CurentTime().clock.split(" ")[0]; //默认为当天
      } else {
        ch_time = this.value1;
      }

      _this.$axios
        .post(_this.mypro + "Caiot/Inspection", {
          FTokenID: localStorage.getItem("Token"),
          FAction: "QueryInspectionReportByDate",
          FVersion: "1.0.0",
          ProjectID: localStorage.getItem("projectid"),
          FDateTime: ch_time
        })
        .then(function(jsons) {
          console.log(jsons.data);
          if (jsons.data.Result != 200) {
            _this.messageShowErr(jsons.data.Result); //如果出错，调用弹出框报错消息
          }

          _this.Dialog_table0 = jsons.data.FObject.Table;
          _this.Dialog_table1 = jsons.data.FObject.Table1;
          _this.Dialog_table2 = jsons.data.FObject.Table2;
        })
        .catch(function(err) {});

      /*巡检报告弹ajax请求数据*/

      this.centerDialogVisible = true; //弹出-弹出框
      /*生成pdf名称*/
      let now_times = ""; //如果日期为空，默认为昨天的
      if (this.value1 == "" || this.value1 == null) {
        now_times =
          comm
            .CurentTime()
            .clock.split(" ")[0]
            .replace(/-/gi, "") - 1;
      } else {
        now_times = this.value1.replace(/-/gi, "");
      }
      //	console.log(now_times)

      this.htmlTitle = localStorage.getItem("projectname") + now_times; //生成pdf名称
      //console.log(now_times)
      /*生成pdf名称*/

      setTimeout(function() {
        //console.log(_this.Dialog_table2)
        if (_this.Dialog_table2 != "") {
          //如果没有数据，就不生成pdf文件
          _this.getPdf();
          /* 生成base64传给后台 */
          html2Canvas(document.querySelector("#pdf_htmls")).then(canvas => {
            var srccc = canvas.toDataURL("image/png");
            //  console.log(srccc)
            // document.querySelector("#iimgs").src=srccc
            /*生成图片传给服务器*/
            _this.$axios
              .post(_this.mypro + "Caiot/FileUpLoad", {
                FTokenID: localStorage.getItem("Token"),
                FAction: "SaveInspectionReportJpg2Pdf",
                FVersion: "1.0.0",
                ProjectID: localStorage.getItem("projectid"),
                FData: srccc.replace("data:image/png;base64,", ""),
                FName: localStorage.getItem("projectname") + now_times //
              })
              .then(function(jsons) {
                console.log(jsons.data);
              })
              .catch(function(err) {});

            /*end of 生成图片传给服务器*/
          });
        }
      }, 200);
    },

    logTimeChange(val) {
      //选择时间
      //console.log(this.value1)
    },

    li_item_click(x = 0, gettime, id) {
      //点击巡检总况 列表事件,把id带过来，去查列表数据
      let _this = this;
      // console.log(id)
      /*if(!gettime){
     			gettime=comm.CurentTime().clock.split(" ")[0]+" "+"00:00:00"  //默认第一个点击事件
     		}*/

      //console.log(gettime)
      this.ings = x; //当前的点击的li高亮
      _this.all_table = [];
      _this.$axios
        .post(_this.mypro + "Caiot/Inspection", {
          FTokenID: localStorage.getItem("Token"),
          FAction: "QueryInspectionRecordByInfoID",
          ID: id,
          FVersion: "1.0.0"
        })
        .then(function(jsons) {
          let obj = jsons.data.FObject
          Object.keys(obj).forEach(key => {
            _this.all_table = _this.all_table.concat(obj[key])
          })
        })
        .catch(function(err) {});

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
        "https://view.officeapps.live.com/op/view.aspx?src=http://www.szqianren.cn/CreateFile/PID/ABC物联巡检记录time.xls";
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

      let _this = this;
      let timesh = "";
      if (!val) {
        timesh = comm.CurentTime().clock.split(" ")[0] + " " + "00:00:00"; //传当前时间
      } else {
        timesh = val + " " + "00:00:00"; //传当前时间
        /*如果选择时间为今天时间，一键巡检就可以点击*/

        if (val == comm.CurentTime().clock.split(" ")[0]) {
          _this.currt = 0;
        } else {
          _this.currt = 1;
        }
        /*enf of 如果选择时间为今天时间，一键巡检就可以点击*/
      }

      // console.log(timesh)
      //console.log(times.clock)
      _this.$axios
        .post(_this.mypro + "Caiot/Project", {
          FTokenID: localStorage.getItem("Token"),
          FAction: "GetPrjInspection",
          // "FDateTime":"2018-11-26",
          // "ProjectID":3,
          ProjectID: localStorage.getItem("projectid"),
          FDateTime: timesh,

          FVersion: "1.0.0"
        })
        .then(function(jsons) {
          if (jsons.data.Result != 200) {
            _this.messageShowErr(jsons.data.Result); //如果出错，调用弹出框报错消息
          }

          _this.bar_value = jsons.data.FObject.Table[0]; //把环形图值付给它。再在页面读取总数等值
          _this.table2 = jsons.data.FObject.Table1; //把巡检总况列表值付给table2。

          _this.bar_show(jsons.data.FObject.Table[0]); //生成环形图,一定执行在最后，否则不执行
          if (jsons.data.FObject.Table1.length > 0) {
            _this.li_item_click("0", timesh, jsons.data.FObject.Table1[0].ID); //默认第一个li点击，把第一个id带过去
          }
        })
        .catch(function(err) {});
    },

    one_change() {
      //一键巡检只能查当前的
      let _this = this;
      let ii = 0;
      _this.$axios
        .post(_this.mypro + "Caiot/Project", {
          FTokenID: localStorage.getItem("Token"),
          FAction: "CreateCaiotInspectionByProject",
          ProjectID: localStorage.getItem("projectid"),
          FVersion: "1.0.0"
        })
        .then(function(jsons) {
          console.log(jsons.data);
          if (jsons.data.Result == 200) {
            _this.start_barData();
          }
        })
        .catch(function(err) {});
    },

    bar_show(x) {
      if (!x) {
        return; //如果没有数据，就直接不执行下面的，防止没有取得getAttribute报错
      }

      setTimeout(function() {
        var dom = document.getElementById("show_bar");
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
              data: [
                { value: x.NormalCount, name: "正常" },
                { value: x.FaultCount, name: "异常" }
                /* {value:100, name:'正常'},
					                  {value:10, name:'异常'},*/
              ]
            }
          ],
          color: ["#00D294", "#89192E"]
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      }, 50);
    },
    /**
     * 人工巡检选择时间
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
     * 查询人工巡检信息
     */
    queryPlanRecord(){
        this.active = 0
        Inspection({
          FAction:'QueryUInspectionPlanByCount',
          StartDateTime:this.time,
          EndDateTime:this.time
        })
        .then(data => {
          this.points = data.FObject.Table?data.FObject.Table[0].Count:0
          this.pointsInfo = data.FObject.Table1?data.FObject.Table1[0]:{}
          this.plans = data.FObject.Table2?data.FObject.Table2:{}
          this.waitingPlan = data.FObject.Table3?data.FObject.Table3[0].WaitingPlanCount:0
          this.queryPlan(this.plans[0].ID)
        })
        .catch(error => {
          console.log(error);
        })
    },
    /**
     * 根据计划ID查询巡检记录
     */
    queryPlan(id){
      this.planID = id
      Inspection({
        FAction:'QueryUInspectionPlanRecord',
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
     * 查询人工巡检日报
     */
    async queryDateReport(){
      await new Promise((resolve,reject) => {
        Inspection({
          FAction:'QueryUInspectionDaily',
          StartDateTime:this.time,
          EndDateTime:this.time,
        })
        .then(data => {
          this.dateReport = data.FObject
          this.showReport = true
          resolve()
        })
        .catch(error => {
          reject()
        })
      })
      html2Canvas(document.querySelector("#date-report")).then(canvas => {
        var srccc = canvas.toDataURL("image/png");
        let fileName = localStorage.getItem("projectname") + '人工巡检' +  this.time.toJSON().split('T')[0]
        FileUpLoad({
            FAction:'SaveInspectionReportJpg2Pdf',
            FData: srccc.replace("data:image/png;base64,", ""),
            FName: fileName
        })
        .then(data => {
          console.log('object',data);
          // window.location = "http://www.szqianren.com/" + data.FObject;
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
        Inspection({
            FAction:'QueryExportUInspectionPlanRecord',
            ID:this.planID
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
          let datas = [{value:this.pointsInfo.NormalCount,name:"正常"},{value:this.pointsInfo.FaultCount,name:"异常"}]
          this.$nextTick(() => {
            this.showPieChart('record-chart',datas)
          })
      }
    }
  },
  created() {
    this.start_barData();
    this.queryPlanRecord()
    let tt = comm.CurentTime().clock.split(" ")[0];
    this.value1 = tt;
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
$img-url:'/static/image/';
.Ins_records .top {
  height: 46px;
}
.Ins_records .top ul li {
  width: 137px;
  height: 46px;
  line-height: 46px;
  font-size: 16px;
  margin: 0 3px;
  float: left;
	background: url(/static/image/task/t2.png);
	cursor: pointer;
}
.Ins_records .top ul li.active {
  background: url(/static/image/task/t1.png);
}
.Ins_records .bg_are {
  height: 864px;
  background: url(/static/image/task/bg_1.png);
}
.Ins_records .bg_are .ich {
  height: 46px;
  padding: 57px 54px 20px;
  position: relative;
}
.Ins_records .bg_are .ich a {
  color: #fff;
}
.Ins_records .bg_are .ich .time {
  width: 305px;
  height: 46px;
  float: left;
}
.Ins_records .bg_are .ich .time .name {
  width: 75px;
  height: 46px;
  line-height: 46px;
  font-size: 17px;
}
.Ins_records .bg_are .ich .date_chs {
  width: 174px;
  height: 46px;
  background: url(/static/image/task/time.png);
  float: left;
}
.Ins_records .bg_are .ich .ntb01 {
  width: 119px;
  height: 46px;
  line-height: 46px;
  background: url(/static/image/task/b1.png);
  float: left;
  text-indent: 15px;
  margin-right: 8px;
  cursor: pointer;
}
.Ins_records .bg_are .ich .ntb01:hover {
  background: url(/static/image/task/b2.png);
}
.Ins_records .bg_are .ich .ntb02 {
  width: 119px;
  height: 46px;
  line-height: 46px;
  background: url(/static/image/task/b3.png);
  float: left;
  text-indent: 15px;
  margin-right: 8px;
  cursor: pointer;
}
.Ins_records .bg_are .ich .ntb02:hover {
  background: url(/static/image/task/b4.png);
}
.Ins_records .bg_are .ich .ntb03 {
  width: 119px;
  height: 46px;
  line-height: 46px;
  background: url(/static/image/task/b5.png);
  float: left;
  text-indent: 15px;
  margin-right: 8px;
  cursor: pointer;
}
.Ins_records .bg_are .ich .ntb03:hover {
  background: url(/static/image/task/b6.png);
}
.Ins_records .bg_are .ich .ntb04 {
  width: 88px;
  height: 46px;
  line-height: 46px;
  background: url(/static/image/task/b7.png);
  float: left;
  text-indent: 15px;
  margin-right: 8px;
  cursor: pointer;
}
.Ins_records .bg_are .ich .ntb04:hover {
  background: url(/static/image/task/b8.png);
}
.Ins_records .bg_are .ich .ntb05 {
  width: 88px;
  height: 46px;
  line-height: 46px;
  background: url(/static/image/task/b9.png);
  float: left;
  text-indent: 15px;
  margin-right: 8px;
  cursor: pointer;
}
.Ins_records .bg_are .ich .ntb05:hover {
  background: url(/static/image/task/b10.png);
}
.Ins_records .bg_are .title {
  height: 55px;
  background: url(/static/image/task/itltie.png);
  margin: 0 22px;
}
.Ins_records .bg_are .title .ti_n {
  line-height: 55px;
  width: 175px;
  float: left;
  color: #18a1ec;
}
.Ins_records .bg_are .title .ti_n .abc {
  font-size: 25px;
  float: left;
  margin: 0 0 0 25px;
}
.Ins_records .bg_are .title .ti_n span {
  font-size: 18px;
  margin: 0 0 0 5px;
  float: left;
}

.Ins_records .bg_are .btn_baritems {
  height: 203px;
  margin-top: 20px;
}
.Ins_records .bg_are .btn_baritems .showitem01 {
  position: relative;
  width: 305px;
  height: 183px;
  margin: 0 22px;
  background: url(/static/image/index/leftbar_bg_circle.png) no-repeat 67px 20px;
}
.Ins_records .bg_are .btn_baritems .showitem01 .atc_title {
  position: absolute;
  top: 76px;
  left: 107px;
}
.Ins_records .bg_are .btn_baritems .showitem01 .atc_title p:nth-child(2) {
  font-size: 22px;
}
.Ins_records .bg_are .btn_baritems .showitem01 .act_num {
  position: absolute;
  top: 166px;
  left: 93px;
  font-size: 14px;
}
.Ins_records .bg_are .btn_baritems .showitem01 .act_num span {
  font-size: 16px;
}
.Ins_records .bg_are .btn_baritems .showitem01 .act_num02 {
  position: absolute;
  top: 69px;
  right: -3px;
  font-size: 16px;
}

.Ins_records .bg_are .btn_baritems ul {
  float: left;
  width: 1180px;
  height: 180px;
  overflow-x: auto;
}
.Ins_records .bg_are .btn_baritems ul li {
  width: 190px;
  height: 169px;
  padding: 20px 0 0 0;
  background: url(/static/image/task/line.png) no-repeat;
  float: left;
  cursor: pointer;
}
.Ins_records .bg_are .btn_baritems ul li.currt_ing {
  background: url(/static/image/task/line.png) #0a2f66 no-repeat;
}
.Ins_records .bg_are .btn_baritems ul li .ui_box {
  overflow: hidden;
}
.Ins_records .bg_are .btn_baritems ul li .itext {
  width: 91px;
  height: 75px;
  margin-top: 50px;
}
.Ins_records .bg_are .btn_baritems ul li .itext p {
  height: 28px;
}
.Ins_records .bg_are .btn_baritems ul li .itext .colors {
  width: 12px;
  height: 12px;
  display: inline-block;
  background: #00d294;
  margin: 2px 8px 0 0;
  float: left;
}
.Ins_records .bg_are .btn_baritems ul li .itext .igh {
  line-height: 20px;
  display: inline-block;
  margin-top: -2px;
  float: left;
}
.Ins_records .bg_are .btn_baritems ul li .itext .colors_red {
  background: #89192e;
}
.Ins_records .bg_are .btn_baritems ul li .itext .hgy {
  font-size: 16px;
  float: left;
  margin: -3px 0 0 8px;
}
.Ins_records .bg_are .btn_baritems ul li .ghj_time {
  text-align: center;
  padding: 10px 0 0 0;
}
.Ins_records .bg_are .show_exl {
  width: 95%;
  height: 330px;
  margin: 20px auto 0;
  position: relative;
}
.Ins_records .bg_are .show_exl .iframe_tiem {
  width: 1293px;
  height: 330px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/*弹出框html*/
.Ins_records .ppt_item {
  /*position: absolute; top:10%; left: 20%;  */
  width: 1250px; /*height: 1860px;*/
  background: #fff;
  z-index: 150;
  color: #000;
  font-size: 16px;
}
.Ins_records .ppt_item .htbn {
  padding: 20px 30px;
}
.Ins_records .ppt_item .hdr {
  height: 81px;
}
.Ins_records .ppt_item .hdr .pn {
  height: 50px;
  width: 30%;
  text-align: left;
  font-size: 20px;
}
.Ins_records .ppt_item .hdr .pn02 {
  height: 50px;
  font-size: 26px;
  width: 40%;
}
.Ins_records .ppt_item .hdr .pn03 {
  height: 50px;
  width: 30%;
  text-align: right;
  font-size: 20px;
}

.Ins_records .ng_item {
  height: 113px;
  background: #e4e4e4;
  position: relative;
}
.Ins_records .ng_item .list {
  width: 780px;
}
.Ins_records .ng_item .list ul {
  padding: 15px 0 0 0;
}
.Ins_records .ng_item .list ul li {
  width: 50%;
  height: 45px;
  line-height: 45px;
  float: left;
  text-align: left;
  font-size: 20px;
}
.Ins_records .ng_item .list ul li span {
  color: #1d7bce;
}
.Ins_records .ng_item .list ul li span.no {
  color: #ef0f24;
}
.Ins_records .ng_item .pimg {
  position: absolute;
  top: -41px;
  left: 36px;
}

.Ins_records .table-c table {
  border-right: 1px solid #77bfec;
  border-bottom: 1px solid #77bfec;
  margin: 15px 0 0 0;
}
.Ins_records .table-c table td {
  border-left: 1px solid #77bfec;
  border-top: 1px solid #77bfec;
}
.Ins_records .table-c table td {
  text-align: center;
  height: 35px;
}
.Ins_records .table-c .gg {
  background: #addbf5;
}

.Ins_records .table-red table {
  border-right: 1px solid #f3afaf;
  border-bottom: 1px solid #f3afaf;
  margin: 15px 0 0 0;
}
.Ins_records .table-red table td {
  border-left: 1px solid #f3afaf;
  border-top: 1px solid #f3afaf;
}
.Ins_records .table-red table td {
  text-align: center;
  height: 35px;
}
.Ins_records .table-red .gg {
  background: #f5c8c8;
}
.Ins_records .person {
  padding: 10px;
  text-align: left;
  border: solid 1px #f3afaf;
  border-top: none;
}
.Ins_records .person_pg {
  text-align: right;
  padding: 25px 0 0 0;
}

/*end of 弹出框html*/
/* 人工巡检 */
.Ins_records{
  .record-header{
      li{
        line-height: 46px;
        margin-right: 20px;
        .label{
          font-size: 17px;
          margin-right: 10px;
        }
        .el-date-editor{
          background: url(#{$img-url}task/time.png)
        }
        .search-input {
          background: #042E74;
        }
      }
      li:last-of-type{
        margin-left: 100px;
      }
  }
  .status{
    width:85px;
    height:123px;
    line-height:170px;
    background:url('/static/image/task/icon_1.png');
    margin: 5px 0 0 12px;
  }
}

</style>
