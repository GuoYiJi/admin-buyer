global.webpackJsonp([35],{"5qde":function(t,s){},"9lNv":function(t,s,i){"use strict";var o=i("VJOY"),a=i("N+wE");var e=function(t){i("5qde")},c=i("ybqe")(o.a,a.a,e,"data-v-89416ab8",null);s.a=c.exports},"N+wE":function(t,s,i){"use strict";var o={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"home"},[i("i-toast",{attrs:{id:"toast",mpcomid:"0"}}),t._v(" "),i("div",{staticClass:"title_box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"input_title",attrs:{placeholder:"请输入标题",eventid:"0"},domProps:{value:t.title},on:{input:function(s){s.target.composing||(t.title=s.target.value)}}})]),t._v(" "),i("div",{staticClass:"add_shops"},[i("div",{staticClass:"box-wrapper"},[t.shopMatch&&t.shopMatch[0]?i("div",{staticClass:"shop-card"},[i("div",{staticClass:"img_box"},[i("i",{staticClass:"shopImg",style:{backgroundImage:"url("+t.shopMatch[0].image+")"}})],1),t._v(" "),i("span",{staticClass:"name"},[t._v(t._s(t.shopMatch[0].name))]),t._v(" "),i("span",{staticClass:"desc"},[t._v(" 货期:"+t._s(t.shopMatch[0].delivery)+"丨销量:"+t._s(t.shopMatch[0].sellCount))]),t._v(" "),i("span",{staticClass:"sell"},[i("strong",[t._v("售价:￥"+t._s(t.shopMatch[0].sellPrice))]),t._v(" 利润:￥"+t._s(t.shopMatch[0].profit))],1)]):i("div",{staticClass:"shop-card add_shop",attrs:{eventid:"1"},on:{click:function(s){t.toRoute("home/shopMgr/matchList")}}},[t._v("\n        +添加商品\n      ")]),t._v(" "),i("i",{staticClass:"cancel_shop",attrs:{eventid:"2"},on:{click:function(s){t.toCancel(t.idx)}}})],1)]),t._v(" "),i("div",{staticClass:"add_other_shop"},[t._l(t.shopMatch,function(s,o){return o>0?i("div",{key:o,staticClass:"box-wrapper"},[i("div",{staticClass:"shop-cards"},[i("div",{staticClass:"img_box"},[i("i",{staticClass:"shopImg",style:{backgroundImage:"url("+s.image+")"}})],1),t._v(" "),i("span",{staticClass:"name"},[t._v(t._s(s.name))]),t._v(" "),i("span",{staticClass:"desc"},[t._v("货期:"+t._s(s.delivery)+"丨销量:"+t._s(s.sellCount))]),t._v(" "),i("span",{staticClass:"sell"},[i("strong",[t._v("售价:￥"+t._s(s.sellPrice))]),t._v(" 利润:￥"+t._s(s.profit))],1)]),t._v(" "),i("i",{staticClass:"cancel_shop",attrs:{eventid:"3-"+o},on:{click:function(s){t.toCancel(o)}}})],1):t._e()}),t._v(" "),t.shopMatch.length<10?i("div",{staticClass:"box-wrapper"},[i("div",{staticClass:"add_shop",attrs:{eventid:"4"},on:{click:function(s){t.toRoute("home/shopMgr/matchList")}}},[t._v("+添加商品")])]):t._e()],2),t._v(" "),i("p",{staticClass:"bottom"}),t._v(" "),i("p",{staticClass:"save",attrs:{eventid:"5"},on:{click:function(s){t.submit()}}},[t._v("确定")])],1)},staticRenderFns:[]};s.a=o},VJOY:function(t,s,i){"use strict";var o=i("Dd8w"),a=i.n(o),e=(i("qTHA"),i("90m7")),c=i("NYxO");s.a={mixins:[e.a],components:{},data:function(){return{id:"",title:"",shopId:""}},computed:a()({},Object(c.b)(["shopMatch"]),{goodsIds:function(){var t=[];return this.shopMatch.forEach(function(s,i){t[i]=s.goodsId}),t}}),methods:{addShopMatch:function(){this.$store.commit("ADDMATCH",[]),console.log(this.shopMatch),this.$router.push("/matchList")},toCancel:function(t){console.log(t),this.$store.commit("SPLICEMATCH",t),console.log(this.shopMatch)},submit:function(){var t=this;this.title?this.title.length>8?this.$Toast({content:"标题字数最多为8个",type:"error"}):(console.log(this.goodsIds),this.$API.editMatchGoods({id:this.id,title:this.title,goodsIds:this.goodsIds.toString()}).then(function(s){1===s.code&&t.$router.back(-1)})):this.$Toast({content:"未设置搭配标题",type:"warning"})}},mounted:function(){console.log(this.shopMatch),console.log(this.goodsIds),this.id=this.$route.query.id,this.title=this.$route.query.title}}}},["PssE"]);