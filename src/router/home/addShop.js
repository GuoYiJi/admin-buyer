const addShop = [
  {
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
  }, {
    path: '/pages/home/addShop/editShop',
    config: {
      'usingComponents': {
        'i-message': '/iview/message/index',
        'i-modal': '/iview/modal/index',
        'i-progress': '/iview/progress/index',
        'i-switch': '/iview/switch/index'
      }
    }
  }
]
module.exports = addShop
