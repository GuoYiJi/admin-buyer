<template>
  <div class="home">
    <div class="search-box" >
      <div class="input">
        <p class="search-icon"><i class="search"></i></p>
        <input class="input-box" v-model="keyword" placeholder="请输入您要搜索的内容"  />
        <p class="confirm" @click="keywordBut">确认</p>
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
      keyword: '',
    };
  },
  methods: {
    async keywordBut(){
      let id = this.$route.query.id
      console.log(id)
      //2代表采购管理搜索
      if(id == 2){
        const L_selectAddressData = await this.$API.L_OrderAddress({
          //1 时间j 2时间s 3pinyin s 4pinyin j 5价格s
          keyword: this.keyword, 
          orderType: 1, 
        });
        console.log(L_selectAddressData)

      }else{
        const L_selectOrder = await this.$API.L_selectOrderPage({
          //1 时间j 2时间s 3pinyin s 4pinyin j 5价格s
          keyword: this.keyword, 
          orderType: 1, 
        });
        console.log(L_selectOrder)

      }
    }
  },
  mounted() {}
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.confirm
  line-height: 60px
  padding-left: 20px
  width: 15%!important
.search-box
  padding: 30px 0
  background: #fff
  .input
    display: flex
    padding: 0px 35px
    p
      width: 10%
      .search
        +bg-img('home/search.png')
        +icon(38px)
        margin-top: 7px  
    .search-icon
      position: absolute
      left: 60px 
    .input-box
      background-color: #f5f5f5
      border-radius: 4px
      width: 80%
      text-align: left
      padding: 8px 85px
      border: none
      color: #999999

    
</style>