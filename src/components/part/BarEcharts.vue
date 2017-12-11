<template>
  <section class="cont-tag bar-echarts-box">

  </section>
</template>

<script>
  /******************/
  /******************/
  //region    //import


  //endregion

  /******************/
  /******************/
  //region    //initialize

  let data = () => {
    return {
      echart: null,
    }
  }

  //endregion

  /******************/
  /******************/
  //region    //export

  export default {
    data, mounted,
    methods: {
      deployEchart
    },
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      idx: {
        type: Number,
        default: 0,
      },
    },
  }
  //endregion

  /******************/
  /******************/
  //region    //function

  /**
   *组件挂载成功执行函数
   */
  function mounted() {
    //初始化柱状图
    this.deployEchart({});

  }


  /**
   * 配置柱状图
   * @param type
   */
  function deployEchart({type = 'init'}) {
    let {chartData} = this;
    if (type === 'init') {
      this.echart = this._echarts.init(document.getElementsByClassName('bar-echarts-box')[this.idx]);
    }

    let option = {
      color: ['#38A9EB'],
      grid: {
        top: '5%',
        left: 0,
        right: 15,
        bottom: '1%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          data : chartData.xAxis,
          axisLabel: {
            color: '#cfcfcf'
          },
          axisLine: {
            lineStyle: {
              color: '#313848'
            },
          },
        }
      ],
      yAxis : [
        {
          type : 'value',
          axisLabel: {
            color: '#cfcfcf',
            formatter(v, i) {
              return v === 0 ? 0 : v + '万';
            },
          },
          axisLine: {
            lineStyle: {
              color: '#313848',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#313848',
            },
          },
        }
      ],
      series : [
        {
          type:'bar',
          barWidth: '50%',
          data: chartData.yAxis,
        }
      ]
    };

    this.echart.setOption(option);

  }













  //endregion

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
