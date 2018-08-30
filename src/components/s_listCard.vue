<template>
  <div class="order-shop-card">
    <div class="item-card">
      <div v-if="edit" class="select-box" @click="select"><i class="select" :class="check && 'active'"></i></div>
      <div class="img"><img :src="getImg1"></div>
      <div class="desc">
        <p class="title">{{shop.name}}</p>
        <p class="tips"><span>档口:{{shop.stallInfo1 + '-' + shop.stallInfo2 +'-'+ shop.stallInfo3}}</span></p>
        <p class="sellnum">货期:{{shop.delivery}}丨销量:{{shop.sellCount}}</p>
        <p class="collage_price">拼团价: {{groupPrice ? '￥' + groupPrice : '未设置'}}</p>
        <p class="price">
          <span>售价:￥{{shop.sellPrice}}</span>
          <span class="sell">&nbsp;&nbsp;&nbsp;利润:￥{{shop.profit}}</span>

        </p>
        <span class="more-icon" @click="toOpen('visible4')">编辑</span>
      </div>
    </div>
    <i-modal :visible="visible4" @ok="comfirmGPrice('visible4')" @cancel="toClose('visible4')">
      <div class="m_box">
        <p>售价：￥{{shop.sellPrice}}</p>
        <p>利润：￥{{shop.profit}}</p>
        <div class="col_price">拼团价：<div class="p_input"><input v-model="groupPrice"  type="number"/></div>元</div>
      </div>

    </i-modal>
    <i-message id="message" />
  </div>
</template>
<script>
import mixin from '@/mixin'
import noImage from '@/assets/img/shopMgr/noImage.png'
export default {
  mixins: [mixin],
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    shop: {
      type: Object,
    }
  },
  data(){
    return {
      check: false,
      visible4: false,
      groupPrice: ''
    }
  },
  computed: {
    getImg1(){
      if(this.shop.images){
        return this.shop.images.split(',')[0]
      } else {
        return noImage
      }
    },
  },
  methods: {
    select(){
      if(this.groupPrice == '') {
        this.$Message({
          content: '请先拼团价格',
          type: 'warning'
        })
        return
      }
      this.check = !this.check
      this.$emit('switchSel', this.shop.id, this.groupPrice, this.check)
    },
    comfirmGPrice(name){
      this.toClose(name)
      if(this.groupPrice) {
        // 保存拼团价格
        // 通知父组件
        const obj = {
          id: this.shop.id,
          price: this.groupPrice
        }

        this.$emit('setGroupPrice',obj)
      }

    }

  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.m_box
  padding-left:  130px
  text-align: left
  color: #000
  p
    padding-bottom: 15px
  .col_price
    // height: 52px
    // line-height: 52px
    .p_input
      +border(1px,all, #ccc)
      width: 167px
      display: inline-block
      margin-right: 10px
.collage_price
  color: #333
  font-size: 24px
.select-box
  width: 60px
  position: relative
.select
  +select()
.active
  +select-active
.order-shop-card

.more-icon
  +icon(40px)
  width: 70px
  +center
  right: 24px
  +border(1px,all,#EE7527)
  border-radius: 10px
  color: #EE7527
  text-align: center
  line-height: 40px
  font-size: 24px
.sellnum
  font-size: 24px
  color: #999
.item-card
  display: flex
  text-align: left
  padding: 32px 16px 28px 24px
  // +border(1px,bottom)
  background: #fff
  position: relative
  margin-bottom: 8px
  .img
    +icon(240px)
    border-radius: 12px
    overflow: hidden
  .desc
    padding-left: 20px
    max-width: 450px
    .title
      +moreLine(2)
      font-size: 28px
    .tips
      padding-top: 8px
      color: #999
      span
        padding: 8px 9px 8px 5px
        background: #F5F5F5
        font-size: 22px
    .price
      color: #FF0000
      font-weight: bold
      font-size: 28px
      .sell
        color: #333
        font-size: 26px
        font-weight: 500



</style>
