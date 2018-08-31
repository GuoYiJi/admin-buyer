<template>
  <div class="nav">
    <div class="list" v-for="(item,idx) in passRefund" :key="idx">
      <div class="kuang clearfix">
        <div class="title">
          <text class="name">订单编号：{{item.orderNo}}</text>
          <text class="fuKuan">通过</text>
        </div>
        <div class="img">
          <img class="sPimg" :src="item.image" />
          <i class="icon"></i>
        </div>
        <div class="message">
          <div class="message_1">
            <p class="text_1">共{{item.skuSize}}个款，合计{{item.countGoodsNum}}件</p>
            <p class="text_2">订单金额：</p>
            <p class="text_3">{{item.price}}元</p>
          </div>
          <p class="name" v-for="(itemxx,idxx) in item.accountAddress" :key="idxx">收货人:{{itemxx.name}} {{itemxx.mobile}}</p>
        </div>
        <div class="btn">
          <span class="details" @click="details">查看详情</span>
          <!-- <span class="confirm" v-if="(shuoo == 0)">确认收货</span> -->
          <!-- <span class="close">关闭订单</span> -->
        </div>
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
            shuoo: 0,
            navData: []
        };
    },
    methods: {
      details(){
        this.$router.push('obligations/collect')
      }
    },
    props: {
      passRefund: {
        type: Array,
        default: []
      }
    },
    mounted() {
        // this.shuoLiang();
    }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
page 
  background: #f5f5f5
.clearfix:after
  content: ""
  display: block
  clear: both
.kuang
  width: 702px
  height: 496px
  background: #fff
  margin: 0 24px 20px
  border-radius: 8px
  .title
    height: 68px
    width: 100%
    border-bottom: 1px solid #f3f3f3
    display: flex
    line-height: 68px
    font-size: 26px
    .name
     flex: 5
     padding-left: 20px
    .fuKuan
     flex: 1
  .img
    height: 200px
    // display: inline-block
    display: flex
    border-bottom: 1px solid #f3f3f3
    padding-left: 10px
    .sPimg
      width: 160px
      height: 160px
      margin: 20px 10px
    .icon
     +bg-img('home/shanJiao.png')
     margin: 86px 0 0 126px
     width: 16px
     height: 29px
  .message
    height: 105px
    font-size: 24px
    // display: inline-block
    border-bottom: 1px solid #f3f3f3
    padding: 10px 20px 0
    .message_1
      display: flex
    .text_1
      flex: 1
      padding-top: 2px
    .text_2
      padding-top: 2px
    .text_3
      font-size: 28px
      color: #FF0000
    .name
      padding-top: 10px
  .btn
    position: relative
    font-size: 24px
    display: flex
    float: right
    .details
      width: 130px
      height: 60px
      border-radius: 8px
      background: #F67C2F
      color: #fff
      line-height: 60px
      text-align: center
      margin: 20px 0 0 20px
    .confirm
      width: 130px
      height: 60px
      border-radius: 8px
      background: #F67C2F
      color: #fff
      line-height: 60px
      text-align: center
      margin: 20px 0 0 20px
    .close
      width: 128px
      height: 58px
      border-radius: 8px
      border: 1px solid #999
      color: #999
      line-height: 60px
      text-align: center
      margin: 20px
    
</style>
