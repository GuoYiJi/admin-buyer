<template>
  <div class="home">
    <div class="content">
      <rich-text :nodes="nodes"></rich-text>
    </div>
  </div>
</template>
<script>
import HtmlToJson from '@/plugins/wxParse/html2json.js';
export default {
  components: {},
  data() {
    return {
      content: '',
      nodes: []
    };
  },
  methods: {},
  mounted() {
    const content = wx.getStorageSync('pointDetailData');
    if(content) {
      this.nodes = HtmlToJson.html2json(content).children;
      this.content = content
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
  padding: 10px
  font-size: 26px
  color: #333
  text-indent: 50px
</style>
