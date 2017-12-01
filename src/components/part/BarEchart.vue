<template>
  <section class="bar-wraper corner-t">
    <div class="bar-box"></div>
    <i class="corner-i"></i>
  </section>
</template>

<script>

  /******************/
  /******************/
  //region    //import
  //  import axios from 'axios'


  //endregion


  /******************/
  /******************/
  //region    //initialize

  let data = () => {
    return {
      echarts: null,
    }
  };

  //endregion

  /******************/
  /******************/
  //region    //export

  export default {
    data, mounted,
    methods: {
      barEcharts
    },
    props: {
      idx: {
        type: String,
        default: 0
      },
      data: {
        type: Array,
        required: true,
      },
      legend: {
        type: String,
        required: true,
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
    this.barEcharts({
      type: 'init',
    });
  }


  /**
   * 配置投资分布以及走势图
   * @param id
   * @param data
   * @param type
   */
  function barEcharts({idx, type = "change"}) {
    if (type === "init") {
      this.echarts = this._echarts.init(document.getElementsByClassName('bar-box')[this.idx]);
      window.addEventListener('resize', (e) => {
        this.echarts.resize();
      }, false)
    }
    let {legend, data} = this;
    let option = {
      color: ['rgba(0, 142, 216, 1)', 'rgba(1, 254, 253, 1)'],
      legend: {
        data: [legend],
        right: '20px',
        itemWidth: 12,
        itemHeight: 8,
        textStyle: {
          color: '#fff',
        },
      },
      grid: {
        top: '35px',
        right: '20px',
        bottom: '25px',
        left: '40px',
      },
      xAxis: [
        {
          type: 'category',
          splitNumber: 12,
          data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          axisLine: {
            show: false
          },
          axisTick: {//刻度
            show: false,
          },
          axisLabel: {
            color: '#fff'
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '金额(万)',
          scale: true,
          axisLine: {//Y轴线
            show: false,
          },
          axisTick: {//刻度
            show: false,
          },
          splitLine: {//分段线
            show: false,
            lineStyle: {
              color: 'rgba(0, 142, 216, 0.4)',
            },
          },
          nameTextStyle: {//文字样式
            color: '#fff',
            fontSize: 10,
          },
          axisLabel: {//label样式
            fontSize: 10,
            color: '#fff'
          },
        }
      ],
      series: [
        {
          name: legend,
          type: 'bar',
          barWidth: '55%',
          data: data,
          itemStyle: {
            normal: {
              barBorderRadius: [2, 2, 0, 0],
              color: new this._echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1, color: 'rgba(0, 142, 216, 1)'
                },
                {
                  offset: 0.7, color: 'rgba(0, 142, 216, 1)'
                },
                {
                  offset: 0, color: 'rgba(1, 254, 253, 1)'
                }
              ], false),
            },
          },
        },
      ]
    };

    this.echarts.setOption(option);
  }

  //endregion
</script>

<style>
  /*variable*/


</style>
