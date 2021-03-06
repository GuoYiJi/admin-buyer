import http from './http'
import jsonHttp from './jsonHttp'
import qs from 'qs'
export default class shopMgr {
  //shopMgr
  addShop = params => http.post('api/goods/add', params, {
    headers: {'Content-Type': 'application/json'}
  })
  addShopTag = params => http.post('api/label/data/addTag', params)

  editShop = params => http.post('api/goods/edit', params, {
    headers: {'Content-Type': 'application/json'}
  })
  deleteGoods = params => http.post('api/goods/deleteGoods', params, {
    header: {'Content-Type': 'application/x-www-form-urlencoded'}
  });
  //  delShop = params => http.post('',params)
  searchShopState = params => http.post('api/goods/pageManage', params)
  searchShopGroup = params => http.post('api/goods/pageManageByLabel', params)

  addShopType = params => http.post('api/goods/addKeu', params)
  delShopType = params => http.post('api/goods/deleteKeu', params)
  editShopType = params => http.post('api/goods/editKeu', params, {
    headers: {'Content-Type': 'application/json'}
  })

  editGroups = params => http.post('api/goods/changeGroups', params)
  changeGroups2 = params => http.post('api/goods/changeGroups2', params)
  switchShop = params => http.post('api/goods/removes', params)

  searchBuyExplan = params => http.post('api/configure/getConfigByType', params)

  // search type
  s_searchType = params => http.post('api/shop/spec/selectSpecAttributeList', params)

  // edit group
  // editGroup = params => http.post('api/goods/changeGroups', params)

  // group 拼团
  s_getShopGroup = params => http.post('api/shop/ping/selectPingGoods', params)
  s_createGroup = params => http.post('api/shop/ping/addPing', params, {
    headers: {'Content-Type': 'application/json'}
  })
  s_getCanGroup = params => http.post('api/shop/ping/selectCanPingGoods', params)

  //搭配
  s_getshopMatch = params => http.post('api/goods/selectMatchGoodsPage', params)
  // 上下架搭配
  s_updateMatchState = params => http.post('api/goods/updateMatchState', params)
  // 添加搭配
  s_addMatch = params => http.post('api/goods/addMatchGoods', params)
  // 店铺信息修改
  warehouse = params => http.post('api/warehouse/updateShop', params)
  // 查询店铺信息
  selectWarehouse = params => http.post('api/warehouse/selectWarehouse', params)
  // 查询统计信息
  statistics = params => http.post('api/warehouse/home', params)

  // 更新搭配
  editMatchGoods = params => http.post('api/goods/editMatchGoods', params)

  // 编辑拼团
  editGroup = params => http.post('api/shop/ping/editPing', params, {
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })

  //创建折扣商品
  addDisGoods = params => http.post('api/goods/addDisGoods', params)
  deletePing = params => http.post('api/shop/ping/deletePing', params)
  //修改折扣价格
  updateDisGoods = params => http.post('api/goods/updateDisGoods', params)

  // 切换物流到付状态
  changeExpressType = params => http.post('api/warehouse/changeExpressType', params)

  // 查询是否已存在置顶商品
  selectTopGoods = params => http.post('api/goods/selectTopGoods', params)
}
