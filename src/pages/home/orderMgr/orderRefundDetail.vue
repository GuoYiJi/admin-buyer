<template>
<div class="wrapper">
  <div class="tips">
    {{ state === 0 && refundType === 0 ? '买家发起, 仅退款'
    : state === 0 && refundType === 1 ? '买家发起, 退货退款'
    : state === 0 && refundType === 2 ? '买家发起, 仅换货'
    : state === 1 && refundType === 0 ? '退款成功'
    : state === 1 && refundType === 1 ? '退货退款成功'
    : state === 1 && refundType === 2 ? '换货成功'
    : state === 2 && refundType === 0 ? '仅退款已被拒绝'
    : state === 2 && refundType === 1? '退款退货已被拒绝'
    : state === 2 && refundType === 2 ? '仅换货已被拒绝'
    : state === 3 && refundType === 1 ? '退货退款, 等待买家发货'
    : state === 3 && refundType === 2 ? '换货, 等待买家发货'
    : state === 4 && refundType === 1 ? '退货退款, 等待卖家收货'
    : state === 4 && refundType === 2 ? '换货, 等待卖家收货'
    : state === 5 ? '撤销售后'
    : '未知状态'
    }}
  </div>
  <div class="goodsList-body">
    <div class="header">
      退款信息
    </div>
    <div class="goods-info" v-for="(goods, goodsIndex) in goodsList" :key="goodsIndex">
      <div class="goods-body">
        <i class="goods-img" :style="{backgroundImage: 'url(' + goods.image + ')'}"></i>
        <div class="goods-message">
          <span class="name">{{goods.name}}</span>
          <span>
              <p class="stall">档口名称: {{goods.stallInfo3}}</p>
              <p class="futures">期货: {{goods.delivery}}</p>
            </span>
          <div class="footer">
            <span>
                <p v-for="(skuItem, skuIndex) in skuList[goodsIndex]" :key="skuIndex">
                  {{skuItem.color}}色: {{skuItem.size}}码/{{goods.num}}件
                </p>
              </span>
            <button v-if="state === 5 ">编辑</button>
          </div>
        </div>
      </div>
      <div class="total">
        共{{goods.countGoodsNum}}件商品, 合计: <strong>{{goods.countGoods}}元</strong>
      </div>
    </div>
  </div>
  <ul class="orderNo">
    <li>买家: {{nick}}</li>
    <li>姓名: {{accountAddress.name}} <i class="phone"></i>{{accountAddress.mobile}}</li>
    <li>退款原因: {{type}}</li>
    <li>退款金额: {{price}}</li>
    <li v-if="payTime">支付时间: {{payTime}}</li>
    <li v-if="isPing">拼团时间: {{pingTime}}</li>
    <li v-if="deliverTime">发货时间: {{deliverTime}}</li>
    <li v-if="receiptTime">确认收货时间: {{receiptTime}}</li>
    <li>退款编号: {{orderRefundNo}}</li>
  </ul>
  <div class="voucher">
    <div class="header">凭证: </div>
    <div class="img-group">
      <div class="img-box" v-if="img1">
        <i class="img" :style="{backgroundImage: 'url(' + img1 + ')'}"></i>
      </div>
      <div class="img-box" v-if="img2">
        <i class="img" :style="{backgroundImage: 'url(' + img2 + ')'}"></i>
      </div>
      <div class="img-box" v-if="img3">
        <i class="img" :style="{backgroundImage: 'url(' + img3 + ')'}"></i>
      </div>
      <div class="img-box" v-if="img4">
        <i class="img" :style="{backgroundImage: 'url(' + img4 + ')'}"></i>
      </div>
      <div class="img-box" v-if="img5">
        <i class="img" :style="{backgroundImage: 'url(' + img5 + ')'}"></i>
      </div>
      <div class="img-box" v-if="img6">
        <i class="img" :style="{backgroundImage: 'url(' + img6 + ')'}"></i>
      </div>
    </div>
  </div>
  <div class="white-block" style="width: 100%; height: 100px; background-color: #fff;"></div>
  <div class="btn">
    <button v-if="state === 0" @click="dealWithOrderRefund(1)">同意</button>
    <button class="style1" v-if="state === 0" @click="toggleReason()">拒绝</button>
    <button v-if="state === 4" @click="toggleModal('visible4')">确认收货</button>
  </div>
  <!-- 遮罩层 -->
  <div class="mark" v-show="showReason" @click="cancelModel()"></div>
  <!-- 填写拒绝原因弹窗 -->
  <div class="reason" v-show="showReason">
    <div class="body">
      <div class="header">填写拒绝理由</div>
      <textarea v-model="content"></textarea>
    </div>
    <div class="footer">
      <span class="button cancel" @click="toggleReason()">取消</span>
      <span class="button ok" @click="dealWithOrderRefund(2)">确定</span>
    </div>
  </div>
  <i-modal :visible="visible2" @ok="confirmWithRefund()" @cancel="toggleModal('visible2')">
    <div class="visible">是否同意退款金额<span class="red">￥{{price}}</span>元给<span class="red">{{accountAddress.name}}</span>?</div>
  </i-modal>
  <i-modal title="是否确认收货？" :visible="visible4" @ok="sureReund()" @cancel="toggleModal('visible4')">
    <div class="visible">将自动退还金额<span class="red">￥{{price}}</span>给<span class="red">{{accountAddress.name}}</span></div>
  </i-modal>
