<template>
  <div class="home">
    <div class="login">
      <p v-if="userInfo.userInfo"><img :src="userInfo.userInfo.avatarUrl" class="icon_wx" /></p>
      <p v-else><i class="icon_wx"></i></p>
      <p>{{userInfo.userInfo ? userInfo.userInfo.nickName : '微信登陆'}}</p>
    </div>
    <i-message id="message" />
    <button v-if="!userInfoBool" class="user_btn wx_btn" open-type="getUserInfo" @getuserinfo="getUserInfo">获取用户信息</button>
    <button v-if="userInfoBool" class="wx_btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权登陆</button>
  </div>
</template>
<script>
import wx from "wx";
import mixin from "@/mixin";
import config from "@/config";
export default {
  mixins: [mixin],
  components: {},
  data() {
    return {
      userInfoBool: false,
      userInfo: {},
      code: ""
    };
  },
  computed: {
    showBtn() {
      return this.userInfoBool;
    }
  },
  methods: {
    async getPhoneNumber(e) {
      if (!e.mp.detail.encryptedData) {
        this.handleError("需要同意授权才可以使用噢！");
      } else {
        const val = await wx.getStorageSync("sessionId");
        if (val) {
          return wx.switchTab({
            url: '/pages/home/home'
          })
        }
        this.login(e.mp.detail);
      }
    },
    getUserInfo(e) {
      console.log(e);
      if (!e.mp.detail.encryptedData) {
        this.handleError("需要同意授权才可以使用噢！");
      } else {
        this.userInfoBool = true;
        this.userInfo = e.mp.detail;
        this.login(e.mp.detail);
      }
    },
    async login(encryptedData) {

      try {

        const data = await this.$API.authLogin({
          code: this.code,
          avatar: this.userInfo.userInfo.avatarUrl,
          nick: this.userInfo.userInfo.nickName,
          // phone: "",
          // appId: config.appId,
          encryptedDataPhone: encryptedData.encryptedData,
          ivPhone: encryptedData.iv,
          encryptedData: this.userInfo.encryptedData,
          iv: this.userInfo.iv
        });
        await wx.setStorageSync(`${process.env.NODE_ENV}_sessionId`, data.data.sessionId);
        wx.setStorageSync('is-login', true);
        await wx.setStorageSync("avatar", data.data.avatar);
        // this.toRoute("home/home");
        wx.switchTab({
          url: '/pages/home/home'
        })
      } catch (err) {
        
      }
    }
  },
  async mounted() {
    wx.login({
      success: async res => {
        if (res.code) {
          this.code = res.code;
          wx.getUserInfo({
            success: res => {
              // console.log(res);
              this.userInfoBool = true;
              this.userInfo = res;
            },
            fail: err => {
              // this.userInfoBool = true
            }
          });
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
      fail: () => {
        self.handleError("授权失败！");
      }
    });
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.wx_btn
  position: absolute
  bottom: 218px
  width: 266px
  height: 74px
  left: 242px
  border-radius: 40px
  background: #FF9036
  line-height: 74px
  color: #fff
.user_btn
  bottom: 320px!important
.login
  padding-top: 226px
  padding-left: 285px
  width: 180px
  .icon_wx
    +bg-img('login/wxLogin.png')
    +icon(180px)
    border-radius: 180px
  p
    color: #333
    font-size: 28px
    padding-top: 34px
    text-align: center

</style>
