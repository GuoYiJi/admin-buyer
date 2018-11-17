<template>
<div class="home">
  <div class="line-box">
    <div class="line" @click="toRoute('sendWay/selectTemplet')">
      <p class="name">快递邮寄</p>
      <p class="setting">{{isSetting ? '已设置' : '未设置'}}</p>
      <i class="goback"></i>
    </div>
    <div class="line flex">
      <p class="name">物流到付</p>
      <i-switch :value="switch1" @change="onChange" slot="footer"></i-switch>
    </div>
  </div>
</div>
</template>
<script>
import wx from "wx";

export default {
  data() {
    return {
      switch1: false,
      templateId: '',
      isSetting: false
    };
  },
  computed: {
    isGetPay() {
      if(this.switch1) {
        return '0'
      }else {
        return '1'
      }
    }
  },
  methods: {
    toRoute(url) {
      this.$router.push('/pages/home/storeMgr/' + url)
    },
    // 切换"物流到付"状态
    onChange({mp: {detail}}) {
      this.setData({
        switch1: detail.value
      })
      // console.log(this.switch1);
      // if(this.switch1) {
      //   this.isGetPay = 1
      // }else {
      //   this.isGetPay = 0
      // }
      wx.showLoading({
        title: '请求中'
      })
      this.$API.changeExpressType({
        isGetPay: this.isGetPay
      }).then(res => {
        wx.hideLoading()
      })
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    // 查询"物流到付"状态
    getIsGetPay() {
      this.$API.selectWarehouse({}).then(response => {
        this.isGetPay = response.data.isGetPay !== 1;
        this.switch1 = response.data.isGetPay !== 1;
      })
    }
  },
  mounted() {
    // this.templateId= this.$route.query.templateId
    if (wx.getStorageSync('templateId')) {
      this.isSetting = true
    }
    this.getIsGetPay()
  },
  onShow() {
    if (wx.getStorageSync('templateId')) {
      this.isSetting = true
    }
    this.getIsGetPay()
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.flex
  display: flex
  justify-content: space-between
.line
  display: flex
  align-items: center
  height: 110px
  line-height: 110px
  text-align: left
  padding: 0px 24px
  margin: 20px 0
  background: #fff
  .name
    width: 450px
    +singleFile
  .setting
    flex: 1
    padding: 0 20px
    +singleFile
    text-align: right
  .goback
    display: inline-block
    width: 16px
    height: 29px
    background: url("~@/assets/img/home/shanJiao.png") no-repeat center
    background-size: 100% 100%
.home
.footer
  position: absolute
  bottom: 80px
  left: 0
  right: 0
  p
    padding: 0 75px
</style>
