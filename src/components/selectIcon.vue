<template>
  <div class="select-icon-wrapper">
    <i class="select-icon" :class="{'active' : isSelected}"></i>
  </div>
</template>

<script>
  export default {
    props: {
      isSelected: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isSelected(current, old) {
        console.log(current, old);
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '~@/assets/css/mixin'
  .select-icon-wrapper
    display: inline-block
    i.select-icon
      display: inline-block
      width: 30px
      height: 30px
      border-radius: 50%
      border: 1px solid #CCCCCC
      margin-right: 10px
      &.active
        background: url("~@/assets/img/storeMgr/select.png") no-repeat center
        background-size: 100% 100%
</style>
