<template>
  <div class="nav">
    <div class="coupon" :class="[state === 2 ? 'overTime' : 'inTime']">
      <div class="left">
        <span class="left_1">{{couponInfo.name}}</span> <br/>
        <span class="left_2">
          <p>有效期</p>
          <p>{{startTime}}-{{endTime}}</p>
        </span>
      </div>
      <div class="right">
        <span class="right_1">￥<strong>{{couponInfo.price}}</strong></span>
        <span class="right_2">
          <p>全程满</p>
          <p>{{couponInfo.limitCount}}使用</p>
        </span>
        <button class="btn" :class="[state === 2 ? 'btnOff' : 'btnOn']">立即领取></button>
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
    };
  },
  props: {
    couponInfo: {
      type: Object,
      default: {}
    },
    state: {
      type: Number,
      default: 0
    }
  },
  computed: {
    startTime() {
      return this.couponInfo.startTime.split(' ')[0].toString().replace(/-/g, '.')
    },
    endTime() {
      return this.couponInfo.endTime.split(' ')[0].toString().replace(/-/g, '.')
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  width: 100%
  margin-top: 20px
  .overTime
    +bg-img('marketingMgt/coupon11.png')
  .inTime
    +bg-img('marketingMgt/coupon1.png')
  .coupon
    width: 689px
    height: 220px
    margin: 0 auto
    display: flex
    color: #ffffff
    // justify-content: space-between
    .left
      color: #fff
      width: 330px
      font-size: 28px
      padding: 5px 40px
      display: flex
      flex-wrap: wrap
      justify-content: center
      .left_1
        width: 100%
        padding: 50px 0 0
        text-align: center
      .left_2
        width: 100%
        font-size: 22px
        text-align: center
        +singleFile
    .right
      width: 300px
      color: #fff
      display: flex
      flex-wrap: wrap
      justify-content: center
      .right_1
        display: flex
        flex-wrap: wrap
        align-items: center
        justify-content: center
        width: 55%
        font-size: 36px
        text-align: center
        +singleFile
        strong
          display: inline-block
          font-size: 60px
      .right_2
        padding: 40px 0
        display: flex
        flex-wrap: wrap
        align-items: center
        justify-content: center
        width: 45%
        font-size: 24px
        text-align: center
        p
          width: 100%
          +singleFile
      button.btn
        width: 150px
        height: 35px
        line-height: 35px
        text-align: center
        font-size: 24px
        // padding: 5px 20px
        border: none
        margin-bottom: 20px
      button.btnOn
        background-color: #ffffff
        color: #FF7272
      button.btnOff
        background-color: #DCDCDC
        color: #ffffff
</style>
