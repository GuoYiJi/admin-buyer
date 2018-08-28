<template>
<div>
  <div class="loadings" >
    <p class="line"></p>  
    <p class="line"></p>  
    <p class="line"></p>  
    <p class="line"></p>  
    <p class="line"></p>
  </div>
</div>
  
</template>
<script>
export default {
  data() {
    return {
      // show: true
    };
  }
  // props: {
  //   showLoad: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin.sass'
.loadings        
  display: flex
  justify-content: center  
  height: 70px
  .line
    margin: 0 5px
    height: 100%
    width: 3px
    background: lightgreen 
    animation: load 1s ease infinite
     	

  
@keyframes load  
	0%,100%  
		height: 40px   
		background: lightgreen  
	50%  
		height: 60px  
		margin: -4px 0   
		background: lightblue   
	  
   
.loadings p:nth-child(2)  
  -webkit-animation-delay: 0.2s   
   
.loadings p:nth-child(3)   
  -webkit-animation-delay: 0.3s   
   
.loadings p:nth-child(4)  
  -webkit-animation-delay: 0.5s 
  
.loadings p:nth-child(5)   
  -webkit-animation-delay: 0.7s  
   
  
</style>