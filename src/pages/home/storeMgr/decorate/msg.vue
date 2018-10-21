<template>
<div class="home">
  <div class="user-img" @click="chooseImg">
    <!-- <i class="i_store"></i> -->
    <p class="name">店铺头像</p>
    <img class="upload" :src="img" />
    </div>
  <div class="line-box">
    <div class="line b_line">
      <!-- <i class="i_s2 i-icon"></i> -->
      <p class="input">店铺名称：</p>
      <input class="input_text" v-model="name" placeholder="请输入您的店铺名字">
    </div>
    <div class="line b_line" @click="toRoute('decorate/cover')">
      <!-- <i class="i_s3 i-icon"></i> -->
      <p class="input">店铺封面</p>
      <p class="blur" v-if="FMimg == ''">未设置</p>
      <p class="blur" v-if="FMimg != ''">已设置</p>
    </div>
    <div class="line" @click="pageTo('/pages/home/storeMgr/decorate/intro')">
      <!-- <i class="i_s4 i-icon"></i> -->
      <p class="input">店铺简介</p>
      <p class="blur" v-if="remark == ''">未设置</p>
      <p class="blur" v-if="remark != ''">已设置</p>
    </div>
    <!-- <div class="line" @click="toRoute('decorate/viewTemplet')">
        <p class="input">店铺装修模板</p>
        <p class="blur">未设置</p>
      </div> -->
  </div>
  <div class="line-box">
    <div class="line b_line">
      <!-- <i class="i_s2 i-icon"></i> -->
      <p class="input">公司名称：</p>
      <input class="input_text" v-model="companyName" placeholder="请输入您的公司名字">

      </div>
    <div class="line b_line">
      <!-- <i class="i_s3 i-icon"></i> -->
      <p class="input">所在地区</p>
      <p class="blur">
        <picker mode="region" @change="bindRegionChange" :value="region">
          <view class="picker">
            {{region.length > 0 ? region[0] + '-' + region[1] + '-' + region[2] : '未设置' }}
          </view>
        </picker>
      </p>

    </div>
    <div class="line">
      <!-- <i class="i_s4 i-icon"></i> -->
      <p class="input">详细地址：</p>
      <input class="input_text" v-model="address" placeholder="请输入详细地址">

      </div>
  </div>
  <div class="footer">
    <p @click="btn()">
      <btn :title="'保存'" />
    </p>
  </div>
</div>
</template>
<script>
import wx from "wx"
import btn from "@/components/btn.vue"
import config from "@/config"
import uploadImg from "@/plugins/uploadImg"
export default {
  components: {
    btn
  },
  data() {
    return {
      img: "",
      name: "",
      companyName: "",
      address: "",
      FMimg: "",
      remark: "",
      region: ["广东省", "广州市", "海珠区"],
      Warehouse: [],
      templateId: '1'
    };
  },
  methods: {
    // 查询店铺详情
    selectWarehouse() {
      this.$API.selectWarehouse().then(response => {
        wx.setStorageSync('dpName', response.data.companyName)
        this.img = response.data.img
        this.name = response.data.name
        this.remark = response.data.remark
        this.companyName = response.data.companyName
        this.address = response.data.address
        this.region = [response.data.sheng, response.data.shi, response.data.qu]
        this.FMimg = response.data.wall
        this.templateId = response.data.templateId
      })
    },
    toRoute(url) {
      this.$router.push("/pages/home/storeMgr/" + url);
    },
    pageTo(url) {
      this.$router.push({path: url, query: {remark: this.remark}})
    },
    chooseImg() {
      const self = this;
      wx.chooseImage({
        count: 1,
        success: function(file) {
          console.log(file);
          self.img = file.tempFilePaths[0]
          uploadImg(file.tempFilePaths[0], function(url) {
            self.img = url;
          });
          // let tempFilePaths = file.tempFilePaths
          // wx.uploadFile({
          //   url: config.url,
          //   filePath: tempFilePaths[0],
          //   name: "shopLogo",
          //
          // })
        }
      });
    },
    bindRegionChange(e) {
      console.log(e);
      this.region = e.mp.detail.value;
        console.log(this.region);
    },
    async btn() {
      console.log("++++++++++++++++++++++");
      console.log(this.name.split(''));
      if(this.name.split('').length > 10) {
        wx.showToast({
          title: '店铺名称最多10个字符!',
          icon: 'none'
        })
      }else {
        const warehouse = await this.$API.warehouse({
          name: this.name,
          companyName: this.companyName,
          address: this.address,
          head: this.img,
          wall: this.FMimg,
          remark: this.remark,
          sheng: this.region[0],
          shi: this.region[1],
          qu: this.region[2]
        });
        if (warehouse.code == 1) {
          wx.showToast({
            title: "成功",
            icon: "success",
            duration: 2000
          });
          this.$router.back(-1)
        }
      }
    }
  },
  onShow() {
    var that = this;
    // wx.getStorage({
    //   key: "FMimg",
    //   success: function(res) {
    //     console.log(res.data);
    //     that.FMimg = res.data;
    //   }
    // });
    const FMimg = wx.getStorageSync('FMimg');
    if (FMimg) {
      this.FMimg = FMimg;
      wx.removeStorageSync('FMimg');
    }
    wx.getStorage({
      key: "remark",
      success: function(res) {
        console.log(res.data);
        that.remark = res.data;
      }
    });
  },
  mounted() {
    this.selectWarehouse();
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  color: #000
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
  .input
    height: 100%
    padding-right: 8px
  .blur
    flex: 1
    overflow: hidden
    color: #999
    font-size: 28px
    text-align: right
  .input_text
    flex: 1
    overflow: hidden
    height: 68px
    line-height: 108px
    padding: 20px
    text-align: right
.user-img
  height: 142px
  line-height: 142px
  text-align: left
  position: relative
  padding: 0px 24px
  margin: 20px 0
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
  .upload
    +circle(120px)
    background: #f3f2f3
    line-height: 104px
    +center
    right: 24px

.footer
  position: absolute
  bottom: 80px
  left: 0
  right: 0
  p
    padding: 0 75px
</style>
