<template>
  <div class="line" >
    <p><i class="select" :class="select && 'active'"></i>{{title}}</p>
  </div>
</template>
<script>
export default {
  data(){
    // return {
    //   select: false
    // } 
  },
  props: {
    title: {
      type: String,
      default: '请输入title'
    },
    select: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // switchTag(name){
    //   this[name] = !this[name]
    // }
  }

}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.line
  height: 109px
  line-height: 109px
  position: relative
  background: #fff
  padding-left: 84px
.select
  +select()
  left: 24px
.active
  +select-active  
</style>

