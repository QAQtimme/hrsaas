/* eslint-disable no-unused-vars */
import { reLogin, reqGetUserDerailById } from '@/api/user'
import { setToken } from '@/utils/auth'
import { reqGetUserInfo } from '@/api/user'
const state = () => {
  return {
    token: 'getToken',
    userInfo: {}
  }
}
const mutations = {
  setToken(state, newToken) {
    state.token = newToken
    setToken(newToken)
  },
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  }
}

const actions = {
  async login(context, data) {
    const res = await reLogin(data)
    // const newToken = res.data.data
    context.commit('setToken', res.data)
  },
  async getUserInfo(context) {
    const res1 = await reqGetUserInfo()
    const res2 = await reqGetUserDerailById(res1.data.userid)
    const baseResult = {
      ...res1.data,
      ...res2.data
    }
    context.commit('setUserInfo', res1.data)
  },
  logout(context) {
    context.commit('setToken', '')
    context.commit('setUserInfo', {})
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
