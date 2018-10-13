<template>
<div class="home">
  <div class="sort-select">
    <div class="top-nav">
      <ul>
        <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">
          综合
        </li>
        <li :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">
          销量
          <div class="sort-box">
            <i class="sort-top" :class="asceSale && 'sort-active'"></i>
            <i :class="!asceSale && 'sort-active'" class="sort-bottom"></i>
          </div>
        </li>
        <li :class="[tag === 4 && 'nav-active']" @click="handleTag(4)">
          价格
          <div class="sort-box">
            <i class="sort-top" :class="ascePrice && 'sort-active'"></i>
            <i :class="!ascePrice  && 'sort-active'" class="sort-bottom"></i>
          </div>
        </li>
        <li :class="[tag === 5 && 'nav-active']" @click="handleTag(5)">
          筛选
          <div class="sort-box">
            <i class="option-icon"></i>
          </div>
        </li>
      </ul>
    </div>
    <scroll-view scroll-y style="height: 100vh" @scrolltolower="lower">
      <div class="box">
        <p v-for="(shop,index) in shopList" :key="index">
          <scard ref="scard" :shop="shop" :edit="edit" :act="shop.state == 0 ? '上架' : '下架'" @deleteItem="deleteItem"/>
        </p>
        <div class="white-block"></div>
      </div>
    </scroll-view>
  </div>
  <i-drawer mode="right" :visible="showRight1" @close="toggleRight1">
    <selsearch @comSearch="comSearch" />
  </i-drawer>
  <div class="footer" v-if="!edit">
    <p class="style2" @click="toRoute('home/addShop/addShop')">添加商品</p>
  </div>
</div>
</template>
<script>
import wx from "wx"
import scard from '@/components/s_card'
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
    }
  },
  methods: {
    async deleteItem(id) {
      this.shopList = []
      console.log('id=====', id);
      this.shopNum = 0;
      const listData = await this.getNextPage({
        ob: 1
      });
      this.shopList = listData.data.list;
      // let newArr = this.shopList
      // newArr.forEach((item, index) => {
      //   if (item.id === id) {
      //     this.shopList.splice(index, 1)
      //   }
      // })
    },
    async handleTag(tag) {
      this.tag = tag
      var type = 1;
      //refresh init
      this.shopNum = 0
      this.canLoad = true
      this.showLoad = false
      if (tag === 2) {
        //对销量sort
        this.asceSale = !this.asceSale
        type = this.asceSale ? 2 : 3
      }
      if (tag === 4) {
        this.ascePrice = !this.ascePrice
        type = this.ascePrice ? 4 : 5
      }
      if (tag === 5) {
        this.toggleRight1()
        return
      }
      this.type = type
      const listData = await this.getNextPage({
        ob: type,
        // state: 1
      })
      this.shopList = listData.data.list
      if (listData.data.list.length < this.pageSize) {
        this.canLoad = false
      }
    },
    toggleRight1() {
      this.showRight1 = !this.showRight1
    },
    toOpen(name) {
      this[name] = true
    },
    toClose(name) {
      this[name] = false
    },
    selectAll() {
      this.allCheck = !this.allCheck
      this.$refs.scard.selectAll(this.allCheck)
    },
    searchShop(params) {
      params.pageSize = this.pageSize
      return this.$API.searchShopGroup(params)
    },
    getNextPage(params) {
      this.shopNum++;
      //追加条件，根据tag追加
      if (this.tag == 5) {
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
    async comSearch(searchParams) {
      //searchParams 筛选的查询参数
      this.toggleRight1()
      this.selParam = searchParams
      const listData = await this.getNextPage({
        ob: 1
      })
      this.shopList = listData.data.list;
      if (listData.data.list.length < this.pageSize) {
        this.canLoad = false;
      }

    }
  },
  async mounted() {
    console.log(this.shopList)
    this.shopNum = 0;
    const listData = await this.getNextPage({
      ob: 1
    });
    this.shopList = listData.data.list;
    if (listData.data.list.length < this.pageSize) {
      this.canLoad = false;
    }

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
.box
  padding: 15% 0 0
  .white-block
    width: 100%
    height: 100px
.home
  height: 100%
.footer
  width: 100%
  position: fixed
  bottom: 0
  left: 0
  height: 98px
  line-height: 98px
  display: flex
  justify-content: flex-end
  color: #fff
  background: #fff
  z-index: 2
  +border(1px, top, #CCCCCC)
  p
    width: 220px
    background-color: #f67c2f
    text-align: center
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
