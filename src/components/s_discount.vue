<template>
  <div class="home">
    <div class="sort-select">
      <div class="top-nav">
        <ul>
          <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">综合</li>
          <li :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">销量<div class="sort-box"><i class="sort-top" :class="asceSale && 'sort-active'"></i><i :class="!asceSale && 'sort-active'" class="sort-bottom"></i></div></li>
          <li :class="[tag === 4 && 'nav-active']" @click="handleTag(4)">价格<div class="sort-box"><i class="sort-top" :class="ascePrice && 'sort-active'"></i><i :class="!ascePrice  && 'sort-active'" class="sort-bottom"></i></div></li>
          <li :class="[tag === 5 && 'nav-active']" @click="handleTag(5)">筛选<div class="sort-box"><i class="option-icon"></i></div></li>
        </ul>
      </div>
      <scroll-view scroll-y style="height: 100vh;" @scrolltolower="lower">
        <div class="box">
          <p v-for="(shop,index) in shopList" :key="index">
            <scard ref="scard" :key="index" :shop="shop" @switchSel="switchSel" :edit="edit" />
            <!-- <div class="item-card">
              <i class="select" v-if="edit" @click="select" :class="[check ? 'active' : 'close']"></i>
              <i class="img" :style="{backgroundImage: 'url(' + shop.image || 'https://www.iwwdirect.com.au/images/404.jpg' + ')'}"></i>
              <div class="desc">
                <p class="title">{{shop.name || '未设名'}}</p>
                <span class="stall">档口:{{shop.stallInfo1 + '-' + shop.stallInfo2 +'-'+ shop.stallInfo3}}</span>
                <span class="count">
                  <p>货期:{{shop.delivery}}丨销量:{{shop.sellCount}}</p>
                  <button class="edit" @click="toOpen('visible4')">编辑</button>
                </span>
                <p class="collage_price">折扣价: {{shop.disPrice ? '￥' + shop.disPrice : '未设置'}}</p>
                <p class="price">
                  <span>售价:￥{{shop.sellPrice}}</span>
                  <span class="sell">&nbsp;&nbsp;&nbsp;利润:￥{{shop.profit}}</span>
                </p>
              </div>
            </div> -->
          </p>
          <div class="white-block"></div>
        </div>
      </scroll-view>
    </div>
    <i-drawer mode="right" :visible="showRight1" @close="toggleRight1">
      <selsearch @comSearch="comSearch" />
    </i-drawer>
    <!-- <div class="footer" v-if="!edit">
      <p class="style2" @click="toRoute('home/addShop/addShop')">添加商品</p>
    </div> -->
    <i-modal :visible="showUp" @ok="selUp('showUp')" @cancel="toClose('showUp')">
      <div class="m_tips">确定要批量下架？</div>
    </i-modal>
    <div class="footer" v-if="!edit">
      <!-- <p class="style1" @click="toOpen('edit')">批量处理</p> -->
      <p class="style2" @click="toRoute('home/shopMgr/shopListDiscount')">创建折扣</p>
    </div>
    <!-- <div class="footer" v-else> -->
      <!-- <p class="all-btn"><i class="select" @click="selectAll" :class="allCheck && 'active'"></i>全部</p> -->
      <!-- <p class="style2" @click="toGroup">编辑</p>
      <p class="style1" @click="toOpen('showUp')">下架</p>
      <p class="style2" @click="toGroup">分组</p>
      <p class="style2" @click="toGroup">取消</p>
    </div> -->

  </div>
