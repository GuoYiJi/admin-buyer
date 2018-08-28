const my = [
  {
    path: '/pages/my/my',
    config: {
      navigationBarBackgroundColor: '#FA8134'
      // navigationBarTitleText: '',
      // 'usingComponents': {
      //   'i-message': '/iview/message/index',
      // }
    }
  },{
    path: '/pages/my/connect',
    config: {
      navigationBarTitleText: '汇提客服',
    }
  },{
    path: '/pages/my/invate/invate',
    config: {
      navigationBarTitleText: '邀约有奖',
    }
  },{
    path: '/pages/my/invate/invateDetail',
    config: {
      navigationBarTitleText: '申请小程序',
    }
  },{
    path: '/pages/my/newPoint/newPoint',
    config: {
      navigationBarTitleText: '新手指南',
    }
  },{
    path: '/pages/my/newPoint/pointDetail',
    config: {
      navigationBarTitleText: '指南详情',
    }
  },{
    path: '/pages/my/setting/setting',
    config: {
      navigationBarTitleText: '设置',
    }
  },{
    path: '/pages/my/setting/bindPhone',
    config: {
      navigationBarTitleText: '修改绑定手机号',
    }
  },{
    path: '/pages/my/setting/changePhone',
    config: {
      navigationBarTitleText: '更换绑定',
      'usingComponents': {
        'i-message': '/iview/message/index',
      }
    }
  },
]
module.exports = my