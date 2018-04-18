import axios from 'axios'
import {getToken} from './auth'

// 创建 http 实例
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

http.interceptors.request.use(function (config) {
  if (config.url !== '/login') {
    config.headers.Authorization = getToken()
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 1.定义插件
const httpPlugin = {}

// 2.添加成员
httpPlugin.install = function (Vue, options) {
  // 3.添加实例方法
  Vue.prototype.$http = http
}

// 4.导出插件对象
export default httpPlugin
