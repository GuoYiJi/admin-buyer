<template>
  <div class="demo-container">
          <div class="title">筛选</div>
          <scroll-view scroll-y style="height: 80%;" >
          <div class="item-box">
            <div class="item">
              <p class="i_title">分类</p>
              <ul class="s_item_box">
                <li class="s_item"
                @click="select('sel1',item.id)"
                :class="sel1 == item.id && 'active_search'"
                v-for="(item,idx) in classData"
                :key="idx">{{item.name}}</li>
              </ul>
              <ul v-if="more1" class="s_item_box">
                <li class="s_item"
                @click="select('sel1',item.id)"
                :class="sel1 == item.id && 'active_search'"
                v-for="(item,idx) in more1Data"
                :key="idx">{{item.name}}</li>
              </ul>
              <p class="more" v-if="more1Data.length > 0" >
                <span @click="toOpen('more1')" v-if="!more1">查看更多 <i class="goback"></i></span>
                <span @click="toClose('more1')" v-else>点击收起</span>
              </p>
            </div>
            <div class="item">
              <p class="i_title">大厦</p>
              <ul class="s_item_box">
                <li class="s_item"
                @click="selStall('sel2',item)"
                :class="sel2.id == item.id && 'active_search'"
                v-for="(item,idx) in mktData"
                :key="idx">{{item.name}}</li>
              </ul>
              <ul v-if="more2" class="s_item_box">
                <li class="s_item"
                @click="selStall('sel2',item)"
                :class="sel2.id == item.id && 'active_search'"
                v-for="(item,idx) in more2Data"
                :key="idx">{{item.name}}</li>
              </ul>
              <p class="more"  v-if="more2Data.length > 0" >
                <span @click="toOpen('more2')" v-if="!more2">查看更多 <i class="goback"></i></span>
                <span @click="toClose('more2')" v-else>点击收起</span>
              </p>
            </div>
            <div class="item">
              <p class="i_title">档口</p>
              <ul class="s_item_box">
                <li class="s_item"
                @click="select('sel3',item)"
                :class="sel3.id == item.id && 'active_search'"
                v-for="(item,idx) in stall3Data"
                :key="idx">{{item.name}}</li>
              </ul>
            </div>
            <div class="item">
              <p class="i_title">货期</p>
              <ul class="s_item_box">
                <li class="s_item"
                @click="select('sel4',item.id)"
                :class="sel4 == item.id && 'active_search'"
                v-for="(item,idx) in timeData"
                :key="idx">{{item.name}}</li>
              </ul>
            </div>
            <div class="item">
              <p class="i_title">价格区间</p>
              <ul class="s_item_box">
                <!-- <li class="s_item"
                @click="select('sel5',item)"
                :class="sel5.id == item.id && 'active_search'"
                v-for="(item,idx) in priceData"
                :key="idx">{{item.name}}</li> -->
                <li class="s_item" ><input class="input_p" type="number"  v-model="price1" placeholder="最低价"/></li>
                <i>——</i>
                <li class="s_item" ><input class="input_p" type="number"  v-model="price2" placeholder="最高价"/></li>
              </ul>
            </div>
          </div>
          </scroll-view>
          <div class="f_btn">
            <p class="reset" @click="reset">重置</p>
            <p class="confirm" @click="comfirm">完成</p>
          </div>
        </div>
</template>
<script>
import mixin from '@/mixin'
export default {
  mixins: [mixin],
  data(){
    return {
      //search
      more1: false,
      more2: false,
      more1Data: [],
      more2Data: [],
      classData: [],
      mktData: [],
      timeData: [],
      stall3Data: [],
      // priceData: [{
      //   id: 1,
      //   name: '0-70',
      // },{
      //   id: 2,
      //   name: '70-150',
      // },{
      //   id: 3,
      //   name: '150以上',
      // }],
      sel1: '',
      sel2: {},
      sel3: {},
      sel4: '',
      price1: '',
      price2: '',
    }
  },
  methods: {
    async getStall(id){
      const {data} = await this.$API.searchMarket({
        series: 2,
        pid: id
      })
      this.stall3Data = data
    },
    selStall(name,val){
      this.select(name,val)
      this.getStall(val)
    },
    reset(){
      this.sel1 = ''
      this.sel2 = {}
      this.sel3 = {}
      this.sel4 = ''
      this.price1 = ''
      this.price2 = ''
    },
    comfirm(){
      const obj = {
        // stallInfo2: this.sel2.name || '',
        // stallInfo3: this.sel3.name || '',
        // deliveryId: this.sel4 ,
        // labelId: this.sel1,
        // min: this.price1,
        // max: this.price2
      }
      if(this.sel2.name) obj.stallInfo2 = this.sel2.name
      if(this.sel3.name)  obj.stallInfo3 = this.sel3.name
      if(this.sel4) obj.deliveryId = this.sel4
      if(this.sel1) obj.labelId = this.sel1
      if(this.price1) obj.min = this.price1
      if(this.price2) obj.max = this.price2
      this.$emit('comSearch', obj)
    }
  },
  async created(){
    //获取筛选条件
    const classData = await this.$API.searchType({types: '2',})
    this.classData = classData.data.slice(0,6)
    this.more1Data = classData.data.slice(6)

    const mktData = await this.$API.searchMarket({series: 1})
    this.more2Data = mktData.data.slice(6)
    this.mktData = mktData.data.slice(0,6)

    const timeData = await this.$API.searchType({types: '4',})
    this.timeData = timeData.data
  }
}
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.active_search
  color: #fff!important
  background: #EF7528!important
.item-box
  color: #333
  // height: 85%
  // overflow: auto
  .item
    +border(1px,bottom,#ccc)
  .i_title
    padding: 30px 20px
  .s_item_box
    padding: 0 20px
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    .s_item
      width: 160px
      height: 70px
      line-height: 70px
      background: #F5F5F5
      text-align: center
      border-radius: 6px
      margin-bottom: 20px
      .input_p
        padding: 8px 0
.f_btn
  // position: absolute
  // bottom: 0
  // left: 0
  // right: 0
  height: 153px
  // +border(1px,top,#ccc)
  display: flex
  justify-content: flex-end
  text-align: center
  background: #fff
  // z-index: 999
  p
    width: 170px
    height: 80px
    line-height: 80px
    color: #fff
    margin-right: 30px
    margin-top: 37px
  .confirm
    border-radius: 0px 10px 50px 0px
    background: #EE7527
  .reset
    border-radius: 10px 0px 0px 50px
    background: #ccc
.demo-container
	width: 568px
	height: 100vh
	background: #fff
  font-size: 28px
  box-shadow: 1px 0px 13px rgba(8,0,0,0.17)
  // position: relative
.title
  padding: 8px 30px
  background: #F5F5F5
  color: #999
.more
  color: #999
  text-align: center
  // position: relative
  padding: 20px 0 40px 0
  font-size: 24px
  +border(1px,bottom,#ccc)
  .goback
    +goback(1px)
    vertical-align: top
// 筛选
</style>
