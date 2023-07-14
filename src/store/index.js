import { createStore } from 'vuex'
import authModule from './modules/authentication/index'



export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule,
  }
})
