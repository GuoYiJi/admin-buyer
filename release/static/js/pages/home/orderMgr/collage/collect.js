global.webpackJsonp([53],{D20o:function(e,t,s){"use strict";var a=s("dC5X"),i=s("uEX+");var o=function(e){s("tAiv")},r=s("ybqe")(a.a,i.a,o,"data-v-c233e1a2",null);t.a=r.exports},dC5X:function(e,t,s){"use strict";var a=s("Xxa5"),i=s.n(a),o=s("exGp"),r=s.n(o),c=s("qTHA"),l=s("QmSG");t.a={components:{},data:function(){return{shuoo:0,navData:[],L_selectDetail:[],warehouseData:[],pingUserData:[],orderGoodsList:[],goodsDetailData:[],url:"",appId:"",azzSessionId:"",passhowYes:!1,orderId:"",orderGoodsDN:[],parent:[],pasSeePlay:!1,dpName:""}},watch:{dpName:function(e,t){this.dpName=e}},methods:{btn:function(){var e=this.url,t=this.azzSessionId,s=this.appId,a=this.orderID;c.a.showModal({content:"确定关闭订单！",success:function(i){console.log(i),i.confirm?(console.log("用户点击确定"),c.a.request({url:e,data:{sessionId:t,appId:s,orderId:a},method:"post",header:{"content-type":"application/json"},success:function(e){console.log(e.data)}})):i.cancel&&console.log("用户点击取消")}})},close:function(e,t){this.passhowYes=!0},passYesClose:function(){this.passhowYes=!1},seePlay:function(){this.pasSeePlay=!0},passYesBut:function(){var e=this;return r()(i.a.mark(function t(){var s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$API.L_shopClose({orderId:e.orderId});case 2:s=t.sent,console.log(s),1==s.code?(c.a.showToast({title:"成功",icon:"success",duration:2e3}),e.passhowYes=!1,e.$router.push({path:"/pages/home/orderMgr/orderMgr",query:{orderType:2}})):e.passhowYes=!1;case 5:case"end":return t.stop()}},t,e)}))()},orderListArr:function(e){console.log(e),this.$router.push({path:"/pages/home/orderMgr/orderList",query:{goodsId:e}})},seeLogistics:function(){this.$router.push({path:"/pages/home/orderMgr/mail/logistics",query:{orderId:this.goodsId}})},childrenBut:function(e){this.$router.push({path:"/pages/home/orderMgr/collage/collect",query:{orderId:e}})},pasSeeClose:function(){this.pasSeePlay=!1},pasSeeBut:function(){var e=this;return r()(i.a.mark(function t(){var s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$API.L_surePay({orderId:e.orderId});case 2:s=t.sent,console.log(s),1==s.code?(c.a.showToast({title:"成功",icon:"success",duration:2e3}),e.pasSeePlay=!1):e.pasSeePlay=!1;case 5:case"end":return t.stop()}},t,e)}))()}},mounted:function(){var e=this;return r()(i.a.mark(function t(){var s,a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.orderId=e.$route.query.orderId,t.next=3,e.$API.L_selectOrderDetail({orderId:e.$route.query.orderId});case 3:for(s=t.sent,e.L_selectDetail=s.data,e.warehouseData=e.L_selectDetail.orderAddress,e.pingUserData=e.L_selectDetail.pingUser,e.orderGoodsList=e.L_selectDetail.goodsList,e.parent=e.L_selectDetail.parent,console.log(e.parent),a=0;a<e.orderGoodsList.length;a++)e.orderGoodsDN=e.orderGoodsList[a].orderGoods,e.goodsId=e.orderGoodsList[a].goodsId,console.log(e.orderGoodsDN);e.azzSessionId=c.a.getStorageSync("production_sessionId"),e.url=l.a.url+"/api/order/shopClose",e.appId=l.a.appId,e.orderID=e.$route.query.orderId,e.dpName=c.a.getStorageSync("dpName"),console.log(e.dpName);case 17:case"end":return t.stop()}},t,e)}))()}}},tAiv:function(e,t){},"uEX+":function(e,t,s){"use strict";var a={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"nav"},[e.warehouseData?s("div",{staticClass:"head"},[s("i",{staticClass:"dingwei"}),e._v(" "),s("div",{staticClass:"right"},[s("div",{staticClass:"consignee"},[s("text",[e._v("收货人:")]),e._v(" "),s("text",[e._v(e._s(e.warehouseData.name))]),e._v(" "),s("text",{staticClass:"phone"},[e._v(e._s(e.warehouseData.mobile))])]),e._v(" "),s("div",{staticClass:"address"},[e._v("\n        收货地址:"+e._s(e.warehouseData.value)+e._s(e.warehouseData.address)+"\n      ")]),e._v(" "),s("div",{staticClass:"remark"},[e._v("\n        备注:"+e._s(e.L_selectDetail.remark)+"\n      ")])])],1):e._e(),e._v(" "),s("div",{staticClass:"maiJia"},[s("i",{staticClass:"maiJiaico"}),e._v(" "),s("text",{staticClass:"name"},[e._v(e._s(e.dpName))]),e._v(" "),e.L_selectDetail?s("text",{staticClass:"fuKuan"},[e._v("\n      "+e._s(1==e.L_selectDetail.state?"未支付":2==e.L_selectDetail.state?"取消":3==e.L_selectDetail.state?"已支付":4==e.L_selectDetail.state?"支付失败":5==e.L_selectDetail.state?"未发货":6==e.L_selectDetail.state?"已发货":7==e.L_selectDetail.state?"交易成功":8==e.L_selectDetail.state?"交易关闭":"拼单中")+" \n    ")]):e._e()],1),e._v(" "),e._l(e.orderGoodsDN,function(t,a){return s("div",{key:a,staticClass:"list"},[s("div",{staticClass:"kuang",attrs:{eventid:"0-"+a},on:{click:function(s){e.orderListArr(t.goodsId)}}},[s("img",{staticClass:"sPimg",attrs:{src:t.image}}),e._v(" "),s("div",{staticClass:"textThad"},[s("div",{staticClass:"title"},[e._v(e._s(t.name))]),e._v(" "),s("div",{staticClass:"huo"},[s("text",{staticClass:"name"},[e._v(e._s(t.stallInfo3))]),e._v(" "),s("div",{staticClass:"type"},[e._v("货期:"+e._s(t.delivery))])]),e._v(" "),s("div",{staticClass:"maShuo"},[e._v(e._s(t.skuCode)+"/"+e._s(t.countNum)+"件")])])]),e._v(" "),s("div",{staticClass:"collage"},[e._l(e.pingUserData,function(t,a){return 9==e.L_selectDetail.state?s("div",{key:a,staticClass:"picture"},[s("img",{staticClass:"imgOne",attrs:{src:t.head}})]):e._e()}),e._v(" "),s("div",{staticClass:"jiaGe"},[s("text",{staticClass:"text"},[e._v("共"+e._s(t.num)+"件商品,合计: ")]),e._v(" "),s("text",{staticClass:"jiaGet"},[e._v(e._s(t.price)+"元")])])],2)])}),e._v(" "),""!=e.L_selectDetail.children?s("div",{staticClass:"number_1"},e._l(e.L_selectDetail.children,function(t,a){return s("div",{key:a,staticClass:"completed",attrs:{eventid:"1-"+a},on:{click:function(s){e.childrenBut(t.id)}}},[s("div",{staticClass:"completed_1"},[e._v("子订单编号\n        "+e._s(1==t.state?"未支付":2==t.state?"取消":3==t.state?"已支付":4==t.state?"支付失败":5==t.state?"未发货":6==t.state?"已发货":7==t.state?"交易成功":8==t.state?"交易关闭":"拼单中")+"\n      ："+e._s(t.orderNo))]),e._v(" "),s("i",{staticClass:"sanjiao"})],1)})):e._e(),e._v(" "),e.L_selectDetail?s("div",{staticClass:"jieShuan"},[s("div",{staticClass:"price"},[s("text",[e._v("商品总价")]),e._v(" "),s("text",{staticClass:"price1"},[e._v("￥"+e._s(e.L_selectDetail.count))])]),e._v(" "),s("div",{staticClass:"coupon"},[s("text",[e._v("优惠券抵扣")]),e._v(" "),s("text",{staticClass:"coupon1"},[e._v(e._s(e.L_selectDetail.couponMoney))])]),e._v(" "),s("div",{staticClass:"coupon"},[s("text",[e._v("运费")]),e._v(" "),s("text",{staticClass:"coupon1"},[e._v("-￥"+e._s(e.L_selectDetail.expressWay))])]),e._v(" "),s("i",{staticClass:"xuXian"}),e._v(" "),null!=e.parent?s("div",{staticClass:"orderNumber"},[e._v(" 父订单编号："+e._s(e.parent.id))]):e._e(),e._v(" "),s("div",{staticClass:"orderNumber"},[e._v("订单编号："+e._s(e.L_selectDetail.orderNo))]),e._v(" "),s("div",{staticClass:"orderNumber"},[e._v("下单时间："+e._s(e.L_selectDetail.createTime))]),e._v(" "),6==e.L_selectDetail.state||7==e.L_selectDetail.state?s("div",{staticClass:"orderNumber"},[e._v("支付时间："+e._s(e.L_selectDetail.payTime))]):e._e(),e._v(" "),6==e.L_selectDetail.state||7==e.L_selectDetail.state?s("div",{staticClass:"orderNumber"},[e._v("发货时间："+e._s(e.L_selectDetail.deliverTime))]):e._e(),e._v(" "),7==e.L_selectDetail.state?s("div",{staticClass:"orderNumber"},[e._v("收货时间："+e._s(e.L_selectDetail.receiptTime))]):e._e()],1):e._e(),e._v(" "),s("div",{staticClass:"foot"},[6==e.L_selectDetail.state?s("span",{staticClass:"btn",attrs:{eventid:"2"},on:{click:function(t){e.seeLogistics()}}},[e._v("查看物流")]):e._e(),e._v(" "),1==e.L_selectDetail.state?s("span",{staticClass:"btn",attrs:{eventid:"3"},on:{click:function(t){e.seePlay()}}},[e._v("确认已支付")]):e._e(),e._v(" "),1==e.L_selectDetail.state?s("span",{staticClass:"btn",attrs:{eventid:"4"},on:{click:function(t){e.close()}}},[e._v("关闭订单")]):e._e()]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.passhowYes,expression:"passhowYes"}],staticClass:"closeTipAll"},[s("div",{staticClass:"closeTip"},[s("div",{staticClass:"closeTip_text"},[s("p",{staticClass:"tipText"},[e._v("是否确认关闭订单!")])],1),e._v(" "),s("div",{staticClass:"confirm_but"},[s("div",[s("button",{attrs:{eventid:"5"},on:{click:e.passYesClose}},[e._v("取消")])],1),e._v(" "),s("div",[s("button",{attrs:{eventid:"6"},on:{click:function(t){e.passYesBut()}}},[e._v("确定")])],1)])])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.pasSeePlay,expression:"pasSeePlay"}],staticClass:"closeTipAll"},[s("div",{staticClass:"closeTip"},[s("div",{staticClass:"closeTip_text"},[s("p",{staticClass:"tipText"},[e._v("确认付款!")])],1),e._v(" "),s("div",{staticClass:"confirm_but"},[s("div",[s("button",{attrs:{eventid:"7"},on:{click:e.pasSeeClose}},[e._v("取消")])],1),e._v(" "),s("div",[s("button",{attrs:{eventid:"8"},on:{click:e.pasSeeBut}},[e._v("确定")])],1)])])])],2)},staticRenderFns:[]};t.a=a}},["+hFP"]);