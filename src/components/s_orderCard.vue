<template>
<div class="wrapper">
  <!-- +++++++++++++++++++ 头部 +++++++++++++++++++++++++++ -->
  <!-- 非拼团订单 -->
  <div class="header" v-if="!isRefund && orderItem.layer !== -1 && orderItem.isPing !== 1">
    <span class="orderNo">订单编号: {{orderItem.orderNo}}</span>
    <span class="orderState">
      {{
      orderItem.state === 1 ? '等待支付'
      : orderItem.state === 2 ? '已取消'
      : orderItem.state === 5 ? '待发货'
      : orderItem.state === 6 ? '已发货'
      : orderItem.state === 7 ? '交易成功'
      : orderItem.state === 8 ? '交易关闭'
      : orderItem.state === 9 ? '拼单中'
      : orderItem.state === 10 ? '审核中'
      : '未知状态'
      }}
  </span>
  </div>
  <!-- 拼团订单\ 总单 -->
  <div class="header" v-if="orderItem.isPing === 1 && orderItem.layer === -1">
    <span class="orderNo">总拼团订单编号: {{orderItem.orderNo}}</span>
    <span class="orderState">
      {{
        orderItem.state === 1 ? '等待支付'
        : orderItem.state === 2 ? '已取消拼团'
        : orderItem.state === 5 ? '拼团成功, 待发货'
        : orderItem.state === 6 ? '已发货'
        : orderItem.state === 7 ? '交易成功'
        : orderItem.state === 8 ? '交易关闭'
        : orderItem.state === 9 ? '拼单中, 还差' + enoughPeopleNum + '人'
        : orderItem.state === 10 ? '审核中'
        : '未知状态'
      }}
    </span>
  </div>
  <!-- 拼团订单\ 子单 -->
  <div class="header" v-if="orderItem.isPing === 1 && orderItem.layer !== -1">
    <span class="orderNo">子拼团订单编号: {{orderItem.orderNo}}</span>
    <span class="orderState">
      {{
      orderItem.state === 1 ? '等待支付'
      : orderItem.state === 2 ? '已取消拼团'
      : orderItem.state === 5 ? '拼团成功, 待发货'
      : orderItem.state === 6 ? '已发货'
      : orderItem.state === 7 ? '交易成功'
      : orderItem.state === 8 ? '交易关闭'
      : orderItem.state === 9 ? '拼单中, 还差' + enoughPeopleNum + '人'
      : orderItem.state === 10 ? '审核中'
      : '未知状态'
      }}
  </span>
  </div>
  <!-- 售后订单 -->
  <div class="header" v-if="isRefund">
    <span class="orderNo">订单编号: {{orderItem.orderRefundNo}}</span>
    <span class="orderState">
        {{
        orderItem.state === 0 && orderItem.refundType === 0 ? '买家发起, 仅退款'
        : orderItem.state === 0 && orderItem.refundType === 1 ? '买家发起, 退货退款'
        : orderItem.state === 0 && orderItem.refundType === 2 ? '买家发起, 仅换货'
        : orderItem.state === 1 && orderItem.refundType === 0 ? '退款成功'
        : orderItem.state === 1 && orderItem.refundType === 1 ? '退货退款成功'
        : orderItem.state === 1 && orderItem.refundType === 2 ? '换货成功'
        : orderItem.state === 2 && orderItem.refundType === 0 ? '仅退款已被拒绝'
        : orderItem.state === 2 && orderItem.refundType === 1? '退款退货已被拒绝'
        : orderItem.state === 2 && orderItem.refundType === 2 ? '仅换货已被拒绝'
        : orderItem.state === 3 && orderItem.refundType === 1 ? '退货退款, 等待买家发货'
        : orderItem.state === 3 && orderItem.refundType === 2 ? '换货, 等待买家发货'
        : orderItem.state === 4 && orderItem.refundType === 1 ? '退货退款, 等待卖家收货'
        : orderItem.state === 4 && orderItem.refundType === 2 ? '换货, 等待卖家收货'
        : orderItem.state === 5 ? '撤销售后'
        : '未知状态'
      }}
      </span>
  </div>
  <!-- ++++++++++++++++++++ 主体 +++++++++++++++++++++++++++++++ -->
  <!-- 非拼团订单 -->
  <div class="order-body" v-if="orderItem.state !== 5">
    <div class="img-box" v-if="orderItem.goods">
      <i class="shopImg" :style="{backgroundImage: 'url(' + orderItem.goods.image + ')'}"></i>
    </div>
    <div class="img-box" v-else-if="orderItem.layer !== -1 && !isRefund" @click="pageTo('/pages/home/orderMgr/goodsList', orderItem.orderGoods, false)">
      <i class="shopImg" v-for="(orderGood, goodIndex) in orderItem.orderGoods" :key="goodIndex" :style="{backgroundImage: 'url(' + orderGood.image + ')'}" v-if="goodIndex < 3"></i>
    </div>
    <div class="img-box" v-else-if="isRefund" @click="pageTo('/pages/home/orderMgr/goodsList', orderItem.goodsList, false)">
      <i class="shopImg" v-for="(orderGood, goodIndex) in orderItem.goodsList" :key="goodIndex" :style="{backgroundImage: 'url(' + orderGood.image + ')'}" v-if="goodIndex < 3"></i>
    </div>
    <div class="icon"></div>
  </div>
  <!-- 拼团订单 -->
  <div class="pingOrder-body" v-if="orderItem.state == 5 && orderItem.goods">
    <div class="img-box" v-if="orderItem.goods">
      <i class="shopImg" :style="{backgroundImage: 'url(' + orderItem.goods.image + ')'}"></i>
    </div>
  </div>
  <div class="pingOrder-body" v-if="orderItem.state == 5 && !isRefund" v-for="(orderGood, orderGoodIndex) in orderItem.orderGoods" :key="orderGoodIndex">
    <div class="goods-body">
      <i class="goods-img" :style="{backgroundImage: 'url(' + orderGood.image + ')'}"></i>
      <div class="goods-info">
        <span class="title">{{orderGood.name || '[商品未设置标题]'}}</span>
        <span class="details">
          <p class="stall">档口名称: {{orderGood.stallInfo3}}</p>
          <p class="time">货期: {{orderGood.delivery}}</p>
        </span>
        <div class="footer">
          <div class="size">
            <span v-for="(skuItem, skuIndex) in skuList[orderGoodIndex]" :key="skuIndex">
              {{skuItem.color}}色: {{skuItem.size}}码丨{{skuItem.num}}件
            </span>
          </div>
          <button class="edit" @click="togglePopups(orderGoodIndex)">编辑</button>
        </div>
      </div>
    </div>
    <!-- 拆单详情 < 仅有待发货状态才显示 >-->
    <div class="table" v-if="orderItem.state === 5 && orderItem.isHasDeliver && !isEdited">
      <table style="border: none;">
        <tr>
          <th>颜色</th>
          <th>码数</th>
          <th>总件数</th>
          <th>待发件数</th>
          <th>剩余待发</th>
        </tr>
        <tr v-for="(deliver, deliverIndex) in deliverList[orderGoodIndex]" :key="deliverIndex">
          <td>{{deliver.color}}</td>
          <td>{{deliver.size}}</td>
          <td>{{deliver.num}}</td>
          <td>{{deliver.deliver}}</td>
          <td>{{deliver.remain}}</td>
        </tr>
      </table>
    </div>
    <!-- 编辑保存后显示的table -->
    <div class="table" v-if="isEdited">
      <table style="border: none;">
        <tr>
          <th>颜色</th>
          <th>码数</th>
          <th>总件数</th>
          <th>待发件数</th>
          <th>剩余待发</th>
        </tr>
        <tr v-for="(skuItem, skuIndex) in skuList[orderGoodIndex]" :key="skuIndex">
          <td>{{skuItem.color}}</td>
          <td>{{skuItem.size}}</td>
          <td>{{skuItem.num}}</td>
          <td>{{skuItem.deliver}}</td>
          <td>{{skuItem.remain}}</td>
        </tr>
      </table>
    </div>
    <!-- 编辑弹框 -->
    <div class="popups" v-show="popupsIndex === orderGoodIndex">
      <table>
        <tr class="header">
          <th>颜色</th>
          <th>码数</th>
          <th>总件数</th>
          <th class="col-2">待发件数</th>
          <th>剩余待发</th>
        </tr>
        <tr v-for="(skuItem, skuIndex) in lastSkuList[orderGoodIndex]" :key="skuIndex">
          <td>{{skuItem.color}}</td>
          <td>{{skuItem.size}}</td>
          <td>{{skuItem.num}}</td>
          <td class="col-2">
            <button @click="cut(orderGoodIndex, skuIndex)" :disabled="skuItem.deliver === 0">-</button>
            <!-- <input type="number" v-model="skuItem.deliver" :min="0" :max="skuItem.remain"> -->
            <span class="edit">{{skuItem.deliver}}</span>
            <!-- <i-input-number :value="skuItem.deliver" :min="0" :max="skuItem.remain" :step="2" @change="handleChange2" /> -->
            <button @click="add(orderGoodIndex, skuIndex)" :disabled="skuItem.deliver === skuItem.remain">+</button>
          </td>
          <td>{{skuItem.remain}}</td>
        </tr>
      </table>
      <div class="btn-group">
        <button type="button" class="cancel" @click="cancel(orderGoodIndex)">取消</button>
        <button type="button" class="save" @click="save()">保存</button>
      </div>
    </div>
  </div>
  <!-- 非拼团订单 -->
  <!-- <div class="pingOrder-body" v-if="orderItem.layer == -1">
      <i class="goods-img" :style="{backgroundImage: 'url(' + orderItem.goods.image + ')'}"></i>
      <div class="goods-info">
        <span class="title">{{orderItem.goods.name}}</span>
        <span class="details">
          <p class="stall">档口名称: {{orderItem.goods.stallInfo3}}</p>
          <p class="time">货期: {{orderItem.goods.delivery}}</p>
        </span>
        <div class="footer">
          <div class="size">
            <span></span>
          </div>
          <button class="edit" v-if="orderItem.isHasChildren === 1 && orderItem.state === 5">编辑</button>
        </div>
      </div>
    </div> -->
  <!-- 订单款式, 件数, 金额, 收货人等信息 -->
  <div class="order-details" v-if="orderItem.state !== 5 && orderItem.isHasChildren !== 1&& !isRefund">
    <div class="detail">
      <div class="num">
        共{{orderItem.orderGoods.length}}个款，合计{{orderItem.num}}件
      </div>
      <div class="price">
        订单金额: <span>{{orderItem.paid}}元</span>
      </div>
    </div>
    <div class="buyer">
      收货人: {{orderItem.shopAddress ? orderItem.shopAddress.name : '未设置收货人'}} 丨 手机号: {{orderItem.shopAddress ? orderItem.shopAddress.mobile : '未知号码'}}
    </div>
  </div>
  <div class="order-details" v-if="isRefund">
    <div class="detail">
      <div class="num">
        共{{orderItem.goodsList.length}}个款，合计{{refundOrderGoodsNum}}件
      </div>
      <div class="price">
        订单金额: <span>{{orderItem.price}}元</span>
      </div>
    </div>
    <div class="buyer">
      收货人: {{orderItem.accountAddress ? orderItem.accountAddress.name : '未设置收货人'}} 丨 手机号: {{orderItem.accountAddress ? orderItem.accountAddress.mobile : '未知号码'}}
    </div>
  </div>
  <!-- <div class="pingOrder-details" v-if="orderItem.state === 9 && orderItem.isHasChildren === 1 && !isRefund">
    共{{orderItem.orderGoods.length}}款{{orderGoodsNum}}件商品, 合计：<span>{{orderItem.paid}}元</span>
  </div> -->
  <!-- 子订单列表 -->
  <ul class="childOrder" v-if="orderItem.layer !== -1 && orderItem.isHasChildren">
    <li v-for="(childOrder, childOrderIndex) in orderItem.children" :key="childOrderIndex" @click="pageTo('/pages/home/orderMgr/orderdetail', childOrder.id, false)">
      子订单编号({{ childOrder.state === 1 ? '等待支付'
      : childOrder.state === 2 ? '已取消'
      : childOrder.state === 5 ? '待发货'
      : childOrder.state === 6 ? '已发货'
      : childOrder.state === 7 ? '交易成功'
      : childOrder.state === 8 ? '交易关闭'
      : childOrder.state === 9 ? '拼单中, 还差' + enoughPeopleNum + '人'
      : childOrder.state === 10 ? '审核中'
      : '未知状态'
      }}):
      {{childOrder.orderNo}}</li>
  </ul>
  <!-- 按钮组 -->
  <div class="button-group">
    <div class="pingUser" v-if="orderItem.pingUser">
      <i v-for="(pingUser, pingUserIndex) in orderItem.pingUser" :key="pingUserIndex" :style="{backgroundImage: 'url(' + pingUser.head + ')'}" v-if="pingUserIndex < 3"></i>
    </div>
    <button class="style1" v-if="!isRefund && (orderItem.isPing !== 1 || orderItem.layer !== -1)" @click="pageTo('/pages/home/orderMgr/orderdetail', orderItem.id, false)">查看详情</button>
    <button class="style1" v-if="isRefund && orderItem.layer !== -1" @click="pageTo('/pages/home/orderMgr/orderRefundDetail', orderItem.id, true)">查看详情</button>
    <button class="style-big" v-if="orderItem.isPing === 1 && orderItem.layer === -1" @click="pageTo('/pages/home/orderMgr/groupItemDetail', orderItem.pingOrderId, false)">查看子拼团</button>
    <button class="style2" v-if="orderItem.state === 6 && (orderItem.isPing !== 1 || orderItem.layer !== -1)" @click="pageTo('/pages/home/orderMgr/logisticsDetail', orderItem.id, false)">查看物流</button>
    <button class="style2" v-if="orderItem.state === 5 && (orderItem.isPing !== 1 || orderItem.layer !== -1)" @click="ship(orderItem.id)">发货</button>
    <button class="style3" v-if="isRefund && orderItem.state === 0" @click="dealWithOrderRefund(orderItem.id, 1)">同意</button>
    <button class="style2" v-if="isRefund && orderItem.state === 0" @click="toggleReason()">拒绝</button>
    <button class="style2" v-if="isRefund && orderItem.state === 4" @click="toggleModal('visible4')">确认收货</button>
    <button class="style1" v-if="orderItem.state === 1 && isPersonal" @click="toggleModal('visible5')">确认已支付</button>
    <button class="style2" v-if="!isRefund && orderItem.state === 1" @click="toggleModal('visible3')">取消订单</button>
  </div>
  <!-- ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←← -->
  <!-- 物流信息填写弹窗 -->
  <div class="logistics" v-if="showLogistics">
    <div class="wrapper">
      <div class="title">请填写物流信息</div>
      <ul class="body">
        <li>
          物流公司:
          <div class="selector-picker">
            <picker :value="index" :range="companies" :range-key="'text'" @change="handle">
              <view class="picker">
                {{companies[index].text}}
              </view>
            </picker>
          </div>
          <!-- <span class="picker">-请选择物流公司-</span> -->
        </li>
        <li>
          快递单号:
          <input type="number" v-model="logisticsNo" placeholder="请填写快递单号">

        </li>
        <li>上传快递信息凭证: </li>
        <li class="upload-img">
          <scroll-view class="scroll-view " scroll-y style="height: 220rpx;">
            <div class="img-box" v-for="(item, index) in imageList" :key="index">
              <i class="img" :style="{backgroundImage: 'url(' + item + ')'}"></i>
            </div>
            <div class="img-box">
              <i class="add-img" @tap="bindButtonTapImage">
                + 可上传图片
              </i>
            </div>
          </scroll-view>
        </li>
      </ul>
    </div>
    <div class="checkbox">
      <!-- <input type="radio" v-model="noExpress"> -->
      <!-- <i-radio :value="noExpress"></i-radio> -->
      <i class="select-icon" :class="[noExpress ? 'active' : '']" @click="toggleNoExpress()"></i>
      无物流信息
    </div>
    <div class="footer">
      <span class="cancel" @click="cancelExpress()">取消</span>
      <span class="ok" @click="confirmExpress(orderItem.id)">确定发货</span>
    </div>
  </div>
  <!-- 遮罩层 -->
  <div class="mark" v-show="showLogistics || showPopups || showReason" @click="cancelModel()"></div>
  <!-- 填写拒绝原因弹窗 -->
  <div class="reason" v-show="showReason">
    <div class="body">
      <div class="header">填写拒绝理由</div>
      <textarea v-model="content"></textarea>
    </div>
    <div class="footer">
      <span class="button cancel" @click="toggleReason()">取消</span>
      <span class="button ok" @click="dealWithOrderRefund(orderItem.id, 2)">确定</span>
    </div>
  </div>
  <!-- 对话框 -->
  <i-modal title="请检查..." :visible="visible1" @ok="toggleModal('visible1')" @cancel="toggleModal('visible1')">
    <div class="visible">未编辑待发货数量</div>
  </i-modal>
  <i-modal :visible="visible2" @ok="confirmWithRefund(orderItem.id)" @cancel="toggleModal('visible2')">
    <div class="visible">
      是否同意退款金额<span class="red">￥{{orderItem.price}}元</span>给<span class="red">{{orderItem.accountAddress ? orderItem.accountAddress.name : '未设置收货人'}}</span>?
    </div>
  </i-modal>
  <i-modal :visible="visible3" @ok="closeOrder(orderItem.id)" @cancel="toggleModal('visible3')">
    <div class="visible">确定取消订单？</div>
  </i-modal>
  <i-modal title="是否确认收货？" :visible="visible4" @ok="sureReund(orderItem.id)" @cancel="toggleModal('visible4')">
    <div class="visible2">将自动退还金额<span class="red">￥{{orderItem.price}}元</span>给<span class="red">{{orderItem.accountAddress ? orderItem.accountAddress.name : '未设置收货人'}}</span></div>
  </i-modal>
  <i-modal :visible="visible5" @ok="surePay(orderItem.id)" @cancel="toggleModal('visible5')">
    <div class="visible">是否确认已收款?</div>
  </i-modal>
  <!-- 全局提醒 -->
  <i-message id="message" />
