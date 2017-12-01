<template>
  <div>
    <div v-for="item in items">
      <div  v-for="obj in item.arr">
        <input type="text" v-if="obj.bool">
        <button @click="change(obj)">12313</button>
      </div>


    </div>
  </div>

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
          items: [
            {
              arr: [
                {
                  bool: true,
                }
              ]
            },

            {
              arr: [
                {
                  bool: false,
                },
              ]
            }
          ]
        }
    }

    //endregion

    /******************/
    /******************/
    //region    //export

    export default {
        data, mounted,
        methods: {
          change(obj) {
            obj.bool = !obj.bool;
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

    }

    //endregion

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
