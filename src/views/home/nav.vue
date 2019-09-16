<template>
  <div class="zw-nav clearfix">
        <div v-for="menu in menus" :key="menu.FGUID" :class="['menu-list',menu.FMenuLevle ==1?'menu-list-1':'menu-list-children']" >
          <el-submenu  v-if="menu.FChildMenu&&menu.FChildMenu.length"  :index='menu.FFunctionURLAddress'>
            <template slot="title">
                <i :class="['iconfont',menu.FICONURLAddress]" v-if="menu.FMenuLevle==1" style="position:relative;top:-2px;font-size:22px;margin-right:4px;color:#48B3C8"></i>
                {{menu.FMenuName}}
            </template>
            <zw-nav :menus="menu.FChildMenu" style="padding:0 10px;">
            </zw-nav>
          </el-submenu>
          <el-menu-item v-else  :index="menu.FFunctionURLAddress">
            {{menu.FMenuName}}
          </el-menu-item>
        </div>
  </div>
</template>
<script>
export default {
  name:'zwNav',
  data(){
    return{
    }
  },
  props:{
    menus:{
      type:Array
    }
  },
  mounted(){
  },
  methods:{
  }
}
</script>
<style lang="scss">
$url: "/static/image/index/";
.zw-nav{
  padding-right: 0!important;
  .menu-list-1{
    width: 170px;
    height: 44px;
    line-height: 44px;
    float: left;
    position: relative;
    .el-submenu__title{
    }
    >.el-submenu{
        >.el-submenu__title{
          height: 44px;
          line-height: 44px;
          background: url(#{$url}menu-bg.png) no-repeat;
          background-size: 100% 100%;
          padding: 0 0px;
          font-size:20px;
          font-weight:400;
          color:rgba(42,145,252,1);
          .el-icon-arrow-down{
              transform-origin: 70% 50%;
          }
        }
    }
    >.el-submenu.is-active>.el-submenu__title,>.el-submenu>.el-submenu__title:hover,>.el-submenu>.el-submenu__title:focus{
       background: url(#{$url}menu-active.png) no-repeat;
       background-size: 100% 100%;
       color:rgba(241, 158, 64, 1)
    }
  }
  .menu-list-1:nth-of-type(3){
    margin-left: 536px;
  }
}
.zw-nav:focus{
  outline: none;
}
</style>