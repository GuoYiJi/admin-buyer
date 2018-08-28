<template>
  <div class="nav">
    <form class="form">
      <div class="head">
        <span class="head_text">优惠券名称：</span>
        <input class="head_input" type="text" value="优惠券名称" disabled="true">
      </div>
      <div class="value">
        <span class="value_text">面值：</span>
        <input class="value_input" type="text" value="12" disabled="true">
      </div>
      <div class="grant">
        <span class="grant_text">发放总量：</span>
        <input class="grant_input" type="text" placeholder="请输入发放数量" value="45">
      </div>
      <div class="effect">
        <span class="text">生效时间：</span>
        <span class="picker_1">2018-12-02</span>
      </div>
      <div class="effect">
        <span class="text">过期时间：</span>
        <span class="picker_1">2018-12-02</span>
      </div>
      <div class="effect">
        <span class="text">领取设置：</span>
        <span class="settings">
          <span class="settings_text">已设置</span>
          <i class="img"></i>
        </span>
      </div>
      <div class="effect">
        <span class="text">使用设置：</span>
        <span class="settings">
          <span class="settings_text">已设置</span>
          <i class="img"></i>
        </span>
      </div>
      <div class="btn">
        <span class="btn_1" @click="btn_1()">保存</span>
        <span class="btn_2">使失效</span>
      </div>
    </form>
  </div>
</template>
<script>
import wx from "wx";
export default {
    components: {},
    data() {
        return {};
    },
    methods: {
        btn_1() {
            wx.navigateBack({
                data: 1
            });
        }
    },
    mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  height: 89px
  background: #fff
  padding: 0 23px
  display: flex
  border-bottom: 1px solid #cecece
  .head_text
    display: inline-block
    margin-top: 25px
  .head_input
    display: inline-block
    margin-top: 20px
    padding-left: 10px
    width: 460px
.value
  height: 118px
  background: #fff
  padding: 0 23px
  display: flex
  border-bottom: 1px solid #cecece
  .value_text
    display: inline-block
    margin-top: 35px
  .value_input
    display: inline-block
    margin-top: 30px
    margin-left: 90px
    padding-left: 10px
    border-radius: 4px
    width: 460px
.grant
  height: 118px
  background: #fff
  padding: 0 23px
  display: flex
  border-bottom: 1px solid #cecece
  .grant_text
    display: inline-block
    margin-top: 35px
  .grant_input
    display: inline-block
    margin-top: 30px
    margin-left: 33px
    padding-left: 10px
    border: 1px solid #cecece
    border-radius: 4px
    width: 460px
.effect
  height: 110px
  background: #fff
  display: flex
  line-height: 110px
  border-bottom: 1px solid #cecece
  position: relative
  .text
    display: inline-block
    flex: 5
    padding-left: 20px
    margin-right: -140px
  .settings
    display: inline-block
    flex: 1
    .settings_text
      display: inline-block
      margin-right: 18px
      margin-left: -20px
    .img
      display: inline-block
      +bg-img('home/shanJiao.png')
      width: 16px
      height: 29px
  .picker_1
    position: absolute
    top: 0px
    right: 0px
    width: 210px
    height: 110px
.btn
  height: 404px
  text-align: center
  position: fixed
  bottom: 0px
  width: 100%
  background: #fff
  .btn_1
    font-size: 32px
    color: #fff
    background: #F67C2F
    display: inline-block
    width: 300px;
    height: 90px;
    line-height: 90px
    text-align: center
    border-radius: 10px;
    position: absolute
    top: 215px;
    left: 65px;

  .btn_2
    font-size: 32px
    display: inline-block
    color: #fff
    background: #CCCCCC
    width: 300px;
    height: 90px;
    border-radius: 10px;  
    position: absolute 
    top: 215px;
    left: 379px;
    line-height: 90px
    text-align: center
</style>
