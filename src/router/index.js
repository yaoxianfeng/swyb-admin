import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
// import Users from '../components/user/User.vue'
// import Rights from '../components/power/Rights.vue'
// import Roles from '../components/power/Roles.vue'
// import Cate from '../components/goods/Cate.vue'
// import Params from '../components/goods/Params.vue'
// import GoodsList from '../components/goods/List.vue'
// import Add from '../components/goods/Add.vue'
// import Order from '../components/order/Order.vue'
// import Report from '../components/report/Report.vue'
// 路由懒加载
const login = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../views/login.vue')
const Home = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../views/Home.vue')
const Welcome = () => import( /* webpackChunkName: "Login_Home_Welcome" */ '../views/Welcome.vue')
const Users = () => import( /* webpackChunkName: "Users_Rights_Roles" */ '../views/user/User.vue')
const Rights = () => import( /* webpackChunkName: "Users_Rights_Roles" */ '../views/power/Rights.vue')
const Roles = () => import( /* webpackChunkName: "Users_Rights_Roles" */ '../views/power/Roles.vue')
const Cate = () => import( /* webpackChunkName: "Cate_Params" */ '../views/goods/Cate.vue')
const Params = () => import( /* webpackChunkName: "Cate_Params" */ '../views/goods/Params.vue')
const GoodsList = () => import( /* webpackChunkName: "GoodsList_Add" */ '../views/goods/List.vue')
const Add = () => import( /* webpackChunkName: "GoodsList_Add" */ '../views/goods/Add.vue')
const Order = () => import( /* webpackChunkName: "Order_Report" */ '../views/order/Order.vue')
const Report = () => import( /* webpackChunkName: "Order_Report" */ '../views/report/Report.vue')
Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: login
  }, {
    path: '/home',
    component: Home,
    /* name: '首页',
    meta: {
      title: '首页'
    }, */
    redirect: '/Welcome',
    children: [{
      path: '/home',
      component: Welcome
    }, {
      path: '/users',
      component: Users
      /* name: '用户列表',
      meta: {
        title: '用户列表'
      } */
    }, {
      path: '/rights',
      component: Rights
      /*  name: '权限列表',
        meta: { title: '权限列表' } */
    }, {
      path: '/roles',
      component: Roles
      /* name: '角色列表',
      meta: { title: '角色列表' } */
    }, {
      path: '/categories',
      component: Cate
    }, {
      path: '/params',
      component: Params
    }, {
      path: '/goods',
      component: GoodsList
    }, {
      path: '/goods/add',
      component: Add
    }, {
      path: '/orders',
      component: Order
    }, {
      path: '/reports',
      component: Report
    }]
  }
  /* {
  path: '/home',
  component: Home,
  name: '权限管理',
  meta: {
    title: '权限管理'
  },
  children: [

    {
      path: '/rights',
      component: Rights,
      name: '权限列表',
      meta: {
        title: '权限列表'
      }
    },
    {
      path: '/roles',
      component: Roles,
      name: '角色列表',
      meta: {
        title: '角色列表'
      }
    }

  ]
} */
]
const router = new VueRouter({
  routes
})
// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作 next('/login')强制跳转login
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next() // 如果访问的是登录页就直接放行
  // 拿到token
  const tokenStr = window.sessionStorage.getItem('token')
  // 拿到用户信息
  const userinfo = window.sessionStorage.getItem('userinfo')
  console.log(JSON.parse(userinfo))
  if (!tokenStr) return next('/login') // 如果没有登录就是强制到登录页
  next()
})
export default router
