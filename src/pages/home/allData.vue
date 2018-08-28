<template>
  <div class="home">
    <!-- <div class="top">
      <p>今日收款金额（元）</p>
      <p class="t_money">12.00</p>
      <div class="sale-box">
        <div class="s_item p-left">
          <p>今日销售件数</p>
          <p class="num">12</p>
        </div>
        <div class="s_item p-left">
          <p>今日上新件数</p>
          <p class="num">12</p>
        </div>
        <div class="s_item">
          <p>待发货件数</p>
          <p class="num">12</p>
        </div>
      </div>
    </div> -->
    <div class="form_box">
      <p class="title c_orange">用户</p>
      <div class="content">
        <div class="box">
          <p class="name">用户总数</p>
          <p class="number">1234</p>
        </div>
        <div class="box">
          <p class="name">昨日新增用户</p>
          <p class="number">1234</p>
        </div>
        <div class="box">
          <p class="name"></p>
          <p class="number"></p>
        </div>
        <div class="box">
          <p class="name"></p>
          <p class="number"></p>
        </div>
      </div>
    </div>
    <div class="form_box">
      <p class="title c_yellow">订单</p>
      <div class="content">
        <div class="box">
          <p class="name">已付款订单数</p>
          <p class="number">1234</p>
        </div>
        <div class="box">
          <p class="name">待发货件数</p>
          <p class="number">1234</p>
        </div>
        <div class="box">
          <p class="name">已发货件数</p>
          <p class="number"></p>
        </div>
        <div class="box">
          <p class="name">昨日新增件数</p>
          <p class="number"></p>
        </div>
      </div>
    </div>
    <div class="form_box">
      <p class="title c_red">交易额</p>
      <div class="content">
        <div class="box">
          <p class="name">交易总额</p>
          <p class="number">1234</p>
        </div>
        <div class="box">
          <p class="name">昨日收款</p>
          <p class="number">1234</p>
        </div>
        <div class="box">
          <p class="name">总退款</p>
          <p class="number"></p>
        </div>
        <div class="box">
          <p class="name">昨日退款</p>
          <p class="number"></p>
        </div>
      </div>
    </div>
    <div class="form_box">
      <p class="title c_grey">商品</p>
      <div class="content">
        <div class="box">
          <p class="name">商品总数</p>
          <p class="number">1234</p>
        </div>
        <div class="box">
          <p class="name">在线商品数</p>
          <p class="number">1234</p>
        </div>
        <div class="box">
          <p class="name">昨日新增商品</p>
          <p class="number"></p>
        </div>
        <div class="box">
          <p class="name"></p>
          <p class="number"></p>
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
    return {};
  },
  methods: {
 
  },
   async mounted() {

   }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.c_orange
  background: #F5B550
.c_yellow
  background: #F2CF35
.c_red
  background: #FF783E
.c_grey
  background: #A2A2A2
.form_box
  padding: 20px
  text-align: center
  font-size: 28px
  line-height: 80px
  .title
    height: 80px 
    color: #fff
  .content
    display: flex
    background: #fff
    .box
      flex: 1
      p
        height: 80px
        +border(1px,all, #ccc)
.sale-box
  display: flex
  height: 120px
  .s_item
    flex: 1
    font-size: 28px
    .num
      font-size: 35px
      padding-top: 15px
  .p-left
    +border(1px,right,#fff)
.top
  text-align: center
  color: #fff
  background: #FA8134
  padding-top: 40px
  padding-bottom: 20px
  .t_money
    font-size: 60px
    padding-bottom: 50px 
</style>