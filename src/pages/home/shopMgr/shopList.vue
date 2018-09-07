<template>
  <div class="home">
    <!-- 商品选择列表 -->
    <div class="sort-select">
      <div class="top-nav">
        <ul>
          <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">综合</li>
          <li :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">销量<div class="sort-box"><i class="sort-top" :class="asceSale && 'sort-active'"></i><i :class="!asceSale && 'sort-active'" class="sort-bottom"></i></div></li>
          <li :class="[tag === 4 && 'nav-active']" @click="handleTag(4)">价格<div class="sort-box"><i class="sort-top" :class="ascePrice && 'sort-active'"></i><i :class="!ascePrice  && 'sort-active'" class="sort-bottom"></i></div></li>
          <li :class="[tag === 5 && 'nav-active']" @click="handleTag(5)">筛选<div class="sort-box"><i class="option-icon"></i></div></li>
        </ul>
      </div>
      <scroll-view scroll-y lower-threshold='80' style="height: 82%;" @scrolltolower="lower"  >
      <div class="scroll-box">
        <div class="box">
          <p v-for="(shop,index) in shopList" :key="index" >
            <scard ref="scard" :edit="edit" :key="index" :shop="shop" @switchSel="switchSel" @setGroupPrice="setGroupPrice" />
          </p>
        </div>
        <div class="loading" v-if="canLoad">
          <div v-if="showLoad"><loading  /></div>
        </div>
      </div>
      <i-drawer mode="right" :visible="showRight1" @close="toggleRight1">
        <selsearch @comSearch="comSearch" />
      </i-drawer>
      </scroll-view>
    </div>
    <div class="footer">
      <p class="save" @click="confirm">确定{{groupNum}}</p>
      <!-- <p class="save" @click="toRoute('home/shopMgr/collage/collageMsg')">确定{{groupNum}}</p> -->
    </div>

  </div>
</template>
<script>
import wx from "wx"
import scard from '@/components/s_listCard'
import loading from "@/commond/loading";
import mixin from '@/mixin'
import selsearch from '@/components/selectSearch'
import { mapState } from 'vuex'
export default {
  mixins: [mixin],
  components: {
    scard,
    loading,
    selsearch
  },
  computed: {
    groupNum(){
      return this.selIds.length > 0 ? '('+ this.selIds.length +')' : ''
      // return this.$SETGROUNPPRICE.length > 0 ? ``
    },
    ...mapState(["shopSelectList"])
  },
  watch: {
    edit(currentValue, oldValue) {
      this.edit = !this.edit
    }
  },
  data() {
    return {
      showUp: false,
      asceSale: true,
      ascePrice: true,
      tag: 1,
      showRight1: false,
      edit: true,
      allCheck: false,
      //loading
      shopNum: 0,
      shopList: [],//商品列表
      showLoad: false,
      canLoad: true,
      pageSize: 20,
      type: 0,
      selIds: [],//选择的ids
      state: 1,
      groupPriceData: [],//选择的id和拼团价
    };
  },
  methods: {
    confirm(){
      this.$router.back(-1);
    },
    async handleTag(tag){
      this.tag = tag
      var type = 0 ;
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
      return this.$API.s_getCanGroup(params)
      // return this.$API.s_getCanGroup(params)
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
    // 根据选中状态处理ids: GoodsId, 拼团价, 是否已勾选
    switchSel(id, groupPrice, bool){
      if(bool){
        if(this.selIds && this.selIds.some(item => item == id)) {
          const start = this.selIds.indexOf(id)
          this.selIds[start] = id;
          this.groupPriceData[start] = groupPrice;
          this.$store.commit('SETROUNPPRICE', start, {id, groupPrice});
        }else {
          this.selIds.push(id);
          this.groupPriceData.push(groupPrice)
          this.$store.commit('PUSTROUNPPRICE', {id, groupPrice});
        }
        // console.log(this.groupPriceData);
      }else {
        const start = this.selIds.indexOf(id)
        this.selIds.splice(start, 1)
        this.groupPriceData.splice(start, 1)
        // console.log(this.groupPriceData);
        this.$store.commit('SPLICEROUNPPRICE', start);
      }
      // this.$store.commit('SETGROUNPPRICE', [this.selIds, this.groupPriceData])
      console.log(this.shopSelectList);
    },
    // 设置拼团id和价格数组
    // obj: {id: this.shop.id, price: this.groupPrice}
    setGroupPrice(obj){
      for(var i=0,l; l=this.groupPriceData[i++];){
        if(l.id == obj.id) return l.price = obj.price
      }
      this.groupPriceData.push(obj)
      console.log(this.groupPriceData);
    }


  },
  async mounted() {
    console.log(this.shopList)
    this.shopNum = 0;
    const listData = await this.getNextPage({ob: 0,state: this.state});
    this.shopList = listData.data.list;
    if (listData.data.list.length < this.pageSize) {
      this.canLoad = false;
    }
    console.log(this.shopList)

  },

};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.footer
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 98px
  line-height: 98px
  color: #fff
  background: #F67C2F
  text-align: center
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
