global.webpackJsonp([15],{"G+uY":function(e,t,n){"use strict";var a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"nav"},[n("p",{staticClass:"text"},[e._v("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis\n    dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.")]),e._v(" "),n("form",[n("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.name,expression:"name",modifiers:{lazy:!0}}],staticClass:"name",attrs:{type:"text",placeholder:"请输入您的称呼",eventid:"0"},domProps:{value:e.name},on:{change:function(t){e.name=t.target.value}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.phone,expression:"phone",modifiers:{lazy:!0}}],staticClass:"phone",attrs:{type:"tel",placeholder:"请输入您的电话",eventid:"1"},domProps:{value:e.phone},on:{change:function(t){e.phone=t.target.value}}}),e._v(" "),n("div",{staticClass:"identity"},[n("picker",{attrs:{value:e.index,range:e.selectList,eventid:"2"},on:{change:e.onChange}},[n("span",{staticClass:"picker"},[e._v("\n          "+e._s(-1!==e.index?e.selectList[e.index]:"请选择您的身份")+"\n        ")])])],1),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.lazy",value:e.referrer,expression:"referrer",modifiers:{lazy:!0}}],staticClass:"referrer",attrs:{type:"tel",placeholder:"请输入推荐人电话",eventid:"3"},domProps:{value:e.referrer},on:{change:function(t){e.referrer=t.target.value}}}),e._v(" "),n("span",{staticClass:"btn",attrs:{eventid:"4"},on:{click:function(t){e.prosave()}}},[e._v("申请小程序")])])],1)},staticRenderFns:[]};t.a=a},Hyql:function(e,t,n){"use strict";var a=n("L8b6"),r=n("G+uY");var s=function(e){n("Zpgj")},i=n("ybqe")(a.a,r.a,s,"data-v-206fa797",null);t.a=i.exports},L8b6:function(e,t,n){"use strict";var a=n("Xxa5"),r=n.n(a),s=n("exGp"),i=n.n(s),o=n("qTHA");t.a={components:{},data:function(){return{name:"",phone:"",identity:"",referrer:"",selectList:[],index:-1}},methods:{onChange:function(e){this.index=e.mp.detail.value},prosave:function(){var e=this;return i()(r.a.mark(function t(){var n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(e),""==e.name||""==e.phone||""==e.identity||""==e.referrer){t.next=8;break}return t.next=4,e.$API.prosave({name:e.name,mobile:e.phone,formMetaId:e.identity,tmobile:e.referrer});case 4:n=t.sent,o.a.showToast({title:"申请成功",icon:"success",duration:2e3}),t.next=9;break;case 8:""==e.name&&""==e.phone&&""==e.identity&&""==e.referrer&&o.a.showToast({title:"请填写内容",icon:"loading",duration:2e3});case 9:console.log(n);case 10:case"end":return t.stop()}},t,e)}))()}},mounted:function(){var e=this;this.$API.prometaList({type:2}).then(function(t){t.data.forEach(function(t){e.selectList.push(t.name)}),console.log(e.selectList)})}}},Zpgj:function(e,t){}},["Moek"]);