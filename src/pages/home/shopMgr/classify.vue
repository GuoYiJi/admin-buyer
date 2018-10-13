<template>
<div class="home">
  <div class="single_box">
    <div class="line" v-for="(item,index) in singleSelect" :key="index" @click="selectOne(item.id, item.name, index)">
      <!-- <p><i class="select" :class="item.select && 'active'"></i>{{item.name}}</p> -->
      <selectIcon :isSelected="selectedList.some(ite => ite == item.id)" /><span>{{item.name}}</span>
    </div>
  </div>

  <div class="create">
    <p @click="goback">
      <btn :title="'保存'" />
    </p>
  </div>
</div>
</template>
<script>
import wx from "wx";
import btn from "@/components/btn";
import selectIcon from '@/components/selectIcon'
// import line from '@/components/lineSelect'
import mixin from "@/mixin.js";
import {
  $getUrl
} from "@/utils";
export default {
  mixins: [mixin],
  components: {
    btn,
    selectIcon
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
      selectedList: []
    };
  },
  methods: {
    // selectOne(obj) {
    //   // for(var i=0,l; l = this.singleSelect[i++];){
    //   //   if(l.select) l.select = false
    //   // }
    //   obj.select = !obj.select
    //   if (obj.select) {
    //     this.selectId += obj.id + ",";
    //     this.selectText += obj.name + ','
    //   } else {
    //     this.selectId = this.selectId.replace(obj.id + ',', '')
    //     this.selectText = this.selectText.replace(obj.name + ',', '')
    //   }
    //   console.log(this.selectId)
    // },
    selectOne(id, name, index) {
      if (this.selectedList[index] == '-1') {
        this.$set(this.selectedList, index, id)
      } else {
        this.$set(this.selectedList, index, '-1')
      }
      console.log(this.selectedList);
    },
    goback() {
      //addshop
      //set group to vuex
      if (this.selectedList.every(item => item == '-1')) {
        wx.showToast({
          title: '请选择分组',
          icon: 'none'
        })
        return
      }

      let nameArr = []
      this.selectedList.forEach((item, index) => {
        if (item !== '-1') {
          nameArr.push(this.singleSelect[index].name)
        }
      })
      console.log(nameArr);
      this.selectedList = this.selectedList.filter(item => {
        return item !== '-1'
      })
      this.$store.commit('ADDSHOPGROUP', {
        groupIds: this.selectedList.toString(),
        groupText: nameArr.toString()
      })
      console.log(this.$store.state.shopGroup);
      this.$router.back(-1)
      // this.$router.push({path: "/" + $getUrl(),query: {groups: this.selectId}});
      // this.$router.go(-1)
    }
  },
  async mounted() {
    const {
      data
    } = await this.$API.searchType({
      types: '1'
    });
    this.singleSelect = data;

    if (JSON.parse(this.$route.query.shopGroup)) {
      this.selectedList = JSON.parse(this.$route.query.shopGroup).groupIds.split(',')
      console.log('111111111111111');
    }else {
      this.singleSelect.forEach((item, index) => {
        this.selectedList[index] = '-1'
      })
    }
    console.log(this.selectedList);

    console.log('this.singleSelect =>', this.singleSelect);
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
  .line
    display: flex
    align-items: center
    height: 109px
    background: #fff
    padding-left: 50px
    margin-bottom: 10px
    &:first-of-type
      margin: 10px 0
    p
      margin-left: 20px
// .select
//   +select()
//   left: 24px
// .active
//   +select-active
</style>
