global.webpackJsonp([45],{"+Vv2":function(t,s,a){"use strict";var e=a("K1k9"),i=a("wyAN");var n=function(t){a("vyLD")},r=a("ybqe")(e.a,i.a,n,"data-v-7274ae51",null);s.a=r.exports},K1k9:function(t,s,a){"use strict";var e=a("Xxa5"),i=a.n(e),n=a("exGp"),r=a.n(n),o=a("qTHA");s.a={components:{},data:function(){return{shuoo:0,navData:[],passhowYes:!1,passhow:!1}},methods:{pay:function(){o.a.showModal({content:"是否确认支付！",success:function(t){t.confirm||t.cancel}})},btn:function(){o.a.showModal({content:"确定关闭订单！",success:function(t){t.confirm||t.cancel}})},confirm:function(t,s){this.idzz=t.id,this.passhowYes=!0,this.currentSelectedIndex=s,this.moneyzz=t.price},passYesClose:function(){this.passhowYes=!1},passYesBut:function(){var t=this;return r()(i.a.mark(function s(){return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.$API.L_dealWithOrder({orderRefundId:t.idzz,state:1});case 2:1==s.sent.code?(o.a.showToast({title:"退款成功",icon:"success",duration:2e3}),t.passhowYes=!1):t.passhowYes=!1;case 4:case"end":return s.stop()}},s,t)}))()},passBut:function(t,s){this.idzz=t.id,this.passhow=!0,this.currentSelectedIndex=s},passYes:function(){var t=this;return r()(i.a.mark(function s(){var a;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.$API.L_dealWithOrder({orderRefundId:t.idzz,state:2,content:t.textword});case 2:a=s.sent,console.log(a),1==a.code?(o.a.showToast({title:"拒绝成功",icon:"success",duration:2e3}),t.passhow=!1,t.onPlayList.splice(t.currentSelectedIndex,1)):t.passhow=!1;case 5:case"end":return s.stop()}},s,t)}))()},passClose:function(){this.passhow=!1},orderListArr:function(t){this.$router.push({path:"/pages/home/orderMgr/orderList",query:{goodsId:t}})}},mounted:function(){var t=this;return r()(i.a.mark(function s(){var a;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return t.orderId=t.$route.query.orderId,s.next=3,t.$API.L_selectOrderRefundDetail({orderId:t.$route.query.orderId});case 3:a=s.sent,t.navData=a.data;case 5:case"end":return s.stop()}},s,t)}))()}}},vyLD:function(t,s){},wyAN:function(t,s,a){"use strict";var e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return t.navData?a("div",{staticClass:"nav"},[a("div",{staticClass:"maiJiazz"},[a("text",{staticClass:"name"},[t._v("\n      "+t._s(0==t.navData.refundType?"仅退款：":1==t.navData.refundType?"退货退款：":"换货：")+"\n      "+t._s(0==t.navData.state?"未处理":1==t.navData.state?"等待卖家发货":2==t.navData.state?"被拒绝":3==t.navData.state?"同意":4==t.navData.state?"等待卖家发货":"关闭")+"\n    ")])]),t._v(" "),t._m(0),t._v(" "),t._l(t.navData.goodsList,function(s,e){return a("div",{key:e,staticClass:"list"},[a("div",{staticClass:"kuang",attrs:{eventid:"0-"+e},on:{click:function(a){t.orderListArr(s.goodsId)}}},[a("img",{staticClass:"sPimg",attrs:{src:s.image}}),t._v(" "),a("div",{staticClass:"textThad"},[a("div",{staticClass:"title"},[t._v(t._s(s.name))]),t._v(" "),a("div",{staticClass:"huo"},[a("text",{staticClass:"name"},[t._v(t._s(s.stallInfo3))]),t._v(" "),a("div",{staticClass:"type"},[t._v("货期:"+t._s(s.delivery))]),t._v(" "),a("span",{staticClass:"number"},[t._v("X"+t._s(s.num))])]),t._v(" "),a("div",{staticClass:"maShuo"},[t._v(t._s(s.skuCode)+"/"+t._s(s.num)+"件")])])]),t._v(" "),a("div",{staticClass:"jiaGe"},[a("text",{staticClass:"text"},[t._v("共"+t._s(s.num)+"件商品,合计: ")]),t._v(" "),a("text",{staticClass:"jiaGet"},[t._v(t._s(s.price)+"元")])])])}),t._v(" "),a("div",{staticClass:"jieShuan"},[a("div",[t._v("买家："+t._s(t.navData.addressName))]),t._v(" "),a("div",[a("div",[t._v(" 姓名："+t._s(t.navData.addressName))]),t._v(" "),a("div",[a("i",{staticClass:"imgSpan"}),t._v(t._s(t.navData.addressMobile)+"\n      ")],1)]),t._v(" "),a("div",[t._v("退款原因："+t._s(t.navData.result))]),t._v(" "),a("div",[t._v("退款金额："+t._s(t.navData.price))]),t._v(" "),a("div",[t._v("申请时间："+t._s(t.navData.handleTime))]),t._v(" "),a("div",[t._v("退款编号："+t._s(t.navData.orderRefundNo))])]),t._v(" "),a("div",{staticClass:"orderImg"},[a("div",{staticClass:"imgAll"},[a("p",[t._v("凭证：")]),t._v(" "),t.navData?a("div",[a("scroll-view",{attrs:{"scroll-y":"","lower-threshold":"80",width:"100%"}},[a("img",{attrs:{src:t.navData.img1}}),t._v(" "),a("img",{attrs:{src:t.navData.img2}}),t._v(" "),a("img",{attrs:{src:t.navData.img3}}),t._v(" "),a("img",{attrs:{src:t.navData.img4}}),t._v(" "),a("img",{attrs:{src:t.navData.img5}}),t._v(" "),a("img",{attrs:{src:t.navData.img6}})])],1):t._e()],1)]),t._v(" "),a("div",{staticClass:"foot"}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.passhowYes,expression:"passhowYes"}],staticClass:"closeTipAll"},[a("div",{staticClass:"closeTip"},[a("div",{staticClass:"closeTip_text"},[a("p",{staticClass:"tipText"},[t._v("是否确认收货？将自动退还 金额￥"+t._s(t.navData.price))])],1),t._v(" "),a("div",{staticClass:"confirm_but"},[a("div",[a("button",{attrs:{eventid:"1"},on:{click:t.passYesClose}},[t._v("取消")])],1),t._v(" "),a("div",[a("button",{attrs:{eventid:"2"},on:{click:t.passYesBut}},[t._v("确定")])],1)])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.passhow,expression:"passhow"}],staticClass:"closeTipAll"},[a("div",{staticClass:"closeTip"},[a("div",{staticClass:"closeTip_text"},[a("p",[t._v("填写拒绝理由")]),t._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.textword,expression:"textword"}],attrs:{placeholder:"填输入拒绝理由",eventid:"3"},domProps:{value:t.textword},on:{input:function(s){s.target.composing||(t.textword=s.target.value)}}})],1),t._v(" "),a("div",{staticClass:"closeTip_but"},[a("div",[a("button",{attrs:{eventid:"4"},on:{click:t.passClose}},[t._v("取消")])],1),t._v(" "),a("div",[a("button",{attrs:{eventid:"5"},on:{click:t.passYes}},[t._v("确定")])],1)])])])],2):t._e()},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"maiJia"},[s("text",{staticClass:"name"},[this._v("\n      退款信息\n    ")])])}]};s.a=e}},["9l0T"]);