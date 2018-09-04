<template>
  <div class="nav">
    <div class="list" v-for="(item,idx) in applyFor" :key="idx">
      <div class="kuang clearfix">
        <div class="title">
          <text class="name">订单编号：{{item.orderId}}</text>
          <text class="fuKuan">买家发起，仅退款</text>
        </div>
        <div class="img">
          <img class="sPimg" :src="item.image" />
          <i class="icon"></i>
        </div>
        <div class="message">
          <div class="message_1">
            <p class="text_1">共{{item.skuSize}}个款，合计{{item.countGoodsNum}}件</p>
            <p class="text_2">订单金额：</p>
            <p class="text_3">{{}}元</p>
          </div>
          <p class="name" v-for="(itemxx,idxx) in item.accountAddress" :key="idxx">收货人:{{itemxx.name}} {{itemxx.mobile}}</p>
        </div>
        <div class="btn">
          <span class="details" @click="details">查看详情</span>
          <span class="confirm"  @click="confirm(item,index)">同意</span>
          <span class="close"    @click="passBut(item,idnex)">拒绝</span>
        </div>
      </div>
    </div>
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

    <div class="closeTipAll" v-show="passhowYes">
      <div class="closeTip">
        <div class="closeTip_text">
          <p class="tipText">是否确认收货？将自动退还 金额￥{{this.moneyzz}}给收货人名称</p>
        </div>
        <div class="confirm_but">
          <div><button @click="passYesClose">取消</button></div>
          <div><button @click="passYesBut">确定</button></div>
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
            moneyzz: '',
            currentSelectedIndex: 0

        };
    },
    props: {
      applyFor: {
        type: Array,
        default: []
      }
    },
    methods: {
        confirm(item,index) {
          console.log(item)
          this.idzz = item.id
          this.passhowYes = true
          this.currentSelectedIndex = index
        },
        passYesClose(){
          this.passhowYes = false
        },
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
        details(){
          this.$router.push('obligations/collectPerson')
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
    }
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
     flex: 3
     padding-left: 20px
    .fuKuan
     flex: 2
     padding-left: 60px
  .img
    height: 200px
    // display: inline-block
    display: flex
    border-bottom: 1px solid #f3f3f3
    padding-left: 10px
    .sPimg
      width: 160px
      height: 160px
      margin: 20px 10px
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
      margin: 20px 0 0 20px
    .confirm
      width: 128px
      height: 58px
      border-radius: 8px
      // background: #F67C2F
      border: 1px solid #F67C2F
      color: #F67C2F
      line-height: 60px
      text-align: center
      margin: 20px 0 0 20px
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
