<template>
  <div class="home">
    <div class="setting_box">
      <div class="line" @click="toRoute('my/setting/bindPhone')">
        <div class="content">
          <p class="title">修改绑定的手机号</p>
          <p class="toin"><i class="goin"></i></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import mixin from '@/mixin'
export default {
  mixins: [mixin],
  components: {},
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

.line
  padding: 0 24px
  margin: 20px 0
  background: #fff
  +border(1px,bottom,#F5F5F5)
  .content
    display: flex
    justify-content: space-between
    height: 109px
    line-height: 109px
    color: #222
  .title
    color: #000
  .toin
    color: #666
    font-size: .38rem
    padding-right: 15px
  .goin
    +goback(1px)
    vertical-align: baseline
    &:after
      transform: rotate(225deg)
      border-color: #666   
</style>