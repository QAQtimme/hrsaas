import request from '@/utils/request'

export function reLogin(data) {
  return request({
    methods: 'post',
    // url: 'http://localhost:8888/api/sys/login',
    // =>主机名可以省略，自动与浏览器上的主机名拼接
    url: './sys/login',
    data
  })
}

export function reqGetUserInfo(token) {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

export function reqGetUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {

}
