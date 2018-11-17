<template>
<div class="home">
  <div class="scroll-y">
    <div v-for="(item, index) in shopList" :key="index">
      <scroll-view scroll-x="true" style="width: 100%">
        <div class="scroll-x">

          <div class="left-box">
            <div class="title">
              <i class="icon"></i>
              <span>{{item.title || '未设置标题'}}</span>
            </div>
            <div class="main-img">
              <div class="border">
                <i class="shop-img" :style="{backgroundImage: 'url(' + item.firstGoods.image + ');'}"></i>
              </div>
              <span class="title">{{item.firstGoods.name}}</span>
              <span class="desc"> 货期:{{item.firstGoods.delivery}}丨销量:{{item.firstGoods.sellCount}}</span>
              <span class="price"><strong>售价:￥{{item.firstGoods.sellPrice}}</strong>利润:￥{{item.firstGoods.profit}}</span>
            </div>
            <div class="footer">
              <button class="edit" @click="toEdit('/pages/home/shopMgr/groupSetting', item.matchGoods, item.id, item.title, item.firstGoods)">编辑</button>
              <button class="down" @click="showModal('visible2', item.id)">下架</button>
            </div>
          </div>
          <div class="right-box">
            <div>
              <div class="item-img" v-for="(ite, inx) in item.matchGoods" :key="inx" v-if="inx < (item.matchGoods.length / 2)">
                <div class="border">
                  <i class="shop-img" :style="{backgroundImage: 'url(' + ite.image + ');'}"></i>
                </div>
                <span class="title">{{ite.name}}</span>
                <span class="desc"> 货期:{{ite.delivery}}丨销量:{{ite.sellCount}}</span>
                <span class="price"><strong>售价:￥{{ite.sellPrice}}</strong>利润:￥{{ite.profit}}</span>
              </div>
            </div>
            <div>
              <div class="item-img" v-for="(ite, inx) in item.matchGoods" :key="inx" v-if="inx >= (item.matchGoods.length / 2)">
                <div class="border">
                  <i class="shop-img" :style="{backgroundImage: 'url(' + ite.image + ');'}"></i>
                </div>
                <span class="title">{{ite.name}}</span>
                <span class="desc"> 货期:{{ite.delivery}}丨销量:{{ite.sellCount}}</span>
                <span class="price"><strong>售价:￥{{ite.sellPrice}}</strong>利润:￥{{ite.profit}}</span>
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
    <i-modal :visible="visible2" @ok="downMatchState(index)" @cancel="cancelModal('visible2')">
      <div>确定要下架此搭配吗?</div>
    </i-modal>
  </div>
  <div class="white-space"></div>
  <div class="create">
    <!-- <btn :title="'创建搭配'" @click="pageTo('/pages/home/shopMgr/setNewMatch')" /> -->
    <button @click="pageTo('/pages/home/shopMgr/setNewMatch')">创建搭配</button>
    <!-- <button @click="toRoute('home/shopMgr/setNewMatch')">创建搭配</button> -->
  </div>
</div>
</template>
<script>
import wx from "wx";
import btn from "@/components/btn.vue";
import mixin from "@/mixin";
import { mapState } from "vuex"
import TabMixins from '@/assets/js/shopMgrTabItemMixins';

