global.webpackJsonp([6],{I382:function(t,s,e){"use strict";var i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"order-shop-card"},[e("div",{staticClass:"item-card"},[t.edit?e("i",{staticClass:"select",class:[t.check?"active":"close"],attrs:{eventid:"0"},on:{click:function(s){t.select(t.shop.disPrice)}}}):t._e(),t._v(" "),e("i",{staticClass:"img",style:{backgroundImage:"url("+t.shop.image+")"}}),t._v(" "),e("div",{staticClass:"desc"},[e("p",{staticClass:"title"},[t._v(t._s(t.shop.name))]),t._v(" "),e("span",{staticClass:"stall"},[t._v("档口:"+t._s(t.shop.stallInfo1+"-"+t.shop.stallInfo2+"-"+t.shop.stallInfo3))]),t._v(" "),e("div",{staticClass:"tips"},[e("span",{staticClass:"count"},[t._v("货期:"+t._s(t.shop.delivery)+"丨销量:"+t._s(t.shop.sellCount))]),t._v(" "),e("button",{staticClass:"edit",attrs:{eventid:"1"},on:{click:function(s){t.toOpen("visible1")}}},[t._v("编辑")])],1),t._v(" "),e("p",{staticClass:"collage_price"},[t._v("折扣价: "+t._s(t.shop.disPrice?"￥"+t.shop.disPrice:"未设置"))]),t._v(" "),e("p",{staticClass:"price"},[e("span",[t._v("售价:￥"+t._s(t.shop.sellPrice))]),t._v(" "),e("span",{staticClass:"sell"},[t._v(" 利润:￥"+t._s(t.shop.profit))])])],1)],1),t._v(" "),e("i-modal",{attrs:{visible:t.visible1,eventid:"3",mpcomid:"0"},on:{ok:function(s){t.comfirmGPrice("visible1",t.shop.disPrice)},cancel:function(s){t.toClose("visible1")}}},[e("ul",{staticClass:"m_box"},[e("li",[t._v("售价：￥"+t._s(t.shop.sellPrice))]),t._v(" "),e("li",[t._v("利润：￥"+t._s(t.shop.profit))]),t._v(" "),e("li",[t._v("折扣价"),e("input",{directives:[{name:"model",rawName:"v-model",value:t.shop.disPrice,expression:"shop.disPrice"}],attrs:{type:"input",eventid:"2"},domProps:{value:t.shop.disPrice},on:{input:function(s){s.target.composing||(t.shop.disPrice=s.target.value)}}}),t._v("元")])],1)],1),t._v(" "),e("i-toast",{attrs:{id:"toast",mpcomid:"1"}})],1)},staticRenderFns:[]};s.a=i},NGJS:function(t,s,e){"use strict";var i=e("vemQ"),a=e("I382");var o=function(t){e("qCK7")},c=e("ybqe")(i.a,a.a,o,"data-v-72dcbb43",null);s.a=c.exports},RJFm:function(t,s,e){"use strict";var i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"home"},[e("div",{staticClass:"sort-select"},[e("div",{staticClass:"top-nav"},[e("ul",[e("li",{class:[1===t.tag&&"nav-active"],attrs:{eventid:"0"},on:{click:function(s){t.handleTag(1)}}},[t._v("综合")]),t._v(" "),e("li",{class:[2===t.tag&&"nav-active"],attrs:{eventid:"1"},on:{click:function(s){t.handleTag(2)}}},[t._v("销量"),e("div",{staticClass:"sort-box"},[e("i",{staticClass:"sort-top",class:t.asceSale&&"sort-active"}),e("i",{staticClass:"sort-bottom",class:!t.asceSale&&"sort-active"})],1)]),t._v(" "),e("li",{class:[4===t.tag&&"nav-active"],attrs:{eventid:"2"},on:{click:function(s){t.handleTag(4)}}},[t._v("价格"),e("div",{staticClass:"sort-box"},[e("i",{staticClass:"sort-top",class:t.ascePrice&&"sort-active"}),e("i",{staticClass:"sort-bottom",class:!t.ascePrice&&"sort-active"})],1)]),t._v(" "),e("li",{class:[5===t.tag&&"nav-active"],attrs:{eventid:"3"},on:{click:function(s){t.handleTag(5)}}},[t._v("筛选"),e("div",{staticClass:"sort-box"},[e("i",{staticClass:"option-icon"})],1)])],1)],1),t._v(" "),e("div",[e("div",{staticClass:"scroll-box"},[e("div",{staticClass:"box"},t._l(t.shopList,function(s,i){return e("p",{key:i},[e("scard",{key:i,ref:"scard",refInFor:!0,attrs:{edit:t.edit,shop:s,eventid:"4-"+i,mpcomid:"0-"+i},on:{switchSel:t.switchSel,setGroupPrice:t.setGroupPrice}})],1)})),t._v(" "),t.canLoad?e("div",{staticClass:"loading"},[t.showLoad?e("div",[e("loading",{attrs:{mpcomid:"1"}})]):t._e()]):t._e()])])]),t._v(" "),e("div",{staticClass:"footer"},[e("p",{staticClass:"save",attrs:{eventid:"5"},on:{click:t.confirm}},[t._v("确定"+t._s(t.groupNum))])],1),t._v(" "),e("i-drawer",{attrs:{mode:"right",visible:t.showRight1,eventid:"7",mpcomid:"3"},on:{close:t.toggleRight1}},[e("selsearch",{attrs:{eventid:"6",mpcomid:"2"},on:{comSearch:t.comSearch}})],1),t._v(" "),e("i-message",{attrs:{id:"message",mpcomid:"4"}})],1)},staticRenderFns:[]};s.a=i},ebFm:function(t,s){},qCK7:function(t,s){},"uyk+":function(t,s,e){"use strict";var i=e("woOf"),a=e.n(i),o=e("Xxa5"),c=e.n(o),n=e("exGp"),r=e.n(n),l=e("Dd8w"),h=e.n(l),u=e("qTHA"),d=e("NGJS"),p=e("P9O9"),v=e("90m7"),f=e("yHWc"),g=e("NYxO");s.a={mixins:[v.a],components:{scard:d.a,loading:p.a,selsearch:f.a},computed:h()({groupNum:function(){return this.selIds.length>0?"("+this.selIds.length+")":""}},Object(g.b)(["discountSelectList"])),watch:{edit:function(t,s){this.edit=!this.edit}},data:function(){return{showUp:!1,asceSale:!0,ascePrice:!0,tag:1,showRight1:!1,edit:!0,allCheck:!1,shopNum:0,shopList:[],showLoad:!1,canLoad:!0,pageSize:20,type:0,selIds:[],state:1,groupPriceData:[]}},methods:{confirm:function(){var t=this;console.log(this.discountSelectList);var s=[];this.discountSelectList.forEach(function(t,e){s[e]=t.id});var e=[];this.discountSelectList.forEach(function(t,s){e[s]=t.groupPrice}),this.$API.addDisGoods({goodsIds:s.toString(),disPrice:e.toString()}).then(function(s){u.a.showToast({title:"创建成功",icon:"success"}),setTimeout(function(){t.$router.back(-1)},1200)})},handleTag:function(t){var s=this;return r()(c.a.mark(function e(){var i,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(s.tag=t,i=0,s.shopNum=0,s.canLoad=!0,s.showLoad=!1,2===t&&(s.asceSale=!s.asceSale,i=s.asceSale?2:3),4===t&&(s.ascePrice=!s.ascePrice,i=s.ascePrice?4:5),5!==t){e.next=10;break}return s.toggleRight1(),e.abrupt("return");case 10:return s.type=i,e.next=13,s.getNextPage({ob:i,state:s.state});case 13:a=e.sent,s.shopList=a.data.list,a.data.list.length<s.pageSize&&(s.canLoad=!1);case 16:case"end":return e.stop()}},e,s)}))()},toggleRight1:function(){this.showRight1=!this.showRight1},searchShop:function(t){return t.pageSize=this.pageSize,console.log("123312"),this.$API.searchShopGroup(h()({},t,{isDis:0}))},getNextPage:function(t){return this.shopNum++,5==this.tag&&(t=a()(t,this.selParam)),t.pageNumber=this.shopNum,this.searchShop(t)},lower:function(t){var s=this;return r()(c.a.mark(function t(){var e;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(s.canLoad){t.next=2;break}return t.abrupt("return");case 2:if(!s.showLoad){t.next=4;break}return t.abrupt("return");case 4:return s.showLoad=!0,t.next=7,s.getNextPage({ob:s.type,state:s.state});case 7:(e=t.sent).data.list.length<s.pageSize&&(s.canLoad=!1),s.shopList=s.shopList.concat(e.data.list),s.showLoad=!1;case 11:case"end":return t.stop()}},t,s)}))()},comSearch:function(t){var s=this;return r()(c.a.mark(function e(){var i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s.toggleRight1(),s.selParam=t,e.next=4,s.getNextPage({ob:0,state:s.state});case 4:i=e.sent,s.shopList=i.data.list,i.data.list.length<s.pageSize&&(s.canLoad=!1);case 7:case"end":return e.stop()}},e,s)}))()},switchSel:function(t,s,e){if(e)if(this.selIds&&this.selIds.some(function(s){return s==t})){var i=this.selIds.indexOf(t);this.selIds[i]=t,this.groupPriceData[i]=s,this.$store.commit("SETDISOUNTPRICE",i,{id:t,groupPrice:s})}else this.selIds.push(t),this.groupPriceData.push(s),this.$store.commit("PUSTDISOUNTPRICE",{id:t,groupPrice:s});else{var a=this.selIds.indexOf(t);this.selIds.splice(a,1),this.groupPriceData.splice(a,1),this.$store.commit("SPLICEDISOUNTPRICE",a)}console.log(this.discountSelectList)},setGroupPrice:function(t){for(var s,e=0;s=this.groupPriceData[e++];)if(s.id==t.id)return s.price=t.price;this.groupPriceData.push(t),console.log(this.groupPriceData)}},onReachBottom:function(){this.lower()},mounted:function(){var t=this;return r()(c.a.mark(function s(){var e;return c.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return console.log(t.shopList),t.shopNum=0,s.next=4,t.getNextPage({ob:0,state:t.state});case 4:e=s.sent,t.shopList=e.data.list,e.data.list.length<t.pageSize&&(t.canLoad=!1);case 7:case"end":return s.stop()}},s,t)}))()},onUnload:function(){a()(this,this.$options.data())}}},vemQ:function(t,s,e){"use strict";var i=e("Xxa5"),a=e.n(i),o=e("exGp"),c=e.n(o),n=e("90m7");s.a={mixins:[n.a],props:{edit:{type:Boolean,default:!1},shop:{type:Object}},data:function(){return{check:!1,visible1:!1}},computed:{},methods:{select:function(t){""!=t?(this.check=!this.check,this.$emit("switchSel",this.shop.id,t,this.check)):this.$Toast({content:"请先填写折扣价格",type:"warning"})},comfirmGPrice:function(t,s){this.toClose(t),s||this.$Toast({content:"折扣价格不能为空",type:"warning"})},comfirmDel:function(t){var s=this;return c()(a.a.mark(function e(){var i;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s[t]=!1,i=0,"下架"!=s.act&&(i=1),e.next=5,s.$API.switchShop({goodsIds:s.shop.id,state:i});case 5:s.show=!1,s.$success(s.act+"成功！");case 7:case"end":return e.stop()}},e,s)}))()}},mounted:function(){this.shop.disPrice||(this.shop.disPrice="")}}},zpqY:function(t,s,e){"use strict";var i=e("uyk+"),a=e("RJFm");var o=function(t){e("ebFm")},c=e("ybqe")(i.a,a.a,o,"data-v-65d80b30",null);s.a=c.exports}},["CUbO"]);