const storeMgr = [
  {
    path: '/pages/home/storeMgr/storeMgr',
    // name: 'storeMgr',
    config: {
      navigationBarTitleText: '店铺管理'
    }
  },
  {
    path: '/pages/home/storeMgr/decorate/msg',
    // name: 'msg',
    config: {
      navigationBarTitleText: '店铺信息'
    }
  },
  {
    path: '/pages/home/storeMgr/decorate/intro',
    // name: 'msg',
    config: {
      navigationBarTitleText: '设置店铺简介'
    }
  },
  {
    path: '/pages/home/storeMgr/decorate/viewTemplet',
    // name: 'msg',
    config: {
      navigationBarTitleText: '选择装修模板'
    }
  },
  {
    path: '/pages/home/storeMgr/decorate/cover',
    // name: 'msg',
    config: {
      navigationBarTitleText: '设置店铺封面'
    }
  },
  {
    path: '/pages/home/storeMgr/decorate/viewCover',
    // name: 'msg',
    config: {
      navigationBarTitleText: '预览店铺封面'
    }
  },
  {
    path: '/pages/home/storeMgr/decorate/templet',
    // name: 'msg',
    config: {
      navigationBarTitleText: '设置店铺简介'
    }
  },

  // sendWay
  {
    path: '/pages/home/storeMgr/sendWay/sendWay',
    // name: 'msg',
    config: {
      navigationBarTitleText: '发货方式',
      'usingComponents': {
        'i-switch': '/iview/switch/index',
        // 'i-icon': '/iview/icon/index',
        // 'i-cell-group': '/iview/cell-group/index',
        // 'i-cell': '/iview/cell/index',
        // 'i-panel': '/iview/panel/index'
      }
    }
  },{
    path: '/pages/home/storeMgr/sendWay/selectTemplet',
    // name: 'msg',
    config: {
      navigationBarTitleText: '选择运费模板',
      'usingComponents': {
        'i-toast': '/iview/toast/index',
      }
    }
  },

  // storeAdr
  {
    path: '/pages/home/storeMgr/storeAdr/storeAdr',
    config: {
      navigationBarTitleText: '商家地址',
      'usingComponents': {
        'i-modal': '/iview/modal/index',
      }
    }
  },{
    path: '/pages/home/storeMgr/storeAdr/addAdr',
    config: {
      navigationBarTitleText: '添加退货地址',
      'usingComponents': {
        'i-switch': '/iview/switch/index',
      }
    }
  },{
    path: '/pages/home/storeMgr/storeAdr/editAdr',
    config: {
      navigationBarTitleText: '编辑退货地址',
      'usingComponents': {
        'i-switch': '/iview/switch/index',
      }
    }
  },{
    path: '/pages/home/storeMgr/decorateTmp',
    config: {
      navigationBarTitleText: '选择装修模板',
    }
  },
]

module.exports = storeMgr
