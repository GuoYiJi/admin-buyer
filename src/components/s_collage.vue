<template>
<div class="home">
  <div class="sort-select">
    <div class="zan-tab-container" id="tabContainer">
      <zan-tab
        :list="tab.list"
        :selected-id="tag"
        @tabchange="handleZanTabChange"
      />
    </div>
<!--     <div class="top-nav">
      <ul>
        <li :class="[tag === 0 && 'nav-active']" @click="handleTag(0)">未开始</li>
        <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">进行中</li>
        <li :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">已结束</li>
      </ul>
    </div> -->
    <div>
      <div class="box" v-for="(tabItem, tabIndex) in tab.list" :key="tabIndex" v-if="tabIndex === tag">
        <p v-for="(shop,index) in tabItem.data" :key="shop.id" v-if="shop.ping">
          <groupCard ref="scard" :key="index" :shop="shop" @switchSel="switchSel" @deleteItem="deleteItem" @openEdit="openEdit" />
        </p>
        <div class="white-block"></div>
      </div>
    </div>
  </div>
  <div class="footer">
    <p class="style2" @click="pageTo('collage/collageMsg')">创建拼团</p>
  </div>
</div>
</template>
<script>
import wx from "wx";
import groupCard from "@/components/s_groupCard"
import mixin from '@/mixin'
import loading from "@/commond/loading"
import TabMixins from '@/assets/js/shopMgrTabItemMixins';
export default {
  mixins: [mixin, TabMixins],
  components: {
    groupCard,
    loading,
  },
  data() {
    return {
      //search 1 上新 2.爆款 3.特价 4.拼团 5.搭配
      // groupTag: 4,
      tabContainerHeight: 0,
      tab: {
        list: [
          {
            title: '未开始',
            id: 0,
            state: 0,
            lastPage: false,
            pageNumber: 1,
            loading: false,
            data: []
          },
          {
            title: '进行中',
            id: 1,
            state: 1,
            lastPage: false,
            pageNumber: 1,
            loading: false,
            data: []
          },
          {
            title: '已结束',
            id: 2,
            state: 2,
            lastPage: false,
            pageNumber: 1,
            loading: false,
            data: []
          }
        ]
      },
      tag: 1,
      shopNum: 0,
      shopList: [],
      showLoad: false,
      canLoad: true,
      pageSize: 10,
      type: 1, //接口'ob'字段, 排序
      state: 1, //接口'state'字段, 0未开始, 1进行中, 2已经过期
    };
  },
  methods: {
    deleteItem(id) {
      console.log('id=====', id);
      const newList = this.shopList.filter(e => e.id !== id);
      this.$set(this.tab.list[this.tag], 'data', newList);
    },
    //选择操作
    switchSel(goodsId, bool, shop) {
      console.log(goodsId, bool, shop);
    },
    //搜索商品
    searchShop(params) {
      return this.$API.s_getShopGroup(params)
    },
    //下拉加载
    getNextPage(params) {
      return new Promise((resolve) => {
        const currentTab = this.tab.list[this.tag];
        if (currentTab.lastPage) {
          wx.showToast({
            title: '没有更多数据',
            icon: 'none',
            duration: 1500
          });
          return;
        }
        if (currentTab.loading) return;
        const { state, pageNumber } = currentTab;
        this.$set(this.tab.list[this.tag], 'loading', true);
        this.searchShop({...params, state, ob: 0, pageNumber, pageSize: 10})
          .then(res => {
            const { data: { list, lastPage } } = res;
            this.$set(this.tab.list, this.tag, {
              ...currentTab,
              lastPage,
              pageNumber: currentTab.pageNumber + 1,
              data: this.tab.list[this.tag].data.concat(list)
            })
            console.log(this.tab.list)
          })
          .finally(() => {
            this.$set(this.tab.list[this.tag], 'loading', false);
          })
      })
    },
    //编辑模式切换
    // openEdit() {
    //   console.log("我执行了");
    //   this.edit = true
    //   console.log(this.edit);
    // },
    //点击Tag请求
    async handleZanTabChange(e) {
      let { detail: selectedId } = e.mp;
      this.tag = selectedId;
      this.tab.list.splice(selectedId, 1, {
        ...this.tab.list[selectedId],
        data: [],
        pageNumber: 1,
        lastPage: false
      })
      this.getNextPage();
      
      // this.shopList = listData.data.list
      // if (listData.data.list.length < this.pageSize) {
      //   this.canLoad = false
      // }
    },
    // toRoute(path) {
    //   this.$router.push("/pages/home/" + path);
    // },
    pageTo(url) {
      console.log(111111111);
      this.$emit('toRoute', url, {
        isEdit: false
      })
    },
    // async lower(e) {
    //   // console.log(e);
    //   if (!this.canLoad) return;
    //   if (this.showLoad) return;
    //   this.showLoad = true;
    //   const listData = await this.getNextPage({
    //     ob: this.type,
    //     state: this.state,
    //     // labelId: this.groupTag
    //   });
    //   setTimeout(() => {
    //     if (listData.data.list.length < this.pageSize) {
    //       this.canLoad = false;
    //     }
    //     this.shopList = this.shopList.concat(listData.data.list);
    //     this.showLoad = false;
    //   }, 2000);
    // },
    lower(e) {
      this.getNextPage();
    },
  },
  async mounted() {
    this.getNextPage();
  },
  async onShow() {
    // this.shopNum = 0;
    // const listData = await this.getNextPage({
    //   ob: 1,
    //   state: this.state,
    //   // labelId: this.groupTag
    // });
    // // console.log(listData)
    // this.shopList = listData.data.list;
    // if (listData.data.list.length < this.pageSize) {
    //   this.canLoad = false;
    // }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.zan-tab-container
  position: fixed;
  left: 0;
  z-index: 6;
  width: 100%;
.home
  // position: relative
  .box
    padding-top: 44px * 2;
    .white-block
      width: 100%
      height: 100px
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
.nav-active
  color: #EE7527!important
  +border(1px,bottom,#EE7527 )
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
