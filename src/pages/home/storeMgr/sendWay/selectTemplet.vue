<template>
  <div class="home">
    <scroll-view scroll-y="true" style="height: 80% " >
      <div class="content">
        <div class="adr-card" @click="selectAct(item.id)"  v-for="(item,idxx) in areaIdAll" :key="idxx">
            <div class="user">
              <p class="name">{{item.name}}</p>
            </div>
            <div class="adr">
              <i class="select" :class="[templateId == item.id && 'active'] " ></i>
              <p class="adr-text" v-for="(itemzz,indexzz) in item.area" :key="indexzz" v-if="item.more || indexzz < 3">
              {{itemzz.areaName}}首件{{itemzz.firstPrice}}元，续件{{itemzz.secondPrice}}元/件</p>
              <div v-if="!item.more" @click.stop="handleMoreClick(idxx)">查看更多</div>
              <div v-else @click.stop="handleMoreClick(idxx)">收起</div>
            </div>
        </div>
      </div>
    </scroll-view>
    <p class="bottom"></p>
    <p class="save" @click="saveBut">保存</p>
    <i-toast id="toast" />
  </div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      areaIdAll: [],
      templateId: '',
      areazz: [],
      value1: 1,
      clickToggle: false
    };
  },
  methods: {
    handleMoreClick(index) {
      this.$set(this.areaIdAll[index], 'more', !this.areaIdAll[index].more);
    },
    selectAct(id){
      this.clickToggle = !this.clickToggle
      if(this.clickToggle) {
        this.templateId = id
      }else {
        this.templateId = ''
      }

    },
    saveBut(){
      // this.$router.push( {path:'/pages/home/storeMgr/sendWay/sendWay', query:{templateId: this.templateId}})
      if(!this.templateId) {
        this.$Toast({
          content: '您还未选择',
          type: 'warning'
        })
      }else {
        this.$API.L_changeExpress({
          templateId: this.templateId
        }).then(response => {
          wx.setStorageSync('templateId', this.templateId)
          this.$router.back(-1)
        })
      }
    }
  },
  async mounted() {
    if(wx.getStorageSync('templateId')) {
      this.templateId = wx.getStorageSync('templateId')
    }
    //L_findFreight
    const L_findFreightData = await this.$API.L_findFreight({
    });
    this.areaIdAll = L_findFreightData.data
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.content
  padding-bottom: 100px
.save
  position: fixed
  bottom: 0
  left: 0
  right: 0
  z-index: 10;
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
