<template>
  <div class="order-shop-card">
    <div class="item-card">
      <!-- <i class="select" v-if="edit" @click="select" :class="[check ? 'active' : 'close']"></i> -->
      <div class="img" :style="{backgroundImage: 'url(' + shop.images + ')'}"></div>
      <div class="desc">
        <p class="title">{{shop.name}}</p>
        <p class="tips">
          <span>档口:{{shop.stallInfo1 + '-' + shop.stallInfo2 +'-'+ shop.stallInfo3}}</span>
          <button class="group">{{shop.ping.num}}人成团</button>
        </p>
        <p class="sellnum">货期:{{shop.delivery}}丨销量:{{shop.sellCount}}</p>
        <p class="collage_price">拼团价: {{groupPrice ? '￥' + groupPrice : '未设置'}}</p>
        <p class="price">
          <span class="countPrice">售价:￥{{shop.sellPrice}}</span>
          <span class="sell">&nbsp;&nbsp;&nbsp;利润:￥{{shop.profit}}</span>
          <i class="more-icon" @click="toOpen('visible4')"></i>
        </p>
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
    // check: {
    //   type: Boolean,
    //   default: false
    // }
  },
  watch: {
    edit: (newV,old)=>{
      // if(!newV)
      this.edit = !this.edit
      console.log(this.edit)
    }
  },
  data(){
    return {
      check: false,
      visible4: false,
      visible2: false,
      // vertical: '',
      actions4: [
        { name: "编辑" },
        { name: "下架" },
        { name: "分组" },
        { name: "取消" }
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
        // this.$emit('switchSel', this.shop.id, false, this.shop)
      }else {
        this.check = true
        // this.$emit('switchSel', this.shop.id, true, this.shop)
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
        console.log(this.shop);
        this.toRoute('home/shopMgr/collage/collageMsg', {pingInfo: JSON.stringify(this.shop.ping), isEdit: true})
        // this.$emit('openEdit')
      } else if(index === 1) {
        //下架 或上架
        this.visible2 = true
      } else if (index === 2) {
        //group
        this.toRoute('home/shopMgr/classify',{groupIds: this.shop.groupIds,goodsIds: this.shop.id })
      }
      else if (index === 2) {
        //group
        this.toClose('visible4')
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
// .m_tips
//   color: #000
//   font-size: 32px
//   padding: 40px 0
// .select-box
//   width: 60px
//   position: relative
// .select
//   +select()
// .active
//   +select-active
.order-shop-card
  width: 100%
  min-height: 100%
  .item-card
    display: flex
    align-items: center
    text-align: left
    padding: 32px 16px 28px 24px
    // +border(1px,bottom)
    background: #fff
    margin-bottom: 10px
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
      width: 240px
      height: 240px
      border-radius: 12px
      margin-right: 20px
      background-position: center
      background-repeat: no-repeat
      background-size: 100% 100%
    .desc
      flex: 1
      display: flex
      flex-wrap: wrap
      justify-content: center
      overflow: hidden
      position: relative
      .title
        width: 100%
        +moreLine(2)
        font-size: 30px
      .tips, .sellnum
        width: 100%
        padding-top: 10px
        color: #999
        font-size: 26px
        +singleFile
      .tips
        display: flex
        align-items: center
        justify-content: space-between
        span
          flex: 1
          +singleFile
        button.group
          padding: 8px 15px
          color: #EE7527
          font-size: 26px
          border: 2px solid #EE7527
          border-radius: 20px
          margin-right: 35px
          +singleFile
      .collage_price
        width: 100%
        padding: 5px
        color: #333
        font-size: 28px
        +singleFile
      .price
        width: 100%
        display: flex
        flex-wrap: wrap
        align-items: center
        .countPrice
          flex: 1
          color: #FF0000
          font-size: 30px
          text-align: left
          +singleFile
        .sell
          flex: 1
          color: #333
          font-size: 28px
          text-align: left
          +singleFile
        i.more-icon
          display: inline-block
          width: 40px
          height: 40px
          background: url("~@/assets/img/shopMgr/more.png") no-repeat center
          background-size: 100% 100%
</style>