</div>
</template>
<script>
import wx from "wx";
import mixin from '@/mixin'
import config from '@/config'
export default {
  components: {},
  data() {
    return {
      content: '', // 拒绝退款理由
      showEditTable: false, //显示编辑表格
      isEdited: false, //是否已编辑保存
      popupsIndex: -1, // 编辑弹窗识别号
      orderGoodsNum: 0, //普通订单的商品总件数
      pingOrderGoodsNum: 0, //拼团订单的商品总件数
      // orderDetailsList: [], // 拆单后订单状态
      refundOrderGoodsNum: 0, // 售后商品总件数
      isRefund: false, // 如果是售后订单列表
      showPopups: false,
      showLogistics: false,
      showReason: false,
      // deliverArr: [], // 发货件数
      skuList: [],
      lastSkuList: [], // skuList最近保存的副本
      deliverList: [], //拆单后table数据
      index: 0, //物流公司
      logisticsNo: '', // 快递单号
      noExpress: false, //是否无物流信息,
      imageList: [], // 凭证图片列表
      imgList: [], // 选择的图片列表
      maxNum: 6, // 最多上传数量
      // companies: ['-请选择物流公司-', '顺丰速运', '邮政EMS', '圆通快递', '申通快递', '韵达快递', '百世汇通', '中通快递', '天天快递', '优速物流', ],
      companies: [{
          text: '-请选择物流公司-',
          type: 0
        },
        {
          text: '顺丰速运',
          type: 1
        },
        {
          text: '邮政EMS',
          type: 2
        },
        {
          text: '圆通快递',
          type: 3
        },
        {
          text: '申通快递',
          type: 4
        },
        {
          text: '韵达快递',
          type: 5
        },
        {
          text: '百世汇通',
          type: 6
        },
        {
          text: '中通快递',
          type: 7
        },
        {
          text: '天天快递',
          type: 8
        },
        {
          text: '优速物流',
          type: 9
        }
      ],
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false
    };
  },
  props: {
    orderItem: {
      type: Object,
      default: {}
    },
    // isPersonal: {
    //   type: Number,
    //   default: 0
    // }
  },
  updated() {
    //do something after updating vue instance
  },
  computed: {
    isPersonal() {
      if (wx.getStorageSync('isPersonal') == 1) {
        return false
      } else {
        return true
      }
    },
    enoughPeopleNum() {
      if (this.orderItem.state === 9) {
        return this.orderItem.ping.num - this.orderItem.pingUser.length
      }
    },
  },
  methods: {
    // 确认已收款
    surePay(orderId) {
      this.$API.L_surePay({
        orderId
      }).then(response => {
        wx.showToast({
          title: '已确认收款',
          icon: 'success'
        })
        setTimeout(() => {
          this.visible5 = false
        }, 1200)
      })
    },
    // 确认收货
    sureReund(orderRefundId) {
      this.visible4 = false;
      this.$API.L_sureReund({
        orderRefundId
      })
        .then(res => {
          console.log(res);
          
          wx.showToast({
            title: '已确认收货',
            icon: 'success',
            icon: 'none'
          })
          setTimeout(() => {
            wx.startPullDownRefresh();
          }, 1500);
        })
        .catch(err => {
          console.log(err);
        })
    },
    // 售后订单处理
    dealWithOrderRefund(orderRefundId, state) {
      if (state === 2) {
        this.$API.L_dealWithOrder({
          orderRefundId,
          state,
          relust: this.content
        }).then(response => {
          wx.showToast({
            title: '已拒绝',
            icon: 'success'
          })
          this.showReason = false
          wx.startPullDownRefresh();
        })
      } else if (state === 1) {
        wx.showModal({
          title: '提示',
          content: '是否同意确认处理该售后订单？',
          success: res => {
            if (res.confirm) {
              this.confirmWithRefund(orderRefundId);
              // this.visible2 = true
            }
          }
        })
        // this.visible2 = true
      }
    },
    // 确认同意
    confirmWithRefund(orderRefundId) {
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
        wx.startPullDownRefresh();
      })
    },
    // 关闭订单
    closeOrder(orderId) {
      this.$API.L_shopClose({
        orderId
      }).then(response => {
        wx.showToast({
          title: '已取消',
          icon: 'success'
        })
        this.visible3 = false
      })
    },
    bindButtonTapImage() {
      const maxNum = this.maxNum;
      wx.showLoading({
        title: '加载中',
      });
      var that = this;
      if (maxNum && this.imgList.length >= maxNum) {
        this.handleError(`不能超过${maxNum}张图片噢！`);
        wx.hideLoading();
        return;
      }
      //选择图片
      wx.chooseImage({
        sizeType: "original",
        count: this.uploadNum,
        success: function(res) {
          console.log(res);
          var tempFilePath = res.tempFilePaths;
          console.log(tempFilePath);
          tempFilePath.forEach(item => {
            that.uploadImg(item);
          })
        },
        fail: function() {
          wx.showLoading({
            title: '操作失败',
          })
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    },
    //上传图片
    uploadImg(tempFilePath) {
      console.log('lastIndexOf ============', tempFilePath.slice(tempFilePath.lastIndexOf('/') + 1).toString());
      var location = tempFilePath.lastIndexOf('/') + 1;
      var that = this;
      const uploadTask = wx.uploadFile({
        url: config.uploadImageUrl,
        filePath: tempFilePath,
        name: "file",
        formData: {
          name: tempFilePath.slice(location).toString(),
          key: "img/${filename}",
          policy: config.imgPolicy,
          OSSAccessKeyId: config.OSSAccessKeyId,
          success_action_status: "200",
          signature: config.imgSignature
        },
        success: function(res) {
          console.log(res);
          console.log("tempFilePath  ========", tempFilePath);
          if (parseInt(res.statusCode) == 400) {
            that.handleError("上传的图片大小不能超过2m!");
          } else if (parseInt(res.statusCode) == 200) {
            if (that.maxNum && that.imgList.length >= that.maxNum) {
              that.handleError('不能超过6张图片噢！')
              return
            }
            that.imgList.push(
              config.uploadImageUrl + "/img/" + tempFilePath.slice(location).toString()
            );
            console.log('图片列表===>' + that.imgList);
            // that.$emit('getImg', config.uploadImageUrl + "/img" + tempFilePath.substring(10))
            that.getImg(config.uploadImageUrl + "/img/" + tempFilePath.slice(location).toString())
          }
        },
        fail: function(err) {
          console.log(err);
        }
      })
      uploadTask.onProgressUpdate((res) => {
        if (res.progress === 100) {
          wx.showToast({
            title: '上传完成'
          })
        }
      })
    },
    getImg(src) {
      this.imageList.push(src)
      console.log("imageList ===> " + this.imageList);
    },
    // 全局提醒
    handleError(msg) {
      this.$Message({
        content: msg,
        type: "error"
      })
    },
    handle(e) {
      console.log(e.mp.detail.value);
      this.index = e.mp.detail.value;
    },
    // 点击遮罩关闭弹窗
    cancelModel() {
      this.showPopups = false
      this.showLogistics = false
      this.showReason = false
      this.popupsIndex = -1
    },
    ship(orderId) {
      if (!this.isEdited && this.deliverList && this.deliverList.every(item => item.every(ite => {
          return ite.deliver === 0
        }))) {
        // 如果是未编辑状态
        this.visible1 = !this.visible1
      } else if (this.isEdited && this.lastSkuList && this.lastSkuList.every(item => item.every(ite => {
          return ite.deliver === 0
        }))) {
        this.visible1 = !this.visible1
      } else {
        this.showLogistics = !this.showLogistics
      }
    },
    // 页面跳转
    pageTo(url, orderId, isRefund = false) {
      if (url === '/pages/home/orderMgr/goodsList') {
        this.$router.push({
          path: url,
          query: {
            orderId: JSON.stringify(orderId)
          }
        })
        return
      }
      if (isRefund) {
        this.$router.push({
          path: url,
          query: {
            orderRefundId: orderId
          }
        })
      } else {
        this.$router.push({
          path: url,
          query: {
            orderId
          }
        })
      }
    },
    // 切换编辑弹窗
    togglePopups(index) {
      this.showPopups = true
      this.popupsIndex = index
      this.isEdited = false
    },
    cut(pIndex, index) {
      console.log(this.orderItem.orderGoods[pIndex].skuList[index].skuId);
      this.$set(this.lastSkuList[pIndex], index, {
        deliver: this.lastSkuList[pIndex][index].deliver -= 1,
        color: this.lastSkuList[pIndex][index].color,
        size: this.lastSkuList[pIndex][index].size,
        num: this.lastSkuList[pIndex][index].num,
        remain: this.lastSkuList[pIndex][index].remain,
        skuId: this.orderItem.orderGoods[pIndex].skuList[index].skuId
      })
    },
    add(pIndex, index) {
      this.$set(this.lastSkuList[pIndex], index, {
        deliver: this.lastSkuList[pIndex][index].deliver += 1,
        color: this.lastSkuList[pIndex][index].color,
        size: this.lastSkuList[pIndex][index].size,
        num: this.lastSkuList[pIndex][index].num,
        remain: this.lastSkuList[pIndex][index].remain,
        skuId: this.orderItem.orderGoods[pIndex].skuList[index].skuId
      })
    },
    cancel(pIndex) {
      // this.$set(this.skuList[pIndex], pIndex, {
      //   deliver: this.skuList[pIndex][index].deliver += 1,
      //   color: this.skuList[pIndex][index].color,
      //   size: this.skuList[pIndex][index].size,
      //   num: this.skuList[pIndex][index].num,
      //   remain: this.skuList[pIndex][index].remain
      // })
      // console.log(this.lastSkuList)
      // if(this.isEdited == false) {
      //   this.showPopups = false
      //   this.popupsIndex = -1
      //   // this.skuList[pIndex].forEach(item => {
      //   //   item.deliver = 0
      //   // })
      // }else {
      this.showPopups = false
      this.popupsIndex = -1
      // }
      // let skuIdArr = []
      // this.skuList.forEach((item, index) => {
      //   item.forEach(ite => {
      //     skuIdArr.push({
      //       num: ite.deliver,
      //       skuId: item.skuId
      //     })
      //   })
      // })
      // console.log(skuIdArr);
      // wx.request({
      //   url: config.url + '/api/order/goods/addChildren',
      //   method: 'POST',
      //   dataType: 'json',
      //   data: {
      //     shopId: config.appId,
      //     sessionId: wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`),
      //     orderIds: this.orderId,
      //     orderDeliver: skuIdArr
      //   },
      //   success(res) {
      //     console.log("请求成功:", res);
      //   },
      //   complete(result) {
      //     this.showPopups = !this.showPopups
      //   }
      // })
    },
    save() {
      let skuIdArr = []
      let vm = this
      this.lastSkuList.forEach((item, index) => {
        item.forEach((ite, subIndex) => {
          skuIdArr.push({
            num: ite.deliver,
            skuId: this.orderItem.orderGoods[index].skuList[subIndex].skuId
          })
        })
      })
      const sessionId = wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`);
      
      const account = wx.getAccountInfoSync();
      const { miniProgram: { appId } } = account;
      wx.request({
        url: config.url + '/api/order/goods/addChildren',
        method: 'POST',
        dataType: 'json',
        data: {
          shopId: appId,
          sessionId,
          orderIds: vm.orderId,
          orderDeliver: skuIdArr
        },
        success(res) {
          console.log('res', res);
          vm.showEditTable = true
          vm.isEdited = true
          // vm.skuList = vm.lastSkuList
          vm.skuList = JSON.parse(JSON.stringify(vm.lastSkuList))
          vm.showPopups = false
          vm.popupsIndex = -1
        },
        fail(err) {
          console.log('err', err);
          wx.showToast({
            title: '编辑失败',
            icon: 'none'
          })
        },
        complete(result) {
          // vm.showPopups = false
          // vm.popupsIndex = -1
        }
      })
    },
    cancelExpress() {
      this.showLogistics = false
    },
    confirmExpress(orderId) {
      // this.showLogistics = !this.showLogistics
      if (this.noExpress) {
        // 无物流信息发货
        this.confirmShip({
          orderId
        }).then(response => {
          wx.showToast({
            title: '已发货',
            icon: 'success'
          })
          this.showLogistics = false
          setTimeout(() => {
            wx.startPullDownRefresh();
          }, 1500)
        })
      } else {
        // 有物流信息发货
        if (this.index === 0) {
          wx.showToast({
            title: '请选择物流公司',
            icon: 'none'
          })
          return
        }
        if (!this.logisticsNo) {
          wx.showToast({
            title: '请填写物流单号',
            icon: 'none'
          })
          return
        }
        if (this.logisticsNo.length > 14) {
          wx.showToast({
            title: '快递单号长度最长14位',
            icon: 'none'
          })
          return
        }
        this.confirmShip({
          orderId,
          logisticsNo: this.logisticsNo,
          image: this.imgList.toString(),
          type: this.index
        }).then(response => {
          wx.showToast({
            title: '已发货',
            icon: 'success'
          })
          this.showLogistics = false
          setTimeout(() => {
            wx.startPullDownRefresh();
          }, 1500)
        })
      }
    },
    // 无物流按钮点击切换
    toggleNoExpress() {
      this.noExpress = !this.noExpress
    },
    // 发货请求
    confirmShip(params) {
      return this.$API.L_deliverGoods(params)
    },
    toggleModal(name) {
      console.log("点击事件执行");
      // this.visible1 = !this.visible1
      this[name] = !this[name]
    },
    // 拒绝原因
    toggleReason() {
      this.showReason = !this.showReason
    }
  },
  created() {
    // console.log(this.companies);
    // console.log("子组件created钩子函数执行", this.orderItem);
    if (this.orderItem.state === 5 && !this.isRefund) {
      // 计算商品总件数
      // let num = 0
      // this.orderItem.orderGoods.forEach(item => {
      //   item.skuList.forEach(skuItem => {
      //     num += skuItem.num
      //   })
      // })
      // this.orderGoodsNum = num
      // 获取商品规格数据
      try {

        let arr = []
        console.log(this.orderItem);
        this.orderItem.orderGoods.forEach((item, index) => {
          arr.push([])
          item.skuList.forEach(skuItem => {
            console.log(skuItem.skuId);
            arr[index].push({
              color: skuItem.skuCode.split(',')[0].toString(),
              size: skuItem.skuCode.split(',')[1].toString(),
              num: skuItem.num,
              deliver: 0,
              remain: skuItem.remainNum,
              skuId: skuItem.skuId
            })
          })
        })
        this.skuList = arr
        this.lastSkuList = arr
      } catch (err) {
        console.log(err);
      }
    }
    if (this.orderItem.goodsList) {
      console.log("找到售后订单: ", this.isRefund);
      this.isRefund = true
      console.log("this.isRefund : ", this.isRefund);
      let num = 0
      this.orderItem.goodsList.forEach(item => {
        item.skuList.forEach(ite => {
          num += ite.num
        })
      })
      this.refundOrderGoodsNum = num
    }
    // if (this.orderItem.state === 5 && !isRefund) {
    //   let arr = []
    //   this.orderItem.orderGoods.forEach((item, index) => {
    //     arr.push([])
    //     item.skuList.forEach(skuItem => {
    //       arr[index].push({
    //         color: skuItem.skuCode.split(',')[0].toString(),
    //         size: skuItem.skuCode.split(',')[1].toString(),
    //         num: skuItem.num,
    //         deliver: 0,
    //         remain: skuItem.remainNum,
    //         skuId: skuItem.skuId
    //       })
    //     })
    //   })
    //   this.skuList = arr
    //   this.lastSkuList = this.skuList
    // }
    if (this.orderItem.isHasDeliver) {
      console.log("编辑过的订单找到了")
      let arr = []
      this.orderItem.orderGoods.forEach((item, index) => {
        arr.push([])
        item.deliverList.forEach(ite => {
          arr[index].push({
            color: ite.skuCode.split(',')[0].toString(),
            size: ite.skuCode.split(',')[1].toString(),
            num: ite.num,
            deliver: ite.canDeliverNumber,
            remain: ite.remainNum,
          })
        })
      })
      this.deliverList = arr
      this.lastSkuList = arr
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.wrapper
  display: flex
  flex-wrap: wrap
  justify-content: center
  background-color: #ffffff
  // border-radius: 6px
  // .card-body
  //   background-color: #ffffff
  //   border-radius: 6px
  //   display: flex
  //   flex-wrap: wrap
  //   margin: 15px 24px
  .header
    width: 100%
    padding: 20px
    display: flex
    align-items: center
    +border(1px, bottom, #EAEAEA)
    span.orderNo
      +singleFile
      font-size: 24px
      text-align: left
    span.orderState
      flex: 1
      color: #F67C2F
      width: 120px
      +singleFile
      font-size: 22px
      text-align: right
  .order-body
    width: 100%
    padding: 20px
    display: flex
    +border(1px, bottom, #EAEAEA)
    .img-box
      flex: 1
      overflow: hidden
      display: flex
      i.shopImg
        display: inline-block
        width: 160px
        height: 160px
        border-radius: 6px
        margin-right: 20px
        background-position: center
        background-size: cover
        &:last-of-type
          margin: 0
    .icon
      width: 50px
      background: url('~@/assets/img/home/shanJiao.png') no-repeat right
      background-size: 16px 29px
  .pingOrder-body
    width: 100%
    padding: 20px
    display: flex
    flex-wrap: wrap
    +border(1px, bottom, #EAEAEA)
    .img-box
      flex: 1
      overflow: hidden
      display: flex
      i.shopImg
        display: inline-block
        width: 160px
        height: 160px
        border-radius: 6px
        margin-right: 20px
        background-position: center
        background-size: 100% 100%
        &:last-of-type
          margin: 0
    .goods-body
      width: 100%
      display: flex
      i.goods-img
        display: inline-block
        width: 160px
        height: 160px
        border-radius: 6px
        margin-right: 30px
        background-position: center
        background-size: 100% 100%
        background-repeat: no-repeat
      .goods-info
        flex: 1
        overflow: hidden
        display: flex
        flex-wrap: wrap
        span.title
          width: 100%
          +moreLine(2)
          font-size: 28px
          text-align: left
        span.details
          width: 100%
          font-size: 22px
          p.stall
            display: inline-block
            color: #ffffff
            background-color: #CCCCCC
            border-radius: 10px
            padding: 4px 8px
            margin-right: 20px
          p.time
            display: inline-block
            color: #999999
            background-color: #ffffff
        .footer
          width: 100%
          font-size: 22px
          display: flex
          align-items: center
          justify-content: space-between
          .size
            flex: 1
            overflow: hidden
            display: flex
            flex-wrap: wrap
            span
              width: 100%
              text-align: left
              color: #999999
              background-color: #ffffff
              +singleFile
              padding-bottom: 2px
          button.edit
            width: 100px
            height: 50px
            line-height: 50px
            color: #F67C2F
            margin-left: 10px
            background-color: #ffffff
            font-size: 24px
            +border(1px, all, #F67C2F)
    .table
      width: 100%
      padding: 30px 0
      // +border(1px, bottom, #EAEAEA)
      table
        width: 100%
        text-align: center
        display: flex
        flex-wrap: wrap
        font-size: 24px
        border-collapse: collapse
        border-radius: 10px
        tr
          width: 100%
          display: flex
          color: #333333
          border-top: 1px solid #EAEAEA
          // border-bottom: 1px solid #D3D3D3
          &:first-of-type
            border-top: none
          &:nth-of-type(2n)
            background-color: #F2F2F2
            color: #333333
          th,td
            flex: 1
            padding: 5px 0
          th
            color: #000000
            font-weight: bold
  ul.childOrder
    width: 100%
    margin: 0
    padding: 0 20px
    display: flex
    flex-wrap: wrap
    font-size: 24px
    +border(1px, bottom, #EAEAEA)
    li
      width: 100%
      text-align: left
      padding: 30px 0
      background: url("~@/assets/img/home/shanJiao.png") no-repeat right
      background-size: 16px 29px
      +border(1px, bottom, #EAEAEA)
      &:last-of-type
        border: none
  .order-details
    width: 100%
    padding: 10px 20px
    +border(1px, bottom, #EAEAEA)
    // display: flex
    align-items: center
    font-size: 24px
    .detail
      width: 100%
      display: flex
      align-items: center
      text-align: right
      padding-bottom: 10px
      border-bottom: 1px dashed #EAEAEA
      .num
        flex: 1
        +singleFile
        text-align: left
      .price
        +singleFile
        span
          display: inline-block
          color: #FF0000
          font-size: 30px
    .buyer
      padding-top: 10px
      width: 100%
      font-size: 24px
      +singleFile
  .pingOrder-details
    width: 100%
    padding: 20px
    text-align: right
    +border(1px, bottom, #EAEAEA)
    font-size: 24px
  .button-group
    width: 100%
    display: flex
    align-items: center
    justify-content: flex-end
    padding: 18px 20px
    .pingUser
      flex: 1
      overflow: hidden
      i
        display: inline-block
        width: 84px
        height: 84px
        border: 1px, dashed, #808080
        border-radius: 2px
        margin-right: 10px
        background-position: center
        background-size: 100% 100%
        background-repeat: no-repeat
        &:last-of-type
          margin: 0
    button
      width: 130px
      height: 60px
      line-height: 60px
      text-align: center
      font-size: 22px
      +singleFile
      margin-right: 20px
      &:last-of-type
        margin: 0
    button.style1
      background-color: #F67C2F
      color: #ffffff
    button.style2
      background-color: #ffffff
      color: #999999
      +border(1px, all, #999999)
    button.style3
      background-color: #ffffff
      color: #F67C2F
      +border(1px, all, #F67C2F)
    button.style-big
      width: 180px
      background-color: #F67C2F
      color: #ffffff
  .popups
    background-color: #ffffff
    position: fixed
    left: 0
    right: 0
    bottom: 0
    z-index: 7
    box-shadow: 0 -4px 4px rgba(0, 0, 0, .3)
    border-radius: 4px 4px 0 0
    table
      width: 100%
      display: flex
      flex-wrap: wrap
      border-collapse: collapse
      text-align: center
      border: none
      +border(1px, bottom, #eaeaea)
      tr.header
        width: 100%
        padding: 40px 20px
        display: flex
        align-items: center
        font-size: 28px
        +border(1px, bottom, #eaeaea)
        th
          flex: 1
        th.col-2
          flex: 2
      tr
        width: 100%
        padding: 15px 20px
        display: flex
        align-items: center
        font-size: 26px
        color: #333333
        td
          flex: 1
          padding: 10px 0
        td.col-2
          flex: 2
          overflow: hidden
          display: flex
          align-items: center
          justify-content: center
          button
            width: 53px
            height: 53px
            line-height: 53px
            text-align: center
            border-radius: 0
            // +border(1px, all, #EAEAEA)
            border: none
            background-color: #F67C2F
            color: #ffffff
            &:first-of-type
              margin-right: -1px
            &:last-of-type
              margin-left: -1px
            &[disabled]
              width: 53px
              height: 53px
              line-height: 53px
              background-color: #ffffff
              color: #EAEAEA
              border: none
          span.edit
            width: 70px
            height: 50px
            line-height: 50px
            text-align: center
            border-top: 1px solid #EAEAEA
            border-bottom: 1px solid #EAEAEA
            color: #cccccc
            // margin: 0 10px
            overflow: hidden
    .btn-group
      width: 100%
      padding: 35px 20px
      display: flex
      justify-content: space-around
      align-items: center
      button
        width: 130px
        height: 60px
        line-height: 60px
        text-align: center
        border-radius: 4px
        border: none
        font-size: 24px
      button.cancel
        background-color: #CCCCCC
        color: #ffffff
      button.save
        background-color: #F67C2F
        color: #ffffff
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
  .logistics
    width: 80%
    position: fixed
    left: 0
    right: 0
    bottom: 200px
    z-index: 7
    background-color: #ffffff
    margin: 0 auto
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.5)
    border-radius: 20px
    .wrapper
      width: 100%
      margin: 0 auto
      display: flex
      flex-wrap: wrap
      .title
        width: 100%
        text-align: center
        padding: 60px 0 25px
        font-size: 26px
      ul.body
        width: 100%
        display: flex
        flex-wrap: wrap
        li
          width: 100%
          display: flex
          align-items: center
          font-size: 26px
          padding: 15px 70px
          .selector-picker
            flex: 1
            height: 60px
            line-height: 60px
            overflow: hidden
            +border(1px, all, #CCCCCC)
            color: #CCCCCC
            border-radius: 4px
            margin-left: 30px
            text-align: center
          // .picker
          //   width: 100%
          select
            display: inline-block
            text-align: center
            flex: 1
            height: 60px
            line-height: 60px
            overflow: hidden
            +border(1px, all, #CCCCCC)
            color: #CCCCCC
            border-radius: 4px
            margin-left: 30px
          input
            display: inline-block
            text-align: center
            flex: 1
            font-size: 26px
            height: 60px
            line-height: 60px
            overflow: hidden
            color: #CCCCCC
            +border(1px, all, #CCCCCC)
            border-radius: 4px
            margin-left: 30px
            &::-webkit-input-placeholder
              font-size: 26px
              color: #CCCCCC
        li.upload-img
          width: 100%
          // display: flex
          // flex-wrap: wrap
          padding: 15px 70px
          .scroll-view
            width: 100%
            display: flex
            justify-content: flex-start
            flex-wrap: wrap
            .img-box
              // flex: 0 0 50%
              display: inline-block
              width: 50%
              float: left
              overflow: hidden
              display: flex
              justify-content: center
              align-items: center
              font-size: 24px
              i.add-img
                display: inline-block
                width: 200px
                height: 200px
                line-height: 200px
                +border(1px, all, #CCCCCC)
                text-align: center
                margin-bottom: 10px
              i.img
                display: inline-block
                width: 200px
                height: 200px
                background-position: center
                background-repeat: no-repeat
                background-size: 100% 100%
                +border(1px, all, #CCCCCC)
                margin-bottom: 10px
    .checkbox
      display: flex
      align-items: center
      padding: 15px 70px 60px
      font-size: 26px
      i.select-icon
        display: inline-block
        width: 35px
        height: 35px
        margin-right: 20px
        border-radius: 50%
        +border(1px, all, #cccccc)
        background-repeat: no-repeat
        background-position: center
        background-size: 100% 100%
      i.active
        background-image: url("~@/assets/img/storeMgr/select.png")
        background-size: 100% 100%
      // input[type=checkbox]
      //   display: inline-block
      //   width: 30px
      //   height: 30px
      //   overflow: hidden
      //   border-radius: 50%
      //   margin-right: 30px
    .footer
      width: 100%
      height: 100px
      line-height: 100px
      text-align: center
      display: flex
      font-size: 30px
      span.cancel
        flex: 1
        background-color: #CCCCCC
        color: #000000
        border-radius: 0 0 0 20px
      span.ok
        flex: 1
        background-color: #F67C2F
        color: #ffffff
        border-radius: 0 0 20px 0

  .visible
    padding: 20px 40px
    span.red
      color: #FF4500
</style>
