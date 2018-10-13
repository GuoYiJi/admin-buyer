<template>
  <button :class="cla" class="btn">{{title}}</button>
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      default: '请绑定：title'
    },
    cla: {
      type: String,
      default: 'formal-btn'
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.btn
  // background: #9F9F9F
  width: 100%
  height: 90px
  line-height: 90px
  border-radius: 8px
  color: $main-color
  letter-spacing: 1px
  font-size: 32px
  font-family: PingFang-SC-Bold

.formal-btn
  color: #fff
  background: #F67C2F
</style>