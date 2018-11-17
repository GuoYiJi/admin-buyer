<template>
  <div class="home">
    <p class="title">选择一个适合你的装修风格</p>
    <div class="tmp_box">
      <div class="t_img" v-for="(template, index) in templateList" :key="template.id">
        <img :src="template.image" />
        <span class="use_btn">
          <button :class="[index === 0 ? 'using' : '']" @click="handleChange(template.id)">{{index === 0 ? '正在使用' : '使用此模板'}}</button>
        </span>
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
      templateList: []
    };
  },
  methods: {
    async handleChange(id) {
      await this.$API.changeStyle({
        styleId: id
      });
      this.getImgTemplate();
    },
    getImgTemplate() {
      wx.showLoading({
        title: '加载中'
      })
      this.$API.getHomeStyle({
        pageNumber: 1,
        pageSize: 20
      })
        .then(res => {
          const { data: { list } } = res;
          this.templateList = list;
        })
        .finally(() => {
          wx.hideLoading();
        })
    }
  },
  mounted() {
    this.getImgTemplate();
  },
  onUnload() {
    Object.assign(this, this.$options.data());
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.title
  padding: 40px 23px
  text-align: center
  font-size: 32px
  font-weight: 600
.tmp_box
  width: 100%
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  .t_img
    width: 45%
    display: flex
    flex-wrap: wrap
    justify-content: center
    overflow: hidden
    margin-bottom: 20px
    img
      width: 286px
      height: 344px
      border: 1px solid #cccccc
      margin-bottom: 20px
      border-radius: 4px
  .use_btn
    width: 100%
    button
      width: 220px
      height: 70px
      font-size: 26px
      text-align: center
      line-height: 70px
      border-radius: 35px
      color: #fff
      margin: 0 auto
      background-color: #F67C2F
    button.using
      background-color: #cccccc
</style>
