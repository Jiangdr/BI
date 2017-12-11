<template>
  <main class="full-box">
    <header class="nav-header">
      <figure class="logo-wrap">
        <img src="../../static/images/deploy/herd.png" alt="">
      </figure>
    </header>

    <main class="container">
      <!--top 1-->
      <section class="cont-wrap clearFix cont-t">
        <!--来源网站-->
        <section>
          <h3 class="cont-title">来源网站分析</h3>
          <ring-echarts :chart-data="source" :idx="0"></ring-echarts>
        </section>
        <!--信息列表-->
        <section>
          <h3 class="cont-title">信息列表</h3>
          <info-list :lists="grossInfo"></info-list>
        </section>
        <!--趋势分析-->
        <section>
          <h3 class="cont-title">趋势分析</h3>
          <bar-echarts :chart-data="barData"></bar-echarts>
        </section>
      </section>

      <!--bottom 2-->
      <section class="cont-wrap clearFix cont-b">
        <!--正负面分析-->
        <section>
          <h3 class="cont-title">正负面分析</h3>
          <ring-echarts :chart-data="totalFaced" :idx="1"></ring-echarts>
        </section>
        <!--单个公司分析-->
        <section>
          <h3 class="cont-title">{{singleFaced.name}}</h3>
          <ring-echarts :chart-data="singleFaced" :idx="2"></ring-echarts>
        </section>
        <!--企业信息列表-->
        <section>
          <h3 class="cont-title">企业信息列表</h3>
          <info-list :lists="enterpriseInfo"></info-list>
        </section>
        <!--热点话题-->
        <section>
          <h3 class="cont-title">热点话题</h3>
          <text-animate :cont="hotTopic" id="cav-box"></text-animate>
        </section>
      </section>
    </main>
  </main>
</template>

