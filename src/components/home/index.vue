<template>
  <div class="home">
    <audio class="success" id="music" loop="loop" src="/static/mp3/new_warn.mp3"></audio>
    <div class="homme_center">
      <div class="header_item" v-if="inIframe != 1">
        <div class="list_a">
          <!--  notice-->
          <section class="notice_items" :class="addclass" id="tuhn_pin">
            <p style="margin-top: 2px;">
              <span>
                <img src="/static/image/index/nav_red_a.png" class="up_di" />
              </span>
              <span id="gh_warn_gh"></span>
              <img
                src="/static/image/index/warn45.png"
                :class="{'active01':is_li==1}"
                @click="play_warn_hg('stop')"
                class="prngy r ingb_gh_a"
                style="margin: 5px 10px 0 0;"
              />
              <img
                src="/static/image/index/wrb02.png"
                :class="{'active01':is_li==0}"
                @click="play_warn_hg('play')"
                class="prngy r ingb_gh_b"
                style="margin: 2px 10px 0 0;"
              />
              <span
                style="font-size: 14px; float: right; margin: 0px 10px 0 0;"
              >{{datalist.length}}条告警</span> &nbsp;&nbsp;
            </p>
            <div class="er_message" id="tuhn_tnh">
              <div class="errMessage_list">
                <div class="cc rowup" id="pin_wanr">
                  <div class="item" v-for="(items,key) in datalist" :key="key">
                    <router-link :to="{name:'now_count'}">
                      <div style="color:white">
                        <p class="l">{{items.AlarmText}}</p>
                        <p class="r">{{items.AlarmTime}}</p>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!--  notice-->
          <!--一级菜单-->
          <nav-item></nav-item>
          <!--end of 一级菜单-->
        </div>
        <div class="list_b">
          <div class="in"></div>
          <div class="name_select" style="right:80px;">
            <p>
              <span>{{curr_selectdata && curr_selectdata.ShortName}}</span>
              <span v-if="selecdata.length>1" style="padding: 11px 5px 0 0; float: right;">
                <img src="/static/image/index/nav_user_button_nor.png" class="sh01" />
              </span>
            </p>
            <div class="list_sel" v-if="selecdata.length>1">
              <p v-for="(item,key) in selecdata" :key="key" @click="ccName(item)">{{item.ShortName}}</p>
            </div>
          </div>
        </div>
        <div class="list_c" v-if="inIframe != 1">
          <div class="inl">
            <p class="u">
              <img src="/static/image/index/nav_user_icon_1.png " />
            </p>
            <div class="ise">
              <div class="name_select admincc">
                <p>
                  <span>{{curr_selectdata02}}</span>
                  <span style="padding: 11px 5px 0 0; float: right;">
                    <img src="/static/image/index/nav_user_button_nor.png" class="sh01" />
                  </span>
                </p>
                <div class="list_sel" style="top: 62px;">
                  <!-- <p v-for="(item,key) in seledata02" @click="ccName_item(item)">{{item}}</p> -->
                  <p @click="beforeUpdatedPassword()">
                    <i class="iconfont icon-Lock" style="font-size:24px;margin-right:10px"></i>修改密码
                  </p>
                  <p @click="all_out()">
                    <i class="iconfont icon-Exit" style="font-size:24px;margin-right:10px"></i>退出系统
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <el-dialog title="修改密码" :visible.sync="show" class="change-password zw-dialog">
      <el-form :model="changePassWord" ref="form">
        <el-form-item label="账号" prop="InspectionPointName">
          <el-input :value="seledata02[0]" readonly></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="FPassword" :rules="[{ required: true, message: '请输入旧密码'}]">
          <el-input v-model="changePassWord.FPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="FNewPassword"
          :rules="[{ required: true, message: '请输入新密码'}]"
        >
          <el-input v-model="changePassWord.FNewPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="repeatPassword"
          :rules="[{ required: true, message: '请确认密码'}]"
        >
          <el-input v-model="changePassWord.repeatPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="submit">
        <button class="zw-btn zw-btn-primary" @click="updatedPassword()">确定</button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
