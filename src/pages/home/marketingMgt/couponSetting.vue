<template>
  <div class="nav">
    <form class="form">
      <div class="head">
        <span class="head_text">优惠券名称：</span>
        <input class="head_input" v-model="head_input" type="text" placeholder="请输入（8个字以内，不可特殊字符）">
      </div>
      <div class="value">
        <span class="value_text">面值：</span>
        <input class="value_input" v-model="value_input"  type="text" placeholder="请输入面值">
      </div>
      <div class="grant">
        <span class="grant_text">发放总量：</span>
        <input class="grant_input" v-model="grant_input" type="text" placeholder="请输入发放数量">
      </div>
      <div class="effect">
        <span class="text">生效时间：</span>
        <span class="settings" v-if="(date == '')">
          <span class="settings_text">未设置</span>
          <i class="img"></i>
        </span>
        <picker class="picker_1" v-model="date" mode="date" :value="date" @change="bindDateChange">
          <view class="picker">
            {{date}}
          </view>
        </picker>
      </div>
      <div class="effect">
        <span class="text">过期时间：</span>
        <span class="settings" v-if="(date1 == '')">
          <span class="settings_text">未设置</span>
          <i class="img"></i>
        </span>
        <picker class="picker_1" mode="date" :value="date1" @change="bindDateChange1">
          <view class="picker">
            {{date1}}
          </view>
        </picker>
      </div>
      <div class="effect" @click="Receive">
        <span class="text" >领取设置：</span>
        <span class="settings">
          <span class="settings_text">未设置</span>
          <i class="img"></i>
        </span>
      </div>
      <div class="effect" @click="Use">
        <span class="text" >使用设置：</span>
        <span class="settings">
          <span class="settings_text" v-if="(this.isLimitCount == '' || this.please_input == '')">未设置</span>
          <span class="settings_text" v-if="(this.isLimitCount != '' || this.please_input != '')">已设置</span>
          <i class="img"></i>
        </span>
      </div>
      <div class="btn"  @click="btn_1">
        <span class="btn_1">保存</span>
      </div>
    </form>
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
      date: "",
      date1: "",
      isLimitCount: "",
      please_input: "",
      grant_input: '',
      value_input: '',
      head_input: '',
      date: '',
    };
  },
  methods: {
    bindDateChange: function(e) {
      this.date = e.mp.detail.value;
      console.log(e);
    },
    bindDateChange1: function(e) {
      this.date1 = e.mp.detail.value;
      console.log(e);
    },
    async btn_1() {
      console.log(this);
    
      wx.getStorage({
        key: "isLimitCount",
        success: function(res) {
          console.log(res.data);
        }
      });
      wx.getStorage({
        key: "please_input",
        success: function(res) {
          console.log(res.data);
        }
      });
      // return;
      var newCouponData = await this.$API.newCoupon({
        name: this.head_input,
        price: this.value_input,
        count: this.grant_input,
        startTime: this.date,
        endTime: this.date1
      });
      this.newCoupon = newCoupon.data
      console.log(newCoupon)

      
      wx.navigateBack({
        data: 1
      });
    },
    Use() {
      this.$router.push("/pages/home/marketingMgt/Order/Order")
    },
    Receive() {
      this.$router.push("/pages/home/marketingMgt/settings/settings")
    },
    couponsave() {
      // this.$router.push("/pages/home/marketingMgt/myCoupon")
    }
  },
  mounted() {
    // console.log(this);
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  height: 89px
  background: #fff
  padding: 0 23px
  display: flex
  border-bottom: 1px solid #cecece
  .head_text
    display: inline-block
    margin-top: 25px
  .head_input
    display: inline-block
    margin-top: 22px
    padding-left: 10px
    width: 500px
.value
  height: 118px
  background: #fff
  padding: 0 23px
  display: flex
  border-bottom: 1px solid #cecece
  .value_text
    display: inline-block
    margin-top: 35px
  .value_input
    display: inline-block
    margin-top: 30px
    margin-left: 90px
    padding-left: 10px
    border: 1px solid #cecece
    border-radius: 4px
    width: 460px
.grant
  height: 118px
  background: #fff
  padding: 0 23px
  display: flex
  border-bottom: 1px solid #cecece
  .grant_text
    display: inline-block
    margin-top: 35px
  .grant_input
    display: inline-block
    margin-top: 30px
    margin-left: 33px
    padding-left: 10px
    border: 1px solid #cecece
    border-radius: 4px
    width: 460px
.effect
  height: 110px
  background: #fff
  display: flex
  line-height: 110px
  border-bottom: 1px solid #cecece
  position: relative
  .text
    display: inline-block
    flex: 5
    padding-left: 20px
    margin-right: -140px
  .settings
    display: inline-block
    flex: 1
    .settings_text
      display: inline-block
      margin-right: 18px
      margin-left: -20px
    .img
      display: inline-block
      +bg-img('home/shanJiao.png')
      width: 16px
      height: 29px
  .picker_1
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom: 0
    .picker
      height: 110px
      padding-left: 70%
.btn
  height: 98px
  background: #CCCCCC
  text-align: center
  line-height: 98px
  position: fixed
  bottom: 0px
  width: 100%
  .btn_1
    font-size: 32px
    color: #fff
</style>
