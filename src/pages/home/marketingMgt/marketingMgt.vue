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
    mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  display: flex
  flex-wrap: wrap
  .coupon
    flex: 1
    margin: 30px 23px
    font-size: 34px
    .img
      +bg-img('marketingMgt/Coupon.png')
      width: 102px
      height: 102px
    .text
      margin-top: 10px
</style>
