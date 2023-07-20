// 权限登录业务
import router from '@/router'
import store from '@/store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由前置守卫
// to:要去的组件对象
// from:从哪个组件来的对象
// next:下一步  next()放行  next(flase)阻止放行   next(路径)跳转
const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  Nprogress.start()
  const token = store.getters.token
  // console.log(to)
  if (token) {
    // token存在
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.state.user.userInfo.userId) {
        await store.dispatch('getUserInfo')
      }
      next()
    }
  } else {
    // token值不存在
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

// 全局的后置守卫
router.afterEach((to, from) => {
  Nprogress.done()
})
