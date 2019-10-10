import Vue from 'vue'
import Vuex from 'vuex'
import {project, system} from '@/request/api.js';
import * as comm from "../assets/js/pro_common";
Vue.use(Vuex)
/**
 * 递归遍历使得一级菜单的路由为其子菜单第一个页面
 */
const formatterMenu = function (data){
    data.forEach(menu => {
        if(menu.FChildMenu&&menu.FChildMenu.length>0){
            let children = menu.FChildMenu[0]
            if(children.FChildMenu&&children.FChildMenu.length>0){
                menu.FFunctionURLAddress = formatterMenu([children])[0].FFunctionURLAddress
            }else{
                menu.FFunctionURLAddress = children.FFunctionURLAddress
            }
        }
    })
    return data
}
const store = new Vuex.Store({
    state: { 
      projectList:[], //所有项目
      areaList:[], //所有区域
      orderUser:[],
      menuData:[], //菜单
    },
    mutations: {
        /**
         * 66.获取所有区域
         * @param {*} state 
         */
        queryUAreaList(state){
            system({
                FAction:'QueryUAreaList'
            })
            .then(data => {
                state.areaList  = data.FObject
            })
            .catch(err => {})
        },
        /**
         * 356.查询工单转单账户列表
         */
        queryOrderTUsers(state){
            system({
                FAction:'QueryOrderTUsers',
                FType:1
            })
            .then((data) => {
                state.orderUser = data.FObject
            }).catch((err) => {
                
            });
        },
    },
    actions:{
        queryOrderTUsers({commit}){
            commit('queryOrderTUsers')
        },
        /**
         * 获取所有项目
         */
        getProject({state}){
            return new Promise((resolve,reject) => {
                project({
                    FAction: "GetProject"
                })
                .then((data) => {
                    state.projectList = data.FObject
                    resolve(state.projectList)
                }).catch((err) => {
                    reject(err)
                });
            })
        },
        /**
         * 获取菜单列表
         */
        getMenu({state}){
            return new Promise((resolve,reject) => {
                system({
                    FAction: "QueryUsersMenu"
                })
                .then(data => {
                    let menuData = comm.ChangeRouterVal(data.FObject); //匹配路由名
                    state.menuData = formatterMenu(menuData)
                    localStorage.setItem("config_nav_data", JSON.stringify(state.menuData)); //系统管理-配置管理要用到的
                    resolve(state.menuData[0])
                })
                .catch(error => {
                  reject(error)
                });
            })
        }
    }
})
export default store