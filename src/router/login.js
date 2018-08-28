const login = [
  {
    path: '/pages/login/wxLogin',
    // name: 'login',
    config: {
      navigationBarTitleText: '登录',
      'usingComponents': {
        'i-message': '/iview/message/index',
      }
    }
  },
  {
    path: '/pages/login/lForgetPwd',
    // name: 'lForgetPwd',
    config: {
      navigationBarTitleText: '重置密码',
      'usingComponents': {
        'i-message': '/iview/message/index',
      }
    }
  },
]
module.exports = login