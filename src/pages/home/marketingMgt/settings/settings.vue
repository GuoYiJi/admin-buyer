<template>
  <div class="nav">
    <span class="text">订单金额</span>
    <span class="settings" @click="toSettings()">
      <span class="settings_text">去设置</span>
      <i class="img"></i>
    </span>
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
    toSettings() {
      this.$router.push("/pages/home/marketingMgt/settings/settingsT");
    }
  },
  mounted() {}
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
</style>
