<template>
  <div class="component-wrapper">
    <div class="main-body" v-for="(orderGood, index) in goodsList" :key="index">
      <div class="goods-body">
        <i class="goods-img" :style="{backgroundImage: 'url(' + orderGood.image + ')'}"></i>
        <div class="goods-info">
          <span class="title">{{orderGood.name || '[商品未设置标题]'}}</span>
          <span class="details">
            <p class="stall">档口名称: {{orderGood.stallInfo3 || '无'}}</p>
            <p class="time">货期: {{orderGood.delivery}}</p>
          </span>
          <div class="footer">
            <div class="size">
              <span v-for="(skuItem, skuIndex) in skuList[index]" :key="skuIndex">
                {{skuItem.color}}色: {{skuItem.size}}码丨{{skuItem.num}}件
              </span>
            </div>
            <span class="num">X{{orderGood.countNum || orderGood.countGoodsNum}}</span>
            <!-- <button class="edit" @click="togglePopups(index)">编辑</button> -->
          </div>
        </div>
      </div>
      <div class="main-footer">合计: ￥{{orderGood.countPrice || orderGood.countGoods}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        goodsList: [],
        skuList: []
      }
    },
    mounted() {
      console.log(JSON.parse(this.$route.query.orderId));
      if(this.$route.query.orderId) {
        this.goodsList = JSON.parse(this.$route.query.orderId)
        let arr = []
        this.goodsList.forEach((item, index) => {
          arr.push([])
          item.skuList.forEach(skuItem => {
            arr[index].push({
              color: skuItem.skuCode.split(',')[0].toString(),
              size: skuItem.skuCode.split(',')[1].toString(),
              num: skuItem.num,
              deliver: 0,
              remain: skuItem.remainNum,
              skuId: skuItem.skuId
            })
          })
        })
        this.skuList = arr
      }
    }
  }
</script>

<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.component-wrapper
  .main-body
    padding: 10px 24px 0
    margin-bottom: 10px
    border-radius: 5px
    .goods-body
      // width: 100%
      padding: 20px
      display: flex
      +border(1px, bottom, #CCCCCC)
      background-color: #ffffff
      i.goods-img
        display: inline-block
        width: 160px
        height: 160px
        border-radius: 6px
        margin-right: 30px
        background-position: center
        background-size: 100% 100%
        background-repeat: no-repeat
      .goods-info
        flex: 1
        overflow: hidden
        display: flex
        flex-wrap: wrap
        span.title
          width: 100%
          +moreLine(2)
          font-size: 28px
          text-align: left
        span.details
          width: 100%
          font-size: 22px
          p.stall
            display: inline-block
            color: #ffffff
            background-color: #CCCCCC
            border-radius: 10px
            padding: 4px 8px
            margin-right: 20px
          p.time
            display: inline-block
            color: #999999
            background-color: #ffffff
        .footer
          width: 100%
          font-size: 22px
          display: flex
          align-items: center
          justify-content: space-between
          .size
            flex: 1
            overflow: hidden
            display: flex
            flex-wrap: wrap
            span
              width: 100%
              text-align: left
              color: #999999
              background-color: #ffffff
              +singleFile
              padding-bottom: 2px
          span.num
            width: 100px
            color: #999999
            font-size: 24px
            display: flex
            justify-content: center
            align-items: center
          // button.edit
          //   width: 100px
          //   height: 50px
          //   line-height: 50px
          //   color: #F67C2F
          //   margin-left: 10px
          //   background-color: #ffffff
          //   font-size: 24px
          //   +border(1px, all, #F67C2F)
    .main-footer
      padding: 20px
      color: #F67C2F
      font-size: 26px
      text-align: right
      background-color: #ffffff
</style>
