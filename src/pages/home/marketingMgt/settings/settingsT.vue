<template>
  <div class="nav">
    <span class="text">订单金额</span>
    <span class="settings">
      <span v-if="(settings == 0)" class="settings_text">不限</span>
      <span v-if="(settings == 1)" class="settings_text">
        <input type="text" class="rit" value="10">
      </span>
    </span>
  </div>
</template>
<script>
import wx from "wx";
export default {
    components: {},
    data() {
        return {
            settings: 1,
            newCoupon:[]
        };
    },
    methods: {
      
    },
    mounted() {
     
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
    flex: 1
    .settings_text
      display: inline-block
      margin-left: 30px
      margin-top: 20px
      .rit
        // margin-top: 5px


</style>
