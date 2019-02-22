<template>
    <div class=" road report">
        <el-dialog title="新增巡检路线" :visible.sync="show" class="zw-dialog">
            <div class="clearfix">
                <ul class="l clearfix ">
                    <li>
                        <span class="label">巡检路线名称</span>
                        <el-input v-model="addRoadData.InspectionLineName"></el-input>
                        <!-- <button class="zw-btn" @click="showPointTree = !showPointTree">新增巡检点</button> -->
                    </li>
                    <li>
                        <span class="label">巡检周期</span>
                        <el-select v-model="addRoadData.InspectionCycle"  placeholder="请选择">
                            <el-option v-for="time in timeList" :key="time.value" :label="time.label" :value="time.value"></el-option>
                        </el-select>
                    </li>
                    <li>
                        <span class="label">频次</span>
                        <div class="date-select"  v-if="addRoadData.InspectionCycle === 1">
                            
                            <ul class="l clearfix time-content">
                                <li  style="margin-top:0" v-for="(time, i) in timeArr" :key="i">{{time}}<i class="el-icon-circle-close-outline" @click="deleteTime('timeArr',i)"></i></li>
                            </ul>
                            <el-popover
                              placement="bottom"
                              width="200"
                              trigger="click"
                              v-model='showPopover'
                              popper-class='select-time-popover'
                             >
                               <i class="el-icon-circle-plus-outline" slot="reference"></i>
                              <p class="time-title">选择时间</p>
                              <div class="clearfix">
                                  <div class="l time-select-main">
                                    <el-scrollbar>
                                        <ul class="time-select">
                                            <li v-for="i in 24" :class="{active:hh==i-1}" :key="i" @click="hh=i-1">{{((i-1)<10)?'0'+(i-1):i-1}} <span v-if="hh==i-1">时</span></li>
                                        </ul>
                                    </el-scrollbar>
                                  </div>
                                  <div class="r time-select-main">
                                    <el-scrollbar>
                                        <ul class="time-select">
                                            <li v-for="i in 59" :class="{active:mm==i-1}" :key="i" @click="mm=i-1">{{((i-1)<10)?'0'+(i-1):i-1}} <span v-if="mm==i-1">分</span></li>
                                        </ul>
                                    </el-scrollbar>
                                  </div>
                              </div>
                              <div class="time-select-footer">
                                 <a @click="showPopover = false">取消</a>
                                 <a @click="selectTime()">确定</a>
                              </div>
                            </el-popover>
                        </div>
                        <div class="date-select"  v-if="addRoadData.InspectionCycle === 2">
                                <ul class="l clearfix time-content">
                                    <li  style="margin-top:0" v-for="(time, i) in timeArr1" :key="i">{{weekArr[time[0]-1]}}　{{time[1]}}<i class="el-icon-circle-close-outline" @click="deleteTime('timeArr1',i)"></i></li>
                                </ul>
                            <el-popover
                              placement="bottom"
                              width="200"
                              trigger="click"
                              v-model='showPopover'
                              popper-class='select-week-popover'
                             >
                               <i class="el-icon-circle-plus-outline" slot="reference"></i>
                               <div class="clearfix">
                                    <div class="l" >
                                         <p class="time-title">选择周</p>
                                         <el-scrollbar>
                                             <ul class="week-select">
                                                 <li v-for="i in 7" :class="{active:week==i}" :key="i" @click="week=i ">{{weekArr[i-1]}}</li>
                                             </ul>
                                         </el-scrollbar>
                                    </div>
                                    <div class="r" style="width:194px;">
                                         <p class="time-title">选择时间</p>
                                         <div class="clearfix">
                                             <div class="l time-select-main">
                                               <el-scrollbar>
                                                   <ul class="time-select">
                                                       <li v-for="i in 24" :class="{active:h1==i-1}" :key="i" @click="h1=i-1">{{((i-1)<10)?'0'+(i-1):i-1}} <span v-if="h1==i-1">时</span></li>
                                                   </ul>
                                               </el-scrollbar>
                                             </div>
                                             <div class="r time-select-main">
                                               <el-scrollbar>
                                                   <ul class="time-select">
                                                       <li v-for="i in 59" :class="{active:m1==i-1}" :key="i" @click="m1=i-1">{{((i-1)<10)?'0'+(i-1):i-1}} <span v-if="m1==i-1">分</span></li>
                                                   </ul>
                                               </el-scrollbar>
                                             </div>
                                         </div>
                                    </div>
                               </div>
                              <div class="time-select-footer">
                                 <a @click="showPopover = false">取消</a>
                                 <a @click="selectWeek()">确定</a>
                              </div>
                            </el-popover>
                        </div>
                        <div class="date-select"  v-if="addRoadData.InspectionCycle === 3">
                                <ul class="l clearfix time-content">
                                    <li  style="margin-top:0" v-for="(time, i) in timeArr2" :key="i">{{time[0]}}号　{{time[1]}}<i class="el-icon-circle-close-outline" @click="deleteTime('timeArr2',i)"></i></li>
                                </ul>
                            <el-popover
                              placement="bottom"
                              width="200"
                              trigger="click"
                              v-model='showPopover'
                              popper-class='select-week-popover'
                             >
                               <i class="el-icon-circle-plus-outline" slot="reference"></i>
                               <div class="clearfix">
                                    <div class="l" >
                                         <p class="time-title">选择日期</p>
                                         <el-scrollbar>
                                             <ul class="week-select">
                                                 <li v-for="i in 31" :class="{active:month==i}" :key="i" @click="month=i ">{{i}}号</li>
                                             </ul>
                                         </el-scrollbar>
                                    </div>
                                    <div class="r" style="width:194px;">
                                         <p class="time-title">选择时间</p>
                                         <div class="clearfix">
                                             <div class="l time-select-main">
                                               <el-scrollbar>
                                                   <ul class="time-select">
                                                       <li v-for="i in 24" :class="{active:h2==i-1}" :key="i" @click="h2=i-1">{{((i-1)<10)?'0'+(i-1):i-1}} <span v-if="h2==i-1">时</span></li>
                                                   </ul>
                                               </el-scrollbar>
                                             </div>
                                             <div class="r time-select-main">
                                               <el-scrollbar>
                                                   <ul class="time-select">
                                                       <li v-for="i in 59" :class="{active:m2==i-1}" :key="i" @click="m2=i-1">{{((i-1)<10)?'0'+(i-1):i-1}} <span v-if="m2==i-1">分</span></li>
                                                   </ul>
                                               </el-scrollbar>
                                             </div>
                                         </div>
                                    </div>
                               </div>
                              <div class="time-select-footer">
                                 <a @click="showPopover = false">取消</a>
                                 <a @click="selectMonth()">确定</a>
                              </div>
                            </el-popover>
                        </div>
                    </li>
                </ul>
