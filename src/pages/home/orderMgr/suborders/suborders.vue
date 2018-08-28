<template>
  <div class="nav">
    <div v-for="(item,index) in navData" :key="index">
      <div class="kuang">
        <div class="head">
          <p class="order">订单编号：{{item.title}}</p>
          <p class="state">拼团中，还差{{item.maShuo}}人</p>
        </div>
        <div class="middle">
          <div class="picture">
            <img class="imgOne" :src="item.picture">
          </div>
          <i class="sanJiao"></i>
        </div>
        <div class="jieShuan">
          <div class="quantity">共{{item.kuan}}个款，合计{{item.jian}}件</div>
          <div class="money">订单金额：
            <p class="money1">{{item.money}}元</p>
          </div>
          <div class="phone">收货人:{{item.name}} {{item.phone}}</div>
        </div>
        <div class="foot">
          <div class="picture_1">
            <img class="imgTwo" :src="item.picture">
            <img class="imgThree" :src="item.picture">
            <img class="imgFour" :src="item.picture">
          </div>
          <div class="btn">
            <span class="see">查看详情</span>
            <span class="close" @click="close()">关闭订单</span>
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
            navData: [
                {
                    picture:
                        "http://img0.ph.126.net/4VrAhfq_aXGh-H8xHoY7Xw==/6597977963263462287.png",
                    title: 123456,
                    maShuo: "一",
                    kuan: 1,
                    jian: 3,
                    name: "张三",
                    phone: 13560234567,
                    money: 154
                },
                {
                    picture:
                        "http://img0.ph.126.net/4VrAhfq_aXGh-H8xHoY7Xw==/6597977963263462287.png",
                    title: 123456,
                    maShuo: "一",
                    kuan: 1,
                    jian: 3,
                    name: "张三",
                    phone: 13560234567,
                    money: 154
                },
                {
                    picture:
                        "http://img0.ph.126.net/4VrAhfq_aXGh-H8xHoY7Xw==/6597977963263462287.png",
                    title: 123456,
                    maShuo: "一",
                    kuan: 1,
                    jian: 3,
                    name: "张三",
                    phone: 13560234567,
                    money: 154
                }
            ]
        };
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
        }
    },
    mounted() {}
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

</style>
