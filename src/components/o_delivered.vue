<template>
  <!-- 带有筛选 -->
  <div class="home">
    <div class="sort-select">
      <div class="top-nav">
        <ul>
          <li :class="[tag === 1 && 'nav-active']" @click="handleTag(1)">综合</li>
          <li :class="[tag === 2 && 'nav-active']" @click="handleTag(2)">收货人
            <div class="sort-box">
              <i class="sort-top" :class="asceSale && 'sort-active'"></i>
              <i :class="!asceSale && 'sort-active'" class="sort-bottom"></i>
            </div>
          </li>
          <li :class="[tag === 5 && 'nav-active']" @click="handleTag(5)">筛选
            <div class="sort-box">
              <i class="option-icon"></i>
            </div>
          </li>
        </ul>
      </div>
      <scroll-view :scroll-y="true"  style="height: 100vh;" @scrolltolower="lower" >
        <div class="box">
          <p>
            <!-- 发货组件 -->
            <delivery :orderList="orderList"  ref="chufa" />

          </p>
        </div>
        <div class="loading" v-if="canLoad">
          <div v-if="showLoad"><loading  /></div>
        </div>
      </scroll-view>
      <!-- 筛选弹窗 -->
      <div class="screenShow" v-show="isShows">
        <div class="screen" >
          <div class="title">筛选</div>
          <div class="nav">
            <p class="title_1">收货人</p>
            <div class="btn">
              <scroll-view scroll-y="true" style="height:80%" >
                <span v-for="(item, index) in selectReceiptName" :key="index">
                  <span class="brn_1" :class="[btn == item.name && 'btn-active']" @click="selectedNav(item.name)">{{item.name}}</span>
                </span> 
              </scroll-view>
            </div>
            <!-- <p class="more">查看更多
              <i class="goback"></i>
            </p> -->
          </div>
          <div class="f_btn">
            <p class="reset">重置</p>
            <p class="confirm" @click="confirmBut">确定</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import delivery from "@/components/o_delivery";
import CollageNoGoods from "@/components/L_collageNoGoods";
export default {
    components: {
      CollageNoGoods,
      delivery,
    },
    provide(){
      return {
        reload:this.reload,
      }
    },
    data() {
      return {
        asceSale: true,
        tag: 1,
        btn: '',
        isShows: false,
        shopNum: 0,
        navList: [],
        onPlayList: [],
        noGoodszz: [],
        orderList: [],//可拆单的数组
        selectReceiptName: [],
        type: '1',
        searchIn: false,
        asceSale: true,
        ascePrice: true,
        ascePriceOd: true,
        asceSaleName: true,
        asceSaleDK: true,
        showRight1: false,
        showLoad: false,
        canLoad: true,
        type: '',
        stallInfo: [],
        stallInfozz: [],
        delivery: [],
        flag: false,
        isRouterAlive:true,


      };
    },
    methods: {
       
        reload(){
          // this.$router.go(0);
          this.isRouterAlive = false;
          this.$nextTick(() => (this.isRouterAlive = true))
          this.action();
        },
        async action(){
          console.log(11)
          this.shopNum = 0;
          const listData = await this.getNextPage({ob: 0});
          this.orderList = [];
          this.orderList = this.orderList.concat(listData.data.list);
          // this.flag = true;

          // console.log(this.orderList.skuList)
          let skuList = []
          for(var i=0;i<this.orderList.length;i++){
            let orderlistArr = this.orderList[i].orderGoods
            console.log(orderlistArr)
            for(var k=0;k<orderlistArr.length;k++){
              skuList = this.orderlistArr[k].skuList
              for(var j=0;j<skuList.length;j++){
              console.log(111)
              let stallInfos = {
                stallInfodx: skuList[j].stallInfo2
              }
              console.log(stallInfos)
              let stallInfozzsxx = {
                stallInfodk: skuList[j].stallInfo3,
              }
              let deliverys = {
                deliveryxh: skuList[j].delivery,
              }
              this.stallInfo = stallInfos
              this.stallInfozzs = stallInfozzsxx
              this.delivery = deliverys
              console.log(this.stallInfozz)
              console.log(this.delivery)
            }

            }
          }
          console.log(this.$refs.chufa,202)
          this.$refs.chufa.childMethod();
          return
        },
        async handleTag(tag) {
            this.tag = tag;
            var type;
            this.shopNum = 0;
            if (tag === 2) {
                //对销量sort
                this.asceSale = !this.asceSale;
                type = this.asceSale ? 2 : 3;
            }
            if (tag === 4) {
                this.ascePrice = !this.ascePrice;
                type = this.ascePrice ? 4 : 5;
            }
            if (tag === 5) {
                this.toggleRight1();
            }
              this.type = type
              const listData = await this.getNextPage({
                orderType: type,
                // state: 1
              })
              this.orderList = listData.data.list
              console.log(this.orderList)
              this.$refs.chufa.childMethod();
              if(listData.data.list.length < this.pageSize) {
                this.canLoad = false
              }
        },
        async toggleRight1() {
          console.log(this.orderList)
          let receiptNamezz = []
          for(var i=0;i<this.orderList.length;i++){
            let obj = {};
            obj.name = this.orderList[i].receiptName
            obj.id = i++
            receiptNamezz.push(obj) 
          }
          this.selectReceiptName = this.selectReceiptName.concat(receiptNamezz) 
          console.log(this.selectReceiptName) 
          this.isShows = !this.isShows;
        },
        toEdit() {
            this.edit = true;
        },
        selectAll() {
            this.allCheck = !this.allCheck;
            this.$refs.delivery.selectAll(this.allCheck);
        },
        selectedNav(index) {
          console.log(index)
            this.btn = index;
        },
        async confirmBut(){
          const listData = await this.getNextPage({
            receiptName: this.btn
          });
          this.noGoodszz = this.noGoodszz.concat(listData.data.list); 
          this.orderList = this.noGoodszz 
          console.log(this.orderList)
           this.isShows = !this.isShows;
        },
        getNextPage() {
          var obj = {
            pageSize: 10,
            orderType: this.type,
            state: 5,
            receiptName: this.but
            // state: this.tag
          };
          this.shopNum++;
          obj.pageNumber = this.shopNum;
          return this.$API.L_selectOrderPage(obj);
        },
        async action(){
            console.log(11)
          this.shopNum = 0;
          const listData = await this.getNextPage({orderType: 0});
          this.orderList = [];
          this.orderList = this.orderList.concat(listData.data.list);
          let skuList = []
          for(var i=0;i<this.orderList.length;i++){
            let orderGoods = this.orderList[i].orderGoods
            for(var k=0;k<orderGoods.length;k++){
              skuList = orderGoods[i].skuList
              
            }
            for(var j=0;j<skuList.length;j++){
              console.log(111)
              let stallInfos = {
                stallInfodx: skuList[j].stallInfo2
              }
              console.log(stallInfos)
              let stallInfozzsxx = {
                stallInfodk: skuList[j].stallInfo3,
              }
              let deliverys = {
                deliveryxh: skuList[j].delivery,
              }
              this.stallInfo = stallInfos
              this.stallInfozzs = stallInfozzsxx
              this.delivery = deliverys
              console.log(this.stallInfozz)
              console.log(this.delivery)
            }
          }
          console.log(this.$refs.chufa,202)
          this.$refs.chufa.childMethod();
          return
        },
        lower(e) {
          if (!this.canLoad) {
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
              duration: 1500
            })
            return
          }
          
          if (this.showLoad) return;
          this.showLoad = true
          wx.showLoading({
            title: '加载中',
          })
          const vm = this;
          this.getNextPage({ob: this.type,state: this.state}).then(response => {
            vm.onPlayList =  vm.onPlayList.concat(response.data.list);
            if(response) {
              vm.showLoad = false
            }
            if(vm.orderList.length === response.data.totalRow) {
              vm.canLoad = false
            }
            this.orderList = this.orderList.concat(listData.data.list); 
            wx.hideLoading()
          })
        } ,

    },
    async mounted() {
      console.log(11)
      this.shopNum = 0;
      const listData = await this.getNextPage();
      console.log(listData);
      this.orderList = this.orderList.concat(listData.data.list); 
      if (listData.data.list.length < 10) {
        this.canLoad = false;
      }
     this.$refs.chufa.childMethod();

      
    
    },
    //离开当前页面后执行
    destroyed: function () {
        this.flag = false;
    },
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.btn-active
  color: #FFF!important
  background: #FC703B!important
