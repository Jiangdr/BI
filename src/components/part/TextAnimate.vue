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


  // const redraw = (() => {
  //   const factory = () => {
  //   };
  //   Object.assign(factory.prototype, {
  //     config: {
  //       delay: 1000,//首次更新延迟时间
  //       spacing: 1 * 1,//更新时间
  //       padding: 5,//边框最小距离
  //     },//canvas配置
  //     ops: {
  //       id: '',
  //       lists: ['欧阳锋', '小龙女', '欧阳锋', '小龙女', '欧阳锋', '小龙女', '小龙女',],
  //       color: ['#22D7EC', '#F96767', '#F7C62C', '#38A9EB'],
  //     },//配置
  //     init(ops) {
  //       let {config, ops: defaultOps, ops: {color}} = this;
  //       Object.assign(defaultOps, ops);
  //       let canBox = document.getElementById(defaultOps.id),
  //         canEl = document.createElement('canvas');
  //       config.ctx = canEl.getContext('2d');
  //       config.canW = parseFloat(getComputedStyle(canBox, false).width);
  //       config.canH = parseFloat(getComputedStyle(canBox, false).height);
  //       canEl.width = config.canW;
  //       canEl.height = config.canH;
  //       canBox.appendChild(canEl);//添加canvas元素
  //       let div = document.createElement('div');
  //       div.style.cssText = 'width: 10000px; height: 0px; overflow: hidden;';
  //       canBox.appendChild(div);
  //
  //       config.lists = defaultOps.lists.map((list, idx) => {
  //         let span = document.createElement('span');
  //         span.textContent = list;
  //         span.style.cssText = 'font: 16px Arial; padding: 0; display: inline-block;';
  //         div.appendChild(span);
  //         let direction = {
  //           x: (Math.random() > 0.5) ? 1 : -1,
  //           y: (Math.random() > 0.5) ? 1 : -1,
  //         };
  //         return {
  //           id: 'id_' + idx,
  //           cont: list,
  //           color: color[idx % color.length],
  //           width: span.offsetWidth,
  //           height: span.offsetHeight,
  //           point: {x: null, y: null},
  //           direction,
  //         }
  //       })//生成文字标签属性集合
  //       console.log(config);
  //       this.redraw();
  //
  //     },//初始化
  //     redraw() {
  //       // console.time('s')
  //       let {config: {ctx}, config} = this;
  //       // console.log('upload', config);
  //       ctx.clearRect(0, 0, config.canW, config.canH);
  //       config.lists.forEach((list, idx) => {
  //         if (list.point.x === null) {
  //           this.beginPoint(list);//计算起点
  //         } else {
  //           this.move(list);//重置起点，实现移动
  //         }
  //         let {color, point: {x, y}, width, height} = list;
  //
  //         // ctx.fillStyle = '#0f4bac';
  //         // ctx.fillRect(x, y, width, height);
  //
  //         ctx.font = "16px Arial";
  //         ctx.fillStyle = color;
  //         ctx.textAlign = 'center';
  //         ctx.fillText(list.cont, width / 2 + x, height / 2 + y + 4);
  //       })
  //
  //       // console.timeEnd('s')
  //       config.timeout = setTimeout(() => {
  //         clearTimeout(config.timeout);
  //         config.delay = config.spacing;
  //         this.redraw();
  //       }, config.delay)
  //     },//重绘
  //     beginPoint(pram) {
  //       let {config} = this,
  //         randomP = {
  //           x: Math.random() * (config.canW - pram.width - config.padding * 2) + config.padding,
  //           y: Math.random() * (config.canH - pram.height - config.padding * 2) + config.padding,
  //         },
  //         limit = config.lists.every(list => {
  //           let {point} = list;
  //           if (point.x === null) return true;
  //           return !this.isSverlap(randomP.x, randomP.y, pram.width, pram.height, point.x, point.y, list.width, list.height)
  //         });
  //       if (limit) {
  //         Object.assign(pram.point, randomP)
  //       } else {
  //         return this.beginPoint(pram);
  //       }
  //     },//计算起点，去除遮挡、重叠
  //     move({point, point: {x, y}, width, height, direction, id}) {
  //
  //       let {config: {padding, canW, canH, lists}} = this;
  //       /*判断X轴*/
  //       if (x + width > canW - padding || x < padding) {
  //         direction.x *= -1;
  //       } else {
  //         lists.some(list => {
  //           let {
  //             point: {x: tarX, y: tarY},
  //             height: tarH,
  //             width: tarW,
  //             direction: tarD,
  //             id: tarId
  //           } = list;
  //           if (id === tarId) return false;
  //           /*与任一一个文字标签重合时，改变方向和颜色*/
  //           if (this.isSverlap(x, y, width, height, tarX, tarY, tarW, tarH)) {
  //
  //             if (x + width > tarX + 5 && x < tarX + tarW - 5) {
  //               if (y > tarY + tarH - 5) {
  //                 direction.y = 1;
  //                 tarD.y = -1;
  //                 return true
  //               }
  //               if (y + height < tarY + 5) {
  //                 direction.y = -1;
  //                 tarD.y = 1;
  //                 return true
  //               }
  //             }
  //             if (y + height > tarY + 5 && y < tarY + tarH - 5) {
  //               if (x + width < tarX + 5) {
  //                 direction.x = -1;
  //                 tarD.x = 1;
  //                 return true
  //               }
  //               if (x > tarX + tarW -5) {
  //                 direction.x = 1;
  //                 tarD.x = -1;
  //                 return true
  //               }
  //             }
  //             direction.x *= -1;
  //             direction.y *= -1;
  //             tarD.x *= -1;
  //             tarD.y *= -1;
  //             return true
  //           }
  //           return false;
  //         })
  //       }
  //       /*判断Y轴*/
  //       if (y + height > canH - padding || y < padding) {
  //         direction.y *= -1;
  //       }
  //       point.x += 0.05 * direction.x;
  //       point.y += 0.05 * direction.y;
  //     },
  //     isSverlap(x, y, w, h, x1, y1, w1, h1) {
  //       if (Math.abs(x1 - x) < (w + w1) /2 && Math.abs(y1 - y) < (h + h1) /2) {
  //         return true;
  //       }
  //       return false;
  //     },
  //     setOption(ops) {
  //       let {config} = this;
  //       console.log(config);
  //     },
  //   })
  //   factory.setOption = factory.prototype.setOption;
  //   return function (op) {
  //     new factory().init(op);
  //   }
  // })();

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
    let setOpt = this.redraw({
      id: this.id
    })
    setTimeout(() => {
      setOpt({
        lists: ['杨过', '杨过', '杨过', '杨过', '杨过',],
        color: ['#22D7EC'],
      })
    }, 4000)
  }

  /**
   * 绘制canvas
   */
  function redraw(op) {
    const factory = () => {
    };
    Object.assign(factory.prototype, {
      config: {
        delay: 1000,//首次更新延迟时间
        spacing: 1 * 1,//更新时间
        padding: 5,//边框最小距离
      },//canvas配置
      ops: {
        id: '',
        lists: ['欧阳锋', '小龙女', '欧阳锋',],
        color: ['#22D7EC', '#F96767', '#F7C62C', '#38A9EB'],
      },//配置
      init(ops) {
        let {config, ops: defaultOps, ops: {color}} = this;
        Object.assign(defaultOps, ops);
        let canBox = document.getElementById(defaultOps.id),
          canEl = document.createElement('canvas');
        config.ctx = canEl.getContext('2d');
        config.canW = parseFloat(getComputedStyle(canBox, false).width);
        config.canH = parseFloat(getComputedStyle(canBox, false).height);
        canEl.width = config.canW;
        canEl.height = config.canH;
        canBox.appendChild(canEl);//添加canvas元素
        config.div = document.createElement('div');
        config.div.style.cssText = 'width: 10000px; height: 0px; overflow: hidden;';
        canBox.appendChild(config.div);
        config.lists = defaultOps.lists.map((list, idx) => {
          return Object.assign({
            id: 'id_' + idx,
            cont: list,
            color: color[idx % color.length],
            point: {x: null, y: null},
            direction: {
              x: (Math.random() > 0.5) ? 1 : -1,
              y: (Math.random() > 0.5) ? 1 : -1,
            },
          }, this.computeSize(list))
        })//生成文字标签属性集合
        console.log(config);
        this.redraw();
        return ({lists, color: setClr}) => {
          if (setClr) color = setClr;
          lists.forEach((list, idx) => {
            if (config.lists[idx]) {
              Object.assign(config.lists[idx], {
                cont: list,
                color: color[idx % color.length],
              }, this.computeSize(list))
            } else {
              config.lists.push(Object.assign({
                id: 'id_' + idx,
                cont: list,
                color: color[idx % color.length],
                point: {x: null, y: null},
                direction: {
                  x: (Math.random() > 0.5) ? 1 : -1,
                  y: (Math.random() > 0.5) ? 1 : -1,
                },
              }, this.computeSize(list)))
            }
          })
        };
      },//初始化
      redraw() {
        // console.time('s')
        let {config: {ctx}, config} = this;
        // console.log('upload', config);
        ctx.clearRect(0, 0, config.canW, config.canH);
        config.lists.forEach((list, idx) => {
          if (list.point.x === null) {
            this.beginPoint(list);//计算起点
          } else {
            this.move(list);//重置起点，实现移动
          }
          let {color, point: {x, y}, width, height} = list;

          // ctx.fillStyle = '#ffba6c';
          // ctx.fillRect(x, y, width, height);

          ctx.font = "16px Arial";
          ctx.fillStyle = color;
          ctx.textAlign = 'center';
          ctx.fillText(list.cont, width / 2 + x, height / 2 + y + 4);
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
            if (point.x === null) return true;
            return !this.isSverlap(randomP.x, randomP.y, pram.width, pram.height, point.x, point.y, list.width, list.height)
          });
        if (limit) {
          Object.assign(pram.point, randomP)
        } else {
          return this.beginPoint(pram);
        }
      },//计算起点，去除遮挡、重叠
      move({point, point: {x, y}, width, height, direction, id}) {

        let {config: {padding, canW, canH, lists}} = this;
        /*判断X轴*/
        if (x + width > canW - padding || x < padding) {
          direction.x *= -1;
        } else {
          lists.some(list => {
            let {
              point: {x: tarX, y: tarY},
              height: tarH,
              width: tarW,
              direction: tarD,
              id: tarId
            } = list;
            if (id === tarId) return false;
            /*与任一一个文字标签重合时，改变方向和颜色*/
            if (this.isSverlap(x, y, width, height, tarX, tarY, tarW, tarH)) {

              if (x + width > tarX + 5 && x < tarX + tarW - 5) {
                if (y > tarY + tarH - 5) {
                  direction.y = 1;
                  tarD.y = -1;
                  return true
                }
                if (y + height < tarY + 5) {
                  direction.y = -1;
                  tarD.y = 1;
                  return true
                }
              }
              if (y + height > tarY + 5 && y < tarY + tarH - 5) {
                if (x + width < tarX + 5) {
                  direction.x = -1;
                  tarD.x = 1;
                  return true
                }
                if (x > tarX + tarW - 5) {
                  direction.x = 1;
                  tarD.x = -1;
                  return true
                }
              }
              direction.x *= -1;
              direction.y *= -1;
              tarD.x *= -1;
              tarD.y *= -1;
              return true
            }
            return false;
          })
        }
        /*判断Y轴*/
        if (y + height > canH - padding || y < padding) {
          direction.y *= -1;
        }
        point.x += 0.05 * direction.x;
        point.y += 0.05 * direction.y;
      },
      isSverlap(x, y, w, h, x1, y1, w1, h1) {
        if (Math.abs(x1 - x) < (w + w1) / 2 && Math.abs(y1 - y) < (h + h1) / 2) {
          return true;
        }
        return false;
      },
      computeSize(text) {
        let {config: {div}} = this;
        let span = document.createElement('span');
        span.textContent = text;
        span.style.cssText = 'font: 16px Arial; padding: 0; display: inline-block;';
        div.appendChild(span);
        return {
          width: span.offsetWidth,
          height: span.offsetHeight,
        }
      },
    })
    Object.assign(redraw, {
      setOption: factory.prototype.setOption
    })
    return new factory().init(op);
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
