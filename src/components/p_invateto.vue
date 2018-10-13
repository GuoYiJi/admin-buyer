<template>
    <!-- 邀约有奖  2 -->
  <div class="home">
    <div class="detail">
      <!-- Lorem ipsum dolor sit amet, consectetur adipiscing
      elit. Aenean euismod bibendum laoreet. Proin
      gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
      Cum sociis natoque penatibus et magnis dis
      parturient montes, nascetur ridiculus mus. Nam
      fermentum, nulla luctus pharetra vulputate, felis
      tellus mollis orci, sed rhoncus sapien nunc eget. -->
      {{myArticle.content}}
    </div>
    <div class="input">
      <input type="text" class="yourname" placeholder="请输入您的称呼">
      <input type="tel" class="yourphone" placeholder="请输入您的电话">
      <input type="text" class="yourId" placeholder="请输入您的身份">
      <i class="icon"></i>
      <input type="tel" class="refereePhone" placeholder="请输入推荐人电话">
    </div>
    <div class="footer">
      <p class="b_btn" @click="apply"><btn :title="'申请小程序'" /></p>
    </div>
    <div class="cover" v-show="showalert">
      <div class="alert">申请成功</div>
    </div>
  </div>

</template>
<script>
import wx from "wx";
import btn from "@/components/btn";

export default {
  components: {
    btn,

  },
  data() {
    return {
      myArticle:[],
      showalert: false,
    }
  },
  methods: {
    apply() {
      this.showalert = true
    }

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
.input
  position: relative
  input
    border: 1px solid #ccc
    width: 692px
    height: 60px
    margin: 24px 24px
    padding: 5px 5px
  .icon
      +bg-img('home/drop.png')
      display: inline-block
      width: 24px
      height: 14px
      position: absolute
      top: 220px
      right: 50px
.cover
  height: 100%
  width: 750px
  background: rgba(255,255,255,0)
  // background: #ccc
  position: absolute
  top: 0
  .alert
    width: 300px
    height: 100px
    text-align: center
    line-height: 100px
    position: absolute
    top: 45%
    left: 30%
    background: rgba(0,0,0,.3)
    color: #fff
</style>
