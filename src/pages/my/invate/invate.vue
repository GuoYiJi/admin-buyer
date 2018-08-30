<template>
  <div class="home">
    <div class="top">
      <p class="t_img"><img src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" /></p>
    </div>
    <!-- <div class="detail">
      Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Aenean euismod bibendum laoreet. Proin
      gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
      Cum sociis natoque penatibus et magnis dis
      parturient montes, nascetur ridiculus mus. Nam
      fermentum, nulla luctus pharetra vulputate, felis
      tellus mollis orci, sed rhoncus sapien nunc eget.
    </div> -->
    {{myArticle.content}}
    <div class="footer">
      <p class="b_btn" @click="alertto">
        <btn :title="'立即推广'" />
      </p>
    </div>
    <div class="cover" v-show="showTime">
      <div class="alertwx">
        <div class="alert-img">
          <button class="icon" open-type="share"></button>
          <!-- <img src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"> -->
        </div>
        <span>微信好友</span>
        <div class="cancelbtn" @click="colseBut">取消</div>
      </div>
    </div>

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
    alertto() {
      this.showTime = true;
      // wx.showShareMenu({
      //   withShareTicket: true
      // });
    },
    colseBut() {
      this.showTime = false;
    }
  },
  onShareAppMessage: function(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "申请小程序",
      path: "/pages/my/invate/invateDetail",
      imageUrl:
        "http://img0.ph.126.net/AE8LWDjxdZzUWfgWnuqJmQ==/141300438409203738.jpg"
      // path: "/pages/my/invate/invateDetail/user?id=123"
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
  position: absolute
  bottom: 80px
  .b_btn
    width: 600px
.detail
  padding: 0 30px
.home
  height: 100%
  background: #fff
  color: #333
.top
  padding: 30px
  .t_img
    height: 300px
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
