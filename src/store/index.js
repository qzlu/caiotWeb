import Vue from 'vue'
import Vuex from 'vuex'
import {project, system} from '@/request/api.js';
Vue.use(Vuex)
const store = new Vuex.Store({
    state: { 
      projectList:[], //所有项目
      areaList:[], //所有区域
    },
    mutations: {
        /**
         * 获取所有项目
         */
        getProject(state){
            project({
                FAction: "GetProject"
            })
            .then((data) => {
                state.projectList = data.FObject
            }).catch((err) => {
                
            });
        },
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
        }
    },
    actions:{

    }
})
export default store