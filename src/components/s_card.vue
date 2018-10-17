<template>
<div class="order-shop-card">
  <div class="item-card">
    <div v-if="edit" class="select-box" @click="select(shop.id, index)" :class="[selectedId == shop.id ? 'active' : '']">
      <!-- <i class="select" :class="{'active': check}"></i> -->
    </div>
    <i class="img" :style="{backgroundImage: 'url(' + shop.image + ')'}"></i>
    <div class="desc">
      <p class="title">{{shop.name}}</p>
      <p class="tips"><span>档口:{{shop.stallInfo1 + '-' + shop.stallInfo2 +'-'+ shop.stallInfo3}}</span></p>
      <p class="sellnum">货期:{{shop.delivery}}丨销量:{{shop.sellCount}}</p>
      <div class="price">
        <span class="countPrice">售价:￥{{shop.sellPrice}}</span>
        <span class="sell">&nbsp;&nbsp;&nbsp;利润:￥{{shop.profit}}</span>
        <span class="action" @click="handleActionClick" v-if="!edit">
          <span class="more-icon">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
        </span>
      </div>
      <!-- <i class="more-icon" @click="toOpen('visible4')"></i> -->
    </div>
  </div>
  <i-modal :visible="visible2" @ok="comfirmDel('visible2')" @cancel="toClose('visible2')">
    <div class="m_tips">确定要{{shop.state === 1 ? '下架' : '上架'}}该商品？</div>
  </i-modal>
  <i-modal :visible="visible3" @ok="confirmSet('visible3')" @cancel="toClose('visible3')">
    <ul class="m_tips">
      <li v-for="(groupItem, groupIndex) in groupList" :key="groupIndex" @click="selectIcon(groupItem.id, groupIndex)">
        <selectIcon :isSelected="isSelectList.some(item => item == groupItem.id)" />{{groupItem.name}}</li>
      </li>
    </ul>
  </i-modal>
  <i-modal title="请选择操作" :visible="visible4" :actions="actions4" :action-mode="vertical" @iclick="handleClick4"></i-modal>
