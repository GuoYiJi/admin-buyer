<template>
  <div class="home">
    <div class="top">
      <image src="http://hd.wallpaperswide.com/thumbs/european_architecture-t2.jpg" mode="aspectFit" />
    </div>
    <div class="center">
      <div class="title_box" v-for="(item, index) in myArticleList" :key="index">
        <i class="icon" :style="{backgroundColor: colorList[index]}"></i>
        <p class="t_name">{{item.name}}</p>
        <div class="line">
          <div class="content" v-for="(title, titleIndex) in item.articleList" :key="titleIndex" @click="toRoute(title.content)">
            <p class="title">{{title.title}}</p>
            <p class="toin"><i class="goin"></i></p>
          </div>
        </div>
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
      myArticleList: [],
      colorList: ['#ed6a5a', '#f4f1bb', '#9bc1bc', '#5ca4a9', '#e6ebe0','#ed6a5a', '#f4f1bb', '#9bc1bc', '#5ca4a9', '#e6ebe0', '#ed6a5a', '#f4f1bb', '#9bc1bc', '#5ca4a9']
    };
  },
  methods: {
    toRoute(content) {
      this.$router.push({
        path: "/pages/my/newPoint/pointDetail",
        query: { content }
      });
    }
  },

  async mounted() {
    var myArticle = await this.$API.myArticle({ type: 0 });
    this.myArticleList = myArticle.data;
    console.log(myArticle.data);
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  height: 100%
  background: #fff
.top
  padding: 30px
  image
    width: 100%
    background-color: #ffffff
.center
  padding: 0 30px
  color: #333
  .title_box
    position: relative
    .t_name
      height: 80px
      line-height: 80px
      padding-left: 40px
    .icon
      display: inline-block
      height: 44px
      width: 20px
      position: absolute
      top: 20px
      left: 5px

.line
  padding: 0 24px
  background: #fff
  +border(1px,bottom,#CCC)
  .content
    display: flex
    justify-content: space-between
    height: 90px
    line-height: 90px
    color: #333
  .title
    font-size: 28px
    padding-left: 20px
  .toin
    color: #999
    // font-size: .38rem
    // padding-right: 15px
  .goin
    +goback(1px)
    vertical-align: baseline
    &:after
      transform: rotate(225deg)
      border-color: #999
</style>
