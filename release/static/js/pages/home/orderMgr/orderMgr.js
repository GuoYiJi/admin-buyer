global.webpackJsonp([2],{"+crX":function(t,e,s){"use strict";var i=s("woOf"),o=s.n(i),r=s("//Fk"),a=s.n(r),n=s("qTHA"),d=s("C9rw");e.a={components:{orderCard:d.a},data:function(){return{tag:1,nav:1,orderList:[],asceSale:!1,ascePrice:!1,asceIndex:1,orderType:1,pageNumber:1,pageSize:10,canLoad:!0,showSearch:!0,state:0,isPersonal:0,navData:[{id:1,state:"",text:"全部订单"},{id:2,state:1,text:"待付款"},{id:3,state:9,text:"拼单中"},{id:4,state:5,text:"待发货"},{id:5,state:6,text:"已发货"},{id:6,state:7,text:"已完成"},{id:7,state:8,text:"已关闭"},{id:8,text:"售后"},{id:9,state:2,text:"已取消"}]}},watch:{},methods:{spliceShopList:function(){console.log("父组件事件触发"),this.handleNav(this.tag,this.state)},handleNav:function(t){var e=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return this.showSearch=!0,this.tag=t,this.state=s,this.pageNumber=1,this.orderList=[],1===this.tag?(console.log("查询了全部订单"),void this.$API.L_selectOrderPage({orderType:1,pageNumber:this.pageNumber,pageSize:this.pageSize}).then(function(t){e.orderList=t.data.list})):8===this.tag?(console.log("查询了售后订单"),void this.$API.L_selectOrderRefund({pageNumber:this.pageNumber,pageSize:10,orderType:1}).then(function(t){console.log(t),e.orderList=t.data.list,console.log(e.orderList)})):1!==this.tag&&8!==this.tag?(console.log("查询了相应状态订单"),void this.$API.L_selectOrderPage({state:this.state,orderType:1,pageNumber:this.pageNumber,pageSize:this.pageSize}).then(function(t){e.orderList=t.data.list})):void 0},handleTag:function(t){var e=this;this.nav=t,this.showSearch=!0,this.orderList=[],this.pageNumber=1,1===t?this.orderType=1:2==t?(this.asceSale=!this.asceSale,this.orderType=this.asceSale?3:4):5===t&&(this.ascePrice=!this.ascePrice,this.orderType=this.ascePrice?6:5),this.getResponse().then(function(t){e.orderList=t.data.list,t.data.list.length<t.pageSize&&(e.canLoad=!1)})},getResponse:function(){return this.$API.L_selectOrderPage({pageNumber:this.pageNumber,pageSize:this.pageSize,orderType:this.orderType})},upper:function(t){this.showSearch=!0},lower:function(t){var e=this,s=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return new a.a(function(t,i){e.pageNumber++,e.canLoad?(s&&(console.log("加载中"),n.a.showLoading({title:"加载中"})),1===e.tag?e.$API.L_selectOrderPage({pageNumber:e.pageNumber,pageSize:10,orderType:e.orderType}).then(function(i){e.orderList=e.orderList.concat(i.data.list),e.orderList.length===i.data.totalRow&&(e.canLoad=!1),s&&n.a.hideLoading(),t()}).catch(function(t){i()}):8===e.tag?e.$API.L_selectOrderRefund({pageNumber:e.pageNumber,pageSize:10,orderType:e.orderType}).then(function(i){e.orderList=e.orderList.concat(i.data.list),e.orderList.length===i.data.totalRow&&(e.canLoad=!1),s&&n.a.hideLoading(),t()}):e.$API.L_selectOrderPage({state:e.state,orderType:e.orderType,pageNumber:e.pageNumber,pageSize:e.pageSize}).then(function(i){e.orderList=e.orderList.concat(i.data.list),e.orderList.length===i.data.totalRow&&(e.canLoad=!1),s&&n.a.hideLoading(),t()})):n.a.showToast({title:"没有更多数据了",icon:"none",duration:1500})})},toRoute:function(t){this.$router.push("/pages/home/"+t)}},onPullDownRefresh:function(){this.pageNumber=0,this.orderList=[],this.canLoad=!0,this.lower(null,!1).finally(function(){n.a.stopPullDownRefresh()})},onReachBottom:function(){this.lower()},mounted:function(){console.log("onShow 执行"),this.$API.selectWarehouse({orderId:this.orderID}).then(function(t){n.a.setStorageSync("dpName",t.data.companyName),n.a.setStorageSync("isPersonal",t.data.isPersonal)}),this.handleNav(this.tag,this.state)},onUnload:function(){o()(this,this.$options.data())}}},C9rw:function(t,e,s){"use strict";var i=s("DcCp"),o=s("Chrh");var r=function(t){s("IITa")},a=s("ybqe")(i.a,o.a,r,"data-v-73b2e4c8",null);e.a=a.exports},Chrh:function(t,e,s){"use strict";var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[t.isRefund||-1===t.orderItem.layer||1===t.orderItem.isPing?t._e():s("div",{staticClass:"header"},[s("span",{staticClass:"orderNo"},[t._v("订单编号: "+t._s(t.orderItem.orderNo))]),t._v(" "),s("span",{staticClass:"orderState"},[t._v("\n      "+t._s(1===t.orderItem.state?"等待支付":2===t.orderItem.state?"已取消":5===t.orderItem.state?"待发货":6===t.orderItem.state?"已发货":7===t.orderItem.state?"交易成功":8===t.orderItem.state?"交易关闭":9===t.orderItem.state?"拼单中":10===t.orderItem.state?"审核中":"未知状态")+"\n  ")])]),t._v(" "),1===t.orderItem.isPing&&-1===t.orderItem.layer?s("div",{staticClass:"header"},[s("span",{staticClass:"orderNo"},[t._v("总拼团订单编号: "+t._s(t.orderItem.orderNo))]),t._v(" "),s("span",{staticClass:"orderState"},[t._v("\n      "+t._s(1===t.orderItem.state?"等待支付":2===t.orderItem.state?"已取消拼团":5===t.orderItem.state?"拼团成功, 待发货":6===t.orderItem.state?"已发货":7===t.orderItem.state?"交易成功":8===t.orderItem.state?"交易关闭":9===t.orderItem.state?"拼单中, 还差"+t.enoughPeopleNum+"人":10===t.orderItem.state?"审核中":"未知状态")+"\n    ")])]):t._e(),t._v(" "),1===t.orderItem.isPing&&-1!==t.orderItem.layer?s("div",{staticClass:"header"},[s("span",{staticClass:"orderNo"},[t._v("子拼团订单编号: "+t._s(t.orderItem.orderNo))]),t._v(" "),s("span",{staticClass:"orderState"},[t._v("\n      "+t._s(1===t.orderItem.state?"等待支付":2===t.orderItem.state?"已取消拼团":5===t.orderItem.state?"拼团成功, 待发货":6===t.orderItem.state?"已发货":7===t.orderItem.state?"交易成功":8===t.orderItem.state?"交易关闭":9===t.orderItem.state?"拼单中, 还差"+t.enoughPeopleNum+"人":10===t.orderItem.state?"审核中":"未知状态")+"\n  ")])]):t._e(),t._v(" "),t.isRefund?s("div",{staticClass:"header"},[s("span",{staticClass:"orderNo"},[t._v("订单编号: "+t._s(t.orderItem.orderRefundNo))]),t._v(" "),s("span",{staticClass:"orderState"},[t._v("\n        "+t._s(0===t.orderItem.state&&0===t.orderItem.refundType?"买家发起, 仅退款":0===t.orderItem.state&&1===t.orderItem.refundType?"买家发起, 退货退款":0===t.orderItem.state&&2===t.orderItem.refundType?"买家发起, 仅换货":1===t.orderItem.state&&0===t.orderItem.refundType?"退款成功":1===t.orderItem.state&&1===t.orderItem.refundType?"退货退款成功":1===t.orderItem.state&&2===t.orderItem.refundType?"换货成功":2===t.orderItem.state&&0===t.orderItem.refundType?"仅退款已被拒绝":2===t.orderItem.state&&1===t.orderItem.refundType?"退款退货已被拒绝":2===t.orderItem.state&&2===t.orderItem.refundType?"仅换货已被拒绝":3===t.orderItem.state&&1===t.orderItem.refundType?"退货退款, 等待买家发货":3===t.orderItem.state&&2===t.orderItem.refundType?"换货, 等待买家发货":4===t.orderItem.state&&1===t.orderItem.refundType?"退货退款, 等待卖家收货":4===t.orderItem.state&&2===t.orderItem.refundType?"换货, 等待卖家收货":5===t.orderItem.state?"撤销售后":"未知状态")+"\n      ")])]):t._e(),t._v(" "),5!==t.orderItem.state?s("div",{staticClass:"order-body"},[t.orderItem.goods?s("div",{staticClass:"img-box"},[s("i",{staticClass:"shopImg",style:{backgroundImage:"url("+t.orderItem.goods.image+")"}})],1):-1===t.orderItem.layer||t.isRefund?t.isRefund?s("div",{staticClass:"img-box",attrs:{eventid:"1"},on:{click:function(e){t.pageTo("/pages/home/orderMgr/goodsList",t.orderItem.goodsList,!1)}}},t._l(t.orderItem.goodsList,function(e,i){return i<3?s("i",{key:i,staticClass:"shopImg",style:{backgroundImage:"url("+e.image+")"}}):t._e()})):t._e():s("div",{staticClass:"img-box",attrs:{eventid:"0"},on:{click:function(e){t.pageTo("/pages/home/orderMgr/goodsList",t.orderItem.orderGoods,!1)}}},t._l(t.orderItem.orderGoods,function(e,i){return i<3?s("i",{key:i,staticClass:"shopImg",style:{backgroundImage:"url("+e.image+")"}}):t._e()})),t._v(" "),s("div",{staticClass:"icon"})]):t._e(),t._v(" "),5==t.orderItem.state&&t.orderItem.goods?s("div",{staticClass:"pingOrder-body"},[t.orderItem.goods?s("div",{staticClass:"img-box"},[s("i",{staticClass:"shopImg",style:{backgroundImage:"url("+t.orderItem.goods.image+")"}})],1):t._e()]):t._e(),t._v(" "),t._l(t.orderItem.orderGoods,function(e,i){return 5!=t.orderItem.state||t.isRefund?t._e():s("div",{key:i,staticClass:"pingOrder-body"},[s("div",{staticClass:"goods-body"},[s("i",{staticClass:"goods-img",style:{backgroundImage:"url("+e.image+")"}}),t._v(" "),s("div",{staticClass:"goods-info"},[s("span",{staticClass:"title"},[t._v(t._s(e.name||"[商品未设置标题]"))]),t._v(" "),s("span",{staticClass:"details"},[s("p",{staticClass:"stall"},[t._v("档口名称: "+t._s(e.stallInfo3))]),t._v(" "),s("p",{staticClass:"time"},[t._v("货期: "+t._s(e.delivery))])],1),t._v(" "),s("div",{staticClass:"footer"},[s("div",{staticClass:"size"},t._l(t.skuList[i],function(e,i){return s("span",{key:i},[t._v("\n              "+t._s(e.color)+"色: "+t._s(e.size)+"码丨"+t._s(e.num)+"件\n            ")])})),t._v(" "),s("button",{staticClass:"edit",attrs:{eventid:"2-"+i},on:{click:function(e){t.togglePopups(i)}}},[t._v("编辑")])],1)])],1),t._v(" "),5===t.orderItem.state&&t.orderItem.isHasDeliver&&!t.isEdited?s("div",{staticClass:"table"},[s("table",{staticStyle:{border:"none"}},[s("tr",[s("th",[t._v("颜色")]),t._v(" "),s("th",[t._v("码数")]),t._v(" "),s("th",[t._v("总件数")]),t._v(" "),s("th",[t._v("待发件数")]),t._v(" "),s("th",[t._v("剩余待发")])],1),t._v(" "),t._l(t.deliverList[i],function(e,i){return s("tr",{key:i},[s("td",[t._v(t._s(e.color))]),t._v(" "),s("td",[t._v(t._s(e.size))]),t._v(" "),s("td",[t._v(t._s(e.num))]),t._v(" "),s("td",[t._v(t._s(e.deliver))]),t._v(" "),s("td",[t._v(t._s(e.remain))])],1)})],2)],1):t._e(),t._v(" "),t.isEdited?s("div",{staticClass:"table"},[s("table",{staticStyle:{border:"none"}},[s("tr",[s("th",[t._v("颜色")]),t._v(" "),s("th",[t._v("码数")]),t._v(" "),s("th",[t._v("总件数")]),t._v(" "),s("th",[t._v("待发件数")]),t._v(" "),s("th",[t._v("剩余待发")])],1),t._v(" "),t._l(t.skuList[i],function(e,i){return s("tr",{key:i},[s("td",[t._v(t._s(e.color))]),t._v(" "),s("td",[t._v(t._s(e.size))]),t._v(" "),s("td",[t._v(t._s(e.num))]),t._v(" "),s("td",[t._v(t._s(e.deliver))]),t._v(" "),s("td",[t._v(t._s(e.remain))])],1)})],2)],1):t._e(),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.popupsIndex===i,expression:"popupsIndex === orderGoodIndex"}],staticClass:"popups"},[s("table",[s("tr",{staticClass:"header"},[s("th",[t._v("颜色")]),t._v(" "),s("th",[t._v("码数")]),t._v(" "),s("th",[t._v("总件数")]),t._v(" "),s("th",{staticClass:"col-2"},[t._v("待发件数")]),t._v(" "),s("th",[t._v("剩余待发")])],1),t._v(" "),t._l(t.lastSkuList[i],function(e,o){return s("tr",{key:o},[s("td",[t._v(t._s(e.color))]),t._v(" "),s("td",[t._v(t._s(e.size))]),t._v(" "),s("td",[t._v(t._s(e.num))]),t._v(" "),s("td",{staticClass:"col-2"},[s("button",{attrs:{disabled:0===e.deliver,eventid:"3-"+i+"-"+o},on:{click:function(e){t.cut(i,o)}}},[t._v("-")]),t._v(" "),s("span",{staticClass:"edit"},[t._v(t._s(e.deliver))]),t._v(" "),s("button",{attrs:{disabled:e.deliver===e.remain,eventid:"4-"+i+"-"+o},on:{click:function(e){t.add(i,o)}}},[t._v("+")])],1),t._v(" "),s("td",[t._v(t._s(e.remain))])],1)})],2),t._v(" "),s("div",{staticClass:"btn-group"},[s("button",{staticClass:"cancel",attrs:{type:"button",eventid:"5-"+i},on:{click:function(e){t.cancel(i)}}},[t._v("取消")]),t._v(" "),s("button",{staticClass:"save",attrs:{type:"button",eventid:"6-"+i},on:{click:function(e){t.save()}}},[t._v("保存")])],1)],1)])}),t._v(" "),5===t.orderItem.state||1===t.orderItem.isHasChildren||t.isRefund?t._e():s("div",{staticClass:"order-details"},[s("div",{staticClass:"detail"},[s("div",{staticClass:"num"},[t._v("\n        共"+t._s(t.orderItem.orderGoods.length)+"个款，合计"+t._s(t.orderItem.num)+"件\n      ")]),t._v(" "),s("div",{staticClass:"price"},[t._v("\n        订单金额: "),s("span",[t._v(t._s(t.orderItem.paid)+"元")])])]),t._v(" "),s("div",{staticClass:"buyer"},[t._v("\n      收货人: "+t._s(t.orderItem.shopAddress?t.orderItem.shopAddress.name:"未设置收货人")+" 丨 手机号: "+t._s(t.orderItem.shopAddress?t.orderItem.shopAddress.mobile:"未知号码")+"\n    ")])]),t._v(" "),t.isRefund?s("div",{staticClass:"order-details"},[s("div",{staticClass:"detail"},[s("div",{staticClass:"num"},[t._v("\n        共"+t._s(t.orderItem.goodsList.length)+"个款，合计"+t._s(t.refundOrderGoodsNum)+"件\n      ")]),t._v(" "),s("div",{staticClass:"price"},[t._v("\n        订单金额: "),s("span",[t._v(t._s(t.orderItem.price)+"元")])])]),t._v(" "),s("div",{staticClass:"buyer"},[t._v("\n      收货人: "+t._s(t.orderItem.accountAddress?t.orderItem.accountAddress.name:"未设置收货人")+" 丨 手机号: "+t._s(t.orderItem.accountAddress?t.orderItem.accountAddress.mobile:"未知号码")+"\n    ")])]):t._e(),t._v(" "),-1!==t.orderItem.layer&&t.orderItem.isHasChildren?s("ul",{staticClass:"childOrder"},t._l(t.orderItem.children,function(e,i){return s("li",{key:i,attrs:{eventid:"7-"+i},on:{click:function(s){t.pageTo("/pages/home/orderMgr/orderdetail",e.id,!1)}}},[t._v("\n      子订单编号("+t._s(1===e.state?"等待支付":2===e.state?"已取消":5===e.state?"待发货":6===e.state?"已发货":7===e.state?"交易成功":8===e.state?"交易关闭":9===e.state?"拼单中, 还差"+t.enoughPeopleNum+"人":10===e.state?"审核中":"未知状态")+"):\n      "+t._s(e.orderNo))])})):t._e(),t._v(" "),s("div",{staticClass:"button-group"},[t.orderItem.pingUser?s("div",{staticClass:"pingUser"},t._l(t.orderItem.pingUser,function(e,i){return i<3?s("i",{key:i,style:{backgroundImage:"url("+e.head+")"}}):t._e()})):t._e(),t._v(" "),t.isRefund||1===t.orderItem.isPing&&-1===t.orderItem.layer?t._e():s("button",{staticClass:"style1",attrs:{eventid:"8"},on:{click:function(e){t.pageTo("/pages/home/orderMgr/orderdetail",t.orderItem.id,!1)}}},[t._v("查看详情")]),t._v(" "),t.isRefund&&-1!==t.orderItem.layer?s("button",{staticClass:"style1",attrs:{eventid:"9"},on:{click:function(e){t.pageTo("/pages/home/orderMgr/orderRefundDetail",t.orderItem.id,!0)}}},[t._v("查看详情")]):t._e(),t._v(" "),1===t.orderItem.isPing&&-1===t.orderItem.layer?s("button",{staticClass:"style-big",attrs:{eventid:"10"},on:{click:function(e){t.pageTo("/pages/home/orderMgr/groupItemDetail",t.orderItem.pingOrderId,!1)}}},[t._v("查看子拼团")]):t._e(),t._v(" "),6!==t.orderItem.state||1===t.orderItem.isPing&&-1===t.orderItem.layer?t._e():s("button",{staticClass:"style2",attrs:{eventid:"11"},on:{click:function(e){t.pageTo("/pages/home/orderMgr/logisticsDetail",t.orderItem.id,!1)}}},[t._v("查看物流")]),t._v(" "),5!==t.orderItem.state||1===t.orderItem.isPing&&-1===t.orderItem.layer?t._e():s("button",{staticClass:"style2",attrs:{eventid:"12"},on:{click:function(e){t.ship(t.orderItem.id)}}},[t._v("发货")]),t._v(" "),t.isRefund&&0===t.orderItem.state?s("button",{staticClass:"style3",attrs:{eventid:"13"},on:{click:function(e){t.dealWithOrderRefund(t.orderItem.id,1)}}},[t._v("同意")]):t._e(),t._v(" "),t.isRefund&&0===t.orderItem.state?s("button",{staticClass:"style2",attrs:{eventid:"14"},on:{click:function(e){t.toggleReason()}}},[t._v("拒绝")]):t._e(),t._v(" "),t.isRefund&&4===t.orderItem.state?s("button",{staticClass:"style2",attrs:{eventid:"15"},on:{click:function(e){t.toggleModal("visible4")}}},[t._v("确认收货")]):t._e(),t._v(" "),1===t.orderItem.state&&t.isPersonal?s("button",{staticClass:"style1",attrs:{eventid:"16"},on:{click:function(e){t.toggleModal("visible5")}}},[t._v("确认已支付")]):t._e(),t._v(" "),t.isRefund||1!==t.orderItem.state?t._e():s("button",{staticClass:"style2",attrs:{eventid:"17"},on:{click:function(e){t.toggleModal("visible3")}}},[t._v("取消订单")])],1),t._v(" "),t.showLogistics?s("div",{staticClass:"logistics"},[s("div",{staticClass:"wrapper"},[s("div",{staticClass:"title"},[t._v("请填写物流信息")]),t._v(" "),s("ul",{staticClass:"body"},[s("li",[t._v("\n          物流公司:\n          "),s("div",{staticClass:"selector-picker"},[s("picker",{attrs:{value:t.index,range:t.companies,"range-key":"text",eventid:"18"},on:{change:t.handle}},[s("view",{staticClass:"picker"},[t._v("\n                "+t._s(t.companies[t.index].text)+"\n              ")])])],1)]),t._v(" "),s("li",[t._v("\n          快递单号:\n          "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.logisticsNo,expression:"logisticsNo"}],attrs:{type:"number",placeholder:"请填写快递单号",eventid:"19"},domProps:{value:t.logisticsNo},on:{input:function(e){e.target.composing||(t.logisticsNo=e.target.value)}}})]),t._v(" "),s("li",[t._v("上传快递信息凭证: ")]),t._v(" "),s("li",{staticClass:"upload-img"},[s("scroll-view",{staticClass:"scroll-view ",staticStyle:{height:"220rpx"},attrs:{"scroll-y":""}},[t._l(t.imageList,function(t,e){return s("div",{key:e,staticClass:"img-box"},[s("i",{staticClass:"img",style:{backgroundImage:"url("+t+")"}})],1)}),t._v(" "),s("div",{staticClass:"img-box"},[s("i",{staticClass:"add-img",attrs:{eventid:"20"},on:{tap:t.bindButtonTapImage}},[t._v("\n                + 可上传图片\n              ")])],1)],2)],1)],1)],1),t._v(" "),s("div",{staticClass:"checkbox"},[s("i",{staticClass:"select-icon",class:[t.noExpress?"active":""],attrs:{eventid:"21"},on:{click:function(e){t.toggleNoExpress()}}}),t._v("\n      无物流信息\n    ")],1),t._v(" "),s("div",{staticClass:"footer"},[s("span",{staticClass:"cancel",attrs:{eventid:"22"},on:{click:function(e){t.cancelExpress()}}},[t._v("取消")]),t._v(" "),s("span",{staticClass:"ok",attrs:{eventid:"23"},on:{click:function(e){t.confirmExpress(t.orderItem.id)}}},[t._v("确定发货")])])]):t._e(),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showLogistics||t.showPopups||t.showReason,expression:"showLogistics || showPopups || showReason"}],staticClass:"mark",attrs:{eventid:"24"},on:{click:function(e){t.cancelModel()}}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showReason,expression:"showReason"}],staticClass:"reason"},[s("div",{staticClass:"body"},[s("div",{staticClass:"header"},[t._v("填写拒绝理由")]),t._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],attrs:{eventid:"25"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})]),t._v(" "),s("div",{staticClass:"footer"},[s("span",{staticClass:"button cancel",attrs:{eventid:"26"},on:{click:function(e){t.toggleReason()}}},[t._v("取消")]),t._v(" "),s("span",{staticClass:"button ok",attrs:{eventid:"27"},on:{click:function(e){t.dealWithOrderRefund(t.orderItem.id,2)}}},[t._v("确定")])])]),t._v(" "),s("i-modal",{attrs:{title:"请检查...",visible:t.visible1,eventid:"28",mpcomid:"0"},on:{ok:function(e){t.toggleModal("visible1")},cancel:function(e){t.toggleModal("visible1")}}},[s("div",{staticClass:"visible"},[t._v("未编辑待发货数量")])]),t._v(" "),s("i-modal",{attrs:{visible:t.visible2,eventid:"29",mpcomid:"1"},on:{ok:function(e){t.confirmWithRefund(t.orderItem.id)},cancel:function(e){t.toggleModal("visible2")}}},[s("div",{staticClass:"visible"},[t._v("\n      是否同意退款金额"),s("span",{staticClass:"red"},[t._v("￥"+t._s(t.orderItem.price)+"元")]),t._v("给"),s("span",{staticClass:"red"},[t._v(t._s(t.orderItem.accountAddress?t.orderItem.accountAddress.name:"未设置收货人"))]),t._v("?\n    ")])]),t._v(" "),s("i-modal",{attrs:{visible:t.visible3,eventid:"30",mpcomid:"2"},on:{ok:function(e){t.closeOrder(t.orderItem.id)},cancel:function(e){t.toggleModal("visible3")}}},[s("div",{staticClass:"visible"},[t._v("确定取消订单？")])]),t._v(" "),s("i-modal",{attrs:{title:"是否确认收货？",visible:t.visible4,eventid:"31",mpcomid:"3"},on:{ok:function(e){t.sureReund(t.orderItem.id)},cancel:function(e){t.toggleModal("visible4")}}},[s("div",{staticClass:"visible2"},[t._v("将自动退还金额"),s("span",{staticClass:"red"},[t._v("￥"+t._s(t.orderItem.price)+"元")]),t._v("给"),s("span",{staticClass:"red"},[t._v(t._s(t.orderItem.accountAddress?t.orderItem.accountAddress.name:"未设置收货人"))])])]),t._v(" "),s("i-modal",{attrs:{visible:t.visible5,eventid:"32",mpcomid:"4"},on:{ok:function(e){t.surePay(t.orderItem.id)},cancel:function(e){t.toggleModal("visible5")}}},[s("div",{staticClass:"visible"},[t._v("是否确认已收款?")])]),t._v(" "),s("i-message",{attrs:{id:"message",mpcomid:"5"}})],2)},staticRenderFns:[]};e.a=i},DcCp:function(t,e,s){"use strict";var i=s("mvHQ"),o=s.n(i),r=s("qTHA"),a=(s("90m7"),s("QmSG"));e.a={components:{},data:function(){return{content:"",showEditTable:!1,isEdited:!1,popupsIndex:-1,orderGoodsNum:0,pingOrderGoodsNum:0,refundOrderGoodsNum:0,isRefund:!1,showPopups:!1,showLogistics:!1,showReason:!1,skuList:[],lastSkuList:[],deliverList:[],index:0,logisticsNo:"",noExpress:!1,imageList:[],imgList:[],maxNum:6,companies:[{text:"-请选择物流公司-",type:0},{text:"顺丰速运",type:1},{text:"邮政EMS",type:2},{text:"圆通快递",type:3},{text:"申通快递",type:4},{text:"韵达快递",type:5},{text:"百世汇通",type:6},{text:"中通快递",type:7},{text:"天天快递",type:8},{text:"优速物流",type:9}],visible1:!1,visible2:!1,visible3:!1,visible4:!1,visible5:!1}},props:{orderItem:{type:Object,default:{}}},updated:function(){},computed:{isPersonal:function(){return 1!=r.a.getStorageSync("isPersonal")},enoughPeopleNum:function(){if(9===this.orderItem.state)return this.orderItem.ping.num-this.orderItem.pingUser.length}},methods:{surePay:function(t){var e=this;this.$API.L_surePay({orderId:t}).then(function(t){r.a.showToast({title:"已确认收款",icon:"success"}),setTimeout(function(){e.visible5=!1},1200)})},sureReund:function(t){var e=this;this.$API.L_selectOrderRefundDetail({orderRefundId:t}).then(function(t){r.a.showToast({title:"已确认收货",icon:"success"}),setTimeout(function(){e.visible4=!1},1200)})},dealWithOrderRefund:function(t,e){var s=this;2===e?this.$API.L_dealWithOrder({orderRefundId:t,state:e,content:this.content}).then(function(t){r.a.showToast({title:"已拒绝",icon:"success"}),s.showReason=!1}):1===e&&(this.visible2=!0)},confirmWithRefund:function(t){var e=this;this.$API.L_dealWithOrder({orderRefundId:t,state:1,content:""}).then(function(t){r.a.showToast({title:"已同意",icon:"success"}),e.showReason=!1,e.visible2=!1})},closeOrder:function(t){var e=this;this.$API.L_shopClose({orderId:t}).then(function(t){r.a.showToast({title:"已取消",icon:"success"}),e.visible3=!1})},bindButtonTapImage:function(){var t=this.maxNum;r.a.showLoading({title:"加载中"});var e=this;if(t&&this.imgList.length>=t)return this.handleError("不能超过"+t+"张图片噢！"),void r.a.hideLoading();r.a.chooseImage({sizeType:"original",count:this.uploadNum,success:function(t){console.log(t);var s=t.tempFilePaths;console.log(s),s.forEach(function(t){e.uploadImg(t)})},fail:function(){r.a.showLoading({title:"操作失败"})},complete:function(){r.a.hideLoading()}})},uploadImg:function(t){console.log("lastIndexOf ============",t.slice(t.lastIndexOf("/")+1).toString());var e=t.lastIndexOf("/")+1,s=this;r.a.uploadFile({url:a.a.uploadImageUrl,filePath:t,name:"file",formData:{name:t.slice(e).toString(),key:"img/${filename}",policy:a.a.imgPolicy,OSSAccessKeyId:a.a.OSSAccessKeyId,success_action_status:"200",signature:a.a.imgSignature},success:function(i){if(console.log(i),console.log("tempFilePath  ========",t),400==parseInt(i.statusCode))s.handleError("上传的图片大小不能超过2m!");else if(200==parseInt(i.statusCode)){if(s.maxNum&&s.imgList.length>=s.maxNum)return void s.handleError("不能超过6张图片噢！");s.imgList.push(a.a.uploadImageUrl+"/img/"+t.slice(e).toString()),console.log("图片列表===>"+s.imgList),s.getImg(a.a.uploadImageUrl+"/img/"+t.slice(e).toString())}},fail:function(t){console.log(t)}}).onProgressUpdate(function(t){100===t.progress&&r.a.showToast({title:"上传完成"})})},getImg:function(t){this.imageList.push(t),console.log("imageList ===> "+this.imageList)},handleError:function(t){this.$Message({content:t,type:"error"})},handle:function(t){console.log(t.mp.detail.value),this.index=t.mp.detail.value},cancelModel:function(){this.showPopups=!1,this.showLogistics=!1,this.showReason=!1,this.popupsIndex=-1},ship:function(t){!this.isEdited&&this.deliverList&&this.deliverList.every(function(t){return t.every(function(t){return 0===t.deliver})})?this.visible1=!this.visible1:this.isEdited&&this.lastSkuList&&this.lastSkuList.every(function(t){return t.every(function(t){return 0===t.deliver})})?this.visible1=!this.visible1:this.showLogistics=!this.showLogistics},pageTo:function(t,e){var s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];"/pages/home/orderMgr/goodsList"!==t?s?this.$router.push({path:t,query:{orderRefundId:e}}):this.$router.push({path:t,query:{orderId:e}}):this.$router.push({path:t,query:{orderId:o()(e)}})},togglePopups:function(t){this.showPopups=!0,this.popupsIndex=t,this.isEdited=!1},cut:function(t,e){this.$set(this.lastSkuList[t],e,{deliver:this.lastSkuList[t][e].deliver-=1,color:this.lastSkuList[t][e].color,size:this.lastSkuList[t][e].size,num:this.lastSkuList[t][e].num,remain:this.lastSkuList[t][e].remain,skuId:this.lastSkuList[t][e].skuId})},add:function(t,e){this.$set(this.lastSkuList[t],e,{deliver:this.lastSkuList[t][e].deliver+=1,color:this.lastSkuList[t][e].color,size:this.lastSkuList[t][e].size,num:this.lastSkuList[t][e].num,remain:this.lastSkuList[t][e].remain,skuId:this.lastSkuList[t][e].skuId})},cancel:function(t){this.showPopups=!1,this.popupsIndex=-1},save:function(){var t=[],e=this;this.lastSkuList.forEach(function(e,s){e.forEach(function(e){t.push({num:e.deliver,skuId:e.skuId})})}),r.a.request({url:a.a.url+"/api/order/goods/addChildren",method:"POST",dataType:"json",data:{shopId:a.a.appId,sessionId:r.a.getStorageSync("sessionId"),orderIds:e.orderId,orderDeliver:t},success:function(t){e.showEditTable=!0,e.isEdited=!0,e.skuList=JSON.parse(o()(e.lastSkuList)),e.showPopups=!1,e.popupsIndex=-1},fail:function(t){console.log("err",t),r.a.showToast({title:"编辑失败",icon:"none"})},complete:function(t){}})},cancelExpress:function(){this.showLogistics=!1},confirmExpress:function(t){var e=this;if(this.noExpress)this.confirmShip({orderId:t}).then(function(t){r.a.showToast({title:"已发货",icon:"success"}),e.showLogistics=!1,setTimeout(function(){r.a.startPullDownRefresh()},1500)});else{if(0===this.index)return void r.a.showToast({title:"请选择物流公司",icon:"none"});if(!this.logisticsNo)return void r.a.showToast({title:"请填写物流单号",icon:"none"});if(this.logisticsNo.length>14)return void r.a.showToast({title:"快递单号长度最长14位",icon:"none"});this.confirmShip({orderId:t,logisticsNo:this.logisticsNo,image:this.imgList.toString(),type:this.index}).then(function(t){r.a.showToast({title:"已发货",icon:"success"}),e.showLogistics=!1,setTimeout(function(){r.a.startPullDownRefresh()},1500)})}},toggleNoExpress:function(){this.noExpress=!this.noExpress},confirmShip:function(t){return this.$API.L_deliverGoods(t)},toggleModal:function(t){console.log("点击事件执行"),this[t]=!this[t]},toggleReason:function(){this.showReason=!this.showReason}},created:function(){if(5===this.orderItem.state&&!this.isRefund){var t=[];this.orderItem.orderGoods.forEach(function(e,s){t.push([]),e.skuList.forEach(function(e){t[s].push({color:e.skuCode.split(",")[0].toString(),size:e.skuCode.split(",")[1].toString(),num:e.num,deliver:0,remain:e.remainNum,skuId:e.skuId})})}),this.skuList=t,this.lastSkuList=t}if(this.orderItem.goodsList){console.log("找到售后订单: ",this.isRefund),this.isRefund=!0,console.log("this.isRefund : ",this.isRefund);var e=0;this.orderItem.goodsList.forEach(function(t){t.skuList.forEach(function(t){e+=t.num})}),this.refundOrderGoodsNum=e}if(this.orderItem.isHasDeliver){console.log("编辑过的订单找到了");var s=[];this.orderItem.orderGoods.forEach(function(t,e){s.push([]),t.deliverList.forEach(function(t){s[e].push({color:t.skuCode.split(",")[0].toString(),size:t.skuCode.split(",")[1].toString(),num:t.num,deliver:t.canDeliverNumber,remain:t.remainNum})})}),this.deliverList=s,this.lastSkuList=s}}}},"I+sN":function(t,e,s){"use strict";var i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("div",{staticClass:"header-box"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.showSearch,expression:"showSearch"}],staticClass:"search-box"},[s("div",{staticClass:"input"},[s("p",{staticClass:"search-icon"},[s("i",{staticClass:"search"})],1),t._v(" "),s("p",{staticClass:"input-box",attrs:{eventid:"0"},on:{click:function(e){t.toRoute("shopMgr/searchOrder")}}},[t._v("请搜索订单号、收货人姓名、手机号")])],1)]),t._v(" "),s("div",{staticClass:"nav"},[s("div",{staticClass:"list"},[t._l(t.navData,function(e,i){return s("span",{key:i,staticClass:"item",class:[t.tag===e.id&&"active"],attrs:{eventid:"1-"+i},on:{click:function(s){t.handleNav(e.id,e.state)}}},[t._v("\n          "+t._s(e.text)+"\n        ")])}),t._v(" "),s("div",{staticClass:"line",style:{left:20*(t.tag-1)+"%"}})],2),t._v(" "),s("ul",{staticClass:"top-nav"},[s("li",{class:[1===t.nav&&"nav-active"],attrs:{eventid:"2"},on:{click:function(e){t.handleTag(1)}}},[t._v("综合")]),t._v(" "),s("li",{class:[2===t.nav&&"nav-active"],attrs:{eventid:"3"},on:{click:function(e){t.handleTag(2)}}},[t._v("收货人\n          "),s("div",{staticClass:"sort-box"},[s("i",{staticClass:"sort-top",class:[3==t.orderType&&"sort-active"]}),t._v(" "),s("i",{staticClass:"sort-bottom",class:[4==t.orderType&&"sort-active"]})],1)]),t._v(" "),s("li",{class:[5===t.nav&&"nav-active"],attrs:{eventid:"4"},on:{click:function(e){t.handleTag(5)}}},[t._v("订单金额\n          "),s("div",{staticClass:"sort-box"},[s("i",{staticClass:"sort-top",class:[5==t.orderType&&"sort-active"]}),t._v(" "),s("i",{staticClass:"sort-bottom",class:[6==t.orderType&&"sort-active"]})],1)])],1)],1)]),t._v(" "),1==t.tag?s("div",{attrs:{eventid:"20"},on:{scrolltolower:t.lower,scrolltoupper:t.upper}},[s("div",{staticClass:"white-block"}),t._v(" "),t._l(t.orderList,function(t,e){return s("div",{key:e,staticClass:"card-body"},[s("orderCard",{attrs:{orderItem:t,mpcomid:"0-"+e}})],1)})],2):2==t.tag?s("div",{attrs:{eventid:"5"},on:{scrolltolower:t.lower,scrolltoupper:t.upper}},[s("div",{staticClass:"white-block"}),t._v(" "),t._l(t.orderList,function(t,e){return s("div",{key:e,staticClass:"card-body"},[s("orderCard",{attrs:{orderItem:t,mpcomid:"1-"+e}})],1)})],2):3==t.tag?s("div",{attrs:{eventid:"7"},on:{scrolltolower:t.lower,scrolltoupper:t.upper}},[s("div",{staticClass:"white-block"}),t._v(" "),t._l(t.orderList,function(e,i){return s("div",{key:i,staticClass:"card-body"},[s("orderCard",{attrs:{orderItem:e,eventid:"6-"+i,mpcomid:"2-"+i},on:{spliceShopList:t.spliceShopList}})],1)})],2):4==t.tag?s("div",{attrs:{eventid:"9"},on:{scrolltolower:t.lower,scrolltoupper:t.upper}},[s("div",{staticClass:"white-block"}),t._v(" "),t._l(t.orderList,function(e,i){return s("div",{key:i,staticClass:"card-body"},[s("orderCard",{attrs:{orderItem:e,eventid:"8-"+i,mpcomid:"3-"+i},on:{spliceShopList:t.spliceShopList}})],1)})],2):5==t.tag?s("div",{attrs:{eventid:"11"},on:{scrolltolower:t.lower,scrolltoupper:t.upper}},[s("div",{staticClass:"white-block"}),t._v(" "),t._l(t.orderList,function(e,i){return s("div",{key:i,staticClass:"card-body"},[s("orderCard",{attrs:{orderItem:e,eventid:"10-"+i,mpcomid:"4-"+i},on:{spliceShopList:t.spliceShopList}})],1)})],2):6==t.tag?s("div",{attrs:{eventid:"13"},on:{scrolltolower:t.lower,scrolltoupper:t.upper}},[s("div",{staticClass:"white-block"}),t._v(" "),t._l(t.orderList,function(e,i){return s("div",{key:i,staticClass:"card-body"},[s("orderCard",{attrs:{orderItem:e,eventid:"12-"+i,mpcomid:"5-"+i},on:{spliceShopList:t.spliceShopList}})],1)})],2):7==t.tag?s("div",{attrs:{eventid:"15"},on:{scrolltolower:t.lower,scrolltoupper:t.upper}},[s("div",{staticClass:"white-block"}),t._v(" "),t._l(t.orderList,function(e,i){return s("div",{key:i,staticClass:"card-body"},[s("orderCard",{attrs:{orderItem:e,eventid:"14-"+i,mpcomid:"6-"+i},on:{spliceShopList:t.spliceShopList}})],1)})],2):8==t.tag?s("div",{attrs:{eventid:"17"},on:{scrolltolower:t.lower,scrolltoupper:t.upper}},[s("div",{staticClass:"white-block"}),t._v(" "),t._l(t.orderList,function(e,i){return s("div",{key:i,staticClass:"card-body"},[s("orderCard",{attrs:{orderItem:e,eventid:"16-"+i,mpcomid:"7-"+i},on:{spliceShopList:t.spliceShopList}})],1)})],2):9==t.tag?s("div",{attrs:{eventid:"19"},on:{scrolltolower:t.lower,scrolltoupper:t.upper}},[s("div",{staticClass:"white-block"}),t._v(" "),t._l(t.orderList,function(e,i){return s("div",{key:i,staticClass:"card-body"},[s("orderCard",{attrs:{orderItem:e,eventid:"18-"+i,mpcomid:"8-"+i},on:{spliceShopList:t.spliceShopList}})],1)})],2):t._e()])},staticRenderFns:[]};e.a=i},IITa:function(t,e){},"Mf+t":function(t,e,s){"use strict";var i=s("+crX"),o=s("I+sN");var r=function(t){s("iES2")},a=s("ybqe")(i.a,o.a,r,"data-v-8649d08e",null);e.a=a.exports},iES2:function(t,e){}},["Uzqp"]);