.screenShow
  width: 100%
  height: 100%
  background: rgba(0,0,0,0.4)
  position: fixed
  top: 0
  z-index: 9999
  
  .screen
    width: 567px
    height: 100%
    background: #fff
    position: absolute
    top: 0px
    right: 0px
    box-shadow: -2px 2px 2px #333333
    .title
      height: 50px
      background: #F5F5F5
      color: #999
      padding-left: 20px
      font-size: 26px
    .nav
      height: 366px
      // +border(1px,bottom,#ccc)
      .title_1
        padding: 10px 0 0 20px
      .btn
        display: fle
        flex-wrap: wrap
        .brn_1
          display: inline-block
          width: 160px
          height: 70px
          font-size: 26px
          flex: 1
          line-height: 70px
          text-align: center
          background: #F5F5F5
          border-radius: 8px
          margin: 10px
      .more
        color: #999
        text-align: center
        position: relative
        padding: 20px 0 40px 0
        font-size: 24px
        // +border(1px,bottom,#ccc)
        .goback
          +goback(1px)
    .f_btn
      position: absolute
      bottom: 0
      left: 0
      right: 0
      height: 153px
      // +border(1px,top,#ccc)
      display: flex
      justify-content: flex-end
      text-align: center
      background: #fff
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


// 筛选


.item-box
  color: #333
  height: 85%
  overflow: auto
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
 
.box
  padding: 2% 0 110px 0%
.home
  // position: relative
  height: 100%
.footer
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 98px
  line-height: 98px
  display: flex
  justify-content: flex-end
  color: #fff
  background: #fff
  p
    width: 220px
    text-align: center
  .style1
    background: #FFB658
  .style2
    background: #F67C2F
  .all-btn
    background: #fff
    color: #999999
    text-align: left
    width: 230px

    .select
      +select()
      left: 24px
    .active
      +select-active
.scroll-box
  // padding: 10px 0
  height: 100%
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
  // left: 0
  // right: 0
  // top: 180px
  background: #fff
  // z-index: 9999
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