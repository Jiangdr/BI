<template>
  <div class="cont-tag hot-topic can-box" :id="id"></div>
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
      canvas: null,
    }
  }

  /**
   * 绘制canvas
   */
  const redraw = (() => {
    const factory = () => {
    };
    Object.assign(factory.prototype, {
      config: {
        delay: 1000,//首次更新延迟时间
        spacing: 10 * 1000,//更新时间
        padding: 5,//边框最小距离
      },//canvas配置
      ops: {
        id: '',
        lists: ['欧阳锋', '小龙女'],
        color: ['#f00', '#f0f', '#f0f', '#f00', '#f00', '#f0f', '#f00'],
      },//配置
      init(ops) {
        let {config, ops: defaultOps} = this;
        Object.assign(defaultOps, ops);
        let canBox = document.getElementById(defaultOps.id),
          canEl = document.createElement('canvas');
        config.ctx = canEl.getContext('2d');
        config.canW = parseFloat(getComputedStyle(canBox, false).width);
        config.canH = parseFloat(getComputedStyle(canBox, false).height);
        canEl.width = config.canW;
        canEl.height = config.canH;
        canBox.appendChild(canEl);
        let div = document.createElement('div');
        div.style.cssText = 'width: 10000px; height: 0px; overflow: hidden;';
        canBox.appendChild(div);

        config.lists = defaultOps.lists.map(list => {
          let span = document.createElement('span');
          span.textContent = list;
          span.style.cssText = 'font: 16px Arial; padding: 0; display: inline-block;';
          div.appendChild(span);
          let direction = {
            x: (Math.random() > 0.5) ? 1 : -1,
            y: (Math.random() > 0.5) ? 1 : -1,
          };
          return {
            cont: list,
            width: span.offsetWidth,
            height: span.offsetHeight,
            point: this.bindProperty({}, direction),
            direction,
          }
        })
        console.log(config);
        this.redraw();
      },//初始化
      redraw() {
        // console.time('s')
        let {config: {ctx}, config, ops} = this;
        // console.log('upload', config);
        ctx.clearRect(0, 0, config.canW, config.canH);
        config.lists.forEach((list, idx) => {
          if (list.point.x === undefined) {
            this.beginPoint(list);//计算起点
          } else {
            this.move(list);//重置起点，实现移动
          }
          let posi = [
            list.point.x,
            list.point.y,
            list.width,
            list.height,
          ];
          // ctx.fillStyle = '#fafffb';
          // ctx.fillRect(...posi);

          ctx.font = "16px Arial";
          ctx.fillStyle = ops.color[idx];
          ctx.textAlign = 'center';
          ctx.fillText(list.cont, posi[2] / 2 + posi[0], posi[3] / 2 + posi[1] + 4);
        })

        // console.timeEnd('s')

        config.timeout = setTimeout(() => {
          clearTimeout(config.timeout);
          config.delay = config.spacing;
          this.redraw();
        }, config.delay)
      },//重绘
      beginPoint(pram) {
        let {config} = this,
          randomP = {
            x: Math.random() * (config.canW - pram.width - config.padding * 2) + config.padding,
            y: Math.random() * (config.canH - pram.height - config.padding * 2) + config.padding,
          },
          limit = config.lists.every(list => {
            let {point} = list;
            if (point === undefined) return true;
            return !(randomP.x + pram.width > point.x && randomP.x < point.x + list.width && randomP.y + pram.height > point.y && randomP.y < point.y + list.height)
          });
        if (limit) {
          Object.assign(pram, {
            point: randomP,
            area: [],
          })
        } else {
          return this.beginPoint(pram);
        }
      },//计算起点，去除遮挡、重叠
      move({point, point: {x, y}, width, height, direction}) {
        let {config: {padding, canW, canH, lists}} = this;
        if (x + width > canW - padding || x < padding) {
          direction.x *= -1;
        }



        if (y + height > canH - padding || y < padding) {
          direction.y *= -1;
        }
        point.x += 0.1 * direction.x;
        point.y += 0.1 * direction.y;
      },
      bindProperty(own = {}, tar = {}) {
        let {config} = this;
        console.log(own, tar);
        Object.defineProperties(own, {
          x: {
            get() {
              return
            },
            set(v) {
              // tar.x = 0;
            },
          }
        })
        return own
      },
    })

    return function (op) {
      new factory().init(op);
    }
  })();
  //endregion

  /******************/
  /******************/
  //region    //export

  export default {
    data, mounted,
    methods: {
      redraw
    },
    props: {
      cont: {
        type: Array,
        required: true,
      },
      id: {
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
    this.redraw({
      id: this.id
    })
  }


  //endregion

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hot-topic {
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>
