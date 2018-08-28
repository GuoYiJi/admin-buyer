<template>
  <div class="login">
    <div class="line">
      <i class="phone-icon"></i>
      <input v-model.lazy="phone" class="input" placeholder="输入账号"/>
    </div>
    <div class="line">
      <i class="pwd-icon phone-icon"></i>
      <input v-show="!pwdShow" v-model.lazy="pwd" class="input" type="password" placeholder="请输入密码"/>
      <input v-show="pwdShow" v-model.lazy="pwd" class="input" placeholder="请输入密码"/>
      <i class="showPwd-icon" @click="showPwd"></i>
    </div>
    <div class="login-btn">
      <p @click="toHome"><btn :title="'登录'"/></p>
    </div>
    <a href="/pages/login/lForgetPwd" class="forget_pwd">忘记密码</a>
    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机号</button> 
    <i-message id="message" />
  </div>
</template>
<script>
// const { $Message } = require('@/utils/index')
import wx from "wx";
import btn from "@/components/btn.vue";
import config from "@/config";
export default {
  components: {
    btn
  },
  data() {
    return {
      phone: "",
      pwd: "",
      pwdShow: false
    };
  },
  methods: {
    toHome() {
      setTimeout(() => {
        // const arr = [{
        //   name: this.phone,
        //   plan: 'phone'
        // },{
        //   name: this.pwd,
        //   plan: 'password'
        // }]
        // const msg = this.$check.all(arr)
        // if(msg){
        //   this.handleError(msg)
        //   return
        // }
        // this.$router.push('/pages/home/addShop/addShop')
        this.$router.push("/pages/home/home");
      }, 0);
    },
    handleError(msg) {
      this.$Message({
        content: msg,
        type: "error"
      });
    },
    showPwd() {
      this.pwdShow = !this.pwdShow;
    },
    getPhoneNumber(e){
      console.log(e.mp.detail.hasOwnProperty('encryptedData'))
      if(!e.mp.detail.hasOwnProperty('encryptedData')){
        console.log('需要同意授权才可以使用噢！')
      }
    },
    login(){
      
    }
  },
  mounted() {
    // wx.checkSession({
    //   success: function(){
    //     //session_key 未过期，并且在本生命周期一直有效
    //   },
    //   fail: function(){
    //     // session_key 已经失效，需要重新执行登录流程
    //     // wx.login() //重新登录
    //   }
    // })

    // wx.login({
    //   success: async (res)=>{
    //     if (res.code) {
    //       //发起网络请求
    //       const data = await this.$API.authLogin({
    //         code: res.code,
    //         head: '',
    //         nick: '',
    //         phone: '',
    //         appId: config.appId
    //       })
    //       console.log(data)
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.forget_pwd
  padding: 40px 10px
.login-btn
  padding: 70px 10px 0 10px
.login
  padding: 80px 64px
  background: #fff
  height: 100%
.line
  display: flex
  height: 90px
  +border(2px,bottom)
  position: relative
  margin-bottom: 50px
  .phone-icon
    +bg-img('login/phone.png')
    +center
    +icon(32px)
    left: 10px
    width: 28px
    vertical-align: text-bottom
  .pwd-icon
    +bg-img('login/pwd.png')
  .showPwd-icon
    +bg-img('login/show_pwd.png')
    +center
    +icon(32px)
    right: 0px
    height: 18px
  .input
    padding: 0px 60px
    height: 100% 

</style>
