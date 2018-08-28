<template>
  <div class="home">
    <div class="search-box" >
      <div class="input">
        <p class="search-icon"><i class="search"></i></p>
        <p class="input-box" @click="toRoute('shopMgr/search')">请搜索订单号、收货人姓名、手机号</p>  
      </div>
    </div>
    <div class="content">
      <div class="sort-select">
        <div class="top-nav">
          <ul >
            <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">综合</li>
            <li :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">档口
              <div class="sort-box">
                <i class="sort-top" :class="asceSaleDK && 'sort-active'"></i>
                <i :class="!asceSaleDK && 'sort-active'" class="sort-bottom"></i>
              </div>
            </li>
            <li :class="[tag === 3 && 'nav-active']" @click="handleTag(3)">收货人
              <div class="sort-box">
                <i class="sort-top" :class="asceSaleName && 'sort-active'"></i>
                <i :class="!asceSaleName && 'sort-active'" class="sort-bottom"></i>
              </div>
            </li>
            <li :class="[tag === 4 && 'nav-active']" @click="handleTag(4)">销量
              <div class="sort-box">
                <i class="sort-top" :class="ascePriceOd && 'sort-active'"></i>
                <i :class="!ascePriceOd  && 'sort-active'" class="sort-bottom"></i>
              </div>
            </li>
            <li :class="[tag === 5 && 'nav-active']" @click="handleTag(5)">货期
              <div class="sort-box">
                <i class="sort-top" :class="ascePrice && 'sort-active'"></i>
                <i :class="!ascePrice  && 'sort-active'" class="sort-bottom"></i>
              </div>
            </li>
            <li :class="[tag === 6 && 'nav-active']" @click="handleTag(6)">筛选<div class="sort-box"><i class="option-icon"></i></div></li>
          </ul>
        </div>
        <i-drawer mode="right" :visible="showRight1" @close="toggleRight1">
          <div class="demo-container">
            <div class="title">筛选</div>
            <div class="item-box">
              <div class="item">
                <p class="i_title">大厦</p>
                <ul class="s_item_box">
                  <li class="s_item">档口1</li>
                  <li class="s_item">档口2</li>
                  <li class="s_item">档口3</li>
                  <li class="s_item">档口1</li>
                  <li class="s_item">档口3</li>
                  <li class="s_item">档口1</li>
                </ul>
                <ul v-if="more1" class="s_item_box">
                  <li class="s_item">档口1</li>
                  <li class="s_item">档口2</li>
                  <li class="s_item">档口3</li>
                </ul>
                <p class="more" >
                  <span @click="toOpen('more1')" v-if="!more1">查看更多 <i class="goback"></i></span>
                  <span @click="toClose('more1')" v-else>点击收起</span>
                </p>
              </div>
              <div class="item">
                <p class="i_title">档口</p>
                <ul class="s_item_box">
                  <li class="s_item">档口1</li>
                  <li class="s_item">档口2</li>
                  <li class="s_item">档口3</li>
                  <li class="s_item">档口1</li>
                </ul>
                <p class="more">查看更多<i class="goback"></i></p>
              </div>
              <div class="item">
                <p class="i_title">货期情况</p>
                <ul class="s_item_box">
                  <li class="s_item">档口1</li>
                  <li class="s_item">档口2</li>
                  <li class="s_item">档口3</li>
                  <li class="s_item">档口1</li>
                </ul>
                <p class="more">查看更多<i class="goback"></i></p>
              </div>
              <div class="item">
                <p class="i_title">收货人</p>
                <ul class="s_item_box">
                  <li class="s_item">档口1</li>
                  <li class="s_item">档口2</li>
                  <li class="s_item">档口3</li>
                  <li class="s_item">档口1</li>
                </ul>
                <p class="more">查看更多<i class="goback"></i></p>
              </div>
              <div class="item">
                <p class="i_title">销量</p>
                <ul class="s_item_box">
                  <li class="s_item">档口1</li>
                  <li class="s_item">档口2</li>
                  <li class="s_item">档口3</li>
                  <li class="s_item">档口1</li>
                </ul>
                <p class="more">查看更多<i class="goback"></i></p>
              </div>
            </div>
            <div class="f_btn">
              <p class="reset">重置</p>
              <p class="confirm">确定</p>
            </div>
          </div>
        </i-drawer>
      <scroll-view scroll-y lower-threshold='80' style="height: 83%;" @scrolltolower="lower"  >
        <div class="scroll-box">
          <div class="box">
            <p>
              <deliveryBy :orderList="orderList"/>
            </p>
            <div class="loading" v-if="canLoad">
              <div v-if="showLoad"><loading  /></div>
            </div>
          </div>
        </div>
        
      </scroll-view>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import payment from "@/components/o_payment";
