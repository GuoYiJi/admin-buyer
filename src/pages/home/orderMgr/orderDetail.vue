<template>
<div class="wrapper">
  <!-- 收货人信息 -->
  <div class="receiver">
    <div class="left-icon"></div>
    <div class="right-info">
      <div class="header">
        <span class="name">收货人: {{orderAddress.name || '未知联系人'}}</span>
        <span class="mobile">{{orderAddress.mobile || '未知号码'}}</span>
      </div>
      <div class="address">收货地址: {{orderAddressValue + orderAddress.address}}</div>
      <div class="remark">备注: {{remark}}</div>
    </div>
  </div>
  <!-- 订单详情 -->
  <div class="orderDetail">
    <div class="header">
      <span class="left">
          <i class="icon"></i>{{shopName}}
        </span>
      <span class="right">{{
          state === 1 ? '等待支付'
          : state === 2 ? '已取消'
          : state === 5 ? '待发货'
          : state === 6 ? '已发货'
          : state === 7 ? '交易成功'
          : state === 8 ? '交易关闭'
          : state === 9 ? '拼单中'
          : state === 10 ? '审核中'
          : '未知状态'
        }}</span>
    </div>
    <div class="goods-info" v-for="(goods, goodsIndex) in goodsList" :key="goodsIndex">
      <div class="goods-body">
        <i class="goods-img" :style="{backgroundImage: 'url(' + goods.image + ')'}"></i>
        <div class="goods-message">
          <span class="name">{{goods.name}}</span>
          <span>
                <p class="stall">档口名称: {{goods.stallInfo3 || '未知档口'}}</p>
              <p class="futures">期货: {{goods.delivery || '未知期货'}}</p>
            </span>
          <div class="footer">
            <div class="box">
              <span v-for="(skuItem, skuIndex) in skuList[goodsIndex]" :key="skuIndex">{{skuItem.color}}色: {{skuItem.size}}码丨{{skuItem.num}}件</span>
            </div>
            <button v-show="state === 5" @click="togglePopups(goodsIndex)">编辑</button>
          </div>
        </div>
      </div>
      <!-- 拆单详情 < 仅有待发货状态才显示 >-->
      <div class="table" v-if="state == 5 && isHasDeliver && !isEdited">
        <table style="border: none;">
          <tr>
            <th>颜色</th>
            <th>码数</th>
            <th>总件数</th>
            <th>待发件数</th>
            <th>剩余待发</th>
          </tr>
          <tr v-for="(deliver, deliverIndex) in deliverList[goodsIndex]" :key="deliverIndex">
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
          <tr v-for="(skuItem, skuIndex) in skuList[goodsIndex]" :key="skuIndex">
            <td>{{skuItem.color}}</td>
            <td>{{skuItem.size}}</td>
            <td>{{skuItem.num}}</td>
            <td>{{skuItem.deliver}}</td>
            <td>{{skuItem.remain}}</td>
          </tr>
        </table>
      </div>
      <div class="total">
        共{{goods.countNum}}件商品, 合计: <strong>{{goods.countPrice}}元</strong>
      </div>
      <!-- 编辑弹框 -->
      <div class="popups" v-show="popupsIndex === goodsIndex">
        <table>
          <tr class="header">
            <th>颜色</th>
            <th>码数</th>
            <th>总件数</th>
            <th class="col-2">待发件数</th>
            <th>剩余待发</th>
          </tr>
          <tr v-for="(skuItem, skuIndex) in lastSkuList[goodsIndex]" :key="skuIndex">
            <td>{{skuItem.color}}</td>
            <td>{{skuItem.size}}</td>
            <td>{{skuItem.num}}</td>
            <td class="col-2">
              <button @click="cut(goodsIndex, skuIndex)" :disabled="skuItem.deliver === 0">-</button>
              <!-- <input type="number" v-model="skuItem.deliver" :min="0" :max="skuItem.remain"> -->
              <span class="edit">{{skuItem.deliver}}</span>
              <!-- <i-input-number :value="skuItem.deliver" :min="0" :max="skuItem.remain" :step="2" @change="handleChange2" /> -->
              <button @click="add(goodsIndex, skuIndex)" :disabled="skuItem.deliver === skuItem.remain">+</button>
            </td>
            <td>{{skuItem.remain}}</td>
          </tr>
        </table>
        <div class="btn-group">
          <button type="button" class="cancel" @click="cancel(goodsIndex)">取消</button>
          <button type="button" class="save" @click="save()">保存</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 子订单 -->
  <ul class="childOrder" v-if="childrenOrder.length !== 0">
    <li v-for="(childOrder, childOrderIndex) in childrenOrder" :key="childOrderIndex" @click="pageTo('/pages/home/orderMgr/orderdetail', childOrder.id)">
      子订单编号({{
      childOrder.state === 1 ? '等待支付'
      : childOrder.state === 2 ? '已取消'
      : childOrder.state === 5 ? '待发货'
      : childOrder.state === 6 ? '已发货'
      : childOrder.state === 7 ? '交易成功'
      : childOrder.state === 8 ? '交易关闭'
      : childOrder.state === 9 ? '拼单中'
      : childOrder.state === 10 ? '审核中'
      : '未知状态'
      }}):
      {{childOrder.orderNo}}</li>
  </ul>
  <ul class="orderPrice">
    <li>
      <span class="title">商品总价</span>
      <span class="num">￥{{totalPrice}}</span>
    </li>
    <li v-if="couponMoney">
      <span class="title">优惠券抵扣</span>
      <span class="num">- ￥{{couponMoney}}</span>
    </li>
    <li>
      <span class="title">运费</span>
      <span class="num">+ ￥{{freight}}</span>
    </li>
  </ul>
  <!-- 订单编号 -->
  <ul class="orderNo">
    <li v-if="parentNo">父订单编号: {{parentNo}}</li>
    <li>订单编号: {{orderNo}}</li>
    <li>下单时间: {{createTime}}</li>
    <li v-if="payTime">支付时间: {{payTime}}</li>
    <li v-if="pingTime">拼团时间: {{pingTime}}</li>
    <li v-if="deliverTime">发货时间: {{deliverTime}}</li>
    <li v-if="receiptTime">确认收货时间: {{receiptTime}}</li>
  </ul>
  <div class="white-block" style="width: 100%; height: 100px; background-color: #fff;"></div>
  <div class="btn">
    <div class="pingUser" v-if="pingUser">
      <i v-for="(pingU, pingUserIndex) in pingUser" :key="pingUserIndex" :style="{backgroundImage: 'url(' + pingU.head + ')'}" v-if="pingUserIndex < 3"></i>
    </div>
    <button v-if="state === 5" @click="ship(orderId)">发货</button>
    <button v-if="state === 6 && isHasChildren !== 1" @click="pageTo('/pages/home/orderMgr/logisticsDetail', orderId)">查看物流</button>
    <button v-if="state === 4">确认收货</button>
    <!-- <button v-if="state === 0">同意</button>
    <button v-if="state === 0">拒绝</button> -->
    <button v-if="state === 1 && isPersonal === 0">确认已支付</button>
    <button v-if="state === 1" @click="toggleModal('visible3')">取消订单</button>
  </div>
  <!-- 物流信息填写弹窗 -->
  <div class="logistics" v-if="showLogistics">
    <div class="wrapper">
      <div class="title">请填写物流信息</div>
      <ul class="body">
        <li>
          物流公司:
          <div class="selector-picker">
            <picker mode="selector" :value="index" :range="companies" :range-key="'text'" @change="handle">
              <div class="picker">
                {{companies[index].text}}
              </div>
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
          <scroll-view class="scroll-view" scroll-y style="height: 220rpx;">
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
        <li class="checkbox">
          <i class="select-icon" :class="[noExpress ? 'active' : '']" @click="togglenoExpress()"></i>
          无物流信息
        </li>
      </ul>
      <div class="footer">
        <span class="cancel" @click="cancelExpress()">取消</span>
        <span class="ok" @click="confirmExpress(orderId)">确定发货</span>
      </div>
    </div>
  </div>
  <!-- 遮罩层 -->
  <div class="mark" v-show="showLogistics || showPopups" @click="cancelModel"></div>
  <!-- 对话框 -->
  <i-modal title="请检查..." :visible="visible1" @ok="toggleModal('visible1')" @cancel="toggleModal('visible1')">
    <div>未编辑待发货数量</div>
  </i-modal>
  <i-modal :visible="visible3" @ok="closeOrder(orderId)" @cancel="toggleModal('visible3')">
    <div class="visible">确定取消订单？</div>
  </i-modal>
  <i-modal :visible="visible4" @ok="closeOrder(orderItem.id)" @cancel="toggleModal('visible4')">
    <div class="visible">确定关闭订单？</div>
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
  data: {
    showEditTable: false, //显示编辑表格
    isEdited: false, //是否已编辑保存
    isHasDeliver: false, //订单是否编辑过
    popupsIndex: -1, // 编辑弹窗识别
    isPing: 0, // 是否为拼团订单
    isHasChildren: 0, //是否有子订单
    orderId: '', //
    state: '', //订单状态
    shopName: '', // 店铺名称
    orderAddress: {}, //收货人信息
    remark: '无',
    goodsList: [], //商品列表
    pingUser: [],
    skuList: [], // 规格列表
    lastSkuList: [], // skuList最近保存的副本
    deliverList: [], //拆单后table数据
    editGoodsArr: [], // 编辑的发货数
    // totalNum: 0, //商品总件数
    totalPrice: 0, //商品总件数
    childrenOrder: [], //子订单列表
    orderNo: '', //订单编号
    couponMoney: 0, //优惠券折扣
    freight: 0, // 运费
    parentNo: '', // 父订单编号
    createTime: '', //下单时间
    payTime: '', //支付时间
    deliverTime: '', //发货时间
    pingTime: '', //拼团时间
    receiptTime: '', //确认收货时间
    showPopups: false,
    showLogistics: false,
    noExpress: false, //是否无物流信息,
    imageList: [], // 凭证图片列表
    imgList: [], // 选择的图片列表
    maxNum: 6, // 最多上传数量
    // companies: ['-请选择物流公司-', '顺丰速运', '邮政EMS', '圆通快递', '申通快递', '韵达快递', '百世汇通', '中通快递', '天天快递', '优速物流', ],
    index: 0,
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
      },
    ],
    visible1: false,
    visible3: false,
    visible4: false
  },
  computed: {
    orderAddressValue() {
      if (this.orderAddress.value) {
        return this.orderAddress.value.replace(/,/g, '-') + '-'
      }
    },
    // skuList() {
    //   if(this.goodsList) {
    //     let arr = []
    //     this.goodsList.forEach((item, index) => {
    //       arr.push([])
    //       item.orderGoods.forEach(goodsItem => {
    //         arr[index].push({
    //           color: goodsItem.skuCode.split(',')[0].toString(),
    //           size: goodsItem.skuCode.split(',')[1].toString(),
    //           num: goodsItem.num,
    //           deliver: 0,
    //           remain: goodsItem.remainNum
    //         })
    //       })
    //     })
    //     return arr
    //   }
    // },
    isPersonal() {
      if (wx.getStorageSync('isPersonal') && wx.getStorageSync('isPersonal') == 1) {
        return 1
      } else {
        return 0
      }
    }
  },
  methods: {
    // 页面跳转
    pageTo(url, orderId) {
      this.$router.push({
        path: url,
        query: {
          orderId
        }
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
        setTimeout(() => {
          this.pageStart()
        }, 1000)
      })
    },
    // 查看订单详情
    getOrderDetail(orderId) {
      return this.$API.L_selectOrderDetail({
        orderId
      })
    },
    handle(e) {
      console.log(e.mp.detail.value);
      this.index = e.mp.detail.value;
    },
    // 查看售后订单详情
    getRefundOrderDetail(orderRefundId) {
      return this.$API.L_selectOrderRefundDetail({
        orderRefundId
      })
    },
    // 切换编辑弹窗
    togglePopups(index) {
      this.showPopups = true
      this.popupsIndex = index
      this.isEdited = false
    },
    cancelExpress() {
      this.showLogistics = !this.showLogistics
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
            this.pageStart()
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
          type: 1
        }).then(response => {
          wx.showToast({
            title: '已发货',
            icon: 'success'
          })
          this.showLogistics = false
          setTimeout(() => {
            this.pageStart()
          }, 1500)
        })
      }
    },
    // 无物流按钮点击切换
    togglenoExpress() {
      this.noExpress = !this.noExpress
      console.log(this.noExpress);
    },
    // 发货
    confirmShip(params) {
      return this.$API.L_deliverGoods(params)
    },
    // 点击遮罩关闭弹窗
    cancelModel() {
      this.showPopups = false
      this.showLogistics = false
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
      // console.log('lastIndexOf ============', tempFilePath.slice(tempFilePath.lastIndexOf('/') + 1).toString());
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
    cut(pIndex, index) {
      this.$set(this.lastSkuList[pIndex], index, {
        deliver: this.lastSkuList[pIndex][index].deliver -= 1,
        color: this.lastSkuList[pIndex][index].color,
        size: this.lastSkuList[pIndex][index].size,
        num: this.lastSkuList[pIndex][index].num,
        remain: this.lastSkuList[pIndex][index].remain,
        skuId: this.lastSkuList[pIndex][index].skuId
      })
      console.log(this.lastSkuList[pIndex]);
    },
    add(pIndex, index) {
      this.$set(this.lastSkuList[pIndex], index, {
        deliver: this.lastSkuList[pIndex][index].deliver += 1,
        color: this.lastSkuList[pIndex][index].color,
        size: this.lastSkuList[pIndex][index].size,
        num: this.lastSkuList[pIndex][index].num,
        remain: this.lastSkuList[pIndex][index].remain,
        skuId: this.lastSkuList[pIndex][index].skuId
      })
      console.log(this.lastSkuList[pIndex]);
    },
    cancel(pIndex) {
      this.showPopups = false
      this.popupsIndex = -1
    },
    save() {
      let skuIdArr = []
      let vm = this
      this.lastSkuList.forEach((item, index) => {
        item.forEach(ite => {
          skuIdArr.push({
            num: ite.deliver,
            skuId: ite.skuId
          })
        })
      })
      console.log('skuIdArr ==== >', skuIdArr);
      wx.request({
        url: config.url + '/api/order/goods/addChildren',
        method: 'POST',
        dataType: 'json',
        data: {
          shopId: config.appId,
          sessionId: wx.getStorageSync('sessionId'),
          orderIds: vm.orderId,
          orderDeliver: skuIdArr
        },
        success(res) {
          vm.showEditTable = true
          vm.isEdited = true
          // vm.skuList = vm.lastSkuList
          vm.skuList = JSON.parse(JSON.stringify(vm.lastSkuList))
          console.log(vm.isEdited);
        },
        complete(result) {
          vm.showPopups = false
          vm.popupsIndex = -1
        }
      })
    },
    toggleModal(name) {
      console.log("点击事件执行");
      this[name] = !this[name]
    },
    // 页面初始化
    pageStart() {
      this.showLogistics = false
      console.log(this.showLogistics);
      if (this.$route.query.orderId) {
        this.orderId = this.$route.query.orderId
        this.getOrderDetail(this.orderId).then(response => {
          console.log(response);
          this.state = response.data.state
          if (response.data.orderAddress) {
            this.orderAddress = response.data.orderAddress
          }
          this.goodsList = response.data.goodsList
          if (this.goodsList) {
            let arr = []
            this.goodsList.forEach((item, index) => {
              arr.push([])
              item.orderGoods.forEach(goodsItem => {
                arr[index].push({
                  color: goodsItem.skuCode.split(',')[0].toString(),
                  size: goodsItem.skuCode.split(',')[1].toString(),
                  num: goodsItem.num,
                  deliver: 0,
                  remain: goodsItem.remainNum,
                  skuId: goodsItem.skuId
                })
              })
            })
            this.skuList = arr
            this.lastSkuList = arr
          }
          this.orderNo = response.data.orderNo
          this.createTime = response.data.createTime
          this.isPing = response.data.isPing
          // this.totalNum = response.data.num
          this.totalPrice = response.data.paid
          this.freight = response.data.freight
          if (response.data.isHasChildren === 1) {
            this.isHasChildren = 1
            this.childrenOrder = response.data.children
            // console.log('子订单列表:', this.childrenOrder);
          } else {
            this.isHasChildren = 0
            this.childrenOrder = []
          }
          if (response.data.payTime) {
            this.payTime = response.data.payTime
          } else {
            this.payTime = ''
          }
          if (response.data.remark) {
            this.remark = response.data.remark
          } else {
            this.remark = ''
          }
          if (response.data.deliverTime) {
            this.deliverTime = response.data.deliverTime
          } else {
            this.deliverTime = ''
          }
          if (response.data.receiptTime) {
            this.receiptTime = response.data.receiptTime
          } else {
            this.receiptTime = ''
          }
          if (response.data.couponMoney) {
            this.couponMoney = response.data.couponMoney
          } else {
            this.couponMoney = 0
          }
          if (response.data.pingTime) {
            this.pingTime = response.data.pingTime
          } else {
            this.pingTime = ''
          }
          if (response.data.parent) {
            this.parentNo = response.data.parent.orderNo
          } else {
            this.parentNo = ''
          }
          if (response.data.pingUser) {
            this.pingUser = response.data.pingUser
          } else {
            this.pingUser = []
          }
          this.isHasDeliver = response.data.isHasDeliver
          if (this.isHasDeliver) {
            let arr = []
            this.goodsList.forEach((item, index) => {
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
            console.log('this.deliverList', this.deliverList);
          } else {
            this.deliverList = []
          }
        })
      }
      if (wx.getStorageSync('dpName')) {
        this.shopName = wx.getStorageSync('dpName')
      }
    }
  },
  mounted() {
    this.pageStart()
    // this.showLogistics = false
    // console.log(this.showLogistics);
    // if (this.$route.query.orderId) {
    //   this.orderId = this.$route.query.orderId
    //   this.getOrderDetail(this.orderId).then(response => {
    //     console.log(response);
    //     this.state = response.data.state
    //     if (response.data.orderAddress) {
    //       this.orderAddress = response.data.orderAddress
    //     }
    //     this.goodsList = response.data.goodsList
    //     if (this.goodsList) {
    //       let arr = []
    //       this.goodsList.forEach((item, index) => {
    //         arr.push([])
    //         item.orderGoods.forEach(goodsItem => {
    //           arr[index].push({
    //             color: goodsItem.skuCode.split(',')[0].toString(),
    //             size: goodsItem.skuCode.split(',')[1].toString(),
    //             num: goodsItem.num,
    //             deliver: 0,
    //             remain: goodsItem.remainNum,
    //             skuId: goodsItem.skuId
    //           })
    //         })
    //       })
    //       this.skuList = arr
    //       this.lastSkuList = arr
    //     }
    //     this.orderNo = response.data.orderNo
    //     this.createTime = response.data.createTime
    //     this.isPing = response.data.isPing
    //     // this.totalNum = response.data.num
    //     this.totalPrice = response.data.paid
    //     this.freight = response.data.freight
    //     if (response.data.isHasChildren === 1) {
    //       this.isHasChildren = 1
    //       this.childrenOrder = response.data.children
    //       // console.log('子订单列表:', this.childrenOrder);
    //     } else {
    //       this.isHasChildren = 0
    //       this.childrenOrder = []
    //     }
    //     if (response.data.payTime) {
    //       this.payTime = response.data.payTime
    //     } else {
    //       this.payTime = ''
    //     }
    //     if (response.data.remark) {
    //       this.remark = response.data.remark
    //     } else {
    //       this.remark = ''
    //     }
    //     if (response.data.deliverTime) {
    //       this.deliverTime = response.data.deliverTime
    //     } else {
    //       this.deliverTime = ''
    //     }
    //     if (response.data.receiptTime) {
    //       this.receiptTime = response.data.receiptTime
    //     } else {
    //       this.receiptTime = ''
    //     }
    //     if (response.data.couponMoney) {
    //       this.couponMoney = response.data.couponMoney
    //     } else {
    //       this.couponMoney = 0
    //     }
    //     if (response.data.pingTime) {
    //       this.pingTime = response.data.pingTime
    //     } else {
    //       this.pingTime = ''
    //     }
    //     if (response.data.parent) {
    //       this.parentNo = response.data.parent.orderNo
    //     } else {
    //       this.parentNo = ''
    //     }
    //     if (response.data.pingUser) {
    //       this.pingUser = response.data.pingUser
    //     } else {
    //       this.pingUser = []
    //     }
    //     this.isHasDeliver = response.data.isHasDeliver
    //     if (this.isHasDeliver) {
    //       let arr = []
    //       this.goodsList.forEach((item, index) => {
    //         arr.push([])
    //         item.deliverList.forEach(ite => {
    //           arr[index].push({
    //             color: ite.skuCode.split(',')[0].toString(),
    //             size: ite.skuCode.split(',')[1].toString(),
    //             num: ite.num,
    //             deliver: ite.canDeliverNumber,
    //             remain: ite.remainNum,
    //           })
    //         })
    //       })
    //       this.deliverList = arr
    //       console.log('this.deliverList', this.deliverList);
    //     } else {
    //       this.deliverList = []
    //     }
    //   })
    // }
    // if (wx.getStorageSync('dpName')) {
    //   this.shopName = wx.getStorageSync('dpName')
    // }
  },
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.wrapper
  width: 100%
  height: 220px
  display: flex
  flex-wrap: wrap
  justify-content: center
  .receiver
    width: 100%
    display: flex
    padding: 20px 24px
    font-size: 26px
    color: #666666
    background-color: #ffffff
    margin-bottom: 10px
    .left-icon
      width: 60px
      background: url("~@/assets/img/home/address.png") no-repeat center
      background-size: 58px 58px
    .right-info
      flex: 1
      overflow: hidden
      padding-left: 20px
      display: flex
      flex-wrap: wrap
      text-align: left
      .header
        width: 100%
        display: flex
        justify-content: space-between
        text-align: left
        .name
          text-align: left
          +singleFile
        .mobile
          text-align: right
          +singleFile
      .address
        width: 100%
        +moreLine(2)
        text-align: left
      .remark
        width: 100%
        text-align: left
        +singleFile

  .orderDetail
    width: 100%
    display: flex
    flex-wrap: wrap
    background-color: #ffffff
    margin-bottom: 10px
    .header
      width: 100%
      padding: 20px 24px
      font-size: 26px
      color: #000
      display: flex
      justify-content: space-between
      .left
        text-align: left
        display: flex
        align-items: center
        i.icon
          display: inline-block
          width: 32px
          height: 32px
          background: url("~@/assets/img/home/shop.png") no-repeat center
          background-size: 100% 100%
          margin-right: 20px
      .right
        text-align: right
        color: #F67C2F
    .goods-info
      width: 100%
      display: flex
      flex-wrap: wrap
      align-items: center
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
            // +singleFile
            +moreLine(2)
          span
            width: 100%
            display: flex
            align-items: center
            font-size: 22px
            p.stall
              padding: 2px 6px
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
            .box
              flex: 1
              overflow: hidden
              display: flex
              flex-wrap: wrap
              span
                width: 100%
                color: #CCCCCC
                font-size: 24px
                +singleFile
            button
              width: 100px
              height: 50px
              line-height: 50px
              text-align: center
              font-size: 24px
              color: #ffffff
              background-color: #999999
              border: none
              border-radius: 10px
      .table
        width: 100%
        padding: 20px 0
        background-color: #ffffff
        border-bottom: 2px dashed #CCCCCC
        table
          width: 100%
          display: flex
          flex-wrap: wrap
          border: none
          text-align: center
          font-size: 24px
          border-collapse: collapse
          padding: 0
          margin: 0
          tr
            width: 100%
            display: flex
            th,td
              flex: 1
              padding: 5px 0
            th
              font-size: 26px
              font-size: #999999
              font-weight: bold
            td
              color: #333333
      .total
        width: 100%
        display: flex
        align-items: center
        justify-content: flex-end
        padding: 10px 24px
        background-color: #ffffff
        text-align: right
        font-size: 24px
        strong
          display: inline-block
          font-size: 30px
          color: #FF0000
  ul.childOrder
    width: 100%
    display: flex
    flex-wrap: wrap
    padding: 0 24px
    margin-bottom: 10px
    color: #000000
    background-color: #ffffff
    font-size: 26px
    li
      width: 100%
      padding: 15px 0
      display: flex
      align-items: center
      border-bottom: 2px dashed #CCCCCC
      background: url("~@/assets/img/home/shanJiao.png") no-repeat right
      background-size: 16px 29px
      &:last-of-type
        border: none
  ul.orderPrice
    width: 100%
    display: flex
    flex-wrap: wrap
    padding: 15px 24px
    border-bottom: 2px dashed #CCCCCC
    font-size: 26px
    color: #000000
    background-color: #ffffff
    li
      width: 100%
      padding: 15px 0
      display: flex
      align-items: center
      justify-content: space-between
      span.title
        text-align: left
        color: #666666
      span.num
        text-align: right
  ul.orderNo
    width: 100%
    display: flex
    flex-wrap: wrap
    padding: 0 24px
    margin-bottom: 10px
    font-size: 26px
    color: #666666
    background-color: #ffffff
    li
      width: 100%
      padding: 15px 0
      display: flex
      align-items: center
  .btn
    position: fixed
    bottom: 0
    left: 0
    right: 0
    z-index: 5
    // padding: 20px 24px
    display: flex
    align-items: center
    justify-content: flex-end
    background-color: #ffffff
    +border(1px, top, #EAEAEA)
    .pingUser
      flex: 1
      overflow: hidden
      display: flex
      align-items: center
      i
        display: inline-block
        width: 84px
        height: 84px
        border: 1px, dashed, #808080
        border-radius: 2px
        margin: 10px 10px 10px 0
        background-position: center
        background-size: 100% 100%
        background-repeat: no-repeat
        &:first-of-type
          margin-left: 10px
        &:last-of-type
          margin: 0
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
        margin: 20px 24px 20px 0
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

  .logistics
    width: 80%
    position: fixed
    left: 0
    right: 0
    top: 200px
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
        background-color: #ffffff
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
        li.checkbox
          width: 100%
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
      .footer
        width: 100%
        text-align: center
        display: flex
        font-size: 30px
        span
          height: 100px
          line-height: 100px
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

</style>
