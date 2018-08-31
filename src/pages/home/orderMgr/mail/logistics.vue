<template>
  <!-- 查看物流 -->
  <div class="home">
    <div class="kuang" v-show="kuang" v-if="L_sLogistics">
      <div class="head">
        <i class="h-img"></i>
        <span class="h-text">物流公司：{{L_sLogistics.type==0?'顺丰':'申通'}}</span>
      </div>
      <div class="head">
        <span class="ht-text">快递单号：{{L_sLogistics.logisticsNo}}</span>
      </div>
      <div class="img-box">
        <img class="img" :src="L_sLogistics.image">
      </div>
    </div>
    <div class="img-box" v-show="showImg" v-if="L_sLogistics">
      <img class="img" :src="L_sLogistics.image">
    </div>
    <div class="kuang" v-show="wuKuang">
      <div class="kong">
        <p class="k-text">无物流状态</p>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      kuang: false,
      wuKuang: true,
      showImg: false,
      L_sLogistics: []
    };
  },
  methods: {
    
  },
  async mounted() {
    const L_selectLogisticsData = await this.$API.L_selectLogistics({
      orderId: this.$route.query.orderId
    });
    console.log(L_selectLogisticsData)
    if(L_selectLogisticsData.code == 1 ){
      this.L_sLogistics = L_selectLogisticsData.data
      this.kuang = true
      this.wuKuang = false
    }else if(L_selectLogisticsData.data.logisticsNo == '' || L_selectLogisticsData.data.logisticsNo == null ){
      
      this.L_sLogistics = L_selectLogisticsData.data
      this.showImg = true
      this.wuKuang = false
      this.kuang = false
    }
    else{
      this.wuKuang = true
      this.kuang = false
      this.showImg = false
    }

  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  height: 90px
  line-height: 90px
  border-top: 1px solid #E5E5E5
  background: #fff
  padding-left: 30px
  .h-img
    // +bg-img('my/xq-dfh.png')
    width: 32px
    height: 26px
    display: inline-block
    vertical-align: middle
  .h-text
    padding-left: 32px
    display: inline-block
    vertical-align: middle
    color: #F67C2F
    font-size: 28px
  .ht-text
    display: inline-block
    vertical-align: middle
    color: #000
    font-size: 28px
    padding-left: 63px
.img-box
  width: 100%
  height: 443px
  margin-top: 96px
  .img
    width: 100%
    height: 443px
    dispatch: inline-block
.kong
  .k-text
    position: fixed
    top: 40%
    left: 40%
    color: #999
    font-size: 28px
</style>
