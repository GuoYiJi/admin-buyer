<template>
  <div class="g_boxs">
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
