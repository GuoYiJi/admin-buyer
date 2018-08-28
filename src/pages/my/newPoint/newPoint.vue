<template>
  <div class="home">
    <div class="top">
      <p class="t_img"><img src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg" /></p>
    </div>
    <div class="center">
      <div class="title_box" v-for="(item,index) in myArticleList" :key="index">
        <i class="icon"></i>
        <p class="t_name">{{item.name}}</p>
        <div class="line" @click="toRoute(item.id)">
          <div class="content">
            <p class="title"><i class="icon my1"></i>新手指南</p>
            <p class="toin"><i class="goin"></i></p>
          </div>
        </div>
        <!-- <div class="line" @click="toRoute('my/newPoint/pointDetail')">
          <div class="content">
            <p class="title"><i class="icon my1"></i>新手指南</p>
            <p class="toin"><i class="goin"></i></p>
          </div>
        </div> -->
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
      myArticleList: []
    };
  },
  methods: {
    toRoute(id) {
      console.log(id);
      this.$router.push({
        path: "/pages/my/newPoint/pointDetail",
        query: { id: id }
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
  .t_img
    height: 300px
.center
  padding: 0 30px
  color: #333
  position: relative
  .t_name
    height: 80px
    line-height: 80px
    position: relative
    padding-left: 40px
  .icon
    background: #FF648A
    display: inline-block
    height: 44px
    width: 20px
    position: absolute
    top: 20px
    left: 30px

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