<template>
<div class="wrapper">
  <div class="isHasLogistics" v-if="isHasLogistics">
    <div class="header">
      <span>物流公司: </span>
      <span>{{
        logistics.type === 1 ? '顺丰速运'
        : logistics.type === 2 ? '邮政EMS'
        : logistics.type === 3 ? '圆通快递'
        : logistics.type === 4 ? '申通快递'
        : logistics.type === 5 ? '韵达快递'
        : logistics.type === 6 ? '百世汇通'
        : logistics.type === 7 ? '中通快递'
        : logistics.type === 8 ? '天天快递'
        : logistics.type === 9 ? '优速物流'
        : '未知物流'
      }}</span>
    </div>
    <div class="logisticsNo">
      <span>快递单号: </span>
      <span>{{logistics.logisticsNo}}</span>
    </div>
    <div class="body">
      <!-- <i class="logistics-img" v-for="(item, index) in logisticsImg" :key="index" :style="{backgroundImage: 'url(' + item + ')'}"></i> -->
      <image v-for="(item, index) in logisticsImg" :key="index" :src="item" width="100%" />
    </div>
  </div>
  <div class="noHasLogistics" v-else>
    无物流状态
  </div>
</div>
</template>
<script>
import wx from "wx";
export default {
  data: {
    isHasLogistics: false, // 是否是无物流信息
    orderId: '', // 订单Id
    logistics: {}, // 物流信息
    logisticsImg: []
  },
  computed: {

  },
  methods: {

  },
  mounted() {
    this.logistics = {}
    this.isHasLogistics = false
    this.logisticsImg = []
    this.orderId = ''
    if (this.$route.query.orderId) {
      console.log("请求了售后订单详情");
      this.orderId = this.$route.query.orderId
      this.$API.L_selectOrderDetail({
        orderId: this.orderId
      }).then(response => {
        if(response.data.logistics) {
          this.logistics = response.data.logistics
          this.isHasLogistics = true
        }
        if(response.data.logistics.image) {
          this.logisticsImg = response.data.logistics.image.split(',')
        }
      })
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.wrapper
  width: 100%
  font-size: 30px
  text-align: left
  // display: flex
  // flex-wrap: wrap
  .isHasLogistics
    width: 100%
    .header
      // width: 100%
      margin-top: 20px
      padding: 40px 24px
      background-color: #ffffff
      +singleFile
      display: flex
      justify-content: space-between
    .logisticsNo
      // width: 100%
      margin-top: 10px
      padding: 40px 24px
      background-color: #ffffff
      +singleFile
      display: flex
      justify-content: space-between
    .body
      // width: 100%
      margin-top: 10px
      padding: 55px 65px
      background-color: #ffffff
      image
        margin-bottom: 20px
      // i.logistics-img
      //   display: inline-block
      //   width: 100%
      //   background-image:
  .noHasLogistics
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    color: #000000
    background-color: #ffffff
    font-size: 28px
</style>
