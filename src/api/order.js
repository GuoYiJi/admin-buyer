import http from './http'
export default class order {
  // 接口命名加上l前缀，如 l_require = params => http.post('xxx',params)
  // 查询订单   2018-08-18  pql
  L_selectOrderPage = params => http.post('api/order/selectOrderPage', params)
  goodsAddChildren = params => http.post('api/order/goods/addChildren', params, {
    headers: { 'content-type': 'application/json' }
  })
  // 订单详情
  L_selectOrderDetail = params => http.post('api/order/selectOrderDetail', params)
  // 售后列表
  L_selectOrderRefund = params => http.post('api/order/refund/selectOrderRefund', params)
  // 筛选发货人
  L_selectDeliverName = params => http.post('api/order/selectReceiptName', params)
  // 拆单
  L_addChildren = params => http.post('api/order/addChildren', params)
  // 发货
  L_deliverGoods = params => http.post('api/order/deliverGoods', params)
  // api/order/refund/dealWithOrderRefund
  L_dealWithOrder = params => http.post('api/order/refund/dealWithOrderRefund', params)
  // api/order/goods/selectOrderGoods
  L_selectOrderGoods = params => http.post('api/order/goods/selectOrderGoods', params)
  // 查询采购入库商品
  L_OrderAddress = params => http.post('api/order/address/selectOrderAddress', params)
  // api/order/shopClose
  // 查询采购入库商品
  L_shopClose = params => http.post('api/order/shopClose', params)
  // api/order/surePayapi/order/surePay 确认收款
  L_surePay = params => http.post('api/order/surePay', params)
  // async/api/order/selectLogistics 查看物流
  L_selectLogistics = params => http.post('api/order/selectLogistics', params)
  // api/goods/selectGoodsDetail 商品详情
  L_selectGoodsDetail = params => http.post('api/goods/selectGoodsDetail', params)
  // api/goods/add
  // api/freight/findFreight
  L_findFreight = params => http.post('api/freight/findFreight', params)
  //订单详情
  //api/goods/add
  L_addOrder = params => http.post('api/goods/add', params)
  //查看子订单拼团
  L_selectPingChildrenOrder = params => http.post('api/order/selectPingChildrenOrder', params)
  //售后详情
  L_selectOrderRefundDetail = params => http.post('/api/order/refund/selectOrderRefundDetail', params)
  //退货退款sureReundapi/order /refund/sureReund
  L_sureReund = params => http.post('/api/order/refund/sureReund', params)

  s_getImg = params => http.post('api/img/getImg', params)
  //api/warehouse/changeExpress
  L_changeExpress = params => http.post('api/warehouse/changeExpress', params)
  // 采购入库编辑
  s_addChildren = params => http.post('api/order/goods/addChildren', params)
  // 查看物流信息
  s_getOrderRefundDetail = params => http.post('api/order/refund/orderRefundDetail', params)

  // 直接退款
  shopRefund = params => http.post('api/order/refund/shopRefund', params)
}
