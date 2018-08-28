<template>
  <div class="home">
    <div class="search-box" >
      <div class="input">
        <p class="search-icon"><i class="search"></i></p>
        <p class="input-box" @click="toRoute('shopMgr/search')">请搜索商品</p>  
      </div>
    </div>
    <div class="nav">
      <div class="list">
        <span 
          v-for="(item,idx) in navData" 
          :key="idx" 
          class="item" 
          :class="[tag === item.id && 'active']"  
          @click="handleNav(item.id)"
        >{{item.text}}</span>
        <div class="line" :style="{left: (tag-1)*20 + '%'}"></div>
      </div>  
    </div>
    <div class="content">
      <div v-if="tag == 1">
        <all />
      </div>
      <div v-else-if="tag == 2">
        <selling />
      </div>
      <div v-else-if="tag == 3">
        <stocking />
      </div>
      <div v-else-if="tag == 4">
        <news />
      </div>
      <div v-else-if="tag == 5">
        <hot />
      </div>
      <div v-else-if="tag == 6">
        <discount />
      </div>
      <div v-else-if="tag == 7">
        <collage />
      </div>
      <div v-else-if="tag == 8">
        <group />
      </div>
    </div>
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
      tag: 1,
      navData: [
        {
          id: 1,
          text: '全部'
        },{
          id: 2,
          text: '出售中'
        },{
          id: 3,
          text: '仓库中'
        },{
          id: 4,
          text: '上新'
        },{
          id: 5,
          text: '热销'
        },{
          id: 6,
          text: '折扣'
        },{
          id: 7,
          text: '拼团'
        },{
          id: 8,
          text: '搭配'
        }
      ]
    };
  },
  methods: {
    handleNav(tag) {
      this.tag = tag
    },
    toRoute(path) {
      this.$router.push('/pages/home/' + path)
    }
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.content
  // height: 60%
.home
  height: 100%
.search-box
  padding: 30px 0
  background: #fff
  .input
    display: flex
    padding: 0px 35px
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
  height: 1px;/*no*/
  width: 8%
  border-radius: 8px
  background-color: #F67C2F
  position: absolute
  bottom: 23px
  margin: 0 6%
  transition: left .3s ease-in
    
</style>