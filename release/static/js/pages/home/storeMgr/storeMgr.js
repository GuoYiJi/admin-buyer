global.webpackJsonp([21],{"6vrD":function(t,s,e){"use strict";var i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"home"},[e("div",{staticClass:"user-img",attrs:{eventid:"0"},on:{click:function(s){t.toRoute("decorate/msg")}}},[e("i",{staticClass:"i_store"}),t._v(" "),e("p",{staticClass:"name"},[t._v(t._s(t.selectWarehouse.name))]),t._v(" "),e("img",{staticClass:"upload",attrs:{src:t.selectWarehouse.img}})],1),t._v(" "),e("div",{staticClass:"line-box"},[e("div",{staticClass:"line b_line",attrs:{eventid:"1"},on:{click:function(s){t.toRoute("sendWay/sendWay")}}},[e("i",{staticClass:"i_s2 i-icon"}),t._v(" "),e("p",{staticClass:"input"},[t._v("发货方式")])],1),t._v(" "),e("div",{staticClass:"line b_line",attrs:{eventid:"2"},on:{click:function(s){t.toRoute("storeAdr/storeAdr")}}},[e("i",{staticClass:"i_s3 i-icon"}),t._v(" "),e("p",{staticClass:"input"},[t._v("商家地址")])],1),t._v(" "),e("div",{staticClass:"line",attrs:{eventid:"3"},on:{click:function(s){t.toRoute("decorateTmp")}}},[e("i",{staticClass:"i_s4 i-icon"}),t._v(" "),e("p",{staticClass:"input"},[t._v("店铺装修")])],1)])])},staticRenderFns:[]};s.a=i},Rd75:function(t,s,e){"use strict";var i=e("re0e"),a=e("6vrD");var n=function(t){e("StfB")},o=e("ybqe")(i.a,a.a,n,"data-v-ff41934e",null);s.a=o.exports},StfB:function(t,s){},re0e:function(t,s,e){"use strict";var i=e("qTHA");s.a={components:{},data:function(){return{selectWarehouse:""}},methods:{toRoute:function(t){this.$router.push("/pages/home/storeMgr/"+t)},getUserInfo:function(){var t=this;this.$API.selectWarehouse({}).then(function(s){t.selectWarehouse=s.data})}},onShow:function(){i.a.removeStorageSync("FMimg"),i.a.removeStorageSync("remark"),this.getUserInfo()},mounted:function(){this.getUserInfo()}}}},["cqYl"]);