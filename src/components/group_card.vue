<template>
  <div class="g_boxs">
    <div class="card_boxs shop-cards">
      <div class="img_box">
        <p class="img_1"><img src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"></p>
      </div>
      <div class="descs">
        <p class="d_texts">就爱上的回访记录卡山东客服了解奥斯卡代理费圣诞快乐房间卡萨老地方拉水电费可垃圾上单士大夫看见爱上的看法</p>
        <p class="d_times"> 货期:现货丨销量:123</p>
      </div>
      <p class="price">
        <span>售价:￥23</span>
        <span class="sell">&nbsp;&nbsp;&nbsp;售价:￥23</span>
      </p>
      <i class="cancel_shop" v-if="cancel"></i>
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  props: {
    cancel: {
      type: Boolean,
      false: false
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.cancel_shop
  position: absolute
  +bg-img('shopMgr/cancel.png')
  right: 12px
  top: 12px
  +icon(50px)
  border-radius: 50px
.g_boxs
  height: 422px
  width: 216px
.card_boxs
  padding-bottom: 4px
  .img_box
    +border(2px,all, #ccc)
    padding: 16px 0px
    .img_1
      height: 300px
      width: 212px
.d_name
	color: #e3e3e3
	font-size: 14px
.shop-cards
	position: relative
	img
		width: 100%
		border-radius: 4px
.descs
  margin: 5px 0
  font-size: 20px
.d_texts
  color: #000
  font-size: 24px
  +singleFile
.price
  color: #FF0000
  font-weight: bold
  font-size: 24px
  padding-top: 10px
  height: 24px
  line-height: 24px
  +singleFile
  text-align: left
  .sell
    color: #333
    font-size: 22px
    font-weight: 500
.d_times
  font-size: 20px
  color: #999
  +singleFile
  text-align: left
</style>
