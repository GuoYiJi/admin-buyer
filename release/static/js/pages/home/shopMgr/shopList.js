global.webpackJsonp([5],{"16vY":function(t,s,e){"use strict";var a=e("woOf"),i=e.n(a),o=e("Xxa5"),c=e.n(o),r=e("exGp"),n=e.n(r),l=e("Dd8w"),u=e.n(l),p=(e("qTHA"),e("7BN9")),h=e("P9O9"),d=e("90m7"),v=e("yHWc"),g=e("NYxO");e("P6JL");s.a={mixins:[d.a],components:{scard:p.a,loading:h.a,selsearch:v.a},computed:u()({groupNum:function(){return this.selIds.length>0?"("+this.selIds.length+")":""}},Object(g.b)(["shopSelectList"])),watch:{edit:function(t,s){this.edit=!this.edit}},data:function(){return{selecteds:[],showUp:!1,asceSale:!0,ascePrice:!0,tag:1,showRight1:!1,edit:!0,allCheck:!1,shopNum:0,shopList:[],showLoad:!1,canLoad:!0,pageSize:20,type:0,selIds:[],state:1,groupPriceData:[]}},methods:{confirm:function(){var t=this;this.selecteds.forEach(function(s){var e=s.id,a=s.groupPrice;if(s.bool)if(t.selIds&&t.selIds.some(function(t){return t==e})){var i=t.selIds.indexOf(e);t.selIds[i]=e,t.groupPriceData[i]=a,t.$store.commit("SETROUNPPRICE",i,{id:e,groupPrice:a})}else t.selIds.push(e),t.groupPriceData.push(a),t.$store.commit("PUSTROUNPPRICE",{id:e,groupPrice:a});else{var o=t.selIds.indexOf(e);t.selIds.splice(o,1),t.groupPriceData.splice(o,1),t.$store.commit("SPLICEROUNPPRICE",o)}console.log(t.shopSelectList)}),this.$router.back(-1)},handleTag:function(t){var s=this;return n()(c.a.mark(function e(){var a,i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(s.tag=t,a=1,s.shopNum=0,s.canLoad=!0,s.showLoad=!1,2===t&&(s.asceSale=!s.asceSale,a=s.asceSale?2:3),4===t&&(s.ascePrice=!s.ascePrice,a=s.ascePrice?4:5),5!==t){e.next=10;break}return s.toggleRight1(),e.abrupt("return");case 10:return s.type=a,e.next=13,s.getNextPage({ob:a,state:s.state});case 13:i=e.sent,s.shopList=i.data.list,i.data.list.length<s.pageSize&&(s.canLoad=!1);case 16:case"end":return e.stop()}},e,s)}))()},toggleRight1:function(){this.showRight1=!this.showRight1},searchShop:function(t){return t.pageSize=this.pageSize,this.$API.s_getCanGroup(t)},getNextPage:function(t){return this.shopNum++,5==this.tag&&(t=i()(t,this.selParam)),t.pageNumber=this.shopNum,this.searchShop(t)},lower:function(t){var s=this;return n()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(s.canLoad){t.next=2;break}return t.abrupt("return");case 2:if(!s.showLoad){t.next=4;break}return t.abrupt("return");case 4:return s.showLoad=!0,t.next=7,s.getNextPage({ob:s.type,state:s.state});case 7:e=t.sent,setTimeout(function(){e.data.list.length<s.pageSize&&(s.canLoad=!1),s.shopList=s.shopList.concat(e.data.list),s.showLoad=!1},2e3);case 9:case"end":return t.stop()}},t,s)}))()},comSearch:function(t){var s=this;return n()(c.a.mark(function e(){var a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s.toggleRight1(),s.selParam=t,e.next=4,s.getNextPage({ob:0,state:s.state});case 4:a=e.sent,s.shopList=a.data.list,a.data.list.length<s.pageSize&&(s.canLoad=!1);case 7:case"end":return e.stop()}},e,s)}))()},switchSel:function(t,s,e){this.selecteds.push({id:t,groupPrice:s,bool:e})},setGroupPrice:function(t){for(var s,e=0;s=this.groupPriceData[e++];)if(s.id==t.id)return s.price=t.price;this.groupPriceData.push(t),console.log(this.groupPriceData)}},onReachBottom:function(){this.lower()},mounted:function(){var t=this;return n()(c.a.mark(function s(){var e;return c.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return console.log(t.shopList),t.shopNum=0,s.next=4,t.getNextPage({ob:1,state:t.state});case 4:e=s.sent,t.shopList=e.data.list,e.data.list.length<t.pageSize&&(t.canLoad=!1);case 7:case"end":return s.stop()}},s,t)}))()}}},"32DY":function(t,s,e){"use strict";var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"order-shop-card"},[e("div",{staticClass:"item-card"},[t.edit?e("i",{staticClass:"select",class:[t.check?"active":"close"],attrs:{eventid:"0"},on:{click:t.select}}):t._e(),t._v(" "),e("i",{staticClass:"img",style:{backgroundImage:"url("+t.shop.image+")"}}),t._v(" "),e("div",{staticClass:"desc"},[e("p",{staticClass:"title"},[t._v(t._s(t.shop.name))]),t._v(" "),e("span",{staticClass:"stall"},[t._v("档口:"+t._s(t.shop.stallInfo1+"-"+t.shop.stallInfo2+"-"+t.shop.stallInfo3))]),t._v(" "),e("span",{staticClass:"count"},[e("p",[t._v("货期:"+t._s(t.shop.delivery)+"丨销量:"+t._s(t.shop.sellCount))]),t._v(" "),e("button",{staticClass:"edit",attrs:{eventid:"1"},on:{click:function(s){t.toOpen("visible4")}}},[t._v("编辑")])],1),t._v(" "),e("p",{staticClass:"collage_price"},[t._v("拼团价: "+t._s(t.groupPrice?"￥"+t.groupPrice:"未设置"))]),t._v(" "),e("p",{staticClass:"price"},[e("span",[t._v("售价:￥"+t._s(t.shop.sellPrice))]),t._v(" "),e("span",{staticClass:"sell"},[t._v("   利润:￥"+t._s(t.shop.profit))])])],1)],1),t._v(" "),e("i-modal",{attrs:{visible:t.visible4,eventid:"3",mpcomid:"0"},on:{ok:function(s){t.comfirmGPrice("visible4")},cancel:function(s){t.toClose("visible4")}}},[e("ul",{staticClass:"m_box"},[e("li",[t._v("售价：￥"+t._s(t.shop.sellPrice))]),t._v(" "),e("li",[t._v("利润：￥"+t._s(t.shop.profit))]),t._v(" "),e("li",[t._v("拼团价："),e("input",{directives:[{name:"model",rawName:"v-model",value:t.groupPrice,expression:"groupPrice"}],attrs:{type:"digit",eventid:"2"},domProps:{value:t.groupPrice},on:{input:function(s){s.target.composing||(t.groupPrice=s.target.value)}}}),t._v("元")])],1)],1),t._v(" "),e("i-toast",{attrs:{id:"toast",mpcomid:"1"}})],1)},staticRenderFns:[]};s.a=a},"7BN9":function(t,s,e){"use strict";var a=e("sAl2"),i=e("32DY");var o=function(t){e("pDxh")},c=e("ybqe")(a.a,i.a,o,"data-v-14108718",null);s.a=c.exports},BaAB:function(t,s){},Mwm1:function(t,s,e){"use strict";var a=e("16vY"),i=e("tdLW");var o=function(t){e("BaAB")},c=e("ybqe")(a.a,i.a,o,"data-v-30001887",null);s.a=c.exports},pDxh:function(t,s){},sAl2:function(t,s,e){"use strict";var a=e("90m7"),i=e("U8g+"),o=e.n(i);s.a={mixins:[a.a],props:{edit:{type:Boolean,default:!1},shop:{type:Object}},data:function(){return{check:!1,visible4:!1,groupPrice:""}},computed:{getImg1:function(){return this.shop.images?this.shop.images.split(",")[0]:o.a}},methods:{select:function(){""!=this.groupPrice?(this.check=!this.check,this.$emit("switchSel",this.shop.id,this.groupPrice,this.check)):this.$Toast({content:"请先填写拼团价格",type:"warning"})},comfirmGPrice:function(t){if(this.toClose(t),this.groupPrice){var s={id:this.shop.id,price:this.groupPrice+0};this.$emit("setGroupPrice",s)}}}}},tdLW:function(t,s,e){"use strict";var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"home"},[e("div",{staticClass:"sort-select"},[e("div",{staticClass:"top-nav"},[e("ul",[e("li",{class:[1===t.tag&&"nav-active"],attrs:{eventid:"0"},on:{click:function(s){t.handleTag(1)}}},[t._v("综合")]),t._v(" "),e("li",{class:[2===t.tag&&"nav-active"],attrs:{eventid:"1"},on:{click:function(s){t.handleTag(2)}}},[t._v("销量"),e("div",{staticClass:"sort-box"},[e("i",{staticClass:"sort-top",class:t.asceSale&&"sort-active"}),e("i",{staticClass:"sort-bottom",class:!t.asceSale&&"sort-active"})],1)]),t._v(" "),e("li",{class:[4===t.tag&&"nav-active"],attrs:{eventid:"2"},on:{click:function(s){t.handleTag(4)}}},[t._v("价格"),e("div",{staticClass:"sort-box"},[e("i",{staticClass:"sort-top",class:t.ascePrice&&"sort-active"}),e("i",{staticClass:"sort-bottom",class:!t.ascePrice&&"sort-active"})],1)]),t._v(" "),e("li",{class:[5===t.tag&&"nav-active"],attrs:{eventid:"3"},on:{click:function(s){t.handleTag(5)}}},[t._v("筛选"),e("div",{staticClass:"sort-box"},[e("i",{staticClass:"option-icon"})],1)])],1)],1),t._v(" "),e("div",[e("div",{staticClass:"scroll-box"},[e("div",{staticClass:"box"},t._l(t.shopList,function(s,a){return e("p",{key:a},[e("scard",{key:a,ref:"scard",refInFor:!0,attrs:{edit:t.edit,shop:s,eventid:"4-"+a,mpcomid:"0-"+a},on:{switchSel:t.switchSel,setGroupPrice:t.setGroupPrice}})],1)})),t._v(" "),t.canLoad?e("div",{staticClass:"loading"},[t.showLoad?e("div",[e("loading",{attrs:{mpcomid:"1"}})]):t._e()]):t._e()])])]),t._v(" "),e("div",{staticClass:"footer"},[e("p",{staticClass:"save",attrs:{eventid:"5"},on:{click:t.confirm}},[t._v("确定"+t._s(t.groupNum))])],1),t._v(" "),e("i-drawer",{attrs:{mode:"right",visible:t.showRight1,eventid:"7",mpcomid:"3"},on:{close:t.toggleRight1}},[e("selsearch",{attrs:{eventid:"6",mpcomid:"2"},on:{comSearch:t.comSearch}})],1)],1)},staticRenderFns:[]};s.a=a}},["KkB/"]);