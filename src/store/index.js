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
    goodsDetail: {
    },
    editAdr: '',
    shopGroup: {},
    shopExplan: {},
    shopMatch: [],// 商品搭配页面的集中数据管理
    shopSelectList: [],// 拼团页面的集中数据管理,
    discountSelectList: [],// 折扣页面的集中数据管理
  },
  getters,
  actions,
  mutations,

  strict: debug
})

export default store