import CollageBy from "@/components/L_collageBy";
// import delivery from "@/components/o_delivery";
import deliveryBy from "@/components/L_deliverBy";
import afterSales from "@/components/o_afterSales";
import loading from "@/commond/loading";
export default {
  components: {
    payment,
    // Collage,
    // delivery,
    afterSales,
    loading,
    deliveryBy,
    CollageBy
  },
  data() {
    return {
      tag: 1,
      searchIn: false,
      asceSale: true,
      ascePrice: true,
      ascePriceOd: true,
      asceSaleName: true,
      asceSaleDK: true,
      tag: 1,
      shopNum: 0,
      showRight1: false,
      showLoad: false,
      canLoad: true,
      orderList: [],
      type: 0,
    };
  },
  methods: {
    toRoute(path) {
      this.$router.push("/pages/home/" + path);
    },
    async handleTag(tag) {
      this.tag = tag;
      var type = 0 ;
      this.shopNum = 0;
      // console.log(this.shopList)
      
      if (tag === 2) {
        //对销量sort
        this.asceSaleDK = !this.asceSaleDK;
        type = this.asceSaleDK ? 1 : 2;
      }
      if (tag === 3) {
        //对销量sort
        this.asceSaleName = !this.asceSaleName;
        type = this.asceSaleName ? 3 : 4;
      }
      if (tag === 4) {
        this.ascePriceOd = !this.ascePriceOd;
        type = this.ascePriceOd ? 5 : 6;
      }
      if (tag === 5) {
        //对销量sort
        this.ascePrice = !this.ascePrice;
        type = this.ascePrice ? 7 : 8;
      }
      this.type = type;
      console.log(type)
      if(tag === 6) {
        this.toggleRight1()
        return 
      }
      this.type = type
      const listData = await this.getNextPage({
        ob: type,
        // state: 1
      })
      this.shopList = listData.data.list
      console.log(this.shopList)
      if(listData.data.list.length < this.pageSize) {
        this.canLoad = false
      }
      
    },
    async toggleRight1 () {
      const L_OrderAddress = await this.$API.L_OrderAddress({
        orderId: this.$route.query.orderId
      });
      ///api/order/address/selectOrderAddres
      this.showRight1 = !this.showRight1
    },
    getNextPage() {
      var obj = {
        pageSize: 30,
        // orderType: 1,
        // state: this.tag
      };
      this.shopNum++;
      obj.pageNumber = this.shopNum;
      return this.$API.L_selectOrderGoods(obj);
    },
    async lower(e) {
      console.log(e);
      if (!this.canLoad) return;
      if (this.showLoad) return;
      this.showLoad = true;
      const listData = await this.getNextPage({ob: this.type});
      setTimeout(() => {
        if (listData.data.list.length < 30) {
          this.canLoad = false;
        }
        this.orderList = this.orderList.concat(listData.data.list);
        this.showLoad = false;
      }, 2000);
    }
  },
  async mounted() {
    console.log(11)
    this.shopNum = 0;
    const listData = await this.getNextPage({ob: 0});
    console.log(listData);
    this.orderList = this.orderList.concat(listData.data.list); 
    console.log(this.orderList)
  
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.option-icon
  +bg-img('shopMgr/option.png')
  +icon(32px)
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
    
.box
  padding: 2% 0 110px 0%
.scroll-box
  height: 950px
  overflow: auto
  p
    margin: 5px 0
.option-icon
  +bg-img('shopMgr/option.png')
  +icon(32px)
.sort-active
  &:after
    border-color: #EE7527!important
.nav-active
  color: #EE7527!important
.sort-select
  height: 100%
.top-nav
  background: #fff
  text-align: center
  ul 
    display: flex
    font-size: 26px
    height: 92px
    line-height: 92px
    li
      flex: 1
      // width: 50px
      .sort-box
        display: inline
        position: relative
        padding-left: 4px
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

.demo-container
	width: 568px
	height: 100vh
	background: #fff
  font-size: 28px
  box-shadow: 1px 0px 13px rgba(8,0,0,0.17)
  position: relative
.title
  padding: 8px 30px
  background: #F5F5F5
  color: #999
.more
  color: #999
  text-align: center
  position: relative
  padding: 20px 0 40px 0
  font-size: 24px
  +border(1px,bottom,#ccc)
  .goback
    +goback(1px)
    vertical-align: top
// 筛选


.item-box
  color: #333
  height: 85%
  overflow: auto
  .i_title
    padding: 30px 20px
  .s_item_box
    padding: 0 20px
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    .s_item
      width: 160px
      height: 70px
      line-height: 70px
      background: #F5F5F5
      text-align: center
      border-radius: 6px
      margin-bottom: 20px 
.f_btn
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 153px
  +border(1px,top,#ccc)
  display: flex
  justify-content: flex-end
  text-align: center
  background: #fff
  p
    width: 170px
    height: 80px
    line-height: 80px
    color: #fff
    margin-right: 30px 
    margin-top: 37px
  .confirm
    border-radius: 0px 10px 50px 0px
    background: #EE7527
  .reset
    border-radius: 10px 0px 0px 50px
    background: #ccc
</style>