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
      <scroll-view scroll-y lower-threshold='80' style="height: 70%;" @scrolltolower="lower"  >
        <div class="scroll-box">
          <div class="box">
            <p v-for="(shop,index) in shopList" :key="index"><scard ref="scard" :shop="shop" :edit="edit" /></p>
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
    <div class="footer" v-if="!edit">
      <p class="style2" @click="toRoute('home/addShop/addShop')">添加商品</p>
    </div>
  </div>
</template>
<script>
import wx from "wx"
import scard from '@/components/s_card'
import loading from "@/commond/loading";
import mixin from '@/mixin'
import selsearch from '@/components/selectSearch'
export default {
  mixins: [mixin],
  components: {
    scard,
    loading,
    selsearch
  },
  computed: {

  },
  data() {
    return {
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

      //search
      // more1: false,
      // more2: false,
      // more1Data: [],
      // more2Data: [],
      // classData: [],
      // mktData: [],
      // timeData: [],
      // stall3Data: [],
      // priceData: [{
      //   id: 1,
      //   name: '0-70',
      // },{
      //   id: 2,
      //   name: '70-150',
      // },{
      //   id: 3,
      //   name: '150以上',
      // }],
      // sel1: '',
      // sel2: '',
      // sel3: '',
      // sel4: '',
      // price1: '',
      // price2: '',

    };
  },
  methods: {
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
        // state: 1
      })
      this.shopList = listData.data.list
      if(listData.data.list.length < this.pageSize) {
        this.canLoad = false
      }
    },
    toggleRight1 () {
      this.showRight1 = !this.showRight1
    },
    toOpen(name){
      this[name] = true
    },
    toClose(name){
      this[name] = false
    },
    selectAll(){
      this.allCheck = !this.allCheck
      this.$refs.scard.selectAll(this.allCheck)
    },
    searchShop(params){
      params.pageSize = this.pageSize
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
    async lower(e) {
      // console.log(e);
      if (!this.canLoad) return;
      if (this.showLoad) return;
      this.showLoad = true;
      const listData = await this.getNextPage({ob: this.type});
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
      const listData = await this.getNextPage({ob: 0})
      this.shopList = listData.data.list;
      if (listData.data.list.length < this.pageSize) {
        this.canLoad = false;
      }

    }
  },
  async mounted() {
    console.log(this.shopList)
    this.shopNum = 0;
    const listData = await this.getNextPage({ob: 0});
    console.log(listData)
    this.shopList = listData.data.list;
    if (listData.data.list.length < this.pageSize) {
      this.canLoad = false;
    }
    console.log(this.shopList)
    
  },
  // onShow() { //返回显示页面状态函数
  //   this.onLoad()//再次加载，实现返回上一页页面刷新
  // }
  // onShow : function(){
  //   console.log('onShow start');
  //   this.onLoad();
  // }

};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'

.loading
  height: 70px



 
.box
  padding: 2% 0 50px 0%
.home
  // position: relative
  height: 100%
.footer
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 98px
  line-height: 98px
  display: flex
  justify-content: flex-end
  color: #fff
  background: #fff
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

    .select
      +select()
      left: 24px
    .active
      +select-active
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