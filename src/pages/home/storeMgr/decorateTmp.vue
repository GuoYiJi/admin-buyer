<template>
  <div class="home">
    <p class="title">选择一个适合你的装修风格</p>
    <div class="tmp_box">
      <p class="t_img"><img src="http://tmp/wxaf3800e911f44ce8.o6zAJsw6UUglter4WJtUD5Ha22z8.OI4B2w9dGCjS427af64e1a1a25ccf27039437c8ebe10.png" /></p>
      <p class="use_btn">正在使用</p>
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
 
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.title
  padding: 40px 0
  text-align: center
  font-size: 32px
  font-weight: 600

.t_img
  height: 344px
  width: 286px
  border-radius: 4px
  overflow: hidden 
  margin-bottom: 20px 
  margin-left: 23px
.use_btn
  background: #ccc
  font-size: 26px
  color: #fff
  width: 220px
  height: 70px
  text-align: center
  line-height: 70px
  border-radius: 50px
  margin-left: 56px
</style>