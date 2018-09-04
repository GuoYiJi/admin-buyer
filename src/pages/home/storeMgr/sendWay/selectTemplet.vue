<template>
  <div class="home">
    <scroll-view scroll-y="true" style="height: 80% " >
      <div class="content">
        <div class="adr-card" @click="selectAct(item.id,item)"  v-for="(item,idxx) in areaIdAll" :key="idxx">
            <div class="user">
              <p class="name">{{item.name}}</p>
            </div>
            <div class="adr">
              <i class="select" :class="[select == item.id && 'active'] " ></i>
              <p class="adr-text" v-for="(itemzz,indexzz) in item.area" :key="indexzz">运送到{{itemzz.areaName}}；售件{{itemzz.firstPirce}}kg，运费{{itemzz.secondPrice}}元</p>
            </div>
        </div>
      </div>
    </scroll-view>
    <p class="bottom"></p>
    <p class="save" @click="saveBut">保存</p>
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      select: '',
      areaIdAll: [],
      templateId: '',
      areazz: [],
      value1: 1,


    };
  },
  methods: {
    selectAct(id,item){
      this.select = id
      console.log(item.area)
      console.log(id)
      for(var i=0;i<item.area.length;i++){
        console.log(item.area[i].templateId)
        this.templateId = item.area[i].templateId
        wx.setStorageSync('templateId',this.templateId)
      }
    },
    saveBut(){
      this.$router.push( {path:'/pages/home/storeMgr/sendWay/sendWay', query:{templateId: this.templateId}})
    }
  },
  async mounted() {
    //L_findFreight
      const L_findFreightData = await this.$API.L_findFreight({

      });
      console.log(L_findFreightData)
      this.areaIdAll = L_findFreightData.data


  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.content
  padding-bottom: 100px
.save
  // position: absolute
  bottom: 0
  left: 0
  right: 0
  color: #fff
  background: #F67C2F
  height: 98px
  line-height: 98px
  text-align: center
  letter-spacing: 1px
.adr-card
  padding: 38px 75px 38px 90px
  margin-bottom: 10px
  position: relative
  background: #fff
  .user
    color: #000
    padding-bottom: 20px
  .adr
    color: #666
    font-size: 27px
    position: relative
  .select
    +select(40px)
    left: -65px
    top: 10px
  .active
    +select-active
    
</style>