export default {
  mixins: [mixin, TabMixins],
  components: {
    btn
  },
  data() {
    return {
      //loading
      // widthArr: [],
      shopList: [],
      showLoad: false,
      canLoad: true,
      pageSize: 6,
      // type: 0,
      // state: 1,
      shopNum: 0,
      visible2: false,
      selectId: ''
    };
  },
  computed: {
    ...mapState(['shopMatch']),
    widthArr() {
      let arr = []
      this.shopList.forEach((item, index) => {
        arr[index] = Math.round((item.matchGoods.length - 1) / 2)
      })
      return arr
    }
  },
  methods: {
    pageTo(url) {
      // wx.removeStorageSync('selectShopArr');
      this.$store.commit('ADDMATCH', [])
      this.$router.push(url);
    },
    // 打开对话框
    showModal(name, id) {
      this[name] = true
      this.selectId = id
    },
    cancelModal(name) {
      this[name] = false
    },
    toEdit(url, matchGoodsList, id, title, firstGoods) {
      this.$store.commit('ADDMATCH', [])
      console.log([firstGoods].concat(matchGoodsList));
      [firstGoods].concat(matchGoodsList).forEach(item => {
        this.$store.commit('PUSHMATCH', {
          delivery: item.delivery,//货期
          goodsId: item.goodsId,//商品ID
          image: item.image,
          name: item.name,//名称
          profit: item.profit,//利润
          sellCount: item.sellCount,//销量
          sellPrice: item.sellPrice,//售价
        });
      });
      console.log(this.shopMatch);
      this.$router.push({
        path: url,
        query: {
          id,
          title
        }
      });
    },
    // 下架搭配
    downMatchState(index) {
      this.$API.s_updateMatchState({
        state: 0, // 0-下架, 1-上架
        matchId: this.selectId
      }).then(response => {
        if(response.code === 1) {
          this.shopList.splice(index, 1)
          this.cancelModal('visible2')
          wx.showToast({
            title: '下架成功',
            icon: 'success'
          })
          setTimeout(() => {
            wx.hideToast()
          }, 1500)
        }
      })
    },
    searchShop(params) {
      params.pageSize = this.pageSize;
      return this.$API.s_getshopMatch(params);
    },
    getNextPage(params) {
      this.shopNum++;
      params.pageNumber = this.shopNum;
      return this.searchShop(params);
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
      this.getNextPage({}).then(response => {
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
    // async lower(e) {
    //   // console.log(e);
    //   if (!this.canLoad) return;
    //   if (this.showLoad) return;
    //   this.showLoad = true;
    //   const listData = await this.getNextPage();
    //   setTimeout(() => {
    //     if (listData.data.list.length < this.pageSize) {
    //       this.canLoad = false;
    //     }
    //     this.shopList = this.shopList.concat(listData.data.list);
    //     this.showLoad = false;
    //   }, 2000);
    // }
  },
  async created() {
    const listData = await this.getNextPage({});
    console.log(listData);
    this.shopList = listData.data.list.map(item => {
      
      if (item.matchGoods.length) {
        let firstGoods = item.matchGoods.splice(0, 1);
        item.firstGoods = firstGoods[0];
      }
      return item;
    });//搭配列表->包含搭配图片
    // this.shopList.forEach((item, index) => {
    //   this.widthArr[index] = Math.round((item.matchGoods.length - 1) / 2)
    // })
    // console.log(this.widthArr);
    if (listData.data.list.length < this.pageSize) {
      this.canLoad = false;
    }
  },
  onShow() {
    this.$API.s_getshopMatch({
      pageNumber: 1,
      pageSize: this.pageSize
    }).then(response => {
      this.shopList = response.data.list.map(item => {
        if (item.matchGoods.length) {
          let firstGoods = item.matchGoods.splice(0, 1);
          item.firstGoods = firstGoods[0];
        }
        return item;
      })
    })
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'

.home
  // width: 100%
  // min-height: 100%
  background-color: #ffffff
.scroll-x
  display: flex
  width: 100%
  padding: 40px 0
  background-color: #ffffff
  // height: 1200px
  .left-box
    width: 395px
    // overflow: hidden
    div.title
      width: 344px
      height: 165px
      margin: 0 25px
      display: flex
      align-items: center
      justify-content: center
      i.icon
        display: inline-block
        width: 34px
        height: 31px
        background: url("~@/assets/img/shopMgr/group_1.png") no-repeat center
        background-size: 100% 100%
        margin: auto 14px
        overflow: hidden
      span
        color: #6EB1F5
        font-size: 32px
        overflow: hidden
    .main-img
      margin: 0 25px
      width: 344px
      overflow: hidden
      display: flex
      flex-wrap: wrap
      .border
        width: 344px
        height: 458px
        border: 2px solid #CCCCCC
        padding: 16px 30px
        i.shop-img
          display: inline-block
          width: 100%
          height: 100%
          background-repeat: no-repeat
          background-position: center
          background-size: cover
      span.title
        width: 100%
        font-size: 30px
        padding-top: 18px
        +singleFile
      span.desc
        width: 100%
        color: #999999
        font-size: 26px
      span.price
        width: 100%
        font-size: 28px
        color: #333333
        +singleFile
        strong
          font-size: 30px
          color: #FF0000
  .right-box
    // float: left
    background-color: #ffffff
    white-space: nowrap;
    margin-bottom: -20px
    .item-img
      display: inline-block
      width: 270px
      max-height: 640px
      overflow: hidden
      flex-wrap: wrap
      margin: 0 10px 20px
      .border
        width: 270px
        height: 416px
        border: 2px solid #CCCCCC
        padding: 16px 0
        i.shop-img
          display: inline-block
          width: 100%
          height: 100%
          background-repeat: no-repeat
          background-position: center
          background-size: cover
      span.title
        width: 100%
        font-size: 26px
        padding-top: 10px
      span.desc
        width: 100%
        color: #999999
        font-size: 22px
      span.price
        width: 100%
        font-size: 22px
        color: #333333
        strong
          font-size: 24px
          color: #FF0000
.footer
  // width: 100%
  // height: 110px
  // line-height: 110px
  // bottom: -110px
  margin-top: 10px
  padding: 10px 25px
  display: flex
  button
    padding: 20px 40px
    margin-right: 8px
  button.edit
    font-size: 32px
    color: #F67C2F
    background-color: #ffffff
    border: 1px solid #F67C2F
    text-align: center
  button.down
    font-size: 32px
    color: #ffffff
    border: none
    background-color: #CCCCCC
    text-align: center

.white-space
  width: 100%
  height: 200px
  background-color: #ffffff
.create
  width: 100%
  height: 170px
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  bottom: 0
  left: 0
  background-color: #ffffff
  button
    width: 80%
    height: 90px
    line-height: 90px
    text-align: center
    border-radius: 10px
    font-size: 32px
    color: #FFFFFF
    background-color: #F67C2F
</style>
