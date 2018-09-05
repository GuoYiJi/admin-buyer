<template>
  <div class="nav">
    <div class="coupon" @click="toMyCoupon">
      <i class="img"></i>
      <p class="text">优惠券</p>
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    toMyCoupon() {
      this.$router.push("/pages/home/marketingMgt/myCoupon");
    }
  },
  onShow() {
    wx.getStorageInfo({
      success: function(res) {
        console.log(res.keys);
      }
    });
    wx.removeStorage({
      key: "please_input",
      success: function(res) {
        console.log(res.data);
      }
    });
    wx.removeStorage({
      key: "isLimitCount",
      success: function(res) {
        console.log(res.data);
      }
    });
    wx.removeStorage({
      key: "isOriginalPrice",
      success: function(res) {
        console.log(res.data);
      }
    });
    wx.removeStorage({
      key: "selIds",
      success: function(res) {
        console.log(res.data);
      }
    });
    wx.removeStorage({
      key: "isAll",
      success: function(res) {
        console.log(res.data);
      }
    });
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  display: flex
  flex-wrap: wrap
  .coupon
    margin: 30px 23px
    font-size: 34px
    .img
      +bg-img('marketingMgt/Coupon.png')
      width: 102px
      height: 102px
      border-radius: 50%
    .text
      margin-top: 10px
</style>
