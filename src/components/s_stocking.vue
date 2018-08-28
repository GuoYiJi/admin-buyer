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
          <p v-for="(shop,index) in shopList" :key="index" v-if="!shop.del">
            <scard ref="scard" :key="index" :shop="shop" @switchSel="switchSel" act="上架" :edit="edit" />
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
    <!-- <div class="footer" v-if="!edit">
      <p class="style2" @click="toRoute('home/addShop/addShop')">添加商品</p>
    </div> -->
    <i-modal :visible="showUp" @ok="selUp('showUp')" @cancel="toClose('showUp')">
      <div class="m_tips">确定要批量上架？</div>
    </i-modal>
    <div class="footer" v-if="!edit">
      <p class="style1" @click="toOpen('edit')">批量处理</p>
      <p class="style2">添加商品</p>
    </div>
    <div class="footer" v-else>
      <!-- <p class="all-btn"><i class="select" @click="selectAll" :class="allCheck && 'active'"></i>全部</p> -->
      <p class="style1" @click="toOpen('showUp')">上架</p>
      <p class="style2"  @click="toGroup">分组</p>
    </div>
    <i-message id="message" />
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
      selIds: [],
      state: 0
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
      // newArr = newArr.filter(item =>{
      //   for(var i=0,l; l=this.selIds[i++];){
      //     if(item.id == l) return 
      //   }
      //   return item
      // })
      
      for(var i=0,l; l=this.selIds[i++];){
        for(var j=0,k; k = newArr[j++];){
          if(k.id == l) k.del = true
        }
      }
      this.selIds = []
      // console.log(this.shopList)
      // console.log(newArr)
      this.shopList = newArr
      // 触发子组件方法，去重置check
      // this.$refs.scard.resetCheck()
      
      // console.log('aaa')
      
      this.$success('上架成功！')

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
  async mounted() {
    console.log(this.shopList)
    this.shopNum = 0;
    const listData = await this.getNextPage({ob: 0,state: this.state});
    console.log(listData)
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