global.webpackJsonp([48],{"3HUq":function(s,t,a){"use strict";var e={render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return s.navData?a("div",{staticClass:"nav"},[a("div",{staticClass:"maiJia"},[a("text",{staticClass:"name"},[s._v("\n      "+s._s(0==s.navData.state?"未处理":1==s.navData.state?"已通过":2==s.navData.state?"不通过":3==s.navData.state?"同意":4==s.navData.state?"等待卖家发货":"撤销")+"\n    ")])]),s._v(" "),s._l(s.navData.goodsList,function(t,e){return a("div",{key:e,staticClass:"list"},[a("div",{staticClass:"kuang",attrs:{eventid:"0-"+e},on:{click:function(a){s.orderListArr(t.goodsId)}}},[a("img",{staticClass:"sPimg",attrs:{src:t.image}}),s._v(" "),a("div",{staticClass:"textThad"},[a("div",{staticClass:"title"},[s._v(s._s(t.name))]),s._v(" "),a("div",{staticClass:"huo"},[a("text",{staticClass:"name"},[s._v(s._s(t.stallInfo3))]),s._v(" "),a("div",{staticClass:"type"},[s._v("货期:"+s._s(t.delivery))]),s._v(" "),a("span",{staticClass:"number"},[s._v("X"+s._s(t.num))])]),s._v(" "),a("div",{staticClass:"maShuo"},[s._v(s._s(t.skuCode)+"/"+s._s(t.num)+"件")])])]),s._v(" "),a("div",{staticClass:"jiaGe"},[a("text",{staticClass:"text"},[s._v("共"+s._s(t.num)+"件商品,合计: ")]),s._v(" "),a("text",{staticClass:"jiaGet"},[s._v(s._s(t.price)+"元")])])])}),s._v(" "),a("div",{staticClass:"jieShuan"},[a("div",[s._v("买家："+s._s(s.navData.addressName))]),s._v(" "),a("div",[a("div",[s._v(" 姓名："+s._s(s.navData.addressName))]),s._v(" "),a("div",[a("i",{staticClass:"imgSpan"}),s._v(s._s(s.navData.addressMobile)+"\n      ")],1)]),s._v(" "),a("div",[s._v("退款原因："+s._s(s.navData.result))]),s._v(" "),a("div",[s._v("退款金额："+s._s(s.navData.price))]),s._v(" "),a("div",[s._v("申请时间："+s._s(s.navData.handleTime))]),s._v(" "),a("div",[s._v("退款编号："+s._s(s.navData.orderRefundNo))])]),s._v(" "),a("div",{staticClass:"orderImg"},[a("div",{staticClass:"imgAll"},[a("p",[s._v("凭证：")]),s._v(" "),a("div",[a("scroll-view",{attrs:{"scroll-y":"","lower-threshold":"80",width:"100%"}},[a("img",{attrs:{src:s.navData.img1}}),s._v(" "),a("img",{attrs:{src:s.navData.img2}}),s._v(" "),a("img",{attrs:{src:s.navData.img3}}),s._v(" "),a("img",{attrs:{src:s.navData.img4}}),s._v(" "),a("img",{attrs:{src:s.navData.img5}}),s._v(" "),a("img",{attrs:{src:s.navData.img6}})])],1)],1)]),s._v(" "),a("div",{staticClass:"foot"},[a("span",{staticClass:"btn",attrs:{eventid:"1"},on:{click:function(t){s.confirm(s.navData,s.index)}}},[s._v("同意")]),s._v(" "),a("span",{staticClass:"pay",attrs:{eventid:"2"},on:{click:function(t){s.passBut(s.navData,s.idnex)}}},[s._v("拒绝")])]),s._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:s.passhowYes,expression:"passhowYes"}],staticClass:"closeTipAll"},[a("div",{staticClass:"closeTip"},[a("div",{staticClass:"closeTip_text"},[a("p",{staticClass:"tipText"},[s._v("是否确认收货？将自动退还 金额￥"+s._s(s.navData.price)+"给"+s._s(s.navData.addressName))])],1),s._v(" "),a("div",{staticClass:"confirm_but"},[a("div",[a("button",{attrs:{eventid:"3"},on:{click:s.passYesClose}},[s._v("取消")])],1),s._v(" "),a("div",[a("button",{attrs:{eventid:"4"},on:{click:s.passYesBut}},[s._v("确定")])],1)])])]),s._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:s.passhow,expression:"passhow"}],staticClass:"closeTipAll"},[a("div",{staticClass:"closeTip"},[a("div",{staticClass:"closeTip_text"},[a("p",[s._v("填写拒绝理由")]),s._v(" "),a("textarea",{directives:[{name:"model",rawName:"v-model",value:s.textword,expression:"textword"}],attrs:{placeholder:"填输入拒绝理由",eventid:"5"},domProps:{value:s.textword},on:{input:function(t){t.target.composing||(s.textword=t.target.value)}}})],1),s._v(" "),a("div",{staticClass:"closeTip_but"},[a("div",[a("button",{attrs:{eventid:"6"},on:{click:s.passClose}},[s._v("取消")])],1),s._v(" "),a("div",[a("button",{attrs:{eventid:"7"},on:{click:s.passYes}},[s._v("确定")])],1)])])])],2):s._e()},staticRenderFns:[]};t.a=e},IJBd:function(s,t,a){"use strict";var e=a("SccD"),n=a("3HUq");var i=function(s){a("klNB")},o=a("ybqe")(e.a,n.a,i,"data-v-6df5ba06",null);t.a=o.exports},SccD:function(s,t,a){"use strict";var e=a("Xxa5"),n=a.n(e),i=a("exGp"),o=a.n(i),r=a("qTHA");t.a={components:{},data:function(){return{shuoo:0,navData:[],passhowYes:!1,passhow:!1}},methods:{pay:function(){r.a.showModal({content:"是否确认支付！",success:function(s){console.log(s),s.confirm?console.log("用户点击确定"):s.cancel&&console.log("用户点击取消")}})},btn:function(){r.a.showModal({content:"确定关闭订单！",success:function(s){console.log(s),s.confirm?console.log("用户点击确定"):s.cancel&&console.log("用户点击取消")}})},confirm:function(s,t){console.log(s),this.idzz=s.id,this.passhowYes=!0,this.currentSelectedIndex=t,this.moneyzz=s.price},passYesClose:function(){this.passhowYes=!1},passYesBut:function(){var s=this;return o()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.$API.L_dealWithOrder({orderRefundId:s.idzz,state:1});case 2:a=t.sent,console.log(a),1==a.code?(r.a.showToast({title:"退款成功",icon:"success",duration:2e3}),s.passhowYes=!1):s.passhowYes=!1;case 5:case"end":return t.stop()}},t,s)}))()},passBut:function(s,t){console.log(s),this.idzz=s.id,this.passhow=!0,this.currentSelectedIndex=t},passYes:function(){var s=this;return o()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.$API.L_dealWithOrder({orderRefundId:s.idzz,state:2,content:s.textword});case 2:a=t.sent,console.log(a),1==a.code?(r.a.showToast({title:"拒绝成功",icon:"success",duration:2e3}),s.passhow=!1,s.onPlayList.splice(s.currentSelectedIndex,1)):s.passhow=!1;case 5:case"end":return t.stop()}},t,s)}))()},passClose:function(){this.passhow=!1},orderListArr:function(s){console.log(s),this.$router.push({path:"/pages/home/orderMgr/orderList",query:{goodsId:s}})}},mounted:function(){var s=this;return o()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s.orderId=s.$route.query.orderId,console.log(s.orderId),t.next=4,s.$API.L_selectOrderRefundDetail({orderRefundId:s.$route.query.orderId});case 4:a=t.sent,s.navData=a.data,console.log(navData);case 7:case"end":return t.stop()}},t,s)}))()}}},klNB:function(s,t){}},["dHEt"]);