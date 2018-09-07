<template>
  <div class="home">
    <div class="sort-select">
      <div class="top-nav">
        <ul>
          <li :class="[tag === 0 && 'nav-active']" @click="handleTag(0)">未开始</li>
          <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">进行中</li>
          <li :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">已结束</li>
        </ul>
      </div>
      <scroll-view scroll-y lower-threshold='80' style="height: 70%;" @scrolltolower="lower"  >
      <div class="scroll-box">
        <div class="box">
          <p v-for="(shop,index) in shopList" :key="index" v-if="!shop.del">
            <groupCard ref="scard" :key="index" :shop="shop" @switchSel="switchSel" @openEdit="openEdit" />
          </p>
        </div>
        <div class="loading" v-if="canLoad">
          <div v-if="showLoad"><loading  /></div>
        </div>
      </div>
      </scroll-view>
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
export default {
  mixins: [mixin],
  components: {
    groupCard,
    loading,
  },
  data() {
    return {
      //search 1 上新 2.爆款 3.特价 4.拼团 5.搭配
      // groupTag: 4,
      tag: 1,
      shopNum: 0,
      shopList: [],
      showLoad: false,
      canLoad: true,
      pageSize: 20,
      type: 0,//接口'ob'字段, 排序
      state: 0,//接口'state'字段, 0未开始, 1进行中, 2已经过期
      type: 0,
      state: 0
    };
  },
  methods: {
    //选择操作
    switchSel(goodsId, bool, shop) {
      console.log(goodsId, bool, shop);
    },
    //搜索商品
    searchShop(params){
      params.pageSize = this.pageSize
      return this.$API.s_getShopGroup(params)
    },
    //下拉加载
    getNextPage(params) {
      this.shopNum++;
      params.pageNumber = this.shopNum;
      return this.searchShop(params)
    },
    //编辑模式切换
    // openEdit() {
    //   console.log("我执行了");
    //   this.edit = true
    //   console.log(this.edit);
    // },
    //点击Tag请求
    async handleTag(tag) {
      this.tag = tag;
      this.state = tag
      console.log(this.state);
      var type = 0 ;
      //refresh init
      this.shopNum = 0
      this.canLoad = true
      this.showLoad = false
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
    // toRoute(path) {
    //   this.$router.push("/pages/home/" + path);
    // },
    pageTo(url) {
      console.log(111111111);
      this.$emit('toRoute', url, {isEdit: false})
    },
    async lower(e) {
      // console.log(e);
      if (!this.canLoad) return;
      if (this.showLoad) return;
      this.showLoad = true;
      const listData = await this.getNextPage({
        ob: this.type,
        state: this.state,
        // labelId: this.groupTag
      });
      setTimeout(() => {
        if (listData.data.list.length < this.pageSize) {
          this.canLoad = false;
        }
        this.shopList = this.shopList.concat(listData.data.list);
        this.showLoad = false;
      }, 2000);
    },
  },
  async mounted() {
    console.log(this.shopList)
    this.shopNum = 0;
    const listData = await this.getNextPage({
      ob: 0,
      state: this.state,
      // labelId: this.groupTag
    });
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
.box
  padding: 2% 0 110px 0%
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
.scroll-box
  // padding: 10px 0
  height: 900px
  overflow: auto
  p
    margin-bottom: 8px
.option-icon
  +bg-img('shopMgr/option.png')
  +icon(32px)
.sort-active
  &:after
    border-color: #EE7527!important
.nav-active
  color: #EE7527!important
  +border(1px,bottom,#EE7527 )
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
