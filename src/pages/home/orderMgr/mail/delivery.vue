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
      <text class="fuKuan" v-if="(select == 2)">待发货</text>
      <text class="fuKuan" v-if="(select == 0)">拼团成功，待发货</text>
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
          <div class="maShuo">
            <span class="text">黑色:{{item.maShuo}}/{{item.jianShuo1}}件</span>
            <span class="edit" @click="edit()">编辑</span>
          </div>
        </div>
      </div>
      <div class="type_1" v-if="(select == 0)">
        <div class="title_1">
          <span class="colour">颜色</span>
          <span class="size">码数</span>
          <span class="standby">待发数</span>
          <span class="shipments">发货件数</span>
          <span class="remaining">剩余件数</span>
        </div>
        <div class="title_2">
          <span class="colour_1">红</span>
          <span class="size_1">S</span>
          <span class="standby_1">12</span>
          <span class="shipments_1">5</span>
          <span class="remaining_1">5</span>
        </div>
        <div class="title_3">
          <span class="colour_2">黄</span>
          <span class="size_2">M</span>
          <span class="standby_2">12</span>
          <span class="shipments_2">1</span>
          <span class="remaining_2">1</span>
        </div>
      </div>
      <div class="jiaGe">
        <div class="collage" v-if="(select == 2)">
          <img class="collage_img" :src="item.picture">
          <img class="collage_img" :src="item.picture">
          <img class="collage_img" :src="item.picture">
        </div>
        <text class="text">共{{item.number}}件商品,合计: </text>
        <text class="jiaGet">{{item.jiage}}元</text>
      </div>
    </div>
    <div class="number_1" v-if="(select == 2)">
      <div class="completed">
        <div class="completed_1">子订单编号（已完成）：12345678</div>
        <i class="sanjiao"></i>
      </div>
      <div class="incomplete">
        <div class="incomplete_1">子订单编号（待收货）：12345678</div>
        <i class="sanjiao"></i>
      </div>
    </div>
    <div class="jieShuan">
      <div class="price">
        <span class="price_1">商品总价</span>
        <span class="price_2">￥299.00</span>
      </div>
      <div class="coupon">
        <span class="coupon_1">优惠券抵扣</span>
        <span class="coupon_2">-￥6.99</span>
      </div>
      <div class="freight">
        <span class="freight_1">运费</span>
        <span class="freight_2">+￥6.00</span>
      </div>
      <i class="xuXian"></i>
      <div class="orderNumber">订单编号：2018062712345678904</div>
      <div class="orderTime">下单时间：2018-06-16 12:27:12</div>
      <div class="Payment">支付时间：2018-06-16 12:27:12</div>
      <div class="collage">拼团时间：2018-06-16 12:27:12</div>
    </div>
    <!-- 撑开下面按钮 -->
    <div style="height: 50px; width: 100%;"></div>
    <div class="foot">
      <span class="btn" @click="btn()">发货</span>
    </div>
    <!-- 编辑弹窗 -->
    <div v-show="isShow">
      <div class="demo-container">
        <div class="title_s">
          <ul class="s_item_box">
            <li class="s_item">颜色</li>
            <li class="s_item">码数</li>
            <li class="s_item">待发数</li>
            <li class="s_item i-input">发货件数</li>
            <li class="s_item">剩余件数</li>
          </ul>
        </div>
        <div class="title_t">
          <ul class="s_item_box">
            <li class="s_item">红</li>
            <li class="s_item">S</li>
            <li class="s_item">12</li>
            <li class="s_item i-input">
              <i-input-number :value="value1" min="0" max="100" @change="handleChange1" />
            </li>
            <li class="s_item">6</li>
          </ul>
          <ul class="s_item_box">
            <li class="s_item">黄</li>
            <li class="s_item">M</li>
            <li class="s_item">12</li>
            <li class="s_item i-input">
              <i-input-number :value="value2" min="0" max="100" @change="handleChange2" />
            </li>
            <li class="s_item">6</li>
          </ul>
          <ul class="s_item_box">
            <li class="s_item">红</li>
            <li class="s_item">M</li>
            <li class="s_item">12</li>
            <li class="s_item i-input">
              <i-input-number :value="value3" min="0" max="100" @change="handleChange3" />
            </li>
            <li class="s_item">6</li>
          </ul>
        </div>
        <div class="foot">
          <span class="save" @click="save()">保存</span>
          <span class="cancel" @click="cancel()">取消</span>
        </div>
      </div>
    </div>
    <!-- 发布弹窗 -->
    <div v-show="isShows">
      <div class="box">
        <div class="kuang">
          <div class="title">请填写物流信息</div>
          <div class="logistics">
            <picker @change="bindPickerChange" :value="index" :range="array">
              <view class="picker">
                物流公司:
                <span class="picker_o">{{array[index]}}
                  <i class="drop"></i>
                </span>
              </view>
            </picker>
          </div>
          <div class="courier">
            <span class="span">快递单号:</span>
            <input class="input" type="text" placeholder="请填写快递单号">
          </div>
          <div class="title_s">上传快递信息凭证：(仅一张)</div>
          <div class="upload" @click="upload()">
            <span class="text" v-if="(tempFilePaths == '')">+可上传图片</span>
            <img v-if="(tempFilePaths != '')" :src="tempFilePaths">
          </div>
          <div class="message" @click="message()">
            <i class="message_img" v-if="(select == 0)"></i>
            <i class="message_img img" v-if="(select == 1)"></i>
            <span>无快递信息</span>
          </div>
          <div class="btn">
            <span class="btn_1" @click="btn()">取消</span>
            <span class="btn_2" @click="btn()">确认发货</span>
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
            value1: 1,
            value2: 1,
            value3: 1,
            shuoo: 0,
            isShow: false,
            isShows: false,
            index: 0,
            select: 0,
            tempFilePaths: "",
            array: ["-请选择物流公司-", "顺丰", "申通"],
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
                },
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
        // 上传图片
        upload() {
            var that = this;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    var tempFilePaths = res.tempFilePaths;
                    console.log(tempFilePaths, 123123);
                    that.tempFilePaths = tempFilePaths[0];
                }
            });
        },
        bindPickerChange(e) {
            console.log(e.mp.detail.value);
            this.index = e.mp.detail.value;
        },
        message() {
            console.log(this);
            if (this.select == 0) {
                this.select = 1;
            } else if (this.select == 1) {
                this.select = 0;
            }
        },
        // 发货组件
        handleChange1({ mp: { detail } }) {
            this.value1 = detail.value;
        },
        handleChange2({ mp: { detail } }) {
            this.value2 = detail.value;
        },
        handleChange3({ mp: { detail } }) {
            this.value3 = detail.value;
        },
        // 编辑弹窗保存
        save() {
            var that = this;
            wx.showModal({
                // title: "提示",
                content: "是否确认保存！",
                success: function(res) {
                    console.log(res);
                    if (res.confirm) {
                        console.log("用户点击确定");
                        setTimeout(function() {
                            that.edit();
                        }, 500);
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                }
            });
        },
        // 编辑弹窗取消
        cancel() {
            this.edit();
        },
        // 显示隐藏编辑弹窗
        edit() {
            this.isShow = !this.isShow;
        },
        // 发布
        btn() {
            console.log(123123);
            this.isShows = !this.isShows;
        }
    },
    async mounted() {
      const L_OrderDetail = await this.$API.L_selectOrderDetail({
        // orderId: '',
      });
      console.log(L_OrderDetail)
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
    // height: 201px 
    padding-bottom: 10px
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
        display: flex
        .text
          flex: 11
        .edit
          flex: 2
          display: inline-block
          width: 100px
          height: 40px
          font-size: 26px
          background:#ccc
          text-align: center
          color: #fff
          border-radius: 8px
  .type_1
    padding-top: 10px
    height: 159px
    text-align: center
    background: #fff
    border-bottom: 1px dashed #666
    line-height: 52px
    .title_1
      display: flex
      font-size: 26px
      color: #999
      margin: 0 71px 0
      .colour
        flex: 1
      .size
        flex: 1
      .standby
        flex: 1
      .shipments
        flex: 1
      .remaining
        flex: 1
    .title_2
      display: flex
      font-size: 26px
      margin: 0 71px 0
      .colour_1
        flex: 1
      .size_1
        flex: 1
      .standby_1
        flex: 1
      .shipments_1
        flex: 1
      .remaining_1
        flex: 1
    .title_3
      display: flex
      font-size: 26px
      margin: 0 71px 0
      .colour_2
        flex: 1
      .size_2
        flex: 1
      .standby_2
        flex: 1
      .shipments_2
        flex: 1
      .remaining_2
        flex: 1
  .jiaGe 
    height: 70px
    width: 100%
    background: #fff
    font-size: 22px
    padding-top: 4rpx
    display: inline-block
    position: relative
    .collage
      display: block
      padding: 10px 0 0 20px
      height: 94px
      background: #fff
      .collage_img
        width: 84px
        height: 84px
        margin: 0 5px 0
    .text
      display: inline-block
      right: 100px;
      top: 20px
      position: absolute
    .jiaGet
      right: 30px;
      top: 20px
      position: absolute
      display: inline-block
      color: #FF0000
.number_1
  margin-top: 10px
  height: 184px
  background: #fff
  line-height: 90px
  font-size: 26px
  .completed
    border-bottom: 1px dashed #666
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

.jieShuan
  background: #fff
  font-size: 26px
  // margin-bottom: 200px
  .price
    display: flex
    padding: 22px 25px 0
    color: #666
    .price_1
      flex: 5
    .price_2
      flex: 1
      color: #999
  .coupon
    padding: 22px 25px 0
    color: #666
    display: flex
    .coupon_1
      flex: 5
    .coupon_2
      flex: 1
      color: #999
  .freight
    padding: 22px 25px 0
    color: #666
    margin: 0 0 20px 0
    display: flex
    .freight_1
      flex: 5
    .freight_2
      flex: 1
      color: #999
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
  .Payment
    font-size: 26px
    color: #666
    margin: 22px 0 0 25px
  .collage
    font-size: 26px
    color: #666
    margin: 22px 0 0 25px
    padding-bottom: 30px
.foot 
  width: 100%
  position: fixed
  bottom: 0px
  height: 98px
  background: #fff
  .btn 
    position: absolute
    right: 20px
    display: inline-block
    width: 130px
    height: 60px
    background: #f67c2f
    color: #fff
    font-size: 22px
    line-height: 60px
    text-align: center
    margin-top: 20px
    border-radius: 4px

// 编辑弹窗
.demo-container
  width: 100%
  height: 478px
  background: #fff
  position: fixed
  bottom: 0
  box-shadow: 0px -3px 10px rgba(8,0,0,0.32)
  font-size: 28px
  .title_s
    height: 108px
    text-align: center
    border-bottom: 1px solid #ccc
    .s_item_box
      display: flex
      padding: 30px 33px 0 0
      .s_item
        flex: 1
        // margin: 0 -8px
      .i-input
        flex: 2
  .title_t
    height: 230px
    text-align: center
    border-bottom: 1px solid #ccc
    padding-bottom: 10px
    .s_item_box
      display: flex
      padding: 30px 33px 0 0
      height: 40px
      line-height: 40px
      .s_item
        flex: 1
        margin: 0 -15px
      .i-input
        flex: 2
  .foot 
    width: 100%
    position: fixed
    bottom: 0px
    height: 98px
    background: #fff
    .save 
      position: absolute
      right: 20px
      display: inline-block
      width: 130px
      height: 60px
      background: #f67c2f
      color: #fff
      font-size: 22px
      line-height: 60px
      text-align: center
      margin-top: 20px
      border-radius: 4px  
    .cancel 
      position: absolute
      right: 180px
      display: inline-block
      width: 130px
      height: 60px
      background: #ccc
      color: #fff
      font-size: 22px
      line-height: 60px
      text-align: center
      margin-top: 20px
      border-radius: 4px  


// 发布弹窗
.box
  width: 100%
  height: 100%
  background: rgba(0,0,0,.5)
  position: fixed
  top: 0px
  left: 0px
  .kuang
    +center
    width: 600px
    height: 737px
    left: 10%
    background: #fff
    border-radius: 8px
    .title
      font-size: 30px
      padding: 59px 0 0 201px
    .logistics
      margin-top: 10px
      .picker
        padding-left: 71px
        font-size: 26px
        .picker_o
          display: inline-block
          width: 300px
          height: 60px
          border: 1px solid #ccc
          border-radius: 4px
          line-height: 60px
          padding-left: 30px
          position: relative
          color: #ccc
          .drop
            +bg-img('home/drop.png')
            width: 24px
            height: 14px
            position: absolute
            top: 26px
            right: 10px
    .courier
      margin-top: 20px
      height: 60px
      padding-left: 71px
      font-size: 26px
      display: flex
      .span
        padding: 12px 10px 0 0
      .input
        display: inline-block
        width: 300px
        height: 60px
        border: 1px solid #ccc
        border-radius: 4px
        line-height: 60px
        padding-left: 30px
        font-size: 26px
    .title_s
      margin-top: 30px
      padding-left: 71px
      font-size: 28px
    .upload
      width: 202px
      height: 152px
      border: 1px solid #ccc
      margin-top: 30px
      margin-left: 71px
      position: relative
      .text
        +center
        font-size: 26px
        left: 10%
    .message
      margin-top: 30px
      padding-left: 71px
      display: flex
      .message_img
        margin-top: 10px
        +bg-img('home/select.png')
        width: 30px
        height: 30px
        margin-right: 30px
      .img
        +bg-img("storeMgr/select.png")
    .btn
      width: 100%
      height: 100px
      display: flex
      font-size: 30px
      position: fixed
      bottom: 0px
      .btn_1
        flex: 1
        background: #ccc
        line-height: 100px
        text-align: center
      .btn_2
        flex: 1
        background: #F67C2F
        line-height: 100px
        text-align: center
        color: #fff
</style>