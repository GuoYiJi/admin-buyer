<template>
  <div class="home">
    <form class="form">
        <div class="head">
        <span class="head_text">优惠券名称：</span>
        <input class="head_input" v-model="couponInfo.name" type="text" placeholder="请输入（8个字以内，不可特殊字符）" disabled="true">
      </div>
      <div class="value">
        <span class="value_text">面值：</span>
        <input class="value_input" v-model="couponInfo.price" type="digit" placeholder="请输入面值" disabled="true">
      </div>
        <div class="grant">
        <span class="grant_text">发放总量：</span>
        <input class="grant_input" v-model="count" type="number" placeholder="请输入发放数量">
      </div>
      <div class="effect">
        <span class="text">生效时间：</span>
        <span class="settings">
          {{startTime}}
        </span>
      </div>
      <div class="effect">
        <span class="text">过期时间：</span>
        <span class="settings">
          {{endTime}}
        </span>
      </div>
      <div class="effect" @click="Receive">
        <span class="text">领取设置：</span>
        <span class="settings">
          <span class="settings_text">{{couponInfo.isLimitCount == 1 ? '不限金额' : '满' + couponInfo.limitCount+ '元可用' }}</span>
        </span>
      </div>
      <div class="effect" @click="Use">
        <span class="text">使用设置：</span>
        <span class="settings">
          <span class="settings_text">{{couponInfo.isOriginalPrice == 1 ? '仅原价购买可用' : '可用于打折商品' }}|{{couponInfo.isAll == 1 ? '适用于' + couponInfo.originalGoodsCount + '件商品' : '适用于全部商品'}}</span>
        </span>
      </div>
    </form>
    <div class="btn">
      <button class="btn_1" @click="updateCoupon()">保存</button>
      <button class="btn_2" v-if="state == 0" @click="changeState()">使失效</button>
    </div>
  </div>
</template>
<script>
import wx from "wx";
export default {
    data() {
        return {
          couponInfo: {},
          startTime: '',
          endTime: '',
          count: 0, // 优惠券发放量
          state: 0
        };
    },
    methods: {
      // 修改优惠券
        updateCoupon() {
          if(!this.count) {
            wx.showToast({
              title: '发放数量不能为空',
              icon: 'none'
            })
          }else {
            this.$API.updateCoupon({
              couponId: this.couponInfo.id,
              count: this.count
            }).then(response => {
              wx.showToast({
                title: '修改成功',
                icon: 'success'
              })
              setTimeout(() => {
                this.$router.back(-1)
              }, 1500)
            })
          }
        },
        // 使失效
        changeState() {
          this.$API.changeState({
            couponId: this.couponInfo.id,
          }).then(response => {
            wx.showToast({
              title: '已失效',
              icon: 'success'
            })
            setTimeout(() => {
              this.$router.back(-1)
            }, 1500)
          })
        }
    },
    mounted() {
      if(this.$route.query.item) {
        this.state = JSON.parse(this.$route.query.state)
        console.log(this.state);
        this.couponInfo = JSON.parse(this.$route.query.item)
        this.count = this.couponInfo.count
        this.startTime = this.couponInfo.startTime.split(' ')[0].toString()
        this.endTime = this.couponInfo.endTime.split(' ')[0].toString()
      }
    }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.head
  height: 89px
  background: #fff
  display: flex
  align-items: center
  border-bottom: 1px solid #cecece
  .head_text
    width: 200px
    +singleFile
  .head_input
    flex: 1
    overflow: hidden
      padding: 10px
    text-align: right
.value
  height: 118px
  background: #fff
  display: flex
  align-items: center
  border-bottom: 1px solid #cecece
  .value_text
    width: 200px
    +singleFile
  .value_input
    flex: 1
    text-align: right
    overflow: hidden
    padding: 10px
    border: 1px solid #cecece
    border-radius: 4px
    width: 460px
    &[disabled]
      padding: 10px
      background-color: #DCDCDC
.grant
  height: 118px
  background: #fff
  display: flex
  align-items: center
  border-bottom: 1px solid #cecece
  .grant_text
    width: 200px
    +singleFile
  .grant_input
    flex: 1
    overflow: hidden
    padding: 10px
    text-align: right
    display: inline-block
    padding-left: 10px
    border: 1px solid #cecece
    border-radius: 4px
.form
  padding: 0 25px
  background-color: #fff
  display: flex
  flex-wrap: wrap
  justify-content: center
.effect
  width: 100%
  display: flex
  justify-content: space-between
  height: 110px
  // background: #fff
  // background: url("~@/assets/img/home/shanJiao.png") no-repeat right
  // background-size: 16px 29px
  display: flex
  line-height: 110px
  border-bottom: 1px solid #cecece
  position: relative
  &:last-of-type
    border: none
  .text
    width: 150px
    +singleFile
  .settings
    flex: 1
    text-align: right
    // padding-right: 30px
  // .picker_1
  //   position: absolute
  //   top: 0
  //   right: 0
  //   left: 0
  //   bottom: 0
  //   .picker
  //     height: 110px
  //     padding-left: 70%
.btn
  height: 98px
  text-align: center
  line-height: 98px
  position: fixed
  left: 0
  right: 0
  bottom: 50px
  width: 80%
  margin: auto
  display: flex
  justify-content: space-between
  align-items: center
  button
    flex: 1
    height: 90px
    line-height: 90px
    text-align: center
    margin-right: 10px
    font-size: 32px
    color: #fff
    &:last-of-type
      margin-right: 0
  .btn_1
    background-color: #F67C2F
  .btn_2
    background-color: #CCCCCC
</style>
