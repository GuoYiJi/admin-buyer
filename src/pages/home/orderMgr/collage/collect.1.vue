<template>  
  <div class="nav">
    <div class="head" v-if="warehouseData">
      <i class="dingwei"></i>
      <div class="right">
        <div class="consignee">
          <text>收货人:</text>
          <text>{{warehouseData.name}}</text>
          <text class="phone">{{warehouseData.mobile}}</text>
        </div>
        <div class="address">
          收货地址:{{warehouseData.sheng}}{{warehouseData.shi}}{{warehouseData.qu}}{{warehouseData.address}}
        </div>
        <div class="remark">
          备注:{{L_selectDetail.remark}}
        </div>
      </div>
    </div>
    <div class="maiJia" >
      <i class="maiJiaico"></i>
      <text class="name" >{{dpName}}</text>
      <text class="fuKuan" v-if="L_selectDetail">
        {{L_selectDetail.state==1?'未支付':L_selectDetail.state==2?'取消':L_selectDetail.state==3?'已支付':L_selectDetail.state==4?'支付失败':L_selectDetail.state==5?'未发货':L_selectDetail.state==6?'已发货':L_selectDetail.state==7?'交易成功':L_selectDetail.state==8?'交易关闭':'拼单中'}} 
      </text>
    </div>
    <div class="list" v-for="(item,idx) in orderGoodsList" :key="idx" >
      <div class="kuang" @click="orderListArr(item.goodsId)" >
        <img class="sPimg" :src="item.image" />
        <div class="textThad">
          <div class="title">{{item.name}}</div>
          <div class="huo">
            <text class="name">{{item.stallInfo3}}</text>
            <div class="type">货期:{{item.delivery}}</div>
            <!-- <span class="number">X{{item.pingOrderId}}</span> -->
          </div>
          <div class="maShuo" v-for="(itemxx,idxx) in item.orderGoods" :key="idxx">{{itemxx.skuCode}}/{{item.countNum}}件</div>
          <!-- <div class="maShuo">黑色:{{item.maShuo}}/{{item.pingId}}件</div> -->
        </div>
      </div>
      <div class="collage" v-if=" L_selectDetail.state == 9">
        <div class="picture" v-for="(itemPin,idPin) in pingUserData" :key="idPin">
          <img class="imgOne" :src="itemPin.head">
        </div>
        <div class="jiaGe" v-if="item.orderGoods" >
          <text class="text">共{{item.orderGoods.num}}件商品,合计: </text>
          <text class="jiaGet">{{item.orderGoods.price}}元</text>
        </div>
      </div>
    </div>
    <!-- 子订单 -->
    <div class="number_1" v-if="(L_selectDetail.children != '')">
      <div class="completed" v-for="(childrenzz,idRen) in L_selectDetail.children" :key="idRen"  @click="childrenBut(childrenzz.id)">
        <div class="completed_1">子订单编号
          {{childrenzz.state==1?'未支付':childrenzz.state==2?'取消':childrenzz.state==3?'已支付':childrenzz.state==4?'支付失败':childrenzz.state==5?'未发货':childrenzz.state==6?'已发货':childrenzz.state==7?'交易成功':childrenzz.state==8?'交易关闭':'拼单中'}}
        ：{{childrenzz.orderNo}}</div>
        <i class="sanjiao"></i>
      </div>
    </div>
    <div class="jieShuan" v-if="L_selectDetail">
      <div class="price">
        <text>商品总价</text>
        <text class="price1">￥{{L_selectDetail.count}}</text>
      </div>
      <div class="coupon">
        <text>优惠券抵扣</text>
        <text class="coupon1">{{L_selectDetail.couponMoney}}</text>
      </div>
      <div class="coupon" >
        <text>运费</text>
        <text class="coupon1">-￥{{L_selectDetail.expressWay}}</text>
      </div>
      <!-- <div class="coupon">
        <text>运费</text>
        <text class="coupon1">-￥6.99</text>
      </div> -->
      <i class="xuXian"></i>
      <div class="orderNumber" v-if="parent != null"> 父订单编号：{{parent.id}}</div>
      <div class="orderNumber">订单编号：{{L_selectDetail.orderNo}}</div>
      <div class="orderNumber">下单时间：{{L_selectDetail.createTime}}</div>
      <div class="orderNumber" v-if="L_selectDetail.state == 6 || L_selectDetail.state == 7">支付时间：{{L_selectDetail.payTime}}</div>
      <div class="orderNumber" v-if="L_selectDetail.state == 6 || L_selectDetail.state == 7">发货时间：{{L_selectDetail.deliverTime}}</div> 
      <div class="orderNumber" v-if=" L_selectDetail.state == 7">收货时间：{{L_selectDetail.receiptTime}}</div>
      
    </div>
    <div class="foot">
      <span class="btn" v-if="L_selectDetail.state == 6 "   @click="seeLogistics()">查看物流</span>
      <span v-if="L_selectDetail.state == 1 " class="btn" @click="seePlay()">确认已支付</span>
      <span class="btn" v-if="L_selectDetail.state == 1" @click="close()">关闭订单</span>
    </div>
    <!-- 关闭订单 -->
    <div class="closeTipAll" v-show="passhowYes">
      <div class="closeTip">
        <div class="closeTip_text">
          <p class="tipText">是否确认关闭订单!</p>
        </div>
        <div class="confirm_but">
          <div><button @click="passYesClose">取消</button></div>
          <div><button  @click="passYesBut()">确定</button></div>
        </div>
      </div>
    </div>
    <!-- 确认已支付 -->
    <div class="closeTipAll" v-show="pasSeePlay">
      <div class="closeTip">
        <div class="closeTip_text">
          <p class="tipText">确认付款!</p>
        </div>
        <div class="confirm_but">
          <div><button @click="pasSeeClose">取消</button></div>
          <div><button @click="pasSeeBut">确定</button></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import config from "@/config";
