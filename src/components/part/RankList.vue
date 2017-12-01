<template>
  <section class="fl rank corner-t">
    <h4 class="rank-title"><span>风险企业排行</span></h4>
    <ul class="rank-cont">
      <li v-for="(item, idx) in items" :key="idx">
        <div class="strip clearFix">
          <div class="star-wrap fl">
            <span :class="{lighten: i < item.level}" v-for="(v, i) in star"></span>
          </div>
          <div class="fl strip-text">
            <span>{{item.num}}</span>
          </div>
        </div>
        <p class="firm-name">{{item.name}}</p>
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
          star: [0, 1, 2, 3, 4]
        }
    }

    //endregion

    /******************/
    /******************/
    //region    //export

    export default {
        data, mounted,
        methods: {},
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
