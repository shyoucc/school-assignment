import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import login from '@/view/login'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    name: 'index',
    component: index
  },
  {
    path: '*',
    redirect: '/login'
  }
]

let router = new Router({
  mode: 'history',
  base: __dirname,
  routes: routes
})

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('vue-koa-todo')
  if (to.path === '/') {
    if (token !== 'null' && token != null) {
      next('/index')
    }
    next()
  } else {
    if (token !== 'null' && token !== null) {
      // 全局设定header的token验证，注意Bearer后有个空格
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
      next()
    } else {
      next('/')
    }
  }
})

export default router
