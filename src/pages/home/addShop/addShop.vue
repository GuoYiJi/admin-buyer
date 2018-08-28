<template>
  <div class="home">
    <div class="add_video">
      <p class="a_title">请添加视频: </p>
      <div class="v_box">
        <vbox @getVideo="getVideo" :videoStr="$route.query.video" />
      </div>
    </div>
    <div class="add_video">
      <p class="a_title">请添加图片: （最多添加15张） </p>
      <div class="v_box">
        <ibox @getImg="getImg" @changeImg="changeImg" :imgStr="$route.query.images" maxNum='16' uploadNum="5"/>
      </div>
    </div>
    <div class="line-box">
      <div class="line b_line">
        <!-- <i class="i_s2 i-icon"></i> -->
        <p class="input">商品标题： </p>
        <p class="blur"><input  v-model="goods.name" placeholder="请输入商品标题"></p>
        <!-- <p class="blur">未设置</p> -->
      </div>
      <div class="line b_line"  @click="toOpen('showMarket')">
        <!-- <i class="i_s3 i-icon"></i> -->
        <p class="input">市场档口：</p>
        <p class="blur">{{goods.stallInfo1 ? goods.stallInfo1 +'-'+goods.stallInfo2 +'-'+ goods.stallInfo3  : '请选择市场档口'}}</p>
      </div>
      <div class="line b_line" @click="toRoute('home/addShop/buyDesc')" >
        <!-- <i class="i_s3 i-icon"></i> -->
        <p class="input">采购说明：</p>
        <p class="blur input_p_left">{{shopExplan.value ? shopExplan.value : '请选择采购说明' }}</p>
      </div>
      <div class="line b_line" >
        <p class="input">成本价：</p>
        <input v-model="goods.costPrice" type="number" class="input_box" />
      </div>
      <div class="line" >
        <p class="input">利润：</p>
        <input v-model="goods.profit" type="number" class="input_box small" />
        <p class="input sale" >售价：<span class="red">{{sellPrice}}</span></p>
      </div>
    </div>
    <div class="line-box">
      <div class="line b_line" @click="toOpen('showTime')">
        <p class="input">货期排单：</p>
        <p class="blur">{{goods.delivery ? goods.delivery : '请选择货期排单'}}</p>
      </div>
      <div class="line b_line" @click="toOpen('showType1')" >
        <p class="input">品类：</p>
        <p class="blur">{{ goods.labelInfo ? goods.labelInfo : '点击选择品类'}} </p>
      </div>
      <div class="line b_line shopType" @click="toRoute('home/addShop/addType')">
        <p class="input">规格与库存：</p>
        <div class="blur">
          <div class="hasType" v-if="addShopType.length > 0">
            <p v-for="(item,index) in addShopType" :key="index"  >
              {{item.skuCode + '/' + item.stock}}
            </p>
          </div>
          <div v-else>
            点击选择规格与库存
          </div>
        </div>
      </div>
      <div class="line b_line" @click="toOpen('showType2')" v-if="type2Data.length > 0">
        <p class="input">版型：</p>
        <p class="blur">{{goods.labelInfo2 ? goods.labelInfo2 : '点击选择版型'}}</p>
      </div>
      <div class="line b_line" @click="toOpen('showType3')" v-if="type3Data.length > 0">
        <p class="input">面料类型：</p>
        <p class="blur">{{goods.labelInfo3 ? goods.labelInfo3 : '点击选择面料'}}</p> 
      </div>
      <div class="line b_line" @click="toRoute('home/shopMgr/classify')" >
        <!-- <i class="i_s3 i-icon"></i> -->
        <p class="input">商品分组</p>
        <p class="blur input_p_left">{{shopGroup.groupText ? shopGroup.groupText : '点击选择分组'}}</p>
      </div>
      <div class="line b_line" @click="toOpen('showTag')">
        <!-- <i class="i_s3 i-icon"></i> -->
        <p class="input">商品标签</p>
        <p class="blur input_p_left">{{goods.tag ? tagText : '点击选择标签'}}</p>
      </div>
      <div class="line b_line" >
        <p class="input">转售：</p>
        <div class="blur">
          <div class="sel_box">
            <div class="sel_item" @click="toOpen('sellType')">
              <i class="select" :class="[sellType && 'active']"></i>
              <p>支持</p>
            </div>
            <div class="sel_item" @click="toClose('sellType')">
              <i class="select" :class="[!sellType && 'active']"></i>
              <p>不支持</p>
            </div>
          </div>
        </div> 
      </div>
      <!-- <div class="line b_line" >
        <p class="input">商品ID：</p>
        <p class="blur">123764B402</p> 
      </div> -->
    </div>
    <div class="footer" v-if="!editType">
      <p class="getUp" @click="save(1)">立即上架</p>
      <p class="getIn" @click="save(0)">保存到仓库</p>
    </div>
    <div class="edit_footer" v-if="editType">
      <p class="getUp" @click="save(2)">确认修改</p>
    </div>
    <!-- 弹出层 modal_time -->
    <div class="modal_box" v-if="showTime">
      <div class="modal_time" >
        <div class="top">
          <p class="cancel" @click="toClose('showTime')">取消</p>
          <p class="title">选择货期排单</p>
          <p class="confirm" @click="confirmOther('showTime')">确定</p>
        </div>
        <div class="content">
          <!-- <li class="item" @click="select('timeText','现货')" :class="[timeText == '现货' && 'active']" >现货</li> -->
          <li class="item" 
          v-for="(item,idx) in otherData" 
          v-if="item.typeId == 4"
          @click="select('timeText', item)"
          :class="[timeText.id == item.id && 'active']"
          :key="idx">{{item.name}}</li>
        </div>
      </div>
    </div>
    <!-- 弹出层 品类 -->
    <div class="modal_box" v-if="showType1">
      <div class="modal_time" >
        <div class="top">
          <p class="cancel" @click="toClose('showType1')">取消</p>
          <p class="title">选择品类</p>
          <p class="confirm" @click="confirmType('showType1')">确定</p>
        </div>
        <div class="content">
          <li class="item" 
          v-for="(item,idx) in otherData" 
          v-if="item.typeId == 2"
          @click="select('type1Text', item)"
          :class="[type1Text.id == item.id && 'active']"
          :key="idx">{{item.name}}</li>
        </div>
      </div>
    </div>
    <!-- 弹出层 版型 -->
    <div class="modal_box" v-if="showType2">
      <div class="modal_time" >
        <div class="top">
          <p class="cancel" @click="toClose('showType2')">取消</p>
          <p class="title">选择版型</p>
          <p class="confirm" @click="confirmType('showType2')">确定</p>
        </div>
        <div class="content">
          <!-- <li class="item" @click="select('type2Text','现货')" :class="[type2Text == '现货' && 'active']" >现货</li> -->
          <li class="item" 
          v-for="(item,idx) in type2Data" 
          :key="idx"
          @click="select('type2Text',item)" 
          :class="[type2Text.id == item.id && 'active']"
          >{{item.name}}</li>
 
        </div>
      </div>
    </div>
    
    <!-- 弹出层 面料类型 -->
    <div class="modal_box" v-if="showType3">
      <div class="modal_time" >
        <div class="top">
          <p class="cancel" @click="toClose('showType3')">取消</p>
          <p class="title">选择面料类型</p>
          <p class="confirm" @click="confirmType('showType3')">确定</p>
        </div>
        <div class="content">
          <!-- <li class="item" @click="select('materialText','现货')" :class="[materialText == '现货' && 'active']" >现货</li> -->
          <li class="item" 
          v-for="(item,idx) in type3Data" 
          :key="idx"
          @click="select('type3Text',item)" 
          :class="[type3Text.id == item.id && 'active']"
          >{{item.name}}</li>
        </div>
      </div>
    </div>
    
    <!-- 弹出层  商品标签-->
    <div class="modal_box" v-if="showTag">
      <div class="modal_time" >
        <div class="top">
          <p class="cancel" @click="toClose('showTag')">取消</p>
          <p class="title">选择商品标签</p>
          <p class="confirm" @click="confirmOther('showTag')">确定</p>
        </div>
        <div class="content content_tag">
          <!-- <div class="tag_item" @click="select('tagText','标签1标签2')">
            <i class="select" :class="[tagText == '标签1标签2' && 'select-active']"></i>
            <p>标签1标签2</p>
          </div> -->
          <div class="tag_item"
          v-for="(item,idx) in tagData" 
          @click="selectTagIds('tagIds',item)"
          :key="idx">
            <i class="select" :class="item.select && 'select-active'"></i>
            <p>{{item.name}}</p>
          </div>
        </div>
        <div class="add_line">
          <input class="add_input" v-model="addTagText" placeholder="请输入"/>
          <p class="add_btn" @click="addTag">添加</p>
        </div>
      </div>
    </div>    

    <!-- 弹出层 市场档口-->
    <div class="modal_box" v-if="showMarket">
      <div class="modal_time" >
        <div class="top">
          <p class="cancel" @click="toClose('showMarket')">取消</p>
          <p class="title">选择市场档口</p>
          <p class="confirm" @click="confirmMarket()">确定</p>
        </div>
        <div class="box-select">
          <div class="s_item first">
            <p :class="[selectFMarket.id == item.id && 'active']" v-for="(item,idx) in mktFirstData" :key="idx" @click="getMarketData(1,item)">{{item.name}}</p>
          </div>
          <div class="s_item second">
            <p :class="[(selectSMarket.id == item.id && selectSMarket.id )  && 'active']"  v-for="(item,idx) in mktSecondData" :key="idx" @click="getMarketData(2,item)">{{item.name}}</p>
          </div>
          <div class="s_item third">
            <p :class="[(selectTMarket.id && selectTMarket.id == item.id) && 'active']"  v-for="(item,idx) in mktThirdData" :key="idx" @click="confirmMarket(item)">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <i-message id="message" />
    <!-- <div>
      <i-modal :visible="backTips" @ok="toClose('backTips')" @cancel="toClose('backTips')">
          <div class="m_tips">您尚未完善商品信息，确认退出？</div>
      </i-modal>
    </div> -->

  </div>
