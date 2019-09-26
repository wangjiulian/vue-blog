/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 13:52:01
 * @LastEditTime: 2019-08-28 15:13:54
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'
import  { cookie } from '../tool/mUtils'
import router from '../router'
import {
  baseUrl
} from './env'

//创建Axios
const Service = axios.create({
  baseURL: baseUrl,
  timeout: 5000, //请求超时
  // responseType: 'json' //数据返回格式
})

//request拦截
Service.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    console.log(err);
    new Promise.reject(err)
  }
)

//返回状态判断(添加响应拦截器)
Service.interceptors.response.use(
    response =>{
        let res = response.data;
        let code = res.re_st;
        let msg = res.re_info;
        
        if(code == 'error'){
            return Promise.reject(msg);
        } else if (code == 're_login'){
    
          //清除登录信息
          cookie.remove('login_token')
          cookie.remove('uid')
          router.push({path:'/login'});
        }
    return msg
    },
    err =>{
        //这里处理服务端错误
        console.log('err:' + err);
        return new Promise.reject('出错' + err)
    }
)

export default Service
