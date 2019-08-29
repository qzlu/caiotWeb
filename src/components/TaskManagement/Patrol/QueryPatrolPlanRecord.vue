<template>
    <div class="report patrol-report">
        <!-- 人工巡更月报 -->
        <el-dialog :visible.sync="showReport" width="1280px">
          <!--html-->
          <section class="ppt_item month-report" id="date-report" v-if="dateReport.Table">
            <div class="htbn">
              <section>
                <div class="hdr">
                  <p class="pn02">巡更报告</p>
                  <p class="l pn">
                    项目名称：{{projectNames}}
                    <!--新都汇-->
                  </p>
                  <p class="r pn03">日期：
                    <!--2018-09-20-->
                    {{formatDate(time[0],'YYYY-MM-DD')}} ~ {{formatDate(time[1],'YYYY-MM-DD')}}
                  </p>
                </div>
                <div class="ng_item" style="height:190px;">
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
                      <li class="l">计划巡更　<span>{{item.PatrolPlanCount||0}}次</span></li>
                      <li class="l">正常次数　<span>{{item.PlanNormalCount||0}}次</span></li>
                      <li class="l">异常次数　<span>{{item.PlanFaultCount||0}}次</span></li>
                      <li class="l">超时次数　<span>{{item.PlanOvertimeCount||0}}次</span></li>
                      <li class="l">漏巡次数　<span>{{item.PlanleakCount||0}}个</span></li>
                      <li class="l">异常点数　<span class="no">{{item.FaultCount||0}}个</span></li>
                      <li class="l">漏巡点数　<span>{{item.leakCount||0}}个</span></li>
                    </ul>
                  </div>
                </div>
              </section>
