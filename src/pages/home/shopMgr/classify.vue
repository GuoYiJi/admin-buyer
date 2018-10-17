<template>
<div class="home">
  <div class="single_box">
    <div class="line" v-for="(item,index) in singleSelect" :key="index" @click="handleItemClick(index, item.checked)">
      <!-- <p><i class="select" :class="item.select && 'active'"></i>{{item.name}}</p> -->
      <selectIcon :isSelected="item.checked" /><span>{{item.name}}</span>
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
import { mapState , mapGetters } from 'vuex'
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
  computed: {
    ...mapState([
      'shopGroup'
    ])
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
    handleItemClick(index, checked) {
      this.$set(this.singleSelect, index, {
        ...this.singleSelect[index],
        checked: !checked
      });
    },
    goback() {
      const selects = this.singleSelect.filter(item => item.checked);
      //addshop
      //set group to vuex
      if (!selects.length) {
        wx.showToast({
          title: '请选择分组',
          icon: 'none'
        })
        return
      }
      this.$store.commit('ADDSHOPGROUP', {
        groupIds: selects.map(item => item.id).join(','),
        groupText: selects.map(item => item.name).join(',')
      })
      this.$router.back(-1)
      // this.$router.push({path: "/" + $getUrl(),query: {groups: this.selectId}});
      // this.$router.go(-1)
    }
  },
  async mounted() {
    let {
      data
    } = await this.$API.searchType({
      types: '1'
    });
    try {

      let groupIds = [];
      if (this.shopGroup.groupIds) {
        groupIds = this.shopGroup.groupIds.split(',').filter(item => !!item);
      }
      // if (JSON.parse(this.$route.query.shopGroup)) {
      //   groupIds = JSON.parse(this.$route.query.shopGroup).groupIds.split(',');
      // }

      data = data.map(item => {
        const index = groupIds.findIndex(id => id === item.id);
        if (index !== -1) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      });
      this.singleSelect = data;
    } catch (err) {console.log(err)}
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
