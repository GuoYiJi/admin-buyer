<template>
<div class="home">
  <i-toast id="toast" />
  <div class="title_box">
    <input class="input_title" placeholder="请输入标题" v-model="title"/>
  </div>
  <!-- 添加大图 -->
  <div class="add_shops" v-if="false">
    <div class="box-wrapper">
      <div class="shop-card" v-if="shopMatch[0]">
        <div class="img_box">
          <i class="shopImg" :style="{backgroundImage: 'url(' + shopMatch[0].image + ')'}">
            <i class="cancel_shop" @click="toCancel(0)"></i>
          </i>
        </div>
        <span class="name">{{shopMatch[0].name}}</span>
        <span class="desc"> 货期:{{shopMatch[0].delivery}}丨销量:{{shopMatch[0].sellCount}}</span>
        <span class="sell"><strong>售价:￥{{shopMatch[0].sellPrice}}</strong> 利润:￥{{shopMatch[0].profit}}</span>
      </div>
      <div class="shop-card add_shop" @click="toRoute('home/shopMgr/matchList')" v-else>+添加商品</div>
      <!-- <i class="cancel_shop" @click="toCancel(0)"></i> -->
    </div>
  </div>
  <!-- 添加小图 -->
  <div class="add_other_shop">
    <div class="box-wrapper" v-for="(item,idx) in shopMatch" :key="idx">
      <div class="shop-cards">
        <div class="img_box">
          <i class="shopImg" :style="{backgroundImage: 'url(' + item.image + ')'}">
            <i class="cancel_shop" @click="toCancel(idx)"></i>
          </i>
        </div>
        <span class="name">{{item.name}}</span>
        <span class="desc">货期:{{item.delivery}}丨销量:{{item.sellCount}}</span>
        <span class="sell"><strong>售价:￥{{item.sellPrice}}</strong> 利润:￥{{item.profit}}</span>
      </div>
      <!-- <i class="cancel_shop" @click="toCancel(idx)"></i> -->
    </div>
    <div class="box-wrapper" v-if="shopMatch.length < 50">
      <div class="shop-cards add_shop" @click="toRoute('home/shopMgr/matchList')">+添加商品</div>
      <!-- <i class="cancel_shop" @click="toCancel(idx)"></i> -->
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
      matchGoodsList: [],
      id: '',
      title: '',
      shopId: '',
      // goodsIds: [],
      selectShopArr: []
    };
  },
  computed: {
    ...mapState(["shopMatch"]),
    goodsIds() {
      let arr = []
      this.shopMatch.forEach((item, index) => {
        arr[index] = item.goodsId
      })
      return arr;
    }
  },
  methods: {
    // pageTo() {
    //   this.$router.push('shopMgr/matchList');
    // },
    // toRoute(path,shopNum){
    //   this.$router.push({ path, query: {type: 'groupSetting',shopNum: shopNum }} )
    // },
    toCancel(index) {
      console.log(index);
      // this.shopMatch.splice(index, 1);
      this.$store.commit('SPLICEMATCH', index);
      this.goodsIds.splice(index, 1);
      console.log(this.goodsIds);
      // this.matchGoodsList[index] = null;
      // this.$set(this.matchGoodsList, index, {images: null,name: null, delivery: null, sellCount: null, sellPrice: null, profit: null });
    },
    addShopList(){
      // this.$router.push('/pages/home/shopMgr/matchList')
      this.$router.push('/pages/')
      // console.log(this.$router.push( '/pages/home/orderMgr/mail/delivery'))
    },
    submit() {
      // const s_addMatch = await API.s_addMatch();
      if(!this.title) {
        this.$Toast({
            content: '未设置系列标题',
            type: 'error'
        })
      }else if(this.title.length > 8) {
        this.$Toast({
          content: '标题字数最多为8个',
          type: 'error',
        })
      }else if(this.shopMatch.length >= 50){
        this.$Toast({
            content: '最多添加50个商品, 请检查',
            type: 'error'
        })
      }else if(this.shopMatch.length === 0){
        this.$Toast({
            content: '请添加商品',
            type: 'error'
        })
      }else {
        console.log(this.goodsIds);
        this.$API.s_addMatch({
          title: this.title,
          goodsIds: this.goodsIds.toString()
        }).then(response => {
          console.log(response);
          if(response.code === 1) {
            this.$Toast({
                content: '创建成功',
                type: 'success'
            })
            this.$router.back(-1)
          }
        })
      }
    }
  },
  // updated() {
  //   console.log(this.shopMatch);
  //   this.shopMatch.forEach((item, index) => {
  //     this.goodsIds[index] = item.id;
  //   })
  //   console.log(this.goodsIds);
  // }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  padding: 20px 22px
  .title_box
    width: 100%
    height: 150px
    border: 1px solid #CCCCCC
    // margin: 0 auto
    overflow: hidden
    background-color: #FFFFFF
    input
      width: 100%
      height: 100%
      font-size: 32px
      color: #000000
      line-height: 100%
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
    justify-content: flex-start
    // justify-content: space-around
    margin-top: 21px
    border-radius: 10px
    .box-wrapper
      flex: 0 0 40%
      display: flex
      flex-wrap: wrap
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
        top: -10px
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
        background-color: #ffffff
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
            i.cancel_shop
              display: inline-block
              width: 50px
              height: 50px
              border-radius: 50%
              background: url("~@/assets/img/shopMgr/cancel.png") no-repeat center
              background-size: 100% 100%
              position: absolute
              top: -10px
              right: 0
        span.name
          padding-left: 5px
          width: 100%
          font-size: 30px
          color: #000
          +singleFile()
        span.desc
          padding-left: 5px
          width: 100%
          text-align: left
          color: #999999
          font-size: 26px
          +singleFile()
        span.sell
          padding-left: 5px
          width: 100%
          color: #333333
          font-size: 28px
          +singleFile()
          strong
            display: inline-block
            color: #FF0000
            font-size: 30px
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
      margin: 20px 10px 0
      &:nth-child(3n)
        margin-right: 0
      display: flex
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
    color: #FFFFFF
    background-color: #F67C2F
    text-align: center
</style>
