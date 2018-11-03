<template>
  <div class="home">
    <rich-text :nodes="nodes"></rich-text>
    <div class="footer">
        <!-- <btn :title="'立即推广'" /> -->
        <button class="icon" open-type="share">立即推广</button>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import btn from "@/components/btn";
import WxParse from '@/plugins/wxParse/wxParse';

import HtmlToJson from '@/plugins/wxParse/html2json.js';
// const a = HtmlToJson.html2json('<img src="https://huiti-img.oss-cn-shanghai.aliyuncs.com//ueditor/1541217550056.png" style="width:100%; height:auto;"/>');
export default {
  components: {
    btn
  },
  data() {
    return {
      myArticle: "",
      nodes: [],
      // nodes: [
      //   {

      //     name: 'div',
      //     attrs: {
      //       class: 'div_class',
      //       style: 'line-height: 60px; color: red;'
      //     },
      //     children: [{
      //       type: 'text',
      //       text: 'Hello&nbsp;World!'
      //     }]
      //   }
      // ],

      showTime: false
    };
  },
  methods: {
    // alertto() {
    //   this.showTime = true;
    //   // wx.showShareMenu({
    //   //   withShareTicket: true
    //   // });
    // },
    // colseBut() {
    //   this.showTime = false;
    // }
  },
  onShareAppMessage: function(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "申请小程序",
      path: "/pages/my/invate/invateDetail",
      imageUrl: "https://huiti-img.oss-cn-shanghai.aliyuncs.com/share/share.jpg"
    };
  },
  async mounted() {
    var myArticle = await this.$API.myArticle({ type: 1 });
    this.myArticle = myArticle.data;
    try {

      if (myArticle.code === 1) {
        console.log(HtmlToJson.html2json(myArticle.data.content))
        this.nodes = HtmlToJson.html2json(myArticle.data.content).children;
      }
    } catch (err) {
      console.log(err);
    }
    
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  padding-bottom: 120px;
.top-image
  display: block;
  width: 100%;
  height: auto;
.footer
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  button.icon
    width: 100%
    height: 90px
    line-height: 90px
    text-align: center
    background-color: #F67C2F
    color: #ffffff
    font-weight: bold
    font-size: 32px
    border-radius: 0;
    &:after
      border-radius: 0;
.detail
  padding: 0 30px
  font-size: 30px
.home
  background: #fff
  color: #333
.top
  padding: 30px
  image
    width: 100%
    background-color: #ffffff
</style>
