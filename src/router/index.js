/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 11:46:39
 * @LastEditTime: 2019-08-31 14:04:50
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/login/login'
import Register from '@/page/register/register'
import Index from '@/page/index/index'
import BlogAdd from '@/page/blogadd/blogadd'
import BlogDetail from '@/page/blogdetail/blogdetail'
import Mine from '@/page/mine/mine'
import Follow from '@/page/follow/follow'
import EditInfo from '@/page/editinfo/editinfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      meta: {
        keepAlive: true // 不需要缓存
      },
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blogadd',
      name: 'blogadd',
      component: BlogAdd
    },
    {
      path: '/blogdetail',
      name: 'blogdetail',
      component: BlogDetail
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/follow',
      name: 'follow',
      component: Follow
    },
    {
      path: '/editinfo',
      name: 'editinfo',
      component: EditInfo
    }
  ]
})
