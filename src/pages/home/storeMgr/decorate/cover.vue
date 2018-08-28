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
        <img class="item" src="http://tmp/wxaf3800e911f44ce8.o6zAJsw6UUglter4WJtUD5Ha22z8.OI4B2w9dGCjS427af64e1a1a25ccf27039437c8ebe10.png" @click="toRoute('home/storeMgr/decorate/viewCover',{img: 'http://tmp/wxaf3800e911f44ce8.o6zAJsw6UUglter4WJtUD5Ha22z8.OI4B2w9dGCjS427af64e1a1a25ccf27039437c8ebe10.png'})" />
        <img class="item" src="https://img.yzcdn.cn/2.jpg" />
        <img class="item" src="https://img.yzcdn.cn/2.jpg" />
        <img class="item" src="https://img.yzcdn.cn/2.jpg" />
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import mixin from "@/mixin";
export default {
  mixins: [mixin],
  components: {},
  data() {
    return {
      img: ""
    };
  },
  methods: {
    // toRoute(file){
    //   this.$router.push('/pages/home/storeMgr/' + file)
    // },
    chooseImg() {
      const self = this;
      wx.chooseImage({
        count: 1,
        success: function(file) {
          console.log(file);
          self.img = file.tempFilePaths[0];
          wx.setStorage({
            key: "FMimg",
            data: file.tempFilePaths[0]
          });
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.content
  padding: 40px 24px
  background: #fff
  .img_box
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    .item
      +icon(220px)
      margin-top: 30px

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
