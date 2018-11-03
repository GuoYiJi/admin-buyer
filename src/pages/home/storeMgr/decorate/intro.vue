<template>
  <div class="home">
    <textarea class="text" v-model="text" placeholder="请输入简介"></textarea>
    <div class="footer">
      <p @click="btn">
        <btn :title="'保存'" />
      </p>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import btn from "@/components/btn.vue";
export default {
  components: {
    btn
  },
  data() {
    return {
      text: ""
    };
  },
  methods: {
    btn() {
      wx.setStorage({
        key: "remark",
        data: this.text
      });
      setTimeout(() => {
        wx.navigateBack({
          data: 1
        });
      }, 300);
    }
  },
  mounted() {
    console.log(this.$route.query.remark);
    if(this.$route.query.remark) {
      this.text = this.$route.query.remark
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.text
  width: 100%
  height: 160px
  padding: 20px 24px
  background: #fff
.footer
  position: absolute
  bottom: 80px
  left: 0
  right: 0
  p
    padding: 0 75px
</style>
