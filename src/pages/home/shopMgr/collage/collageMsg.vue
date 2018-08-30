<template>
<div class="home">
  <div class="line-box">
    <div class="line b_line">
      <p class="input">成团数量：</p>
      <input class="input_text" placeholder="请输入成团数量" v-model="personNum">
    </div>
    <div class="line b_line">
      <p class="input">生效时间：</p>
      <p class="blur">
        <picker mode="date" :value="setDate" :start="startDate" @change="bindDateChange">
          <view class="picker">
            {{setDate ? setDate : '未设置'}}
          </view>
        </picker>
      </p>

    </div>
    <div class="line">
      <p class="input">过期时间：</p>
      <p class="blur">
        <picker mode="date" :value="setEndDate" :start="startEndDate" @change="bindEndDateChange">
          <view class="picker">
            {{setEndDate ? setEndDate : '未设置'}}
          </view>
        </picker>
      </p>
    </div>
    <div class="line b_line">
      <p class="input">限购次数：</p>
      <input class="input_text" placeholder="请输入限购次数" v-model="limitTimes">
    </div>
    <!-- <div class="line b_line">
        <p class="input">所在地区</p>
        <p class="blur">
          <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
            <view class="picker">
              {{region.length > 0 ? region[0] + '-' + region[1] + '-' + region[2] : '未设置' }}
            </view>
          </picker>
        </p>

      </div> -->
    <div class="line">
      <p class="input">限购件数：</p>
      <input class="input_text" placeholder="请输入限购件数" v-model="limitNum">
    </div>
    <div class="line p_top">
      <p class="input">可使用的商品：</p>
      <p class="blur" @click="toRoute('shopList')">
        {{ showShop }}
      </p>
    </div>
  </div>
  <i-message id="message" />
  <div class="footer">
    <p class="save" @click="createGroup()">保存</p>
  </div>
</div>
</template>
<script>
import wx from "wx";
import config from "@/config"
export default {
  components: {},
  data() {
    return {
      startDate: new Date(),
      setDate: '',
      setEndDate: '',
      startEndDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      addShop: '', //添加了多少件
      limitNum: 0,
      limitTimes: 0,
      groupPriceData: [],
      selIds: [],
      requestData: [],
      url: ''
    };
  },
  computed: {
    showShop() {
      if (this.addShop) {
        return this.addShop + '件'
      }
      return '去添加商品'
    }
  },
  methods: {
    //创建拼团
    createGroup() {
      // this.$API.s_createGroup({
      //   num: this.personNum,
      //   startTime: this.setDate,
      //   endTime: this.setEndDate,
      //   limitNum: this.limitNum,
      //   limitTimes: this.limitTimes,
      //   price: '',
      //   goodsId: '',
      // })
      this.groupPriceData.forEach((item, index) => {
        this.requestData[index] = {
          num: this.personNum,
          startTime: this.setDate,
          endTime: this.setEndDate,
          limitNum: this.limitNum,
          limitTimes: this.limitTimes,
          price: this.groupPriceData[index],
          goodsId: this.selIds[index]
        };
      });

      console.log(this.requestData);
      wx.request({
        url: this.url,
        data: { pingList: this.requestData, sessionId: wx.getStorageSync('sessionId'), shopId: config.appId },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data);
          if(res.code === 1) {
            this.$route.back(-3);
          }
        }
      })
    },
    bindDateChange(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      if (this.setEndDate) {
        if (+new Date(this.setEndDate) < +new Date(e.mp.detail.value)) {
          this.handleError('生效时间不能大于过期时间！')
          return
        }
      }
      this.setDate = e.mp.detail.value
    },
    bindEndDateChange(e) {
      if (!this.setDate) {
        this.handleError('请先设置生效时间！')
        return
      }
      if (+new Date(this.setDate) > +new Date(e.mp.detail.value)) {
        this.handleError('生效时间不能大于过期时间！')
        return
      }
      this.setEndDate = e.mp.detail.value
    },
    handleError(msg) {
      this.$Message({
        content: msg,
        type: 'error'
      })
    },
    toRoute(path) {
      this.$router.push({
        path: '/pages/home/shopMgr/' + path,
        query: {
          type: 'collage'
        }
      })
    }
  },
  mounted() {
    console.log(this.$route.query.groupPriceData, this.$route.query.selIds)
    if (this.$route.query.groupPriceData) {
      this.groupPriceData = JSON.parse(this.$route.query.groupPriceData)
      this.selIds = JSON.parse(this.$route.query.selIds);
      this.addShop = this.selIds.length;
    }
    this.url = config.url + '/api/shop/ping/addPing';
    console.log(this.url)
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.p_top
  padding-top: 20px
.footer
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 95px
  line-height: 95px
  color: #fff
  text-align: center
  background: #F67C2F
.b_line
  +border(1px,bottom,#f5f5f5)
.line-box
  padding: 0 24px
  background: #fff
  margin-bottom: 20px
.line
  display: flex
  height: 108px
  line-height: 108px
  position: relative
  .input
    height: 100%
    padding-right: 8px
  .blur
    color: #999
    font-size: 28px
    +center
    right: 0
    width: 100%
    text-align: right
  .input_text
    height: 68px
    line-height: 108px
    padding: 20px

</style>
