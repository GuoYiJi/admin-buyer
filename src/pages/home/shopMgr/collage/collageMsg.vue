<template>
  <!-- 创建拼团 | 编辑拼团 -->
<div class="home">
  <ul class="line-box">
    <li>
      <span class="title">成团数量: </span>
      <input type="number" class="input_text" placeholder="请输入成团数量" v-model="personNum">
    </li>
    <li class="more">
      <span class="title">生效时间: </span>
      <p class="blur">
        <picker mode="date" :value="setDate" :start="startDate" @change="bindDateChange">
          <view class="picker">
            {{setDate ? setDate : '未设置'}}
          </view>
        </picker>
      </p>
    </li>
    <li class="more">
      <span class="title">过期时间: </span>
      <p class="blur">
        <picker mode="date" :value="setEndDate" :start="startEndDate" @change="bindEndDateChange">
          <view class="picker">
            {{setEndDate ? setEndDate : '未设置'}}
          </view>
        </picker>
      </p>
    </li>
    <li>
      <span class="title">限购次数: </span>
      <input type="number" class="input_text" placeholder="请输入限购次数" v-model="limitTimes">
    </li>
    <li>
      <span class="title">限购次数: </span>
      <input type="number" class="input_text" placeholder="请输入限购件数" v-model="limitNum">
    </li>
    <li v-if="isEdit">
      <span class="title">拼团价: </span>
      <span class="inputPrice">
        <input type="number" class="input_text" v-model="price">
        <p>元</p>
      </span>
    </li>
    <li v-else @click="toRoute('shopList')">
    <span class="title">可使用的商品: </span>
    <p class="blur">
      {{ showShop }}
    </p>
    </li>
  </ul>
  <i-message id="message" />
  <div class="footer">
    <p class="save" v-if="isEdit" @click="editGroup()">保存编辑</p>
    <p class="save" v-else @click="createGroup()">保存创建</p>
  </div>
</div>
</template>
<script>
import wx from "wx";
import config from "@/config"
import { mapState } from "vuex"
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
      personNum: 0,
      price: 0,
      // groupPriceData: [],
      selIds: [],
      requestData: [],
      url: '',
      isEdit: false,
      goodsId: ''
    };
  },
  computed: {
    ...mapState(["shopSelectList"]),
    showShop() {
      if (this.shopSelectList) {
        console.log(this.shopSelectList);
        return '已选择' + this.shopSelectList.length + '件'
        // return `已选择${this.shopSelectList.length}件`
      }
      return '去添加商品'
    },
  },
  watch: {
    // isEdit(currentValue, oldValue) {
    //   this.isEdit = !this.isEdit
    // },
    // setDate(currentValue, oldValue) {
    //   console.log(currentValue);
    //   this.setDate = currentValue
    // },
    // setEndDate(currentValue, oldValue) {
    //   console.log(currentValue);
    //   this.setEndDate = currentValue
    // }
  },
  methods: {
    //创建拼团
    createGroup() {
      console.log(this.shopSelectList);
      this.shopSelectList.forEach((item, index) => {
        this.requestData[index] = {
          num: this.personNum,
          startTime: this.setDate,
          endTime: this.setEndDate,
          limitNum: this.limitNum,
          limitTimes: this.limitTimes,
          price: item.groupPrice,
          goodsId: item.id
        };
      });
      console.log(this.requestData);
      const vm = this
      wx.request({
        url: this.url + '/api/shop/ping/addPing',
        data: { pingList: this.requestData, sessionId: wx.getStorageSync('sessionId'), shopId: config.appId },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data);
          if(res.data.code == 1) {
            vm.$router.back(-1);
          }
        }
      })
    },
    //编辑拼团
    editGroup() {
      const vm = this
      wx.request({
        url: this.url + '/api/shop/ping/editPing',
        data: {
          pingList: {
            num: this.personNum,
            startTime: this.setDate,
            endTime: this.setEndDate,
            limitNum: this.limitNum,
            limitTimes: this.limitTimes,
            price: this.price,
            goodsId: this.goodsId
          },
          sessionId: wx.getStorageSync('sessionId'),
          shopId: config.appId
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(res.data);
          if(res.code === 1) {
            vm.$router.back(-1);
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
      console.log(e);
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
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
    // console.log(this.$route.query.groupPriceData, this.$route.query.selIds)
    console.log(this.$route.query);
    if(this.$route.query.isEdit === "true") {
      this.isEdit = true;
    }else {
      this.isEdit = false;
      this.setDate = '',
      this.setEndDate = '',
      this.limitNum = 0,
      this.limitTimes = 0,
      this.personNum = 0,
      this.price = 0,
      this.goodsId = ''
    }
    if (this.$route.query.pingInfo) {
      const pingInfo = JSON.parse(this.$route.query.pingInfo);
      console.log(pingInfo);
      this.personNum = pingInfo.num
      this.limitNum = pingInfo.limitNum
      this.limitTimes = pingInfo.limitTimes
      this.setDate = pingInfo.startTime
      this.setEndDate = pingInfo.endTime
      this.goodsId = pingInfo.id
      this.price = pingInfo.price
    }
    this.url = config.url;
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
ul.line-box
  padding: 0 25px
  background-color: #ffffff
  li
    padding: 40px 0
    font-size: 32px
    display: flex
    align-items: center
    justify-content: space-between
    padding-right: 30px
    border-bottom: 1px solid #CCCCCC
    &:last-of-type
      border: none
    &.more
      background: url("~@/assets/img/home/shanJiao.png") no-repeat right
      background-size: 16px 30px
    span.title
      width: 200px
      +singleFile
    input.input_text
      flex: 1
      text-align: right
      overflow: hidden
      border: none
      &::-webkit-input-placeholde
        color: #999999
    p.blur
      flex: 1
      text-align: right
      color: #999999
    span.inputPrice
      flex: 1
      overflow: hidden
      display: flex
      align-items: center
      justify-content: flex-end
      input.input_text
        flex: 1
        text-align: right
        overflow: hidden
        border: none
        &::-webkit-input-placeholde
          color: #999999
      p
        width: 40px
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

</style>
