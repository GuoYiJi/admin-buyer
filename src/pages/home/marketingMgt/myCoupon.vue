<template>
  <div class="home">
    <div class="nav">
      <div class="list">
        <span v-for="(item,idx) in navData" :key="idx" class="item" :class="[tag === item.id && 'active']" @click="handleNav(item.id)">{{item.text}}</span>
        <div class="line" :style="{left: (tag-1)*33 + '%'}"></div>
      </div>
    </div>
    <div class="content">
      <div v-if="tag == 1">
        <p>
          <myCoupon @click="toMyCoupon" />
        </p>
      </div>
      <div v-else-if="tag == 2">
        <p>
          <myCoupon @click="toMyCoupon" />
        </p>
      </div>
      <div v-else-if="tag == 3">
        <p>
          <myCoupon @click="toMyCoupon" />
        </p>
      </div>
    </div>
    <div class="foot" @click="btn">
      <span class="btn">创建</span>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import myCoupon from "@/components/m_myCoupon";
// import myCouponT from "@/components/m_myCouponT";
// import myCouponTT from "@/components/m_myCouponTT";
export default {
  components: {
    myCoupon,
    // myCouponT,
    // myCouponTT
  },
  data() {
    return {
      tag: 1,
      navData: [
        {
          id: 1,
          text: "未开始"
        },
        {
          id: 2,
          text: "进行中"
        },
        {
          id: 3,
          text: "已失效"
        }
      ]
    };
  },
  methods: {
    handleNav(tag) {
      this.tag = tag;
    },
    toMyCoupon() {
      this.$router.push("/pages/home/marketingMgt/details");
    },
    btn() {
      this.$router.push("/pages/home/marketingMgt/couponSetting");
    }
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  height: 100%
  .active
    color: #F67C2F
  .nav
    overflow: hidden
    text-align: center
    background: #f5f5f5
    height: 80px
    width: 100%
    padding-top: 1px
    box-shadow: 0px 4px 6px 0px rgba(0, 69, 162, 0.06)
    .list
      font-size: 32px
      color: #000
      background: #f5f5f5
      overflow-y: hidden
      overflow-x: auto
      height: 90px
      position: relative
      display: flex
      width: 100%
      .item
        // flex: 0 0 20%
        flex: 1
        line-height: 70px
        box-sizing: border-box
      .line
        display: block
        height: 4px;/*no*/
        width: 33%
        border-radius: 8px
        background-color: #F67C2F
        position: absolute
        bottom: 10px
        // margin: 0 6%
        transition: left .3s ease-in
  .content
    .text
      margin: 0 auto
  .foot
    position: fixed
    bottom: 0px
    width: 100%
    height: 98px
    line-height: 98px
    background: #F67C2F
    color: #fff
    font-size: 32px
    text-align: center
</style>
