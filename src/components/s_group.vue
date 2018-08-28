<template>
  <div class="home">
    <scroll-view scroll-y style="height: 480px;" >
    <div class="item_b">
      <!-- <div class="sb_box"> -->
      <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
        <div class="g_box clearfix" :style="{width: 242*4 + 384 + 'rpx'}">
          <div class="g_left">
            <div class="left_box">
              <div class="title">
                <p><i class="i_new"></i>清新系列</p>
              </div>
              <div class="card_box shop-card">
                <div class="img_box"><p class="img_1"><img src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"></p></div>
                <div class="desc">
                  <p class="d_text">就爱上的回访记录卡山东客服了解奥斯卡代理费圣诞快乐房间卡萨老地方拉水电费可垃圾上单士大夫看见爱上的看法</p>
                  <p class="d_time"> 货期:现货丨销量:123</p>
                </div>
                <p class="price">
                  <span>售价:￥23</span>
                  <span class="sell">&nbsp;&nbsp;&nbsp;售价:￥23</span>         
                </p>
              </div>
            </div>
          </div>
          <div class="g_right">
            <!-- <div class="scroll_box"> -->
              <div class="scard_box" :style="{width: 242*4 + 'rpx'}" >
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
              </div>
            <!-- </div> -->
          </div>
        </div>
      </scroll-view>
      <!-- </div> -->
      <div class="footer">
        <p class="edit">编辑</p>
        <p class="close">下架</p>
      </div>
    </div>
    <div class="item_b">
      <!-- <div class="sb_box"> -->
      <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
        <div class="g_box clearfix" :style="{width: 242*4 + 384 + 'rpx'}">
          <div class="g_left">
            <div class="left_box">
              <div class="title">
                <p><i class="i_new"></i>清新系列</p>
              </div>
              <div class="card_box shop-card">
                <div class="img_box"><p class="img_1"><img src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"></p></div>
                <div class="desc">
                  <p class="d_text">就爱上的回访记录卡山东客服了解奥斯卡代理费圣诞快乐房间卡萨老地方拉水电费可垃圾上单士大夫看见爱上的看法</p>
                  <p class="d_time"> 货期:现货丨销量:123</p>
                </div>
                <p class="price">
                  <span>售价:￥23</span>
                  <span class="sell">&nbsp;&nbsp;&nbsp;售价:￥23</span>         
                </p>
              </div>
            </div>
          </div>
          <div class="g_right">
            <!-- <div class="scroll_box"> -->
              <div class="scard_box" :style="{width: 242*4 + 'rpx'}" >
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
                <p class="p_card"><scard /></p>
              </div>
            <!-- </div> -->
          </div>
        </div>
      </scroll-view>
      <!-- </div> -->
      <div class="footer">
        <p class="edit">编辑</p>
        <p class="close">下架</p>
      </div>
    </div>
    <div class="bottom"></div>
    </scroll-view> 
    <div class="create">
      <p @click="toRoute('groupSetting')"><btn :title="'创建搭配'" /></p>
    </div>
  </div>
</template>
<script>
import wx from "wx"
import scard from '@/components/group_card'
import btn from '@/components/btn.vue'
export default {
  components: {
    scard,
    btn
  },
  data() {
    return {
      //loading
      shopNum: 0,
      shopList: [],
      showLoad: false,
      canLoad: true,
      pageSize: 6,
      type: 0,
      state: 1
    };
  },
  methods: {
    toRoute(path) {
      this.$router.push('/pages/home/shopMgr/'+ path)
    },
    searchShop(params){
      params.pageSize = this.pageSize
      return this.$API.s_getshopMatch(params)
    },
    getNextPage(params) {
      this.shopNum++;
      params.pageNumber = this.shopNum;
      return this.searchShop(params)
    },
    async lower(e) {
      // console.log(e);
      if (!this.canLoad) return;
      if (this.showLoad) return;
      this.showLoad = true;
      const listData = await this.getNextPage();
      setTimeout(() => {
        if (listData.data.list.length < this.pageSize) {
          this.canLoad = false;
        }
        this.shopList = this.shopList.concat(listData.data.list);
        this.showLoad = false;
      }, 2000);
    },
  },
  async mounted() {
    this.shopNum = 0;
    const listData = await this.getNextPage({});
    this.shopList = listData.data.list;
    if (listData.data.list.length < this.pageSize) {
      this.canLoad = false;
    }
    console.log(this.shopList)
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.sb_box
  // overflow-x: auto
.create
  position: fixed
  bottom: 0
  left: 0 
  right: 0
  padding: 20px 74px
  background: #fff
.scroll_box_content
  height: 1000px
  overflow: auto
  // overflow-x: hidden
.home
  background: #fff
.footer
  display: flex
  justify-content: flex-end
  padding: 20px 0
  p
    width: 140px
    height: 70px
    text-align: center
    line-height: 70px
    border-radius: 4px
    margin-right: 20px
    box-sizing: border-box
  .edit
    color: #F67C2F
    +border(1px,all,#F67C2F)
  .close
    color: #fff
    background: #CCCCCC
.left_box
  position: absolute
  top: 0
  left: 20px
  width: 344px
// .scroll_box
//   overflow-y: hidden
//   overflow-x: auto
//   height: 950px
.scard_box
  display: flex
  flex-wrap: wrap
  // width: 600px
  .p_card
    height: 444px
    padding-right: 26px
    padding-bottom: 20px
    width: 216px
.g_box
  // height: 400px
  padding-top: 20px 
  +border(10px,bottom,#F5F5F5)
  // overflow-y: hidden
  // overflow-x: auto
  .g_left
    float: left
    width: 384px
    // padding: 0 20px
    height: 900px
    position: relative
    .title
      height: 205px
      line-height: 205px
      color: #6EB1F5
      text-align: center
      .i_new
        +icon(34px)
        +bg-img('shopMgr/group_1.png')
        margin-right: 14px
    .card_box
      .img_box
        +border(2px,all, #ccc)
        padding: 16px 30px
        .img_1
          height: 425px
          width: 283px

  .g_right
    float: left
    // width: 356px
    // height: 917px
    // overflow: hidden
.d_name
	color: #e3e3e3
	font-size: 14px
.shop-card
	// width: 320px
	position: relative
	img 
		width: 100%
		border-radius: 4px
	.desc
		overflow: hidden
    margin: 5px 0
		font-size: 25px
		+desc
		.d_text
      +singleFile()
      color: #000
      font-size: 28px

.price
  color: #FF0000
  font-weight: bold
  font-size: 28px
  padding-top: 10px
  height: 24px
  line-height: 24px
  overflow: hidden
  +singleFile
  .sell
    color: #333
    font-size: 26px
    font-weight: 500
    +singleFile
.d_time
  font-size: 24px
  color: #999
  +singleFile
</style>