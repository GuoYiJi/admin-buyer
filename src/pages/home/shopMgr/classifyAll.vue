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
  },
  data() {
    return {
      singleSelect: [],
      selId: '',
      goodsIds: []
    };
  },
  methods: {
    goback() {
      if(!this.selId) {
        wx.showToast({
          title: '请选择分组',
          icon: 'none'
        })
        return
      }
      this.goodsIds = this.goodsIds.filter(item => {
        return item !== '-1'
      })
      this.$API.editGroups({
        goodsIds: this.goodsIds.toString(),
        groupIds: this.selId,
      }).then(response => {
        wx.showToast({
          title: '修改分组成功',
          icon: 'success'
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 1200)
      })
      // this.$router.push({path: "/" + $getUrl(),query: {groups: this.selectId}});
    },
    selectOne(id){
      this.selId = id
    }
  },
  async mounted() {
    this.selId = ''
    if(this.$route.query.ids) {
      this.goodsIds = this.$route.query.ids.split(',')
    }
    const { data } = await this.$API.searchType({
      types: 1
    });
    this.singleSelect = data;
  },
  onUnload() {
    Object.assign(this, this.$options.data());
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
  text-align: center;
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
