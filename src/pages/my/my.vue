<template>
  <div class="home">
    <div class="top">
      <p class="user_head"><img src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" /></p>
      <!-- <p class="t_name">发生交电话费</p> -->
      <open-data class="t_name" type="userNickName"></open-data>
    </div>
    <div class="center">
      <div class="line" @click="toRoute('my/newPoint/newPoint')">
        <div class="content">
          <p class="title">
            <i class="icon my1"></i>新手指南</p>
          <p class="toin">
            <i class="goin"></i>
          </p>
        </div>
      </div>
      <!-- <div class="line" @click="toRoute('my/invate/invateDetail')"> -->
      <div class="line" @click="toRoute('my/invate/invate')">
        <div class="content">
          <p class="title">
            <i class="icon my2"></i>邀约有奖</p>
          <p class="toin">
            <i class="goin"></i>
          </p>
        </div>
      </div>
      <!-- <div class="line" @click="toRoute('my/connect')">
        <div class="content">
          <p class="title">
            <i class="icon my3"></i>汇提客服</p>
          <p class="toin">
            <i class="goin"></i>
          </p>
        </div>
      </div> -->
      <!-- <div class="line" @click="toRoute('my/setting/setting')">
        <div class="content">
          <p class="title">
            <i class="icon my4"></i>设置</p>
          <p class="toin">
            <i class="goin"></i>
          </p>
        </div>
      </div> -->
    </div>
    <div class="footer">
      <div class="f_item" :class="[ nav == 1 && 'active' ]" @click="toRoute('home/home')">
        <i class="f_icon f_store"></i>
        <p>店铺</p>
      </div>
      <div class="f_item" :class="[ nav == 2 && 'active' ]" @click="toRoute('my/my')">
        <i class="f_icon f_my"></i>
        <p>我的</p>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import mixin from "@/mixin";
export default {
  mixins: [mixin],
  components: {},
  data() {
    return {
      nav: 2
    };
  },
  methods: {},
  async mounted() {
    // var myArticle = await this.$API.myArticle({ type: 0 });
    // console.log(myArticle);
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.top
  background: #FA8134
  height: 180px
  line-height: 160px
  display: flex
  padding-left: 60px
  .user_head
    +circle(150px)
    margin-right: 38px
    overflow: hidden
  .t_name
    color: #fff

.footer
  position: absolute
  left: 0
  right: 0
  bottom: 0
  display: flex
  font-size: 22px
  text-align: center
  +border(1px,top,#ccc)
  height: 100px
  background: #fff
  .f_item
    flex: 1
    .f_icon
      +icon(44px)
      margin-bottom: 2px
      margin-top: 13px
    .f_store
      +bg-img('home/store1.png')
    .f_my
      +bg-img('home/my1.png')
  .active
    background: #F3792C
    color: #fff
    .f_store
      +bg-img('home/store11.png')
    .f_my
      +bg-img('home/my11.png')

// line
.line
  padding: 0 24px
  background: #fff
  +border(1px,bottom,#F5F5F5)
  .content
    display: flex
    justify-content: space-between
    height: 129px
    line-height: 129px
    color: #222
  .title
    color: #000
    .icon
      +icon(50px)
      height: 48px
      margin-right: 20px
    .my1
      +bg-img('my/my1.png')
    .my2
      +bg-img('my/my2.png')
    .my3
      +bg-img('my/my3.png')
    .my4
      +bg-img('my/my4.png')
  .toin
    color: #666
    font-size: .38rem
    padding-right: 15px
  .goin
    +goback(1px)
    vertical-align: baseline
    &:after
      transform: rotate(225deg)
      border-color: #666
</style>
