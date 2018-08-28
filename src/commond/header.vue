<template>
  <div class="header">
    <a href="/pages/home/home" class="goback" ></a>
    <p>{{title}}</p>
  </div>
</template>
<script>
export default {
  methods:{
  
  },
  props:{
    title: {
      type: String,
      default: '请传入title'
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin.sass'
.header
  background-image: linear-gradient(90deg, 
		#01367d 0%, 
		#2a70cb 100%)
  height: 1.2rem
  +border(1px,bottom)
  position: relative
  line-height: 1.2rem
  color: #fff
  letter-spacing: 2px
  z-index: 99
  width: 100%
  font-size: .42rem
  p 
    width: 100%
    // font-size: $title-size
  .goback:after
    content: ''
    display: block
    position: absolute
    left: .5rem
    top: 50%
    width: .25rem
    height: .25rem
    -webkit-transform: translateY(-50%) rotate(45deg)
    transform: translateY(-50%) rotate(45deg)
    border-left: .04rem solid #fff
    border-bottom: .04rem solid #fff
</style>