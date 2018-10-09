<template>
  <div class="home">
    <div class="top">
      <image src="http://hd.wallpaperswide.com/thumbs/european_architecture-t2.jpg" mode="aspectFit" />
    </div>
    <div class="detail">
      {{myArticle.content}}
    </div>
    <div class="footer">
        <!-- <btn :title="'立即推广'" /> -->
        <button class="icon" open-type="share">立即推广</button>
    </div>
    <!-- <div class="cover" v-show="showTime">
      <div class="alertwx">
        <div class="alert-img">
          <button class="icon" open-type="share"></button>
          <img src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg">
        </div>
        <span>微信好友</span>
        <div class="cancelbtn" @click="colseBut">取消</div>
      </div>
    </div> -->
  </div>
</template>
<script>
import wx from "wx";
import btn from "@/components/btn";
export default {
  components: {
    btn
  },
  data() {
    return {
      myArticle: "",
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
    console.log(myArticle);
    this.myArticle = myArticle.data;
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.footer
  padding: 0 75px
  position: fixed
  left: 0
  right: 0
  bottom: 80px
  z-index: 6
  button.icon
    width: 100%
    height: 90px
    line-height: 90px
    text-align: center
    background-color: #F67C2F
    color: #ffffff
    font-weight: bold
    font-size: 32px
.detail
  padding: 0 30px
  font-size: 30px
.home
  height: 100%
  background: #fff
  color: #333
.top
  padding: 30px
  image
    width: 100%
    background-color: #ffffff
.cover
  background: rgba(255,255,255,0)
  position: absolute
  top: 0
  left: 0
  width: 750px
  height: 100%
  .alertwx
    width: 491px
    height: 378px
    background: #fff
    box-shadow: 1px 2px 3px
    border-radius: 10px
    position: absolute
    top: 25%
    left: 18%
    .alert-img
      margin: 30px auto
      width: 130px
      height: 130px
      img
        width: 130px
        height: 130px
        border-radius: 50%
      .icon
        +bg-img('login/wxLogin.png')
        display: inline-block
        width: 90px
        height: 90px
        position: absolute
        top: 80px
        right: 200px
      button::after
        border: none
    span
      padding: 10px 186px
      font-size: 28px
      text-align: center

    .cancelbtn
      margin: 20px auto
      width: 340px
      height: 60px
      background: #F67C2F
      border-radius: 10px
      text-align: center
      line-height: 60px
      font-size: 30px
      color: #fff
</style>