</div>
</template>
<script>
import selectIcon from '@/components/selectIcon'
import mixin from '@/mixin'
export default {
  mixins: [mixin],
  components: {
    selectIcon
  },
  props: {
    //编辑
    edit: {
      type: Boolean,
      default: false
    },
    //添加商品
    shop: {
      type: Object,
      default: {}
    },
    act: {
      type: String,
      default: '下架'
    },
    selectedId: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
    // check: {
    //   type: Boolean,
    //   default: false
    // }
  },
  $watch: {
    edit: (newV, old) => {
      // if(!newV)
      this.check = false
      console.log(this.check)
    }
  },
  data() {
    return {
      check: false,
      visible4: false,
      visible2: false,
      visible3: false,
      groupList: [],
      isSelectList: []
      // selectedId: ''
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
    handleActionClick() {
      console.log(this.shop);
      const { state } = this.shop;

      wx.showActionSheet({
        itemList: ['编辑', state === 0 ? '上架' : '下架', '分组'],
        success: res => {
          switch (res.tapIndex) {
            case 0:
              //edit
              this.toRoute('home/addShop/editShop', {
                shopId: this.shop.id
              })
              break;
            case 1:
              //下架 或上架
              this.visible2 = true
              break;
            case 2:
              //group
              this.$API.searchType({
                types: 1
              }).then(response => {
                // console.log(this.shop.groupIds);
                this.groupList = response.data
                this.isSelectList = this.shop.groupIds.split(',')
                console.log(this.isSelectList);
                this.toOpen('visible3')
              })
              break;
          }
        }
      })
    },
    confirmSet(name) {
      if (this.isSelectList.every(item => item === '-1')) {
        wx.showToast({
          title: '请先选择商品',
          icon: 'none'
        })
        return
      }
      this.isSelectList = this.isSelectList.filter(item => {
        return item !== '-1'
      })
      this.$API.changeGroups2({
        goodsId: this.shop.id,
        groupIds: this.isSelectList.filter(item => !!item).toString()
      }).then(response => {
        wx.showToast({
          title: '修改分组成功',
          icon: 'success'
        })
        this.$emit('searchShopGroupItem')
        this.close(name)
      })
    },
    selectIcon(id, index) {
      if (this.isSelectList[index]) {
        this.$set(this.isSelectList, index, '')
      } else {
        this.$set(this.isSelectList, index, id)
      }
    },
    //点击选中按钮
    select(id, index) {
      console.log(id, index);
      //通知父组件 选中或取消
      if (this.selectedId) {
        // this.selectedId = ''
        // this.$emit('switchSel', this.shop.id, false, this.shop)
        this.$emit('switchSel', id, false, index)
      } else {
        // this.selectedId = id
        // this.$emit('switchSel', this.shop.id, true, this.shop)
        this.$emit('switchSel', id, true, index)
      }
      // if(this.check) {
      //   this.check = false
      //   console.log(this.shop);
      //   this.$emit('switchSel', this.shop.id, false, this.shop)
      // }else {
      //   this.check = true
      //   this.$emit('switchSel', this.shop.id, true, this.shop)
      // }

    },
    // selectAll(bool){
    //   this.check = bool
    // },

    async comfirmDel(name) {
      this[name] = false
      let state = 0
      if (this.act != '下架') state = 1
      await this.$API.switchShop({
        goodsIds: this.shop.id,
        state: state
      })
      this.show = false
      this.$success(this.act + '成功！')
      setTimeout(() => {
        this.$emit('deleteItem', this.shop.id)
      }, 1000)
    },
    // resetCheck(){
    //   this.check = false
    // }
  },
  mounted() {
    // this.check = false
    // console.log(this.shopList)
  },

}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.order-shop-card
  width: 100%
  .item-card
    width: 100%
    display: flex
    align-items: center
    padding: 30px 0
    background-color: #ffffff
    margin-bottom: 10px
    // .select-box
    //   width: 60px
    //   position: relative
    // .select
    //   +select()
    // .active
    //   +select-active
    .select-box
      width: 40px
      height: 40px
      margin-left: 20px
      border-radius: 50%
      border: 1px solid #CCCCCC
      &.active
        background: url("~@/assets/img/storeMgr/select.png") no-repeat center
        background-size: 100% 100%
        // border: none
    // .select
    //   +select()
    // .active
    //   +select-active
    i.img
      width: 240px
      height: 240px
      margin: 0 20px
      background-position: center
      background-repeat: no-repeat
      background-size: cover
    .desc
      flex: 1
      overflow: hidden
      display: flex
      flex-wrap: wrap
      padding-right: 20px
      p.title
        width: 100%
        +moreLine(2)
        font-size: 26px
        font-weight: bold
      p.tips
        width: 100%
        padding-top: 8px
        color: #999
        span
          padding: 5px
          background: #F5F5F5
          font-size: 24px
          border-radius: 5px
      p.sellnum
        width: 100%
        font-size: 24px
        color: #999
    .price
      width: 100%
      display: flex
      align-items: center
      .countPrice
        flex: 1
        +singleFile()
        color: #FF0000
        font-size: 28px
        font-weight: bold
      .sell
        flex: 1
        +singleFile()
        color: #333333
        font-size: 26px
      .action
        position: relative;
        height: 100%;
      .more-icon
        display: flex;
        align-items: center;
        padding-left: 20px;
        height: 100%;
        span.dot
          display: inline-block;
          margin-left: 5px;
          width: 10px
          height: 10px
          border-radius: 50%
          background-color: #000
          &:first-child
            margin-left: 0;
ul.m_tips
  max-height: 650px
  display: flex
  flex-wrap: wrap
  padding: 20px 0
  overflow-y: scroll
  li
    width: 100%
    font-size: 26px
    display: flex
    align-items: center
    padding: 10px 160px
    // i.select-icon
    //   display: inline-block
    //   width: 30px
    //   height: 30px
    //   border-radius: 50%
    //   border: 1px solid #CCCCCC
    //   margin-right: 10px
    //   &.active
    //     background: url("~@/assets/img/storeMgr/select.png") no-repeat center
    //     background-size: 100% 100%
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
// .order-shop-card
//
// // .more-icon
// //   +bg-img('shopMgr/more.png')
// //   +icon(40px)
// //   height: 30px
// //   position: absolute
// //   bottom: 30px
// //   right: 24px
// .sellnum
//   font-size: 24px
//   color: #999
// .item-card
//   display: flex
//   text-align: left
//   padding: 32px 16px 28px 24px
//   // +border(1px,bottom)
//   background-color: #fff
//   position: relative
//   margin-bottom: 8px
//   i.img
//     width: 240px
//     height: 240px
//     border-radius: 12px
//     overflow: hidden
//     background-position: center
//     background-repeat: no-repeat
//     background-size: 100% 100%
//     .desc
//     padding-left: 20px
//     max-width: 450px
//     .title
//       +moreLine(2)
//     .tips
//       padding-top: 8px
//       color: #999
//       span
//         padding: 8px 9px 8px 5px
//         background: #F5F5F5
//         font-size: 24px
//     .price
//       color: #FF0000
//       bottom: 28px
//       .sell
//         color: #333
//         font-size: 28px
//         font-weight: 500
//       .more-icon
//         width: 40px
//         height: 30px
//         span.dot
//           width: 33.3%
//           height: inherit
//           display: flex
//           justify-content: center
//           align-items: center
//           i
//             display: inline-block
//             width: 5px
//             height: 5px
//             border-radius: 50%
//             background-color: #000000

</style>
