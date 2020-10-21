//基于axios封装的请求模块
import axios from 'axios'
import Vue from 'vue'
import {
  MessageBox,
  Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const instance = axios.create({
  //api代理
  //baseURl: process.env.NODE_ENV === 'production' ? '/' : '/api',
  baseURL: 'http://139.196.148.44:8888/',
  timeout: 5000
})
instance.interceptors.request.use(config => {
  NProgress.start()
  // console.log(config)
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
instance.interceptors.response.use(config => {
  NProgress.done()
  return config
})
//导出
export default instance
