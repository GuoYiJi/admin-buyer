<template>
  <div class="nav">
    <div v-for="(item,index) in yesGoods" :key="index">
      <div class="kuang">
        <div class="head">
          <p class="order">订单编号：{{item.orderNo}}</p>
          <p class="state">
            {{item.state==1?'待支付':item.state==2?'已取消':item.state==3?'已支付':item.state==4?'支付失败':item.state==5?'待发货':item.state==6?'已发货':item.state==7?'已完成':item.state==8?'已关闭':item.state==9?'拼单':'售后'}} 
           
          </p> 
        </div>
        <div class="middle"  @click="sanJiaoBut(item)">
          <div class="picture" v-for="(itemzz,num) in item.orderGoods" :key="num">
            <img class="imgOne" :src="itemzz.image">
          </div>
          <i class="sanJiao"></i>
        </div>
        <div class="jieShuan" v-if="(item.layer!=-1 )">
          <div class="quantity">共{{item.num}}个款，合计{{item.num}}件</div>
          <div class="money">订单金额：
            <p class="money1">{{item.count}}元</p>
          </div>
          <div class="phone">收货人:{{item.receiptName}} {{item.phone}}</div>
        </div>
        <div class="number_1" v-if="(item.layer!=-1 )">
          <scroll-view scroll-y lower-threshold='80' style="height: 80%;  overflow-y: hidden;">
            <div class="completed" v-for="(childrenzz,idRen) in item.children" :key="idRen" @click="childrenBut(childrenzz.id)">
              <div class="completed_1">子订单编号
                {{childrenzz.state==1?'未支付':childrenzz.state==2?'取消':childrenzz.state==3?'已支付':childrenzz.state==4?'支付失败':childrenzz.state==5?'未发货':childrenzz.state==6?'已发货':childrenzz.state==7?'交易成功':childrenzz.state==8?'交易关闭':'拼单中'}} 
              ：{{childrenzz.orderNo}}</div>
              <i class="sanjiao"></i>
            </div>
          </scroll-view>
        </div>
        <div class="foot">
          <div class="picture_1" v-for="(pingUser,idPin) in item.pingUser" :key="idPin" v-if="idPin < 3">
            <img class="imgTwo" :src="pingUser.head">
          </div>
          <div class="btn">
            <span v-if="(item.layer != -1 )" class="see" @click="seeBut(item.id)">查看详情</span>
            <span v-if="(item.layer != -1 )" class="close" @click="seeLogistics(item.id)">查看物流</span>
            <span v-if="(item.layer == -1 )" class="collage" @click="seeSuborder(item.id)">查看子拼团</span>
          </div>
        </div>
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
            btn: 0,
            navData: [],
            groupOrderzz: []
        };
    },
    props: {
      yesGoods: {
        type: Array,
        default: []
      }
    },
    methods: {
        close() {
            wx.showModal({
                // title: "提示",
                content: "确定关闭订单！",
                success: function(res) {
                    console.log(res);
                    if (res.confirm) {
                        console.log("用户点击确定");
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                }
            });
        },
        sanJiaoBut(item){
          this.$router.push({path:'/pages/home/orderMgr/orderdetails',query:{item: JSON.stringify(item)}})
        },
        seeBut(id){
          this.$router.push( {path:'/pages/home/orderMgr/collage/collect', query:{orderId: id}})

        },
        seeLogistics(id){
          this.$router.push( {path:'/pages/home/orderMgr/mail/logistics', query:{orderId: id}})
        },
        //查看子订单详情
        childrenBut(id){
          this.$router.push({path:'collage/collect',query:{orderId: id}})
        },
        //跳转到子订单
        seeSuborder(id){
          this.$router.push({path:'suborders/suborders',query:{id}})
        },
    },
    mounted() {
    }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
page 
  background: #f5f5f5
.kuang
  width: 702px
  background: #fff
  margin: 20px 24px
  .head
    height: 68px
    width: 100%
    line-height: 68px
    border-bottom: 1px solid #f5f5f5
    font-size: 26px
    display: flex
    .order
      display: inline-block
      flex: 4.5
      margin-left: 20px
    .state
      display: inline-block
      flex: 1
  .middle
    height: 200px
    border-bottom: 1px solid #f5f5f5
    line-height: 200px
    .picture
      margin: 20px 0 0 20px 
      display: inline-block
      .imgOne
        width: 160px
        height: 160px
    .sanJiao
      width: 16px
      height: 29px
      +bg-img('home/shanJiao.png')
      float: right
      margin: 86px 20px
  .jieShuan
    height: 105px
    font-size: 22px
    border-bottom: 1px solid #f5f5f5
    .quantity
      margin: 20px 0 0 20px
      display: inline-block
    .money
      margin: 20px 20px 0 0
      float: right
      display: inline-block
      .money1
        display: inline-block
        font-size: 28px
        color: #FF0000
    .phone
      margin: 10px 0 0 20px
  .foot
    height: 120px
    line-height: 120px
    .picture_1
      float: left
      margin: 18px 0 0 21px
      display: inline-block
      .imgTwo
        width: 84px
        height: 84px
        margin: 0 5px 0 5px
      .imgThree
        width: 84px
        height: 84px
        margin: 0 5px 0 5px
      .imgFour
        width: 84px
        height: 84px
        margin: 0 5px 0 5px
        bakcground: #999
    .btn
      font-size: 22px
      display: inline-block
      float: right
      text-align: center
      .see
        display: inline-block
        width: 130px
        height: 60px
        background: rgba(246,124,47,1)
        border-radius: 8px
        color: #fff
        margin: 30px 20px 0 0
        line-height: 60px
      .close
        display: inline-block
        width: 130px
        height: 60px
        background: #fff
        border-radius: 8px 
        border: 1px solid #999999
        color: #999
        line-height: 60px
        margin: 30px 20px 0 0
      .collage
        display: inline-block
        width: 180px
        height: 60px
        background: rgba(246,124,47,1)
        border-radius: 8px
        color: #fff
        margin: 30px 20px 0 0
        line-height: 60px
.closeTipAll 
  background: rgba(0,0,0,0.4)
  // background-color: #000
  width: 100%
  height: 100%
  position: fixed
  top: 0
  z-index: 9999
  .closeTip
    opacity: 1 
    width: 550px
    height: 260px
    margin: 0 auto
    background: #fff
    margin-top: 300rpx
    .closeTip_text
      padding: 10px
      text-align: center
      textarea
        text-align: left
        width: 530px
        height: 200px
      p
      .tipText
        margin: 40px
        // margin-top: 40px
    .confirm_but
      margin-top: 40px
      display: flex
      div
        width: 100%
      div:nth-child(1) button
        background: #CCCCCC
        color: #000000
        width: 100%
        // height: 70px
        border-radius: 0px
        padding: 20px 0 20px 0
      div:nth-child(2) button
        background: #F67C2F
        color: #ffffff
        width: 100%
        // height: 70px
        border-radius: 0px
        padding: 20px 0 20px 0

    .closeTip_but
      display: flex
      margin-top: 20px
      div
        width: 100%
      div:nth-child(1) button
        background: #CCCCCC
        color: #000000
        width: 100%
        // height: 70px
        border-radius: 0px
        padding: 20px 0 20px 0
      div:nth-child(2) button
        background: #F67C2F
        color: #ffffff
        width: 100%
        // height: 70px
        border-radius: 0px
        padding: 20px 0 20px 0  
.number_1
  margin-top: 10px
  // height: 184px
  // height: 400px
  background: #fff
  line-height: 90px
  font-size: 26px
  .completed
    border-bottom: 1px solid #f4f4f4
    display: flex
    padding-left: 25px
    .completed_1
      flex: 10
    .sanjiao
      +bg-img('home/shanJiao.png')
      margin: 30px
      width: 16px
      height: 29px
  .incomplete
    display: flex
    padding-left: 25px
    .incomplete_1
      flex: 10
    .sanjiao
      +bg-img('home/shanJiao.png')
      margin: 30px
      width: 16px
      height: 29px

</style>
