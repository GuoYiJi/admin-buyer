<template>
  <div class="nav">
    <div class="head">
      <i class="dingwei"></i>
      <div class="right">
        <div class="consignee">
          <text>收货人:</text>
          <text>陈小姐</text>
          <text class="phone">13416098113</text>
        </div>
        <div class="address">
          收货地址:广东省广州市海珠区保利世贸大厦c 塔2205
        </div>
        <div class="remark">
          备注:包装好点
        </div>
      </div>
    </div>
    <div class="maiJia">
      <i class="maiJiaico"></i>
      <text class="name">耕山小寨</text>
      <text class="fuKuan">拼单中，还差一人</text>
    </div>
    <div class="list" v-for="(item,idx) in navData" :key="idx">
      <div class="kuang">
        <img class="sPimg" :src="item.picture" />
        <div class="textThad">
          <div class="title">{{item.title}}</div>
          <div class="huo">
            <text class="name">{{item.name}}</text>
            <div class="type">货期:{{item.type}}</div>
            <span class="number">X{{item.number}}</span>
          </div>
          <div class="maShuo">白色:{{item.maShuo}}/{{item.jianShuo}}件</div>
          <div class="maShuo">黑色:{{item.maShuo}}/{{item.jianShuo1}}件</div>
        </div>
      </div>
      <div class="collage">
        <div class="picture">
          <img class="imgOne" :src="item.picture">
          <img class="imgTwo" :src="item.picture">
          <img class="imgThree" src="">
        </div>
        <div class="jiaGe">
          <text class="text">共{{item.number}}件商品,合计: </text>
          <text class="jiaGet">{{item.jiage}}元</text>
        </div>
      </div>
    </div>
    <div class="jieShuan">
      <div class="price">
        <text>商品总价</text>
        <text class="price1">￥299.00</text>
      </div>
      <div class="coupon">
        <text>优惠券抵扣</text>
        <text class="coupon1">-￥6.99</text>
      </div>
      <div class="freight">
        <text>运费</text>
        <text class="freight1">+￥6.00</text>
      </div>
      <i class="xuXian"></i>
      <div class="orderNumber">订单编号：2018062712345678904</div>
      <div class="orderTime">下单时间：2018-06-16 12:27:12</div>
    </div>
    <div class="foot">
      <span class="btn" @click="btn()">关闭订单</span>
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
            navData: [
                {
                    picture:
                        "http://img0.ph.126.net/4VrAhfq_aXGh-H8xHoY7Xw==/6597977963263462287.png",
                    title: "商品1商品1商品1商品1商品1商品1商品1商品1商品1商品1",
                    name: "档口名称",
                    type: "现货",
                    number: 5,
                    maShuo: "均码",
                    jianShuo: 1,
                    jianShuo1: 4,
                    jiage: 154
                }
            ]
        };
    },
    methods: {
        // shuoLiang() {
        //     var that = this;
        //     var navData = this.navData;
        //     var shuo = 0;
        //     for (var i = 0; i < navData.length; i++) {
        //         shuo += navData[i].number;
        //     }
        //     that.shuoo = shuo;
        // }
        btn() {
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
        }
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
    flex: 1
  .fuKuan
    color: #F67C2F
    margin-right: 25px
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
    .coupon1
      color: #999
      float: right 
  .freight
    padding: 22px 25px 0
    color: #666
    margin: 0 0 20px 0
    .freight1
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
</style>
