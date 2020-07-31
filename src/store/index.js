import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  // 用于保存全局共享的数据，不建议直接获取，可通过getters方法获取
  state: state,
  // 用于保存修改全局共享数据的方法
  mutations: mutations,
  // 用于保存触发 mutations 中保存的方法
  actions: actions,
  // 用于获取 state 中的数据
  getters: getters,
  modules: {}
})
