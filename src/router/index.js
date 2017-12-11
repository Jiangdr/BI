import Vue from 'vue'
import Router from 'vue-router'

/****************/
const Main = () => import('@/components/main')
const Test = () => import('@/components/Test')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
