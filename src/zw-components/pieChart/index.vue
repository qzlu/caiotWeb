<template>
  <div :id="id" style="width:100%;height:100%"></div>
</template>
<script>
//引入uuid文件
import uuidv1 from 'uuid/v1'
export default {
  data() {
    return {
        id:''
    };
  },
  props: {
    data: {
      type: Object
    },
    color:{
        type:Array,
        required:true
    },
    setting:{
        type:Object
    }
  },
  created(){
    this.id = uuidv1() //获取随机id
  },
  mounted() {
    this.$nextTick(() => {
        this.showPieChart()
    })
  },
  watch: {
    data(){
        this.$nextTick(() => {
            this.showPieChart()
        })
    }
  },
  methods: {
    /**
     * 绘制饼图
     * id 图形容器id
     * data 数据
     */
    showPieChart() {
      var dom = document.getElementById(this.id);
      var myChart = echarts.init(dom);
      var app = {};
      var option = null;
      app.title = "环形图";

      option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "195px",
          y: "center",
          textStyle: { color: "#fff" },
          itemWidth: 13,
          itemHeight: 13,
          data: this.$props.data.columns
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50", "60"],
            avoidLabelOverlap: false,
            center:this.$props.setting&&this.$props.setting.center?this.$props.setting.center:['50%','50%'],
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:this.$props.data.rows
          }
        ],
        color: this.$props.color
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    }
  },
};
</script>