const marketingMgt = [{
    path: '/pages/home/marketingMgt/marketingMgt',
    // name: 'marketingMgt',
    config: {
      navigationBarTitleText: '营销管理'
    }
  },
  {
    path: '/pages/home/marketingMgt/myCoupon',
    config: {
      navigationBarTitleText: '我的优惠券'
    }
  },
  {
    path: '/pages/home/marketingMgt/couponSetting',
    config: {
      navigationBarTitleText: '优惠券设置'
    }
  },
  {
    path: '/pages/home/marketingMgt/details',
    config: {
      navigationBarTitleText: '优惠券详情'
    }
  },
  {
    path: '/pages/home/marketingMgt/Order/Order',
    config: {
      navigationBarTitleText: '订单金额',
      'usingComponents': {
        'i-switch': '/iview/switch/index',
      }
    }
  },
  {
    path: '/pages/home/marketingMgt/settings/settings',
    config: {
      navigationBarTitleText: '领用设置'
    }
  },
  {
    path: '/pages/home/marketingMgt/settings/settingsT',
    config: {
      navigationBarTitleText: '领用设置'
    }
  },
  {
    path: '/pages/home/marketingMgt/usageSettings/usageSettings',
    config: {
      navigationBarTitleText: '使用设置',
      'usingComponents': {
        'i-switch': '/iview/switch/index',
      }
    }
  },
]

module.exports = marketingMgt
