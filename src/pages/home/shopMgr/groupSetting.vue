<template>
  <div class="home">
    <div class="title_box">
      <p class="title"><input class="input_title" placeholder="请输入标题" /></p>
    </div>
    <div class="add_shops">
      <div class="add_img" v-if="!shopTop" @click="toRoute('home/shopMgr/matchList', 1)">+添加商品</div>
      <div class="card_b" v-else>
        <div class="card_box shop-card">
          <div class="img_box">
            <p class="img_1"><img src="http://www.qckj.link/upload/goods/20180520/1526794348353_160563.jpg"></p>
          </div>
          <div class="desc">
            <p class="d_text">就爱上的回访记录卡山东客服了解奥斯卡代理费圣诞快乐房间卡萨老地方拉水电费可垃圾上单士大夫看见爱上的看法</p>
            <p class="d_time"> 货期:现货丨销量:123</p>
          </div>
          <p class="price">
            <span>售价:￥23</span>
            <span class="sell">&nbsp;&nbsp;&nbsp;售价:￥23</span>
          </p>
          <i class="cancel_shop" @click="toCancel(1)"></i>
        </div>
      </div>
    </div>
    <div class="add_other_shop">
      <div class="content_box">
        <div class="add_shop" v-for="(item,idx) in shopMatch" :key="idx">
          <!-- <p v-if="!shopTop">+添加商品</p> -->
          <div class="add_b_item">
            <scard />
          </div>
        </div>
        <div class="add_shop" @click="toRoute('home/shopMgr/matchList', 2)">
          <p>+添加商品</p>
        </div>
        <!-- <div class="add_shop"><p>+添加商品</p></div>
        <div class="add_shop"><p>+添加商品</p></div>
        <div class="add_shop"><p>+添加商品</p></div>
        <div class="add_shop"><p>+添加商品</p></div> -->
      </div>
    </div>
    <p class="bottom"></p>
    <p class="save" @click="QD()">确定</p>
  </div>
</template>
<script>
import wx from "wx";
import scard from "@/components/group_card";
import mixin from "@/mixin";
import { mapState } from "vuex";
export default {
  mixins: [mixin],
  components: {
    scard
  },
  data() {
    return {
      shopTop: ""
    };
  },
  computed: {
    ...mapState(["shopMatch"])
  },
  methods: {
    // toRoute(path,shopNum){
    //   this.$router.push({ path: '/pages/home/shopMgr/'+ path, query: {type: 'groupSetting',shopNum: shopNum }} )
    // },
    toCancel(shopNum) {
      this.shopTop = "";
    },
    async QD() {
      const s_addMatch = await API.s_addMatch({});
    }
  },
  mounted() {
    if (this.$route.query.shopNum) {
      this.shopTop = this.$route.query.shopNum;
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.cancel_shop
  position: absolute
  +bg-img('shopMgr/cancel.png')
  right: 12px
  top: 12px
  +icon(50px)
  // background: #fff
  border-radius: 50px
.card_box
  position: relative
  .img_box
    +border(2px,all, #ccc)
    padding: 16px 30px
    .img_1
      height: 425px
      width: 283px

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
    text-align: left
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
  text-align: left
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
  text-align: left

.content_box
  display: flex
  flex-wrap: wrap
  .add_shop
    // width: 210px
    // height: 464px
    height: 450px
    width: 216px
    padding-right: 20px
    padding-bottom: 20px
    p
      +border(1px,all,#ccc)
      line-height: 450px
.add_other_shop
  padding: 0 20px
.home
  background: #fff
  text-align: center
.title_box
  padding: 20px 24px
  .title
    height: 200px
    // width: 700px
    +border(1px,all,#ccc)
  .input_title
    // margin-top: 60px
    height: 200px
    line-height: 200px
    color: #333
.add_shops
  padding-left: 20px
  padding-bottom: 20px
  text-align: center
  .add_img
    height: 636px
    width: 344px
    line-height: 636px
    text-align: center
    +border(1px,all,#ccc)
  .card_b
    height: 636px
    width: 344px

.save
  position: fixed
  bottom: 0
  left: 0
  right: 0
  color: #fff
  background: #F67C2F
  height: 98px
  line-height: 98px
  text-align: center
  letter-spacing: 1px
</style>
