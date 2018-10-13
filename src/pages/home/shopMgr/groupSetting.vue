<template>
<div class="home">
  <!-- 轻提示 -->
  <i-toast id="toast" />
  <div class="title_box">
    <input class="input_title" placeholder="请输入标题" v-model="title" />
  </div>
  <!-- 添加大图 -->
  <div class="add_shops">
    <div class="box-wrapper">
      <div class="shop-card" v-if="shopMatch && shopMatch[0]">
        <div class="img_box">
          <i class="shopImg" :style="{backgroundImage: 'url(' + shopMatch[0].image + ')'}">
            <!-- <i class="cancel_shop" @click="toCancel(0)"></i> -->
          </i>
        </div>
        <span class="name">{{shopMatch[0].name}}</span>
        <span class="desc"> 货期:{{shopMatch[0].delivery}}丨销量:{{shopMatch[0].sellCount}}</span>
        <span class="sell"><strong>售价:￥{{shopMatch[0].sellPrice}}</strong> 利润:￥{{shopMatch[0].profit}}</span>
      </div>
      <div class="shop-card add_shop" @click="toRoute('home/shopMgr/matchList')" v-else>
        +添加商品
      </div>
      <i class="cancel_shop" @click="toCancel(idx)"></i>
    </div>
  </div>
  <!-- 添加小图 -->
  <div class="add_other_shop">
    <div class="box-wrapper" v-for="(item, idx) in shopMatch" :key="idx" v-if="idx > 0">
      <div class="shop-cards">
        <div class="img_box">
          <i class="shopImg" :style="{backgroundImage: 'url(' + item.image + ')'}">
            <!-- <i class="cancel_shop" @click="toCancel(idx)"></i> -->
          </i>
        </div>
        <span class="name">{{item.name}}</span>
        <span class="desc">货期:{{item.delivery}}丨销量:{{item.sellCount}}</span>
        <span class="sell"><strong>售价:￥{{item.sellPrice}}</strong> 利润:￥{{item.profit}}</span>
      </div>
      <i class="cancel_shop" @click="toCancel(idx)"></i>
    </div>
    <div class="box-wrapper" v-if="shopMatch.length < 10">
      <div class="add_shop" @click="toRoute('home/shopMgr/matchList')">+添加商品</div>
    </div>
  </div>
  <p class="bottom"></p>
  <p class="save" @click="submit()">确定</p>
