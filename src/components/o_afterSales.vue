<template>
  <div class="nav">
    <div class="list" v-for="(item,idx) in shopListRefund" :key="idx" >
      <div class="kuang clearfix">
        <div class="title">
          <text class="name">订单编号：{{item.orderRefundNo}}</text>
          <text class="fuKuan">
            {{navData.state==0?'待处理':navData.state==1?'等待卖家发货':navData.state==2?'被拒绝':navData.state==3?'同意':navData.state==4?'等待卖家发货':'关闭'}}
          </text>
        </div>
        <div class="img"  @click="sanJiaoBut(item.id)">
          <div  >
            <img v-for="(itemzz,num) in item.goodsList" :key="num" class="sPimg" :src="itemzz.image" v-if="num < 3"/>
          </div>
          <div>
            <i class="icon"></i>
          </div>
        </div>
        <div class="message">
          <div class="message_1">
            <p class="text_1">共{{item.countGoodsNum}}个款，合计{{item.countGoodsNum}}件</p>
            <p class="text_2">订单金额：</p>
            <p class="text_3">{{item.price}}元</p>
          </div>
          <!-- <p class="name">收货人:{{item.accountAddress.name}} {{item.accountAddress.mobile}}</p> -->
        </div>
        <!-- 判断未操作 -->
        <div class="btn"  v-if="item.state == 0 ">
          <span class="details"  @click="details(item.id)">查看详情</span>
          <span class="confirm"  @click="confirm(item,index)">同意</span>
          <span class="close"    @click="passBut(item,idnex)">拒绝</span></div>
        <!-- 判断是否在发货 -->
        <div class="btn" v-else-if="(item.state == 4)">
          <span class="details" @click="detailsSH(item.id)">查看详情</span>
          <span class="close"    @click="confirmzz(item,index)">确认收货</span>
        </div>
        <!-- 判断是否已经取消或者同意 -->
        <div class="btn" v-else="(item.state == 1) || (item.state == 2) || (item.state == 3) || (item.state == 5)">
          <span class="details" @click="detailsAll(item.id)">查看详情</span>
        </div>

      </div>
      <!-- 售后仅退款同意弹窗 -->
      <div class="closeTipAll" v-show="passhowYes">
        <div class="closeTip">
          <div class="closeTip_text">
            <p class="tipText">是否确认收货？将自动退还 金额￥{{item.price}}给{{navData.addressName}}</p>
          </div>
          <div class="confirm_but">
            <div><button @click="passYesClose">取消</button></div>
            <div><button @click="passYesBut">确定</button></div>
          </div>
        </div>
      </div>
      <!-- 售后拒绝弹窗 -->
      <div class="closeTipAll" v-show="passhow">
        <div class="closeTip">
          <div class="closeTip_text">
            <p>填写拒绝理由</p>
            <textarea v-model="textword" placeholder="填输入拒绝理由"></textarea>
          </div>
          <div class="closeTip_but">
            <div><button @click="passClose">取消</button></div>
            <div><button @click="passYes">确定</button></div>
          </div>
        </div>
      </div>
      <!-- 售后退货退款同意弹窗 -->
      <div class="closeTipAll" v-show="passhowYeszz">
        <div class="closeTip">
          <div class="closeTip_text">
            <p class="tipText">是否确认收货？将自动退还 金额￥{{item.price}}给{{navData.addressName}}</p>
          </div>
          <div class="confirm_but">
            <div><button @click="passYesClosezz">取消</button></div>
            <div><button @click="passYesButzz">确定</button></div>
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
            shuoo: 0,
            navData: [],
            passhow: false,
            passTipSHow: false,
            tag: '',
            textword: '',
            idzz: '',
            passhowYes: false,
            passhowYeszz: false,
            moneyzz: '',
            currentSelectedIndex: 0

        };
    },
    props: {
      shopListRefund: {
        type: Array,
        default: []
      }
    },
    methods: {
        confirm(item,index) {
          console.log(item)
          this.idzz = item.id
          // this.idzz = item.orderId
          this.passhowYes = true
          this.currentSelectedIndex = index
          this.moneyzz = item.price
        },
        passYesClose(){
          this.passhowYes = false
        },
        //仅退款
        async passYesBut(){
          const L_dealWithOrderData = await this.$API.L_dealWithOrder({
            orderRefundId: this.idzz,
            state: 1,
          });
          console.log(L_dealWithOrderData)
          if(L_dealWithOrderData.code == 1){
            wx.showToast({               
              title: '退款成功',               
              icon: 'success',  
              duration: 2000  
            }) 
            this.passhowYes = false
          }else{
            this.passhowYes = false

          }

        },

        confirmzz(item,index) {
          console.log(item)
          this.idzz = item.id
          // this.idzz = item.orderId
          this.passhowYeszz = true
          this.currentSelectedIndex = index
          this.moneyzz = item.price
        },
        passYesClosezz(){
          this.passhowYeszz = false
        },
        //仅退款
        async passYesButzz(){
          const L_sureReund = await this.$API.L_sureReund({
            orderRefundId: this.idzz,
          });
          console.log(L_sureReund)
          if(L_sureReund.code == 1){
            wx.showToast({               
              title: '退款成功',               
              icon: 'success',  
              duration: 2000  
            }) 
            this.passhowYeszz = false
          }else{
            this.passhowYeszz = false

          }

        },
        details(id){
          console.log(id)
          this.$router.push({path:'obligations/collectPerson',query:{orderId: id}})
        },
        detailsSH(id){

          this.$router.push({path:'obligations/obligations',query:{orderId: id}})
        },
        detailsAll(id){
          this.$router.push({path:'obligations/obligationsPerson',query:{orderId: id}})
        },
        sanJiaoBut(id){
           this.$router.push({path:'/pages/home/orderMgr/orderdetails',query:{orderId: id}})
        },
        passBut(item ,index){
          console.log(item)
          this.idzz = item.id
          // this.tag = item.
          this.passhow = true
          this.currentSelectedIndex = index
        },
        async passYes(){
          const L_dealWithOrderData = await this.$API.L_dealWithOrder({
            orderRefundId: this.idzz,
            state: 2,
            content: this.textword,
          });
          console.log(L_dealWithOrderData)
          if(L_dealWithOrderData.code == 1){
            wx.showToast({               
              title: '拒绝成功',               
              icon: 'success',  
              duration: 2000  
            }) 
            this.passhow = false
            this.onPlayList.splice(this.currentSelectedIndex, 1)

          }else{
            this.passhow = false

          }
        },
        passClose(){
          this.passhow = false
        },
    },
    mounted() {
        // this.shuoLiang();
    },

};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
page 
  background: #f5f5f5
