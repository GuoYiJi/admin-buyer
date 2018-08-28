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
        <p class="blur">未设置</p>
      </div>
      <div class="line" @click="toRoute('decorate/intro')">
        <!-- <i class="i_s4 i-icon"></i> -->
        <p class="input">店铺简介</p>
        <p class="blur">未设置</p>
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
          <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
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
import wx from "wx";
import btn from "@/components/btn.vue";
import config from "@/config";
import uploadImg from "@/plugins/uploadImg";
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
      region: [],
      customItem: "全部"
    };
  },
  methods: {
    toRoute(file) {
      this.$router.push("/pages/home/storeMgr/" + file);
    },
    chooseImg() {
      const self = this;
      wx.chooseImage({
        count: 1,
        success: function(file) {
          console.log(file);
          // self.img = file.tempFilePaths[0]
          uploadImg(file.tempFilePaths[0], function(url) {
            self.img = url;
          });
        }
      });
    },
    bindRegionChange(e) {
      console.log(e);
      this.region = e.mp.detail.value;
      console.log(this.region);
    },
    async btn() {
      console.log(this);
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
      console.log(warehouse);
    },
    uploadImg(tempFilePath, callback) {
      var that = this;
      wx.uploadFile({
        url: config.uploadImageUrl,
        filePath: tempFilePath,
        name: "file",
        formData: {
          name: tempFilePath.substring(10),
          key: "img/${filename}",
          policy: config.imgPolicy,
          OSSAccessKeyId: "6MKOqxGiGU4AUk44",
          success_action_status: "200",
          signature: config.imgSignature
        },
        success: function(res) {
          console.log(res);
          if (res.statusCode == 400) {
            that.handleError("上传的图片大小不能超过2m!");
          } else if (res.statusCode == 200) {
            if (that.maxNum && that.imgList.length >= that.maxNum) {
              that.handleError("不能超过15张图片噢！");
              return;
            }
            callback(
              config.uploadImageUrl + "/img" + tempFilePath.substring(10)
            );
          }
        },
        fail: function(err) {
          console.log(err);
        }
      });
    }
  },
  onShow() {
    var that = this;
    wx.getStorage({
      key: "FMimg",
      success: function(res) {
        console.log(res.data);
        that.FMimg = res.data;
      }
    });
    wx.getStorage({
      key: "remark",
      success: function(res) {
        console.log(res.data);
        that.remark = res.data;
      }
    });
  },
  mounted() {
    this.name = "";
    this.companyName = "";
    this.address = "";
    this.region = [];
    console.log(this);
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
  position: relative
  .input
    height: 100%
    padding-right: 8px
  .blur
    color: #999
    font-size: 28px
    +center
    right: 0
    width: 100%
    text-align: right
  .input_text
    height: 68px
    line-height: 108px
    padding: 20px
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
