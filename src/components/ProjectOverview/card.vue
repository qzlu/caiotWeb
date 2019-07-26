<template>
    <div class="card">
        <h4>{{title}} <i class="iconfont icon-Up"></i></h4>
        <div class="border">
        </div>
        <div class="icon">
        </div>
        <slot>

        </slot>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        title:String,
    }
}
</script>
<style lang="scss" scoped>
    .card{
        width: 100%;
        height: 446px;
        background: url(/static/image/index/leftbar_bg_1.png);
        background-size:100% 100%;
        h4{
            margin-top: 19px;
            padding-left: 22px;
            font-size:18px;
            font-family:MicrosoftYaHeiUI;
            font-weight:400;
            color:rgba(241,241,242,1);
            text-align: left;
            .iconfont{
                display: inline-block;
                transform: rotate(90deg)
            }
        }
        .border{
            height: 1px;
            margin: 9px 25px 0 13px;
            background: #07A6FF;
        }
        .icon{
            width: 100px;
            height: 6px;
            margin-left:13px;
            position: relative;
            background: #07A6FF;
        }
        .icon:after{
            display: block;
            width: 0px;
            height: 0px;
            position: absolute;
            right: -6px;
            border: 3px solid transparent;
            border-top-color: #07A6FF;
            border-left-color: #07A6FF;
            content: ""
        }
    }
</style>
