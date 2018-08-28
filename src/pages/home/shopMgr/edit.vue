<template>
  <div class="home">
    <div class="add_video">
      <p class="a_title">请添加视频: </p>
      <div class="v_box">
        <vbox />
      </div>
    </div>
    <div class="add_video">
      <p class="a_title">请添加图片: （最多添加15张） </p>
      <div class="v_box">
        <ibox />
      </div>
    </div>
    <div class="line-box">
      <div class="line b_line">
        <!-- <i class="i_s2 i-icon"></i> -->
        <p class="input">这是标题标题标题标题标题</p>
        <!-- <p class="blur">未设置</p> -->
      </div>
      <div class="line b_line" >
        <!-- <i class="i_s3 i-icon"></i> -->
        <p class="input">市场档口：</p>
        <p class="blur">三级联动</p>
      </div>
      <div class="line b_line" >
        <!-- <i class="i_s3 i-icon"></i> -->
        <p class="input">采购说明：</p>
        <p class="blur">采购说明采购说明采购说明采购 说明采购说明</p>
      </div>
      <div class="line b_line" >
        <p class="input">成本价：</p>
        <input class="input_box" />
      </div>
      <div class="line" >
        <p class="input">利润：</p>
        <input class="input_box small" />
        <p class="input sale" >售价：<span class="red">131元</span></p>
      </div>
    </div>
    <div class="line-box">
      <div class="line b_line" >
        <p class="input">货期排单：</p>
        <p class="blur">现货</p>
      </div>
      <div class="line b_line" >
        <p class="input">品类：</p>
        <p class="blur">女装-连衣裙</p>
      </div>
      <div class="line b_line" >
        <p class="input">规格与库存：</p>
        <p class="blur">红色/M码/234;白色/s码/12</p>
      </div>
      <div class="line b_line" >
        <p class="input">版型：</p>
        <p class="blur">紧身</p>
      </div>
      <div class="line b_line" >
        <p class="input">面料类型：</p>
        <p class="blur">棉质</p> 
      </div>
      <div class="line b_line" >
        <i class="i_s3 i-icon"></i>
        <p class="input">商品分组</p>
        <p class="blur">上新、热销</p>
      </div>
      <div class="line b_line" >
        <i class="i_s3 i-icon"></i>
        <p class="input">商品标签</p>
        <p class="blur">商家认证；优质采购</p>
      </div>
      <div class="line b_line" >
        <p class="input">转售：</p>
        <!-- <p class="blur">棉质</p>  -->
      </div>
      <div class="line b_line" >
        <p class="input">商品ID：</p>
        <p class="blur">123764B402</p> 
      </div>
    </div>
    <div class="footer">
      <p class="getUp">立即上架</p>
      <p class="getIn">保存到仓库</p>
    </div>
    <!-- 弹出层 -->
    <div>
      <i-modal :visible="backTips" @ok="toClose('backTips')" @cancel="toClose('backTips')">
          <div class="m_tips">您尚未完善商品信息，确认退出？</div>
      </i-modal>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import vbox from '@/components/chooseVideo'
import ibox from '@/components/chooseImage'
import mixin from '@/mixin'
export default {
  mixins: [mixin],
  components: {
    vbox,
    ibox
  },
  data() {
    return {
      backTips: false
    };
  },
  methods: {
    
  },
  mounted() {},
  onUnload(){
    this.toOpen('backTips')
    console.log('page go back')
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.m_tips
  color: #333
  padding: 20px 0
.footer
  padding: 30px 70px
  background: #fff
  display: flex
  justify-content: space-between
  p
    width: 300px
    height: 90px
    line-height: 90px
    color: #fff
    font-size: 32px
    background: #ccc
    text-align: center
    border-radius: 6px
  .getUp
    background: #F67C2F

.sale
  padding-left: 320px
.input_box
  +border(1px,all)
  +center
  left: 155px
  padding: 4px 8px 
.small
  width: 200px
.add_video
  background: #fff
  padding: 20px 24px
  margin-bottom: 20px
  .a_title
    color: #666
    padding-bottom: 20px 

.b_line
  +border(1px,bottom,#f5f5f5)
.line-box
  padding: 0 24px 
  background: #fff
  margin-bottom: 20px
.line
  display: flex
  height: 89px
  line-height: 89px
  position: relative
  .input
    height: 100% 
    padding-right: 8px
    color: #999
    .red
      color: #FF0000
  .blur
    color: #999
    font-size: 28px
    +center
    right: 0
    width: 100%
    text-align: right
  .input_text
    height: 68px
    line-height: 108px
    padding: 20px  
</style>