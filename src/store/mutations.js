export default {
  ADDSHOPTYPE: (state, data) => {
    state.addShopType = data
  },
  EDITADR: (state, data) => {
    state.editAdr = data
  },
  ADDSHOPGROUP: (state, data) => {
    state.shopGroup = data
  },
  ADDSHOPEXPLAN: (state, data) => {
    state.shopExplan = data
  },

  // 搭配页面
  ADDMATCH: (state, data) => {
    state.shopMatch = data
  },
  SPLICEMATCH: (state, index) => {
    state.shopMatch.splice(index, 1)
    // state.shopMatch[index] = {goodsId: '0'}
  },
  PUSHMATCH: (state, item) => {
    state.shopMatch.push(item)
  },

  // 拼团
  DELETE_ROUNPPRICE: (state, value) => {
    state.shopSelectList = value
  },
  ADD_ROUNPPRICE(state, list) {
    state.shopSelectList = [].concat(list);
  },

  PUSTROUNPPRICE: (state, value) => {
    state.shopSelectList.push(value)
  },
  SPLICEROUNPPRICE: (state, index) => {
    state.shopSelectList.splice(index, 1)
  },
  SETROUNPPRICE: (state, index, value) => {
    state.shopSelectList[index] = value
  },

  // 折扣
  PUSTDISOUNTPRICE: (state, value) => {
    state.discountSelectList.push(value)
  },
  SPLICEDISOUNTPRICE: (state, index) => {
    state.discountSelectList.splice(index, 1)
  },
  SETDISOUNTPRICE: (state, index, value) => {
    state.discountSelectList[index] = value
  },

  ADD_GOODS_DETAIL(state, data) {
    state.goodsDetail = data;
  },
  UPDATE_GOODS_DETAIL(state, data) {
    state.goodsDetail = Object.assign({}, state.goodsDetail, data);
  }
}
