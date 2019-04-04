<template>
    <div>
        <breaking-new :data='dataList'></breaking-new>
    </div>
</template>
<script>
import breakingNew from '@/components/monitoring/d_l_a.vue'
import {Device} from '@/request/api.js'
export default {
    data(){
        return{
            dataList:[]
        }
    },
    components:{
        breakingNew,
    },
    mounted(){
    },
    methods:{
        /**
         * 248.查询设备台账大事件
         */
        queryUDeviceLedgerEvents(){
            Device({
                FAction:'QueryUDeviceLedgerEvents'
            })
            .then((data) => {
                this.dataList = data.FObject
            }).catch((err) => {
                
            });
        }
    }
}
</script>