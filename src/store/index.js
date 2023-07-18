import { createStore } from 'vuex'
import authModule from './modules/authentication/index'
import alertModule from './modules/alert/index'



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
    alert: alertModule,
  }
})
