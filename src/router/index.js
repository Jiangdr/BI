import Vue from 'vue'
import Router from 'vue-router'

/****************/
//region  //import components
// import Main from '@/components/main'
const Main = () => import('@/components/main')
const Test = () => import('@/components/Test')


//endregion

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/test',
      name: 'test',
      component: Test,

    }
  ]
})
