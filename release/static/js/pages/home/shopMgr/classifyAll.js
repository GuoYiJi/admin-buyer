global.webpackJsonp([38],{"4cqp":function(t,s,e){"use strict";var n=e("woOf"),i=e.n(n),o=e("Xxa5"),a=e.n(o),c=e("exGp"),r=e.n(c),d=e("qTHA"),u=e("cyB7"),l=e("90m7"),f=e("0xDb");e.n(f);s.a={mixins:[l.a],components:{btn:u.a},data:function(){return{singleSelect:[],selId:"",goodsIds:[]}},methods:{goback:function(){var t=this;this.selId?(this.goodsIds=this.goodsIds.filter(function(t){return"-1"!==t}),this.$API.editGroups({goodsIds:this.goodsIds.toString(),groupIds:this.selId}).then(function(s){d.a.showToast({title:"修改分组成功",icon:"success"}),setTimeout(function(){t.$router.go(-1)},1200)})):d.a.showToast({title:"请选择分组",icon:"none"})},selectOne:function(t){this.selId=t}},mounted:function(){var t=this;return r()(a.a.mark(function s(){var e,n;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return t.selId="",t.$route.query.ids&&(t.goodsIds=t.$route.query.ids.split(",")),s.next=4,t.$API.searchType({types:1});case 4:e=s.sent,n=e.data,t.singleSelect=n;case 7:case"end":return s.stop()}},s,t)}))()},onUnload:function(){i()(this,this.$options.data())}}},T5Vi:function(t,s,e){"use strict";var n=e("4cqp"),i=e("oVE1");var o=function(t){e("pj1f")},a=e("ybqe")(n.a,i.a,o,"data-v-49f6890c",null);s.a=a.exports},oVE1:function(t,s,e){"use strict";var n={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"home"},[e("div",{staticClass:"single_box"},t._l(t.singleSelect,function(s,n){return e("div",{key:n,attrs:{eventid:"0-"+n},on:{click:function(e){t.selectOne(s.id)}}},[e("div",{staticClass:"line"},[e("p",[e("i",{staticClass:"select",class:t.selId==s.id&&"active"}),t._v(t._s(s.name))],1)],1)])})),t._v(" "),e("div",{staticClass:"create"},[e("p",{attrs:{eventid:"1"},on:{click:t.goback}},[e("btn",{attrs:{title:"保存",mpcomid:"0"}})],1)],1)])},staticRenderFns:[]};s.a=n},pj1f:function(t,s){}},["X6Ba"]);