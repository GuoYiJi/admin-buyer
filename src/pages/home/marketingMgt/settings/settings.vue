<template>
  <div class="nav">
    <span class="text">订单金额</span>
    <span class="settings" @click="toSettings()">
      <span class="settings_text" v-if="(isLimitCount == 0 && please_input == '')">去设置</span>
      <span class="settings_text" v-if="(isLimitCount == 1)">不限</span>
      <span class="settings_text" v-if="(please_input != '')">{{please_input}}</span>
      <i class="img"></i>
    </span>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return { isLimitCount: "", please_input: "" };
  },
  methods: {
    toSettings() {
      // this.$router.push("/pages/home/marketingMgt/settings/settingsT");
      this.$router.push("/pages/home/marketingMgt/Order/Order");
    },
    huanc() {
      this.isLimitCount = wx.getStorageSync("isLimitCount");
      console.log(this.isLimitCount, "选择");
      this.please_input = wx.getStorageSync("please_input");
      console.log(this.please_input, "输入");
    }
  },
  onShow() {
    var that = this;
    wx.getStorageInfo({
      success: function(res) {
        console.log(res.keys);
        console.log(res.currentSize);
        console.log(res.limitSize);
      }
    });
    setTimeout(() => {
      that.huanc();
    }, 100);
  },
  mounted() {
    this.isLimitCount = 0;
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  height: 110px
  background: #fff
  display: flex
  line-height: 110px
  .text
    display: inline-block
    flex: 5
    padding-left: 20px
  .settings
    display: inline-block
    // flex: 1
    .settings_text
      display: inline-block
      margin-right: 18px
      margin-left: -20px
    .img
      display: inline-block
      +bg-img('home/shanJiao.png')
      width: 16px
      height: 29px
      margin-right: 20px
</style>
