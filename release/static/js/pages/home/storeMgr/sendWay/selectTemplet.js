global.webpackJsonp([26],{"/p4S":function(t,e,a){"use strict";var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("scroll-view",{staticStyle:{height:"80%"},attrs:{"scroll-y":"true"}},[a("div",{staticClass:"content"},t._l(t.areaIdAll,function(e,s){return a("div",{key:s,staticClass:"adr-card",attrs:{eventid:"0-"+s},on:{click:function(a){t.selectAct(e.id)}}},[a("div",{staticClass:"user"},[a("p",{staticClass:"name"},[t._v(t._s(e.name))])],1),t._v(" "),a("div",{staticClass:"adr"},[a("i",{staticClass:"select",class:[t.templateId==e.id&&"active"]}),t._v(" "),t._l(e.area,function(e,s){return a("p",{key:s,staticClass:"adr-text"},[t._v("运送到"+t._s(e.areaName)+"；售件"+t._s(e.firstPirce)+"kg，运费"+t._s(e.secondPrice)+"元")])})],2)])}))]),t._v(" "),a("p",{staticClass:"bottom"}),t._v(" "),a("p",{staticClass:"save",attrs:{eventid:"1"},on:{click:t.saveBut}},[t._v("保存")]),t._v(" "),a("i-toast",{attrs:{id:"toast",mpcomid:"0"}})],1)},staticRenderFns:[]};e.a=s},"9xMz":function(t,e){},EpYy:function(t,e,a){"use strict";var s=a("Xxa5"),n=a.n(s),c=a("exGp"),i=a.n(c),r=a("qTHA");e.a={components:{},data:function(){return{areaIdAll:[],templateId:"",areazz:[],value1:1,clickToggle:!1}},methods:{selectAct:function(t){this.clickToggle=!this.clickToggle,this.clickToggle?this.templateId=t:this.templateId=""},saveBut:function(){var t=this;this.templateId?this.$API.L_changeExpress({templateId:this.templateId}).then(function(e){r.a.setStorageSync("templateId",t.templateId),t.$router.back(-1)}):this.$Toast({content:"您还未选择",type:"warning"})}},mounted:function(){var t=this;return i()(n.a.mark(function e(){var a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r.a.getStorageSync("templateId")&&(t.templateId=r.a.getStorageSync("templateId")),e.next=3,t.$API.L_findFreight({});case 3:a=e.sent,t.areaIdAll=a.data;case 5:case"end":return e.stop()}},e,t)}))()}}},"tg+A":function(t,e,a){"use strict";var s=a("EpYy"),n=a("/p4S");var c=function(t){a("9xMz")},i=a("ybqe")(s.a,n.a,c,"data-v-6b6b721e",null);e.a=i.exports}},["zm/y"]);