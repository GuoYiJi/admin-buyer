global.webpackJsonp([8],{"/mzE":function(t,s,e){"use strict";var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"nav"},[t._l(t.noSigleList,function(s,a){return e("div",{key:a},[e("div",{staticClass:"kuang"},[e("div",{staticClass:"head"},[e("p",{staticClass:"order"},[t._v("订单编号："+t._s(s.orderNo))]),t._v(" "),e("p",{staticClass:"state"},[t._v("\n          "+t._s(1==s.state?"待支付":2==s.state?"已取消":3==s.state?"已支付":4==s.state?"支付失败":5==s.state?"待发货":6==s.state?"已发货":7==s.state?"已完成":8==s.state?"已关闭":9==s.state?"拼单":"售后")+" \n          ")])],1),t._v(" "),e("div",{staticClass:"middle",attrs:{eventid:"0-"+a},on:{click:function(e){t.sanJiaoBut(s.id)}}},[t._l(s.orderGoods,function(t,s){return e("div",{key:s,staticClass:"picture"},[e("img",{staticClass:"imgOne",attrs:{src:t.image}})])}),t._v(" "),e("i",{staticClass:"sanJiao"})],2),t._v(" "),e("div",{staticClass:"jieShuan"},[e("div",{staticClass:"quantity"},[t._v("共"+t._s(s.num)+"个款，合计"+t._s(s.num)+"件")]),t._v(" "),e("div",{staticClass:"money"},[t._v("订单金额：\n          "),e("p",{staticClass:"money1"},[t._v(t._s(s.count)+"元")])],1),t._v(" "),e("div",{staticClass:"phone"},[t._v("收货人:"+t._s(s.receiptName)+" "+t._s(s.phone))])]),t._v(" "),e("div",{staticClass:"foot"},[t._l(s.pingUser,function(s,a){return a<3?e("div",{key:a,staticClass:"picture_1"},[e("img",{staticClass:"imgTwo",attrs:{src:s.head}})]):t._e()}),t._v(" "),e("div",{staticClass:"btn"},[0==t.btn?e("span",{staticClass:"see",attrs:{eventid:"1-"+a},on:{click:function(e){t.seeBut(s.id)}}},[t._v("查看详情")]):t._e(),t._v(" "),1==s.state?e("span",{staticClass:"close",attrs:{eventid:"2-"+a},on:{click:function(e){t.close(s.id,a)}}},[t._v("关闭订单")]):t._e(),t._v(" "),-1==s.layer&&9==s.state?e("span",{staticClass:"collage",attrs:{eventid:"3-"+a},on:{click:function(e){t.seeSuborder(s.id)}}},[t._v("查看子拼团")]):t._e()])],2)])])}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.passhowYes,expression:"passhowYes"}],staticClass:"closeTipAll"},[e("div",{staticClass:"closeTip"},[e("div",{staticClass:"closeTip_text"},[e("p",{staticClass:"tipText"},[t._v("是否确认关闭订单!")])],1),t._v(" "),e("div",{staticClass:"confirm_but"},[e("div",[e("button",{attrs:{eventid:"4"},on:{click:t.passYesClose}},[t._v("取消")])],1),t._v(" "),e("div",[e("button",{attrs:{eventid:"5"},on:{click:t.passYesBut}},[t._v("确定")])],1)])])])],2)},staticRenderFns:[]};s.a=a},Jd4z:function(t,s){},RWkG:function(t,s){},UYzs:function(t,s,e){"use strict";var a=e("ox9x"),n=e("/mzE");var i=function(t){e("RWkG")},r=e("ybqe")(a.a,n.a,i,"data-v-bb67a04e",null);s.a=r.exports},Ueii:function(t,s,e){"use strict";var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"home"},[e("div",{staticClass:"search-box"},[e("div",{staticClass:"input"},[e("p",{staticClass:"search-icon"},[e("i",{staticClass:"search"})],1),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"input-box",attrs:{placeholder:"请输入您要搜索的内容",eventid:"0"},domProps:{value:t.keyword},on:{input:function(s){s.target.composing||(t.keyword=s.target.value)}}}),t._v(" "),e("p",{staticClass:"confirm",attrs:{eventid:"1"},on:{click:t.keywordBut}},[t._v("确认")])],1)]),t._v(" "),e("div",{staticClass:"scroll-box"},[e("div",{staticClass:"box"},[e("p",[e("Collage",{attrs:{noSigleList:t.noSigleList,mpcomid:"0"}})],1)],1)])])},staticRenderFns:[]};s.a=a},oNPL:function(t,s,e){"use strict";var a=e("oWqp"),n=e("Ueii");var i=function(t){e("Jd4z")},r=e("ybqe")(a.a,n.a,i,"data-v-5b58e23b",null);s.a=r.exports},oWqp:function(t,s,e){"use strict";var a=e("Xxa5"),n=e.n(a),i=e("exGp"),r=e.n(i),o=(e("qTHA"),e("UYzs"));s.a={components:{Collage:o.a},data:function(){return{keyword:""}},methods:{keywordBut:function(){var t=this;return r()(n.a.mark(function s(){var e,a,i;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(e=t.$route.query.id,console.log(e),2!=e){s.next=9;break}return s.next=5,t.$API.L_OrderAddress({keyword:t.keyword,orderType:1});case 5:a=s.sent,console.log(a),s.next=14;break;case 9:return s.next=11,t.$API.L_selectOrderPage({keyword:t.keyword,orderType:1});case 11:i=s.sent,t.noSigleList=i.data.list,console.log(t.noSigleList);case 14:case"end":return s.stop()}},s,t)}))()}},mounted:function(){}}},ox9x:function(t,s,e){"use strict";var a=e("Xxa5"),n=e.n(a),i=e("exGp"),r=e.n(i),o=e("qTHA");s.a={components:{},data:function(){return{btn:0,navData:[],groupOrderzz:[],sessionIdzz:"",url:"",passhowYes:!1,orderID:"",currentSelectedIndex:0}},props:{noSigleList:{type:Array,default:function(){return[]}}},methods:{close:function(t,s){this.passhowYes=!0,this.orderID=t,this.currentSelectedIndex=s},passYesClose:function(){this.passhowYes=!1},passYesBut:function(){var t=this;return r()(n.a.mark(function s(){var e;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.$API.L_shopClose({orderId:t.orderID});case 2:e=s.sent,console.log(e),1==e.code?(o.a.showToast({title:"成功",icon:"success",duration:2e3}),t.passhowYes=!1,t.onPlayList.splice(t.currentSelectedIndex,1)):t.passhowYes=!1;case 5:case"end":return s.stop()}},s,t)}))()},sanJiaoBut:function(t){console.log(123),this.$router.push({path:"/pages/home/orderMgr/orderdetails",query:{orderId:t}})},seeBut:function(t){this.$router.push({path:"/pages/home/orderMgr/collage/collect",query:{orderId:t}})},seeSuborder:function(t){this.$router.push({path:"suborders/suborders",query:{id:t}})}},created:function(){},mounted:function(){var t=this;return r()(n.a.mark(function s(){return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:t.url=config.url+"/api/order/shopClose",console.log(t.url);case 2:case"end":return s.stop()}},s,t)}))()}}}},["ybtm"]);