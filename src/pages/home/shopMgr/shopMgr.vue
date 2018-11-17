<style lang="scss">
  .isPullDownRefresh {
    .top-nav {
      position: relative !important;
    }
  }
</style>
<template>
  <div class="home" :class="{ 'isPullDownRefresh': isPullDownRefresh }" :style="{ 'padding-top': (isPullDownRefresh ? 0 : topContainerHeight) + 'px' }">
    <div class="search-box" id="topContainer" :style="{ position: isPullDownRefresh ? 'relative' : 'fixed' }">
      <!-- <div class="input">
        <p class="search-icon"><i class="search"></i></p>
        <p class="input-box" @click="toRoute('shopMgr/search')">请搜索商品</p>
      </div> -->
      <div class="zan-tab-container">
        <zan-tab
          :list="navData"
          :selected-id="selectedId"
          scroll
          @tabchange="handleZanTabChange"
          :height="45"
        />
      </div>
    </div>
    <div class="content">
      <div v-if="selectedId == 1">
        <!-- 全部 -->
        <all />
      </div>
      <div v-else-if="selectedId == 2">
        <!-- 出售中 -->
        <selling />
      </div>
      <div v-else-if="selectedId == 3">
        <!-- 仓库中 -->
        <stocking />
      </div>
      <div v-else-if="selectedId == 4">
        <!-- 上新 -->
        <news />
      </div>
      <div v-else-if="selectedId == 5">
        <!-- 热销 -->
        <hot />
      </div>
      <div v-else-if="selectedId == 6">
        <!-- 折扣 -->
        <discount />
      </div>
      <div v-else-if="selectedId == 7">
        <!-- 拼团 -->
        <collage @toRoute="toRoute" />
      </div>
      <div v-else-if="selectedId == 8">
        <!-- 搭配 -->
        <group />
      </div>
    </div>
    <i-message id="message" />
  </div>
</template>
<script>
import wx from "wx"
import collage from '@/components/s_collage'
import selling from '@/components/s_selling'
import discount from '@/components/s_discount'
import stocking from '@/components/s_stocking'
import group from '@/components/s_group'
import news from '@/components/s_news'
import hot from '@/components/s_hot'
import all from '@/components/s_all'
import EventBus from '@/assets/js/EventBus';
export default {
  components: {
    collage,
    selling,
    hot,
    discount,
    stocking,
    news,
    group,
    all
  },
  data() {
    return {
      isPullDownRefresh: false,
      // selectedId: 2,
      selectedId: 2,
      tag: 6,
      topContainerHeight: 0,
      navData: [
        {
          id: 1,
          title: '全部'
        },{
          id: 2,
          title: '出售中'
        },{
          id: 3,
          title: '仓库中'
        },{
          id: 4,
          title: '新品上新'
        },{
          id: 5,
          title: '爆款精选'
        },{
          id: 6,
          title: '特价折扣'
        },{
          id: 7,
          title: '拼团优惠'
        },{
          id: 8,
          title: '搭配专区'
        }
      ]
    };
  },
  methods: {
    handleNav(tag) {
      this.tag = tag;
    },
    toRoute(url, params) {
      this.$router.push({path: url, query: params})
    },
    handleZanTabChange(e) {
      let { detail: selectedId } = e.mp;
      if (selectedId === this.selectedId) return;
      this.selectedId = selectedId;
    }
  },
  onReachBottom() {
    EventBus.$emit('onReachBottom');
  },
  onPullDownRefresh() {
    this.isPullDownRefresh = true;
    EventBus.$emit('onPullDownRefresh', () => {
      this.isPullDownRefresh = false;
      console.log('stopPullDownRefresh')
      wx.stopPullDownRefresh();
    });
  },
  mounted() {
    const query = wx.createSelectorQuery()
    query.select('#topContainer').boundingClientRect();
    query.exec(res => {
      this.topContainerHeight = res[0].height;
    })
  },
  onUnload() {
    Object.assign(this, this.$options.data())
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'

.home
  padding-top: 235px
.search-box
  width: 100%
  position: fixed
  top: 0
  left: 0
  z-index: 5
  padding: 30px 0 0
  background: #fff
  box-sizing: border-box;
  .input
    display: flex
    padding: 0px 35px
    margin-bottom: 30px
    p
      width: 10%
      .search
        +bg-img('home/search.png')
        +icon(38px)
        margin-top: 7px
    .search-icon
      position: absolute
      left: 60px
    .input-box
      background-color: #f5f5f5
      border-radius: 4px
      width: 100%
      text-align: left
      padding: 8px 85px
      border: none
      color: #999999

.active
  color: #F67C2F
  // font-weight: 600
.zan-tab-container
  background-color: #f5f5f5;
.nav
  overflow: hidden
  text-align: center
  background: #f5f5f5
  height: 70px
  width: 100%
  padding-top: 1px;/*no*/
  box-shadow: 0px 4px 6px 0px rgba(0, 69, 162, 0.06);/*no*/
  .list
    font-size: 26px
    color: #000
    background: #f5f5f5
    overflow-y: hidden
    overflow-x: auto
    height: 90px
    position: relative
    display: flex
    width: 100%
    .item
      flex: 0 0 20%
      line-height: 70px
      box-sizing: border-box
.line
  display: block
  height: 4px;/*no*/
  width: 8%
  border-radius: 8px
  background-color: #F67C2F
  position: absolute
  bottom: 22px
  margin: 0 6%
  transition: left .3s ease-in
</style>