<!--                 <div class="r clearfix tree-content" v-if="showPointTree">
                    <i class="arrow"></i>       
                    <zw-tree :data='pointData' :renderContent='renderContent' :defaultProps='defaultProps'>
                    </zw-tree>                                                                                                                                       
                </div> -->
            </div>
            <div style="text-align:center;height:42px;margin-top:37px;">
                <button class="zw-btn" @click="addRoad()">确定</button>
            </div>
        </el-dialog>
        <ul class="road-head clearfix report-header">
            <li class="l road-head-add" @click="addNewRoad()"><button class="zw-btn zw-btn-add">新增</button></li>
            <li class="l road-head-export" @click="exportFile()"><button class="zw-btn zw-btn-export">导出</button></li>
            <!-- <li class="l road-head-print"><button class="zw-btn zw-btn-print">打印</button></li> -->
            <li class="r">
                <el-input class="search-input" v-model="filterText" placeholder="搜索路线关键字">
                     <i class="el-icon-search" slot="suffix"></i>
                </el-input>
                <el-button type="primary" @click="showFilterBox = !showFilterBox">
                  高级搜索<i class=" el-icon--right" :class="{'el-icon-arrow-down':!showFilterBox,'el-icon-arrow-up':showFilterBox}"></i>
                </el-button>
                <transition>
                    <ul class="search-box"  v-if="showFilterBox">
                        <li class="l">
                            <span>巡检路线名称</span>
                            <el-input v-model="roadName"></el-input>
                        </li>
                        <li class="l">
                            <span>巡检周期</span>
                            <el-select v-model="InspectionCycle"  placeholder="请选择">
                                <el-option v-for="time in timeList" :key="time.value" :label="time.label" :value="time.value"></el-option>
                            </el-select>
                        </li>
                        <li class="l">
                            <span>巡检时间</span>
                            <el-time-picker
                              is-range
                              v-model="time"
                              :picker-options="{
                                selectableRange:'00:00-23:59',
                                format:'HH:mm'
                              }"
                              @change="searchTime"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
                            </el-time-picker>
                            <button class="zw-btn zw-btn-primary" @click="queryData();showFilterBox = false">查询</button>
                            <button class="zw-btn zw-btn-primary">重置</button>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
        <div class="zw-table road-table">
            <el-table
               :data="tableData"
               max-height="300"
               style="width: 100%"
               header-row-class-name="el-table-header"
               :row-class-name="tableRowClassName"
               @row-click = 'changeRoad'
               >
               <el-table-column
                 v-for="item in tableLabel"
                 :key="item.prop"
                 :prop="item.prop"
                 :label="item.label"
                 show-overflow-tooltip
                >
               </el-table-column>
               <el-table-column
                 prop=""
                 label="巡检时间"
                 show-overflow-tooltip
               >
                    <template slot-scope="scoped">
                        <div v-if="scoped.row.InspectionCycleID == 1">
                            <span v-for="time in scoped.row.InspectionTime">{{time[1]}}　</span>
                        </div>
                        <div v-if="scoped.row.InspectionCycleID == 2">
                            <span v-for="time in scoped.row.InspectionTime">{{weekArr[time[0]-1]}}_{{time[1]}}　</span>
                        </div>
                        <div v-if="scoped.row.InspectionCycleID == 3">
                            <span v-for="time in scoped.row.InspectionTime">{{time[0]}}号_{{time[1]}}　</span>
                        </div>
                    </template>
               </el-table-column>
               <el-table-column
                 prop=""
                 label="操作">
                 <template slot-scope="scoped">
                     <div class="role-operation">
                        <span class="pointer" @click="deleteRoad(scoped.row)">删除</span>
                        <span class="pointer" @click="editRoad(scoped.row,true)">编辑</span>
                     </div>
                 </template>
               </el-table-column>
            </el-table>
        </div>
        <div class="point-info">
            <div>
                <button class="zw-btn point">巡检点</button>
                <button class="zw-btn set-point" @click="beforeSetPoint()">设置巡检点</button>
            </div>
            <div class="tree-table">
                <ul class="tree-table-header">
                    <li class="l">序号</li>
                    <li class="l">区域名称</li>
                    <li class="l">巡检点</li>
                    <li class="l">设备系统</li>
                    <li class="l">巡检顺序</li>
                    <li class="l">排序</li>
                </ul>
                <el-scrollbar>
                    <el-tree
                        class="tree-table-body"
                        :data="points"
                        default-expand-all
                        :props='defaultProps'
                        :renderContent='renderContent1'
                    >
                    </el-tree>
                </el-scrollbar>

            </div>
