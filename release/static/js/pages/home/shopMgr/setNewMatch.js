global.webpackJsonp([34],{"2GrU":function(t,s,a){"use strict";var o=a("MtdB"),i=a("VO/7");var e=function(t){a("haTi")},c=a("ybqe")(o.a,i.a,e,"data-v-5cb8a084",null);s.a=c.exports},MtdB:function(t,s,a){"use strict";var o=a("Dd8w"),i=a.n(o),e=(a("qTHA"),a("90m7")),c=a("NYxO");s.a={mixins:[e.a],components:{},data:function(){return{matchGoodsList:[],id:"",title:"",shopId:"",selectShopArr:[]}},computed:i()({},Object(c.b)(["shopMatch"]),{goodsIds:function(){var t=[];return this.shopMatch.forEach(function(s,a){t[a]=s.goodsId}),t}}),methods:{toCancel:function(t){console.log(t),this.$store.commit("SPLICEMATCH",t),this.goodsIds.splice(t,1),console.log(this.goodsIds)},addShopList:function(){this.$router.push("/pages/")},submit:function(){var t=this;this.title?this.title.length>8?this.$Toast({content:"标题字数最多为8个",type:"error"}):this.shopMatch.length>9?this.$Toast({content:"最多添加9个商品, 请检查",type:"error"}):0===this.shopMatch.length?this.$Toast({content:"请添加商品",type:"error"}):(console.log(this.goodsIds),this.$API.s_addMatch({title:this.title,goodsIds:this.goodsIds.toString()}).then(function(s){console.log(s),1===s.code&&(t.$Toast({content:"创建成功",type:"success"}),t.$router.back(-1))})):this.$Toast({content:"未设置系列标题",type:"error"})}}}},"VO/7":function(t,s,a){"use strict";var o={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"home"},[a("i-toast",{attrs:{id:"toast",mpcomid:"0"}}),t._v(" "),a("div",{staticClass:"title_box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"input_title",attrs:{placeholder:"请输入标题",eventid:"0"},domProps:{value:t.title},on:{input:function(s){s.target.composing||(t.title=s.target.value)}}})]),t._v(" "),a("div",{staticClass:"add_shops"},[a("div",{staticClass:"box-wrapper"},[t.shopMatch[0]?a("div",{staticClass:"shop-card"},[a("div",{staticClass:"img_box"},[a("i",{staticClass:"shopImg",style:{backgroundImage:"url("+t.shopMatch[0].image+")"}},[a("i",{staticClass:"cancel_shop",attrs:{eventid:"1"},on:{click:function(s){t.toCancel(0)}}})],1)],1),t._v(" "),a("span",{staticClass:"name"},[t._v(t._s(t.shopMatch[0].name))]),t._v(" "),a("span",{staticClass:"desc"},[t._v(" 货期:"+t._s(t.shopMatch[0].delivery)+"丨销量:"+t._s(t.shopMatch[0].sellCount))]),t._v(" "),a("span",{staticClass:"sell"},[a("strong",[t._v("售价:￥"+t._s(t.shopMatch[0].sellPrice))]),t._v(" 利润:￥"+t._s(t.shopMatch[0].profit))],1)]):a("div",{staticClass:"shop-card add_shop",attrs:{eventid:"2"},on:{click:function(s){t.toRoute("home/shopMgr/matchList")}}},[t._v("+添加商品")])])]),t._v(" "),a("div",{staticClass:"add_other_shop"},[t._l(t.shopMatch,function(s,o){return o>0?a("div",{key:o,staticClass:"box-wrapper"},[a("div",{staticClass:"shop-cards"},[a("div",{staticClass:"img_box"},[a("i",{staticClass:"shopImg",style:{backgroundImage:"url("+s.image+")"}},[a("i",{staticClass:"cancel_shop",attrs:{eventid:"3-"+o},on:{click:function(s){t.toCancel(o)}}})],1)],1),t._v(" "),a("span",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),a("span",{staticClass:"desc"},[t._v("货期:"+t._s(s.delivery)+"丨销量:"+t._s(s.sellCount))]),t._v(" "),a("span",{staticClass:"sell"},[a("strong",[t._v("售价:￥"+t._s(s.sellPrice))]),t._v(" 利润:￥"+t._s(s.profit))],1)])]):t._e()}),t._v(" "),t.shopMatch.length<10?a("div",{staticClass:"box-wrapper"},[a("div",{staticClass:"shop-cards add_shop",attrs:{eventid:"4"},on:{click:function(s){t.toRoute("home/shopMgr/matchList")}}},[t._v("+添加商品")])]):t._e()],2),t._v(" "),a("p",{staticClass:"bottom"}),t._v(" "),a("p",{staticClass:"save",attrs:{eventid:"5"},on:{click:function(s){t.submit()}}},[t._v("确定")])],1)},staticRenderFns:[]};s.a=o},haTi:function(t,s){}},["Stol"]);