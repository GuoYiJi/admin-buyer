<template>
  <div class="nav">
    <div v-for="(item,index) in navData" :key="index">
      <div class="kuang">
        <div class="head">
          <p class="order">订单编号：{{item.orderNo}}</p>
          <p class="state" v-if="item.ping"> 
            {{item.state==1?'未支付':item.state==2?'取消':item.state==3?'已支付':item.state==4?'支付失败':item.state==5?'未发货':item.state==6?'已发货':item.state==7?'交易成功':item.state==8?'交易关闭':'拼单中'}}
              ，
            <span>
              还差{{item.ping.num-item.pingUser.length}}人
            </span>
          </p>
        </div>
        <div class="middle">
          <div class="picture" v-for="(itemss,idss) in item.orderGoods" :key="idss">
            <img class="imgOne" :src="itemss.image">
          </div>
          <i class="sanJiao"></i>
        </div>
        <div class="jieShuan">
          <div class="quantity" v-for="(itemss,idss) in item.orderGoods" :key="idss">
            共{{itemss.skuList.length}}个款，合计{{item.num}}件
          </div>
          <div class="money">订单金额：
            <p class="money1">{{item.count}}元</p>
          </div>
          <div class="phone">收货人:{{item.name}} {{item.phone}}</div>
        </div>
        <div class="foot">
          <div class="picture_1" v-for="(itemzz,idzz) in item.pingUser" :key="idzz">
            <img class="imgTwo" :src="itemzz.head">
          </div>
          <div class="btn">
            <span class="see" @click="details(item.id)">查看详情</span>
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
            navData: [],
            orderId: '',
        };
    },
    methods: {
        async orderGoods(){
          const L_selectOrderData = await this.$API.L_selectPingChildrenOrder({
            pingOrderId: this.orderId
          });
          
          this.navData = L_selectOrderData.data

        },
        
        //跳转详情页面
        details(id){
          this.$router.push({path:"/pages/home/orderMgr/mail/delivery",query:{orderId: id}})
        },
    },
    mounted() {
      this.orderId = this.$route.query.id
      this.orderGoods();
    }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
page 
  background: #f5f5f5
.kuang
  width: 702px
  height: 496px
  background: #fff
  margin: 20px 24px
  .head
    height: 68px
    width: 100%
    line-height: 68px
    border-bottom: 1px solid #f5f5f5
    font-size: 23px
    display: flex
    .order
      display: inline-block
      flex: 2
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

</style>
