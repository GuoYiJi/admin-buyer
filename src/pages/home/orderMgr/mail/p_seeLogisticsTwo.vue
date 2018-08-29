<template>
  <!-- 查看物流 -->
  <div class="home">
    <div class="kuang">
      <div class="head">
        <span class="h-text">物流公司：中通快递</span>
      </div>
      <div class="head">
        <span class="ht-text">快递单号：123456</span>
      </div>
      <div class="img-box">
        <img class="img" :src="img">
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      kuang: false,
      img: "http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  height: 90px
  line-height: 90px
  border-top: 1px solid #E5E5E5
  background: #fff
  padding-left: 30px
  .h-img
    +bg-img('my/xq-dfh.png')
    width: 32px
    height: 26px
    display: inline-block
    vertical-align: middle
  .h-text
    padding-left: 20px
    display: inline-block
    vertical-align: middle
    color: #000
    font-size: 28px
  .ht-text
    display: inline-block
    vertical-align: middle
    color: #000
    font-size: 28px
    padding-left: 20px
.img-box
  width: 100%
  height: 443px
  margin-top: 96px
  // margin： 96px 40px 0 40px
  padding-left: 30px
  .img
    width: 90%
    height: 443px
    dispatch: inline-block
.kong
  .k-text
    position: fixed
    top: 40%
    left: 40%
    color: #999
    font-size: 28px
</style>
