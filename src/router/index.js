import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home.vue'
import login from '@/components/login.vue'
import bsindex from '@/components/backstage/index.vue'
import servertab from '@/components/backstage/pages/servertab.vue'
import serverinfo from '@/components/backstage/pages/serverinfo.vue'
import alarmprocessing from '@/components/backstage/pages/alarmprocessing.vue'
Vue.use(Router)


//解决路由重复报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

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
      redirect: {name: "serverinfo"},
      children:[
        {
          path:'/',
          name:'serverinfo',
          component:serverinfo
        },
        {
          path:'servertab',
          name:'servertab',
          component:servertab
        },
        {
          path:'alarmprocessing',
          name:'alarmprocessing',
          component:alarmprocessing
        }
      ],
      meta:{
        needlogin:true
      }
    }
  ]

})
