// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.config.devtools = false


//global value
import _global from '@/api/global.js'

//Mount global parameters to Vue
Object.defineProperty(Vue.prototype, "_global", {
    get: function () {
        return _global;
    }
})

//Mount echarts to Vue
Object.defineProperty(Vue.prototype, "_echarts", {
    get: function () {
        return echarts;
    }
})


// Vue.prototype._global = _global;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
