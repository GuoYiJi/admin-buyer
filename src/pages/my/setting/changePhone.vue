<template>
<div class="wrapper">
  <div class="login">
    <div class="line">
      <i class="phone-icon"></i>
      <input v-model="phone" class="input" type="number" placeholder="输入手机号"/>
    </div>
    <div class="line">
      <i class="code-icon phone-icon"></i>
      <input v-model="code" class="input" type="number" placeholder="输入短信验证码"/>
      <span  class="send-qr" @click="senQr">{{sending ? time +' s' : '发送验证码'}}</span>
    </div>
    <div class="login-btn">
      <p @click="toHome"><btn :title="'更改绑定'"/></p>
    </div>
    <i-message id="message" />
  </div>
</div>
  
</template>
<script>
import btn from "@/components/btn.vue";
import wx from "wx";
export default {
  components: {
    btn
  },
  data() {
    return {
      sending: false,
      time: 60,
      phone: '',
      code: ''
    };
  },
  methods: {
    senQr() {
      if (this.sending) return;
      this.sending = true;
      const inter = setInterval(() => {
        this.time = this.time - 1;
        console.log(this.time);
        if (this.time <= 0) {
          clearInterval(inter);
          this.sending = false;
          this.time = 60;
        }
      }, 1000);
    },
    toHome(){
      const arr = [{
        name: this.phone,
        plan: 'phone'
      },{
        name: this.code,
        msg: '验证码'
      }]
      const msg = this.$check.all(arr)
      if(msg){
        this.handleError(msg)
        return 
      }
      this.$router.push('/pages/home/home')
    },
    showPwd(){
      this.pwdShow = !this.pwdShow
    },
    handleError (msg) {
      this.$Message({
        content: msg,
        type: 'error'
      })
    },
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.wrapper
  background: #fff
.send-qr
  +center
  right: 0
  color: #fff
  background: #999
  width: 130px
  height: 66px
  line-height: 66px
  border-radius: 4px
  font-size: 20px
  text-align: center
.forget_pwd
  padding: 40px 10px
.login-btn
  padding: 270px 10px 0 10px
.login
  padding: 8% 64px
  background: #fff
  // height: 84%
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
  .code-icon
    +bg-img('login/code.png')
  .showPwd-icon
    +bg-img('login/show_pwd.png')
    +center
    +icon(32px)
    right: 0px
    height: 18px
  .input
    padding: 0px 60px
    height: 100% 
    width: 100%
</style>