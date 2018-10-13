<template>
  <div class="add_video">
    <div v-if="src" class="add">
      <p><video :src="src" show-play-btn="false" objectFit="fill"  controls="false" ></video></p>
      <!-- <i class="cancel_shop" @click="toCancel()"></i> -->
      <!-- <p class="show_pro"><progress percent="20" show-info /></p> -->
    </div>
    <div class="add">
      <div ><p @tap="bindButtonTap">+视频</p></div>
    </div>

    <!-- <i-message id="message" /> -->
  </div>
</template>
<script>
// import upload from '@/plugins/uploadAliyun.js'
import config from "@/config";
import mixin from '@/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      src: ""
    };
  },
  methods: {
    bindButtonTap() {
      wx.showLoading();
      console.log(111)
      var that = this;
      wx.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: ["front", "back"],
        success: function(res) {
          console.log(res);
          var tempFilePath = res.tempFilePath;
          wx.uploadFile({
            url: config.uploadImageUrl,
            filePath: tempFilePath,
            name: "file",
            formData: {
              name: tempFilePath,
              key: "video/${filename}",
              policy: config.videoPolicy,
              OSSAccessKeyId: config.OSSAccessKeyId,
              success_action_status: "200",
              signature: config.videoSignature
            },
            success: function(res) {
              console.log(res);
              if (res.statusCode == 400) {
                that.handleError("上传的视频大小不能超过20m!");
              } else if (res.statusCode == 200) {
                that.src = config.uploadImageUrl + "/video" + tempFilePath.substring(10);
                that.emitSub();
              }
            },
            fail: (err)=>{
              this.handleError('上传失败，错误原因： '+err.errMsg)
              console.log(err)
            }
          });
          // that.src =
          // setTimeout(()=>{
          //   that.src = config.uploadImageUrl + '/video' + tempFilePath.substring(10)
          //   console.log(that.src)
          // },3000)
          // that.src = res.tempFilePath
        },
        fail: (err)=>{
          this.handleError('上传失败，错误原因： '+err.errMsg)
          console.log(err)
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    },
    emitSub() {
      // 必须通过该方法将url传递给服组件接收
      console.log(this.src)
      this.$emit("getVideo", this.src);
    }
  },
  props: {
    videoStr: {
      type: String
    }
  },
  mounted(){
    this.src = this.videoStr
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.add
  background: #EAEAEA
  position: relative
  +icon(200px)
  line-height: 200px
  text-align: center
  margin-right: 20px
  video
    +icon(200px)
.show_pro
  +center
  width: 200px


</style>