<!--             <div class="zw-table">
                <el-table 
                 :data = 'points' 
                 max-height="330"
                 style="width: 100%"                
                 header-row-class-name="el-table-header"
                 :row-class-name="tableRowClassName">
                    <el-table-column type="index" label="序号" width="100" align='center'>
                    </el-table-column>
                    <el-table-column prop="AreaName" label="区域名称" align='center'>
                    </el-table-column>
                    <el-table-column prop="InspectionPointName" label="巡检点" align='center'>
                    </el-table-column>
                    <el-table-column prop="Value" label="设备系统" align='center'>
                    </el-table-column>
                    <el-table-column prop="PointSortID" label="巡检顺序" align='center'>
                    </el-table-column>
                    <el-table-column prop="" label="巡检点" align='center'>
                    </el-table-column>
                </el-table>
            </div> -->
        </div>
        <el-dialog title="设置巡检点" :visible.sync="showPointTree" class="zw-dialog showPointTree">
            <div style="padding-right: 16px;">
                <tree-transfer
                 ref="transfer"
                 :data='pointData' 
                 :data1='pointData'
                 leftTitle="所有巡检点"
                 rightTitle="已选巡检点"
                 nodeKey="ID"
                 :filterNode="filterNode"
                  @check-change="checkChange"
                 :defaultChecked="[]"
                 :renderContent='renderContent'
                 :renderContent1='renderContent'
                 :defaultProps='defaultProps'
                 :defaultProps1='defaultProps'>
                </tree-transfer>    
            </div>
            <div style="text-align:center;margin-top:20px;">
                <button class="zw-btn zw-btn-primary" @click="setPoint()">确定</button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {system,Inspection} from '@/request/api.js'//api接口（接口统一管理）;
