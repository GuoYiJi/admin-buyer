global.webpackJsonp([52],{"20EC":function(s,i,t){"use strict";t("qTHA");i.a={data:{isHasLogistics:!1,orderId:"",logistics:{},logisticsImg:[]},computed:{},methods:{},mounted:function(){var s=this;this.logistics={},this.isHasLogistics=!1,this.logisticsImg=[],this.orderId="",this.$route.query.orderId&&(console.log("请求了售后订单详情"),this.orderId=this.$route.query.orderId,this.$API.L_selectOrderDetail({orderId:this.orderId}).then(function(i){i.data.logistics&&(s.logistics=i.data.logistics,s.isHasLogistics=!0),i.data.logistics.image&&(s.logisticsImg=i.data.logistics.image.split(","))}))}}},"EQ/i":function(s,i){},EYVF:function(s,i,t){"use strict";var o={render:function(){var s=this,i=s.$createElement,t=s._self._c||i;return t("div",{staticClass:"wrapper"},[s.isHasLogistics?t("div",{staticClass:"isHasLogistics"},[t("div",{staticClass:"header"},[t("span",[s._v("物流公司: ")]),s._v(" "),t("span",[s._v(s._s(1===s.logistics.type?"顺丰速运":2===s.logistics.type?"邮政EMS":3===s.logistics.type?"圆通快递":4===s.logistics.type?"申通快递":5===s.logistics.type?"韵达快递":6===s.logistics.type?"百世汇通":7===s.logistics.type?"中通快递":8===s.logistics.type?"天天快递":9===s.logistics.type?"优速物流":"未知物流"))])]),s._v(" "),t("div",{staticClass:"logisticsNo"},[t("span",[s._v("快递单号: ")]),s._v(" "),t("span",[s._v(s._s(s.logistics.logisticsNo))])]),s._v(" "),t("div",{staticClass:"body"},s._l(s.logisticsImg,function(s,i){return t("image",{key:i,attrs:{src:s,width:"100%"}})}))]):t("div",{staticClass:"noHasLogistics"},[s._v("\n    无物流状态\n  ")])])},staticRenderFns:[]};i.a=o},f2GG:function(s,i,t){"use strict";var o=t("20EC"),a=t("EYVF");var c=function(s){t("EQ/i")},e=t("ybqe")(o.a,a.a,c,"data-v-6301eac5",null);i.a=e.exports}},["hq39"]);