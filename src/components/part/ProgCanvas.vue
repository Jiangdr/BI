<template>
  <div class="progress-box">
    <canvas class="pro-canvas"></canvas>
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
          drawing: '',
        }
    }

    //endregion

    /******************/
    /******************/
    //region    //export

    export default {
        data, mounted,
        methods: {
          init,
        },
        props: {
          idx: {
            type: String,
            required: true,
            default: '0',
          },//组件在页面的序号
          ratio: {
            type: Number,
            default: 0,
            validator(v) {
              return v <= 1 && v >= 0;
            },
          },//比例
          color: {
            type: String,
            default: '#01fffe',
          },//颜色
          intro: {
            required: true,
          },//图例文字
          holder: {
            default: null
          },//图例文字
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
      this.drawing = this.init();
      this.drawing();

    }


    function init() {
      let parEl = document.getElementsByClassName('progress-box')[this.idx].parentNode,
        can_w = parseInt(getComputedStyle(parEl, false).width),
        can_h = parseInt(getComputedStyle(parEl, false).height),
        canvas = document.getElementsByClassName('pro-canvas')[this.idx];
      let ctx = canvas.getContext('2d');
      return () => {
        let {ratio, intro, color, holder} = this;
        let text = holder !== null ? holder : Math.round(ratio * 10000) / 100 + '%';
        ctx.canvas.width = can_w;
        ctx.canvas.height = can_h;
        let w = can_w * 0.5, h = can_h * 0.5;//中心点坐标
//      绘制背景
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.arc(w, h, Math.min(w, h) - 0.5, 0, 2 * Math.PI);
        ctx.stroke();
//      绘制比例
        if (ratio !== 0) {
          ctx.beginPath();
          ctx.lineWidth = 7;
          ctx.strokeStyle = color;
          ctx.arc(w, h, Math.min(w, h) - 3.5, -0.5 * Math.PI, (2 * ratio - 0.5) * Math.PI);
          ctx.stroke();
        }
//      绘制文字
        ctx.font="16px sans-serif";
        ctx.fillStyle = color;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(text, w, h - 5);

        ctx.font="12px sans-serif";
        ctx.fillStyle = color;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(intro, w, h + 10);

      }
    }


    //endregion

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
