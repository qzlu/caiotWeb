<template>
    <div class="message-box">
        <el-dialog
          :title="title"
          :visible.sync="show"
        >
            <div>
                确定要删除　{{msg}}
            </div>
            <div class="footer">
                <button class="zw-btn zw-btn-primary" @click="confirm">确定</button>
                <button class="zw-btn zw-btn-primary" @click="show = false">取消</button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            promise:null,
            sure:false
        }
    },
    props:{
        title:{
            default:"删除信息"
        },
        show:{
            default:false,
            type:Boolean
        },
        msg:{
            type:String
        }
    },
    methods:{
        confirm(){
            this.$emit('confirm')
        }
    }
}
</script>
<style lang="scss">
.message-box{
    .el-dialog{
        width:681px;
        height:254px;
        box-sizing: border-box;
        padding: 20px;
        background: url(/static/image/task/messageBox.png) center no-repeat;
        &__header {
            .el-dialog__title{
                font-size: 17px;
                color: #F1F1F2;
            }
            .el-dialog__headerbtn{
                top: 40px;
                right: 40px;
            }
        }
        &__body{
           padding: 10px 20px;
           font-size: 20px;
           color: #F1F1F2;
           text-align: center;
           .footer{
               margin-top: 30px;
               button{
                   margin-right: 20px;
               }
               button:last-of-type{
                   background: none
               }
           }
        }
    }
}
</style>

