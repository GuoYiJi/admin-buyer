global.webpackJsonp([59],{"+Vsl":function(t,s,n){"use strict";var e=n("5i2m"),a=n("5IGO");var o=function(t){n("SAYs")},i=n("ybqe")(e.a,a.a,o,"data-v-76852aed",null);s.a=i.exports},"5IGO":function(t,s,n){"use strict";var e={render:function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"home"},[n("form",{staticClass:"form"},[n("div",{staticClass:"head"},[n("span",{staticClass:"head_text"},[t._v("优惠券名称：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.couponInfo.name,expression:"couponInfo.name"}],staticClass:"head_input",attrs:{type:"text",placeholder:"请输入（8个字以内，不可特殊字符）",disabled:"true",eventid:"0"},domProps:{value:t.couponInfo.name},on:{input:function(s){s.target.composing||(t.couponInfo.name=s.target.value)}}})]),t._v(" "),n("div",{staticClass:"value"},[n("span",{staticClass:"value_text"},[t._v("面值：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.couponInfo.price,expression:"couponInfo.price"}],staticClass:"value_input",attrs:{type:"digit",placeholder:"请输入面值",disabled:"true",eventid:"1"},domProps:{value:t.couponInfo.price},on:{input:function(s){s.target.composing||(t.couponInfo.price=s.target.value)}}})]),t._v(" "),n("div",{staticClass:"grant"},[n("span",{staticClass:"grant_text"},[t._v("发放总量：")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.count,expression:"count"}],staticClass:"grant_input",attrs:{type:"number",placeholder:"请输入发放数量",eventid:"2"},domProps:{value:t.count},on:{input:function(s){s.target.composing||(t.count=s.target.value)}}})]),t._v(" "),n("div",{staticClass:"effect"},[n("span",{staticClass:"text"},[t._v("生效时间：")]),t._v(" "),n("span",{staticClass:"settings"},[t._v("\n        "+t._s(t.startTime)+"\n      ")])]),t._v(" "),n("div",{staticClass:"effect"},[n("span",{staticClass:"text"},[t._v("过期时间：")]),t._v(" "),n("span",{staticClass:"settings"},[t._v("\n        "+t._s(t.endTime)+"\n      ")])]),t._v(" "),n("div",{staticClass:"effect",attrs:{eventid:"3"},on:{click:t.Receive}},[n("span",{staticClass:"text"},[t._v("领取设置：")]),t._v(" "),n("span",{staticClass:"settings"},[n("span",{staticClass:"settings_text"},[t._v(t._s(1==t.couponInfo.isLimitCount?"不限金额":"满"+t.couponInfo.limitCount+"元可用"))])])]),t._v(" "),n("div",{staticClass:"effect",attrs:{eventid:"4"},on:{click:t.Use}},[n("span",{staticClass:"text"},[t._v("使用设置：")]),t._v(" "),n("span",{staticClass:"settings"},[n("span",{staticClass:"settings_text"},[t._v(t._s(1==t.couponInfo.isOriginalPrice?"仅原价购买可用":"可用于打折商品")+"|"+t._s(1==t.couponInfo.isAll?"适用于"+t.couponInfo.originalGoodsCount+"件商品":"适用于全部商品"))])])])]),t._v(" "),n("div",{staticClass:"btn"},[n("button",{staticClass:"btn_1",attrs:{eventid:"5"},on:{click:function(s){t.updateCoupon()}}},[t._v("保存")]),t._v(" "),0==t.state?n("button",{staticClass:"btn_2",attrs:{eventid:"6"},on:{click:function(s){t.changeState()}}},[t._v("使失效")]):t._e()],1)],1)},staticRenderFns:[]};s.a=e},"5i2m":function(t,s,n){"use strict";var e=n("qTHA");s.a={data:function(){return{couponInfo:{},startTime:"",endTime:"",count:0,state:0}},methods:{updateCoupon:function(){var t=this;this.count?this.$API.updateCoupon({couponId:this.couponInfo.id,count:this.count}).then(function(s){e.a.showToast({title:"修改成功",icon:"success"}),setTimeout(function(){t.$router.back(-1)},1500)}):e.a.showToast({title:"发放数量不能为空",icon:"none"})},changeState:function(){var t=this;this.$API.changeState({couponId:this.couponInfo.id}).then(function(s){e.a.showToast({title:"已失效",icon:"success"}),setTimeout(function(){t.$router.back(-1)},1500)})}},mounted:function(){this.$route.query.item&&(this.state=JSON.parse(this.$route.query.state),console.log(this.state),this.couponInfo=JSON.parse(this.$route.query.item),this.count=this.couponInfo.count,this.startTime=this.couponInfo.startTime.split(" ")[0].toString(),this.endTime=this.couponInfo.endTime.split(" ")[0].toString())}}},SAYs:function(t,s){}},["YNhx"]);