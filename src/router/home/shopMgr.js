const route = [
  {
    path: '/pages/home/shopMgr/shopMgr',
    config: {
      navigationBarTitleText: '商品管理',
      'usingComponents': {
        'i-drawer': '/iview/drawer/index',
        'i-modal': '/iview/modal/index',
        'i-message': '/iview/message/index',
      }
    }
  },{
    path: '/pages/home/shopMgr/edit',
    config: {
      navigationBarTitleText: '编辑商品',
      'usingComponents': {
        'i-message': '/iview/message/index',
        'i-modal': '/iview/modal/index',
      }
    }
  },{
    path: '/pages/home/shopMgr/detail',
    config: {
      navigationBarTitleText: '商品详情'
    }
  },{
    path: '/pages/home/shopMgr/search',
    config: {
      navigationBarTitleText: '商品搜索'
    }
  },{
    path: '/pages/home/shopMgr/classify',
    config: {
      navigationBarTitleText: '分组'
    }
  },{
    path: '/pages/home/shopMgr/classifyAll',
    config: {
      navigationBarTitleText: '分组'
    }
  },{
    path: '/pages/home/shopMgr/shopList',
    config: {
      navigationBarTitleText: '商品列表',
      'usingComponents': {
        'i-drawer': '/iview/drawer/index',
        'i-modal': '/iview/modal/index',
        'i-message': '/iview/message/index',
      }
    }
  },{
    path: '/pages/home/shopMgr/matchList',
    config: {
      navigationBarTitleText: '商品列表',
      'usingComponents': {
        'i-drawer': '/iview/drawer/index',
        'i-modal': '/iview/modal/index',
      }
    }
  }
  //collage
  ,{
    path: '/pages/home/shopMgr/collage/collageMsg',
    config: {
      navigationBarTitleText: '创建拼团',
      'usingComponents': {
        'i-message': '/iview/message/index',
      }
    }
  },{
    path: '/pages/home/shopMgr/collage/confirmCollage',
    config: {
      navigationBarTitleText: '确认拼团信息'
    }
  },{
    path: '/pages/home/shopMgr/groupSetting',
    config: {
      navigationBarTitleText: '搭配设置',
      'usingComponents': {
        'i-toast': '/iview/toast/index'
      }
    }
  },
  {
    path: '/pages/home/shopMgr/setNewMatch',
    config: {
      navigationBarTitleText: '创建搭配',
      'usingComponents': {
        'i-toast': '/iview/toast/index'
      }
    }
  },
]
module.exports = route
