<template>
  <div class="home">
    <div class="content">{{content}}</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      content: ''
    };
  },
  methods: {},
  mounted() {
    if(this.$route.query.content) {
      this.content = this.$route.query.content
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
