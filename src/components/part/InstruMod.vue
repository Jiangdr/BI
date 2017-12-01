<template>
  <section class="instru corner-t">
    <div class="ins-wraper">
      <div class="ins-img">
        <img src="../../../static/images/deploy/instru.png">
        <div class="ins-arc"></div>
      </div>
      <ul class="ins-rotate">
        <li v-for="(itm, idx) in items" :key="idx">
          <span>{{itm.name}}</span>
          <span>{{itm.cont}}</span>
        </li>
      </ul>
    </div>
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
    return {}
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
          return arr.length === 6;
        },
      }
    }
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
