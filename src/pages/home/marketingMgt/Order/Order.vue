<template>
  <div class="nav">
    <div class="line flex">
      <p class="name">不限制金额</p>
      <i-switch :value="switch1" @change="onChange" slot="footer"></i-switch>
    </div>
    <div class="please">
      <span class="please_text">订单金额：</span>
      <input class="please_input" v-model="please_input" :disabled="disa" @change="bindKeyInput" type="text" placeholder="请输入订单金额">
    </div>
    <div class="text" v-if="(text == 0)">任何金额都可以使用</div>
    <div class="text" v-if="(text == 1)">当前优惠券面值为：{{please_input}}元；订单金额必须大于优惠券金额</div>
    <!-- <div class="text" v-else>订单金额必须大于优惠券金额</div> -->
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      switch1: false,
      text: 1,
      isLimitCount: 0,
      inp: 0,
      please_input: "",
      disa: false
    };
  },
  methods: {
    onChange({ mp: { detail } }) {
      this.setData({
        switch1: detail.value
      });
      console.log(this.switch1);
      console.log(this.isLimitCount);
      if (this.switch1 == false) {
        this.isLimitCount = 0;
        this.disa = false;
        wx.setStorageSync("isLimitCount", this.isLimitCount);
        this.please_input = "";
        wx.setStorageSync("please_input", this.please_input);
      } else if (this.switch1 == true) {
        this.isLimitCount = 1;
        this.disa = true;
        wx.setStorageSync("isLimitCount", this.isLimitCount);
        this.please_input = "";
        wx.setStorageSync("please_input", this.please_input);
      }
    },
    bindKeyInput(e) {
      wx.setStorage({
        key: "please_input",
        data: this.please_input
      });
      this.isLimitCount = 0;
      wx.setStorageSync("isLimitCount", this.isLimitCount);
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key];
      });
    }
  },
  onShow() {
    console.log(this, 5555);
    this.switch1 = false;
    wx.setStorage({
      key: "isLimitCount",
      data: this.isLimitCount
    });
    this.bindKeyInput();
  },
  mounted() {
    this.disa = false;
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.flex
  display: flex
  justify-content: space-between
.line
  height: 110px
  line-height: 110px
  text-align: left
  position: relative
  padding: 0px 24px
  margin: 20px 0
  background: #fff
  .name
    float: left
    width: 450px
.text
  color: #FF0000
  font-size: 26px
  padding-left: 25px
.please
  height: 110px
  text-align: left
  background: #fff
  margin: 20px 0
  position: relative
  .please_text
    display: inline-block
    padding: 33px 0 0 25px
  .please_input
    display: inline-block
    position: absolute
    top: 27px
    border: 1px solid #cfcfcf
    width: 526px
    height: 60px
    border-radius: 10px
    padding-left: 10px
</style>
