<template>
  <section class="cont-tag ring">
    <div class="ring-echart-box chart"></div>
    <ul class="tag">
      <li
        v-for="(item, idx) in chartData.seriesData"
        :key="idx">
        <p>{{item.name}}</p>
        <p>{{computRadio(item.value)}}</p>
        <p>{{item.value}}</p>
      </li>
    </ul>
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
      deployEchart,
      computRadio (val) {
        return Math.round((val / this.chartData.seriesData.map((itm) => itm.value).reduce((a, b) => a + b)) * 10000) / 100 + '%'
      },
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
    this.deployEchart({})

  }


  /**
   * 配置柱状图
   * @param type
   */
  function deployEchart({type = 'init'}) {
    let {chartData} = this;
    if (type === 'init') {
      this.echart = this._echarts.init(document.getElementsByClassName('ring-echart-box')[this.idx]);
    }

    let option = {
      color: chartData.color,
      series: [
        {
          type:'pie',
          radius: ['55%', '80%'],
          label: {
            normal: {
              show: true,
              formatter: '{b} {d}%',
              color: '#cfcfcf',

            },
          },
          labelLine: {
            normal: {
              show: true,
              length: 10,
              length2: 0,
              lineStyle: {
                color: '#cfcfcf',
              }
            }
          },
          startAngle: 30,
          data: chartData.seriesData
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
