const home = [
  {
    path: '/pages/home/home',
    name: 'home',
    config: {
      // enablePullDownRefresh: true,
      navigationBarBackgroundColor: '#FA8134'
    }
  },
  {
    path: '/pages/home/allData',
    config: {
      navigationBarBackgroundColor: '#FA8134'
    }
  },
]
const storeMgr = require('./home/storeMgr')
const shopMgr = require('./home/shopMgr')
const orderMgr = require('./home/orderMgr')
const marketingMgt = require('./home/marketingMgt')
const buyIn = require('./home/buyIn')
const addShop = require('./home/addShop')
const homes = [].concat(home, storeMgr, shopMgr, orderMgr, marketingMgt,buyIn,addShop)
module.exports = homes
