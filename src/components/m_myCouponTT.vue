<template>
  <div class="nav">
    <!-- <p class="title" v-if="(title==1)">空空如也~</p> -->
    <div class="coupon" @click="toMyCoupon" v-for="(item,id) in myCoupon" :key="id">
      <p class="bg hasCoupon"></p>
      <div class="left">
        <span class="left_1">{{item.name}}</span> <br/>
        <!-- <span class="left_2">有效期2018.03.28-2018.05.31</span> -->
        <span class="left_2">有效期 {{newendTime}}-{{newcreateTime}}</span>
        <!-- <span class="left_2" v-for="(itemzz,idx) in newTime " :key="idx">{{itemzz.startTime}}</span> -->
      </div>
      <div class="right">
        <span class="text">￥</span>
        <span class="right_1">{{item.price}}</span>
        <span class="right_2">全程满 {{item.count}}使用</span>
      </div>
      <div class="btn">
        <span class="btn_1">立即领取></span>
      </div>
      <!-- 已失效 -->
      <!-- <div class="Invalid" v-if="(Invalid == 1)">
        <p class="bg noCoupon"></p>
        <p class="Invalid_text">已失效</p>
      </div> -->
    </div>

    <!-- <div class="coupon" @click="toMyCoupon">
      <img src="http://img2.ph.126.net/0XOvgFu-sxInP4KiGDjUpA==/6608193525797912534.png" class="bg">
      <div class="left">
        <span class="left_1">无门槛优惠券</span> <br/>
        <span class="left_2">有效期2018.03.28-2018.05.31</span>
      </div>
      <div class="right">
        <span class="text">￥</span>
        <span class="right_1">50</span>
        <span class="right_2">全程满 150使用</span>
      </div>
      <div class="btn">
        <span class="btn_1">立即领取></span>
      </div>
      <div class="Invalid" v-if="(Invalid == 0)">
        <img class="Invalid_img" src="http://img2.ph.126.net/G1ViaOciUzl6KPmp1trGMQ==/1673931686598843887.png">
        <p class="Invalid_text">已失效</p>
      </div>
    </div> -->
    <!-- <div class="text_1">已领取:112 未使用:12</div> -->
    <!-- 撑开下方创建按钮 -->
    <div style="height: 60px"></div>
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
      // title: 0,
      Invalid: 1,
      myCoupon: [],
      newendTime: [],
      newcreateTime: []
    };
  },
  methods: {
    toMyCoupon() {
      this.$router.push("/pages/home/marketingMgt/details");
    }
  },
  async mounted() {
    var myCoupon = await this.$API.myCoupon({ state: 2 });
    this.myCoupon = myCoupon.data.list;
    console.log(myCoupon,2);
    for (var i = 0; i < myCoupon.data.list.length; i++) {
      console.log(myCoupon.data.list[i].startTime.substring(0, 10));
      console.log(myCoupon.data.list[i].endTime.substring(0, 10));
      this.newendTime = myCoupon.data.list[i].startTime.split(" ")[0].toString();
      this.newcreateTime = myCoupon.data.list[i].endTime.split(" ")[0].toString();
    }
    // for(var i=0; i<this.myCoupon.length; i++){
    //   let b = this.myCoupon[i].endTime
    //   let c= this.myCoupon[i].createTime
    //   console.log(b)
    //   let newendTimezz  = b.slice('',10)
    //   let newcreateTimezz  = c.slice('',10)
    //   console.log(newendTimezz)
    //   let d = {
    //     startTime: newcreateTimezz,
    //     overTime: newendTimezz
    //   }
    //   this.newTime.push(d)
    //   console.log(this.newTime)
    // }
  }
};
</script>

<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.hasCoupon
  +bg-img('marketingMgt/coupon1.png')
.noCoupon
  +bg-img('marketingMgt/coupon11.png')
.nav
  .title
    font-size: 36px
    +center
    left: 40%
  .coupon
    display: inline-block
    margin: 20px 34px 0 27px
    position: relative
    .bg
      display: inline-block
      width: 689px
      height: 220px
  .left
    position: absolute
    top: 62px
    left: 46px
    color: #fff
    font-size: 28px
    .left_1
      display: inline-block
      padding: 0 0 20px 75px
    .left_2
      font-size: 21px
  .right
    display: flex
    position: absolute
    top: 20px
    right: -6px
    color: #fff
    .text
      display: inline-block
      padding-top: 55px
      font-size: 36px
    .right_1
      display: inline-block
      font-size: 70px
      flex: 1
      margin-right: -39px
      padding-top: 20px
    .right_2
      display: inline-block
      font-size: 24px
      flex: 1
      padding-top: 36px
      margin-right: 20px
  .btn
    position: absolute
    top: 150px
    right: 55px
    width: 147px
    height: 34px
    display: inline-block
    background: #fff
    border-radius: 8px
    text-align: center
    line-height: 34px
    .btn_1
      font-size: 24px
      color: #FF7272
  .text_1
    font-size: 32px
    color: #000
    margin: 0 0 0 30px
  .Invalid
    position: absolute
    top: 0px
    left: 0px
    display: inline-block
    .Invalid_img
      display: inline-block
      position: absolute
      width: 689px
      height: 220px
      top: 0px
      left: 0px
    .Invalid_text
      display: inline-block
      position: absolute
      left: 150px
      top: 80px
      font-size: 36px
      color: #fff

</style>
