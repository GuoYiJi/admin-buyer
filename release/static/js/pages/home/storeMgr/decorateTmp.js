global.webpackJsonp([27],{"1EDP":function(t,s,e){"use strict";e("qTHA");s.a={components:{},data:function(){return{templateList:[]}},methods:{getImgTemplate:function(){var t=this;this.$API.s_getImg({type:4}).then(function(s){t.templateList=s.data,console.log(t.templateList)})}},mounted:function(){this.getImgTemplate()}}},"2Mfq":function(t,s,e){"use strict";var a=e("1EDP"),n=e("PfmY");var i=function(t){e("fhsG")},c=e("ybqe")(a.a,n.a,i,"data-v-988c0350",null);s.a=c.exports},PfmY:function(t,s,e){"use strict";var a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"home"},[e("p",{staticClass:"title"},[t._v("选择一个适合你的装修风格")]),t._v(" "),e("div",{staticClass:"tmp_box"},t._l(t.templateList,function(s,a){return e("div",{key:s.id,staticClass:"t_img"},[e("img",{attrs:{src:"template.image"}}),t._v(" "),e("span",{staticClass:"use_btn"},[e("button",{class:[0===a?"using":""]},[t._v(t._s(0===a?"正在使用":"使用此模板"))])],1)])}))],1)},staticRenderFns:[]};s.a=a},fhsG:function(t,s){}},["4v7t"]);