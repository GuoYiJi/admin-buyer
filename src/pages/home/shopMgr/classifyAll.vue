<template>
  <div class="home">
    <div class="single_box">
      <div v-for="(item,index) in singleSelect" :key="index" @click="selectOne(item.id)">
        <div class="line" >
          <p><i class="select" :class="selId == item.id && 'active'"></i>{{item.name}}</p>
        </div>
      </div>
    </div>
    
    <div class="create">
      <p @click="goback"><btn :title="'保存'" /></p>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import btn from "@/components/btn.vue";
// import line from '@/components/lineSelect'
import mixin from "@/mixin.js";
import { $getUrl } from "@/utils";
export default {
  mixins: [mixin],
  components: {
    btn
    // line
  },
  // computed: {
  //   hasSelectId (id){
  //     if(this.selectId){
  //       const arr = this.selectId.split(',')
  //       if(arr.indexOf(id) > 0 ){
  //         console.log('ture')
  //         return 'active'
  //       }
  //     }
  //     return false

  //   }
  // },
  data() {
    return {
      singleSelect: [],
      selId: ''
    };
  },
  methods: {
    async goback() {
      await this.$API.editGroups({
        goodsIds: this.$route.query.ids,
        groupId: this.selId,
      })
      this.$router.push({path: "/" + $getUrl(),query: {groups: this.selectId}});
      // this.$router.go(-1)
    },
    selectOne(id){
      this.selId = id
    }
  },
  async mounted() {
    const { data } = await this.$API.searchType({
      types: "0,1"
    });
    this.singleSelect = data;
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.create
  position: fixed
  bottom: 0
  left: 0 
  right: 0
  padding: 80px 75px
  // background: #fff
.single_box
  p
    margin-top: 10px
// .select
//   +select()
//   left: 24px
// .active
//   +select-active  
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