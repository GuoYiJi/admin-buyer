<template>
<div class="home">
  <div class="nav">
    <div class="list">
      <span v-for="(item,idx) in navData" :key="idx" class="item" :class="[tag === item.id && 'active']" @click="handleNav(item.id)">{{item.text}}</span>
      <div class="line" :style="{left: tag*33 + '%'}"></div>
    </div>
  </div>
  <div class="content">
    <div v-if="tag == 0">
      <div v-for="(item, index) in couponInfo" :key="index">
        <myCoupon :couponInfo="item" @click.native="toMyCoupon(item)" />
      </div>
    </div>

    <div v-else-if="tag == 1">
      <div v-for="(item, index) in couponInfo" :key="index" @click="toMyCoupon(item)">
        <myCoupon :couponInfo="item" />
        <p class="info">已领取:{{item.mCount}}&thinsp;&thinsp;未使用:{{item.count - item.mCount}}</p>
      </div>
    </div>

    <div v-else-if="tag == 2">
      <div v-for="(item, index) in couponInfo" :key="index">
        <myCoupon :couponInfo="item" :state="2"/>
        <p class="info">已领取:{{item.mCount}}&thinsp;&thinsp;未使用:{{item.count - item.mCount}}</p>
      </div>
    </div>

  </div>
  <div style="height: 60px"></div>
  <div class="foot" @click="btn">
    <span class="btn">创建</span>
  </div>
</div>
</template>
<script>
import wx from "wx";
import myCoupon from "@/components/m_myCoupon";

export default {
  components: {
    myCoupon,
    // myCouponT,
    // myCouponTT
  },
  data() {
    return {
      tag: 1,
      couponInfo: [],
      navData: [{
          id: 0,
          text: "未开始"
        },
        {
          id: 1,
          text: "进行中"
        },
        {
          id: 2,
          text: "已失效"
        }
      ]
    };
  },
  methods: {
    handleNav(state) {
      this.tag = state;
      this.$API.myCoupon({
        state
      }).then(response => {
        this.couponInfo = response.data.list
        console.log(this.couponInfo)
      })
    },
    toMyCoupon(item) {
      console.log(item);
      this.$router.push({path: "/pages/home/marketingMgt/details", query: {item: JSON.stringify(item)}});
    },
    btn() {
      this.$router.push("/pages/home/marketingMgt/couponSetting");
    }
  },
  onShow() {
    this.handleNav(this.tag)
  },
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  height: 100%
  .active
    color: #F67C2F
  .nav
    width: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 1000
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
    margin-top: 100px
    p.info
      padding: 15px 20px
      font-size: 32px
      color: #000
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
    z-index: 100
</style>
