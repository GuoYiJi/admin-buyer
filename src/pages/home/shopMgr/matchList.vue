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
      <scroll-view scroll-y  style="height: 100vh;" @scrolltolower="lower"  >
      <div class="scroll-box">
        <div class="box">
          <p v-for="(shop,index) in shopList" :key="index" >
            <!-- shopMatch.some(item => item.id === shop.id -->
            <!-- <scard ref="scard" :key="index" :shop="shop" @switchSel="switchSel" :edit="edit" @deleteItem="deleteItem" :selectedId="selIds[index]" :index="index" /> -->
            <scard ref="scard" edit="true" :key="index" :check="shopMatch.some(item => item.goodsId === shop.id)" :shop="shop" @switchSel="switchSel" @setGroupPrice="setGroupPrice" />
          </p>
        </div>
        <div class="loading" v-if="canLoad">
          <div v-if="showLoad"><loading  /></div>
        </div>
      </div>
      </scroll-view>
    </div>
    <div class="footer">
      <p class="save" @click="confirm">确定({{shopMatch.length}})</p>
    </div>
    <i-drawer mode="right" :visible="showRight1" @close="toggleRight1">
      <selsearch @comSearch="comSearch" />
    </i-drawer>
  </div>
</template>
<script>
import wx from "wx"
import scard from '@/components/s_macthShopCard'
import loading from "@/commond/loading";
import mixin from '@/mixin'
import selsearch from '@/components/selectSearch'
import { $getUrl } from '@/utils'
import { mapState } from 'vuex'
export default {
  mixins: [mixin],
  components: {
    scard,
    loading,
    selsearch
  },
  computed: {
    // groupNum(){
    //   return this.selIds.length > 0 ? '('+ this.selIds.length +')' : ''
    // }
    ...mapState(["shopMatch"]),
  },
  data() {
    return {
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
      pageSize: 20,
      type: 0,
      status: 0,//0-编辑, 1-添加
      selIds: [],
      state: '',
      state: 1,
      groupPriceData: [],
    };
  },
  methods: {
    //确定, 把选中的数据覆盖shopMatch
    confirm(){
      //添加商品
      if(this.shopMatch.length === 0) {
        this.$Toast({
          content: '至少选择一个商品',
          type: 'error'
        })
      }else {
        this.$router.back(-1);
      }
      // let arr = []
      // for(var i=0,l; l=this.shopList[i++];){
      //   if(this.selIds.indexOf(l.id) >= 0) arr.push(l)
      // }
      // this.$store.commit('PUSHMATCH', arr)
      // this.$router.push('/'+ $getUrl())
      // console.log(arr)
    },
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
        state: this.state
      })
      this.shopList = listData.data.list
      if(listData.data.list.length < this.pageSize) {
        this.canLoad = false
      }
    },
    toggleRight1 () {
      this.showRight1 = !this.showRight1
    },
    searchShop(params){
      params.pageSize = this.pageSize
      return this.$API.searchShopGroup(params)
      // return this.$API.s_getCanGroup(params)
    },
    // 获取下页数据
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
    async lower(e) {
      // console.log(e);
      if (!this.canLoad) return;
      if (this.showLoad) return;
      this.showLoad = true;
      const listData = await this.getNextPage({ob: this.type,state: this.state});
      setTimeout(() => {
        if (listData.data.list.length < this.pageSize) {
          this.canLoad = false;
        }
        this.shopList = this.shopList.concat(listData.data.list);
        this.showLoad = false;
      }, 2000);
    },
    async comSearch(searchParams){
      //searchParams 筛选的查询参数
      this.toggleRight1()
      this.selParam = searchParams
      const listData = await this.getNextPage({ob: 0,state: this.state})
      this.shopList = listData.data.list;
      if (listData.data.list.length < this.pageSize) {
        this.canLoad = false;
      }

    },
    //取消选中操作, 删除此位置的数据
    switchSel(id,bool, shop){
      // console.log(shop);
      if(bool){
        // const index = 0;
        // this.shopMatch.forEach((item, index) => {
        //   if(item.goodsId === id) {
        //     index = index
        //   }
        // })
        // console.log(index);
        //往shopMatch添值
        this.$store.commit('PUSHMATCH', {
          delivery: shop.delivery,//货期
          goodsId: shop.id,//商品ID
          image: shop.image,
          name: shop.name,//名称
          profit: shop.profit,//利润
          sellCount: shop.sellCount,//销量
          sellPrice: shop.sellPrice,//售价
        })
        // this.selIds.push(id)
        // console.log(this.shopMatch);
      }else {
        // const start = this.selIds.indexOf(id)
        // console.log(this.shopMatch.indexOf(id));
        this.shopMatch.forEach((item, index) => {
          if(item.goodsId === shop.id) {
            this.$store.commit('SPLICEMATCH', index)
          }
        })
        // console.log(compareIndex);

        // console.log(this.shopMatch);
        // this.selIds.splice(start,1)
      }
      // console.log(this.selIds)
      console.log(this.shopMatch);
    },
    //选中操作
    setGroupPrice(obj){
      for(var i=0,l; l=this.groupPriceData[i++];){
        if(l.id == obj.id) return l.price = obj.price
      }
      // this.$store.commit('SPLICEMATCH', ADDMATCH)
      this.groupPriceData.push(obj)
    }


  },
  async mounted() {
    //判断是否
    this.shopNum = 0;
    const listData = await this.getNextPage({ob: 1,state: this.state});
    this.shopList = listData.data.list;
    if (listData.data.list.length < this.pageSize) {
      this.canLoad = false;
    }
    console.log(this.shopList)
    console.log(this.shopMatch);
  },

};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.footer
  position: fixed
  bottom: 0
  left: 0
  right: 0
  height: 98px
  line-height: 98px
  color: #fff
  background: #F67C2F
  text-align: center
  z-index: 2
  .save
.loading
  height: 70px
.box
  padding: 2% 0 50px 0%
.home
  height: 100%

.scroll-box
  // padding: 10px 0
  height: 800px
  // overflow: auto
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
  // left: 0
  // right: 0
  // top: 180px
  background: #fff
  // z-index: 9999
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
