<template>
<div class="home">
  <div class="user-img" @click="chooseImg">
    <p class="name">从手机相册中选择</p>
    <img class="upload" :src="img" />
    <i class="goback"></i>
  </div>
  <div class="content">
    <p class="title">从素材中选取</p>
    <div class="img_box">
      <div class="imgItem_box" v-for="(material, materialIndex) in materialList" :key="materialIndex" @click="setWall(material.image, materialIndex)">
        <i class="img" :style="{backgroundImage: 'url('+ material.image  +')'}">
          <span class="using" v-if="materialIndex === index">正在使用</span>
        </i>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import wx from "wx";
import mixin from "@/mixin";
import uploadImg from "@/plugins/uploadImg";
export default {
  mixins: [mixin],
  components: {},
  data() {
    return {
      index: -1,
      img: "",
      materialList: [],
      // usedWall: ''
    };
  },
  methods: {
    setWall(image, index) {
      this.$API.warehouse({
        wall: image
      }).then(response => {
        this.index = index
        this.img = image
        wx.setStorageSync('FMimg', image);
        wx.showToast({
          title: '已设置封面',
          icon: 'success'
        })
      })
    },
    chooseImg() {
      const self = this;
      wx.showLoading({
        title: '上传中'
      })
      wx.chooseImage({
        count: 1,
        success: function(file) {
          console.log(file);
          // self.img = file.tempFilePaths[0];
          uploadImg(file.tempFilePaths[0], function(url) {
            self.img = url;
            // console.log(self.img);
            self.$API.warehouse({
              wall: self.img
            }).then(response => {
              wx.setStorageSync('FMimg', self.img);
              self.index = -1
              wx.showToast({
                title: '已设置封面',
                icon: 'success'
              })
            })
          });
          wx.hideLoading();
        },
        fail: res => {
          wx.hideLoading();
        }
      });
    },
    uploadImg(tempFilePath, callback) {
      var that = this;
      var location = tempFilePath.lastIndexOf('/') + 1;
      wx.uploadFile({
        url: config.uploadImageUrl,
        filePath: tempFilePath,
        name: "file",
        formData: {
          name: tempFilePath.slice(location).toString(),
          key: "img/${filename}",
          policy: config.imgPolicy,
          OSSAccessKeyId: config.OSSAccessKeyId,
          success_action_status: "200",
          signature: config.imgSignature
        },
        success: function(res) {
          console.log(res);
          if (res.statusCode == 400) {
            that.handleError("上传的图片大小不能超过2m!");
          }
          callback(
            config.uploadImageUrl + "/img" + tempFilePath.slice(location).toString()
          );
        },
        fail: function(err) {
          console.log(err);
        }
      })
    }
  },
  mounted() {
    // this.getExpress()
    this.$API.selectWarehouse().then(response => {
      // this.usedWall = response.data.wall
      this.img = response.data.wall

      this.$API.s_getImg({
        type: 4
      }).then(response => {
        console.log(response);
        this.materialList = response.data
        this.materialList.forEach((item, index) => {
          if(item.image == this.img) {
            console.log("找到相同的封面了", index);
            this.index = index
            return
          }
        })
      })
    })
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.content
  padding: 40px 24px
  background: #fff
  .img_box
    width: 100%
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    .imgItem_box
      margin-top: 30px
      flex: 0 0 33.3%
      display: flex
      justify-content: center
      align-items: center
      i.img
        display: inline-block
        +icon(220px)
        background-position: center
        background-repeat: no-repeat
        background-size: 100% 100%
        position: relative
        span.using
          width: 100%
          position: absolute
          left: 0
          right: 0
          bottom: 0
          background-color: rgba(0, 0, 0, 0.3)
          color: #ffffff
          font-size: 26px
          text-align: center
.goback
  +goback(2px)
  +center
  right: 24px
.user-img
  height: 110px
  line-height: 110px
  text-align: left
  position: relative
  padding: 0px 24px
  margin: 20px 0
  background: #fff
  .name
    float: left
    width: 450px
  .upload
    +icon(80px)
    +center
    right: 77px

</style>
