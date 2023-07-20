// 这个项目没有用到本地存储localstrorage或sessionStorage
// 用的是cookie本地存储
// 原生的cookie获取数据比较麻烦，不建议使用原生的方法
// 可以使用第三方的包帮助快速获取cookie的值

import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