<!--               <p class="title"><span class="icon"></span>超时详情</p>
              <div class="table-c">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr class="gg">
                    <td width="">巡更名称</td>
                    <td width="">计划时间</td>
                    <td width="">巡更点数</td>
                    <td width="">待巡更点数</td>
                    <td>正常点数</td>
                    <td>异常点数</td>
                    <td>巡更人</td>
                  </tr>
                  <tr v-for="(item,key) in  dateReport.Table1" :key='key'> 
                    <td>{{item.PatrolLineName}}</td>
                    <td>{{item.RunningOrderDateTime}}</td>
                    <td >{{item.PatrolPointCount}}</td>
                    <td>{{item.WaitingCount}}</td>
                    <td>{{item.NormalCount}}</td>
                    <td :class="{'red':item.FaultCount>0}">{{item.FaultCount}}</td>
                    <td>{{item.FContacts}}</td>
                  </tr>
                </table>
              </div> -->
              <p class="title"><span class="icon"></span>异常详情</p>
              <div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <thead>
                    <tr class="gg">
                      <td width="10%">巡更名称</td>
                      <td width="11%">计划时间</td>
                      <td width="10%">巡更点数</td>
                      <td width="10%">正常点数</td>
                      <td width="10%">异常点数</td>
                      <td width="10%">超时点数</td>
                      <td width="10%">漏巡点数</td>
                      <td width="10%">巡更人</td>
                      <td width="10%">巡更时间</td>
                    </tr>
                  </thead>
                </table>
                <ul class="tbody">
                  <li v-for="(item,key) in  dateReport.Table1" :key='key'>
                    <div class='header'>
                      <span>{{item.PatrolLineName}}</span>
                      <span>{{item.PatrolDatetime}}</span>
                      <span>{{item.PlanCount}}</span>
                      <span>{{item.NormalCount}}</span>
                      <span :class="{'red':item.FaultCount>0}">{{item.FaultCount}}</span>
                      <span>{{item.OvertimeCount}}</span>
                      <span>{{item.leakCount}}</span>
                      <span>{{item.FContacts}}</span>
                      <span>{{item.PatrolTime}}</span>
                    </div>
                    <ul class="body">
                      <li v-for="(obj,i) in item.Data" :key="i">
                        <span></span>
                        <span></span>
                        <span>{{obj.PatrolPointName}}</span>
                        <span>{{obj.FPatrolState == '正常'?'正常':''}}</span>
                        <span class="red">{{obj.FPatrolState == '异常'?'异常':''}}</span>
                        <span class="red">{{obj.FPatrolState == '超时'?'超时':''}}</span>
                        <span class="red">{{obj.FPatrolState == '漏巡'?'漏巡':''}}</span>
                        <span></span>
                        <span>{{obj.PatrolTime}}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
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
        <ul class="report-header clearfix">
            <li class="l"> 
                <span class="label">时间　</span>
                <el-date-picker type="daterange" v-model="time">
                </el-date-picker>
            </li>
            <li class="l">
                <span class="label">路线名称</span>
                <el-select v-model="road"  filterable value-key="ID"  placeholder="请选择">
                    <el-option :value="0" label="全部"></el-option>
                    <el-option v-for="road in roadDatas" :key="road.ID" :label="road.PatrolLineName" :value="road.ID"></el-option>
                </el-select>
            </li>
            <li class="l">
                <span class="label">巡更人</span>
                <el-select v-model="user"  placeholder="请选择">
                    <el-option :value="0" label="全部"></el-option>
                    <el-option v-for="user in users" :key="user.FGUID" :label="user.FContacts" :value="user.FGUID"></el-option>
                </el-select>
            </li>
            <li class="l">
                <span class="label">巡更状态</span>
                <el-select v-model="status"    placeholder="请选择">
                    <el-option :value="0" label="全部"></el-option>
                    <el-option :value="1" label="漏巡"></el-option>
                    <el-option :value="2" label="超时"></el-option>
                    <el-option :value="3" label="正常"></el-option>
                    <el-option :value="4" label="异常"></el-option>
                </el-select>
            </li>
            <li class="l"><button class="zw-btn" @click="pageIndex = 1;queryData()">查询</button></li>
            <li class="l"><button class="zw-btn" style="width:120px" @click="exportFile()"><i class="iconfont icon-Export"></i>导出Excel</button></li>
            <li class="l"><button class="zw-btn" style="width:120px" @click="queryPatrolReport()"><i class="iconfont icon-Export"></i>导出报告</button></li>
        </ul>
        <div class="zw-table">
            <el-table
               :data="tableData"
               style="width: 100%"
               header-row-class-name="el-table-header"
               :row-class-name="tableRowClassName"
               >
               <el-table-column
                 v-for="item in tableLabel"
                 :key="item.prop"
                 :prop="item.prop"
                 :width="item.width"
                 :label="item.label"
                 :sortable="item.sortble"
                 :formatter="item.formatter"
                 show-overflow-tooltip
                >
               </el-table-column>
            </el-table>
        </div>
        <zw-pagination @pageIndexChange='handleCurrentChange' :pageIndex='pageIndex' :total='total'></zw-pagination>
    </div>
