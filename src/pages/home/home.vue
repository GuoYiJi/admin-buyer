<template>
  <div class="home">
    <div class="top">
      <p>今日收款金额（元）</p>
      <p class="t_money">{{statistics.todayIncome}}</p>
      <div class="sale-box">
        <div class="s_item p-left">
          <p>今日销售件数</p>
          <p class="num">{{statistics.todaySales}}</p>
        </div>
        <div class="s_item p-left">
          <p>今日上新件数</p>
          <p class="num">{{statistics.todayNews}}</p>
        </div>
        <div class="s_item">
          <p>待发货件数</p>
          <p class="num">{{statistics.todayToSend}}</p>
        </div>
      </div>
    </div>
    <div class="nav_box">
      <a href="/pages/home/storeMgr/storeMgr" class="n_item">
        <i class="n_icon n_h1"></i>
        <p>店铺管理</p>
      </a>
      <a href="/pages/home/shopMgr/shopMgr" class="n_item">
        <i class="n_icon n_h2"></i>
        <p>商品管理</p>
      </a>
      <div class="n_item" @click="toRoute('home/orderMgr/orderMgr')">
        <i class="n_icon n_h3"></i>
        <p>订单管理</p>
      </div>
      <div class="n_item" @click="toRoute('home/marketingMgt/marketingMgt')">
        <i class="n_icon n_h4"></i>
        <p>营销管理</p>
      </div>
      <div class="n_item" @click="toRoute('home/addShop/editShop')">
        <i class="n_icon n_h5"></i>
        <p>添加商品</p>
      </div>
      <div class="n_item" @click="toRoute('home/allData')">
        <i class="n_icon n_h7"></i>
        <p>数据统计</p>
      </div>
      <div class="n_item" @click="toRoute('users/index')">
        <i class="n_icon n_h8"></i>
        <p>权限管理</p>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import mixin from "@/mixin";
export default {
  mixins: [mixin],
  components: {},
  data() {
    return {
      nav: 1,
      statistics: ""
    };
  },
  methods: {
    getStatistics() {
      this.$API.statistics({}).then(response => {
        this.statistics = response.data
      })
    }
  },
  // mounted() {
  //   this.getStatistics()
  // },
  onShow() {
    // console.log("我执行了");
    this.getStatistics()
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  width: 100%
  height: 100%
  overflow: hidden
  background-color: #ffffff
.nav_box
  display: flex
  flex-wrap: wrap
  text-align: center
  margin-top: 60px
  .n_item
    width: 33.3%
    font-size: 28px
    margin-bottom: 100px
    p
      color: #333333
    .n_icon
      +icon(82px)
      height: 74px
      margin-bottom: 28px
    .n_h1
      +bg-img('home/h1.png')
    .n_h2
      +bg-img('home/h2.png')
      width: 74px
    .n_h3
      +bg-img('home/h3.png')
      width: 66px
    .n_h4
      +bg-img('home/h4.png')
    .n_h5
      +bg-img('home/h5.png')
    .n_h6
      +bg-img('home/h6.png')
    .n_h7
      +bg-img('home/h7.png')
      width: 104px
    .n_h8
      +bg-img('home/h8.jpg')

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
