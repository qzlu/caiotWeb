<template>
  <div class="detail">
    <!--{{$route.params.id}} //设备id ,则是DeviceID
 	{{$route.params.PossionID}}
 	后端要求带第一个小分类的默认第一个分类的PossionID，设备自己的id,还有当前设备的所有数据，都带过来
    -->
    <!--<router-link :to="{ name: 'foreshow',}">
	   <p>121313</p>
    </router-link>-->
    <div class="det_top" v-if="datalist02.DeviceTypeID==801||datalist02.DeviceTypeID==800">
      <p class="btn_back" @click="routerback()">
        <img src="static/image/index/back_btn.png">返回
      </p>
      <div class="video-container" id="innerVideo">
        <video
          v-if="video_div"
          id="my-video"
          class="video-js vjs-big-play-centered"
          controls
          preload="auto"
          poster="/static/image/index/video_start.jpg"
        >
          <source :src="videoUrl" type="application/x-mpegURL">
        </video>
      </div>
      <section class="info">
        <div class="gh_line" style="height: 25px;"></div>
        <div class="mains">
          <!--组件2 基本信息及资料-->
          <table_data @ready="getInfo"></table_data>
          <!--组件2-->
        </div>
      </section>
    </div>
    <div v-else-if="datalist02.DeviceTypeID==100005">
      <div class="iframe-container">
        <p class="btn_back" @click="routerback()">
          <img src="static/image/index/back_btn.png">返回
        </p>
        <iframe src=" https://www.daantc.com:8443/cas/autoLogin?token=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblVzZXIiOiJqaWFuZ2dvbmcxIiwibG9naW5Qc3N3b3JkIjoiamc1MTg4In0.Qi2ETx3m-wgBIJmdsDa8Our_MrKWBSMRpmZ5w8Dk3dg&se&service=https://www.daantc.com:8444/elevator-monitor/shiro-cas" frameborder="0"></iframe>
      </div>
    </div>
    <div v-else>
      <section class="det_top">
        <p class="btn_back" @click="routerback()">
          <img src="static/image/index/back_btn.png">返回
        </p>
        <div class="det_ghyi">
          <div class="det_left">
            <ul>
              <li>
                <div class="inner_bg_sh">
                  <div class="a1">
                    <div class="jg">
                      <p class="t" :title="datalist02.DeviceName">
                        {{datalist02.DeviceName}}
                        <!--1#变压器-->
                      </p>
                    </div>
                    <div v-for="(c,key) in datalist02.DataDetail" :class="setclass(c.SDataID)">
                      <p class="gre">
                        <i
                          v-for="(df,key) in c.SDataValue"
                          :data="df.DStatus"
                          @click="click_show_line(c.SDataID)"
                        >{{(datalist02.DeviceTypeID==1003&&c.SDataID==1) ? (df.DValue>0?'上行':(df.FValue == 0 ? '停止': '下行')) : df.DValue}}{{key!==c.SDataValue.length-1?'/':''}}</i>
                      </p>
                      <p class="grd">
                        {{c.SDataTitle}} ({{c.SDataUnit}})
                        <!--三相线电压(V)-->
                      </p>
                      <p class="line"></p>
                    </div>
                    <!--<p class="gre">456/526/455</p>
                    <p class="grd">三相线电流(A)</p>-->
                  </div>

                  <div class="a2">
                    <div>
                      <p>
                        <i
                          class="icon iconfont"
                          :class="datalist02.WebIconName"
                          :data="datalist02.DeviceStatus"
                          style="font-size: 50px;"
                        ></i>
                      </p>
                      <p class="tx">
                        <i
                          class="icon iconfont"
                          :data="datalist02.DeviceStatus"
                        >{{datalist02.DeviceStatusTitle}}</i>
                        <!--合闸-->
                      </p>
                    </div>
                  </div>

                  <!--<div class="lrn r">
	 		  		<p class="gre">0.96</p>
	 		  		<p class="grd">功率因数(V)</p>	
	 		  		<p class="gre">456/526/455</p>
	 		  		<p class="grd">绕组温度(℃）</p>	 		  		
	 		  		<p class="gre">456/526/455</p>
	 		  		<p class="grd">视在功率(KVA)</p>
	 		  			 		  			
                  </div>-->
                </div>
              </li>
            </ul>
          </div>

          <div class="det_rightItem">
            <div
              class="det_titles"
              style="width: 110px; height: 165px; padding: 25px 0 0 20px; float: left; font-size: 18px; color: #F1F2F2;"
            >实时监测</div>
            <div
              class="show_acr_c"
              style="width: 900px; height: 185px; float: left; color: #fff; margin-top: 19px;"
              id="container_vn"
            >
              <line-chart :data="linedata" :color='["#FF3600", "#00D1D9", "#FF7300"]'></line-chart>
            </div>
          </div>
        </div>
      </section>
      <section class="det_itemList">
        <div class="gh_line" style="height: 25px;"></div>
        <div class="mains">
          <!--组件1 大事记-->
          <my-imgdata :data="dl_datalist"></my-imgdata>
          <!--组件1-->
          <!--组件2 基本信息及资料-->
          <table_data @ready="getInfo"></table_data>
          <!--组件2-->
        </div>
      </section>
    </div>
  </div>
</template>
<style>
 .btn_back {
  cursor: pointer;
  z-index: 118;
  position: absolute;
  top: -30px;
  border-radius: 5px;
  left: 10px;
  width: 68px;
  text-align: center;
  height: 30px;
  opacity: 0.5;
  color: #c2ddff;
  background: #4379cd;
  font-size: 20px;
}
 .btn_back img {
  vertical-align: 2px;
}
/*滚动条样式*/

.mains::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.mains::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #4472c7;
}
.mains::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #fff;
}
</style>
<script>
import videojs from "video.js";
// import 'videojs-contrib-hls'
import * as comm from "../../assets/js/pro_common";
import img_data from "./d_l_a.vue"; //中间图片
import table_data from "./d_l_b.vue"; //列表组件
var echarts = require("echarts");
import {project} from '@/request/api';
import {lineChart} from '@/zw-components/index';
export default {
  data() {
    return {
      datalist: [], //静态数据
      datalist02: this.$route.params.getalldata, //点击进来当前设备详情，左1
      linedata: {}, //图表线条数据
      video_div: false,
      dl_datalist: [], //大事件数据
      videoUrl:
        "http://hls.open.ys7.com/openlive/669cf1ba63a34653a1c358b17ceea2b6.m3u8"
    };
  },
  created() {
    //   console.log(this.$route.params.getalldata)

    /*避免用户刷新无数据，写入本地存储*/
    //localStorage.setItem("data_link",this.$route.params.getalldata);
    //如果用户刷新，就从localStorage的取数据
    var urls = this.$route.params.getalldata;
    var isok = urls.DeviceID;
    if (isok) {
      localStorage.setItem("dataing", JSON.stringify(urls));
    } else {
      var d = localStorage.getItem("dataing");
      this.datalist02 = JSON.parse(d);
      //console.log(d)
    }
    /*避免用户刷新无数据，写入本地存储*/

    var data = [
      {
        id: "0",
        title: "供配电0",
        name: "设备总数",
        num: "1000",
        a1: "22",
        a2: "12",
        list: [
          { value: 80, name: "运行" },
          { value: 15, name: "停止" },
          { value: 5, name: "故障" }
        ]
      }
      /*{id:"1",title:"告警总况",name:"及时恢复",num:"500",list:[{value:80, name:'已恢复'},{value:20, name:'未恢复'}]},		*/
    ];
    this.datalist = data;
    this.getDeviceMemorabilia()
  },
  methods: {
    setclass(x) {
      return "pui_" + x;
    },
    routerback() {
      this.$router.back(-1);
    },
    /**
     * 获取大事件数据
     */
    getDeviceMemorabilia(){
        project({
          FAction: "GetDeviceMemorabilia",
          DeviceID: this.$route.params.id //产品自己id
        })
        .then(data => {
          this.dl_datalist = data.FObject
        })
        .catch(err => {
        })
    },
    /**
     * 格式化折线图数据
     */
    formatChartData(arr){
      let chartData = {
          name:[],
          columns:[],
          rows:{}
      }
      chartData.name = arr.map(item => item.DataItemName)
      chartData.columns = arr[0].ProjectChartLineDatas.map(item => item.X)
      chartData.rows = arr.map(item => {
          let yAxis = item.ProjectChartLineDatas.map(obj => obj.Y)
          return {
            type: "line",
            name: item.DataItemName,
            data: yAxis
          };
      })
      return chartData
    },
    opens_video(urls) {
      //播放视频地址
      if (urls) {
        /* var obj=`<video id='my-video'  class='video-js vjs-big-play-centered' controls preload='auto' poster='/static/image/index/video_start.jpg'>
			 <source src=${urls} type='application/x-mpegURL'></video>` */
        // obj=obj.replace("adress_src",urls)
        videojs(
          "my-video",
          {
            bigPlayButton: false,
            textTrackDisplay: false,
            posterImage: true,
            errorDisplay: false,
            controlBar: true,
            height: 520,
            width: 1540,
            loop: true
          },
          function() {
            this.play();
          }
        );
      } else {
        videojs("my-video", {}, function() {
          this.dispose();
        });
        this.video_div = false;
      }
    },
    getInfo(info) {
      if (
        this.datalist02.DeviceTypeID == 801 ||
        this.datalist02.DeviceTypeID == 800
      ) {
        console.log(info)
        this.videoUrl = info && info.ExtendAddress;
        if (!this.videoUrl) return;
        this.video_div = true;
        this.$nextTick(() => {
          this.opens_video(this.videoUrl);
        });
      }
    },
    click_show_line(x) {
			project({
				FAction: "GetDeviceDataItemChartData",
        DeviceID: this.$route.params.id, //产品自己id
        PossionID: x //_this.$route.params.PossionID默认第一个（三相电压id）
			})
			.then(data => {
        console.log(data)
        this.linedata = this.formatChartData(data.FObject);
        //this.line_data_reset();
			})
			.catch(err => {})
    },

    line_data_reset() {
      //重新组装线条图形表

      //console.log(this.linedata)
      let d = this.linedata;
      let arr_name = [],
        x_arr = [],
        y_arr = [];
      arr_name = d.map(item => item.DataItemName);
      let ggg = d[0].ProjectChartLineDatas; //x轴是一样的，把第一个X轴的数据写入数组
      x_arr = ggg.map(item => item.X);
      /*组装成line图表相应的格式数据*/
      y_arr = d.map(item => {
        let data = item.ProjectChartLineDatas.map(obj => {
          return  obj.Y
        });
        return {
          type: "line",
          name: item.DataItemName,
          data: data
        };
      });
      //arr_name名称，x_arr为x轴上的数据，每条都一样，y_arr为y轴数据
      this.line_chart(arr_name, x_arr, y_arr);
    },

    /*动态数据pie*/

    Pro() {
      let _this = this;
			//返回一个Promise对象
      return new Promise(function(resolve, reject) {
        _this.$axios
          .post("Project", {
            FTokenID: localStorage.getItem("Token"),
            FAction: "GetDeviceDataItemChartData",
            FVersion: "1.0.0",
            ProjectID: localStorage.getItem("projectid"),
            DeviceID: _this.$route.params.id, //产品自己id
            PossionID: _this.$route.params.PossionID //默认第一个（三相电压id）
          })
          .then(function(jsons) {
            //console.log(jsons.data.FObject)
            comm.messageErr(jsons.data.Result); //公共状态提示
            _this.linedata = _this.formatChartData(jsons.data.FObject);

            if (jsons) {
              resolve("succ");
            }
          })
          .catch(function(err) {});
      });
    },
    Pro2() {
      let _this = this;
      //返回一个Promise对象
      return new Promise(function(resolve, reject) {
        // _this.line_data_reset();

        /*给所有图动态加色*/
        var doc_all = document.getElementsByTagName("i");

        for (var gg = 0; gg < doc_all.length; gg++) {
          if (doc_all[gg].getAttribute("data")) {
            var hg = Number(doc_all[gg].getAttribute("data"));
            var ggg = comm.resetColor(hg);
            doc_all[gg].style.color = ggg;
          }
        }
        /*给所有图动态加色*/

        resolve("succ");
      });
    },

    line_chart(name, x, ydatas) {
      //生成line 坐标图
      //console.log(x)
      var dom = document.getElementById("container_vn");
      var myChart = echarts.init(dom);
      var app = {};
      var option = null;
      option = {
        title: {
          // text: '折线图堆叠'
        },
        tooltip: {
          trigger: "axis"
        },
        textStyle: {
          fontWeight: "normal", //标题颜色
          color: "#fff"
        },
        legend: {
          // data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎'],
          data: name,
          // itemWidth: 0,
          //itemHeight: 0,
          textStyle: {
            fontWeight: "normal", //标题颜色
            color: "#fff"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            //y轴色
            lineStyle: {
              color: "#7f7f7f",
              width: 1
            }
          },
          data: x
        },
        yAxis: {
          type: "value",
          splitLine: { show: false }, //去除网格线
          axisLine: {
            //y轴色
            lineStyle: {
              color: "#7f7f7f",
              width: 1
            }
          }
        },
        series: ydatas,
        color: ["#FF3600", "#00D1D9", "#FF7300"]
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    }
  },
  components: { "my-imgdata": img_data, table_data ,lineChart},
  mounted: function() {
    let _this = this;
    function settimeouts_detil_info_list() {
      _this
        .Pro()
        .then(function(d) {
          return _this.Pro2(d);
        })
        .then(function() {
          /* 去除最后一条"/" */
          var doc_gh = document.querySelectorAll(".gre");
          for (let j of doc_gh) {
            let ab = j.children,
              len = j.children.length;
            if (len) {
              ab[len - 1].innerHTML = ab[len - 1].innerHTML.replace("/", "");
              //console.log(ab[len-1].innerHTML)
            }
          }
          /* end of 去除最后一条"/" */
        })
        .catch(function(err) {});

      let timeoutId_detal_info_list = setTimeout(
        settimeouts_detil_info_list,
        24000
      );
      let router_currt = _this.$route.name;
      if (router_currt != "detail_info_list") {
        clearTimeout(timeoutId_detal_info_list);
      }
    }
    settimeouts_detil_info_list();
  },
  destroyed() {
    if (this.video_div) {
      this.opens_video();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

a {
  color: #42b983;
}

.det_top {
  height: 227px;
  position: relative;
}

.det_top .det_left {
  position: relative;
  margin-top: -6px;
  width: 456px;
  height: 230px;
  float: left;
  background: url(/static/image/indexdetail/bg_blue.png) no-repeat;
}
/*.det_top .det_left:hover {background: url(/static/image/indexdetail/bg_red_1.png) no-repeat;}*/
.det_top .det_left .dtitle {
  height: 20px;
  width: 130px;
  margin: 0 auto;
  padding: 3px 0;
  overflow: hidden;
  font-size: 16px;
  color: #f1f1f2;
}
.det_top .det_left .dmes {
  height: 25px;
  font-size: 15px;
  padding: 10px 15px;
}
.det_top .det_left .dmes img {
  vertical-align: -2px;
}
.det_top .det_left .dmes img.dc {
  vertical-align: -5px;
  width: 18px;
  height: 18px;
}
.det_top .det_left .dmes img.da {
  vertical-align: -6px;
  width: 18px;
  height: 18px;
}
.det_top .det_left .dmes img.db {
  vertical-align: -3px;
  width: 18px;
  height: 18px;
}

.det_top .det_left .dt_kgs {
  width: 92px;
  height: 108px;
  float: left;
  padding: 0 15px 0 20px;
}
.det_top .det_left .dt_kgs > div {
  padding: 0 0 70px 0;
}
.det_top .det_left .dt_kgs > div p {
  width: 50%;
  float: left;
  font-size: 15px;
  color: #737373;
}
.det_top .det_left .dt_kgs > div p.n {
  color: #03cd82;
  font-size: 25px;
}

.det_top .det_left .ge_pelin {
  position: absolute;
  top: 117px;
  left: 170px;
}

.det_top .det_left .de_arc_li {
  width: 310px;
  height: 148px;
  margin-top: -8px;
  float: left;
  background: url(/static/image/index/leftbar_bg_circle.png) no-repeat;
}
.det_top .det_left .de_numli {
  width: 115px;
  height: 120px;
  position: absolute;
  top: 97px;
  right: 10px;
}
.det_top .det_left .de_numli p {
  line-height: 27px;
  font-size: 20px;
}
.det_top .det_left .de_two {
  top: 111px;
  right: -1px;
}

.det_top .det_rightItem {
  width: 1086px;
  height: 227px;
  margin: -5px 15px 0 0;
  background: url(/static/image/indexdetail/bg_blue_2.png) no-repeat;
  float: right;
}
.det_top .det_rightItem .det_titles {
  float: left;
}
.det_top .det_rightItem .show_acr_c {
}

.detail .det_itemList {
  width: 1559px;
  height: 690px;
  background: url(/static/image/indexdetail/content_fg_1.png);
}
.detail .det_itemList .mains {
  padding: 0 5px 0 20px;
  margin-right: 5px;
  height: 600px;
  overflow: hidden;
}
.detail .det_tlg {
  /*padding: 25px 16px 0 20px;*/
  overflow: hidden;
}
.detail .pjngh {
  padding: 2px 16px 0 20px;
}

.det_left ul li {
  padding: 15px 25px 5px 25px;
  height: 194px;
}
.det_left ul li.err .inner_bg_sh {
  width: 100%;
  height: 194px;
  background: url(/static/image/indexdetail/content_bg_2.png) 0px 0 no-repeat;
}
.det_left ul li .a1 {
  position: relative;
  width: 148px;
  height: 175px;
  float: left;
  padding: 0px 0 0 10px;
  text-align: left;
}

.det_left ul li .a1 .pui_1 {
  position: absolute;
  top: 41px;
  left: 0;
  width: 140px;
}
.det_left ul li .a1 .pui_2 {
  position: absolute;
  top: 88px;
  left: 0;
  width: 140px;
}
.det_left ul li .a1 .pui_3 {
  position: absolute;
  top: 135px;
  left: 0;
  width: 140px;
}
.det_left ul li .a1 .pui_4 {
  position: absolute;
  top: 41px;
  right: -265px;
  width: 140px;
}
.det_left ul li .a1 .pui_5 {
  position: absolute;
  top: 88px;
  right: -265px;
  width: 140px;
}
.det_left ul li .a1 .pui_6 {
  position: absolute;
  top: 135px;
  right: -265px;
  width: 140px;
}
.det_left ul li .a1 .pui_7 {
  position: absolute;
  top: 135px;
  right: -144px;
  width: 140px;
}

.det_left ul li .a1 .jg {
  position: relative;
  height: 35px;
}
.det_left ul li .a1 .jg .t {
  position: absolute;
  top: 0px;
  left: -12px;
  height: 35px;
  width: 205px;
  font-size: 20px;
  color: #525e7e;
  white-space: nowrap;
}
.det_left ul li .a1 .gre {
  color: #03cd82;
  font-size: 17px;
  padding: 1px 0;
}
.det_left ul li .a1 .grd {
  font-size: 13px;
  color: #737373;
}
.det_left ul li .a1 .line {
  height: 5px;
}

.det_left ul li .a2 {
  width: 96px;
  height: 175px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.det_left ul li .a2 p {
  width: 100%;
}
.det_left ul li .a2 p.tx {
  font-size: 16px;
  color: #03cd82;
}
.det_left ul li.err .a2 p.tx {
  font-size: 16px;
  color: #d62445;
}
.det_left ul li .a2 p.p1 {
  color: #525e7e;
}
.det_left ul li .a2 p.p2 {
  color: #d62445;
}
.det_left ul li .lrn {
  width: 116px;
  margin: 15px 15px 0 0;
}

.det_left ul li .lrn .gre {
  color: #03cd82;
  font-size: 17px;
  padding: 7px 0;
}
.det_left ul li .lrn .grd {
  font-size: 13px;
  color: #737373;
}
.det_left ul li .lrn .line {
  height: 18px;
}
.video-container {
  width: 1562px;
  height: 546px;
  box-sizing: border-box;
  background: url("/static/image/indexdetail/video_bg.png") center no-repeat;
  padding-top: 14px;
  /* 
	  border:5px solid #004876;
	  border-radius:6px; */
}
.video-container #my-video {
  width: 1540px !important;
  height: 520px !important;
  margin: auto;
}
.info {
  width: 1563px;
  height: 359px;
  margin-top: 33px;
  background: url("/static/image/indexdetail/info_bg.png") center no-repeat;
}
.info .table_bh {
  padding: 0px 50px 5px 50px;
}
.iframe-container{
  position: relative;
}
.iframe-container iframe{
  width: 100%;
  height: 900px;
}
</style>
