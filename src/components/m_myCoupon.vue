<template>
  <div class="nav">
    <!-- <p class="title" v-if="(title==1)">空空如也~</p> -->
    <div class="coupon" @click="toMyCoupon" v-for="(item,id) in myCoupon" :key="id">
      <!-- <p class="bg hasCoupon"></p> -->
      <div class="left">
        <span class="left_1">{{item.name}}</span> <br/>
        <!-- <span class="left_2">有效期2018.03.28-2018.05.31</span> -->
        <span class="left_2">有效期 {{newendTime}}-{{newcreateTime}}</span>
        <!-- <span class="left_2" v-for="(itemzz,idx) in newTime " :key="idx">{{itemzz.startTime}}</span> -->
      </div>
      <div class="right">
        <div class="box">
          <span class="price">￥<strong>{{item.price}}</strong></span>
          <span class="text">全程满<br>{{item.count}}使用</span>
        </div>
        <button>立即领取></button>
      </div>
      <!-- 已失效 -->
      <!-- <div class="Invalid" v-if="(Invalid == 1)">
        <p class="bg noCoupon"></p>
        <p class="Invalid_text">已失效</p>
      </div> -->
    </div>

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
      newcreateTime: [],
      isLimitCount: "",
      please_input: "",
      isOriginalPrice: "",
    };
  },
  methods: {
    toMyCoupon() {
      this.$router.push("/pages/home/marketingMgt/details");
    }
  },
  onShow() {
    wx.removeStorageSync("isLimitCount");
    wx.removeStorageSync("please_input");
    wx.removeStorageSync("isOriginalPrice");
    wx.removeStorage({
      key: "isLimitCount",
      success: function(res) {
        console.log(res.data);
      }
    });
    wx.removeStorage({
      key: "please_input",
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
  },
  async mounted() {
    var myCoupon = await this.$API.myCoupon({ state: 0 });
    this.myCoupon = myCoupon.data.list;
    // console.log(myCoupon);
    // console.log(myCoupon.data.list,0);

    for (var i = 0; i < myCoupon.data.list.length; i++) {
      // console.log(myCoupon.data.list[i].startTime.substring(0, 10));
      // console.log(myCoupon.data.list[i].endTime.substring(0, 10));
      this.newendTime = myCoupon.data.list[i].startTime
        .split(" ")[0]
        .toString();
      this.newcreateTime = myCoupon.data.list[i].endTime
        .split(" ")[0]
        .toString();
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
  padding: 20px 27px
  // padding-right: 0
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  .coupon
    width: 100%
    margin-top: 20px
    display: flex
    justify-content: space-between
    height: 219px
    padding: 12px 0 12px 40px
    color: #ffffff
    +bg-img('marketingMgt/coupon1.png')
    .left
      width: 350px
      display: flex
      flex-wrap: wrap
      justify-content: center
      text-align: center
      // border: 1px dashed #FFFFFF
      font-size: 28px
      .left_1
        margin-top: 30px
        width: 100%
        height: 40%
        display: flex
        justify-content: center
        align-items: center
      .left_2
        width: 100%
        display: flex
        justify-content: center
        align-items: left
        font-size: 20px
    .right
      width: 280px
      display: flex
      flex-wrap: wrap
      justify-content: center
      color: #fff
      .box
        width: 80%
        display: flex
        align-items: center
        justify-content: space-between
        span.price
          width: 130px
          font-size: 36px
          font-weight: bold
          +singleFile
          strong
            display: inline-block
            font-size: 60px
        span.text
          flex: 1
          text-align: center
          font-size: 24px
      button
        height: 35px
        line-height: 35px
        border-radius: 10px
        padding: 5px 20px
        color: #FF7272
        background-color: #FFFFFF
        font-size: 24px

</style>
