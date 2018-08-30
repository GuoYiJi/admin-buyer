import http from './http'
export default class order {
  //接口命名加上l前缀，如 l_require = params => http.post('xxx',params)
  //查询订单   2018-08-18  pql
  // 创建优惠券
  newCoupon = params => http.post('api/coupon/save', params)
  // 我的优惠券
  myCoupon = params => http.post('api/coupon/pageByCreate', params)
  // 推广链接
  prosave = params => http.post('api/form/save', params)
  prometaList = params => http.post('api/form/metaList', params)
}