</div>
</template>
<script>
import wx from "wx";
export default {
  data: {
    orderId: '',
    orderRefundId: '', // 订单Id
    state: 0, // 订单状态
    refundType: 0, // 售后类型
    goodsList: [], //商品列表
    accountAddress: {}, //收货人信息
    orderRefundNo: '', // 订单编号
    nick: '', // 买家昵称
    // addressName: '', //收货人姓名
    // addressMobile: '', // 收货人手机号
    createTime: '', //下单时间
    payTime: '', //支付时间
    deliverTime: '', //发货时间
    pingTime: '', //拼团时间
    receiptTime: '', //确认收货时间
    price: 0, // 退款金额
    type: '无', //退款原因
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    img6: '',
    content: '无',
    showReason: false,
    visible2: false,
    visible4: false
  },
  computed: {
    skuList() {
      if (this.goodsList) {
        let arr = []
        this.goodsList.forEach((item, index) => {
          arr.push([])
          item.skuList.forEach(ite => {
            arr[index].push({
              color: ite.skuCode.split(',')[0].toString(),
              size: ite.skuCode.split(',')[1].toString(),
              num: ite.num,
              price: ite.price,
            })
          })
        })
        console.log(arr);
        return arr
      }
    },
  },
  methods: {
    // 确认收货
    sureReund() {
      this.L_selectOrderRefundDetail({
        orderRefundId: this.orderId
      }).then(response => {
        wx.showToast({
          title: '已确认收货',
          icon: 'success'
        })
        setTimeout(() => {
          this.$router.back(-1)
        }, 1000)
      })
    },
    // 查看售后订单详情
    getRefundOrderDetail(orderRefundId) {
      return this.$API.L_selectOrderRefundDetail({
        orderRefundId
      })
    },
    // 点击遮罩关闭弹窗
    cancelModel() {
      this.showReason = false
    },
    // 售后订单处理
    dealWithOrderRefund(state) {
      if (state === 2) {
        this.$API.L_dealWithOrder({
          orderRefundId: this.orderId,
          state,
          content: this.content
        }).then(response => {
          wx.showToast({
            title: '已拒绝',
            icon: 'success'
          })
          this.showReason = false
        })
      } else if (state === 1) {
        this.visible2 = true
      }
    },
    // 确认同意
    confirmWithRefund() {
      this.$API.L_dealWithOrder({
        orderRefundId,
        state: 1,
        content: ''
      }).then(response => {
        wx.showToast({
          title: '已同意',
          icon: 'success'
        })
        this.showReason = false
        this.visible2 = false
        this.$router.back(-1)
      })
    },
    // 拒绝原因
    toggleReason() {
      this.showReason = !this.showReason
    },
    toggleModal(name) {
      // this.visible1 = !this.visible1
      this[name] = !this[name]
    },
  },
  mounted() {
    if (this.$route.query.orderRefundId) {
      console.log("请求了售后订单详情");
      this.orderRefundId = this.$route.query.orderRefundId
      this.getRefundOrderDetail(this.orderRefundId).then(response => {
        this.state = response.data.state
        this.orderId = response.data.id
        this.refundType = response.data.refundType
        this.goodsList = response.data.goodsList
        this.orderRefundNo = response.data.orderRefundNo
        this.accountAddress = response.data.accountAddress
        this.createTime = response.data.createTime
        // this.addressName = response.data.addressName
        this.nick = response.data.nick
        // this.addressMobile = response.data.addressMobile
        this.price = response.data.price
        if (response.data.img1) {
          this.img1 = response.data.img1
        }
        if (response.data.img2) {
          this.img2 = response.data.img2
        }
        if (response.data.img3) {
          this.img3 = response.data.img3
        }
        if (response.data.img4) {
          this.img4 = response.data.img4
        }
        if (response.data.img5) {
          this.img5 = response.data.img5
        }
        if (response.data.img6) {
          this.img6 = response.data.img6
        }
        if (response.data.accountAddress) {
          this.orderAddress = response.data.accountAddress
        }
        if (response.data.payTime) {
          this.payTime = response.data.payTime
        }
        if (response.data.deliverTime) {
          this.deliverTime = response.data.deliverTime
        }
        if (response.data.receiptTime) {
          this.receiptTime = response.data.receiptTime
        }
        if (response.data.content) {
          this.type = response.data.result
        }
      })
    }
    if (wx.getStorageSync('dpName')) {
      this.shopName = wx.getStorageSync('dpName')
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.wrapper
  width: 100%
  .tips
    width: 100%
    // height: 30px
    +singleFile
    display: flex
    align-items: center
    padding: 30px 24px
    background-color: #ffffff
    font-size: 28px
    margin-bottom: 10px
  .goodsList-body
    width: 100%
    display: flex
    flex-wrap: wrap
    border-bottom: 2px dashed #CCCCCC
    .header
      width: 100%
      // height: 30px
      +singleFile
      display: flex
      align-items: center
      padding: 20px 24px
      background-color: #ffffff
      font-size: 26px
    .goods-info
      width: 100%
      display: flex
      flex-wrap: wrap
      background-color: #F5F5F5
      .goods-body
        width: 100%
        padding: 20px 24px
        display: flex
        align-items: center
        i.goods-img
          display: inline-block
          width: 160px
          height: 160px
          background-repeat: no-repeat
          background-size: 100% 100%
          background-position: center
          margin-right: 40px
        .goods-message
          flex: 1
          overflow: hidden
          display: flex
          flex-wrap: wrap
          .name
            width: 100%
            color: #000
            font-size: 28px
            +singleFile
            // +moreLine(2)
          span
            width: 100%
            display: flex
            align-items: center
            font-size: 22px
            p.stall
              padding: 4px 8px
              color: #ffffff
              background-color: #cccccc
              border-radius: 4px
              margin-right: 20px
            p.futures
              color: #999999
          .footer
            width: 100%
            display: flex
            align-items: center
            font-size: 22px
            span
              flex: 1
              overflow: hidden
              display: flex
              flex-wrap: wrap
              font-size: 22px
              color: #999999
              p
                width: 100%
            button
              width: 100px
              height: 40px
              line-height: 40px
              text-align: center
              font-size: 24px
              color: #ffffff
              background-color: #999999
              border: none
              border-radius: 10px
      .total
        width: 100%
        display: flex
        align-items: center
        justify-content: flex-end
        +singleFile
        padding: 10px 24px
        background-color: #ffffff
        text-align: right
        font-size: 24px
        strong
          display: inline-block
          font-size: 30px
          color: #FF0000
  ul.orderNo
    display: flex
    flex-wrap: wrap
    padding: 0 24px
    margin-bottom: 10px
    font-size: 26px
    color: #666666
    background-color: #ffffff
    margin-bottom: 10px
    li
      width: 100%
      padding: 15px 0
      +singleFile
      display: flex
      align-items: center
      i.phone
        display: inline-block
        width: 24px
        height: 24px
        background: url("~@/assets/img/home/i01@2x.png") no-repeat center
        background-size: 100% 100%
        margin: 0 10px 0 40px
  .voucher
    width: 100%
    display: flex
    flex-wrap: wrap
    background-color: #ffffff
    .header
      width: 100%
      padding: 30px 24px
      font-size: 26px
    .img-group
      width: 100%
      display: flex
      flex-wrap: wrap
      div.img-box
        flex: 0 0 32%
        display: flex
        justify-content: center
        align-items: center
        margin: 0 10px 10px 5px
        &:nth-last-of-type(3n)
          margin: 0 5px 10px 0
        i.img
          display: inline-block
          width: 230px
          height: 230px
          background-repeat: no-repeat
          background-position: center
          background-size: 100% 100%
          border: 1px dashed #CCCCCC
  .btn
    position: fixed
    bottom: 0
    left: 0
    right: 0
    z-index: 6
    // padding: 20px 24px
    display: flex
    justify-content: flex-end
    background-color: #ffffff
    +border(1px, top, #EAEAEA)
    button
      width: 130px
      height: 60px
      line-height: 60px
      font-size: 24px
      border-radius: 4px
      background-color: #F67C2F
      color: #ffffff
      text-align: center
      margin: 20px 0 20px 10px
      &:first-of-type
        margin: 20px 0 20px 24px
      &:last-of-type
        margin: 20px 24px 20px 10px
    button.style1
      background-color: #ffffff
      color: #999999
      +border(1px, all, #999999)

  .mark
    position: fixed
    width: 100%
    height: 100%
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 6
    background-color: rgba(0, 0, 0, 0.6)

  .reason
    position: fixed
    width: 80%
    left: 0
    right: 0
    top: 300px
    margin: 0 auto
    z-index: 7
    background-color: #ffffff
    border-radius: 10px
    .body
      padding: 60px 85px
      display: flex
      justify-content: center
      flex-wrap: wrap
      .header
        width: 100%
        display: flex
        justify-content: center
        text-align: center
        padding: 0 0 40px
      textarea
        width: 100%
        height: 200px
        font-size: 26px
        overflow: hidden
        border: 1px solid #CCCCCC
        padding: 20px 10px
        text-align: left
    .footer
      width: 100%
      display: flex
      font-size: 26px
      text-align: center
      span.button
        width: 50%
        height: 100px
        line-height: 100px
      span.ok
        background-color: #F67C2F
        color: #ffffff
        border-radius: 0 0 10px 0
      span.cancel
        background-color: #CCCCCC
        color: #000000
        border-radius: 0 0 0 10px

  .visible
    padding: 20px 40px
    span.red
      color: #FF4500
</style>
