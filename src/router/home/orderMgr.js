const orderMgr = [{
        path: '/pages/home/orderMgr/orderMgr',
        // name: 'orderMgr',
        config: {
            navigationBarTitleText: '订单管理',
            enablePullDownRefresh: true,
            'usingComponents': {
                // 'i-input-number': '/iview/input-number/index',
                // 'i-panel': '/iview/panel/index',
                // 'i-button': '/iview/button/index',
                // 'i-radio': '/iview/radio/index',
                'i-modal': '/iview/modal/index',
                'i-message': '/iview/message/index',
                'zan-loadmore': '/zan-weapp/dist/loadmore/index'
            }
        }
    },
    // 物流详情
    {
      path: '/pages/home/orderMgr/logisticsDetail',
      config: {
          navigationBarTitleText: '查看物流'
      }
    },
    // 订单详情
    {
        path: '/pages/home/orderMgr/orderdetails',
        config: {
            navigationBarTitleText: '订单详情'
        }
    },
    // 代付款
    {
        path: '/pages/home/orderMgr/obligations/obligations',
        config: {
            navigationBarTitleText: '订单详情'
        }
    },
    {
        path: '/pages/home/orderMgr/orderdetail',
        config: {
            navigationBarTitleText: '订单详情',
            'usingComponents': {
                'i-modal': '/iview/modal/index',
                'i-message': '/iview/message/index',
            }
        }
    },
    {
        path: '/pages/home/orderMgr/orderRefundDetail',
        config: {
            navigationBarTitleText: '订单详情',
            enablePullDownRefresh: true,
            'usingComponents': {
                'i-modal': '/iview/modal/index',
            }
        }
    },
    {
        path: '/pages/home/orderMgr/obligations/collect',
        config: {
            navigationBarTitleText: '订单详情'
        }
    },
    {
        path: '/pages/home/orderMgr/obligations/collectPerson',
        config: {
            navigationBarTitleText: '订单详情'
        }
    },
    {
        path: '/pages/home/orderMgr/obligations/obligationsPerson',
        config: {
            navigationBarTitleText: '订单详情'
        }
    },
    // 拼团
    {
        path: '/pages/home/orderMgr/collage/mailingCollage',
        config: {
            navigationBarTitleText: '订单详情'
        }
    },
    {
        path: '/pages/home/orderMgr/collage/collect',
        config: {
            navigationBarTitleText: '订单详情'
        }
    },
    // 物流详情
    {
        path: '/pages/home/orderMgr/mail/logistics',
        config: {
            navigationBarTitleText: '物流详情'
        }
    },
    // 商品详情
    {
        path: '/pages/home/orderMgr/orderList',
        config: {
            navigationBarTitleText: '商品详情'
        }
    },
    // 子订单
    {
        path: '/pages/home/orderMgr/suborders/suborders',
        config: {
            navigationBarTitleText: '订单详情'
        }
    },
    // 邮寄待发货--主订单
    {
        path: '/pages/home/orderMgr/mail/delivery',
        config: {
            navigationBarTitleText: '订单详情',
            'usingComponents': {
                'i-input-number': '/iview/input-number/index',
                'i-panel': '/iview/panel/index',
                'i-button': '/iview/button/index',
                'i-radio-group': '/iview/radio-group/index',
                'i-radio': '/iview/radio/index'
            }
        },
    }
]

module.exports = orderMgr
