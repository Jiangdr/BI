<template>
  <section class="fr areal corner-t clearFix">
    <div class="map-echarts fl" id="e_areal"></div>
    <div class="fr suitcase">
      <div class="su-contain">
        <div class="headline">
          <span>平台数据统计</span>
        </div>
        <div class="su-cont">
          <div class="wu-cont-c">
            <p>{{areal.allMark.num}}</p>
            <p>总投资金额</p>
          </div>
          <div class="wu-cont-c clearFix">
            <div class="wu-cont-l fl">
              <p>{{areal.allMark.companyNum}}</p>
              <p>平台机构总数</p>
            </div>
            <div class="wu-cont-l fl">
              <p>{{areal.allMark.invPerson}}</p>
              <p>总投资人数</p>
            </div>
          </div>
        </div>
      </div>
      <div class="su-contain">
        <div class="headline">
          <span>今日新标</span>
        </div>
        <div class="su-cont">
          <div class="wu-cont-c">
            <p>{{areal.todayMark.amount}}</p>
            <p>总投资金额</p>
          </div>
          <div class="wu-cont-c clearFix">
            <div class="wu-cont-l fl">
              <p>{{areal.todayMark.num}}</p>
              <p>新增标的</p>
            </div>
            <div class="wu-cont-l fl">
              <p>{{areal.todayMark.invPerson}}</p>
              <p>投资人数</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <i class="corner-i"></i>
  </section>
</template>

<script>

  /******************/
  /******************/
  //region    //import
  import axios from 'axios'


  //endregion


  /******************/
  /******************/
  //region    //initialize

  let data = () => {
    return {}
  };
  let e_areal = null,
    map = null;


  //endregion

  /******************/
  /******************/
  //region    //export

  export default {
    data, mounted,
    props: {
      areal: {
        type: Object,
        required: true,
      }
    },
    methods: {
      mapEcharts
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

    //    初始化地区分布图
    this.mapEcharts({
      id: 'e_areal',
      type: "init",
    })

  }

  /**
   * 配置地区分布图
   * @param id
   * @param data
   * @param type
   */
  async function mapEcharts({id, type = "change"}) {
    if (type === "init") {
      e_areal = this._echarts.init(document.getElementById(id));
      //获取乌鲁木齐市地图json
      map = await getMapJson();
      //注册地图
      this._echarts.registerMap('乌鲁木齐市', map);
      window.addEventListener('resize', function (e) {
        e_areal.resize();
      }, false)
    }
    let data = this.areal;
//    e_areal.showLoading();
    //绘制地图
    let option = {
      geo: {
        map: '乌鲁木齐市',
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          }
        },
        itemStyle: {
          normal: {
            show: false,
            areaColor: 'transparent',
            borderColor: 'transparent',
          },
          emphasis: {
            areaColor: '#ff0',
          }
        },
      },
      series: [
        {
          name: '定位点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            period: 5,
            brushType: 'stroke',
            scale: 3
          },//涟漪特效
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff',
                fontSize: 9,
              }
            }
          },
          data: data.coord,
          symbolSize: 7,
          itemStyle: {
            normal: {
              color: '#10e4de',
            }
          },
          zlevel: 1,
        }, //定位点
        {
          name: '高亮定位点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          rippleEffect: {
            period: 5,
            brushType: 'stroke',
            scale: 3
          },//涟漪特效
          label: {
            normal: {
              show: false,
            }
          },
          data: [{value: data.todayMark.value}],
          // symbolSize: 15,
          itemStyle: {
            normal: {
              color: '#10e4de',
            }
          },
          zlevel: 1,
        }, //高亮定位点
        {
          name: '气泡点',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#ddb926',
                fontSize: 9,
              }
            }
          },
          data: [{value: data.todayMark.value}],
          symbolSize: 25,
          zlevel: 25,
          animation: true,
          itemStyle: {
            normal: {
              color: '#f69316', //标志颜色
            }
          }
        }, //气泡点
        {
          name: '乌鲁木齐市',
          type: 'map',
          mapType: '乌鲁木齐市',
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#999',
                fontSize: 13
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 13
              }
            }
          },
          data: map.features.map((item, idx) => {
            return {
              name: item.properties.name,
              value: idx,
            }
          }),
//          left: 10,
//          right: 10,
          top: 8,
          bottom: 8,
          itemStyle: {
            normal: {
              borderColor: "#24dcdb",
              borderWidth : 1,
            },
          },
        },//基础地图
      ],
      visualMap: {
        show: false,
        seriesIndex: 3,
        min: 0,
        max: map.features.length - 1,
        color: ['#1c6c9f', '#1c6c9f']
      },//视觉类型
    };
//    e_areal.hideLoading();
    e_areal.setOption(option);
  }


  /**
   * 获取地图json
   * @async 异步函数
   * @returns map json
   */
  async function getMapJson() {
    let {data} = await axios.get('static/mapJson/650100.json');
    return data;
  }


  //endregion
</script>

<style lang="scss">
  /*variable*/


</style>
