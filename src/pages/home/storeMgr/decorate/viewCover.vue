<template>
  <div class="home">
    <div class="img-box"><img class="cover" :src="img"/></div>
    <div class="footer">
      <p @click="confirm"><btn :title="'启用该模板为店铺封面'"/></p>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import btn from '@/components/btn.vue'
export default {
  components: {
    btn
  },
  data() {
    return {
      img: ''
    };
  },
  methods: {
    confirm(){
      console.log('1')
      this.$success()
    }
  },
  mounted() {
    this.img = this.$route.query.img
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  height: 100%
.img-box
  width: 100%
  height: 85%
.footer
  background: #fff
  height: 10%
  padding: 40px
  p
     
</style>