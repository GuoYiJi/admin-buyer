export default {
  ADDSHOPTYPE: (state,data)=>{
    state.addShopType = data
  },
  EDITADR: (state,data)=>{
    state.editAdr = data
  },
  ADDSHOPGROUP: (state,data)=>{
    state.shopGroup = data
  },
  ADDSHOPEXPLAN: (state,data) => {
    state.shopExplan = data
  },
  ADDMATCH: (state,data) =>{
    state.shopMatch = data
  },
  SPLICEMATCH: (state, index) => {
    state.shopMatch.splice(index, 1)
  }

}
