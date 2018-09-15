<template>
  <div class="home">
    <div class="search-box" >
      <div class="input">
        <p class="search-icon"><i class="search"></i></p>
        <p class="input-box" @click="toRoute('shopMgr/searchOrder')">请搜索订单号、收货人姓名、手机号</p>
      </div>
    </div>
    <div class="nav">
      <div class="list">
        <span
          v-for="(item,idx) in navData"
          :key="idx"
          class="item"
          :class="[tag === item.id && 'active']"
          @click="handleNav(item.id)"
        >{{item.text}}</span>
        <div class="line" :style="{left: (tag-1)*20 + '%'}"></div>
      </div>
    </div>
    <!-- <scroll-view scroll-y lower-threshold='80' style="height: 80%;" @scrolltolower="lower"  > -->
    <div class="content">
      <div v-if="tag == 1">
        <orderMgr />
      </div>
      <!-- 代付款 -->
      <div v-else-if="tag == 2">
        <orderOnPaly />
      </div>
      <!-- 拼单 -->
      <div v-else-if="tag == 3">
        <orderIsPin />
      </div>
      <!-- 待发货  维修改  -->
      <div v-else-if="tag == 4">
        <!-- <orderNoGoods :noGoods='noGoods'/> -->
        <delivered />
      </div>
      <!-- 已发货 -->
      <div v-else-if="tag == 5">
        <orderYesGoods />
      </div>
      <!-- 已完成 -->
      <div v-else-if="tag == 6">
        <orderYesGod />
      </div>
      <!-- 已关闭 -->
      <div v-else-if="tag == 7">
        <closeOrder />
      </div>
      <!-- 售后 -->
      <div v-else-if="tag == 8">
        <orderRefund />
      </div>
      <!-- 取消 -->
      <div v-else-if="tag == 9">
        <orderOff />
      </div>
    </div>
    <!-- <div class="loading" v-if="canLoad">
      <div v-if="showLoad"><loading  /></div>
    </div> -->
    <!-- </scroll-view> -->
  </div>
</template>
<script>
import wx from "wx";
import orderMgr from "@/components/o_orderMgr";
import delivered from "@/components/o_delivered";
// import loading from "@/commond/loading";
import orderOnPaly from "@/components/L_orderOnPaly";
import orderIsPin from "@/components/L_orderIsPin";
import orderNoGoods from "@/components/L_orderNoGoods";
import orderYesGoods from "@/components/L_orderYesGoods";
import orderYesGod from "@/components/L_orderYesGod";
import closeOrder from "@/components/L_orderClose";
import orderRefund from "@/components/L_orderRefund";
import orderOff from "@/components/L_orderOff";
//orderYesGod
export default {
  components: {
    orderMgr,
    delivered,
    // loading,
    orderOnPaly,
    orderIsPin,
    orderNoGoods,
    orderYesGoods,
    orderYesGod,
    closeOrder,
    orderRefund,
    orderOff
  },
  data() {
    return {
      tag: 1,
      // orderId: '0',
      navData: [
        {
          id: 1,
          orderId: '',
          text: "全部订单"
        },
        {
          id: 2,
          orderId: 1,
          text: "待付款"
        },
        {
          id: 3,
          orderId: 9,
          text: "拼单中"
        },
        {
          id: 4,
          orderId: 5,
          text: "待发货"
        },
        {
          id: 5,
          orderId: 6,
          text: "已发货"
        },
        {
          id: 6,
          orderId: 7,
          text: "已完成"
        },
        {
          id: 7,
          orderId: 8,
          text: "已关闭"
        },
        {
          id: 8,
          text: "售后"
        },
        {
          id: 9,
          text: "已取消"
        },
      ],
      shopNum: 0,
      showLoad: false,
      canLoad: true,
      shopList: [],
      groupOrder: [],
      noPlay: [],
      noOrder: [],
      yesPlay: [],
      noPlays: [],
      noGoods: [],
      yesGoods: [],
      yesGod: [],
      closeOrder: [],
      isPin: [],
      shopListRefund: [],
      layerList: [],
      orderType: 1,
      WarehouseData: []
    };
  },
  methods: {
    async handleNav(tag) {
      // console.log(tag)
      this.tag = tag;
    },
    toRoute(path) {
      this.$router.push("/pages/home/" + path);
     },

  },
  async mounted() {
    const selectWarehouseData = await this.$API.selectWarehouse({
      orderId: this.orderID,
    });
    this.WarehouseData = selectWarehouseData.data
    this.dpName = this.WarehouseData.companyName
    console.log(this.dpName)
    wx.setStorageSync('dpName', this.dpName)
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.content
  // height: 60%
.home
  height: 100%
.search-box
  padding: 30px 0
  background: #fff
  .input
    display: flex
    padding: 0px 35px
    p
      width: 10%
      .search
        +bg-img('home/search.png')
        +icon(38px)
        margin-top: 7px
    .search-icon
      position: absolute
      left: 60px
    .input-box
      background-color: #f5f5f5
      border-radius: 4px
      width: 100%
      text-align: left
      padding: 8px 85px
      border: none
      color: #999999

.active
  color: #F67C2F
  // font-weight: 600
.nav
  overflow: hidden
  text-align: center
  background: #f5f5f5
  height: 70px
  width: 100%
  padding-top: 1px;/*no*/
  box-shadow: 0px 4px 6px 0px rgba(0, 69, 162, 0.06);/*no*/
  .list
    font-size: 26px
    color: #000
    background: #f5f5f5
    overflow-y: hidden
    overflow-x: auto
    height: 90px
    position: relative
    display: flex
    width: 100%
    .item
      flex: 0 0 20%
      line-height: 70px
      box-sizing: border-box
.line
  display: block
  height: 1px;/*no*/
  width: 8%
  border-radius: 8px
  background-color: #F67C2F
  position: absolute
  bottom: 23px
  margin: 0 6%
  transition: left .3s ease-in

</style>