.clearfix:after
  content: ""
  display: block
  clear: both
.kuang
  width: 702px
  height: 496px
  background: #fff
  margin: 0 24px 20px
  border-radius: 8px
  .title
    height: 68px
    width: 100%
    border-bottom: 1px solid #f3f3f3
    display: flex
    line-height: 68px
    font-size: 26px
    .name
     flex: 9
     padding-left: 20px
    //  font-size: 20px
    .fuKuan
     flex: 2
    //  padding-left: 60px
  .img
    height: 200px
    // display: inline-block
    display: flex
    border-bottom: 1px solid #f3f3f3
    padding-left: 10px
    div:nth-child(1)
      flex: 6
      .sPimg
        width: 160px
        height: 160px
        margin: 20px 10px
    div:nth-child(2)
      flex: 2
      .icon
        +bg-img('home/shanJiao.png')
        margin: 86px 0 0 126px
        width: 16px
        height: 29px
  .message
    height: 105px
    font-size: 24px
    // display: inline-block
    border-bottom: 1px solid #f3f3f3
    padding: 10px 20px 0
    .message_1
      display: flex
    .text_1
      flex: 1
      padding-top: 2px
    .text_2
      padding-top: 2px
    .text_3
      font-size: 28px
      color: #FF0000
    .name
      padding-top: 10px
  .btn
    position: relative
    font-size: 24px
    display: flex
    float: right
    .details
      width: 130px
      height: 60px
      border-radius: 8px
      background: #F67C2F
      color: #fff
      line-height: 60px
      text-align: center
      margin: 20px
    .confirm
      width: 128px
      height: 58px
      border-radius: 8px
      // background: #F67C2F
      border: 1px solid #F67C2F
      color: #F67C2F
      line-height: 60px
      text-align: center
      margin: 20px
    .close
      width: 128px
      height: 58px
      border-radius: 8px
      border: 1px solid #999
      color: #999
      line-height: 60px
      text-align: center
      margin: 20px
.closeTipAll 
  background: rgba(0,0,0,0.1)
  width: 100%
  height: 100%
  position: fixed
  top: 0
  z-index: 9999
  .closeTip
    opacity: 1 
    width: 550px
    height: 350px
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
      margin-top: 80px
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




    
</style>