</style>
<script>
import * as comm from "../../assets/js/pro_common";
import navItem from "./nav.vue"; //中间图片
import { project, system } from "@/request/api";
var sta = 0; //控制报警声，第一次响，关闭后，数据更新，再也不会自动报警。
export default {
  data() {
    return {
      is_li: 0, //控制报警声音参数
      /* selecdata: [], //["新都会","云平台","新都会","云平台","新都会","云平台"], */
      curr_selectdata: "", //"新都会",
      seledata02: [localStorage.getItem("iuserName")], //["admin","user","新都会","云平台","新都会","云平台"],
      curr_selectdata02: localStorage.getItem("iuserName"),
      datalist: "", //告警数据列表
      addclass: "",
      show: false,
      inIframe: localStorage.getItem("inIframe"), //是否是iframe调用
      changePassWord: {
        FPassword: null,
        FNewPassword: null,
        repeatPassword: null
      }
    };
  },
  computed: {
    selecdata() {
      let projectID = localStorage.getItem("projectid");
      if (projectID > 0 && this.inIframe == 1) {
        let projectList = this.$store.state.projectList.filter(
          item => item.ProjectID == projectID
        );
        this.curr_selectdata = projectList[0];
        return projectList;
      } else {
        this.curr_selectdata = this.$store.state.projectList.find(
          item => item.ProjectID == projectID
        );
        return this.$store.state.projectList;
      }
    }
  },
  beforeCreate() {
  },
  created() {},
  methods: {
    all_out() {
      //退出按钮
      localStorage.setItem("Token", "");
      localStorage.setItem("iuserName", "");
      localStorage.setItem("projectid", "");
      localStorage.setItem("projectname", "");
      localStorage.setItem("refresh", 1); //用户退出时，刷新登录页面，避免项目定时器ajax继续执行
      this.$router.push({ path: "/login" });
    },
    getNowFormatDate() {
      //处理时间2018-10-15 例如
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },

    play_warn_hg(x) {
      //console.log(x)
      var eles = document.getElementById("tuhn_pin");
      var e = eles.className.indexOf("notice_green");
      if (e == -1) {
        var audio = document.getElementById("music");
        if (x == "play") {
          this.is_li = 0;
          audio.play();
        } else if ("stop") {
          this.is_li = 1;
          audio.pause();
        }
      }
    },

    ccName(obj) {
      //设置用户切换的项目id,刷新，跳转回首页
      localStorage.setItem("projectid", obj.ProjectID);
      localStorage.setItem("projectname", obj.ShortName);
      this.curr_selectdata = obj;
      let url = location.href
      location.reload();
      // this.$router.push({ path: "/" });
    },
    ccName_item(x) {
      this.curr_selectdata02 = x;
    },

    Pro(gettime) {
      //console.log(gettime)
      //红色警告消息列表
      //返回一个Promise对象
      return new Promise((resove, reject) => {
        project({
          FAction: "GetAlarmRealData",
          ProjectID: localStorage.getItem("projectid"),
          FDateTime: gettime
        })
          .then(data => {
            this.datalist = data.FObject;
            if (this.is_li == 0) {
              //开始只响一次，第二次刷新数据也不会响
              if (data.FObject && data.FObject.length > 0) {
                this.play_warn_hg("play");
              }
            }
            if (data) {
              this.datalist = data.FObject;
              resolve("succ");
            }
          })
          .catch(error => {});
      });
    },

    Pro2() {
      let _this = this;
      //返回一个Promise对象
      return new Promise(function(resolve, reject) {});
    },
    beforeUpdatedPassword() {
      this.show = true;
      Object.keys(this.changePassWord).forEach(item => {
        this.changePassWord[item] = null;
      });
    },
    async updatedPassword() {
      await new Promise(resolve => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve();
          }
        });
      });
      if (
        this.changePassWord.FNewPassword !== this.changePassWord.repeatPassword
      ) {
        this.$message({
          type: "warning",
          message: "重复密码不一致",
          druration: 1000
        });
        return;
      }
      system({
        FAction: "UpdateTUsersPassword",
        FPassword: this.changePassWord.FPassword,
        FNewPassword: this.changePassWord.FNewPassword,
        FType: 3
      })
        .then(data => {
          this.show = false;
          this.$message({
            type: "success",
            message: "密码修改成功,3秒后退出登录",
            druration: 1000
          });
          setTimeout(() => {
            this.all_out();
          }, 3000);
        })
        .catch(err => {});
    }
  },
  mounted: function() {
    var curr_time = this.getNowFormatDate();
    let _this = this;
    function  settimeouts_warn() {
      var html_tem = document.getElementById("pin_wanr");
      var chen = html_tem.children;
      if (chen) var len = chen.length;
      if (len) {
        _this.addclass = "";
      } else {
        setTimeout(function() {
          _this.addclass = "notice_green";
        }, 100);
      }
      _this
        .Pro(curr_time)
        .then(function(d) {
          return _this.Pro2(d);
        })
        .then(function() {})
        .catch(function(err) {});

      let timeoutId = setTimeout(settimeouts_warn, 2000);
    }

    settimeouts_warn();
    this.$store.commit("getProject");
  },
  components: { navItem }
};
</script>
<style lang="scss">
$img-url: "/static/image/";
.change-password {
  .el-dialog {
    width: 426px;
    // height: 367px;
    background: url(#{$img-url}task/inspection.png);
    background-size: 100% 100%;
    padding-left: 48px !important;
    &__header {
      text-align: left;
    }
    .el-form {
      &-item {
        .el-form-item__label {
          width: 94px;
          color: #f1f1f2;
        }
        .el-input {
          width: 165px;
          .el-input__inner {
            background: #05679e;
            border-color: #18406b;
            color: #f1f1f2;
          }
        }
        &__error {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active01 {
  display: none;
}
.home .notice_items {
  position: absolute;
  top: 100px;
  left: 730px;
  width: 413px;
  height: 23px;
  z-index: 120;
  background: #8e1615;
  cursor: pointer;
}
.home .notice_items:hover .er_message {
  height: 115px;
}
.home .notice_items .up_di {
  transition: All 0.14s ease-in-out;
  -webkit-transition: All 0.14s ease-in-out;
  -moz-transition: All 0.14s ease-in-out;
}
.home .notice_items:hover .up_di {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
}

.home .notice_items p span {
  color: #fff;
}
.home .er_message {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px; /*border-top: solid 1px #c62625;*/
  position: absolute;
  top: 23px;
  left: 0;
  right: 0;
  width: 413px;
  height: 0;
  overflow: hidden;
  background: #a91718;
  transition: All 0.14s ease-in-out;
  -webkit-transition: All 0.14s ease-in-out;
  -moz-transition: All 0.14s ease-in-out;
}
.home .list_a .notice_items dl dd {
  width: 100%;
  font-size: 16px;
  line-height: 30px;
  border-bottom: dashed 1px #c62625;
}
.home .list_a .notice_items dl dd:hover {
  background: #951313;
}

.home .name_select {
  position: absolute;
  width: 160px;
  height: 63px;
  top: 35px;
  right: 40px;
  z-index: 120;
}
.home .name_select p {
  font-size: 23px;
}
.home .name_select p span {
  float: left;
}
.home .name_select p img {
  float: right;
}
.home .name_select:hover .list_sel {
  display: block;
}
.home .name_select .sh01 {
  -webkit-transition: 0.3s;
  transition: 0.3s;
}
.home .name_select:hover .sh01 {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
}
.home .name_select .list_sel {
  position: absolute;
  width: 160px;
  overflow: hidden;
  top: 54px;
  right: 0;
  background: #082f5a;
  display: none;
}
.home .name_select .list_sel p {
  padding: 5px 0 5px 0;
  font-size: 20px;
  color: #6ea0ee;
}
.home .name_select .list_sel p:hover {
  color: #fff;
  background: #365a96;
  cursor: pointer;
}

.home .admincc {
  width: 120px;
  top: 40px;
}

.home .notice_green {
  overflow: hidden;
  background: #02961a;
}

.home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #031432;
}
.header_item {
  height: 133px;
  padding: 0 0 0 13px;
}
.homme_center {
  width: 1900px;
  height: 1080px;
  background: url(/static/image/index/bg_1.png);
  margin: 0 auto;
}
.header_item {
  height: 143px;
  padding: 0 0 0 0px;
}
.header_item .list_a {
  width: 1296px;
  height: 133px;
  float: left;
  background: url(/static/image/index/nav_bg_menu_bar.png);
  position: relative;
}

.header_item .list_b {
  width: 343px;
  height: 101px;
  float: left;
  position: relative;
  margin-left: -9px;
}
.header_item .list_b .in {
  width: 348px;
  height: 101px;
  background: url(/static/image/index/nav_1.png);
  position: absolute;
  top: 0;
  left: 0;
}
.header_item .list_c {
  width: 270px;
  height: 120px;
  float: left;
  position: relative;
}
.header_item .list_c .inl {
  width: 228px;
  height: 85px;
  padding: 35px 0 0 40px;
  background: url(/static/image/index/nav_bg_user.png);
  position: absolute;
  top: 0;
  left: 0;
}
.header_item .list_c .inl p.u {
  float: left;
  width: 50px;
  height: 50px;
}
.header_item .list_c .inl p.u img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.header_item .list_c .inl .ise {
  width: 125px;
  height: 30px;
  float: left;
}

/*警告动画*/
@keyframes rowup {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(0, -307px, 0);
    transform: translate3d(0, -307px, 0);
    display: none;
  }
}
.errMessage_list {
  width: 100%;
  height: 118px;
  /*background:#8e1615;*/

  position: relative;

  overflow: auto;
}

.errMessage_list .rowup {
  /*-webkit-animation: 15s rowup linear infinite normal;
    animation: 15s rowup linear infinite normal;*/
  position: relative;
  overflow: hidden;
}
.errMessage_list .rowup .item {
  overflow: hidden;
  border-bottom: dashed 1px #fff;
  line-height: 25px;
  color: #fff;
  padding: 5px;
  text-align: left;
  font-size: 14px;
}
.errMessage_list .rowup .item:hover {
  background: #74100f;
}
.errMessage_list:hover .rowup {
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
