<template>
  <div class="home">
    <!-- 做到店铺模板预览，无从下手，跳过 -->
    <p class="title">{{myArticleList.title}}</p>
    <div class="content">{{myArticleList.content}}</div>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return { myArticleList: [] };
  },
  methods: {},
  async mounted() {
    var myArticle = await this.$API.myArticle({ type: 0 });
    this.myArticleList = myArticle.data;
    for (var i = 0; i < myArticle.data.length; i++) {
      if (myArticle.data[i].articleList[i].id == this.$mp.query.id) {
        console.log(myArticle.data[i].articleList[i].id);
        this.myArticleList = myArticle.data[i].articleList[i];
      }
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.title
  display: inline-block
  text-align: center
  width: 100%
.content
  width: 100%
  margin: 10px

</style>