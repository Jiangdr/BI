// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'

Vue.config.productionTip = false
// Vue.config.devtools = true


//global value
import _global from '@/api/global.js'

//Mount global parameters to Vue
Object.defineProperties(Vue.prototype, {
  '_global': {
    get: function () {
      return _global;
    },
  },
  '_echarts': {//Mount echarts to Vue
    get: function () {
      return echarts;
    },
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
