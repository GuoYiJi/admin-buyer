<template>
  <div class="home">
    <div class="box">
      <div class="c_box b_distance">
        <i class="icon connect1"></i>
        <button open-type="contact" class="title">在线客服</button>
      </div>
      <div class="c_box" @click="call">
        <i class="icon connect2"></i>
        <p class="title">电话客服</p>
      </div>
    </div>
    
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
    call(){
      wx.makePhoneCall({
        phoneNumber: '123456789',
      })
    }
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.b_distance
  margin-bottom: 128px
.home
  height: 100%
  background: #fff
  margin: 0 auto
.box
  padding: 275px 170px
.c_box
  background: #F67C2F
  color: #fff 
  height: 200px
  border-radius: 8px
  line-height: 200px
  position: relative
  .icon
    +icon(45px)
    // margin-right: 28px
    +center
    left: 102px
  .connect1
    +bg-img('my/connect1.png')
  .connect2
    +bg-img('my/connect2.png')
  .title
    padding-left: 177px
    background: none
    text-align: left
    color: #fff
    line-height: 200px
    border: none
</style>