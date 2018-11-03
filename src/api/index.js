// 封装httpApi
import http from './http'
// 接口命名规范

// 和路由命名一样，加模块的h后缀
// h_getIndex = params => http.post()
import ADR from './adr.js'
import SHOPMGR from './shopMgr.js'
import ORDER from './order'
import COUPON from './coupon'

function mix (...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    // console.log(mixin)
    copyProperties(Mix.prototype, mixin) // 拷贝实例属性
    copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin)) // 拷贝原型属性
  }
  // console.log(Mix)
  return Mix
}

function copyProperties (target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== 'constructor' &&
      key !== 'prototype' &&
      key !== 'name'
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, desc)
    }
  }
}
// const MIX = mix(new ADR(),new SHOPMGR())
// console.log(new MIX())
class API extends mix(new ADR(), new SHOPMGR(), new ORDER(), new COUPON()) {
  // jiekouTest = params => http.post('api/ads/list',params)
  authLogin = params => http.post('api/account/authLogin', params)
  // search classify group
  searchType = params => http.post('api/label/data/selectLabelList', params)
  searchMarket = params => http.post('api/stall/selectStallList', params)
  // 我的新手指南/邀请有奖
  myArticle = params => http.post('/api/article/list', params)

  addPrivilege = params => http.post('api/privilege/addPrivilege', params)
  selectPrivilege = params => http.post('api/privilege/selectPrivilege', params)
  delPrivilege = params => http.post('api/privilege/delPrivilege', params)
  updateState = params => http.post('api/privilege/updateState', params)

  // 接口命名加上l前缀，如 l_require = params => http.post('xxx',params)
}

export default new API()