</template>
<script>
import wx from "wx";
import vbox from '@/components/chooseVideo'
import ibox from '@/components/chooseImage'
import mixin from '@/mixin'
import config from '@/config'
import { $getUrl } from '@/utils'
import { mapState , mapGetters } from 'vuex'
export default {
  mixins: [mixin],
  components: {
    vbox,
    ibox
  },
  data() {
    return {
      editType: false,
      // backTips: false,
      showTime: false,
      showType: false,
      // showMaterial: false,
      showTag: false,
      sellType: false,
      showMarket: false,
      showType1: false,
      showType2: false,
      showType3: false,
      type2Data: [],
      type3Data: [],
      tagIds: '',
      tagText: '',
      // materialText: '',
      // typeText: '',
      type1Text: '',
      type2Text: '',
      type3Text: '',
      timeText: '',
      imageList: [],
      //market adr
      selectFMarket: '',
      selectSMarket: '',
      selectTMarket: '',
      mktFirstData: {},
      mktSecondData: {},
      mktThirdData: {},
      marketText: '',

      //otherData
      otherData: {},
      groupData: [],
      groupVal: '',

      addTagText: '',
      tagData: '',
      goods: {
        name: '',//商品名称
        stallInfo1: '',//大厦
        stallInfo2: '',//市场
        stallInfo3: '',//档口
        labelInfo: '', //商品分类
        labelInfo2: '', //商品二级
        labelInfo3: '', //商品三级
        labelIds: '',//labeldata的ID串  分组ID，涤纶ID,紧身ID
        deliveryId: '',//货期排单ID
        delivery: '',//货期排单
        isTransfer: 0, //'0不可转发 1可以转发',
        parameter: '',//商品参数
        images: '', //轮播图片
        video: '',//商品视频
        content: '',//商品详情
        // sellPrice: this.costPrice+ this.profit,
        costPrice: '', //'成本价',
        profit: '', //'利润',
        remark: '',//商品标题
        groupIds: '',//分组ID 逗号隔开
        // labelIds: '',//分类ID逗号隔开
        tag: '', //商品标签
        buyExplan: '', //采购说明
      },
      skuList: [
      //   {
      //   skuCode: '',//红,5cm
      //   stock: '',//库存
      //   image: '',//图片
      // }
      ]
    };
  },
  computed: {
    sellPrice(){
      if(this.goods.costPrice && this.goods.profit) {
        this.goods.sellPrice = Number(this.goods.costPrice) + Number(this.goods.profit)
        return this.goods.sellPrice + '元'
      }
    },
    ...mapState([
      'addShopType',
      'shopGroup',
      'shopExplan'
    ]),
  },
  async mounted() {
    //check editShop
    if(this.$route.query.id){
      //数据注入
      this.editType = true
      this.goods = this.$route.query
    }
    //init
    //get searchMarket
    this.getMarketData(0)
    //get 排期 品类 版型 面料 分组 标签 
    const {data} = await this.$API.searchType({
      types: '2,3,4'
    })
    this.otherData = data
    //过滤tagData 
    let tagArr  = []
    this.tagText = ''
    this.tagIds = ''
    for(var i=0,l; l=this.otherData[i++];){
      if(l.typeId == 3) {
        if(this.goods.tag && this.goods.tag.split(',').indexOf(l.id) >=0 ){
          l.select = true
          this.tagText += l.name +',' 
          this.tagIds += l.id + ','
        } else {
          l.select = false
        }
        
        tagArr.push(l)
      } 
    }
    this.tagData = tagArr
  },
  methods: {
    async save(state){
      var value = await wx.getStorageSync('sessionId')
      if( this.imageList.length > 0){
        this.goods.images = this.imageList.slice(0,5).join(',')
      }
      if(this.imageList.length > 5){
        this.goods.content = this.imageList.slice(5).join(',')
      }
      if(this.type1Text.id){
        this.goods.labelIds = this.type1Text.id + ','
      }
      if(this.type2Text.id){
        this.goods.labelIds += this.type2Text.id + ','
      }
      if(this.type3Text.id){
        this.goods.labelIds += this.type3Text.id + ','
      }
      
      this.goods.state = state
      //add buyExplan
      this.goods.buyExplan = this.shopExplan.value
      //
      
      const obj = {
        goods: this.goods,
        skuList: this.addShopType,
        shopId: config.appId,
        sessionId: value
      } 
      console.log('111')
      if(obj.skuList.length > 0){
        let str = ''
        for(var i=0,l;l=obj.skuList[i++];){
          str += l.attrIds + ','
        }
        //quchong
        function unique(arr) {
          const res = new Map();
          return arr.filter((a) => !res.has(a) && res.set(a, 1))
        }
        console.log(str)
        let arr = str.split(',')
        console.log(arr)
        arr = unique(arr)
        obj.attrIds = arr.join(',')
        console.log('111')
      }

      if(state == 0){
        //保存到仓库
        // this.$API.addShop(obj)
      } else {
        //上架 check
        console.log(this.goods.images)
        const checkArr = [{
          name: this.goods.images,
          errMsg: '至少添加一张图片！'
        },{
          name: this.goods.name,
          errMsg: '商品标题'
        },{
          name: this.goods.stallInfo1,
          errMsg: '市场档口'
        },{
          name: this.goods.costPrice,
          errMsg: '成本价'
        },{
          name: this.goods.profit,
          errMsg: '利润价'
        },{
          name: this.goods.deliveryId,
          errMsg: '货期排单'
        },{
          name: this.goods.labelIds,
          errMsg: '商品分类'
        }]
        const msg = this.$check.all(checkArr)
        if(msg){
          this.handleError(msg)
          return
        }

      }
      console.log(obj)
      //数据合并 
      // var mktArr = this.marketText.split('-') 
      // this.goods.stallInfo1 = mktArr[0]
      // this.goods.stallInfo2 = mktArr[1]
      // this.goods.stallInfo3 = mktArr[2]
      if(state == 2){
        //edit 
        await this.$API.editShop(obj)
        this.$success('修改成功！')
      } else {
        await this.$API.addShop(obj)
        this.$success('添加成功！')
      }
      
      setTimeout(()=>{
        //跳转到商品列表
        this.toRoute('home/shopMgr/shopMgr')
      },2000)

    },
    selectTagIds(name,item){
      //判断是否存在改val,存在则移除
      const val = item.id
      item.select = !item.select
      const arr = this[name].split(',')
      if(arr.indexOf(val)>=0) {
        //存在
        this[name] = this[name].replace(val+',','')
        this.tagText = this.tagText.replace(item.name+',', '')
      } else {
        this[name] += val + ',' 
        this.tagText += item.name+','
      }
      console.log(this[name])
      
    },
    async addTag(){
      if(!this.addTagText) return this.handleError('请输入标签！')
      const {data} = await this.$API.addShopTag({
        name: this.addTagText
      })
      this.addTagText = ''
      data.select = false
      this.tagData.push(data)

    },
    async confirmType(type){
      this.toClose(type)
      if(type == 'showType1') {
        if(!this.type1Text.id) return
        this.goods.labelInfo = this.type1Text.name
        // 获取2级分类
        const {data} = await this.getShopClass(2, this.type1Text.id)
        this.type2Data = data
        this.type3Data = []
        console.log(this.type2Data)
      }
      if(type == 'showType2') {
        if(!this.type2Text.id) return
        this.goods.labelInfo2 = this.type2Text.name
        //get 3级分类
        const {data} = await this.getShopClass(2, this.type2Text.id)
        this.type3Data = data
        console.log(this.type3Data)
      }
      if(type == 'showType3') {
        if(!this.type3Text.id) return
        this.goods.labelInfo3 = this.type3Text.name
      }
    },
    confirmOther(type){
      this.toClose(type)
      if(type == 'showTime') {
        //货期
        if(!this.timeText.id) return 
        this.goods.deliveryId = this.timeText.id
        this.goods.delivery = this.timeText.name
      }
      if(type == 'showTag') {
        //标签
        if(!this.tagIds) return
        this.goods.tag = this.tagIds
      }
    },
    confirmMarket(item){
      if(item) return this.selectTMarket = item
      this.goods.stallInfo1 = this.selectFMarket.name
      this.goods.stallInfo2 = this.selectSMarket.name
      this.goods.stallInfo3 = this.selectTMarket.name
      this.marketText = this.selectFMarket.name +'-'+this.selectSMarket.name +'-'+ this.selectTMarket.name
      this.toClose('showMarket')
    },

    selectTime(name){
      this.timeText = name
    },
    getVideo(src){
      this.goods.video = src
      // console.log(this.goods.video)
    },
    getImg(src){
      this.imageList.push(src)
    },
    changeImg(imgArr){
      this.imageList = imgArr
    },
    async getMarketData(series, item={}){
      //init
      const pid = item.id || ''
      if(pid) {
        if(series == 1) this.selectFMarket = item
        if(series == 2) this.selectSMarket = item
      } 
      if(series == 0){
        this.mktSecondData = {}
        this.mktThirdData = {}
      }
      if( series == 1 ){
        this.mktThirdData = {}
      }
      let {data} = await this.$API.searchMarket({
        //0市场  1大厦2 档口 pId
        series: series,
        pid: pid
      })
      if(data.length == 0) data = [{id: '',name: '无',isno: false}]
      if(series == 0) this.mktFirstData = data
      if(series == 1) this.mktSecondData = data
      if(series == 2) this.mktThirdData = data
      
    },
    getShopClass(types, pId=""){
      return this.$API.searchType({
        types: types,
        pId: pId
      })
    }
  }
  
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.input_p_left
  padding-left: 20%
  width: 80%!important
.box-select
  display: flex
  justify-content: center
  text-align: center
  .s_item
    flex: 1
    p
      padding: 10px 0
    .active
      color: #F67C2F

.text_left
  text-align: left!important
.modal_box
  +mask(#222222c7)

.shopType
  height: 150px!important
  

.hasType
  display: flex
  flex-wrap: wrap
  padding-left: 150px
  p
    width: 160px
    height: 50px
    line-height: 50px
    +singleFile()

.sel_box
  display: flex
  padding: 0 90px
  .sel_item
    flex: 1
    position: relative
    p
      // padding-left: 35px
      text-align: center
    .select
      +select(30px)
      
    .active
      +select-active
// .model
.modal_time
  position: fixed
  bottom: 0
  left: 0
  right: 0
  background: #fff
  box-shadow: 8px 4px 29px rgba(8,0,0,0.32)
  .content
    display: flex
    padding: 30px 24px
    font-size: 28px
    flex-wrap: wrap
    // justify-content: flex-start
    .item
      width: 200px
      height: 110px
      line-height: 110px
      margin: 0 15px 30px 18px
      background: #F5F5F5
      color: #333
      text-align: center
      border-radius: 6px
      box-sizing: border-box
    .tag_item
      width: 200px
      position: relative
      margin: 0 15px 30px 18px
      p
        padding-left: 45px
      .select
        +select(35px)
      .select-active
        +select-active
    .active
      background: #F2C2A3!important
      color: #F67C2F
      +border(1px,all,#EE7527)
  .add_line
    padding: 30px 45px
    display: flex
    .add_btn
      padding: 20px 40px
      color: #fff
      background: #FE703E
      border-radius: 4px
      font-size: 28px
      margin-left: 20px
    .add_input
      width: 480px
      height: 30px
      +border(1px,all,#ccc)
      border-radius: 4px
      padding: 15px 10px
      font-size: 28px
  .top
    display: flex
    text-align: center
    height: 108px
    line-height: 108px
    font-size: 28px
    +border(1px,bottom,#ccc)
    p
      flex: 1
    .cancel
      color: #999
    .confirm
      color: #F67C2F
    .title
      font-size: 32px




.l_desc
  width: 70%!important
.desc_left
  padding-left: 180px
  text-align: left!important
.m_tips
  color: #333
  padding: 20px 0
.edit_footer
  display: flex
  justify-content: center
  padding: 30px 0px
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
  left: 180px
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
    // right: 0
    width: 80%
    text-align: right
    right: 0
    // height: 89px
    +singleFile()
  .input_text
    height: 68px
    line-height: 108px
    padding: 20px  
</style>