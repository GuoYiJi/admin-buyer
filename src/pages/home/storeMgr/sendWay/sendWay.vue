<template>
  <div class="home">
    <div class="line-box">
      <div class="line" @click="toRoute('sendWay/selectTemplet')">
        <p class="name">快递邮寄</p> 
        <i class="goback"></i>
      </div>
      <div class="line flex">
        <p class="name">物流到付</p> 
        <i-switch :value="switch1" @change="onChange" slot="footer"></i-switch>
      </div>
    </div>
    <div class="footer">
      <p @click="butFooter"><btn :title="'保存'" /></p>
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
      'switch1': false,
      templateId: ''
    };
  },
  methods: {
    toRoute(file){
      this.$router.push('/pages/home/storeMgr/' + file)
    },
    onChange ({ mp: { detail } }) {
      this.setData({
        'switch1': detail.value
      })
    },
    setData (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    async butFooter(){
  
      const L_changeExpressData = await this.$API.L_changeExpress({
        templateId: this.templateId,
      });
      console.log(L_changeExpressData)
    }
  },
  mounted() {
    this.templateId= this.$route.query.templateId
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.goback
  +goback(2px)
  +center
  right: 24px
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
.home
.footer
  position: absolute
  bottom: 80px
  left: 0
  right: 0
  p
    padding: 0 75px 
</style>