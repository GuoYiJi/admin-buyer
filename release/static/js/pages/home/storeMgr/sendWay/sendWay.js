global.webpackJsonp([24],{GvxS:function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("div",{staticClass:"line-box"},[s("div",{staticClass:"line",attrs:{eventid:"0"},on:{click:function(e){t.toRoute("sendWay/selectTemplet")}}},[s("p",{staticClass:"name"},[t._v("快递邮寄")]),t._v(" "),s("p",{staticClass:"setting"},[t._v(t._s(t.isSetting?"已设置":"未设置"))]),t._v(" "),s("i",{staticClass:"goback"})],1),t._v(" "),s("div",{staticClass:"line flex"},[s("p",{staticClass:"name"},[t._v("物流到付")]),t._v(" "),s("i-switch",{attrs:{value:t.switch1,eventid:"1",mpcomid:"0"},on:{change:t.onChange},slot:"footer"})],1)])])},staticRenderFns:[]};e.a=a},Y5UA:function(t,e,s){"use strict";var a=s("fZjL"),i=s.n(a),n=s("qTHA");e.a={data:function(){return{switch1:!1,templateId:"",isSetting:!1}},computed:{isGetPay:function(){return this.switch1?"1":"0"}},methods:{toRoute:function(t){this.$router.push("/pages/home/storeMgr/"+t)},onChange:function(t){var e=t.mp.detail;this.setData({switch1:e.value}),n.a.showLoading({title:"请求中"}),this.$API.changeExpressType({isGetPay:this.isGetPay}).then(function(t){n.a.hideLoading()})},setData:function(t){var e=this;i()(t).forEach(function(s){e[s]=t[s]})},getIsGetPay:function(){var t=this;this.$API.selectWarehouse({}).then(function(e){e.data.isGetPay?t.isGetPay=e.data.isGetPay:t.isGetPay=!1})}},mounted:function(){n.a.getStorageSync("templateId")&&(this.isSetting=!0),this.getIsGetPay()},onShow:function(){n.a.getStorageSync("templateId")&&(this.isSetting=!0),this.getIsGetPay()}}},dr8G:function(t,e,s){"use strict";var a=s("Y5UA"),i=s("GvxS");var n=function(t){s("gsVF")},o=s("ybqe")(a.a,i.a,n,"data-v-2ee3fc8d",null);e.a=o.exports},gsVF:function(t,e){}},["lnlo"]);