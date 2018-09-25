<template>
<div class="home">
  <!-- 公共头部 -->
  <div class="header-box">
    <div class="search-box" v-show="showSearch">
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
            @click="handleNav(item.id, item.state)"
          >
          {{item.text}}
        </span>
        <div class="line" :style="{left: (tag-1)*20 + '%'}"></div>
      </div>
      <ul class="top-nav">
        <li :class="[nav === 1 && 'nav-active']" @click="handleTag(1)">综合</li>
        <li :class="[nav === 2 && 'nav-active']" @click="handleTag(2)">收货人
          <div class="sort-box">
            <i class="sort-top" :class="[orderType == 3 && 'sort-active']"></i>
            <i class="sort-bottom" :class="[orderType == 4 && 'sort-active']"></i>
          </div>
        </li>
        <li :class="[nav === 5 && 'nav-active']" @click="handleTag(5)">订单金额
          <div class="sort-box">
            <i class="sort-top" :class="[orderType == 5 && 'sort-active']"></i>
            <i class="sort-bottom" :class="[orderType == 6 && 'sort-active']"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- 全部订单 -->
  <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower" @scrolltoupper="upper" v-if="tag == 1">
    <div class="white-block"></div>
    <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </scroll-view>
  <!-- 代付款 -->
  <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 2">
    <div class="white-block"></div>
    <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </scroll-view>
  <!-- 拼单 -->
  <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 3">
    <div class="white-block"></div>
    <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </scroll-view>
  <!-- 待发货  维修改  -->
  <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 4">
    <div class="white-block"></div>
    <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </scroll-view>
  <!-- 已发货 -->
  <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 5">
    <div class="white-block"></div>
    <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </scroll-view>
  <!-- 已完成 -->
  <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 6">
    <div class="white-block"></div>
    <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </scroll-view>
  <!-- 已关闭 -->
  <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 7">
    <div class="white-block"></div>
    <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </scroll-view>
  <!-- 售后 -->
  <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 8">
    <div class="white-block"></div>
    <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </scroll-view>
  <!-- 取消 -->
  <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 9">
    <div class="white-block"></div>
    <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </scroll-view>
