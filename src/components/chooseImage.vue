<template>
  <div class="add_image">
    <div v-for="(item, index) in imgList" :key="index" class="add">
      <img :src="item" />
      <i class="cancel_shop" @click="toCancel(index)"></i>
    </div>
    <div class="addBtn" @tap="bindButtonTap">
      <p>+图片</p>
    </div>
    <i-message id="message" />
  </div>
</template>
<script>
// import upload from '@/plugins/uploadAliyun.js'
import config from "@/config";
export default {
  data() {
    return {
      src: "",
      imgList: [
        // 'https://huiti-img.oss-cn-shanghai.aliyuncs.com/images/c15%402x.png',
        // 'https://huiti-img.oss-cn-shanghai.aliyuncs.com/images/c15%402x.png',
        // 'https://huiti-img.oss-cn-shanghai.aliyuncs.com/images/c15%402x.png',
        // 'https://huiti-img.oss-cn-shanghai.aliyuncs.com/images/c15%402x.png'
      ]
      // imgFiles: [],
    };
  },
  props: {
    uploadNum: {
      type: Number,
      default: 1
    },
    maxNum: {
      type: Number,
      default: ''
    },
    imgStr: {
      type: String,

    }
  },
  methods: {
    bindButtonTap() {
      const maxNum = this.maxNum;
      wx.showLoading({
        // title: '加载中',
      });
      var that = this;
      if ( maxNum && this.imgList.length >= maxNum) {
        this.handleError(`不能超过${maxNum}张图片噢！`);
        wx.hideLoading();
        return;
      }
      wx.chooseImage({
        sizeType: "original",
        count: this.uploadNum,
        success: function(res) {
          console.log(res);
          var tempFilePath = res.tempFilePaths;

          console.log(tempFilePath);
          for (var i = 0, l; (l = tempFilePath[i++]); ) {
            that.uploadImg(l);
          }
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    },
    handleError(msg) {
      this.$Message({
        content: msg,
        type: "error"
      });
    },
    toCancel(start) {
      this.imgList.splice(start, 1);
      this.$emit('changeImg',this.imgList)
    },
    uploadImg(tempFilePath) {
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
            if(that.maxNum && that.imgList.length >= that.maxNum){
              that.handleError('不能超过15张图片噢！')
              return
            }
            that.imgList.push(
              config.uploadImageUrl + "/img" + tempFilePath.substring(10)
            );
            that.$emit('getImg', config.uploadImageUrl + "/img" + tempFilePath.substring(10))
          }
        },
        fail: function(err) {
          console.log(err);
        }
      });
    }
  },
  mounted(){
    console.log(this.imgStr)
    if(this.imgStr){
      const imgArr = this.imgStr.split(',')

      this.imgList = imgArr
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.add_image
  width: 100%
  display: flex
  flex-wrap: wrap
  .add,.addBtn
    display: inline-block
    width: 200px
    height: 200px
    margin-right: 10px
    background-position: center
    background-repeat: no-repeat
    background-size: 100% 100%
  .addBtn
    background-color: #EAEAEA
    display: flex
    align-items: center
    justify-content: center
    font-size: 28px
  .add
    position: relative
    .cancel_shop
      position: absolute
      top: 10px
      right: 10px
      width: 50px
      height: 50px
      border-radius: 50%
      background: url("~@/assets/img/shopMgr/cancel.png") no-repeat center
      background-size: 100% 100%
</style>
