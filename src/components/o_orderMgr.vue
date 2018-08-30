
<template>
  <!-- 头部*********订单详情 -->
  <div class="home">
    <div class="sort-select">
      <div class="top-nav">
        <ul>
          <li :class="[tag === 1 && 'nav-active']"  @click="handleTag(1)">综合</li>
          <li :class="[tag === 2 && 'nav-active']"  @click="handleTag(2)">收货人
            <div class="sort-box">
              <i class="sort-top" :class="asceSale && 'sort-active'"></i>
              <i :class="!asceSale && 'sort-active'" class="sort-bottom"></i>
            </div>
          </li>
          <li :class="[tag === 5 && 'nav-active']"  @click="handleTag(5)">订单金额
            <div class="sort-box">
              <i class="sort-top" :class="ascePrice && 'sort-active'"></i>
              <i :class="!ascePrice  && 'sort-active'" class="sort-bottom"></i>
            </div>
          </li>
        </ul>
      </div>
      <scroll-view scroll-y lower-threshold='80' style="height: 80%;" @scrolltolower="lower"  >
        <div class="scroll-box">
          <div class="box">
            <p>
              <!-- 拆单组件 -->
              <delivery :sigleList="sigleList"/>
            </p>
            <p >
              <!-- 拼团组件 -->
              <Collage :noSigleList="noSigleList"/>
            </p>
          </div>
        </div>
        <div class="loading" v-if="canLoad">
          <div v-if="showLoad"><loading  /></div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import payment from "@/components/o_payment";
import Collage from "@/components/o_collage";
import delivery from "@/components/o_delivery";
import loading from "@/commond/loading";
export default {
  components: {
    payment,
    Collage,
    delivery,
    loading,

  },
  data() {
    return {
      searchIn: false,
      asceSale: true,
      ascePrice: true,
      showLoad: false,
      canLoad: true,
      tag: 1,
      shopNum: 0,
      items: this.default,
      orderList: [],
      sigleList: [],//可拆单的数组
      noSigleList: [],//不可拆单的数组

    };
  },
 
  methods: {
    async handleTag(tag) {
      this.tag = tag;
      var type = 0 ;
      this.shopNum = 0;
      if (tag === 2) {
        //对销量sort
        this.asceSale = !this.asceSale;
        type = this.asceSale ? 3 : 4;
      }
      if (tag === 5) {
        this.ascePrice = !this.ascePrice;
        type = this.ascePrice ? 5 : 6;
      }
      console.log(type)
      this.type = type
      const listData = await this.getNextPage({
        orderType: type,
        // state: 1
      })

      this.orderList = listData.data.list
      console.log(this.orderList)
      if(listData.data.list.length < this.pageSize) {
        this.canLoad = false
      }
    },
    getNextPage() {
      var obj = {
        pageSize: 30,
        orderType: 1,
        // state: this.tag
      };
      this.shopNum++;
      obj.pageNumber = this.shopNum;
      return this.$API.L_selectOrderPage(obj);
    },
    //滚动下拉事件
    lowerlower(e) {
      console.log(e);
      console.log(111111);
      if (!this.canLoad) return;
      if (this.showLoad) return;
      this.showLoad = true;
      let listData = {}
      this.getNextPage().then(response => {
        listData = response;
        console.log(listData)
      });
      setTimeout(() => {
        if (listData.data.list.length < 30) {
          this.canLoad = false;
        }
        this.orderList = this.orderList.concat(listData.data.list);
        this.showLoad = false;
      }, 2000);
    }

  },
  async mounted() {
    this.shopNum = 0;
    const listData = await this.getNextPage();
<<<<<<< HEAD
=======
    // console.log(listData);
>>>>>>> Jchan
    this.orderList = this.orderList.concat(listData.data.list); 
    for(var i=0;i<this.orderList.length;i++){
      if((this.orderList[i].layer == 1 && this.orderList[i].state == 5) || (this.orderList[i].layer == -1  && this.orderList[i].state == 5)){
        this.sigleList.push(this.orderList[i])
        console.log(this.sigleList)
      } else{
        this.noSigleList.push(this.orderList[i])
      }
    }
<<<<<<< HEAD
    if (listData.data.list.length < 30) {
      this.canLoad = false;
    }
=======
    // console.log(this.noSigleList)
>>>>>>> Jchan
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.box
  padding: 2% 0 110px 0%
.home
  height: 100%
.scroll-box
  height: 900px
  overflow: auto
  p
    margin: 5px 0
.option-icon
  +bg-img('shopMgr/option.png')
  +icon(32px)
.sort-active
  &:after
    border-color: #EE7527!important
.nav-active
  color: #EE7527!important
.sort-select
  height: 100%
.top-nav
  background: #fff
  text-align: center
  ul 
    display: flex
    font-size: 26px
    height: 92px
    line-height: 92px
    li
      flex: 1
      .sort-box
        display: inline
        position: relative
        padding-left: 10px
        .sort-bottom 
          +goback(1px)
          position: absolute
          top: -23px
          &:after
            transform: rotate(-45deg)
            border-color: #999
        .sort-top    
          +goback(1px)
          position: absolute
          bottom: -23px
          &:after
            transform: rotate(-225deg)
            border-color: #999   
</style>