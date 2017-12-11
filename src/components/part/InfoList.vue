<template>
  <section class="cont-tag info-list">
    <ul>
      <li class="item clearFix"
        v-for="(list, idx) in lists"
        :key="idx">
        <p class="fl item-l">{{list.cont}}</p>
        <div class="fr item-r clearFix">
          <span class="item-t fr">{{list.time}}</span>
          <span class="item-src fr">{{list.src}}</span>
        </div>
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
      lists: {
        type: Array,
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

  }

  //endregion

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
