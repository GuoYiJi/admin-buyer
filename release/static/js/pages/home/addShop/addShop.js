global.webpackJsonp([67],{"+G/Q":function(t,e){},"8IhR":function(t,e,s){"use strict";var a=s("dk0R"),o=s("TPyH");var i=function(t){s("+G/Q")},n=s("ybqe")(a.a,o.a,i,null,null);e.a=n.exports},TPyH:function(t,e,s){"use strict";var a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("div",{staticClass:"add_video"},[s("p",{staticClass:"a_title"},[t._v("请添加视频: (最多可添加1个)")]),t._v(" "),s("div",{staticClass:"v_box"},[t.videoSrc?s("div",{staticClass:"add"},[s("video",{attrs:{src:t.videoSrc,"show-play-btn":"false",objectFit:"fill",controls:"false"}})]):t._e(),t._v(" "),s("div",{staticClass:"add",attrs:{eventid:"0"},on:{tap:t.bindButtonTap}},[s("p",[t._v("+视频")])],1)])],1),t._v(" "),s("p",{staticClass:"a_title"},[t._v("请添加图片:(最多可添加15张)")]),t._v(" "),s("div",{staticClass:"add_image"},[t._l(t.imageList,function(e,a){return s("div",{key:a,staticClass:"add",style:{backgroundImage:"url("+e+")"}},[s("i",{staticClass:"cancel_shop",attrs:{eventid:"1-"+a},on:{click:function(e){t.toCancel(a)}}})],1)}),t._v(" "),s("div",{staticClass:"addBtn",attrs:{eventid:"2"},on:{tap:t.bindButtonTapImage}},[s("p",[t._v("+图片")])],1)],2),t._v(" "),s("div",{staticClass:"line-box"},[s("div",{staticClass:"line b_line"},[s("p",{staticClass:"input"},[t._v("商品标题:  ")]),t._v(" "),s("p",{staticClass:"blur"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.goods.name,expression:"goods.name"}],attrs:{type:"text",placeholder:"请输入商品标题",eventid:"3"},domProps:{value:t.goods.name},on:{input:function(e){e.target.composing||(t.goods.name=e.target.value)}}})])],1),t._v(" "),s("div",{staticClass:"line b_line",attrs:{eventid:"4"},on:{click:function(e){t.toOpen("showMarket")}}},[s("p",{staticClass:"input"},[t._v("市场档口: ")]),t._v(" "),s("p",{staticClass:"blur"},[t._v(t._s(t.goods.stallInfo1?t.goods.stallInfo1+"-"+t.goods.stallInfo2+"-"+t.goods.stallInfo3:"请选择市场档口"))])],1),t._v(" "),s("div",{staticClass:"line b_line",attrs:{eventid:"5"},on:{click:function(e){t.toRoute("home/addShop/buyDesc")}}},[s("p",{staticClass:"input"},[t._v("采购说明: ")]),t._v(" "),s("p",{staticClass:"blur input_p_left"},[t._v(t._s(t.shopExplan.value?t.shopExplan.value:"请选择采购说明"))])],1),t._v(" "),s("div",{staticClass:"line b_line"},[s("p",{staticClass:"input"},[t._v("成本价: ")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.goods.costPrice,expression:"goods.costPrice"}],staticClass:"input_box",attrs:{type:"digit",eventid:"6"},domProps:{value:t.goods.costPrice},on:{input:function(e){e.target.composing||(t.goods.costPrice=e.target.value)}}})],1),t._v(" "),s("div",{staticClass:"line"},[s("p",{staticClass:"input"},[t._v("利润: ")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.goods.profit,expression:"goods.profit"}],staticClass:"input_box small",attrs:{type:"digit",eventid:"7"},domProps:{value:t.goods.profit},on:{input:function(e){e.target.composing||(t.goods.profit=e.target.value)}}}),t._v(" "),s("p",{staticClass:"input sale"},[t._v("售价: "),s("span",{staticClass:"red"},[t._v(t._s(t.sellPrice))])])],1)]),t._v(" "),s("div",{staticClass:"line-box"},[s("div",{staticClass:"line b_line",attrs:{eventid:"8"},on:{click:function(e){t.toOpen("showTime")}}},[s("p",{staticClass:"input"},[t._v("货期排单: ")]),t._v(" "),s("p",{staticClass:"blur"},[t._v(t._s(t.goods.delivery?t.goods.delivery:"请选择货期排单"))])],1),t._v(" "),s("div",{staticClass:"line b_line",attrs:{eventid:"9"},on:{click:function(e){t.toOpen("showType1")}}},[s("p",{staticClass:"input"},[t._v("品类: ")]),t._v(" "),s("p",{staticClass:"blur"},[t._v(t._s(t.goods.labelInfo2?t.goods.labelInfo+"-"+t.goods.labelInfo2:"点击选择品类")+" ")])],1),t._v(" "),s("div",{staticClass:"line b_line shopType",attrs:{eventid:"10"},on:{click:function(e){t.toRoute("home/addShop/addType")}}},[s("p",{staticClass:"input"},[t._v("规格与库存: ")]),t._v(" "),s("div",{staticClass:"blur"},[t.addShopType.length>0?s("div",{staticClass:"hasType"},t._l(t.addShopType,function(e,a){return s("p",{key:a},[t._v("\n            "+t._s(e.skuCode+"/"+e.stock)+"\n          ")])})):s("div",[t._v("\n          点击选择规格与库存\n        ")])])],1),t._v(" "),t._l(t.type3Data,function(e,a){return s("div",{key:a,staticClass:"line b_line",attrs:{eventid:"11-"+a},on:{click:function(s){t.getNextLevlList(e.id,e.name,a)}}},[s("p",{staticClass:"input"},[t._v(t._s(e.name))]),t._v(" "),s("p",{staticClass:"blur"},[t._v(t._s(t.versionName[a]?t.versionName[a]:"点击选择"+e.name))])],1)}),t._v(" "),s("div",{staticClass:"line b_line",attrs:{eventid:"12"},on:{click:function(e){t.toRoute("home/shopMgr/classify",{shopGroup:JSON.stringify(t.shopGroup)})}}},[s("p",{staticClass:"input"},[t._v("商品分组")]),t._v(" "),s("p",{staticClass:"blur input_p_left"},[t._v(t._s(t.shopGroup.groupText?t.shopGroup.groupText:"点击选择分组"))])],1),t._v(" "),s("div",{staticClass:"line b_line",attrs:{eventid:"13"},on:{click:function(e){t.toOpen("showTag")}}},[s("p",{staticClass:"input"},[t._v("商品标签")]),t._v(" "),s("p",{staticClass:"blur input_p_left"},[t._v(t._s(t.goods.tag?t.tagText:"点击选择标签"))])],1),t._v(" "),s("div",{staticClass:"line b_line"},[s("p",{staticClass:"input"},[t._v("转售: ")]),t._v(" "),s("div",{staticClass:"blur"},[s("div",{staticClass:"sel_box"},[s("div",{staticClass:"sel_item",attrs:{eventid:"14"},on:{click:function(e){t.selectTransfer(1)}}},[s("i",{staticClass:"select",class:[1===t.goods.isTransfer&&"active"]}),t._v(" "),s("p",[t._v("支持")])],1),t._v(" "),s("div",{staticClass:"sel_item",attrs:{eventid:"15"},on:{click:function(e){t.selectTransfer(0)}}},[s("i",{staticClass:"select",class:[0===t.goods.isTransfer&&"active"]}),t._v(" "),s("p",[t._v("不支持")])],1)])])],1),t._v(" "),s("div",{staticClass:"line b_line"},[s("p",{staticClass:"input"},[t._v("置顶: ")]),t._v(" "),s("div",{staticClass:"blur"},[s("i-switch",{attrs:{value:t.isTopBool,eventid:"16",mpcomid:"0"},on:{change:t.onChange}})],1)],1)],2),t._v(" "),t.editType?t._e():s("div",{staticClass:"footer"},[s("p",{staticClass:"getUp",attrs:{eventid:"17"},on:{click:function(e){t.save(1)}}},[t._v("立即上架")]),t._v(" "),s("p",{staticClass:"getIn",attrs:{eventid:"18"},on:{click:function(e){t.save(0)}}},[t._v("保存到仓库")])],1),t._v(" "),t.editType?s("div",{staticClass:"edit_footer"},[s("p",{staticClass:"getUp",attrs:{eventid:"19"},on:{click:function(e){t.save(2)}}},[t._v("确认修改")])],1):t._e(),t._v(" "),t.showType1?s("div",{staticClass:"modal_box"},[s("div",{staticClass:"modal_time"},[s("div",{staticClass:"top"},[s("p",{staticClass:"cancel",attrs:{eventid:"20"},on:{click:function(e){t.toClose("showType1")}}},[t._v("取消")]),t._v(" "),s("p",{staticClass:"title"},[t._v(t._s(0===t.clickNum?"选择一级分类":"选择二级分类"))]),t._v(" "),0===t.clickNum?s("p",{staticClass:"confirm"}):s("p",{staticClass:"confirm",attrs:{eventid:"21"},on:{click:function(e){t.reSelect()}}},[t._v("重选")])],1),t._v(" "),0==t.clickNum?s("ul",{staticClass:"content"},t._l(t.type1Data,function(e,a){return s("li",{key:a,staticClass:"item",class:[t.type1Text.id==e.id&&"active"],attrs:{eventid:"22-"+a},on:{click:function(s){t.confirmType("showType1",e)}}},[t._v(t._s(e.name)+"\n        ")])})):s("ul",{staticClass:"content"},t._l(t.type2Data,function(e,a){return 0!==t.clickNum?s("li",{key:a,staticClass:"item",class:[t.type2Text.id==e.id&&"active"],attrs:{eventid:"23-"+a},on:{click:function(s){t.toSelect("type2Text",e)}}},[t._v(t._s(e.name)+"\n        ")]):t._e()})),t._v(" "),s("button",{directives:[{name:"show",rawName:"v-show",value:0!==t.clickNum,expression:"clickNum !== 0"}],staticClass:"ok",attrs:{eventid:"24"},on:{click:function(e){t.confirmType("showType2")}}},[t._v("确定")])],1)]):t._e(),t._v(" "),t.showTime?s("div",{staticClass:"modal_box"},[s("div",{staticClass:"modal_time"},[s("div",{staticClass:"top"},[s("p",{staticClass:"cancel",attrs:{eventid:"25"},on:{click:function(e){t.toClose("showTime")}}},[t._v("取消")]),t._v(" "),s("p",{staticClass:"title"},[t._v("选择货期排单")]),t._v(" "),s("p",{staticClass:"confirm",attrs:{eventid:"26"},on:{click:function(e){t.confirmOther("showTime")}}},[t._v("确定")])],1),t._v(" "),s("div",{staticClass:"content"},t._l(t.otherData,function(e,a){return 4==e.typeId?s("li",{key:a,staticClass:"item",class:[t.timeText.id==e.id&&"active"],attrs:{eventid:"27-"+a},on:{click:function(s){t.select("timeText",e)}}},[t._v(t._s(e.name))]):t._e()}))])]):t._e(),t._v(" "),t._l(t.type3Data,function(e,a){return t.versionId===e.id?s("div",{key:a,staticClass:"modal_box"},[s("div",{staticClass:"modal_time"},[s("div",{staticClass:"top"},[s("p",{staticClass:"cancel",attrs:{eventid:"28-"+a},on:{click:function(s){t.closeVersion(e.id)}}},[t._v("取消")]),t._v(" "),s("p",{staticClass:"title"},[t._v("选择"+t._s(e.name))]),t._v(" "),s("p",{staticClass:"confirm",attrs:{eventid:"29-"+a},on:{click:function(e){t.selectName(t.type3Text,a)}}},[t._v("确定")])],1),t._v(" "),s("div",{staticClass:"content"},t._l(t.type4Data,function(e,o){return s("li",{key:a,staticClass:"item",class:[t.type3Text.id==e.id&&"active"],attrs:{eventid:"30-"+a+"-"+o},on:{click:function(s){t.selectItem(e,a)}}},[t._v(t._s(e.name))])}))])]):t._e()}),t._v(" "),t.showTag?s("div",{staticClass:"modal_box"},[s("div",{staticClass:"modal_time"},[s("div",{staticClass:"top"},[s("p",{staticClass:"cancel",attrs:{eventid:"31"},on:{click:function(e){t.toClose("showTag")}}},[t._v("取消")]),t._v(" "),s("p",{staticClass:"title"},[t._v("选择商品标签")]),t._v(" "),s("p",{staticClass:"confirm",attrs:{eventid:"32"},on:{click:function(e){t.confirmOther("showTag")}}},[t._v("确定")])],1),t._v(" "),s("div",{staticClass:"content content_tag"},t._l(t.tagData,function(e,a){return s("div",{key:a,staticClass:"tag_item",attrs:{eventid:"33-"+a},on:{click:function(s){t.selectTagIds("tagIds",e)}}},[s("i",{staticClass:"select",class:e.select&&"select-active"}),t._v(" "),s("p",[t._v(t._s(e.name))])],1)})),t._v(" "),s("div",{staticClass:"add_line"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.addTagText,expression:"addTagText"}],staticClass:"add_input",attrs:{placeholder:"请输入",eventid:"34"},domProps:{value:t.addTagText},on:{input:function(e){e.target.composing||(t.addTagText=e.target.value)}}}),t._v(" "),s("p",{staticClass:"add_btn",attrs:{eventid:"35"},on:{click:t.addTag}},[t._v("添加")])],1)])]):t._e(),t._v(" "),t.showMarket?s("div",{staticClass:"modal_box"},[s("div",{staticClass:"modal_time"},[s("div",{staticClass:"top"},[s("p",{staticClass:"cancel",attrs:{eventid:"36"},on:{click:function(e){t.toClose("showMarket")}}},[t._v("取消")]),t._v(" "),s("p",{staticClass:"title"},[t._v("选择市场档口")]),t._v(" "),s("p",{staticClass:"confirm",attrs:{eventid:"37"},on:{click:function(e){t.confirmMarket()}}},[t._v("确定")])],1),t._v(" "),s("div",{staticClass:"box-select"},[s("div",{staticClass:"s_item first"},t._l(t.mktFirstData,function(e,a){return s("p",{key:a,class:[t.selectFMarket.id==e.id&&"active"],attrs:{eventid:"38-"+a},on:{click:function(s){t.getMarketData(1,e)}}},[t._v(t._s(e.name))])})),t._v(" "),s("div",{staticClass:"s_item second"},t._l(t.mktSecondData,function(e,a){return s("p",{key:a,class:[t.selectSMarket.id==e.id&&t.selectSMarket.id&&"active"],attrs:{eventid:"39-"+a},on:{click:function(s){t.getMarketData(2,e)}}},[t._v(t._s(e.name))])})),t._v(" "),s("div",{staticClass:"s_item third"},t._l(t.mktThirdData,function(e,a){return s("p",{key:a,class:[t.selectTMarket.id&&t.selectTMarket.id==e.id&&"active"],attrs:{eventid:"40-"+a},on:{click:function(s){t.confirmMarket(e)}}},[t._v(t._s(e.name))])}))])])]):t._e(),t._v(" "),s("i-message",{attrs:{id:"message",mpcomid:"1"}}),t._v(" "),s("view",{directives:[{name:"show",rawName:"v-show",value:t.showProgress,expression:"showProgress"}],staticClass:"progress-item"},[s("i-progress",{attrs:{percent:t.progressValue,"hide-info":"",mpcomid:"2"}})],1),t._v(" "),s("i-modal",{attrs:{visible:t.topTips,eventid:"41",mpcomid:"3"},on:{ok:function(e){t.setTop("topTips")},cancel:function(e){t.toClose("topTips")}}},[s("div",{staticClass:"m_tips"},[t._v("已有置顶商品，是否更换置顶商品？")])])],2)},staticRenderFns:[]};e.a=a},dk0R:function(t,e,s){"use strict";var a=s("ifoU"),o=s.n(a),i=s("fZjL"),n=s.n(i),l=s("Xxa5"),c=s.n(l),r=s("woOf"),d=s.n(r),p=s("exGp"),u=s.n(p),v=s("Dd8w"),g=s.n(v),m=s("qTHA"),f=s("90m7"),h=s("QmSG"),_=s("0xDb"),T=(s.n(_),s("NYxO"));e.a={mixins:[f.a],components:{},data:function(){return{topTips:!1,isTopBool:!1,showProgress:!1,progressValue:0,videoSrc:"",uploadNum:9,maxNum:15,imgStr:"",imgList:[],versionId:"",versionName:[],clickNum:0,editType:!1,showTime:!1,showType:!1,showTag:!1,sellType:!0,showMarket:!1,showType0:!1,showType1:!1,showType2:!1,showType3:!1,type1Data:[],type2Data:[],type3Data:[],type4Data:[],tagIds:"",tagText:"",type0Text:"",type1Text:"",type2Text:"",type3Text:"",type4Text:"",timeText:"",imageList:[],selectFMarket:"",selectSMarket:"",selectTMarket:"",mktFirstData:{},mktSecondData:{},mktThirdData:{},marketText:"",otherData:{},otherData2:{},groupData:[],groupVal:"",addTagText:"",tagData:"",goods:{isTop:0,name:"",stallInfo1:"",stallInfo2:"",stallInfo3:"",labelInfo:"",labelInfo2:"",labelInfo3:"",labelIds:"",deliveryId:"",delivery:"",isTransfer:1,parameter:"",images:"",video:"",content:"",costPrice:"",profit:"",remark:"",groupIds:"",tag:"",buyExplan:"",buyExplanId:""},skuList:[],goodsLabelValueIds:[],postLabelInfo:[],postLabelInfo2:[]}},computed:g()({sellPrice:function(){if(this.goods.costPrice&&this.goods.profit)return this.goods.sellPrice=Number(this.goods.costPrice)+Number(this.goods.profit),this.goods.sellPrice+"元"}},Object(T.b)(["addShopType","shopGroup","shopExplan"])),mounted:function(){var t=this;return u()(c.a.mark(function e(){var s,a,o,i,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t.$route.query),t.$route.query.id?(t.editType=!0,t.goods=t.$route.query):"true"===t.$route.query.isAddVideo&&(console.log("初始化data"),t.$store.commit("ADDSHOPTYPE",[]),t.$store.commit("ADDSHOPGROUP",{}),t.$store.commit("ADDSHOPEXPLAN",{}),t.goods.video="",t.goods.imageList=[],t.goods.images="",t.imgList=[],d()(t.$data,t.$options.data())),t.getMarketData(0),e.next=5,t.$API.searchType({types:"2,3,4"});case 5:for(s=e.sent,a=s.data,console.log("品类数据==================>",a),t.otherData=a,t.type1Data=a.filter(function(t){return 2===parseInt(t.typeId)}),o=[],t.tagText="",t.tagIds="",i=0;n=t.otherData[i++];)3==n.typeId&&(t.goods.tag&&t.goods.tag.split(",").indexOf(n.id)>=0?(n.select=!0,t.tagText+=n.name+",",t.tagIds+=n.id+","):n.select=!1,o.push(n));t.tagData=o;case 15:case"end":return e.stop()}},e,t)}))()},methods:{setTop:function(t){this[t]=!1,this.setData({isTopBool:!0}),this.goods.isTop=1,console.log(this.goods.isTop)},onChange:function(t){var e=this,s=t.mp.detail;0==this.isTopBool?this.$API.selectTopGoods().then(function(t){t.data&&(e.topTips=!0)}):1==this.isTopBool&&(this.setData({isTopBool:s.value}),this.goods.isTop=0,console.log(this.goods.isTop))},setData:function(t){var e=this;n()(t).forEach(function(s){e[s]=t[s]})},toSelect:function(t,e){this[t]=e,this.clickNum=2},uploadImg:function(t){console.log("lastIndexOf ============",t.slice(t.lastIndexOf("/")+1).toString());var e=t.lastIndexOf("/")+1,s=this;m.a.uploadFile({url:h.a.uploadImageUrl,filePath:t,name:"file",formData:{name:t.slice(e).toString(),key:"img/${filename}",policy:h.a.imgPolicy,OSSAccessKeyId:h.a.OSSAccessKeyId,success_action_status:"200",signature:h.a.imgSignature},success:function(a){if(console.log(a),console.log("tempFilePath  ========",t),400==parseInt(a.statusCode))s.handleError("上传的图片大小超过限制!");else if(200==parseInt(a.statusCode)){if(s.maxNum&&s.imageList.length>=s.maxNum)return void s.handleError("不能超过15张图片噢！");s.imgList.push(h.a.uploadImageUrl+"/img/"+t.slice(e).toString()),console.log("图片列表===>"+s.imgList),s.getImg(h.a.uploadImageUrl+"/img/"+t.slice(e).toString())}},fail:function(t){console.log(t)}}).onProgressUpdate(function(t){100===t.progress&&m.a.showToast({title:"上传完成"})})},bindButtonTapImage:function(){var t=this.maxNum;m.a.showLoading({title:"加载中"});var e=this;if(t&&this.imageList.length>=t)return this.handleError("不能超过"+t+"张图片噢！"),void m.a.hideLoading();m.a.chooseImage({sizeType:"original",count:this.uploadNum,success:function(t){console.log(t);var s=t.tempFilePaths;console.log(s),s.forEach(function(t){e.uploadImg(t)})},fail:function(){m.a.showLoading({title:"操作失败"})},complete:function(){m.a.hideLoading()}})},handleError:function(t){this.$Message({content:t,type:"error"})},toCancel:function(t){this.imageList.splice(t,1),console.log("this.imageList =========>",this.imageList)},bindButtonTap:function(){var t=this;m.a.showLoading(),console.log(111);var e=this;m.a.chooseVideo({sourceType:["album","camera"],maxDuration:60,camera:["front","back"],success:function(t){var s=this;console.log(t);var a=t.tempFilePath,o=a.lastIndexOf("/")+1,i=m.a.uploadFile({url:h.a.uploadImageUrl,filePath:a,name:"file",formData:{name:a.slice(o).toString(),key:"video/${filename}",policy:h.a.videoPolicy,OSSAccessKeyId:h.a.OSSAccessKeyId,success_action_status:"200",signature:h.a.videoSignature},success:function(t){console.log(t),400==t.statusCode?e.handleError("上传的视频大小不能超过20m!"):200==t.statusCode&&(e.videoSrc=h.a.uploadImageUrl+"/video/"+a.slice(o).toString(),e.getVideo(e.videoSrc))},fail:function(t){s.handleError("上传失败，错误原因： "+t.errMsg),console.log(t)}});e.toggleProgress(),i.onProgressUpdate(function(t){console.log(t.progress),e.progressValue=t.progress,100===e.progressValue&&(e.toggleProgress(),m.a.showToast({title:"上传完成"}),e.progressValue=0)})},fail:function(e){t.handleError("上传失败，错误原因： "+e.errMsg),console.log(e)},complete:function(){m.a.hideLoading()}})},closeVersion:function(t){this.versionId=0},getNextLevlList:function(t,e,s){var a=this;return u()(c.a.mark(function o(){var i,n;return c.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return console.log(t),a.versionId=t,o.next=4,a.getShopClass(2,t);case 4:i=o.sent,n=i.data,a.type4Data=n,a.postLabelInfo2[s]=e,console.log(a.postLabelInfo2);case 9:case"end":return o.stop()}},o,a)}))()},selectItem:function(t,e){console.log(t),this.select("type3Text",t)},selectName:function(t,e){console.log("name"+t.name),this.versionName[e]=t.name,this.goodsLabelValueIds[e]=t.id,console.log(this.versionName),this.closeVersion(t.id)},reSelect:function(){this.clickNum=0},save:function(t){var e=this;return u()(c.a.mark(function s(){var a,i,n,l,r,d,p,u,v;return c.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,m.a.getStorageSync("sessionId");case 2:if(a=s.sent,e.goods.name.split("").length>18&&e.handleError("标题最多不能超过18个字符"),e.imageList.length>0&&(e.goods.image=e.imageList.slice(0,1).toString(),e.goods.images=e.imageList.slice(0,5).join(",")),e.imageList.length>5&&(e.goods.content=e.imageList.slice(5).join(",")),e.type1Text.id&&(e.goods.labelIds=e.type1Text.id+",",console.log("this.goods.labelIds=>"+e.goods.labelIds)),e.type2Text.id&&(e.goods.labelIds+=e.type2Text.id+",",console.log("this.goods.labelIds=>"+e.goods.labelIds)),e.type3Text.id&&(e.goods.labelIds+=e.type3Text.id+","),e.goods.state=t,e.goods.groupIds=e.shopGroup.groupIds,e.goods.buyExplan=e.shopExplan.value,e.goods.buyExplanId=e.shopExplan.id,console.log("goodsLabelValueIds =>"+e.goodsLabelValueIds),console.log(e.versionName.concat(e.postLabelInfo2).toString()),(i={goodsLabelValueIds:e.goodsLabelValueIds.toString(),goods:e.goods,skuList:e.addShopType,sessionId:a,shopId:h.a.appId}).name=e.name,i.labelInfo=e.goods.labelInfo,i.labelInfo2=e.goods.labelInfo2+","+e.versionName.concat(e.postLabelInfo2).toString(),i.labelInfo3=e.versionName.toString(),i.isTop=e.isTop,console.log("obj=>"+i),i.skuList.length>0){for(n=function(t){var e=new o.a;return t.filter(function(t){return!e.has(t)&&e.set(t,1)})},l="",r=0;d=i.skuList[r++];)l+=d.attrIds+",";console.log(l),p=l.split(","),console.log(p),p=n(p),i.attrIds=p.join(","),console.log("111")}if(0!=t){s.next=26;break}s.next=32;break;case 26:if(console.log(e.goods.images),u=[{name:e.goods.images,errMsg:"至少添加一张图片！"},{name:e.goods.name,errMsg:"商品标题"},{name:e.goods.stallInfo1,errMsg:"市场档口"},{name:e.goods.costPrice,errMsg:"成本价"},{name:e.goods.profit,errMsg:"利润价"},{name:e.goods.deliveryId,errMsg:"货期排单"},{name:e.goods.labelIds,errMsg:"商品分类"}],!(v=e.$check.all(u))){s.next=32;break}return e.handleError(v),s.abrupt("return");case 32:if(console.log(i),2!=t){s.next=39;break}return s.next=36,e.$API.editShop(i);case 36:e.$success("修改成功！"),s.next=42;break;case 39:return s.next=41,e.$API.addShop(i);case 41:e.$success("添加成功！");case 42:setTimeout(function(){e.$router.back(-1)},2e3);case 43:case"end":return s.stop()}},s,e)}))()},selectTagIds:function(t,e){var s=e.id;e.select=!e.select,this[t].split(",").indexOf(s)>=0?(this[t]=this[t].replace(s+",",""),this.tagText=this.tagText.replace(e.name+",","")):(this[t]+=s+",",this.tagText+=e.name+","),console.log(this[t])},addTag:function(){var t=this;return u()(c.a.mark(function e(){var s,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.addTagText){e.next=2;break}return e.abrupt("return",t.handleError("请输入标签！"));case 2:return e.next=4,t.$API.addShopTag({name:t.addTagText});case 4:s=e.sent,a=s.data,t.addTagText="",a.select=!1,t.tagData.push(a);case 9:case"end":return e.stop()}},e,t)}))()},confirmType:function(t,e){var s=this;return u()(c.a.mark(function a(){var o,i,n,l;return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if("showType1"!=t){a.next=16;break}if(s.postLabelInfo2=[],s.versionName=[],s.select("type1Text",e),s.clickNum=1,s.type1Text.id){a.next=7;break}return a.abrupt("return");case 7:return s.goods.labelInfo=s.type1Text.name,console.log("this.goods.labelInfo"+s.goods.labelInfo),a.next=11,s.getShopClass(2,s.type1Text.id);case 11:o=a.sent,i=o.data,s.type2Data=i,s.type3Data=[],console.log(s.type2Data);case 16:if("showType2"!=t){a.next=33;break}if(2===s.clickNum){a.next=20;break}return s.handleError("未选择二级分类"),a.abrupt("return");case 20:if(s.postLabelInfo2=[],s.versionName=[],s.toClose("showType1"),s.type2Text.id){a.next=25;break}return a.abrupt("return");case 25:return s.goods.labelInfo2=s.type2Text.name,console.log("this.goods.labelInfo2"+s.goods.labelInfo2),a.next=29,s.getShopClass(2,s.type2Text.id);case 29:n=a.sent,l=n.data,s.type3Data=l,console.log(s.type3Data);case 33:case"end":return a.stop()}},a,s)}))()},confirmOther:function(t){if(this.toClose(t),"showTime"==t){if(!this.timeText.id)return;this.goods.deliveryId=this.timeText.id,this.goods.delivery=this.timeText.name}if("showTag"==t){if(!this.tagIds)return;this.goods.tag=this.tagIds}},confirmMarket:function(t){if(t)return this.selectTMarket=t;this.goods.stallInfo1=this.selectFMarket.name,this.goods.stallInfo2=this.selectSMarket.name,this.goods.stallInfo3=this.selectTMarket.name,this.marketText=this.selectFMarket.name+"-"+this.selectSMarket.name+"-"+this.selectTMarket.name,this.toClose("showMarket")},selectTime:function(t){this.timeText=t},getVideo:function(t){this.goods.video=t},getImg:function(t){this.imageList.push(t),console.log("imageList ===> ",this.imageList)},toggleProgress:function(){this.showProgress=!this.showProgress},getMarketData:function(t){var e=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return u()(c.a.mark(function a(){var o,i,n;return c.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return(o=s.id||"")&&(1==t&&(e.selectFMarket=s),2==t&&(e.selectSMarket=s)),0==t&&(e.mktSecondData={},e.mktThirdData={}),1==t&&(e.mktThirdData={}),a.next=6,e.$API.searchMarket({series:t,pid:o});case 6:i=a.sent,0==(n=i.data).length&&(n=[{id:"",name:"无",isno:!1}]),0==t&&(e.mktFirstData=n),1==t&&(e.mktSecondData=n),2==t&&(e.mktThirdData=n);case 12:case"end":return a.stop()}},a,e)}))()},getShopClass:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return this.$API.searchType({types:t,pId:e})},selectTransfer:function(t){this.goods.isTransfer=t}}}}},["EZu8"]);