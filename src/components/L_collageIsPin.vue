<template>
  <div class="nav">
    <div v-for="(item,index) in isPin" :key="index">
      <div class="kuang">
        <div class="head">
          <p class="order">订单编号：{{item.orderNo}}</p>
          <p class="state">{{item.state==1?'未支付':item.state==1?'未支付':item.state==2?'取消':item.state==3?'已支付':item.state==4?'支付失败':item.state==5?'未发货':item.state==6?'已发货':item.state==7?'交易成功':item.state==8?'交易关闭':'拼单中'}} <!--， 还差{{item.remark==null?'0':'0'}}人--></p> 
        </div>
        <div class="middle">
          <div class="picture" v-for="(itemzz,num) in item.orderGoods" :key="num">
            <img class="imgOne" :src="itemzz.image">
          </div>
          <i class="sanJiao" @click="sanJiaoBut(item)"></i>
        </div>
        <div class="jieShuan">
          <div class="quantity">共{{item.num}}个款，合计{{item.num}}件</div>
          <div class="money">订单金额：
            <p class="money1">{{item.count}}元</p>
          </div>
          <div class="phone">收货人:{{item.receiptName}} {{item.phone}}</div>
        </div>
        <div class="foot">
          <div class="picture_1" v-for="(pin,idPin) in isPin.pingUser" :key="idPin" v-if="pin < 3">
            <img class="imgTwo" :src="pin.head">
          </div>
          <div class="btn">
            <span v-if="(btn==0)" class="see" @click="seeBut(item.id)">查看详情</span>
            <!-- <span v-if="(btn==0)" class="close" @click="close()">关闭订单</span> -->
            <span v-if="(btn==1)" class="collage">查看子拼团</span>
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
      isPin: {
        type: Array,
        default: []
      }
    },
    methods: {
        close(id) {
          this.passhowYes = true
          this.orderID = id

        },
        passYesClose(){
          this.passhowYes = false
        },
        async passYesBut(){
          const L_shopCloseData = await this.$API.L_shopClose({
            orderId: this.orderID,
          });
          console.log(L_shopCloseData)
          if(L_shopCloseData.code == 1){
            wx.showToast({               
              title: '成功',               
              icon: 'success',  
              duration: 2000  
            }) 
            this.passhowYes = false
          }else{
            this.passhowYes = false
          }
        },
        sanJiaoBut(item){
          this.$router.push({path:'/pages/home/orderMgr/orderdetails',query:{item: JSON.stringify(item)}})
        },
        seeBut(id){
          this.$router.push( {path:'/pages/home/orderMgr/collage/collect', query:{orderId: id}})

        }
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
      .collage
        display: inline-block
        width: 180px
        height: 60px
        background: rgba(246,124,47,1)
        border-radius: 8px
        color: #fff
        margin: 30px 20px 0 0
        line-height: 60px

</style>
