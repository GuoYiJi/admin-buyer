import http from './http'
export default class order {
    //接口命名加上l前缀，如 l_require = params => http.post('xxx',params)
    //查询订单   2018-08-18  pql
    L_selectOrderPage = params => http.post('api/order/selectOrderPage', params)
        //订单详情
    L_selectOrderDetail = params => http.post('api/order/selectOrderDetail', params)
        //售后列表
    L_selectOrderRefund = params => http.post('api/order/refund/selectOrderRefund', params)
        //筛选
    L_selectDeliverName = params => http.post('api/order/selectDeliverName', params)
        // 拆单
    L_addChildren = params => http.post('api/order/addChildren', params)
        //发货
    L_deliverGoods = params => http.post('api/order/deliverGoods', params)
        //api/order/refund/dealWithOrderRefund
    L_dealWithOrder = params => http.post('api/order/refund/dealWithOrderRefund', params)
        //api/order/goods/selectOrderGoods
    L_selectOrderGoods = params => http.post('api/order/goods/selectOrderGoods', params)
        ///查询采购入库商品
    L_OrderAddress = params => http.post('api/order/address/selectOrderAddress', params)
        //api/order/shopClose
        //查询采购入库商品
    L_shopClose = params => http.post('api/order/shopClose', params)
        //api/order/surePayapi/order/surePay 确认收款
    L_surePay = params => http.post('api/order/surePay', params)
<<<<<<< HEAD
        //async/api/order/selectLogistics 查看物流
    L_selectLogistics = params => http.post('api/order/selectLogistics', params)
        //api/goods/selectGoodsDetail 商品详情
    L_selectGoodsDetail = params => http.post('api/goods/selectGoodsDetail', params)
=======
        //api/goods/add
    L_addOrder = params => http.post('api/goods/add', params)
>>>>>>> Jchan





}