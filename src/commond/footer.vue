<template lang="html">
  <div id="container">
    <a href="/pages/home/home" class="bar" :class="[tag == 1 && 'active' ]">
      <i class="icon icon1"></i>
      <p>1</p>
    </a>
    <a href="/pages/home/home" class="bar" :class="[tag == 2 && 'active' ]">
      <i class="icon icon2"></i>
      <p>2</p>
    </a>
    <a href="/pages/home/home" class="bar" :class="[tag == 3 && 'active' ]">
      <i class="icon icon3"></i>
      <p>3</p>
    </a>
    <a href="/pages/home/home" class="bar" :class="[tag == 4 && 'active' ]">
      <i class="icon icon4"></i>
      <p>3</p>
    </a>
    <a href="/pages/home/home" class="bar" :class="[tag == 5 && 'active' ]">
      <i class="icon icon5"></i>
      <p>4</p>
    </a>
  </div>
</template>
<script>

export default {
  props: {
    tag: {
      types: Number,
      default: 1
    }
  },

}
</script>

<style lang="sass" scoped>
  @import '~@/assets/css/mixin.sass'
  @mixin icon 
    margin: 0 auto
    text-align: center
    display: block
    // width: .6rem
    // height: .6rem
    background-size: 100%
  @mixin bg-size 
    background-size: 100%
    //高亮字体颜色
  @mixin color  
    color: $main-color
  #container
    padding: 2px 0
    position: fixed
    left: 0
    right: 0
    bottom: 0
    display: flex
    flex-wrap: wrap  
    font-size: .55em
    color: #afc1d7
    border-top: 1px solid $border-color  
    background: #0c274b!important
    z-index: 999999
    text-align: center
    a
      color: #afc1d7
    .active
      color: #fff!important
    .bar
      flex: 1
      padding-top: 5px
      // padding-bottom: 5px;/*no*/
      i
        width: 18px
        height: 18px
      .icon1
        +bg-img('home/footer11.png')
      .icon2
        +bg-img('home/footer2.png')
      .icon3
        +bg-img('home/footer3.png')
      .icon4
        +bg-img('home/footer4.png')
      .icon5
        +bg-img('home/footer5.png')
      .icon
        +icon 
      &.active .icon1
        +bg-img('home/footer11.png')
        +bg-size
      // &.active .icon2
      //   +bg-img('home/apply1.png')
      //   +bg-size
      // &.active .icon3
      //   +bg-img('home/command1.png')
      //   +bg-size
      // &.active .icon4
      //   +bg-img('home/shop1.png')
      //   +bg-size
      // &.active .icon5
      //   +bg-img('home/user1.png')
      //   +bg-size
        
</style>


