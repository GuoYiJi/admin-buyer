<template>
  <div class="nav">
    <div class="please">
      <picker class="please_text" @change="bindPickerChange" :value="index" :range="array" v-if="(index == 0)">
        <view class="picker">
          <span class="picker_title">当前选择：</span>
          <span class="picker_text">{{array[index]}}</span>
          <i class="img"></i>
        </view>
      </picker>
      <p class="select" v-if="(index == 1)" @click="toRoute">
        <span class="sel-text">当前选择：</span>
        <span class="sel-text1">选择商品</span>
      </p>
    </div>
    <div class="line flex">
      <p class="name">仅原价购买时可用</p>
      <i-switch :value="switch1" @change="onChange" slot="footer"></i-switch>
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      switch1: false,
      array: ["全部商品", "部分商品"],
      index: 0,
      isOriginalPrice: ""
    };
  },
  methods: {
    onChange({ mp: { detail } }) {
      this.switch1 = detail.value;
      if (this.switch1 == false) {
        this.isOriginalPrice = 0;
        wx.setStorageSync("isOriginalPrice", this.isOriginalPrice);
      } else if (this.switch1 == true) {
        this.isOriginalPrice = 1;
        wx.setStorageSync("isOriginalPrice", this.isOriginalPrice);
      }
    },
    bindPickerChange(e) {
      console.log("picker发送选择改变，携带值为", e.mp.detail.value);
      this.index = e.mp.detail.value;
    },
    toRoute() {
      this.$router.push("/pages/home/shopMgr/matchListMout");
    }
  },
  onShow() {
    wx.setStorage({
      key: "isOriginalPrice",
      data: this.isOriginalPrice
    });
  },
  mounted() {
    this.index = 0;
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.flex
  display: flex
  justify-content: space-between
.line
  height: 110px
  line-height: 110px
  text-align: left
  position: relative
  padding: 0px 24px
  margin: 20px 0
  background: #fff
  .name
    float: left
    width: 450px
.text
  color: #FF0000
  font-size: 26px
  padding-left: 25px
.please
  height: 110px
  text-align: left
  background: #fff
  margin: 20px 0
  position: relative
  .please_text
    display: inline-block
    width: 100%
    padding: 33px 0 0 25px
    .picker
      display: flex
      .picker_title
        flex: 5
      .picker_text
        flex: 2
        margin-right: -60px
      .img
        display: inline-block
        +bg-img('home/shanJiao.png')
        width: 16px
        height: 29px
        margin-right: 60px
        margin-top: 7px
  .select
    display: inline-block
    width: 100%
    padding: 33px 0 0 25px
    .sel-text1
      float: right
      padding-right: 55px
</style>
