import Vue from 'vue'
import Router from 'vue-router'
// 登录组件
import Login from '@/components/login/login'
// home组件
import Home from '@/components/home/home'
// 用户列表
import UserList from '@/components/user-list/user-list'
// 角色列表
import RoleList from '@/components/role-list/role-list'
// 权限列表
import RightsList from '@/components/rights/rights-list'
// 商品列表
import ProdcutList from '@/components/product/product-list'

import {getUserInfo} from '@/assets/js/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'role-list',
          path: '/roles',
          component: RoleList
        },
        {
          name: 'rights-list',
          path: '/rights',
          component: RightsList
        },
        {
          name: 'product-list',
          path: '/categories',
          component: ProdcutList
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!getUserInfo()) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  }
})
export default router