</template>
<script>
import table from '@/mixins/table' //表格混入数据
import {Patrol} from '@/request/api.js';
import formatDate from '@/utils/formatDate.js'
import '../InspectionRecords.scss';
export default {
    mixins:[table],
    data(){
        return{
            time:[new Date(), new Date()],
            tableLabel:[
                {
                    prop: 'RowNum',
                    label: '序号',
                    width:80
                },
                {
                    prop:'PatrolPlanName',
                    label:'巡更计划名称'
                },
                {
                    prop: 'PatrolPlanDatetime',
                    label: '计划时间',
                },
                {
                    prop: 'PatrolObject',
                    label: '巡更点',
                },
                {
                    prop: 'PatrolTime',
                    label: '巡更时间',
                },
                {
                    prop: 'PatrolResult',
                    label: '巡更结果',
                },
                {
                    prop: 'PatrolNote',
                    label: '异常描述',
                },
                {
                    prop:'FContacts',
                    label:'巡更人',
                }
            ],
            roadDatas:[], //所有路线
            road:0,
            user:0,
            status:0,
            showReport:false,
            dateReport:{},
            projectNames: localStorage.getItem("projectname"),
            formatDate:formatDate
        }
    },
    computed:{
        users(){
            if(!this.$store.state.orderUser[0]){
                this.$store.dispatch('queryOrderTUsers')
            }
            return this.$store.state.orderUser //负责人
        }
    },
    created(){
        this.queryData()
        this.queryRoad()
    },
    methods:{
        /**
         * 274.分页查询巡更记录
         */
        queryData(){
            Patrol({
                FAction:'QueryPageUPatrolPlanRecord',
                SearchKey:this.filterText,
                PageIndex:this.pageIndex,
                PageSize:10,
                StartDateTime:this.time[0].toLocaleDateString() + ' 00:00',
                EndDateTime:this.time[1].toLocaleDateString() + ' 23:59',
                FUserGuid:this.user,
                FPatrolLineID:this.road,
                FPatrolState:this.status
            })
            .then((data) => {
                this.total = data.FObject.Table ? data.FObject.Table[0].FTotalCount : 0
                this.tableData =  data.FObject.Table1 || []
            })
            .catch((err) => {
                
            });
        },
        /**
         * handleCurrentChange 页码改变时触发
         */
        handleCurrentChange(val){
            this.pageIndex = val
            this.queryData()
        },
        /**
         * 查询巡更路线
         */
        queryRoad(){

            let startDateTime = '00:00'
            let endDateTime = '23:59'
            Patrol({
                FAction:'QueryUPatrolLine',
                FName:'',
                StartDateTime:startDateTime,
                EndDateTime:endDateTime,
                PatrolCycle:0,
            })
            .then(data => {
                this.roadDatas = data.FObject
            })
            .catch(error => {

            })
        },
        /**
         * exportFile 导出
         */
        exportFile(){
            Patrol({
                FAction:'QueryExportUPatrolPlanRecordByDate',
                SearchKey:this.filterText,
                StartDateTime:this.time[0].toLocaleDateString() + ' 00:00',
                EndDateTime:this.time[1].toLocaleDateString() + ' 23:59',
                FUserGuid:this.user,
                FPatrolLineID:this.road,
                FPatrolState:this.status
            })
            .then(data => {
                window.location ="http://www.szqianren.com/"+data.FObject;
            })
            .catch(error => {
                this.$message({
                  type: 'error',
                  message: '导出失败!请重试'
                });
            })
        },
        /**
         * 查询巡更报告
         */
        queryPatrolReport(){
            this.showReport = true
            Patrol({
                FAction:'QueryExportUPatrolPlanRecordByDatePresentation',
                SearchKey:this.filterText,
                StartDateTime:this.time[0].toLocaleDateString() + ' 00:00',
                EndDateTime:this.time[1].toLocaleDateString() + ' 23:59',
                FUserGuid:this.user,
                FPatrolLineID:this.road,
                FPatrolState:this.status
            })
            .then((result) => {
                this.dateReport = result.FObject
                this.$nextTick(() => {
                    this.getPdf('#date-report',`${this.projectNames}巡更报告(${formatDate(this.time[0],'YYYY-MM-DD')}~${formatDate(this.time[1],'YYYY-MM-DD')})`)
                })
            }).catch((err) => {
                
            });
        }
    }
}
</script>
<style lang="scss">
$img-url:'/static/image/';
.patrol-report  {
  .ppt_item.month-report{
    .ng_item{
      height: 150px;
      padding-bottom: 10px;
      overflow: hidden;
      .pimg{
        top: 0;
      }
    }
    .title{
      margin-left: -14px;
      line-height: 40px;
      text-align: left;
      font-size: 20px;
      .icon{
        display: inline-block;
        width: 4px;
        height: 18px;
        background: #1d7bce;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    .tbody{
      >li{
        .header{
          display: flex;
          line-height: 34px;
          /* background: rgba($color: #f3afaf, $alpha: 0.4); */
          span{
            flex: 1;
            white-space: nowrap;
          }
        }
        .body{
          li{
            line-height: 34px;
            display: flex;
            justify-content: start;
            /* border: 1px solid rgba($color: #f3afaf, $alpha: 0.4); */
            span{
                flex: 1;
                white-space: nowrap;
            }
          }
        }
      }
    }
    .red{
      color:#ef0f24
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
  .person_pg{
      text-align: right;
  }
}
</style>