import table from '@/mixins/table' //表格混入数据
import {zwPagination,treeTransfer} from '@/zw-components/index'
import * as comm from "../../assets/js/pro_common";
export default {
    mixins:[table],
    data(){
        return{
            tableLabel:[
                {
                    prop: 'RowNum',
                    label: '序号'
                },
                {
                    prop: 'ID',
                    label: '路线ID'
                },
                {
                    prop: 'InspectionLineName',
                    label: '路线名称'
                },
                {
                    prop: 'DeviceCount',
                    label: '设备总数'
                },
                {
                    prop: 'Frequency',
                    label: '频次'
                },
                {
                    prop: 'InspectionCycle',
                    label: '巡检周期'
                }
            ],
            showFilterBox:false,//是否显示高级搜索框
            timeList:[{
                label:'日巡检',
                value:1
            },
            {
                label:'周巡检',
                value:2
            },
            {
                label:'月巡检',
                value:3
            }],
            //新增巡检路线
            addRoadData:{
                ID:'',
                ProjectID:localStorage.getItem('projectid'),
                InspectionLineName:'',
                InspectionPointIDStr:'',
                InspectionTimeStr:'',
                AreaIDStr:'',
                InspectionCycle:1
            },
            pointData:[],//所有巡检点
            defaultProps:{
                children:'list'
            },
            weekArr:['周一','周二','周三','周四','周五','周六','周日'],
            filterText:'',
            show:false,
            type:0,//0为新增，1为编辑路线
            showPopover:false,
            showPointTree:false,
            roadName:'',//巡检路线名称
            InspectionCycle:1, //巡检周期
            startDateTime:'00:00',
            endDateTime:'23:59',
            time:'', //时间
            hh:null,
            mm:null,
            timeArr:[],
            timeArr1:[],
            h1:null,
            m1:null,
            week:null,
            month:null,
            h2:null,
            m2:null,
            timeArr2:[],
            roadObj:null, //选中路线
            points:[], //选中路线对应的巡检点
            defaultChecked:[],
            index:0
        }
    },
    components:{
        zwPagination,
        treeTransfer
    },
    watch:{
        filterText(val){
            this.roadName = val
            this.queryData()
        },
        showPointTree(val){
            if(val){
                this.$nextTick(() => {
                    this.$refs.transfer.$refs.tree.setCheckedKeys(this.defaultChecked)
                    if(this.defaultChecked.length === 0){
                        this.$refs.transfer.$refs.tree1.filter()
                    }
                })
            }
        }

    },
    computed:{
        timeStr(){
            return this.timeArr.join(',')
        }
    },
    created(){
        this.queryData()
        this.queryPoint()
    },
    mounted(){

    },
    methods:{
        renderContent(h, { node, data, store }){
            return(
                <span>{data.AreaName?data.AreaName:data.InspectionPointName}</span>
            )
        },
        renderContent1(h, { node, data, store }){
            if(data.Aream){
                return(
                    <ul class={{'tree-row':true}}>
                        <li class='l'>{data.AreaSortID}</li>
                        <li class='l'>{data.Aream}</li>
                        <li class='l'></li>
                        <li class='l'></li>
                        <li class='l'></li>
                        <li class='l' v-show={data.index == 0}>
                            <i class='sort sort-down' on-click={ () => this.sortRoad(1,data,this.points[data.i+1])}></i>
                        </li>
                        <li class='l' v-show={data.index == 1}>
                            <i class='sort sort-down' on-click={ () => this.sortRoad(1,data,this.points[data.i+1])}></i>
                            <i class='sort sort-up' on-click={ () => this.sortRoad(1,data,this.points[data.i-1])}></i>
                        </li>
                        <li class='l' v-show={data.index == 2}>
                            <i class='sort sort-up' on-click={ () => this.sortRoad(1,data,this.points[data.i-1])}></i>
                        </li>
                        <li class='l' v-show={data.index == 3}>
                        </li>
                    </ul>
                )
            }else{
                return(
                    <ul class={{'tree-row':true}}>
                        <li class='l'></li>
                        <li class='l'></li>
                        <li class='l'>{data.InspectionPointName}</li>
                        <li class='l'>{data.Value}</li>
                        <li class='l'>{data.PointSortID}</li>
                        <li class='l' v-show={data.index == 0}>
                            <i class='sort sort-down' on-click={ () => this.sortRoad(0,data,data.father[data.i+1])}></i>
                        </li>
                        <li class='l' v-show={data.index == 1}>
                            <i class='sort sort-down' on-click={ () => this.sortRoad(0,data,data.father[data.i+1])}></i>
                            <i class='sort sort-up' on-click={ () => this.sortRoad(0,data,data.father[data.i-1])}></i>
                        </li>
                        <li class='l' v-show={data.index == 2}>
                            <i class='sort sort-up' on-click={ () => this.sortRoad(0,data,data.father[data.i-1])}></i>
                        </li>
                        <li class='l' v-show={data.index == 3}>
                        </li>
                    </ul>
                )
            }
        },
        /**
         * 查询巡检路线
         */
        queryData(){
            if(this.time&&this.time[0]){
                let time = new Date(this.time[0])
                this.startDateTime = time.getHours()+':'+time.getMinutes()
            }else{
                this.startDateTime = '00:00'
            }
            if(this.time&&this.time[1]){
                let time = new Date(this.time[1])
                this.endDateTime = time.getHours()+':'+time.getMinutes()
            }else{
                this.endDateTime = '23:59'
            }
            Inspection({
                FAction:'QueryPageUInspectionLineInfo',
                FName:this.roadName,
                StartDateTime:this.startDateTime,
                EndDateTime:this.endDateTime,
                InspectionCycle:this.InspectionCycle,
                PageIndex:1,
                PageSize:10000000000
            })
            .then(data => {
                this.tableData = data.FObject.Table1
                this.tableData.forEach(item => {
                    item.InspectionTime = item.InspectionTime.replace(/,$/ig,'').split(',')
                    item.InspectionTime = item.InspectionTime.map(obj => {
                       return obj.split('-')
                    })
                });
            })
            .catch(error => {

            })
        },
        /**
         * 查询所有巡检点
         */
        queryPoint(){
            Inspection({
                FAction:'QueryUInspectionPointTree',
                ID:0
            })
            .then(data => {
                this.pointData  = data.FObject
            })
            .catch(error => {
                console.log(error);
            })
        },
        handleCurrentChange(){

        },
        /**
         * 新增或修改巡检路线
         */
        addRoad(){
            if(this.addRoadData.InspectionCycle == 1){
                let arr = this.timeArr.map(item => {
                    return '0-' + item
                })
                this.addRoadData.InspectionTimeStr = arr.join(',')
            }else if(this.addRoadData.InspectionCycle == 2){
                let arr = this.timeArr1.map(item => {
                    let week = this.weekArr.indexOf(item[0]) + 1
                    return week + '-' + item[1]
                })
                 this.addRoadData.InspectionTimeStr = arr.join(',')
            }else if(this.addRoadData.InspectionCycle == 3){
                let arr = this.timeArr2.map(item => {
                    return item.join('-')
                })
                 this.addRoadData.InspectionTimeStr = arr.join(',')
            }
            return new Promise(resolve => {
                Inspection({
                    FAction:this.type?'UpdateUInspectionLineInfo':'AddUInspectionLineInfo',
                    mUInspectionLine:this.addRoadData
                })
                .then(data => {
                    this.queryData()
                    this.show = false
                    this.$message({
                      type: 'success',
                      message: this.type?'修改成功！':'新增成功！'
                    });
                    resolve()
                })
                .catch(error => {

                })
            })
        },
        /**
         * 新增路线
         */
        addNewRoad(){
            this.show = true
            this.type = 0
            this.addRoadData.InspectionLineName = ''
            this.addRoadData.InspectionCycle = 1
            this.addRoadData.ID = ''
            this.timeArr = []
            this.timeArr1 = []
            this.timeArr2 = []
        },
        /**
         * 编辑路线
         * @param {Object} item 巡检路线对象
         * @param {Boolean} show 是否显示编辑弹框
         */
        editRoad(item,show){
            this.show = show
            this.type = 1
            this.addRoadData.InspectionLineName = item.InspectionLineName
            this.addRoadData.InspectionCycle = item.InspectionCycleID
            this.addRoadData.ID = item.ID
            if(item.InspectionCycleID == 1){
                this.timeArr = item.InspectionTime.map(item => {
                    return item[1]
                })
            }else if(item.InspectionCycleID == 2){
                this.timeArr1 = JSON.parse(JSON.stringify(item.InspectionTime))
            }else if(item.InspectionCycleID == 3){
                this.timeArr2 = JSON.parse(JSON.stringify(item.InspectionTime))
            }
        },
        /**
         * 删除巡检路线
         */
        async deleteRoad(item){
            await new Promise(resolve => {
                this.$DeleteMessage([`确定要删除　　${item.InspectionLineName}`,'删除路线'])
                .then(() => {
                    resolve()
                })
                .catch(() => {
                })
            })
            Inspection({
                FAction:'DeleteUInspectionLine',
                ID:item.ID
            })
            .then(data => {
                this.$message({
                  type: 'success',
                  message: '删除成功！'
                });
                this.queryData()
            })
            .catch(error => {

            })
        },
        changeRoad(row){
            this.roadObj = row
            this.defaultChecked = []
            Inspection({
                FAction:'QueryAreaUInspectionPointBySort',
                ID:row.ID
            })
            .then(data => {
                this.points = data.FObject
                this.points.forEach((item, i)=> {
                    item.i = i
                    if(this.points.length === 1){
                        item.index = 3
                    }else if(i === 0 ){
                        item.index = 0
                    }else if(i === this.points.length - 1 ){
                        item.index = 2
                    }else{
                        item.index = 1
                    }
                    item.list.forEach((obj,j) => {
                        obj.father = item.list
                        obj.i = j
                        this.defaultChecked.push(obj.InspectionPointID)
                        if(item.list.length === 1){
                            obj.index = 3
                        }else if(j === 0){
                            obj.index = 0
                        }else if(j === item.list.length - 1 ){
                            obj.index = 2
                        }else{
                            obj.index = 1
                        }
                    })
                })
            })
            .catch(error => {
                console.log('错误',error);
            })
        },
        /**
         * 巡检点选择发生改变
         */
        checkChange(data,check){
            if(data.IsExist == null){
                data.IsExist = '0'
            }
            if(data.IsExist&&check){
                data.IsExist = '1'
            }else if(data.IsExist&&!check){
                data.IsExist = '0'
            }
            this.$refs.transfer.$refs.tree1.filter()
        },
        /**
         * 过滤树形结构
         */
        filterNode(value, data, node){
            return data.IsExist == 1
        },
        resetPoint(){

        },
        /**
         * 点击设置巡检点
         */
        beforeSetPoint(){
            if(this.roadObj){
                this.showPointTree = true
            }else{
                this.$DeleteMessage(['请选择巡检路线','提示信息'],false)
            }
        },
        /**
         * 设置巡检路线
         */
        async setPoint(){
            this.editRoad(this.roadObj,false)
            let arr = []
            let areaArr = []
            // 遍历获取选中的巡检点
            this.pointData.forEach(item => {
                item.list.forEach(obj => {
                    if(obj.IsExist == '1'){
                        arr.push(obj.ID)
                        if(!areaArr.includes(item.AreaID)){
                            areaArr.push(item.AreaID)
                        }
                    }
                })
            })
            this.addRoadData.InspectionPointIDStr = arr.join(',')
            this.addRoadData.AreaIDStr = areaArr.join(',')
            await this.addRoad()
            this.showPointTree = false
            this.changeRoad(this.roadObj)
        },
        /**
         * 改变巡检点或巡检区域顺序
         * @param {Number} type 0: 修改巡检点排序位置 1: 修改区域排序位置
         * @param {Object} startObj 排序时，目标对象
         * @param {Object} endObj 排序时，目标交换对象
         */
        sortRoad(type,startObj,endObj){
            let startIDStr,endIDStr
            if(type === 1){
                let startList = [] , endList = []
                startObj.list.forEach(item => {
                    startList.push(item.UInspectionLinePointID)
                })
                endObj.list.forEach(item => {
                    endList.push(item.UInspectionLinePointID)
                })
                startIDStr = startList.join(',')
                endIDStr = endList.join(',')
            }else{
                startIDStr = startObj.UInspectionLinePointID
                endIDStr = endObj.UInspectionLinePointID                                          
            }
            Inspection({
                FAction:'UpdateUInspectionLineBySortID',
                StartIDStr:startIDStr,
                EndIDStr:endIDStr,
                FType:type
            })
            .then(data => {
                this.changeRoad(this.roadObj)
            })
            .catch(error => {

            })
        },
        /**
         * exportFile 导出
         */
        exportFile(){
            Inspection({
                FAction:'QueryExportUInspectionLineInfo',
                FName:this.roadName,
                StartDateTime:this.startDateTime,
                EndDateTime:this.endDateTime,
                InspectionCycle:this.InspectionCycle
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
        /**
         *日巡检 ，选择时间
         */
        selectTime(){
            if(this.hh == null||this.mm == null){
                this.$message({
                    type:'warning',
                    message:'请选择时间'
                })
                return
            }
            let  hh = this.hh <10?'0'+this.hh:this.hh
            let  mm = this.mm <10?'0'+this.mm:this.mm
            this.timeArr.push(hh+':'+mm)
            this.showPopover = false
        },
        /**
         * 周巡检 ，选择时间
         */
        selectWeek(){
            if(this.week==null||this.hh == null||this.mm == null){
                this.$message({
                    type:'warning',
                    message:'请选择时间'
                })
                return
            }
            let  hh = this.h1 <10?'0'+this.h1:this.h1
            let  mm = this.m1 <10?'0'+this.m1:this.m1
            this.timeArr1.push([this.week,hh+':'+mm])
            this.showPopover = false
        },
        /**
         * 月巡检 ，选择时间
         */
        selectMonth(){
            if(this.month==null||this.hh == null||this.mm == null){
                this.$message({
                    type:'warning',
                    message:'请选择时间'
                })
                return
            }
            let  hh = this.h2 <10?'0'+this.h2:this.h2
            let  mm = this.m2 <10?'0'+this.m2:this.m2
            this.timeArr2.push([this.month,hh+':'+mm])
            this.showPopover = false
        },
        /**
         * 删除时间
         */
        deleteTime(arr,i){
            this[arr].splice(i,1)
        },
        /**
         * 高级搜索弹框选择时间
         */
        searchTime(val){
            this.startDateTime = comm.getFormatTime(val[0]).split(' ')[1].substr(0,5)
            this.endDateTime = comm.getFormatTime(val[1]).split(' ')[1].substr(0,5)
        }
    }
}
</script>
<style lang="scss">
$img-url:'/static/image/';
.road.report{
    background: url('#{$img-url}admin/bg_1.png') center no-repeat;
    .showPointTree{
        .el-dialog{
            width: 560px;
            height: 480px;
        }
    }
    .el-dialog{
        width: 460px;
        height: 380px;
        background: url(#{$img-url}task/inspection.png);
        background-size: 100% 100%;
        padding-left: 48px;
        &__header{
            text-align: left
        }
        li{
            margin-top: 15px;
            .zw-btn{
                height: 40px;
                line-height: 40px;
                background:rgba(0,80,153,1);
            }
        }
        .label{
            width: 85px;
            display: inline-block;
            text-align: right
        }
        .el-input{
            width: 165px;
            height: 39px;
            line-height: 39px;
            margin-left: 10px;
            &__inner{
                background:rgba(24,64,107,1);
                border:1px solid rgba(5,103,158,1);
            }
        }
        .date-select{
            display: inline-block;
            width:204px;
            height: 39px;
            line-height: 39px;
            margin-left: 10px;
            background:rgba(24,64,107,1);
            border:1px solid rgba(5,103,158,1);
            padding-left: 4px;
            padding-right: 20px;
            >span{
                position: relative;
                left: 208px;
            }
            .time-content{
                position: absolute;
                width: 204px;
                height: 39px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                li{
                    position: relative;
                    margin-right: 20px;
                    display: inline-block;
                    .el-icon-circle-close-outline{
                        width: 14px;
                        height: 14px;
                        position: absolute;
                        cursor: pointer;
                    }
                }
            }
        }
        .tree-content{
            width: 240px;
            position: relative;
            margin-right: 20px;
            margin-top: 16px;
            .arrow {
                display: inline-block;
                width: 22px;
                height: 16px;
                position: absolute;
                top: 10px;
                left: 14px;
                background: url("#{$img-url}admin/icon_1.png");
            }
            .zw-tree{
                float: right
            }
        }
        .zw-btn{
            background: #12559D;
        }
    }
    .road-head{
        position: relative;
        li.r{
            .el-button.el-button--primary{
                width:94px;
                height:46px;
                margin-left: 10px;
                background:#042E74;
                border:1px solid rgba(12,55,110,1);
                padding-left: 4px;
                .el-icon--right{
                    color: #2A91FC
                }
            }
        }
        .search-box{
            width: 1436px;
            height: 95px;
            line-height: 95px;
            box-sizing: border-box;
            position: absolute;
            top: 65px;
            left: 10px;
            z-index: 100;
            background: #005099;
            border:1px solid rgba(13, 97, 156, 1);
            li{
                margin-left: 97px;
                .el-input{
                    width:209px;
                    height:46px;
                    &__inner{
                        width:209px;
                        margin-left: 10px;
                        color: #F1F1F2;
                        background:#042E74;
                        border:1px solid rgba(12,55,110,1);
                    }
                }
                .el-date-editor .el-range-separator{
                     color: #F1F1F2;
                }
                .el-range-input{
                    color: #F1F1F2;
                    background:#042E74;
                }
                button{
                    margin-left: 60px;
                    background: #12559D
                }
                button:last-of-type{
                    margin-left: 39px;
                }
            }
            li:first-of-type{
                margin-left: 32px;
            }
        }
    }
    .el-icon-circle-plus-outline{
        cursor: pointer;
        background:rgba(24,64,107,1);
    }
    .road-table{
        height: 300px;
/*         .el-table{
            max-height: 300px;
        } */
    }
    .point-info{
        margin-top: 80px;
        text-align: left;
        .point{
            width: 137px;
            height: 46px;
            background: url(#{$img-url}task/t1.png)
        }
        .set-point{
            width: 132px;
            height: 46px;
            margin-left: 20px;
            padding-left: 26px;
            background: url(#{$img-url}task/setPoint-1.png);
        }
        .set-point:hover,.set-point:active{
            background: url(#{$img-url}task/setPoint-2.png);
        }
    }
    .tree-table{
        &-header{
            width: 100%;
            height: 64px;
            line-height: 64px;
            background: #03234A;
            li{
                width:15%;
                font-size: 17px;
                text-align: center;
            }
        }
        &-body.el-tree{
            max-height: 264px;
            background: none;
            .el-tree-node:focus>.el-tree-node__content {
                background:rgba(19,79,164,1);
                opacity:0.5;
            }
            .el-tree-node__content:hover {
                background:rgba(19,79,164,1);
                opacity:0.5;
            }
            .el-tree-node__content{
                height: 60px;
                line-height: 60px;
                color: white;
                border-bottom: 1px solid rgba(13, 97, 156, 1);;
            }
            .el-tree-node__content:nth-of-type(2n){
                background: #053077
            }
            .tree-row{
                height: 60px;
                font-size: 14px;
                width: 1462px;
                margin-left: -24px;
                li{
                    width:15%;
                    height: 60px;
                    text-align: center
                }
            }
            .sort{
                display: inline-block;
                width: 22px;
                height: 26px;
                margin-right: 30px;
            }
            .sort-up{
                background: url(#{$img-url}task/button_up.png);
            }
            .sort-down{
                background: url(#{$img-url}task/button_down.png);
            }
        }
    }
}
// 时间选择popover
.el-popover.select-time-popover{
    width: 150px!important;
    padding: 0;
    border-radius: 0px;
}
.el-popover.select-week-popover{
    width: 296px!important;
    padding: 0;
    border-radius: 0px;
    background: none;
    .week-select{
        width: 97px;
        height: 100px;
        text-align: center;
        background: #ffffff;
        li{
            height: 31px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            background: #ffffff;
        }
        li.active{
            background: #2194FF
        }
    }
}
.time-title{
   height: 30px;
   line-height: 30px;
   text-align: center;
   font-size: 14px;
   color: #525E7E;
   background: #DEDBDB
}
.time-select-main{
    width: 50%;
    background: #ffffff;
}
.time-select{
    height: 90px;
    margin-right: 2px;
    .active{
        background: #2194FF
    }
    li{
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
}
.time-select-footer{
    text-align: right;
    height: 30px;
    line-height: 30px;
    background: #DEDBDB;
    a{
        padding: 10px;
        cursor: pointer;
    }
    a:last-of-type{
        color: #409EFF
    }
}
</style>

