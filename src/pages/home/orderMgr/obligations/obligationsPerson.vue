<template>
  <div class="nav" v-if="navData">
    <div class="maiJiazz">
      <text class="name">
        {{navData.refundType==0?'仅退款：':navData.refundType==1?'退货退款：':'换货：'}}
        {{navData.state==0?'未处理':navData.state==1?'等待卖家发货':navData.state==2?'被拒绝':navData.state==3?'同意':navData.state==4?'等待卖家发货':'关闭'}}
      </text>
    </div>
    <div class="maiJia">
      <text class="name">
        退款信息
      </text>
    </div>
    <div class="list" v-for="(item,idx) in navData.goodsList" :key="idx">
      <div class="kuang" @click="orderListArr(item.goodsId)">
        <img class="sPimg" :src="item.image" />
        <div class="textThad">
          <div class="title">{{item.name}}</div>
          <div class="huo">
            <text class="name">{{item.stallInfo3}}</text>
            <div class="type">货期:{{item.delivery}}</div>
            <span class="number">X{{item.num}}</span>
          </div>
          <div class="maShuo">{{item.skuCode}}/{{item.num}}件</div>
        </div>
      </div>
      <div class="jiaGe">
        <text class="text">共{{item.num}}件商品,合计: </text>
        <text class="jiaGet">{{item.price}}元</text>
      </div>
    </div>
    <div class="jieShuan">
      <div >买家：{{navData.addressName}}</div>
      <div >
        <div > 姓名：{{navData.addressName}}</div>
        <div>
          <i class="imgSpan"></i>{{navData.addressMobile}}
        </div>
      </div>
      <div >退款原因：{{navData.result}}</div>
      <div >退款金额：{{navData.price}}</div>
      <div >申请时间：{{navData.handleTime}}</div>
      <div >退款编号：{{navData.orderRefundNo}}</div>
    </div>
    <div class="orderImg">
      <div class="imgAll">
        <p>凭证：</p>
        <div v-if="navData">
          <scroll-view scroll-y lower-threshold='80' width="100%">
            <img :src="navData.img1">
            <img :src="navData.img2">
            <img :src="navData.img3">
            <img :src="navData.img4">
            <img :src="navData.img5">
            <img :src="navData.img6">
          </scroll-view>
        </div>
      </div>
    </div>
    <div class="foot">
    </div>

    <!-- 售后同意弹窗 -->
    <div class="closeTipAll" v-show="passhowYes">
      <div class="closeTip">
        <div class="closeTip_text">
          <p class="tipText">是否确认收货？将自动退还 金额￥{{navData.price}}</p>
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
            passhowYes: false,
            passhow: false,
        };
    },
    methods: {
        pay() {
            wx.showModal({
                content: "是否确认支付！",
                success: function(res) {
                    if (res.confirm) {
                    } else if (res.cancel) {
                    }
                }
            });
        },
        btn() {
            wx.showModal({
                // title: "提示",
                content: "确定关闭订单！",
                success: function(res) {
                    if (res.confirm) {
                    } else if (res.cancel) {
                    }
                }
            });
        },
        confirm(item,index) {
          this.idzz = item.id
          this.passhowYes = true
          this.currentSelectedIndex = index
          this.moneyzz = item.price
        },
        passYesClose(){
          this.passhowYes = false
        },
        async passYesBut(){
          const L_dealWithOrderData = await this.$API.L_dealWithOrder({
            orderRefundId: this.idzz,
            state: 1,
          });
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
        passBut(item ,index){
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
        //跳转商品详情
        orderListArr(goodsId){
          this.$router.push( {path:'/pages/home/orderMgr/orderList', query:{goodsId: goodsId}})
        },
    },
    async mounted() {
      this.orderId = this.$route.query.orderId
      const L_selectOrderData = await this.$API.L_selectOrderRefundDetail({
        orderId: this.$route.query.orderId
      });
      this.navData = L_selectOrderData.data
    },

};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
page
  background: #f5f5f5

.head
  height: 222px
  background: #fff
  display: flex
  .dingwei
    +bg-img('storeMgr/s3.png')
    width: 50px
    height: 58px
    margin: 82px 19px 82px 24px
  .right
    width: 620px
    margin-top: 26px
    font-size: 28px
    color: #666
    .consignee
      +singleFile
      .phone
        float: right
    .address
      +moreLine(2)
    .remark
      +singleFile
.maiJiazz
  margin-top: 10px
  height: 74px
  background: #fff
  font-size: 26px
  display: flex
  line-height: 74px
  padding: 20px
.maiJia
  margin-top: 10px
  height: 74px
  background: #fff
  font-size: 26px
  display: flex
  line-height: 74px
  .name
    color: #999
    flex: 1
    margin: 20px
  .fuKuan
    color: #F67C2F
    margin-right: 25px
  .maiJiaico
    +bg-img('storeMgr/s1.png')
    width: 32px
    height: 30px
    margin: 22px 19px 0 24px

.list
  height: 280px
  .kuang
    .sPimg
      width: 160px
      height: 160px
      display: inline-block
      position: relative
      margin: 21px 20px 0
    .textThad
      display: inline-block
      width: 494px
      position: relative
      margin: 10px 0
      font-size: 24px
      .title
        +moreLine(2)
      .huo
        +singleFile
        .name
          display: inline-block
          background: #ccc
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
    height: 70px
    width: 100%
    background: #fff
    float: right
    line-height: 70px
    font-size: 22px
    padding-top: 4rpx
    .text
      padding-left: 480px
    .jiaGet
      color: #FF0000
.jieShuan
  background: #fff
  margin-top: 10px
  font-size: 26px
  padding-bottom: 10px
  color: #666666
  div
    padding: 22px 25px 0
    .imgSpan
      +bg-img('home/i01.png')
      width: 20px
      height: 20px
      margin-left: 20px
      margin-top: 10px
      margin-right: 20px
  div:nth-child(2)
    display: flex
    // padding: 0
    padding: 22px 25px 0
    div
      padding: 0
.orderImg
  background: #fff
  margin-top: 10px
  font-size: 26px
  margin-bottom: 120px
  padding-bottom: 10px
  color: #666666
  .imgAll
    padding: 22px 25px 0
    div
      display: flex
      img
        width: 200px
        height: 200px
        margin-top: 20px
.foot
  width: 100%
  position: fixed
  bottom: 0px
  height: 98px
  background: #fff
  .pay
    width: 130px
    height: 60px
    background: #f67c2f
    color: #fff
    font-size: 22px
    line-height: 60px
    text-align: center
    float: right
    margin-top: 20px
    margin-right: 10px
    border-radius: 4px
  .btn
    width: 130px
    height: 60px
    float: right
    background: #f67c2f
    color: #fff
    font-size: 22px
    line-height: 60px
    text-align: center
    margin-top: 20px
    border-radius: 4px
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
