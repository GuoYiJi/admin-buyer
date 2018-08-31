<template>
  <div class="order-shop-card" v-if="show">
    <div class="item-card" >
      <!-- :class="check && 'active'" -->
      <div v-if="edit" class="select-box" @click="select"><i class="select" :class="{'active': check}"></i></div>
      <div class="img"><img :src="shop.images"></div>
      <div class="desc">
        <p class="title">{{shop.name}}</p>
        <p class="tips"><span>档口:{{shop.stallInfo1 + '-' + shop.stallInfo2 +'-'+ shop.stallInfo3}}</span></p>
        <p class="sellnum">货期:{{shop.delivery}}丨销量:{{shop.sellCount}}</p>
        <p class="price">
          <span>售价:￥{{shop.sellPrice}}</span>
          <span class="sell">&nbsp;&nbsp;&nbsp;利润:￥{{shop.profit}}</span>

        </p>
        <i class="more-icon" @click="toOpen('visible4')"></i>
      </div>
    </div>
    <i-modal :visible="visible2" @ok="comfirmDel('visible2')" @cancel="toClose('visible2')">
      <div class="m_tips">确定要{{actions4[1].name}}该商品？</div>
    </i-modal>
    <i-modal title="请选择操作" :visible="visible4" :actions="actions4" :action-mode="vertical" @iclick="handleClick4"></i-modal>
  </div>
</template>
<script>
import noImage from '@/assets/img/shopMgr/noImage.png'
import mixin from '@/mixin'
export default {
  mixins: [mixin],
  props: {
    //编辑
    edit: {
      type: Boolean,
      default: false
    },
    //添加商品
    shop: {
      type: Object,
    },
    act: {
      type: String,
      default: '下架'
    },
    check: {
      type: Boolean,
      default: false
    }
  },
  $watch: {
    edit: (newV,old)=>{
      // if(!newV)
      this.check = false
      console.log(this.check)
    }
  },
  data(){
    return {
      // check: false,
      visible4: false,
      visible2: false,
      show: true,
      // vertical: '',
      actions4: [
        { name: "编辑" },
        { name: "下架" },
        { name: "分组" }
      ],
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
    // checkState(){
    //   return this.check
    // }
  },
  methods: {
    //点击选中按钮
    select(){
      //通知父组件 选中或取消
      if(this.check) {
        this.check = false
        console.log(this.shop);
        this.$emit('switchSel', this.shop.id, false, this.shop)
      }else {
        this.check = true
        this.$emit('switchSel', this.shop.id, true, this.shop)
      }

    },
    // selectAll(bool){
    //   this.check = bool
    // },
    handleClick4({ mp: { detail } }) {
      const index = detail.index
      this.visible4 = false
      if(index === 0) {
        //edit
        this.toRoute('home/addShop/addShop',this.shop)
      } else if(index === 1) {
        //下架 或上架
        this.visible2 = true
      } else if (index === 2) {
        //group
        this.toRoute('home/shopMgr/classify',{groupIds: this.shop.groupIds,goodsIds: this.shop.id })
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
    },
    // resetCheck(){
    //   this.check = false
    // }
  },
  mounted() {
    // this.check = false
    this.actions4[1].name = this.act
    console.log(this.shopList)
  },

}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.m_tips
  color: #000
  font-size: 32px
  padding: 40px 0
.select-box
  width: 60px
  position: relative
.select
  +select()
.active
  +select-active
.order-shop-card

.more-icon
  +bg-img('shopMgr/more.png')
  +icon(40px)
  height: 30px
  position: absolute
  bottom: 30px
  right: 24px
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
    .tips
      padding-top: 8px
      color: #999
      span
        padding: 8px 9px 8px 5px
        background: #F5F5F5
        font-size: 24px
    .price
      color: #FF0000
      font-weight: bold
      position: absolute
      bottom: 28px
      .sell
        color: #333
        font-size: 28px
        font-weight: 500



</style>
