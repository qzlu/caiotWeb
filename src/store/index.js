import Vue from 'vue'
import Vuex from 'vuex'
import {project} from '@/request/api.js';
Vue.use(Vuex)
const store = new Vuex.Store({
    state: { 
      projectList:[] //所有项目
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
                console.log(data);
                state.projectList = data.FObject
            }).catch((err) => {
                
            });
        }
    },
    actions:{

    }
})
export default store