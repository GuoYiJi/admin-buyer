<template>
    <div class="nav" >
        <div v-for="(item,idx) in navDataAll" :key="idx">
            <div class="list" >
                <div class="kuang"  v-for="(itemss,idzz) in item.orderGoods" :key="idzz">
                    <img class="sPimg" :src="item.image" />
                    <div class="textThad">
                        <div class="title">{{itemss.name}}</div>
                        <div class="huo">
                            <text class="name">{{itemss.stallInfo3}}</text>
                            <div class="type">货期:{{itemss.delivery}}</div>
                            <span class="number">X{{itemss.num}}</span>
                        </div>
                        <div class="maShuo">{{itemss.skuCode}}/{{itemss.num}}件</div>
                    </div>
                </div>
                <div class="jiaGe">合计: ￥ {{item.countPrice}}</div>
            </div>
            <div class="foot">
                <span class="btn">共{{item.countNum}}件</span>
            </div>
        </div>
    </div>
</template>
<script>
import wx from "wx";
export default {
    components: {},
    data() {
        return {
            shuoo: 0,
            navData: [],
            navDataAll: []
        };
    },
    methods: {
        shuoLiang() {
            var that = this;
            var navData = this.navData;
            var shuo = 0;
            for (var i = 0; i < navData.length; i++) {
                shuo += navData[i].number;
            }
            that.shuoo = shuo;
        }
    },
    // 页面触底执行
    onReachBottom() {

    },
    async mounted() {
<<<<<<< HEAD
        // this.navData.push(JSON.parse(this.$route.query.item))
=======
>>>>>>> a264e0c11155e34cc520fa57a7212a4eabb2b1d0
      this.orderId = this.$route.query.orderId
      const L_selectOrderData = await this.$API.L_selectOrderDetail({
        orderId: this.$route.query.orderId
      });
      this.navData = L_selectOrderData.data
<<<<<<< HEAD
      console.log(this.navData)
=======
    //   console.log(this.navData.goodsList)
      this.navDataAll = this.navData.goodsList
>>>>>>> a264e0c11155e34cc520fa57a7212a4eabb2b1d0
    },
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
page
    background: #f5f5f5

.list
    margin: 20px 24px
    width: 702px
    // height: 270px
    background-color: #fff
    .kuang:last-child
        border-bottom: none
    .kuang
        display: flex
        border-bottom: 1px solid #cccccc
    .sPimg
        width: 160px
        height: 160px
        display: inline-block
        position: relative
        margin: 21px 20px
    .textThad
        display: inline-block
        width: 494px
        position: relative
        margin: 18px 0
        font-size: 22px
        .title
            +moreLine(2)
        .huo
            +singleFile
            .name
                display: inline-block
                background-color: #cccccc
                color: #fff
                padding: 4px 8px
            .type
                margin: 0 0 0 20px
                display: inline-block
                color: #999
            .number
                float: right
                margin-right: 12rpx
                color: #999
    .maShuo
        color: #999
    .jiaGe
        float: right
        color: #f67c2f
        margin-right: 12rpx
        padding-top: 4rpx

.foot
    width: 100%
    position: fixed
    bottom: 0px
    height: 98px
    background-color: #fff
    .btn
        width: 220px
        height: 98px
        float: right
        background-color: #f67c2f
        color: #fff
        font-size: 32px
        line-height: 98px
        text-align: center

</style>
