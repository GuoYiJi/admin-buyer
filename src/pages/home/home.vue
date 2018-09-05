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
      <div class="n_item" @click="toRoute('home/addShop/addShop')">
        <i class="n_icon n_h5"></i>
        <p>添加商品</p>
      </div>
      <div class="n_item" @click="toRoute('home/buyIn/buyIn')">
        <i class="n_icon n_h6"></i>
        <p>采购入库</p>
      </div>
      <div class="n_item" @click="toRoute('home/allData')">
        <i class="n_icon n_h7"></i>
        <p>数据统计</p>
      </div>
    </div>
    <div class="footer">
      <div class="f_item" :class="[ nav == 1 && 'active' ]" @click="toRoute('home/home')">
        <i class="f_icon f_store"></i>
        <p>店铺</p>
      </div>
      <div class="f_item" :class="[ nav == 2 && 'active' ]" @click="toRoute('my/my')">
        <i class="f_icon f_my"></i>
        <p>我的</p>
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
    // selectNav(num){
    //   this.nav = num
    // }
  },
  created() {
  },
  async mounted() {
    const statistics = await this.$API.statistics({});
    console.log(statistics);
    this.statistics = statistics.data;
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.footer
  position: absolute
  left: 0
  right: 0
  bottom: 0
  display: flex
  font-size: 22px
  text-align: center
  +border(1px,top,#ccc)
  height: 100px
  background: #fff
  .f_item
    flex: 1
    .f_icon
      +icon(44px)
      margin-bottom: 2px
      margin-top: 13px
    .f_store
      +bg-img('home/store1.png')
    .f_my
      +bg-img('home/my1.png')
  .active
    background: #F3792C
    color: #fff
    .f_store
      +bg-img('home/store11.png')
    .f_my
      +bg-img('home/my11.png')
.nav_box
  display: flex
  flex-wrap: wrap
  text-align: center
  padding-top: 60px
  .n_item
    width: 33.3%
    font-size: 28px
    margin-bottom: 100px
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