<script>
  /******************/
  /******************/
  //region    //import
  import axios from 'axios'

  const InfoList = () => import('./part/InfoList.vue');//列表组件
  const BarEcharts = () => import('./part/BarEcharts.vue');//柱状图组件
  const RingEcharts = () => import('./part/RingEcharts.vue');//圆环图组件
  const TextAnimate = () => import('./part/TextAnimate.vue');//文字游动组件

  //endregion

  /******************/
  /******************/
  //region    //initialize

  let data = () => {
    return {
      grossInfo: [
        {
          cont: '中华人民共和国中华人民共和国中华人民共和国',
          src: '天涯论坛',
          time: '08:56',
        },
        {
          cont: '中华人民共和国',
          src: '天涯论坛天涯论坛',
          time: '08:56',
        },
        {
          cont: '中华人民共和国',
          src: '天涯论坛',
          time: '08:56',
        },
      ],//总信息列表
      enterpriseInfo: [
        {
          cont: '中华人民共和国中华人民共和国中华人民共和国',
          src: '天涯论坛',
          time: '08:56',
        },
      ],//企业信息列表
      barData: {
        xAxis: ['11/21', '11/22', '11/23', '11/24', '11/25', '11/26', '11/27'],
        yAxis: [10, 52, 200, 334, 390, 330, 220],
      },//柱状图数据
      source: {
        seriesData: [
          {value: 335, name: '直接'},
          {value: 310, name: '邮件'},
          {value: 234, name: '联盟'},
          {value: 135, name: '视频'},
        ],
        color: ['#22D7EC', '#F96767', '#F7C62C', '#38A9EB'],
      },//来源网站分析
      totalFaced: {
        seriesData: [
          {value: 335, name: '直接'},
          {value: 310, name: '邮件'},
          {value: 234, name: '联盟'},
        ],
        color: ['#28303D', '#F96767', '#F7C62C',],
      },//正负面分析
      singleFaced: {
        name: '惠恩金融资本',
        seriesData: [
          {value: 335, name: '直接'},
          {value: 310, name: '邮件'},
          {value: 234, name: '联盟'},
        ],
        color: ['#28303d', '#F96767', '#F7C62C',],
      },//单个企业分析
      hotTopic: ['银行债券', '银行债券', '银行债券', '银行债券', '银行债券', '银行债券', '银行债券',],
    }
  };


  /******************/
  /******************/
  //region    //export

  export default {
    data, mounted,
    components: {
      InfoList, BarEcharts, RingEcharts, TextAnimate
    },
    methods: {

    },
    computed: {
      list: {
        get() {
          return [1, 2, 3, 4]
        },
      },
    },
    watch: {},
  }
  //endregion

  /******************/
  /******************/
  //region    //function

  /**
   *组件挂载成功执行函数
   */
  function mounted() {
    setTimeout(() => {
      this.list.push(22)
    }, 2000)
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
  $interval: 2vw; //main-box间隙
  /*color*/
  $box-bg: rgba(33, 37, 48, 1); //容器背景色
  $bor-b: rgba(49, 56, 72, 1); //title下边框色
  $font-color: rgb(207, 207, 207); //字体颜色
  /*  $highlight: rgb(1, 255, 254); //高亮色
    $lightblur: rgba(1, 254, 253, .6); //高亮色基础模糊色
    $blue: rgba(0, 142, 216, 1); //蓝色
    $orange: rgba(255, 145, 37, 1); //橙色*/

  .full-box {
    background: #111;
    /*min-width: 1170px;*/
    min-height: 600px;
  }

  /***********容器类布局start*********/
  /***********容器类布局start*********/
  /*region*/
  /*public*/
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
    color: $font-color;
    .cont-wrap {
      width: 100%;
      height: calc((100% - #{$interval * 0.8}) * 0.5);
      &:first-of-type {
        margin-bottom: $interval * 0.8;
      }
      & > section {
        background: $box-bg;
        float: left;
        height: 100%;
        margin-right: $interval * 0.5;
        border-radius: 8px;
      }
    }
    .cont-t {
      & > section {
        width: calc((100% - #{$interval}) * 0.3);
        &:last-of-type {
          width: calc((100% - #{$interval}) * 0.4);
          margin-right: 0;
        }
      }
    }
    .cont-b {
      & > section {
        width: calc((100% - #{$interval * 1.5}) * 0.24);
        &:last-of-type {
          width: calc((100% - #{$interval * 1.5}) * 0.22);
          margin-right: 0;
        }
        &:nth-last-of-type(2) {
          width: calc((100% - #{$interval * 1.5}) * 0.3);
        }
      }
    }
    .cont-title {
      width: 100%;
      height: 36px;
      line-height: 36px;
      padding: 0 $interval * 2 0 $interval * .5;
      border-bottom: 1px solid $bor-b;
      font-size: 1rem;
      font-weight: 300;
      @extend .ellipsis;
    }
    .cont-tag {
      padding: $interval * .3;
      width: 100%;
      height: calc(100% - 36px);
      &.can-box {
        padding: 0;
      }
    }
  }

  /*endregion*/

  /***********容器类布局end*********/

  /***********style start*********/
  /***********style start*********/
  /*region*/
  .info-list {
    ul {
      width: 100%;
      height: 100%;
    }
    .item {
      height: 10%;
      font-size: 0.75rem;
      line-height: 1.1rem;
      .item-l {
        width: 65%;
        @extend .ellipsis;
      }
      .item-r {
        width: 5.6rem;
        text-align: right;
      }
      .item-src {
        width: 60%;
        @extend .ellipsis;
      }
      .item-t {
        padding-left: 5px;
      }
    }
  }

  .ring {
    position: relative;
    .chart {
      width: 100%;
      height: calc(100% - 72px);
    }
    .tag {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 8px 12px;
      width: 100%;
      display: flex;
      & > li {
        flex: auto;
        text-align: center;
        font-size: 0.8rem;
        line-height: 1.2rem;
      }
    }
  }

  .hot-topic {
    position: relative;
    .move {
      position: absolute;
      left: 0;
      line-height: 25px;
      -webkit-animation: move 5s linear infinite alternate;
      -o-animation: move 5s linear infinite alternate;
      animation: move 5s linear infinite alternate;
    }
  }

  /*endregion*/

  /***********style end*********/

  /*************animation*************/

  @keyframes move {
    0% {
      /*top: 0%;*/
    }
    /*0% {*/

    /*}*/
    100% {
      top: 90%;
    }
  }

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



      //endregion

    }


</style>









