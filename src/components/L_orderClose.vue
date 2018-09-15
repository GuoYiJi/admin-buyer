
<template>
  <!-- 头部*********订单详情 -->
  <div class="home">
    <div class="sort-select">
      <div class="top-nav">
        <ul>
          <li :class="[tag === 1 && 'nav-active']"  @click="handleTag(1)">综合</li>
          <li :class="[tag === 2 && 'nav-active']"  @click="handleTag(2)">收货人
            <div class="sort-box">
              <i class="sort-top" :class="asceSale && 'sort-active'"></i>
              <i :class="!asceSale && 'sort-active'" class="sort-bottom"></i>
            </div>
          </li>
          <li :class="[tag === 5 && 'nav-active']"  @click="handleTag(5)">订单金额
            <div class="sort-box">
              <i class="sort-top" :class="ascePrice && 'sort-active'"></i>
              <i :class="!ascePrice  && 'sort-active'" class="sort-bottom"></i>
            </div>
          </li>
        </ul>
      </div>
      <scroll-view :scroll-y="true"  style="height: 100vh;" @scrolltolower="lower" >
        <div class="box">
          <p >
            <CollageClose :closeOrder="closeOrder"/>
          </p>
        </div>
        <div class="loading" v-if="canLoad">
          <div v-if="showLoad"><loading  /></div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import payment from "@/components/o_payment";
import delivery from "@/components/o_delivery";
import CollageClose from "@/components/L_collageClose";
import loading from "@/commond/loading";
export default {
  components: {
    payment,
    CollageClose,
    delivery,
    loading,

  },
  data() {
    return {
      searchIn: false,
      asceSale: true,
      ascePrice: true,
      showLoad: false,
      canLoad: true,
      tag: 1,
      shopNum: 0,
      items: this.default,
      closeOrder: [],
      type: ''

    };
  },

  methods: {
    async handleTag(tag) {
      this.tag = tag;
      var type = 0 ;
      this.shopNum = 0;
      // console.log(this.shopList)

      if (tag === 2) {
        //对销量sort
        this.asceSale = !this.asceSale;
        type = this.asceSale ? 3 : 4;
      }
      if (tag === 5) {
        this.ascePrice = !this.ascePrice;
        type = this.ascePrice ? 5 : 6;
      }
      console.log(type)
      this.type = type
      const listData = await this.getNextPage({
        orderType: type,
        // state: 1
      })

      this.closeOrder = listData.data.list
      console.log(this.closeOrder)
      if(listData.data.list.length < this.pageSize) {
        this.canLoad = false
      }
    },
    getNextPage() {
      var obj = {
        pageSize: 10,
        orderType: this.type,
        state: 8
        // state: this.tag
      };
      this.shopNum++;
      obj.pageNumber = this.shopNum;
      return this.$API.L_selectOrderPage(obj);
    },
    lower(e) {
      if (!this.canLoad) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none',
          duration: 1500
        })
        return
      }
<<<<<<< HEAD

=======
      
>>>>>>> a264e0c11155e34cc520fa57a7212a4eabb2b1d0
      if (this.showLoad) return;
      this.showLoad = true
      wx.showLoading({
        title: '加载中',
      })
      const vm = this;
      this.getNextPage({ob: this.type,state: this.state}).then(response => {
        vm.closeOrder =  vm.closeOrder.concat(response.data.list);
        if(response) {
          vm.showLoad = false
        }
        if(vm.closeOrder.length === response.data.totalRow) {
          vm.canLoad = false
        }
<<<<<<< HEAD

=======
        
>>>>>>> a264e0c11155e34cc520fa57a7212a4eabb2b1d0
        wx.hideLoading()
      })
    } ,

  },
  async mounted() {
    console.log(11)
    this.shopNum = 0;
    const listData = await this.getNextPage();
    console.log(listData);
    this.closeOrder = this.closeOrder.concat(listData.data.list);
    // console.log(this.orderList)
    console.log(this.closeOrder);
    if (listData.data.list.length < 30) {
      this.canLoad = false;
    }

  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.box
  padding: 2% 0 110px 0%
.home
  height: 100%
.scroll-box
  height: 100%
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
</style>
