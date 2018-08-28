<template>
  <div class="home">
    <div class="content" >
      <div class="adr-card" @click="selectAct(1)">
        <div class="user">
          <p class="name">浙江沪包邮</p>
        </div>
        <div class="adr">
          <i class="select" :class="[select == 1 && 'active'] " ></i>
          <p class="adr-text">运送到上海、江苏、浙江山歌、安徽省和江西省；售件1kg，运费10.00元；续重1件，运费5.00元</p>
        </div>
      </div>
      <div class="adr-card" @click="selectAct(2)">
        <div class="user">
          <p class="name">浙江沪包邮</p>
        </div>
        <div class="adr">
          <i class="select" :class="[select == 2 && 'active'] " ></i>
          <p class="adr-text">运送到上海、江苏、浙江山歌、安徽省和江西省；售件1kg，运费10.00元；续重1件，运费5.00元</p>
        </div>
      </div>
    </div>
    <p class="bottom"></p>
    <p class="save">保存</p>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      select: ''
    };
  },
  methods: {
    selectAct(id){
      this.select = id
    }
  },
  mounted() {

  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.content
  padding-bottom: 100px
.save
  position: absolute
  bottom: 0
  left: 0
  right: 0
  color: #fff
  background: #F67C2F
  height: 98px
  line-height: 98px
  text-align: center
  letter-spacing: 1px
.adr-card
  padding: 38px 75px 38px 90px
  margin-bottom: 10px
  position: relative
  background: #fff
  .user
    color: #000
    padding-bottom: 20px
  .adr
    color: #666
    font-size: 27px
    position: relative
  .select
    +select(40px)
    left: -65px
    top: 10px
  .active
    +select-active
    
</style>