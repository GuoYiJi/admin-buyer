import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state: {
    addShopType: [],
    editAdr: '',
    shopGroup: {},
    shopExplan: {},
    shopMatch: []
  },
  getters,
  actions,
  mutations,

  strict: debug
})

export default store
