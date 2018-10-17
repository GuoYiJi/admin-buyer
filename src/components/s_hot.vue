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
      <div>
        <div class="box">
          <p v-for="(shop,index) in shopList" :key="index">
            <scard ref="scard" :key="index" :shop="shop" @switchSel="switchSel" :edit="edit" @deleteItem="deleteItem" :selectedId="selIds[index]" :index="index" @searchShopGroupItem="searchShopGroupItem" />
          </p>
          <div class="white-block"></div>
        </div>
      </div>
    </div>
    <!-- <div class="footer" v-if="!edit">
      <p class="style2" @click="toRoute('home/addShop/addShop')">添加商品</p>
    </div> -->
    <i-drawer mode="right" :visible="showRight1" @close="toggleRight1">
      <selsearch @comSearch="comSearch" />
    </i-drawer>
    <i-modal :visible="showUp" @ok="selUp('showUp')" @cancel="toClose('showUp')">
      <div class="m_tips">确定要批量下架？</div>
    </i-modal>
    <div class="footer" v-if="!edit">
      <p class="style2" @click="toShow('edit')">批量处理</p>
      <p class="style3" @click="toRoute('home/addShop/editShop')">添加商品</p>
    </div>
    <div class="footer" v-else>
      <!-- <p class="all-btn"><i class="select" @click="selectAll" :class="allCheck && 'active'"></i>全部</p> -->
      <p class="style1" @click="toShow('showUp')">下架</p>
      <p class="style2" @click="toGroup">分组</p>
      <p class="style3" @click="toggleEdit()">完成</p>
    </div>

  </div>
</template>
<script>
import wx from "wx"
import scard from '@/components/s_card'
import mixin from '@/mixin'
import selsearch from '@/components/selectSearch'

import TabMixins from '@/assets/js/shopMgrTabItemMixins';
export default {
  mixins: [mixin, TabMixins],
  components: {
    scard,
    selsearch
  },
  computed: {

  },
  data() {
    return {
      //search 1 上新 2.爆款 3.特价 4.拼团 5.搭配
      groupTag: 2,
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
      state: 1,
      goodsIds: []
    };
  },
  methods: {
    searchShopGroupItem() {
      let params = {}
      params.pageNumber = 1
      params.pageSize = this.pageSize
      params.ob = 1
      params.labelId = this.groupTag
      params.state = this.state
      console.log(params);
      this.shopList = []
      this.$API.searchShopGroup(params).then(response => {
        this.shopList = response.data.list
      })
    },
    deleteItem(id) {
      console.log('id=====', id);
      let newArr = this.shopList
      newArr.forEach((item, index) => {
        if (item.id === id) {
          this.shopList.splice(index, 1)
        }
      })
    },
    toShow(name) {
      if(name === 'edit') {
        this[name] = true
        this.selIds.forEach((item, index) => {
          this.selIds[index] = '-1'
        })
        return
      }
      if(this.selIds.every(item => item == '-1')) {
        wx.showToast({
          title: '请先选择商品',
          icon: 'none'
        })
        return
      }
      this[name] = true
    },
    toggleEdit() {
      this.edit = !this.edit
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
        state: this.state,
        labelId: this.groupTag
      })
      this.shopList = listData.data.list
      this.shopList.forEach((item, index) => {
        this.selIds[index] = '-1'
      })
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
        vm.shopList.forEach((item, index) => {
          this.selIds[index] = '-1'
        })
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
        labelId: this.groupTag
      })
      this.shopList = listData.data.list;
      this.shopList.forEach((item, index) => {
        this.selIds[index] = '-1'
      })
      if (listData.data.list.length < this.pageSize) {
        this.canLoad = false;
      }

    },
    switchSel(id, bool, start) {
      console.log(id, bool);
      // const start = this.selIds.indexOf(id)
      if(this.selIds[start] === '-1') {
        this.$set(this.selIds, start, id)
      }else {
        this.$set(this.selIds, start, '-1')
      }
      console.log(this.selIds)
    },
    async selUp(name){
      this[name] = !this[name]

      if (this.selIds.every(item => item == '-1')) {
        wx.showToast({
          title: '请先选择商品',
          icon: 'none'
        })
        return
      }

      this.selIds = this.selIds.filter(item => {
        return item !== '-1'
      })
      console.log(this.selIds);
      await this.$API.switchShop({
        goodsIds: this.selIds.join(','),
        state: this.state == 0 ? 1 : 0
      })
      // this.edit = false
      let newArr = this.shopList

      newArr.forEach((item, index) => {
        this.selIds.forEach(ite => {
          if(item.id === ite) {
            this.shopList.splice(index, 1)
            this.selIds.splice(index, 1)
          }
        })
      })
      this.shopList.forEach((item, index) => {
        this.selIds[index] = '-1'
      })

      this.$success('下架成功！')

    },
    toGroup(){
      if(this.selIds.every(item => item === '-1')){
        return this.handleError('请至少选择一件商品！')
      }
      //批量分组 type 0 批量 1 单个 2 添加
      // this.edit = false
      this.toRoute('home/shopMgr/classifyAll',{
        type: 0,
        ids: this.selIds.join(',')
      })
    }

  },
  async mounted() {
    console.log(this.shopList)
    this.shopNum = 0;
    const listData = await this.getNextPage({
      ob: 1,
      state: this.state,
      labelId: this.groupTag
    });
    console.log(listData)
    this.shopList = listData.data.list;
    this.shopList.forEach((item, index) => {
      this.selIds[index] = '-1'
    })
    if (listData.data.list.length < this.pageSize) {
      this.canLoad = false;
    }
    console.log(this.shopList)

  },


};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'

.home
  // position: relative
  height: 100%
  .box
    padding: 15% 0 0
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
    background: #CCCCCC
  .style2
    background: #FFB658
  .style3
      background: #F67C2F
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