</div>
</template>
<script>
import wx from "wx";
// import scard from "@/components/group_card";
import mixin from "@/mixin";
import { mapState } from "vuex";
export default {
  mixins: [mixin],
  components: {
    // scard
  },
  data() {
    return {
      // matchGoodsList: [],
      id: '',
      title: '',
      shopId: '',
      // goodsIds: []
    };
  },
  computed: {
    ...mapState(['shopMatch']),
    goodsIds() {
      let arr = []
      this.shopMatch.forEach((item, index) => {
        arr[index] = item.goodsId
      })
      return arr
    }
  },
  methods: {
    addShopMatch() {
      this.$store.commit('ADDMATCH', []);
      console.log(this.shopMatch);
      this.$router.push('/matchList')
    },
    toCancel(index) {
      console.log(index);
      // this.matchGoodsList.splice(index, 1);
      this.$store.commit('SPLICEMATCH', index)
      console.log(this.shopMatch);
      // this.goodsIds.splice(index, 1);
      // console.log(this.goodsIds);
      // this.matchGoodsList[index] = null;
      // this.$set(this.matchGoodsList, index, {images: null,name: null, delivery: null, sellCount: null, sellPrice: null, profit: null });
    },
    submit() {
      // const s_addMatch = await API.s_addMatch();
      if (!this.title) {
        this.$Toast({
          content: '未设置搭配标题',
          type: 'warning',
        })
      } else if(this.title.length > 8) {
        this.$Toast({
          content: '标题字数最多为8个',
          type: 'error',
        })
      }else {
        console.log(this.goodsIds);
        this.$API.editMatchGoods({
          id: this.id,
          title: this.title,
          goodsIds: this.goodsIds.toString()
        }).then(response => {
          if(response.code === 1) {
            this.$router.back(-1)
          }
        })
      }
    }
  },
  mounted() {
    console.log(this.shopMatch);
    // if (this.$route.query.shopNum) {
    //   this.shopTop = this.$route.query.shopNum;
    //   console.log(this.shopTop);
    // }
    // this.shopMatch.forEach((item, index) => {
    //   this.goodsIds[index] = item.goodsId
    // })
    console.log(this.goodsIds);
    this.id = this.$route.query.id;
    this.title = this.$route.query.title;
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  padding: 20px 22px
  .title_box
    width: 100%
    height: 200px
    border: 1px solid #CCCCCC
    margin: 0 auto
    overflow: hidden
    background-color: #FFFFFF
    input
      width: 100%
      height: 100%
      font-size: 32px
      color: #000000
      text-align: center
      &:-webkit-input-placeholder,
      &:-moz-placeholder,
      &:-ms-input-placeholder
        color: #000000
  // 大图
  .add_shops
    width: 100%
    display: flex
    align-items: flex-start
    margin-top: 21px
    .box-wrapper
      flex: 0 0 40%
      display: flex
      flex-wrap: wrap
      justify-content: center
      overflow: hidden
      position: relative
      i.cancel_shop
        display: inline-block
        width: 50px
        height: 50px
        border-radius: 50%
        background: url("~@/assets/img/shopMgr/cancel.png") no-repeat center
        background-size: 100% 100%
        position: absolute
        top: 0
        right: 0
      .add_shop
        width: 100%
        height: 660px
        border: 2px solid #CCCCCC
        font-size: 34px
        color: #000000
      .shop-card
        width: 100%
        height: 660px
        display: flex
        justify-content: center
        align-items: center
        flex-wrap: wrap
        background-color: #FFFFFF
        .img_box
          width: 100%
          height: 458px
          padding: 16px 0
          border: 1px solid #CCCCCC
          text-align: left
          i.shopImg
            display: inline-block
            width: 100%
            height: 100%
            background-position: center
            background-repeat: no-repeat
            background-size: 100% 100%
            position: relative
        span.name
          width: 100%
          font-size: 30px
          color: #000
          +singleFile()
        span.desc
          width: 100%
          text-align: left
          color: #999999
          font-size: 26px
          +singleFile()
        span.sell
          width: 100%
          color: #333333
          font-size: 24px
          +singleFile()
          strong
            display: inline-block
            color: #FF0000
            font-size: 26px
  // 小图
  .add_other_shop
    width: 100%
    margin-top: 45px
    display: flex
    flex-wrap: wrap
    // justify-content: space-between
    .box-wrapper
      flex: 0 0 30%
      // padding: 0 20px
      // margin: 20px auto 0
      display: flex
      justify-content: center
      overflow: hidden
      position: relative
      margin: 20px 10px 0
      &:nth-child(3n)
        margin-right: 0
      i.cancel_shop
        display: inline-block
        width: 50px
        height: 50px
        border-radius: 50%
        background: url("~@/assets/img/shopMgr/cancel.png") no-repeat center
        background-size: 100% 100%
        position: absolute
        top: 0
        right: 0
      .add_shop
        width: 100%
        background-color: #FFFFFF
        min-height: 464px
        display: flex
        flex-wrap: wrap
        justify-content: center
        align-items: center
        border: 2px solid #CCCCCC
      .shop-cards
        width: 100%
        display: flex
        height: 464px
        flex-wrap: wrap
        background-color: #FFFFFF
        &:nth-child(3n)
          margin-right: 0
        .img_box
          width: 100%
          height: 332px
          padding: 12px 0
          border: 2px solid #cccccc
          i.shopImg
            display: inline-block
            width: 100%
            height: 100%
            background-repeat: no-repeat
            background-position: center
            background-size: 100% 100%
            position: relative
            // i.cancel_shop
            //   display: inline-block
            //   width: 50px
            //   height: 50px
            //   border-radius: 50%
            //   background: url("~@/assets/img/shopMgr/cancel.png") no-repeat center
            //   background-size: 100% 100%
            //   position: absolute
            //   top: -25px
            //   right: -25px
        span.name
          width: 100%
          font-size: 26px
          color: #000
          overflow: hidden
          +singleFile()
        span.desc
          width: 100%
          text-align: left
          color: #999999
          font-size: 22px
          +singleFile()
        span.sell
          width: 100%
          color: #333333
          font-size: 22px
          +singleFile()
          strong
            display: inline-block
            color: #FF0000

  .save
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 98px
    line-height: 98px
    font-size: 32px
    color: #ffffff
    background-color: #F67C2F
    text-align: center
</style>
