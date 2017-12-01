<template>
  <section class="fr capacity corner-t">
    <div class="abi-echarts"></div>
    <i class="corner-i"></i>
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
      echarts: null,
    }
  }

  //endregion

  /******************/
  /******************/
  //region    //export

  export default {
    data, mounted,
    methods: {radarEcharts},
    props: {
      idx: {
        type: String,
        default: '0'
      },
      data: {
        type: Array,
        required: true,
      },
      legend: {
        type: String,
        required: true,
      }
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
    this.radarEcharts({
      type: 'init',
    });
  }


  /**
   * 配置雷达图
   * @param id
   * @param data
   * @param type
   */
  function radarEcharts({type = "change"}) {
    if (type === "init") {
      this.echarts = this._echarts.init(document.getElementsByClassName('abi-echarts')[this.idx]);
      window.addEventListener('resize', (e) => {
        this.echarts.resize();
      }, false)
    }
    let {legend, data} = this;
    let option = {
      legend: {
        data: [legend],
        left: '15px',
        bottom: '5px',
        itemWidth: 12,
        itemHeight: 8,
        textStyle: {
          color: '#fff',
        },
      },
      grid: {
        top: '40px',
        right: '20px',
        bottom: '50px',
        left: '40px',
      },
      radar: {
        name: {
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        indicator: [
          {name: '未上传标的数量', max: 1},
          {name: '未上传标金额', max: 1},
          {name: '已融资金额', max: 1},
          {name: '未融资金额', max: 1},
          {name: '借款人数', max: 1},
          {name: '投资人数', max: 1},
        ],
        splitArea: {
          show: true,
          areaStyle: {
            opacity: 0,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            opacity: 0.4,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            opacity: 0.4,
          },
        },
      },
      series: [
        {
          name: legend,
          type: 'radar',
          data: [
            {
              value: data,
              areaStyle: {
                normal: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.9,
                    colorStops: [{
                      offset: 0, color: '#dfca0c' // 0% 处的颜色
                    }, {
                      offset: 0.95, color: '#e93c00' // 100% 处的颜色
                    }],
                  },
                  opacity: 0.55,
                },
              },
              lineStyle: {
                normal: {
                  opacity: 0,
                },
              },
            }
          ]
        }
      ]
    };

    this.echarts.setOption(option);
  }

  //endregion

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
