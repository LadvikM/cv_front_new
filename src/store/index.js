import { createStore } from 'vuex'
import authModule from './modules/authentication/index'
import alertModule from './modules/alert/index'
import educationModule from './modules/education/index'


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
    education: educationModule,
  }
})
