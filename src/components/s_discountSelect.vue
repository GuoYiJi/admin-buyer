<template>
  <div class="order-shop-card">
    <div class="item-card">
      <i class="select" v-if="edit" @click="select(shop.disPrice)" :class="[check ? 'active' : 'close']"></i>
      <i class="img" :style="{backgroundImage: 'url(' + shop.image + ')'}"></i>
      <div class="desc">
        <p class="title">{{shop.name}}</p>
        <span class="stall">档口:{{shop.stallInfo1 + '-' + shop.stallInfo2 +'-'+ shop.stallInfo3}}</span>
        <div class="tips">
          <span class="count">货期:{{shop.delivery}}丨销量:{{shop.sellCount}}</span>
          <button class="edit" @click="toOpen('visible1')">编辑</button>
        </div>
        <p class="collage_price">折扣价: {{shop.disPrice ? '￥' + shop.disPrice : '未设置'}}</p>
        <p class="price">
          <span>售价:￥{{shop.sellPrice}}</span>
          <span class="sell">&emsp;利润:￥{{shop.profit}}</span>
        </p>
      </div>
    </div>
    <!-- <i class="more" @click="toOpen('visible4')"></i> -->
    <i-modal :visible="visible1" @ok="comfirmGPrice('visible1', shop.disPrice)" @cancel="toClose('visible1')">
      <ul class="m_box">
        <li>售价：￥{{shop.sellPrice}}</li>
        <li>利润：￥{{shop.profit}}</li>
        <li>折扣价<input v-model="shop.disPrice"  type="input"/>元</li>
      </ul>
    </i-modal>
    <i-toast id="toast" />
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
      visible1: false,
      // visible4: false,
      // groupPrice: '',
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
    select(disPrice){
      if(disPrice == '') {
        this.$Toast({
          content: '请先填写折扣价格',
          type: 'warning'
        })
        return
      }
      this.check = !this.check
      this.$emit('switchSel', this.shop.id, disPrice, this.check)
    },
    comfirmGPrice(name, disPrice){
      this.toClose(name)
      if(!disPrice) {
        this.$Toast({
          content: '折扣价格不能为空',
          type: 'warning'
        })
        // 保存拼团价格
        // 通知父组件
        // const obj = {
        //   id: this.shop.id,
        //   price: this.groupPrice
        // }
        // this.$emit('setGroupPrice',obj)
      }else{
        // this.$API.updateDisGoods({
        //   goodsId: this.shop.id,
        //   disPrice
        // }).then(respons => {
        //   if(respons.code === 1) {
        //     this.$Toast({
        //       content: '修改成功',
        //       type: 'success'
        //     })
        //   }
        // })
      }
    },
    async comfirmDel(name){
      this[name] = false
      let state = 0
      if(this.act != '下架') state = 1
      await this.$API.switchShop({
        goodsIds: this.shop.id,
        state: state
      })
      this.show = false
      this.$success(this.act + '成功！')
    }
  },
  mounted() {
    if(!this.shop.disPrice) {
      this.shop.disPrice = ''
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.item-card
  display: flex
  text-align: left
  padding: 32px 16px 28px 24px
  // +border(1px,bottom)
  background-color: #ffffff
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
    +icon(240px)
    border-radius: 12px
    margin-right: 20px
    background-repeat: no-repeat
    background-position: center
    background-size: cover
  .desc
    flex: 1
    overflow: hidden
    display: flex
    flex-wrap: wrap
    .title
      width: 100%
      +moreLine(2)
      font-size: 28px
    span.stall
      width: 100%
      font-size: 26px
      color: #999999
      +singleFile
      background-color: #F5F5F5
    .tips
      width: 100%
      display: flex
      justify-content: space-between
      align-items: center
      padding-top: 8px
      color: #999
      span.count
        flex: 1
        display: flex
        justify-content: space-between
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
</style>
