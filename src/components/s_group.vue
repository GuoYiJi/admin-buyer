<template>
  <div class="home">
    <scroll-view scroll-y style="height: 480px;">
      <div class="item_b">
        <!-- <div class="sb_box"> -->
        <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
          <div class="g_box clearfix" :style="{width: 242*4 + 384 + 'rpx'}">
            <div class="g_left">
              <div class="left_box" v-for="(item, index) in shopList" :key="index">
                <div class="title">
                  <p>
                    <i class="i_new"></i>{{item.title}}系列</p>
                </div>
                <div class="card_box shop-card" v-for="(ite, inde) in item.matchGoods" :key="inde" v-if="inde == 0">
                  <div class="img_box">
                    <p class="img_1"><img v-if="inde == 0" :src="ite.image"></p>
                  </div>
                  <div class="desc" v-if="inde == 0">
                    <p class="d_text">{{ite.name}}</p>
                    <p class="d_time">货期:{{ite.delivery}}丨销量:{{ite.sellCount}}</p>
                  </div>
                  <p class="price" v-if="inde == 0">
                    <span>售价:￥{{ite.sellPrice}}</span>
                    <span class="sell">&nbsp;&nbsp;&nbsp;利润:￥{{ite.profit}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="g_right">
              <div class="scard_box" :style="{width: 242*4 + 'rpx'}">
                <div class="scard_box" v-for="(item, i) in shopList" :key="i">
                  <div class="p_card" v-for="(ite, j) in item.matchGoods" :key="j">
                    <div class="g_boxs">
                      <div class="card_boxs shop-cards">
                        <div class="img_box">
                          <p class="img_1"><img :src="ite.images"></p>
                        </div>
                        <div class="descs">
                          <p class="d_texts">{{ite.name}}</p>
                          <p class="d_times">货期:{{ite.delivery}}丨销量:{{ite.sellCount}}</p>
                        </div>
                        <p class="price">
                          <span>售价:￥{{ite.sellPrice}}</span>
                          <span class="sell">&nbsp;&nbsp;&nbsp;利润:￥{{ite.profit}}</span>
                        </p>
                        <i class="cancel_shop" v-if="cancel"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
        <!-- </div> -->
        <div class="footer">
          <p class="edit">编辑</p>
          <p class="close">下架</p>
        </div>
      </div>
      <div class="bottom"></div>
    </scroll-view>
    <div class="create">
      <p @click="toRoute('groupSetting')">
        <btn :title="'创建搭配'" />
      </p>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import scard from "@/components/group_card";
import btn from "@/components/btn.vue";
export default {
  components: {
    scard,
    btn
  },
  data() {
    return {
      //loading
      shopNum: 0,
      shopList: [],
      showLoad: false,
      canLoad: true,
      pageSize: 6,
      type: 0,
      state: 1
    };
  },
  methods: {
    toRoute(path) {
      this.$router.push("/pages/home/shopMgr/" + path);
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
    async lower(e) {
      // console.log(e);
      if (!this.canLoad) return;
      if (this.showLoad) return;
      this.showLoad = true;
      const listData = await this.getNextPage();
      setTimeout(() => {
        if (listData.data.list.length < this.pageSize) {
          this.canLoad = false;
        }
        this.shopList = this.shopList.concat(listData.data.list);
        this.showLoad = false;
      }, 2000);
    }
  },
  async mounted() {
    this.shopNum = 0;
    const listData = await this.getNextPage({});
    this.shopList = listData.data.list;
    if (listData.data.list.length < this.pageSize) {
      this.canLoad = false;
    }
    console.log(this.shopList, 123);
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.sb_box
.create
  position: fixed
  bottom: 0
  left: 0
  right: 0
  padding: 20px 74px
  background: #fff
.scroll_box_content
  height: 1000px
  overflow: auto
.home
  background: #fff
.footer
  display: flex
  justify-content: flex-end
  padding: 20px 0
  p
    width: 140px
    height: 70px
    text-align: center
    line-height: 70px
    border-radius: 4px
    margin-right: 20px
    box-sizing: border-box
  .edit
    color: #F67C2F
    +border(1px,all,#F67C2F)
  .close
    color: #fff
    background: #CCCCCC
.left_box
  position: absolute
  top: 0
  left: 20px
  width: 344px
.scard_box
  display: flex
  flex-wrap: wrap
  .p_card
    height: 444px
    padding-right: 26px
    padding-bottom: 20px
    width: 216px
    .cancel_shop
      position: absolute
      +bg-img('shopMgr/cancel.png')
      right: 12px
      top: 12px
      +icon(50px)
      border-radius: 50px
    .g_boxs
      height: 422px
      width: 216px
    .card_boxs
      padding-bottom: 4px
      .img_box
        +border(2px,all, #ccc)
        padding: 16px 0px
        .img_1
          height: 300px
          width: 212px
    .d_name
      color: #e3e3e3
      font-size: 14px
    .shop-cards
      position: relative
      img
        width: 100%
        border-radius: 4px
    .descs
      margin: 5px 0
      font-size: 20px
    .d_texts
      color: #000
      font-size: 24px
      +singleFile
    .price
      color: #FF0000
      font-weight: bold
      font-size: 24px
      padding-top: 10px
      height: 24px
      line-height: 24px
      +singleFile
      text-align: left
      .sell
        color: #333
        font-size: 22px
        font-weight: 500
    .d_times
      font-size: 20px
      color: #999
      +singleFile
      text-align: left
.g_box
  padding-top: 20px
  +border(10px,bottom,#F5F5F5)
  .g_left
    float: left
    width: 384px
    height: 900px
    position: relative
    .title
      height: 205px
      line-height: 205px
      color: #6EB1F5
      text-align: center
      .i_new
        +icon(34px)
        +bg-img('shopMgr/group_1.png')
        margin-right: 14px
    .card_box
      .img_box
        +border(2px,all, #ccc)
        padding: 16px 30px
        .img_1
          height: 425px
          width: 283px

  .g_right
    float: left
.d_name
	color: #e3e3e3
	font-size: 14px
.shop-card
	position: relative
	img
		width: 100%
		border-radius: 4px
	.desc
		overflow: hidden
    margin: 5px 0
		font-size: 25px
		+desc
		.d_text
      +singleFile()
      color: #000
      font-size: 28px
.price
  color: #FF0000
  font-weight: bold
  font-size: 28px
  padding-top: 10px
  height: 24px
  line-height: 24px
  overflow: hidden
  +singleFile
  .sell
    color: #333
    font-size: 26px
    font-weight: 500
    +singleFile
.d_time
  font-size: 24px
  color: #999
  +singleFile
</style>
