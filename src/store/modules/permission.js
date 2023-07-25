import { constantRoutes, asyncRoutes } from '@/router'

const state = () => ({
  return: {
    routes: constantRoutes
  }
})

const mutations = {
  setRoutes(state, otherRoutes) {
    state.routes = [...constantRoutes, ...otherRoutes]
  }
}

const actions = {
  async filterRouter(context, menus) {
    const otherRoutes = asyncRoutes.filter(item => {
      if (menus.includes(item.children[0].name)) {
        return true
      } else {
        return false
      }
    })
    // otherRouters= [socialRouter,attentionRouter,otherRouter]
    context.commit('setRoutes', otherRoutes)
    return otherRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
