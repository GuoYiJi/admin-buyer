<template>
  <div class="order-shop-card">
    <div class="item-card">
      <i class="select" v-if="edit" @click="select" :class="[check ? 'active' : 'close']"></i>
      <i class="img" :style="{backgroundImage: 'url(' + shop.images + ')'}"></i>
      <div class="desc">
        <p class="title">{{shop.name}}</p>
        <span class="stall">档口:{{shop.stallInfo1 + '-' + shop.stallInfo2 +'-'+ shop.stallInfo3}}</span>
        <span class="count">
          <p>货期:{{shop.delivery}}丨销量:{{shop.sellCount}}</p>
          <button class="edit" @click="toOpen('visible4')">编辑</button>
        </span>
        <p class="collage_price">折扣价: {{groupPrice ? '￥' + groupPrice : '未设置'}}</p>
        <p class="price">
          <span>售价:￥{{shop.sellPrice}}</span>
          <span class="sell">&nbsp;&nbsp;&nbsp;利润:￥{{shop.profit}}</span>
        </p>
      </div>
    </div>
    <i-modal :visible="visible4" @ok="comfirmGPrice('visible4')" @cancel="toClose('visible4')">
      <ul class="m_box">
        <li>售价：￥{{shop.sellPrice}}</li>
        <li>利润：￥{{shop.profit}}</li>
        <li>折扣价<input v-model="groupPrice"  type="number"/>元</li>
      </ul>

    </i-modal>
    <i-message id="message" />
  </div>
</template>
<script>
import mixin from '@/mixin'
// import noImage from '@/assets/img/shopMgr/noImage.png'
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
    // getImg1(){
    //   if(this.shop.images){
    //     return this.shop.images.split(',')[0]
    //   } else {
    //     return noImage
    //   }
    // },
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
ul.m_box
  padding: 10px 80px 0
  display: flex
  flex-wrap: wrap
  justify-content: center
  background-color: #ffffff
  font-size: 32px
  li
    width: 100%
    padding: 5px 0
    overflow: hidden
    text-align: left
    display: flex
    align-items: center
    font-size: 32px
    +singleFile
    &:last-of-type
      border: none
    input
      display: inline-block
      width: 167px
      height: 45px
      line-height: 45px
      text-align: center
      border: 2px solid #CCCCCC
      margin: 0 10px
      overflow: hidden
.item-card
  display: flex
  text-align: left
  padding: 32px 16px 28px 24px
  // +border(1px,bottom)
  background: #fff
  position: relative
  margin-bottom: 8px
  i.select
    display: inline-block
    width: 40px
    height: 40px
    border-radius: 50%
    margin: auto 20px
    background-position: center
    background-repeat: no-repeat
    background-size: 100% 100%
  i.active
    background-image: url("~@/assets/img/storeMgr/select.png")
  i.close
    background-image: url("~@/assets/img/home/select.png")
  .img
    display: inline-block
    width: 240px
    height: 240px
    border-radius: 12px
    margin-right: 20px
    background-repeat: no-repeat
    background-position: center
    background-size: 100% 100%
  .desc
    flex: 1
    overflow: hidden
    display: flex
    flex-wrap: wrap
    .title
      width: 100%
      +moreLine(2)
      font-size: 28px
    .tips
      width: 100%
      display: flex
      justify-content: space-between
      align-items: center
      padding-top: 8px
      color: #999
    span.stall
      width: 100%
      font-size: 26px
      color: #999999
      +singleFile
      background-color: #F5F5F5
    span.count
      width: 100%
      display: flex
      justify-content: space-between
      p
        flex: 1
        font-size: 26px
        color: #999999
        +singleFile
      button.edit
        color: #EE7527
        border: 2px solid #EE7527
        border-radius: 10px
        padding: 5px
        font-size: 26px
    .collage_price
      width: 100%
      text-align: left
      font-size: 28px
      color: #333333
      +singleFile
    .price
      width: 100%
      color: #FF0000
      font-weight: bold
      font-size: 30px
      +singleFile
      .sell
        color: #333
        font-size: 28px
        font-style: normal
</style>
