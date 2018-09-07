const addShop = [
  {
    path: '/pages/home/addShop/addShop',
    config: {
      navigationBarTitleText: '添加商品',
      'usingComponents': {
        'i-message': '/iview/message/index',
        'i-modal': '/iview/modal/index'
      }
    }
  }, {
    path: '/pages/home/addShop/buyDesc',
    config: {
      navigationBarTitleText: '采购说明'
    }
  }, {
    path: '/pages/home/addShop/addType',
    config: {
      navigationBarTitleText: '规格与库存',
      'usingComponents': {
        // 'i-message': '/iview/message/index',
        // 'i-modal': '/iview/modal/index',
      }
    }
  }
]
module.exports = addShop
