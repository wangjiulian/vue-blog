/*
 * @Description: In User Settings Editsu
 * @Author: your name
 * @Date: 2019-08-21 14:20:47
 * @LastEditTime: 2019-08-31 13:35:38
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './config/rem'
import { cookie } from './tool/mUtils'
require('./style/reset.scss')
import { LoadingPlugin, ToastPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
import vuxUtil from './tool/vuxUtil'
Vue.use(vuxUtil)
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()
import $ from 'jquery'
import 'bootstrap/js/dist/modal.js'
import 'bootstrap/js/dist/dropdown.js'
import 'bootstrap/js/dist/tooltip.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'summernote/dist/summernote.js'
import 'summernote/dist/summernote.css'
import 'summernote/dist/lang/summernote-zh-CN.js'

Vue.prototype.$cookie = cookie;

Vue.config.productionTip = false
// 路由验证
router.beforeEach((to, from, next) => {
  if (to.path == '/editinfo') {
    if (cookie.get(('login_token')) == null || cookie.get('login_token') == '') {
      //进入登录界面
      next({
        path: '/login'
      })
      return;
    }
    next()
  }
  next();

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
