const users = [
  {
    path: '/pages/users/index',
    // name: 'login',
    config: {
      navigationBarTitleText: '权限管理',
      'usingComponents': {
        'zan-tab': '/zan-weapp/dist/tab/index',
        'i-message': '/iview/message/index',
      }
    }
  },
  {
    path: '/pages/users/add/index',
    // name: 'login',
    config: {
      navigationBarTitleText: '添加权限',
      'usingComponents': {
        'zan-tab': '/zan-weapp/dist/tab/index',
        'i-message': '/iview/message/index',
      }
    }
  }
]
module.exports = users