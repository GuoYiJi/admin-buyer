<template>
<div class="home">
  <!-- 公共头部 -->
  <div class="header-box">
    <div class="weui-search-bar" id="searchBar" v-if="false">
      <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
              <i class="weui-icon-search"></i>
              <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
              <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
          </div>
          <label class="weui-search-bar__label" id="searchText" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
              <i class="weui-icon-search"></i>
              <span>搜索</span>
          </label>
      </div>
      <a href="javascript:" class="weui-search-bar__cancel-btn" @click="">搜索</a>
    </div>

    <view class="weui-search-bar" v-show="showSearch">
        <view class="weui-search-bar__form">
            <view class="weui-search-bar__box">
                <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                <input type="text" class="weui-search-bar__input" placeholder="请搜索订单号、收货人姓名、手机号" :value="inputVal" @input="inputTyping"  />
                <view class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
                    <icon type="clear" size="14"></icon>
                </view>
            </view>
            <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
                <icon class="weui-icon-search" type="search" size="14"></icon>
                <view class="weui-search-bar__text" @click="handleSearchConfirm">搜索</view>
            </label>
        </view>
        <view class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="handleSearchConfirm">搜索</view>
    </view>
<!--     <div class="search-box" v-show="showSearch">
      <div class="input">
        <p class="search-icon"><i class="search"></i></p>
        <input class="input-box" placeholder="请搜索订单号、收货人姓名、手机号" confirm-type="search" @confirm="handleSearchConfirm" />
      </div>
    </div> -->
    <div class="nav">
      <div class="list">
        <div
            v-for="(item,idx) in navData"
            :key="idx"
            class="item"
            :class="[tag === item.id && 'active']"
            @click="handleNav(item.id, item.state)"
          >
          {{item.text}}
          <span v-if="item.count > 0">{{ item.count > 99 ? '99+' : item.count }}</span>
        </div>
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
  <div @scrolltolower="lower" @scrolltoupper="upper" v-if="tag == 1">
    <div class="white-block"></div>
    <block v-if="orderList.length">
      <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
        <orderCard :orderItem="orderItem"></orderCard>
      </div>
    </block>
    <zan-loadmore type="text" text="暂无数据" v-else />
  </div>
  <!-- 代付款 -->
  <div @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 2">
    <div class="white-block"></div>
    <block v-if="orderList.length">
      <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
        <orderCard :orderItem="orderItem"></orderCard>
      </div>
    </block>
    <zan-loadmore type="text" text="暂无数据" v-else />
  </div>
  <!-- 拼单 -->
  <div @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 3">
    <div class="white-block"></div>
    <block v-if="orderList.length">
      <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" v-if="!!orderItem.ping" :key="orderItemIndex">
        <orderCard :orderItem="orderItem" @spliceShopList="spliceShopList"></orderCard>
      </div>
    </block>
    <zan-loadmore type="text" text="暂无数据" v-else />
  </div>
  <!-- 待发货 -->
  <div @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 4">
    <div class="white-block"></div>
    <block v-if="orderList.length">
      <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
        <orderCard :orderItem="orderItem" @spliceShopList="spliceShopList"></orderCard>
      </div>
    </block>
    <zan-loadmore type="text" text="暂无数据" v-else />
  </div>
  <!-- 已发货 -->
  <div @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 5">
    <div class="white-block"></div>
    <block v-if="orderList.length">
      <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
        <orderCard :orderItem="orderItem" @spliceShopList="spliceShopList"></orderCard>
      </div>
    </block>
    <zan-loadmore type="text" text="暂无数据" v-else />
  </div>
  <!-- 已完成 -->
  <div @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 6">
    <div class="white-block"></div>
    <block v-if="orderList.length">
      <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
        <orderCard :orderItem="orderItem" @spliceShopList="spliceShopList"></orderCard>
      </div>
    </block>
    <zan-loadmore type="text" text="暂无数据" v-else />
  </div>
  <!-- 已关闭 -->
  <div @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 7">
    <div class="white-block"></div>
    <block v-if="orderList.length">
      <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
        <orderCard :orderItem="orderItem" @spliceShopList="spliceShopList"></orderCard>
      </div>
    </block>
    <zan-loadmore type="text" text="暂无数据" v-else />
  </div>
  <!-- 售后 -->
  <div @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 8">
    <div class="white-block"></div>
    <block v-if="orderList.length">
      <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
        <orderCard :orderItem="orderItem" @spliceShopList="spliceShopList"></orderCard>
      </div>
    </block>
    <zan-loadmore type="text" text="暂无数据" v-else />
  </div>
  <!-- 取消 -->
  <div @scrolltolower="lower" @scrolltoupper="upper" v-else-if="tag == 9">
    <div class="white-block"></div>
    <block v-if="orderList.length">
      
      <div class="card-body" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
        <orderCard :orderItem="orderItem" @spliceShopList="spliceShopList"></orderCard>
      </div>
    </block>
    <zan-loadmore type="text" text="暂无数据" v-else />
  </div>
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
      inputVal: '',
      inputShowed: true,
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
          text: "全部订单",
          count: 0
        },
        {
          id: 2,
          state: 1,
          text: "待付款",
          count: 0
        },
        {
          id: 3,
          state: 9,
          text: "拼单中",
          count: 0
        },
        {
          id: 4,
          state: 5,
          text: "待发货",
          count: 0
        },
        {
          id: 5,
          state: 6,
          text: "已发货",
          count: 0
        },
        {
          id: 6,
          state: 7,
          text: "已完成",
          count: 0
        },
        {
          id: 7,
          state: 8,
          text: "已关闭",
          count: 0
        },
        {
          id: 8,
          text: "售后",
          count: 0
        },
        {
          id: 9,
          state: 2,
          text: "已取消",
          count: 0
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

    showInput: function () {
      this.inputShowed = true;
    },
    hideInput: function () {
      this.inputVal = false;
      this.inputShowed = false;
    },
    clearInput: function () {
      this.inputVal = '';
      this.handleNav(this.tag, this.state, this.inputVal);
    },
    inputTyping: function (e) {
      this.inputVal = e.mp.detail.value;
    },
    handleSearchConfirm(e) {
      this.handleNav(this.tag, this.state, this.inputVal);
    },
    // 删除shopList下标
    spliceShopList() {
      console.log("父组件事件触发");
      this.handleNav(this.tag, this.state)
      // let newShopList = this.shopList
      // newShopList.forEach((item, index, shopList) => {
      //   if(item.id === id) {
      //     console.log(index);
      //     this.shopList.splice(index, 1)
      //   }
      // })
      // this.shopList.splice()
    },
    // 切换订单状态查询列表
    handleNav(tag, state = 0, keyword) {
      this.showSearch = true
      this.tag = tag;
      this.state = state
      this.pageNumber = 1
      this.orderList = []
      // 查询全部订单
      if (this.tag === 1) {
        console.log("查询了全部订单");
        this.$API.L_selectOrderPage({
          keyword,
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
        this.orderList = response.data.list
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
        state: this.state
      })
    },
    // 上拉刷新
    upper(e) {
      this.showSearch = true
    },
    // 下拉加载
    lower(e, hasLoading = true) {
      return new Promise((resolve, reject) => {
        // this.showSearch = false
        this.pageNumber++
        if (!this.canLoad) {
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none',
            duration: 1500
          })
          return
        }
        if (hasLoading) {
          console.log('加载中')
          wx.showLoading({
            title: '加载中',
          })
        }
        // const vm = this;
        if (this.tag === 1) {
          this.$API.L_selectOrderPage({
            pageNumber: this.pageNumber,
            pageSize: 10,
            orderType: this.orderType,
          })
            .then(response => {
              this.orderList = this.orderList.concat(response.data.list);
              if (this.orderList.length === response.data.totalRow) {
                this.canLoad = false
              }
              hasLoading && wx.hideLoading()
              resolve();
            })
            .catch(err => {
              reject();
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
            hasLoading && wx.hideLoading()
            resolve();
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
            hasLoading && wx.hideLoading()
            resolve();
          })
        }
      })
    },
    toRoute(path) {
      this.$router.push("/pages/home/" + path);
    },
  },
  onPullDownRefresh() {

    this.pageNumber = 0;
    this.orderList = [];
    this.canLoad = true;
    this.lower(null, false)
      .finally(() => {
        wx.stopPullDownRefresh();
      });
  },
  onReachBottom() {
    this.lower();
  },
  async onShow() {
    try {
      this.navData.forEach((tab, index) => {
        let promise;
        if (tab.id === 8) {
          promise = this.$API.L_selectOrderRefund;
        } else {
          promise = this.$API.L_selectOrderPage;
        }
        promise({ pageNumber: 1, pageSize: 1, state: tab.state })
          .then(res => {
            this.$set(this.navData[index], 'count', res.data.totalRow)
          })
      })
      // const prePayment = await this.$API.L_selectOrderPage({ isPing: 0, state: 1 })
      // const delivery = await this.$API.L_selectOrderPage({ isPing: 0, state: 5 })
      // const receive = await this.$API.L_selectOrderPage({ isPing: 0, state: 6 })
      // const successCount = await this.$API.L_selectOrderPage({ isPing: 0, state: 7 })
      // try {

      //   this.$API.afterService({ pageSize: 10, pageNumber: 1 })
      //     .then(res => {
      //       const { data: { totalRow } } = res;
      //       this.refund = totalRow;
      //     })
      // } catch (err) {
      //   console.log(err)
      // }
      
      // // 获取待收货，待发货，待付款订单的个数
      // this.prePayment = prePayment.data.totalRow
      // this.delivery = delivery.data.totalRow
      // this.receive = receive.data.totalRow
      // this.successCount = successCount.data.totalRow
    } catch (err) {
      console.log('err', err)
    }
  },
  mounted() {
    this.$API.selectWarehouse({
      orderId: this.orderID,
    }).then(response => {
      wx.setStorageSync('dpName', response.data.companyName)
      wx.setStorageSync('isPersonal', response.data.isPersonal)
    })
    this.handleNav(this.tag, this.state)
  },
  onUnload() {
    Object.assign(this, this.$options.data());
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
    font-size: 26px
    color: #000
    background: #f5f5f5
    overflow-x: auto
    position: relative
    display: flex
    align-items: center
    .item
      position: relative;
      flex: 0 0 20%
      box-sizing: border-box
      height: 80px
      line-height: 80px
      span
        position: absolute;
        right: -8px;
        top: 0;
        z-index: 100;
        min-width: 40px;
        padding: 0 10px;
        background-color: #f5222d;
        color: #fff;
        font-size: 20px;
        line-height: 40px;
        white-space: nowrap;
        box-sizing: border-box;
        border-radius: 20px;

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
