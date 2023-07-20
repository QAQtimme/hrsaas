import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// axios的请求拦截器
// service.interceptors.request.use((config) => {
// const token = store.getters.token
// config.headers.Authorization = 'Bearer.${token}'
// return config
// }, (error) => {
// return Promise.reject(error)
// })·
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    // 如果token存在 注入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const { data: res } = response
  const { message, success } = res
  if (!success) {
    Message.error(message) // 提示错误消息
    return Promise.reject(message) // 业务已经错误了, 应该进catch
  }
  return res
}, (error) => {
  // 失败的响应 4xx  5xx
  if (error.response.status === 401 && error.response.data.code === 10002) {
    // 1.token失效,给用户提示
    Message.error(error.response.data.message)
    // 2.让用户实现退出
    store.dispatch('user/logout')
    // 3.跳转到登录页面
    router.push('/login')
  } else {
    Message.error(error.message)
  }
  return Promise.reject(error)
})

export default service
