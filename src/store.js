import Vue from 'vue'
import Vuex from 'vuex'
import login from '../src/views/storeLogin'
import acitonMovie from '../src/views/actionMovie/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules:{
    login,
    acitonMovie
  }
})
