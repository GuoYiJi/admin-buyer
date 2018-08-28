<template>
  <div class="home">
    <div class="center">
      <i class="icon"></i>
      <p class="desc">您已经绑定手机号： 15622285067，账号安全</p>
    </div>
    <div class="footer">
      <p class="b_btn" @click="toRoute('my/setting/changePhone')"><btn :title="'立即推广'" /></p>
    </div>
  </div>
  
</template>
<script>
import wx from "wx";
import btn from '@/components/btn'
import mixin from '@/mixin'
export default {
  mixins: [mixin],
  components: {
    btn
  },
  data() {
    return {};
  },
  methods: {
 
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.center
  padding-top: 225px
  text-align: center
  .icon
    +icon(120px)
    +bg-img('my/bindPhone.png')
  .desc
    padding-top: 58px

.footer
  padding: 0 75px
  position: absolute
  bottom: 80px
  .b_btn
    width: 600px 
</style>