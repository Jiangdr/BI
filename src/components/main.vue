<template>
  <main class="full-box">
    <header class="nav-header">
      <figure class="logo-wrap">
        <img src="../../static/images/deploy/herd.png" alt="">
      </figure>
    </header>

    <main class="container">
      <!--top 1-->
      <section class="cont-wrap clearFix">
        <!--left 1-1-->
        <section class="cont-left fl clearFix">
          <!--投资人数和金额情况-->
          <section class="fl register">
            <div class="reg-top clearFix">
              <div class="fl reg-ratio clearFix corner-t">
                <div class="fl reg-ratio-l">
                  <div class="hd-count">
                    <div>
                      <p class=""><span
                        class="big-font">{{register.ratio.count}}</span><span>人</span></p>
                      <p class=""><span>总人数</span></p>
                    </div>
                  </div>
                  <div>
                    <p><span
                      class="big-font">{{register.ratio.investor}}</span><span>人</span>
                    </p>
                    <p>投资人数</p>
                  </div>
                </div>
                <div class="fr reg-ratio-r">
                  <div class="ratio-circle">
                    <prog-canvas ref="ref_investor" idx="0" :ratio="investRatio"
                                 intro="投资人比例"></prog-canvas>
                  </div>
                </div>
                <i class="corner-i"></i>
              </div>
              <div class="fr reg-an corner-t">
                <div id="e_circle" class="reg-an-ech"></div>
                <div class="text-label">
                  <p>
                    <span class="big-font">{{totalMoney}}</span>
                    <span>总融资额</span>
                  </p>
                </div>
                <i class="corner-i"></i>
              </div>
            </div>
            <div class="reg-bottom corner-t">
              <div class="trend-echa" id="trend"></div>
              <i class="corner-i"></i>
            </div>
          </section>
          <!--地图-->
          <map-mod ref="ref_areal" :areal="areal"></map-mod>
        </section>
        <!--right 1-2-->
        <section class="cont-right fr">
          <!--融资总额-->
          <bar-echart ref="ref_bar1" idx="0" legend="融资金额"
                      :data="district.entry"></bar-echart>
          <!--投资人数-->
          <bar-echart ref="ref_bar2" idx="1" legend="投资人数"
                      :data="district.invest"></bar-echart>
          <!--平均金额-->
          <bar-echart ref="ref_bar3" idx="2" legend="平均金额"
                      :data="district.uniform"></bar-echart>
        </section>
      </section>

      <!--bottom 2-->
      <section class="cont-wrap clearfix">
        <!--left 2-1-->
        <section class="cont-left fl">
          <!--风险企业排行-->
          <rank-list :items="rank"></rank-list>
          <section class="fl intro">
            <!--仪表-->
            <instru-mod :items="instru"></instru-mod>
            <section class="corner-t small-instru">
              <div class="instru-canv fl">
                <prog-canvas ref="ref_invested" idx="1" :ratio="invested"
                             :intro="rondure.invested_rate"></prog-canvas>
                <p>已融资金额</p>
              </div>
              <div class="instru-canv fl">
                <prog-canvas idx="2" :ratio="noInvest" :intro="rondure.noInvest_rate"
                             color="#ff9125"></prog-canvas>
                <p>未融资金额</p>
              </div>
              <div class="instru-canv fl">
                <prog-canvas idx="3" :holder="rondure.amount" intro="万元"></prog-canvas>
                <p>融资总额</p>
              </div>
              <div class="instru-canv fl">
                <prog-canvas idx="4" :holder="rondure.investor" intro="人"
                             color="#ff9125"></prog-canvas>
                <p>投资人数</p>
              </div>
              <i class="corner-i"></i>
            </section>
          </section>
          <!--六维能力图-->
          <capacity-break ref="ref_capacity" idx="0" :data="capacity.data"
                          :legend="capacity.legend"></capacity-break>
        </section>
        <!--right 2-2-->
        <impro-comp :items="impro"></impro-comp>
      </section>
    </main>
  </main>
</template>

