import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home.vue'
import login from '@/components/login.vue'
import bsindex from '@/components/backstage/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/index',
      name:'index',
      component:bsindex,
      meta:{
        needlogin:true
      }
    }
  ]
})
