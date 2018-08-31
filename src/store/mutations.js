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

  // 搭配页面
  SETSHOPLIST: (state, value) => {
    state.shopSelectList = value
  }
}
