<template>
  <div class="nav">
    <form class="form">
        <div class="head">
        <span class="head_text">优惠券名称：</span>
        <input class="head_input" v-model="head_input" type="text" placeholder="请输入（8个字以内，不可特殊字符）">
      </div>
      <div class="value">
        <span class="value_text">面值：</span>
        <input class="value_input" v-model="value_input" type="digit" placeholder="请输入面值">
      </div>
        <div class="grant">
        <span class="grant_text">发放总量：</span>
        <input class="grant_input" v-model="grant_input" type="number" :placeholder="value_input ? '请输入发放数量' : '请先输入面值'" :disabled="!value_input">
      </div>
      <div class="effect">
        <span class="text">生效时间：</span>
        <span class="settings" v-if="(date == '')">
          未设置
          <!-- <i class="img"></i> -->
        </span>
        <picker class="picker_1" mode="date" :start="startTime" :end="endTime" :value="date" @change="bindDateChange">
          <view class="picker">
            {{date}}
          </view>
        </picker>
      </div>
      <div class="effect">
        <span class="text">过期时间：</span>
        <span class="settings" v-if="(date1 == '')">
          未设置
          <!-- <i class="img"></i> -->
        </span>
        <picker class="picker_1" mode="date" :start="startTime1" :value="date1" @change="bindDateChange1">
          <view class="picker">
            {{date1}}
          </view>
        </picker>
      </div>
      <div class="effect" @click="Receive">
        <span class="text">领取设置：</span>
        <span class="settings">
          <span class="settings_text" v-if="(ling == '' )">未设置</span>
          <span class="settings_text" v-if="(ling != '' )">已设置</span>
          <!-- <i class="img"></i> -->
        </span>
      </div>
      <div class="effect" @click="Use">
        <span class="text">使用设置：</span>
        <span class="settings">
          <span class="settings_text" v-if="(isOriginalPrice =='')">未设置</span>
          <span class="settings_text" v-if="(isOriginalPrice !='')">已设置</span>
          <!-- <i class="img"></i> -->
        </span>
      </div>
    </form>
    <div class="btn" @click="btn_1">
      <span class="btn_1">保存</span>
    </div>
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
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 365 * 10),
      date1: "",
      startTime1: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      isLimitCount: "",
      please_input: "",
      isOriginalPrice: "",
      grant_input: "",
      value_input: "",
      head_input: "",
      ling: "",
      isAll: "",
      selIds: ""
    };
  },
  methods: {
    bindDateChange: function(e) {
      this.date = e.mp.detail.value;
      this.startTime1 = e.mp.detail.value;
    },
    bindDateChange1: function(e) {
      if(!this.date) {
        wx.showToast({
          title: '请先设置生效时间',
          icon: 'none'
        })
        return
      }
      if(parseInt(this.date1) < parseInt(e.mp.detail.value)) {
        wx.showToast({
          title: '过期时间不得早于生效时间',
          icon: 'none'
        })
        return
      }
      this.date1 = e.mp.detail.value;
      this.endTime = this.date1
    },
    async btn_1() {
      if(this.head_input.split('').length > 8) {
        wx.showToast({
          title: '优惠券名称不能超过8个字符',
          icon: 'none'
        })
        return
      }
      this.isLimitCount = wx.getStorageSync("isLimitCount");
      console.log(this.isLimitCount, "选择");
      this.please_input = wx.getStorageSync("please_input");
      console.log(this.please_input, "输入");
      this.isOriginalPrice = wx.getStorageSync("isOriginalPrice");
      console.log(this.isOriginalPrice, "xz");
      // this.newCoupon = newCoupon.data;
      // console.log(newCoupon);
      this.ok().then(response => {
        wx.showToast({
          title: '创建成功',
          icon: 'success'
        })
        wx.removeStorageSync('isLimitCount')
        wx.removeStorageSync('please_input')
        wx.removeStorageSync('isOriginalPrice')
        wx.removeStorageSync('isAll')
        this.date = ''
        this.date1 = ''
        this.startTime = new Date()
        this.startTime1 = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        this.value_input = ''
        this.grant_input = ''
        this.head_input = ''
        setTimeout(() => {
          this.$router.back(-1)
        }, 1500)
      })
    },
    ok() {
      return this.$API.newCoupon({
        name: this.head_input,
        price: this.value_input,
        count: this.grant_input,
        startTime: this.date,
        endTime: this.date1,
        isLimitCount: this.isLimitCount,
        limitCount: this.please_input,
        isOriginalPrice: this.isOriginalPrice,
        originalGoodsIds: this.selIds.toString(),
        isAll: this.isAll
      })
    },
    Use() {
      this.$router.push("/pages/home/marketingMgt/usageSettings/usageSettings");
      // this.$router.push("/pages/home/marketingMgt/Order/Order")
    },
    Receive() {
      // this.$router.push("/pages/home/marketingMgt/Order/Order")
      this.$router.push("/pages/home/marketingMgt/settings/settings");
    },
    couponsave() {
      // this.$router.push("/pages/home/marketingMgt/myCoupon")
    },
    huanc() {
      this.isLimitCount = wx.getStorageSync("isLimitCount");
      this.please_input = wx.getStorageSync("please_input");
      this.isOriginalPrice = wx.getStorageSync("isOriginalPrice");
      this.selIds = wx.getStorageSync("selIds");
      this.isAll = wx.getStorageSync("isAll");
      if (this.isLimitCount == "" && this.please_input == "") {
        this.ling = "";
        console.log(this.ling);
      }
      if (this.isLimitCount != "" || this.please_input != "") {
        this.ling = 1;
        console.log(this.ling);
      }
    }
  },
  onShow() {
    this.huanc();
  },
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  height: 89px
  background: #fff
  display: flex
  align-items: center
  border-bottom: 1px solid #cecece
  .head_text
    width: 200px
    +singleFile
  .head_input
    flex: 1
    overflow: hidden
    padding-left: 10px
.value
  height: 118px
  background: #fff
  display: flex
  align-items: center
  border-bottom: 1px solid #cecece
  .value_text
    width: 200px
    +singleFile
  .value_input
    flex: 1
    overflow: hidden
    padding-left: 10px
    border: 1px solid #cecece
    border-radius: 4px
.grant
  height: 118px
  background: #fff
  display: flex
  align-items: center
  border-bottom: 1px solid #cecece
  .grant_text
    width: 200px
    +singleFile
  .grant_input
    display: inline-block
    padding-left: 10px
    border: 1px solid #cecece
    border-radius: 4px
    width: 460px
    &[disabled]
      background-color: #cccccc
      color: #ffffff
.form
  padding: 0 25px
  background-color: #fff
  display: flex
  flex-wrap: wrap
  justify-content: center
.effect
  width: 100%
  display: flex
  justify-content: space-between
  height: 110px
  // background: #fff
  background: url("~@/assets/img/home/shanJiao.png") no-repeat right
  background-size: 16px 29px
  display: flex
  line-height: 110px
  border-bottom: 1px solid #cecece
  position: relative
  &:last-of-type
    border: none
  .text
    width: 150px
    +singleFile
  .settings
    flex: 1
    text-align: right
    padding-right: 30px
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
  background: #F67C2F
  text-align: center
  line-height: 98px
  position: fixed
  left: 0
  bottom: 0
  width: 100%
  .btn_1
    font-size: 32px
    color: #fff
</style>
