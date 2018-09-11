<template>
  <div class="home">
    <div class="user-img" @click="toRoute('decorate/msg')">
      <i class="i_store"></i>
      <p class="name">{{selectWarehouse.name}}</p>
      <img class="upload" :src="selectWarehouse.img" />
    </div>
    <div class="line-box">
      <div class="line b_line" @click="toRoute('sendWay/sendWay')">
        <i class="i_s2 i-icon"></i>
        <p class="input">发货方式</p>
      </div>
      <div class="line b_line" @click="toRoute('storeAdr/storeAdr')">
        <i class="i_s3 i-icon"></i>
        <p class="input">商家地址</p>
      </div>
      <div class="line" @click="toRoute('decorateTmp')">
        <i class="i_s4 i-icon"></i>
        <p class="input">店铺装修</p>
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
      selectWarehouse: ""
    };
  },
  methods: {
    toRoute(file) {
      this.$router.push("/pages/home/storeMgr/" + file);
    },
    getUserInfo() {
      this.$API.selectWarehouse({}).then(response => {
        this.selectWarehouse = response.data
      })
    }
  },
  onShow() {
    wx.removeStorageSync("FMimg");
    wx.removeStorageSync("remark");
    this.getUserInfo();
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  padding-top: 20px
  color: #000
.b_line
  +border(1px,bottom,#f5f5f5)
.line-box
  padding: 0 24px
  background: #fff
.line
  display: flex
  height: 108px
  line-height: 108px
  position: relative
  .i-icon
    +center
    +icon(42px)
    left: 0px
  .i_s2
    +bg-img('storeMgr/s2.png')
    height: 36px
  .i_s3
    +bg-img('storeMgr/s3.png')
    width: 36px
  .i_s4
    +bg-img('storeMgr/s4.png')
  .input
    padding: 0px 70px
    height: 100%
.user-img
  height: 142px
  line-height: 142px
  text-align: left
  position: relative
  padding: 0px 24px
  margin-bottom: 20px
  background: #fff
  .i_store
    +bg-img('storeMgr/s1.png')
    +icon(42px)
    height: 36px
    +center
    left: 24px
  .name
    float: left
    width: 450px
    padding-left: 70px
  .upload
    +circle(120px)
    background: #f3f2f3
    line-height: 104px
    +center
    right: 24px

</style>