</div>
</template>
<script>
import wx from "wx";
import orderCard from "@/components/s_orderCard"
// import orderMgr from "@/components/o_orderMgr";
// import delivered from "@/components/o_delivered";
// // import loading from "@/commond/loading";
// import orderOnPaly from "@/components/L_orderOnPaly";
// import orderIsPin from "@/components/L_orderIsPin";
// import orderNoGoods from "@/components/L_orderNoGoods";
// import orderYesGoods from "@/components/L_orderYesGoods";
// import orderYesGod from "@/components/L_orderYesGod";
// import closeOrder from "@/components/L_orderClose";
// import orderRefund from "@/components/L_orderRefund";
// import orderOff from "@/components/L_orderOff";
//orderYesGod
export default {
  components: {
    orderCard
    // orderMgr,
    // delivered,
    // // loading,
    // orderOnPaly,
    // orderIsPin,
    // orderNoGoods,
    // orderYesGoods,
    // orderYesGod,
    // closeOrder,
    // orderRefund,
    // orderOff
  },
  data() {
    return {
      tag: 1, // tag栏, 订单状态
      nav: 1, // 排序栏, 排序方式
      orderList: [], // 请求的订单列表List
      asceSale: false,
      ascePrice: false,
      asceIndex: 1,
      orderType: 1, // 排序方式, 1,2-时间, 3,4-拼音, 5,6-价格
      pageNumber: 1, // 页码
      pageSize: 10, // 每页显示的数量
      canLoad: true, // 可否继续操作
      showSearch: true, //搜索框显示
      state: 0, //查询相应状态订单,
      isPersonal: 0, //小程序主体身份, 0-个人, 1-企业
      // scrollTop: 1, //滚动条位置
      navData: [{
          id: 1,
          state: '',
          text: "全部订单"
        },
        {
          id: 2,
          state: 1,
          text: "待付款"
        },
        {
          id: 3,
          state: 9,
          text: "拼单中"
        },
        {
          id: 4,
          state: 5,
          text: "待发货"
        },
        {
          id: 5,
          state: 6,
          text: "已发货"
        },
        {
          id: 6,
          state: 7,
          text: "已完成"
        },
        {
          id: 7,
          state: 8,
          text: "已关闭"
        },
        {
          id: 8,
          text: "售后"
        },
        {
          id: 9,
          state: 2,
          text: "已取消"
        },
      ],
    };
  },
  watch: {
    // orderList(currentVal, oldVal) {
    //   console.log(currentVal, oldVal);
    //   // this.orderList = currentVal
    // },
    // asceSale(currentVal, oldVal) {
    //   console.log('联系人排序:', currentVal, oldVal);
    //   this.asceSale = currentVal
    // },
    // ascePrice(currentVal, oldVal) {
    //   console.log('订单金额排序:', currentVal, oldVal);
    //   this.ascePrice = currentVal
    // },
    // orderType(currentVal, oldVal) {
    //   console.log(currentVal, oldVal);
    //   this.orderType = currentVal
    // },
    // deep:true
  },
  methods: {
    // 初始化滚动条位置
    // initScrollTop() {
    //   this.scrollTop = 1
    // },
    // 切换订单状态查询列表
    handleNav(tag, state = 0) {
      this.showSearch = true
      this.tag = tag;
      this.state = state
      this.pageNumber = 1
      this.orderList = []
      // 查询全部订单
      if (this.tag === 1) {
        console.log("查询了全部订单");
        this.$API.L_selectOrderPage({
          orderType: 1, //默认综合排序
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }).then(response => {
          this.orderList = response.data.list
          // this.initScrollTop()
        })
        return
      }
      // 查询售后订单
      if (this.tag === 8) {
        console.log("查询了售后订单");
        this.$API.L_selectOrderRefund({
          pageNumber: this.pageNumber,
          pageSize: 10,
          orderType: 1
        }).then(response => {
          console.log(response);
          this.orderList = response.data.list
          console.log(this.orderList);
          // this.initScrollTop()
        })
        return
      }
      // 查询相应的状态订单列表
      if (this.tag !== 1 && this.tag !== 8) {
        console.log("查询了相应状态订单");
        this.$API.L_selectOrderPage({
          state: this.state,
          orderType: 1, //默认综合排序
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }).then(response => {
          this.orderList = response.data.list
          // this.initScrollTop()
        })
        return
      }
    },
    // 按照排序方式查询列表
    handleTag(orderType) {
      this.nav = orderType
      this.showSearch = true
      this.orderList = []
      this.pageNumber = 1
      if (orderType === 1) {
        this.orderType = 1;
      } else if (orderType == 2) {
        this.asceSale = !this.asceSale
        this.orderType = this.asceSale ? 3 : 4
      } else if (orderType === 5) {
        this.ascePrice = !this.ascePrice
        this.orderType = this.ascePrice ? 6 : 5
      }
      this.getResponse().then(response => {
        // this.orderList = response.data.list
        // this.orderList = response.data.list
        // this.$set(this._data, 'orderList', response.data.list)
        // console.log(this.orderList);
        if (response.data.list.length < response.pageSize) {
          this.canLoad = false
        }
      })
    },
    getResponse() {
      return this.$API.L_selectOrderPage({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        orderType: this.orderType,
      })
    },
    // 上拉刷新
    upper(e) {
      console.log("上拉触顶:", e);
      this.showSearch = true
    },
    // 下拉加载
    lower(e) {
      console.log("下拉触底:", e);
      this.showSearch = false
      this.pageNumber++
      if (!this.canLoad) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none',
          duration: 1500
        })
        return
      }
      wx.showLoading({
        title: '加载中',
      })
      // const vm = this;
      if (this.tag === 1) {
        this.$API.L_selectOrderPage({
          pageNumber: this.pageNumber,
          pageSize: 10,
          orderType: this.orderType,
        }).then(response => {
          this.orderList = this.orderList.concat(response.data.list);
          if (this.orderList.length === response.data.totalRow) {
            this.canLoad = false
          }
          wx.hideLoading()
        })
      } else if (this.tag === 8) {
        this.$API.L_selectOrderRefund({
          pageNumber: this.pageNumber,
          pageSize: 10,
          orderType: this.orderType,
        }).then(response => {
          this.orderList = this.orderList.concat(response.data.list);
          if (this.orderList.length === response.data.totalRow) {
            this.canLoad = false
          }
          wx.hideLoading()
        })
      } else {
        this.$API.L_selectOrderPage({
          state: this.state,
          orderType: this.orderType, //默认综合排序
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }).then(response => {
          this.orderList = this.orderList.concat(response.data.list);
          if (this.orderList.length === response.data.totalRow) {
            this.canLoad = false
          }
          wx.hideLoading()
        })
      }
    },
    toRoute(path) {
      this.$router.push("/pages/home/" + path);
    },
  },
  mounted() {
    this.$API.selectWarehouse({
      orderId: this.orderID,
    }).then(response => {
      wx.setStorageSync('dpName', response.data.companyName)
      wx.setStorageSync('isPersonal', response.data.isPersonal)
    })
  },
  onShow() {
    console.log("onShow 执行");
    this.handleNav(this.tag, this.state)
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.white-block
  width: 100%
  height: 300px
.card-body
  background-color: #ffffff
  border-radius: 6px
  display: flex
  flex-wrap: wrap
  margin: 15px 24px 30px
  box-shadow: 0 2px 4px 4px rgba(192,192,192, 0.3)
.active
  color: #F67C2F
  // font-weight: 600
.home
  height: 100%
  .header-box
    width: 100%
    position: fixed
    top: 0
    left: 0
    z-index: 6
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

  .sort-select
    height: 100%
  .nav
    text-align: center
    background: #f5f5f5
    width: 100%
    padding-top: 1px;/*no*/
    box-shadow: 0px 4px 6px 0px rgba(0, 69, 162, 0.06);/*no*/
    ul.top-nav
      width: 100%
      background: #fff
      text-align: center
      display: flex
      font-size: 26px
      height: 92px
      line-height: 92px
      color: #333333
      li
        flex: 1
        .sort-box
          display: inline
          position: relative
          padding-left: 10px
          .sort-bottom
            +goback(1px)
            position: absolute
            top: -23px
            &:after
              transform: rotate(-45deg)
              border-color: #999
          .sort-top
            +goback(1px)
            position: absolute
            bottom: -23px
            &:after
              transform: rotate(-225deg)
              border-color: #999
      .sort-active
        &:after
          border-color: #EE7527!important
      .nav-active
        color: #EE7527!important
  .list
    width: 100%
    height: 80px
    font-size: 26px
    color: #000
    background: #f5f5f5
    overflow-x: auto
    position: relative
    display: flex
    align-items: center
    .item
      flex: 0 0 20%
      box-sizing: border-box
  .line
    display: block
    height: 4px;/*no*/
    width: 10%
    // border-radius: 8px
    background-color: #F67C2F
    position: absolute
    bottom: 0px
    margin: 0 5%
    transition: left .3s ease-in

</style>
