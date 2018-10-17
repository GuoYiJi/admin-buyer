const home = [{
        path: '/pages/home/home',
        name: 'home',
        config: {
            navigationBarTitleText: '店铺',
            // enablePullDownRefresh: true,
            navigationBarBackgroundColor: '#FA8134',
            navigationBarTextStyle: 'white'
        }
    },
    {
        path: '/pages/home/allData',
        config: {
            navigationBarTitleText: '数据统计',
            navigationBarBackgroundColor: '#FA8134',
            navigationBarTextStyle: 'white'
        }
    },
]
const storeMgr = require('./home/storeMgr')
const shopMgr = require('./home/shopMgr')
const orderMgr = require('./home/orderMgr')
const marketingMgt = require('./home/marketingMgt')
const buyIn = require('./home/buyIn')
const addShop = require('./home/addShop')
const homes = [].concat(home, storeMgr, shopMgr, marketingMgt, buyIn, addShop, orderMgr)
module.exports = homes
