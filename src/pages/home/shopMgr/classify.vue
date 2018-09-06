<template>
  <div class="home">
    <div class="single_box">
      <div v-for="(item,index) in singleSelect" :key="index" @click="selectOne(item)">
        <div class="line" >
          <p><i class="select" :class="item.select && 'active'"></i>{{item.name}}</p>
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
      selectId: "",
      selectText: '',
    };
  },
  methods: {
    selectOne(obj) {
      // for(var i=0,l; l = this.singleSelect[i++];){
      //   if(l.select) l.select = false
      // }
      obj.select = !obj.select
      if(obj.select){
        this.selectId += "," + obj.id;
        this.selectText += obj.name + ','
      }else {
        this.selectId = this.selectId.replace(','+ obj.id , '')
        this.selectText = this.selectText.replace(obj.name + ',', '')
      }
      console.log(this.selectId)
    },
    async goback() {

      if(this.$route.query.goodsIds) {
        //edit group
        await this.$API.editGroup({
          goodsId: this.$route.query.goodsIds,
          groupIds: this.selectId
        })

      } else {
        //addshop
        //set group to vuex
        this.$store.commit('ADDSHOPGROUP', {
          groupIds: this.selectId,
          groupText: this.selectText
        })
      }


      this.$router.back(-1)
      // this.$router.push({path: "/" + $getUrl(),query: {groups: this.selectId}});
      // this.$router.go(-1)
    }
  },
  async mounted() {
    const { data } = await this.$API.searchType({
      types: '1'
    });

    if(this.$route.query.groupIds) {
      this.selectId = this.$route.query.groupIds
    }
    // console.log( this.selectId)
    const arr = this.selectId.split(",");
    this.selectText = ''
    for (var i = 0, l; (l = data[i++]); ) {
      console.log(arr.indexOf(l.id))
      if(arr.indexOf(l.id) >= 0) {
        l.select = true
        this.selectText += l.name +','
      } else {
        l.select = false;
      }
    }
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
