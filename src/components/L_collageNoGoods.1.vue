<template>
  <div class="nav">
    <div v-for="(item,index) in noGoodszz" :key="index">
      <div class="kuang">
        <div class="head">
          <p class="order">订单编号：{{item.orderNo}}</p>
          <p class="state">
            {{item.state==1?'未支付':item.state==2?'取消':item.state==3?'已支付':item.state==4?'支付失败':item.state==5?'未发货':item.state==6?'已发货':item.state==7?'交易成功':item.state==8?'交易关闭':'拼单中'}} 
          </p> 
        </div>
        <div class="middle">
          <div class="picture" v-for="(itemzz,num) in item.orderGoods" :key="num">
            <img class="imgOne" :src="itemzz.image">
          </div>
          <i class="sanJiao" @click="sanJiaoBut"></i>
        </div>
        <div class="jieShuan">
          <div class="quantity">共{{item.num}}个款，合计{{item.num}}件</div>
          <div class="money">订单金额：
            <p class="money1">{{item.count}}元</p>
          </div>
          <div class="phone">收货人:{{item.receiptName}} {{item.phone}}</div>
        </div>
        <div class="foot">
          <div class="picture_1" >
            <img class="imgTwo" :src="item.picture">
            <img class="imgThree" :src="item.picture">
            <img class="imgFour" :src="item.picture">
          </div>
          <div class="btn">
            <span v-if="(btn==0)" class="see" @click="seeBut(item.id)">查看详情</span>
            <span v-if="(btn==0)" class="close" @click="playBut(item.id)">发货</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 发布弹窗 -->
    <div v-show="isShows">
      <div class="box">
        <div class="kuang_1">
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
            <input v-model="logisticsNo" class="input" type="text" placeholder="请填写快递单号">
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
            <span class="btn_1" @click="noGoodsbtn()">取消</span>
            <span class="btn_2" @click="goodsbtn()">确认发货</span>
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
            btn: 0,
            navData: [],
            groupOrderzz: [],
            L_deliverGoodsList: [], 
            isShows: false,
            array: ["-请选择物流公司-", "顺丰", "申通"],
            tempFilePaths: "",
            select: 0,
            logisticsNo: '',
            index: 0,
            idzz: '',
        };
    },
    props: {
      noGoodszz: {
        type: Array,
        default: []
      }
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
        },
        sanJiaoBut(item){
          this.$router.push({path:'/pages/home/orderMgr/orderdetails',query:{item: JSON.stringify(item)}})
        },
        seeBut(id){
          this.$router.push( {path:'/pages/home/orderMgr/collage/collect', query:{orderId: id}})

        },
        // async playBut(id){
        //   console.log()
        //   const L_deliverGoodsData = await this.L_deliverGoods({
        //     orderId: id,
        //     logisticsNo: '',

        //   });
        //   this.L_deliverGoodsList = L_deliverGoodsData
        //   console.log(this.L_deliverGoodsList)

        // },
        // 发布
        playBut(id) {
            this.idzz = id
            console.log(this.idzz);
            this.isShows = !this.isShows;

        },
        bindPickerChange(e) {
            console.log(e.mp.detail.value);
            this.index = e.mp.detail.value;
        },
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
                console.log(res);
                that.tempFilePaths = tempFilePaths[0];
            }
          });
        },
        message() {
            console.log(this);
            if (this.select == 0) {
                this.select = 1;
            } else if (this.select == 1) {
                this.select = 0;
            }
        },
        noGoodsbtn(){
          this.isShows = !this.isShows;
          console.log(111)

        },
        async goodsbtn() {
          console.log(111)
          const L_deliverGoodsData = await this.$API.L_deliverGoods({
            orderId: this.idzz,
            logisticsNo: this.logisticsNo,
            type: this.index,

          });
          this.L_deliverGoodsList = L_deliverGoodsData
          if(this.L_deliverGoodsList.code == 1){
            wx.showToast({               
              title: '发货成功',               
              icon: 'success',  
              duration: 2000  
            })  
            this.isShows = !this.isShows;
            

          }

        }
    },
    async mounted() {
      //L_deliverGoods
      
    }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
page 
  background: #f5f5f5
.kuang
  width: 702px
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
      .collage
        display: inline-block
        width: 180px
        height: 60px
        background: rgba(246,124,47,1)
        border-radius: 8px
        color: #fff
        margin: 30px 20px 0 0
        line-height: 60px
// 发布弹窗
.box
  width: 100%
  height: 100%
  background: rgba(0,0,0,.5)
  position: fixed
  top: 0px
  left: 0px
  .kuang_1
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