export default {
    components: {},
    data() {
      return {
          shuoo: 0,
          navData: [],
          L_selectDetail: [],
          warehouseData: [],
          pingUserData: [],
          orderGoodsList: [],
          goodsDetailData: [],
          url: '',
          appId: '',
          azzSessionId: '',
          passhowYes: false,
          orderId: '',
          orderGoodsDN: [],
          parent: [],//保存父订单
          pasSeePlay: false,
          dpName: '',
      };
    },
    watch: {
      dpName(currentValue, oldValue) {
        this.dpName = currentValue
      }
    },
    methods: {
        btn() {
            let wxUrl = this.url 
            let sessionId = this.azzSessionId
            let appId = this.appId
            let orderId = this.orderID
            wx.showModal({
                // title: "提示",
                content: "确定关闭订单！",
                success: function(res) {
                    console.log(res);
                    if (res.confirm) {
                        console.log("用户点击确定");wx.request({
                      url: wxUrl, //仅为示例，并非真实的接口地址
                      data: {
                        sessionId: sessionId,
                        appId: appId,
                        orderId: orderId
                      },
                      method: 'post',
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function(res) {
                        console.log(res.data)
                      }
                    })
                        
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                }
            });
        },
        //点击关闭订单弹窗
        close(id, index) {
          this.passhowYes = true
          // this.orderID = id
          // this.currentSelectedIndex = index
        },
        //取消关闭
        passYesClose(){
          this.passhowYes = false
        },
        //支付
        seePlay(){
          this.pasSeePlay = true
        },
        //关闭订单
        async passYesBut(){
          const L_shopCloseData = await this.$API.L_shopClose({
            orderId: this.orderId,
          });
          console.log(L_shopCloseData)
          if(L_shopCloseData.code == 1){
            wx.showToast({               
              title: '成功',               
              icon: 'success',  
              duration: 2000
            }) 
            this.passhowYes = false
            // this.$router.back(-1)
            this.$router.push( {path:'/pages/home/orderMgr/orderMgr', query:{orderType: 2}})
          }else{
            this.passhowYes = false
          }
        },
        //跳转商品详情
        orderListArr(goodsId){
          console.log(goodsId)
          this.$router.push( {path:'/pages/home/orderMgr/orderList', query:{goodsId: goodsId}})
        },
        //跳转物流
        seeLogistics(){
          this.$router.push( {path:'/pages/home/orderMgr/mail/logistics', query:{orderId: this.goodsId}})
        },
        //取消的支付
        pasSeeClose(){
          this.pasSeePlay = false
            // pasSeePlay: false,
        },
        //确认已支付
        async pasSeeBut(){
          const L_surePayData = await this.$API.L_surePay({
            orderId: this.orderId,
          });
          console.log(L_surePayData)
          if(L_surePayData.code == 1){
            wx.showToast({               
              title: '成功',    
              icon: 'success',  
              duration: 2000  
            }) 
            this.pasSeePlay = false
          }else{
            this.pasSeePlay = false
          }
          
        },
        
    },
    async mounted() {
      this.orderId = this.$route.query.orderId
      const L_selectOrderData = await this.$API.L_selectOrderDetail({
        orderId: this.$route.query.orderId
      });
      this.L_selectDetail = L_selectOrderData.data
      // console.log(this.L_selectDetail.warehouse)
      this.warehouseData = this.L_selectDetail.warehouse
      this.pingUserData = this.L_selectDetail.pingUser
      this.orderGoodsList =  this.L_selectDetail.orderGoods
      this.parent = this.L_selectDetail.parent
      console.log(this.parent)
      for(var i=0; i<this.orderGoodsList.length;i++){
        this.orderGoodsDN =this.orderGoodsList[i].orderGoods
        this.goodsId =this.orderGoodsList[i].goodsId
      console.log(this.goodsId)
      }
      console.log( this.orderGoodsList)
      this.azzSessionId =  wx.getStorageSync('sessionId')
      this.url = config.url+'/api/order/shopClose'
      console.log(this.url)
      this.appId = config.appId
      this.orderID = this.$route.query.orderId
      this.dpName = wx.getStorageSync('dpName')
      console.log( this.dpName )
    }
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

.maiJia
  margin-top: 10px
  height: 74px
  background: #fff
  font-size: 26px
  display: flex
  line-height: 74px
  .name
    color: #999
    flex: 0.97
  .fuKuan
    color: #F67C2F
    margin-right: 0 auto
    
  .maiJiaico
    +bg-img('storeMgr/s1.png')
    width: 32px
    height: 30px
    margin: 22px 19px 0 24px

    
.list 
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
  .collage
    background: #fff
    height: 124px
    .picture
      margin: 20px 0 0 10px
      display: inline-block
      .imgOne
        width: 84px
        height: 84px
        margin: 0 5px 0
      .imgTwo
        width: 84px
        height: 84px
        margin: 0 5px 0
      .imgThree
        width: 84px
        height: 84px
        background: #ccc
        margin: 0 5px 0
    .jiaGe 
      margin-right: 20px
      display: inline-block
      height: 70px
      float: right 
      line-height: 70px 
      font-size: 22px
      padding-top: 4rpx
      .text
      .jiaGet
        color: #FF0000

.jieShuan
  background: #fff
  margin-top: 10px
  font-size: 26px
  margin-bottom: 120px
  .price
    padding: 22px 25px 0
    color: #666
    .price1
      color: #999
      float: right
  .coupon
    padding: 22px 25px 0
    color: #666
    margin: 0 0 20px 0
    .coupon1
      color: #999
      float: right 
  .xuXian
    border-bottom: 1px dashed #666
  .orderNumber
    font-size: 26px
    color: #666
    margin: 22px 0 0 25px
  .orderTime
    font-size: 26px
    color: #666
    margin: 22px 0 0 25px
    padding-bottom: 20px
.foot 
  width: 100%
  position: fixed
  bottom: 0px
  height: 98px
  background: #fff
  .btn 
    width: 130px
    height: 60px
    float: right
    background: #f67c2f
    color: #fff
    font-size: 22px
    line-height: 60px
    text-align: center
    margin: 20px 20px 0 0
    border-radius: 4px
.number_1
  margin-top: 10px
  // height: 184px
  background: #fff
  line-height: 90px
  font-size: 26px
  .completed:last-child
    border-bottom: none

  .completed
    border-bottom: 1px dashed #eee
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
</style>
