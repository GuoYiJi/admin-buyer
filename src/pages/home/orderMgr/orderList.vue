<template>
  <div class="home">
    <div class="add_video" v-if="goodsDetailData">
      <p class="a_title">商品主图</p>
      <div class="v_box">
        <img :src="goodsDetailData.images">
      </div>
    </div>
    <div class="line-box">
      <div class="line b_line">
        <p class="input">商品标题：<span>{{goodsDetailData.name}}</span></p>
      </div>
      <div class="line b_line" >
        <p class="input">市场档口：<span>{{goodsDetailData.stallInfo1}}</span></p>
        <p class="blur"></p>
      </div>
      <div class="line b_line">
        <p class="input">采购说明：</p>
        <p class="blur input_p_left"> {{goodsDetailData.buyExplan}}</p>
      </div>
      <div class="line b_line" >
        <p class="input"> 成本价：</span>{{goodsDetailData.costPrice}}元</span></p>
      </div>
      <div class="line" >
        <p class="input">利润：<span>{{goodsDetailData.profit}}元</span></p>
        
        <p class="input sale" >售价：<span class="red">{{goodsDetailData.sellPrice}}元</span></p>
      </div>
    </div>
    <div class="line-box">
      <div class="line b_line" >
        <p class="input">货期排单：</p>
        <p class="blur">{{goodsDetailData.delivery}}</p>
      </div>
      <div class="line b_line"  >
        <p class="input">品类：</p>
        <p class="blur"> {{goodsDetailData.labelInfo}}</p>
      </div>
      <div class="line b_line shopType" >
        <p class="input">规格与库存：</p>
        <div class="blur">
          <div >
            点击选择规格与库存  
          </div>
        </div>
      </div>
      <div class="line b_line" >
        <p class="input">版型：</p>
        <p class="blur">紧身</p>
      </div>
      <div class="line b_line">
        <p class="input">面料类型：</p>
        <p class="blur">棉质</p> 
      </div>
      <div class="line b_line"  >
        <p class="input">商品分组</p>
        <p class="blur input_p_left">上新、热销</p>
      </div>
      <div class="line b_line" @click="toOpen('showTag')">
        <p class="input">商品标签</p>
        <p class="blur input_p_left">商家认证；优质采购</p>
      </div>
      <div class="line b_line" >
        <p class="input">转售：</p>
        <div class="blur">
          <div class="sel_box">
            <div class="sel_item" >
              <p>不支持</p>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import vbox from '@/components/chooseVideo'
import ibox from '@/components/chooseImage'
import mixin from '@/mixin'
import config from '@/config'
import { $getUrl } from '@/utils'
import { mapState , mapGetters } from 'vuex'
export default {
  mixins: [mixin],
  components: {
    vbox,
    ibox
  },
  data() {
    return {
      goodsDetailData: [],
      L_selectDetail: [],
      warehouseData: [],
      orderGoodsList: []//保存商品清单详情

    };
  },
  computed: {
  },
  async mounted() {
    const L_selectGoodsDetailData = await this.$API.L_selectGoodsDetail({
        goodsId: this.$route.query.goodsId
      });
    console.lg(L_selectGoodsDetailData)
    this.goodsDetailData = L_selectGoodsDetailData.data
    console.log(this.goodsDetailData)
    this.L_selectDetail = L_selectGoodsDetailData.data
    // console.log(this.L_selectDetail.warehouse)
    this.warehouseData = this.L_selectDetail.warehouse
    this.pingUserData = this.L_selectDetail.pingUser
    this.orderGoodsList =  this.L_selectDetail.orderGoods
    console.log( this.orderGoodsList)

  }

};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.input_p_left
  padding-left: 20%
  width: 80%!important
.box-select
  display: flex
  justify-content: center
  text-align: center
  .s_item
    flex: 1
    p
      padding: 10px 0
    .active
      color: #F67C2F

.text_left
  text-align: left!important
.modal_box
  +mask(#222222c7)

.shopType
  height: 150px!important
  

.hasType
  display: flex
  flex-wrap: wrap
  padding-left: 150px
  p
    width: 160px
    height: 50px
    line-height: 50px
    +singleFile()

.sel_box
  display: flex
  padding: 0 90px
  .sel_item
    flex: 1
    position: relative
    p
      // padding-left: 35px
      text-align: center
    .select
      +select(30px)
      
    .active
      +select-active
// .model
.modal_time
  position: fixed
  bottom: 0
  left: 0
  right: 0
  background: #fff
  box-shadow: 8px 4px 29px rgba(8,0,0,0.32)
  .content
    display: flex
    padding: 30px 24px
    font-size: 28px
    flex-wrap: wrap
    // justify-content: flex-start
    .item
      width: 200px
      height: 110px
      line-height: 110px
      margin: 0 15px 30px 18px
      background: #F5F5F5
      color: #333
      text-align: center
      border-radius: 6px
      box-sizing: border-box
    .tag_item
      width: 200px
      position: relative
      margin: 0 15px 30px 18px
      p
        padding-left: 45px
      .select
        +select(35px)
      .select-active
        +select-active
    .active
      background: #F2C2A3!important
      color: #F67C2F
      +border(1px,all,#EE7527)
  .add_line
    padding: 30px 45px
    display: flex
    .add_btn
      padding: 20px 40px
      color: #fff
      background: #FE703E
      border-radius: 4px
      font-size: 28px
      margin-left: 20px
    .add_input
      width: 480px
      height: 30px
      +border(1px,all,#ccc)
      border-radius: 4px
      padding: 15px 10px
      font-size: 28px
  .top
    display: flex
    text-align: center
    height: 108px
    line-height: 108px
    font-size: 28px
    +border(1px,bottom,#ccc)
    p
      flex: 1
    .cancel
      color: #999
    .confirm
      color: #F67C2F
    .title
      font-size: 32px




.l_desc
  width: 70%!important
.desc_left
  padding-left: 180px
  text-align: left!important
.m_tips
  color: #333
  padding: 20px 0
.edit_footer
  display: flex
  justify-content: center
  padding: 30px 0px
  p
    width: 300px
    height: 90px
    line-height: 90px
    color: #fff
    font-size: 32px
    background: #ccc
    text-align: center
    border-radius: 6px
  .getUp
    background: #F67C2F
.footer
  padding: 30px 70px
  background: #fff
  display: flex
  justify-content: space-between
  p
    width: 300px
    height: 90px
    line-height: 90px
    color: #fff
    font-size: 32px
    background: #ccc
    text-align: center
    border-radius: 6px
  .getUp
    background: #F67C2F

.sale
  padding-left: 320px
.input_box
  +border(1px,all)
  +center
  left: 180px
  padding: 4px 8px 
.small
  width: 200px
.add_video
  background: #fff
  padding: 20px 24px
  margin-bottom: 20px
  .a_title
    color: #666
    padding-bottom: 20px 

.b_line
  +border(1px,bottom,#f5f5f5)
.line-box
  padding: 0 24px 
  background: #fff
  margin-bottom: 20px
.line
  display: flex
  height: 89px
  line-height: 89px
  position: relative
  .input
    height: 100% 
    padding-right: 8px
    color: #999
    .red
      color: #FF0000
  .blur
    color: #999
    font-size: 28px
    +center
    // right: 0
    width: 80%
    text-align: right
    right: 0
    // height: 89px
    +singleFile()
  .input_text
    height: 68px
    line-height: 108px
    padding: 20px  
</style>