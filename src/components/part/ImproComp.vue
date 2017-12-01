<template>
  <section class="cont-right fr improve corner-t">
    <h4 class="rank-title"><span>整改企业排行</span></h4>
    <ul class="rank-cont">
      <li v-for="(item, idx) in items" :key="idx">
        <div class="strip clearFix">
          <div class="imp-wrap fl">
            <span
              v-for="i in calcNum(item.ratio)"
              :style="{backgroundColor: calcBgc(--i)}"
            ></span>
          </div>
          <div class="fl imp-text">
            <span>{{item.num}}</span>
          </div>
        </div>
        <div class="extra clearFix">
          <p class="firm-name fl">{{item.name}}</p>
          <p class="firm-name fr">{{item.bid}}</p>
        </div>

      </li>
    </ul>
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
      bg_color: ['#dfca0c', '#e93c00'],
      max: [233, 60, 0],
      min: [223, 202, 12],
    }
  }

  //endregion

  /******************/
  /******************/
  //region    //export

  export default {
    data, mounted,
    methods: {
      calcNum(r) {
        return parseInt(30 * r);
      },
      calcBgc(i) {//计算span颜色
        let {max, min, count} = this,
          result = '';
        max.forEach((big, idx) => {
          result += parseInt((big - min[idx]) / 29 * i + min[idx]) + ' ,'
        })
        return `rgb(${result.slice(0, -2)})`;
      }
    },
    props: {
      items: {
        type: Array,
        required: true,
        validator(arr) {
          return arr.length === 5;
        },
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

  }

  //endregion

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