</template>
<script>
import wx from "wx"
import scard from '@/components/s_listCardDiscount'
import mixin from '@/mixin'
import selsearch from '@/components/selectSearch'
export default {
  mixins: [mixin],
  components: {
    scard,
    selsearch
  },
  computed: {

  },
  data() {
    return {
      //search 1 上新 2.爆款 3.特价 4.拼团 5.搭配
      groupTag: 3,
      showUp: false,
      asceSale: true,
      ascePrice: true,
      tag: 1,
      showRight1: false,
      edit: false,
      allCheck: false,
      //loading
      shopNum: 0,
      shopList: [],
      showLoad: false,
      canLoad: true,
      pageSize: 10,
      type: 1,
      selIds: [],
      state: 1
    };
  },
  methods: {
    async handleTag(tag){
      this.tag = tag
      var type = 1 ;
      //refresh init
      this.shopNum = 0
      this.canLoad = true
      this.showLoad = false
      if(tag === 2){
        //对销量sort
        this.asceSale = !this.asceSale
        type = this.asceSale ? 2 : 3
      }
      if(tag === 4) {
        this.ascePrice = !this.ascePrice
        type = this.ascePrice ? 4 : 5
      }
      if(tag === 5) {
        this.toggleRight1()
        return
      }
      this.type = type
      const listData = await this.getNextPage({
        ob: type,
        state: this.state,
        // labelId: this.groupTag
      })
      this.shopList = listData.data.list
      if(listData.data.list.length < this.pageSize) {
        this.canLoad = false
      }
    },
    toggleRight1 () {
      this.showRight1 = !this.showRight1
    },
    // selectAll(){
    //   this.allCheck = !this.allCheck
    //   this.$refs.scard.selectAll(this.allCheck)
    // },
    //获取折扣商品列表
    searchShop(params){
      params.pageSize = this.pageSize
      params.isDis = 1
      return this.$API.searchShopGroup(params)
    },
    getNextPage(params) {
      this.shopNum++;
      //追加条件，根据tag追加
      if(this.tag == 5){
        params = Object.assign(params, this.selParam)
      }
      params.pageNumber = this.shopNum;
      return this.searchShop(params)
      // return this.$API.getAdr(obj);
    },
    lower(e) {
      console.log(e);
      if (!this.canLoad) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none',
          duration: 1500
        })
        return
      }
      if (this.showLoad) return;
      this.showLoad = true
      wx.showLoading({
        title: '加载中',
      })
      const vm = this;
      this.getNextPage({
        ob: this.type,
        state: this.state
      }).then(response => {
        vm.shopList = vm.shopList.concat(response.data.list);
        if (response) {
          vm.showLoad = false
        }
        if (vm.shopList.length === response.data.totalRow) {
          vm.canLoad = false
        }
        wx.hideLoading()
      })
    },
    async comSearch(searchParams){
      //searchParams 筛选的查询参数
      this.toggleRight1()
      this.selParam = searchParams
      const listData = await this.getNextPage({
        ob: 1,
        state: this.state,
        // labelId: this.groupTag
      })
      this.shopList = listData.data.list;
      if (listData.data.list.length < this.pageSize) {
        this.canLoad = false;
      }

    },
    switchSel(id,bool){
      if(bool){
        this.selIds.push(id)
      }else {
        const start = this.selIds.indexOf(id)
        this.selIds.splice(start,1)
      }
      console.log(this.selIds)
    },
    async selUp(name){
      this[name] = !this[name]

      if(this.selIds.length == 0) return this.handleError('请至少选择一件商品！')

      await this.$API.switchShop({
        goodsIds: this.selIds.join(','),
        state: this.state == 0 ? 1 : 0
      })
      this.edit = false
      let newArr = this.shopList

      for(var i=0,l; l=this.selIds[i++];){
        for(var j=0,k; k = newArr[j++];){
          if(k.id == l) k.del = true
        }
      }
      this.selIds = []
      this.shopList = newArr

      this.$success('下架成功！')
    },
    toGroup(){
      if(this.selIds.length == 0) return this.handleError('请至少选择一件商品！')
      //批量分组 type 0 批量 1 单个 2 添加
      this.edit = false
      this.toRoute('home/shopMgr/classifyAll',{
        type: 0,
        ids: this.selIds.join(',')
      })
    }

  },
  mounted() {
    //do something after mounting vue instance
    console.log("mounted直行了");
    this.shopNum = 0;
    this.getNextPage({
      ob: 1,
      state: this.state,
      // labelId: this.groupTag,
      isDis: 1
    }).then(response => {
      this.shopList = response.data.list;
      if (this.shopList.length < this.pageSize) {
        this.canLoad = false;
      }
    })
  },
  onShow() {
    console.log("onShow直行了");
    this.shopNum = 0;
    this.getNextPage({
      ob: 1,
      state: this.state,
      // labelId: this.groupTag,
      isDis: 1
    }).then(response => {
      this.shopList = response.data.list;
      if (this.shopList.length < this.pageSize) {
        this.canLoad = false;
      }
    })
  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  // position: relative
  height: 100%
  .box
    padding: 15% 0 0
    .item-card
      display: flex
      text-align: left
      padding: 32px 16px 28px 24px
      // +border(1px,bottom)
      background: #fff
      position: relative
      margin-bottom: 8px
      i.select
        display: inline-block
        width: 40px
        height: 40px
        border-radius: 50%
        margin: auto 20px
        background-position: center
        background-repeat: no-repeat
        background-size: 100% 100%
      i.active
        background-image: url("~@/assets/img/storeMgr/select.png")
      i.close
        background-image: url("~@/assets/img/home/select.png")
      .img
        display: inline-block
        width: 240px
        height: 240px
        border-radius: 12px
        margin-right: 20px
        background-repeat: no-repeat
        background-position: center
        background-size: 100% 100%
      .desc
        flex: 1
        overflow: hidden
        display: flex
        flex-wrap: wrap
        .title
          width: 100%
          +moreLine(2)
          font-size: 28px
        .tips
          width: 100%
          display: flex
          justify-content: space-between
          align-items: center
          padding-top: 8px
          color: #999
        span.stall
          width: 100%
          font-size: 26px
          color: #999999
          +singleFile
          background-color: #F5F5F5
        span.count
          width: 100%
          display: flex
          justify-content: space-between
          p
            flex: 1
            font-size: 26px
            color: #999999
            +singleFile
          button.edit
            color: #EE7527
            border: 2px solid #EE7527
            border-radius: 10px
            padding: 5px
            font-size: 26px
        .collage_price
          width: 100%
          text-align: left
          font-size: 28px
          color: #333333
          +singleFile
        .price
          width: 100%
          color: #FF0000
          font-weight: bold
          font-size: 30px
          +singleFile
          .sell
            color: #333
            font-size: 28px
            font-style: normal
    .white-block
      width: 100%
      height: 100px
.footer
  position: fixed
  bottom: 0
  left: 0
  right: 0
  height: 98px
  line-height: 98px
  display: flex
  justify-content: flex-end
  color: #fff
  background: #fff
  +border(1px, top, #CCCCCC)
  p
    width: 220px
    text-align: center
  .style1
    background: #FFB658
  .style2
    background: #F67C2F
  .all-btn
    background: #fff
    color: #999999
    text-align: left
    width: 230px
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
  width: 100%
  position: fixed
  background: #fff
  z-index: 6
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