<script>
  /******************/
  /******************/
  //region    //import
  import axios from 'axios'
  import MapMod from './part/Map.vue'//地图组件
  import BarEchart from './part/BarEchart.vue'//柱状图分布组件
  import RankList from './part/RankList.vue'//排行榜星形组件
  import CapacityBreak from './part/CapacityBreak.vue'//雷达图
  import ImproComp from './part/ImproComp.vue'//整改企业
  import InstruMod from './part/InstruMod.vue'//仪表
  //  import ProgCanvas from './part/ProgCanvas.vue'//圆环进度条
  const ProgCanvas = () => import('./part/ProgCanvas')
  //endregion

  /******************/
  /******************/
  //region    //initialize

  let data = () => {
    return {
      register: {
        ratio: {
          count: 910,//总人数
          investor: 301,//投资人
        },//投资人比例,
        lease: {
          finished: 1400,
          unfinished: 300,
        },//总融资额
        trend: {
          regis: [1000, 1200, 1400, 1500, 1600, 1800, 2100, 2200, 2200, 2300, 2400, 2500],//注册人数
          investor: [800, 900, 1000, 1200, 1400, 1450, 1550, 1600, 1800, 1800, 1960, 2000,],//投资人数
          amount: [213, 343, 370, 450, 490, 500, 566, 670, 699, 700, 800, 900],//投资金额
        },//分布以及走势
      },//投资信息
      areal: {
        coord: [
          {
            name: '一带一路',
            value: [87.1236, 43.2883, 180]
          },
          {
            name: '新疆惠恩资本',
            value: [88.9236, 43.4883, 200]
          },
          {
            name: '一带一路',
            value: [87.6236, 43.4883, 70]
          },
          {
            name: '新疆惠恩资本',
            value: [87.9236, 43.5883, 80]
          },
          {
            name: '一带一路',
            value: [87.6236, 43.6883, 60]
          },
          {
            name: '一带一路',
            value: [87.5236, 43.6883, 90]
          },
          {
            name: '新疆惠恩资本',
            value: [87.9236, 43.7883, 150]
          },
          {
            name: '新疆惠恩资本',
            value: [87.7236, 44.5883, 70]
          },
        ],//坐标点
        todayMark: {
          name: '新疆惠恩资本',
          value: [87.9236, 43.5883, 10],
          amount: 10,
          invPerson: 50,
          num: 1,
          idx: 1,
        },//被展示的企业
        allMark: {
          companyNum: 8,
          invPerson: 31212,
          num: '50,000',
        },//所有企业数据
      },//地图分布
      district: {
        entry: [112, 520, 440, 122, 510, 50, 440, 470, 142, 510, 540, 410],//融资总额
        invest: [12, 50, 40, 12, 50, 50, 40, 40, 12, 50, 50, 40],//投资人数
        uniform: [12, 550, 420, 12, 510, 50, 400, 40, 112, 510, 50, 40],//平均金额
      },//柱状图分布
      rank: [
        {
          name: '惠恩金融惠恩金融惠恩金融',
          num: '1000万',
          level: 4,
        },
        {
          name: '惠恩金融惠恩金融',
          num: '1000万',
          level: 3,
        },
        {
          name: '惠恩金融惠恩金融',
          num: '1000万',
          level: 3,
        },
        {
          name: '惠恩金融',
          num: '1000万',
          level: 2,
        },
        {
          name: '惠恩金融',
          num: '1000万',
          level: 1,
        }
      ],//风险企业排行
      impro: [
        {
          name: '惠恩金融惠恩金',
          num: '1000万',
          ratio: 1,
          bid: 53,
        },
        {
          name: '惠恩金融惠恩金',
          num: '1000万',
          ratio: 0.8,
          bid: 53,
        },
        {
          name: '惠恩金融惠恩金',
          num: '1000万',
          ratio: 0.6,
          bid: 53,
        },
        {
          name: '惠恩金融惠恩金',
          num: '1000万',
          ratio: 0.5,
          bid: 53,
        },
        {
          name: '惠恩金融惠恩金',
          num: '1000万',
          ratio: 0.2,
          bid: 53,
        },
      ],//整改企业排行
      instru: [
        {
          name: '投资人数',
          cont: '134人',
        },
        {
          name: '投资总额',
          cont: '5000万',
        },
        {
          name: '未融资额',
          cont: '800万',
        },
        {
          name: '已融资额',
          cont: '3600万',
        },
        {
          name: '未上传标的数量',
          cont: '34个',
        },
        {
          name: '风险企业数',
          cont: '4个',
        },
      ],//仪表图
      rondure: {
        invested: 1000,//已投资金额
        invested_rate: '0%',//已投资金额变化率
        noInvest: 700,//未投资金额
        noInvest_rate: '0%',//未投资金额变化率
        amount: 2700,//投资总额
        investor: 666,//投资人数
      },//投资情况圆形比例图
      capacity: {
        legend: '新华富疆',
        data: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
      },//六维能力图
      idx: -1,
    }
  };
  let e_circle = null,//投资额圆环图
    e_trend = null;//投资额走势图
  let _color = {
    bg: ['rgba(0, 142, 216, 1)', 'rgba(1, 254, 253, 1)', 'rgba(255, 145, 37, 1)'],
    font: '#ddd',
  };

  /******************/
  /******************/
  //region    //export

  export default {
    data, mounted,
    components: {
      MapMod,
      BarEchart,
      RankList,
      CapacityBreak,
      ImproComp,
      InstruMod,
      ProgCanvas
    },
    methods: {
      pieEcharts, barEcharts
    },
    computed: {
      totalMoney() {
        let {register: {lease: {finished, unfinished}}} = this;
        return Math.round((Number(finished) + Number(unfinished)) / 100);
      },//总融资额
      investRatio() {
        let {register: {ratio: {count, investor}}} = this;
        return investor / count;
      },//投资人比例
      invested() {
        let {rondure: {invested, noInvest}} = this;
        return invested / (invested + noInvest);
      },//已投资金额比例
      noInvest() {
        let {rondure: {invested, noInvest}} = this;
        return noInvest / (invested + noInvest);
      },//未投资金额比例
    },
    watch: {
      'rondure.invested'(nw, old) {
        this.rondure.invested_rate = toRatio((nw - old) / old);
      },
      'rondure.noInvest'(nw, old) {
        this.rondure.noInvest_rate = toRatio((nw - old) / old);
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
//    初始化投资占比图
    this.pieEcharts({
      id: 'e_circle',
      data: this.register.lease,
      type: "init",
    })
//    初始化投资走势图
    this.barEcharts({
      id: 'trend',
      data: this.register.trend,
      type: "init",
    })

    axios.get('static/json/wsConfig.json').then((res) => {
      let {data: {ws}} = res;
//    连接websocket 整体信息
      this._global.sockJs({
        callback: onmessage,
        Vue: this,
        theme: '/topic/getResponse',
        ws,
      });
//    连接websocket 企业详细信息
//     rotaryMsg(1, this)
      this._global.sockJs({
        callback: rotaryMsg,
        Vue: this,
        theme: '/topic/inTime',
        ws,
      });

    })


    window.addEventListener('resize', function (e) {
      e_trend.resize();
      e_circle.resize();
    }, false)

  }

  /**
   * websocket更新后触发函数
   * @param mes
   */
  function onmessage(msg, Vue) {
    let data = JSON.parse(msg);
    // console.log(data, 11);
    let {personNum, moneyScale, invDate, riskCompany, riskMarkData, doneInvDate} = data;

    let trend = {
      regis: [],//注册人数
      investor: [],//投资人数
      amount: [],//投资额
    }, invArr = [];
    let riskRefactor = riskCompany.slice(0, 5).map(obj => {
      return {
        name: obj.name,
        num: sumRefactor(obj.num) + '万',
      }
    });
    /*获取投资详情*/
    invDate.reverse().forEach((obj, idx) => {
      trend.regis.push(obj.registerNum);
      trend.investor.push(obj.invPerson);
      trend.amount.push(sumRefactor(obj.amount));
    })
    doneInvDate.reverse().forEach((obj, idx) => {
      invArr.push(Math.round(obj.amount / 100 / 10000));
    })

    Vue._global.$extend(true, Vue, {
      register: {
        ratio: {
          count: personNum.registerNum,//总人数
          investor: personNum.invPerson,//投资人
        },//投资人比例,
        lease: {
          finished: moneyScale.doneInv,
          unfinished: moneyScale.investing,
        },//总融资额
        trend,//分布以及走势
      },//投资信息
      rank: riskRefactor,//风险企业排行
      instru: [
        {
          name: '投资人数',
          cont: riskMarkData.invPerson,
        },
        {
          name: '投资总额',
          cont: sumRefactor(riskMarkData.invAmount),
        },
        {
          name: '未融资额',
          cont: sumRefactor(riskMarkData.investing),
        },
        {
          name: '已融资额',
          cont: sumRefactor(riskMarkData.doneInv),
        },
        {
          name: '未上传标的数量',
          cont: riskMarkData.markNum,
        },
        {
          name: '风险企业数',
          cont: riskMarkData.riskCompanyNum,
        },
      ],//仪表图
      district: {
        entry: invArr,//融资总额
        invest: trend.investor,//投资人数
        uniform: trend.amount,//平均金额
      },//柱状图分布
      impro: riskRefactor,//整改企业排行
    })

//    更新非绑定的dom
    Vue.$nextTick(() => {

      Vue.$refs.ref_investor.drawing();//投资人比例
      Vue.$refs.ref_bar1.barEcharts({type: 'change'});//融资金额柱状图
      Vue.$refs.ref_bar2.barEcharts({type: 'change'});//融资金额柱状图
      Vue.$refs.ref_bar3.barEcharts({type: 'change'});//融资金额柱状图

      Vue.pieEcharts({data: Vue.register.lease});//总融资额

      Vue.barEcharts({data: Vue.register.trend,})//更新投资走势图

    })
  }

  /**
   * websocket更新后触发函数
   * @param msg
   */
  function rotaryMsg(msg, Vue) {
    let {allMark, companyName, sixAb, todayMark, allMark: {companyNum}} = JSON.parse(msg),
      {idx} = Vue;
    Vue.idx = ++idx >= companyNum ? 0 : idx;
    Vue._global.$extend(true, Vue, {
      areal: {
        // todayMark,//被展示的企业
        allMark,//所有企业数据
        todayMark: Object.assign({
          name: companyName,
          value: Vue.areal.coord[Vue.idx].value,
        }, todayMark),//被展示的企业
      },//地图分布
      capacity: {
        legend: companyName,
        data: [sixAb.notUploadNum, sixAb.invNum, sixAb.partNum, sixAb.notUploadAmount, sixAb.doneInv, sixAb.investing]
      },//六维能力图

    })

//    更新非绑定的dom
    Vue.$nextTick(() => {

      Vue.$refs.ref_capacity.radarEcharts({type: 'change'});//六维能力图

      Vue.$refs.ref_areal.mapEcharts({type: 'change'});//地图

    })
  }


  //  /**
  //   * 时间格式处理函数
  //   * @param ori
  //   * @returns {{date: string, time: (*|string)}}
  //   */
  //  function dateHandle(ori) {
  //    let [data, time] = ori.split(" ");
  //    return {
  //      date: data.slice(data.indexOf("-") + 1).replace("-", "."),
  //      time: time
  //    }
  //  }

  /**
   * 配置融资额度圆环图
   * @param id
   */
  function pieEcharts({id, data = {finished: 1, unfinished: 1}, type = "change"}) {
    if (type === "init") {
      e_circle = this._echarts.init(document.getElementById(id));
    }
    let option = {
      backgroundColor: 'rbga(0, 0, 0, 0)',
      color: ['rgba(255, 145, 37, 1)', 'rgba(0, 142, 216, 1)'],
      series: [
        {
          type: 'pie',
          radius: ['45%', '80%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              color: '#01fefd',
              position: 'inside',
            },
          },
          labelLine: {
            normal: {
              show: false,
            }
          },
          data: [
            {value: data.unfinished, name: '未融资额'},
            {value: data.finished, name: '已融资额'},
          ]
        }
      ]
    };
    e_circle.setOption(option);
  }

  /**
   * 配置投资分布以及走势图
   * @param id
   * @param data
   * @param type
   */
  function barEcharts({id, data = {}, type = "change"}) {
    if (type === "init") {
      e_trend = this._echarts.init(document.getElementById(id));
    }
    let option = {
      color: _color.bg,
      legend: {
        data: ['注册人数', '投资人数', '投资额'],
        right: '80px',
        itemWidth: 15,
        itemHeight: 10,
        textStyle: {
          color: _color.font
        },
      },
      grid: {
        top: '35px',
        right: '55px',
        bottom: '25px',
        left: '60px',
      },
      xAxis: [
        {
          type: 'category',
          splitNumber: 12,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLine: {
            show: false
          },
          axisTick: {//刻度
            show: false,
          },
          axisLabel: {
            color: _color.font
          },
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '人数',
          splitNumber: 5,
          axisLine: {//Y轴线
            show: false,
          },
          splitLine: {//分段线
            show: false,
          },
          axisTick: {//刻度
            show: false,
          },
          nameTextStyle: {//name样式
            color: _color.font,
            fontSize: 10,
          },
          axisLabel: {//label样式
            color: _color.font,
            fontSize: 10,
          },
        },
        {
          type: 'value',
          name: '金额(万)',
          splitNumber: 5,
          scale: true,
          axisLine: {//Y轴线
            show: false,
          },
          axisTick: {//刻度
            show: false,
          },
          splitLine: {//分段线
            lineStyle: {
              color: 'rgba(0, 142, 216, 0.4)',
            },
          },
          nameTextStyle: {//文字样式
            color: _color.font,
            fontSize: 10,
          },
          axisLabel: {//label样式
            color: _color.font,
            fontSize: 10,
          },
        }
      ],
      series: [
        {
          name: '注册人数',
          type: 'bar',
          barWidth: '30%',
          data: data.regis
        },
        {
          name: '投资人数',
          type: 'bar',
          barWidth: '30%',
          data: data.investor
        },
        {
          name: '投资额',
          type: 'line',
          symbol: 'circle',
          symbolSize: 6,
          yAxisIndex: 1,
          data: data.amount,
          areaStyle: {
            normal: {
              color: new this._echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 145, 37, 1)',
                },
                {
                  offset: 0.8,
                  color: 'rgba(255, 255, 255, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 255, 255, 1)',
                }
              ]),
              opacity: 0.5
            }
          },
        }
      ]
    };

    e_trend.setOption(option);
  }


  /**
   *返回百分比字符串
   * @peram 比率
   * @return 百分比字符串
   */
  function toRatio(v) {
    return Math.round(v * 10000) / 100 + '%';
  }

  /**
   * 金额格式化，单位(万)
   */
  function sumRefactor(sum) {
    sum = sum / 1000000;
    if (sum < 10) {//不超过十万，精确到千
      return Math.round(sum * 10) / 10;
    } else {//超过十万，精确到万
      return Math.round(sum)
    }
  }


  /**
   * 金额格式化，单位(元), 逗号分隔
   * @param sum
   * @returns {*}
   */
  function sumFormar(sum) {
    sum = (Math.round(sum / 100)).toString();
    let arr = sum.split("").reverse(),
      str = "";
    arr.forEach((item, idx) => {
      if (idx !== 0 && idx % 3 === 0) {
        str = "," + str;
      }
      str = item + str;
    })
    return str;
  }

  //endregion

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  /*variable*/
  $nav-height: 8vh; //顶部log高度
  $main-height: 92vh; //main容器高度
  $interval: 1.1vw; //main-box间隙
  /*color*/
  $box-bg: rgba(13, 20, 48, 1); //容器背景色
  $highlight: rgb(1, 255, 254); //高亮色
  $lightblur: rgba(1, 254, 253, .6); //高亮色基础模糊色
  $blue: rgba(0, 142, 216, 1); //蓝色
  $orange: rgba(255, 145, 37, 1); //橙色

  .full-box {
    background: #111;
    /*min-width: 1170px;*/
    min-height: 600px;
  }

  /***********容器类布局start*********/
  /***********容器类布局start*********/
  //region
  /*public*/
  .bg {
    background: $box-bg;
    box-shadow: 0 0 4px 1px $lightblur inset;
  }

  /*header*/
  .nav-header {
    height: $nav-height;
    margin-bottom: -$interval;
    text-align: center;
    .logo-wrap, img {
      height: 100%;
    }
  }

  /*main*/
  .container {
    height: calc(#{$main-height} + #{$interval});
    padding: $interval;
    .cont-wrap {
      height: calc((#{$main-height} - #{$interval} * 2) / 2);
      &:nth-of-type(1) {
        margin-bottom: $interval;
      }
    }
    .cont-left {
      width: calc((100% - #{$interval}) * .79);
      height: 100%;
      & > section {
        height: 100%;
      }
      .register {
        width: calc((100% - #{$interval}) * .40);
      }
      .areal {
        width: calc((100% - #{$interval}) * .60);
      }
      .rank {
        width: calc((100% - #{$interval}) * .269706);
        margin-right: $interval * .5;
      }
      .intro {
        width: calc((100% - #{$interval}) * .33);
        .instru {
          height: 62%;
          margin-bottom: $interval * .5;
        }
        .small-instru {
          height: calc(38% - #{$interval * .5});
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          .instru-canv {
            width: 20%;
            height: 80%;
            p {
              height: 20%;
              font-size: 12px;
              text-align: center;
              white-space: nowrap;
            }
          }
        }
      }
      .capacity {
        width: calc((100% - #{$interval}) * .400294);
      }
    }
    .cont-right {
      width: calc((100% - #{$interval}) * .21);
      height: 100%;
    }
  }

  /*detail*/
  .register {
    .reg-top {
      height: calc((100% - #{$interval * .8}) * .45);
      margin-bottom: $interval * .8;
      .reg-ratio, .reg-an {
        width: calc((100% - #{$interval * .8}) * .5);
        height: 100%;
      }
    }

    .reg-bottom {
      height: calc((100% - #{$interval * .8}) * .55);
    }
  }

  .corner-t {
    position: relative;
    @extend .bg
  }

  .corner-t > .corner-i {
    display: block;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }

  .corner-t:before, .corner-t > .corner-i:before, .corner-t:after, .corner-t > i:after {
    content: '';
    display: table;
    position: absolute;
    width: 1vw;
    height: 1vw;
    background: url("../../static/images/deploy/corner.png") no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }

  .corner-t > .corner-i:before {
    bottom: 0;
    left: 0;
    -webkit-transform: rotate3d(1, 0, 0, 180deg);
    -moz-transform: rotate3d(1, 0, 0, 180deg);
    -ms-transform: rotate3d(1, 0, 0, 180deg);
    -o-transform: rotate3d(1, 0, 0, 180deg);
    transform: rotate3d(1, 0, 0, 180deg);
  }

  .corner-t > .corner-i:after {
    bottom: 0;
    right: 0;
    -webkit-transform: rotate3d(0, 0, 1, 180deg);
    -moz-transform: rotate3d(0, 0, 1, 180deg);
    -ms-transform: rotate3d(0, 0, 1, 180deg);
    -o-transform: rotate3d(0, 0, 1, 180deg);
    transform: rotate3d(0, 0, 1, 180deg);
  }

  .corner-t:before {
    top: 0;
    left: 0;
  }

  .corner-t:after {
    top: 0;
    right: 0;
    -webkit-transform: rotate3d(0, 1, 0, 180deg);
    -moz-transform: rotate3d(0, 1, 0, 180deg);
    -ms-transform: rotate3d(0, 1, 0, 180deg);
    -o-transform: rotate3d(0, 1, 0, 180deg);
    transform: rotate3d(0, 1, 0, 180deg);
  }

  //endregion
  /***********容器类布局end*********/

  /***********style start*********/
  /***********style start*********/
  //region
  .register {
    color: $highlight;
    font-size: 0.75rem;
    .reg-ratio { //比例
      padding: $interval * .6;
      .reg-ratio-l {
        width: 50%;
        height: 100%;
        padding: 0 $interval * .6;
        text-align: center;
        & > div {
          height: 50%;
          padding-top: $interval * .5;
        }
        .hd-count {
          position: relative;
          border-bottom: 2px solid $highlight;
          div {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            position: absolute;
            left: 0;
            bottom: $interval * .5;
            p {
              flex: 1 1 auto;
            }
          }
        }
        span {
          white-space: nowrap;
          line-height: 1.2rem;
        }
      }
      .reg-ratio-r { //环形图
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        .ratio-circle {
          display: flex;
          align-items: center;
          width: 6vw;
          height: 6vw;
          margin: 0 auto;
          border-radius: 50%;
          & > div {
            flex: auto;
          }
          p {
            text-align: center;
          }
        }
      }
    }
    .reg-an {
      position: relative;
      .reg-an-ech {
        height: 100%;
      }
      .text-label {
        display: flex;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4vw;
        height: 4vw;
        margin: -2vw 0 0 -2vw;
        border-radius: 50%;
        p {
          flex: auto;
          overflow: hidden;
          span {
            display: block;
            text-align: center;
            white-space: nowrap;
          }
        }
      }
      //padding: $interval;
    }
    .big-font {
      font-size: 1.1rem;
    }
    .trend-echa {
      height: 100%;
    }
  }

  .areal {
    padding: $interval * .8;
    color: $highlight;
    .map-echarts {
      width: 55%;
      height: 100%;
    }
    .suitcase {
      width: 45%;
      height: 100%;
      padding: $interval $interval $interval * .4;
      .su-contain {
        position: relative;
        border: 1px solid $highlight;
        border-radius: 10px;
        width: 85%;
        height: calc((100% - #{$interval * 2}) * .5);
        margin-bottom: $interval * 2;
        .headline {
          position: absolute;
          width: 50%;
          height: 25%;
          top: 0;
          left: 50%;
          display: flex;
          align-items: center;
          text-align: center;
          background: $box-bg url("../../static/images/deploy/headline.png") no-repeat;
          background-position: center center;
          -webkit-background-size: contain;
          background-size: contain;
          -webkit-transform: translate3d(-50%, -50%, 0);
          -moz-transform: translate3d(-50%, -50%, 0);
          -ms-transform: translate3d(-50%, -50%, 0);
          -o-transform: translate3d(-50%, -50%, 0);
          transform: translate3d(-50%, -50%, 0);
          span {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
            font-size: 0.8rem;
          }
        }
      }
    }
    .su-cont {
      width: 100%;
      height: 100%;
      padding: 10% 1% 3%;
      text-align: center;
      .wu-cont-c {
        height: 50%;
        .wu-cont-l {
          width: 50%;
          height: 100%;
        }
        p {
          height: 50%;
        }
        p:first-of-type {
          font-size: 1.1rem;
        }
        p:last-of-type {
          font-size: 0.9rem;
          color: #fff;
        }
      }
    }
  }

  .cont-right {
    .bar-wraper {
      height: calc((100% - #{$interval * 2}) / 3);
      margin-bottom: $interval;
      .bar-box {
        width: 100%;
        height: 100%;
      }
    }
  }

  .rank {
    .rank-title {
      height: 10%;
      text-align: center;
      display: flex;
      align-items: center;
      span {
        display: block;
        width: 100%;
        font-size: 0.8rem;
      }
    }
    .rank-cont {
      height: 87%;
      & > li {
        width: 100%;
        height: 20%;
        overflow: hidden;
        padding: $interval * .5;
        .strip {
          border-radius: 2vh;
          height: 4vh;
          background: rgba(12, 18, 42, 1);
          box-shadow: 0 0 4px 1px $lightblur inset;
          .star-wrap, .imp-wrap {
            width: 75%;
            height: 100%;
            padding: 5px 5%;
          }
          .star-wrap {
            span {
              display: block;
              float: left;
              width: 20%;
              height: 100%;
              background: url("../../static/images/deploy/gray.png") no-repeat center center;
              -webkit-background-size: contain;
              background-size: contain;
            }
            .lighten {
              background-image: url('../../static/images/deploy/light.png');
            }
          }
          .strip-text, .imp-text {
            width: 25%;
            height: 100%;
            display: flex;
            align-items: center;
            span {
              color: $orange;
              display: block;
              text-align: center;
              font-size: 0.9rem;
            }
          }
        }
        .firm-name {
          white-space: nowrap;
          font-size: 0.7rem;
          padding-left: 7px;
        }
      }
    }
  }

  .capacity {
    .abi-echarts {
      width: 100%;
      height: 100%;
    }
  }

  .improve {
    @extend .rank;
    .rank-cont {
      .extra {
        padding: 0 4%;
        .firm-name {
          padding: 0;
          line-height: 1.1rem;
        }
      }
    }
    .imp-wrap {
      display: flex;
      align-items: center;
    }
    .imp-wrap span {
      display: block;
      width: calc(100% / 30);
      padding: 0 1px;
      background-clip: content-box;

      height: 80%;
    }
    .imp-text span {
      font-size: 0.9rem !important;
      white-space: nowrap;
    }
  }

  .intro {
    $w: 32vh;
    $h: $w * .5;
    $c: #01a2a1;
    .instru {
      .ins-wraper {
        width: 100%;
        height: 85%;
        border-bottom: 1px solid $c;
        position: relative;
        .ins-img {
          font-size: 0;
          width: $w;
          height: $h;
          position: absolute;
          bottom: 0;
          left: 15%;
          border: {
            left: 10px solid $highlight;
            top: 10px solid $highlight;
            right: 10px solid $highlight;
            top-right-radius: $w * .5;
            top-left-radius: $w * .5;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .ins-arc {
            position: absolute;
            bottom: -1px;
            left: calc(12vh - 10px);
            width: 8vh;
            height: 4vh;
            background: $box-bg;
            border: {
              left: 1px solid $c;
              top: 1px solid $c;
              right: 1px solid $c;
              top-right-radius: 4vh;
              top-left-radius: 4vh;
            }
          ;
          }
        }
        .ins-rotate {
          width: $w;
          height: $h;
          position: absolute;
          bottom: 0;
          left: 15%;
          & > li {
            width: 61%;
            height: 1.5rem;
            line-height: 1.5rem;
            position: absolute;
            bottom: -0.75rem;
            right: 50%;
            transform-origin: right;
            span {
              &:first-of-type {
                display: inline-block;
                font-size: 0.7rem;
                -webkit-transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, -90deg);
                -moz-transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, -90deg);
                -ms-transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, -90deg);
                -o-transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, -90deg);
                transform: translate3d(-50%, 0, 0) rotate3d(0, 0, 1, -90deg);
              }
              &:last-of-type {
                display: block;
                position: absolute;
                right: 35%;
                top: 0;
                height: 1.5rem;
                color: $orange;
                font-size: 0.8rem;
              }
            }
            &:nth-last-of-type(1), &:nth-last-of-type(2), &:nth-last-of-type(3) {
              span:last-of-type {
                -webkit-transform: rotate3d(0, 0, 1, 180deg);
                -moz-transform: rotate3d(0, 0, 1, 180deg);
                -ms-transform: rotate3d(0, 0, 1, 180deg);
                -o-transform: rotate3d(0, 0, 1, 180deg);
                transform: rotate3d(0, 0, 1, 180deg);
              }
            }
          }
        }
      }
    }
    /*for循环生成不同旋转角度*/
    @for $i from 1 through 6 {
      .ins-rotate {
        li:nth-of-type(#{$i}) {
          $deg: calc(31.2deg * #{$i - 1} + 12deg);
          -webkit-transform: rotate3d(0, 0, 1, $deg);
          -moz-transform: rotate3d(0, 0, 1, $deg);
          -ms-transform: rotate3d(0, 0, 1, $deg);
          -o-transform: rotate3d(0, 0, 1, $deg);
          transform: rotate3d(0, 0, 1, $deg);
        }
      }
    }
    .small-instru {

    }
  }

  .progress-box {
    width: 100%;
    height: 100%;
  }

  //endregion
  /***********style end*********/

  @media screen and (max-width: 1170px) {
    /*variable*/
    $nav-height: 75px; //顶部log高度
    $main-height: 875px; //main容器高度
    $interval: 20.5px; //main-box间隙

    html, body {
      font-size: 18px;
    }

    .full-box {
      background: #111;
      width: 1850px;
      height: 950px;
    }

    /***********容器类布局start*********/
    /***********容器类布局start*********/
    //region

    /*header*/
    .nav-header {
      height: $nav-height;
      margin-bottom: -$interval;
      text-align: center;
      .logo-wrap, img {
        height: 100%;
      }
    }

    /*main*/
    .container {
      height: calc(#{$main-height} + #{$interval});
      padding: $interval;
      .cont-wrap {
        height: calc((#{$main-height} - #{$interval} * 2) / 2);
        &:nth-of-type(1) {
          margin-bottom: $interval;
        }
      }
      .cont-left {
        width: calc((100% - #{$interval}) * .79);
        height: 100%;
        & > section {
          height: 100%;
        }
        .register {
          width: calc((100% - #{$interval}) * .40);
        }
        .areal {
          width: calc((100% - #{$interval}) * .60);
        }
        .rank {
          width: calc((100% - #{$interval}) * .269706);
          margin-right: $interval * .5;
        }
        .intro {
          width: calc((100% - #{$interval}) * .33);
          .instru {
            height: 62%;
            margin-bottom: $interval * .5;
          }
          .small-instru {
            height: calc(38% - #{$interval * .5});
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            .instru-canv {
              width: 20%;
              height: 80%;
              p {
                height: 20%;
                font-size: 12px;
                text-align: center;
                white-space: nowrap;
              }
            }
          }
        }
        .capacity {
          width: calc((100% - #{$interval}) * .400294);
        }
      }
      .cont-right {
        width: calc((100% - #{$interval}) * .21);
        height: 100%;
      }
    }

    .register {
      .reg-ratio { //比例
        .reg-ratio-r { //环形图
          .ratio-circle {
            width: 112px;
            height: 112px;
          }
        }
      }
    }

    .intro {
      $w: 306px;
      $h: $w * .5;
      $c: #01a2a1;
      .instru {
        .ins-wraper {
          .ins-img {
            width: $w;
            height: $h;
            border: {
              top-right-radius: $w * .5;
              top-left-radius: $w * .5;
            }

            .ins-arc {
              bottom: -1px;
              left: 104px;
              width: 76.5px;
              height: 38.25px;
              border: {
                top-right-radius: 38.25px;
                top-left-radius: 38.25px;
              }
            }
          }
          .ins-rotate {
            width: $w;
            height: $h;
            position: absolute;
            bottom: 0;
            left: 15%;
            & > li {
              width: 61%;
              height: 1.5rem;
              line-height: 1.5rem;
              position: absolute;
              bottom: -0.75rem;
              right: 50%;
              transform-origin: right;
            }
          }
        }
      }

    }

    .rank {
      .rank-cont {
        height: 87%;
        & > li {
          width: 100%;
          height: 20%;
          overflow: hidden;
          padding: $interval * .5;
          .strip {
            border-radius: 19px;
            height: 38px;
          }
        }
      }
    }

    //endregion

  }



</style>









