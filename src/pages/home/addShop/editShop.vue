<template>
  <div class="home">
    <div class="add_video">
      <p class="a_title">请添加视频: (最多可添加1个)</p>
      <div class="v_box">
        <!-- <vbox @getVideo="getVideo" :videoStr="$route.query.video" /> -->
        <div v-if="videoSrc" class="add">
          <video :src="videoSrc" show-play-btn="false" objectFit="fill"  controls="false" ></video>
          <!-- <i class="cancel_shop" @click="toCancel()"></i> -->
          <!-- <p class="show_pro"><progress percent="20" show-info /></p> -->
        </div>
        <div class="add" @tap="bindButtonTap">
          <p v-if="videoSrc">更换视频</p>
          <p v-else>+视频</p>
        </div>
      </div>
    </div>
    <p class="a_title">请添加图片:(最多可添加15张)</p>
    <div class="add_image">
        <!-- <ibox @getImg="getImg" @changeImg="changeImg" :imgStr="$route.query.images" maxNum='15' uploadNum="5"/> -->
        <!-- <div v-for="(item, index) in imgList" :key="index" class="add" :style="{backgroundImage: 'url(' + item + ')'}"> -->
          <!-- <img :src="item" /> -->
          <!-- <i class="cancel_shop" @click="toCancel(index)"></i>
        </div> -->
        <div class="add_image__bd">
          <div class="uploader__file" v-for="(item, index) in imageList" :key="index">
            <div class="uploader__file-inner">
              <div class="add" :style="{backgroundImage: 'url(' + item + ')'}">
                <i class="cancel_shop" @click="toCancel(index)"></i>
              </div>
            </div>
          </div>
          <!-- <div v-for="(item, index) in imageList" :key="index"><image :src="item"></image></div> -->
          <div class="uploader__file">
            <div class="uploader__file-inner">
              <div class="addBtn" @tap="bindButtonTapImage">
                <p>+图片</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="line-box">
    </div>
    <div class="van-cell-group van-hairline--top-bottom">
      
      <div class="van-cell van-field">
        <div class="van-cell__title">商品标题</div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <input class="van-field__control" v-model="goods.name" placeholder="输入商品标题" type="text" />
          </div>
        </div>
      </div>
      <div class="van-cell van-cell--clickable" @click="toOpen('showMarket')">
        <div class="van-cell__title">市场档口</div>
        <div class="van-cell__value">
          <span class="van-ellipsis">{{goods.stallInfo1 ? goods.stallInfo1 +'-'+goods.stallInfo2 +'-'+ goods.stallInfo3  : '请选择市场档口'}}</span>
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-cell--clickable"  @click="toRoute('home/addShop/buyDesc', {id: shopExplan.id})">
        <div class="van-cell__title">采购说明</div>
        <div class="van-cell__value">
          <span class="van-ellipsis">{{shopExplan.value ? shopExplan.value : '请选择采购说明' }}</span>
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-field">
        <div class="van-cell__title">成本价</div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <input class="van-field__control" v-model="goods.costPrice" placeholder="输入成本价" type="digit" />
          </div>
        </div>
      </div>
      <div class="van-cell van-field">
        <div class="van-cell__title">利润</div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <input class="van-field__control" v-model="goods.profit" placeholder="输入利润" type="digit" />
            <div class="van-field__button">
              售价: <span>{{sellPrice}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="van-cell-group van-hairline--top-bottom">

      <div class="van-cell van-cell--clickable" @click="toOpen('showTime')">
        <div class="van-cell__title"><span>货期排单</span></div>
        <div class="van-cell__value"><span>{{goods.delivery ? goods.delivery : '请选择货期排单'}}</span></div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-cell--clickable" @click="toOpen('showType1')">
        <div class="van-cell__title"><span>品类</span></div>
        <div class="van-cell__value"><span>{{ goods.labelInfo2 ? goods.labelInfo + '-' + goods.labelInfo2: '选择品类'}}</span></div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-cell--clickable" :class="{ 'van-cell--sku': addShopType.length }" @click="handleTypeClick">
        <div class="van-cell__title"><span>规格与库存</span></div>
        <div class="van-cell__value">
          <div class="sku-items" v-if="addShopType.length > 0">
            <div class="sku-item" v-for="(item,index) in addShopType" :key="index" :style="{ display: isLoadmore ? 'block' : index > 2 ? 'none' : 'block' }">
              {{item.skuCode + '/' + item.stock}}
            </div>
            <div class="sku-item__loadmore" @click.stop="handleLoadmoreClick" v-if="addShopType.length > 3">{{ isLoadmore ? '收起' : '更多' }} <i class="van-icon van-icon-arrow" :class="{ 'van-cell__right-icon--down': isLoadmore }"></i></div>
          </div>
          <div v-else>
            点击选择规格与库存
          </div>
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>

      <div class="van-cell van-cell--clickable" v-for="(code, codeIndex) in type3Data" :key="codeIndex" @click="getNextLevlList(code.id, code.name, codeIndex)">
        <div class="van-cell__title"><span>{{code.name}}</span></div>
        <div class="van-cell__value">
          <span>{{versionName[codeIndex] ? versionName[codeIndex] : '点击选择' + code.name}}</span>
        </div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-cell--clickable" @click="toRoute('home/shopMgr/classify', {shopGroup: JSON.stringify(shopGroup)})">
        <div class="van-cell__title"><span>商品分组</span></div>
        <div class="van-cell__value"><span>{{shopGroup.groupText ? shopGroup.groupText : '选择分组'}}</span></div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-cell--clickable" @click="toOpen('showTag')">
        <div class="van-cell__title"><span>商品标签</span></div>
        <div class="van-cell__value" :style="{ textAlign: !goods.tag ? 'right' : 'left' }"><span>{{goods.tag ? tagText : '选择标签'}}</span></div>
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
      <div class="van-cell van-cell--clickable">
        <div class="van-cell__title"><span>支持转售</span></div>
        <div class="van-cell__value">
          <span>
            <div class="van-switch" style="font-size: 30px" :class="{ 'van-switch--on': goods.isTransfer === 1 }" @click="selectTransfer( goods.isTransfer === 0 ? 1 : 0 )">
              <div class="van-switch__node"></div>
            </div>
          </span>
        </div>
      </div>
      <div class="van-cell van-cell--clickable">
        <div class="van-cell__title"><span>置顶</span></div>
        <div class="van-cell__value">
          <span>
            <div class="van-switch" style="font-size: 30px" :class="{ 'van-switch--on': goods.isTop === 1 }" @click="selectTop( goods.isTop === 0 ? 1 : 0 )">
              <div class="van-switch__node"></div>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="line-box">
<!--       <div class="line b_line" @click="toOpen('showTime')">
        <p class="input">货期排单: </p>
        <p class="blur">{{goods.delivery ? goods.delivery : '请选择货期排单'}}</p>
      </div>
      <div class="line b_line" @click="toOpen('showType1')" >
        <p class="input">品类: </p>
        <p class="blur">{{ goods.labelInfo2 ? goods.labelInfo + '-' + goods.labelInfo2: '点击选择品类'}} </p>
      </div>
      <div class="line b_line shopType" @click="handleTypeClick">
        <p class="input">规格与库存: </p>
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
      <div class="line b_line" v-for="(code, codeIndex) in type3Data" :key="codeIndex" @click="getNextLevlList(code.id, code.name, codeIndex)">
        <p class="input">{{code.name}}</p>
        <p class="blur">{{versionName[codeIndex] ? versionName[codeIndex] : '点击选择' + code.name}}</p>
      </div> -->
      
      <!-- <div class="line b_line" >
        <p class="input">商品ID：</p>
        <p class="blur">123764B402</p>
      </div> -->
    </div>
    <div class="footer" id="footerContainer">
      <block v-if="!hasEditGoods">
        <p class="getUp" @click="save(1)">立即上架</p>
        <p class="getIn" @click="save(0)">保存到仓库</p>
      </block>
      <block v-else>
        <p class="getUp" @click="save(2)">确认修改</p>
      </block>
    </div>
<!--     <div class="edit_footer" v-else>
    </div> -->
    <!-- 弹出层 品类 -->
    <div class="modal_box" v-if="showType1">
      <div class="modal_time" >
        <div class="top">
          <p class="cancel" @click="toClose('showType1')">取消</p>
          <p class="title">{{clickNum === 0 ? '选择一级分类' : '选择二级分类'}}</p>
          <!-- 点击请求 关闭弹窗 -->
          <!-- <p class="confirm" @click="confirmType('showType1')">确定</p> -->
          <!-- @click="select('type1Text', item)" -->
          <p class="confirm" v-if="clickNum === 0"></p>
          <p class="confirm" v-else @click="reSelect()">重选</p>
        </div>
        <!-- 一级分类 -->
        <ul class="content" v-if="clickNum == 0">
          <li class="item"
            v-for="(item,idx) in type1Data"
            @click="confirmType('showType1', item)"
            :class="{ active: type1Text.id == item.id }"
            :key="idx">{{item.name}}
          </li>
        </ul>
        <!-- 二级分类 -->
        <ul class="content" v-else>
          <li class="item"
            v-for="(item,idx) in type2Data"
            v-if="clickNum !== 0"
            @click="toSelect('type2Text',item)"
            :class="[type2Text.id == item.id && 'active']"
            :key="idx">{{item.name}}
          </li>
        </ul>
        <button class="ok" v-show="clickNum !== 0" @click="confirmType('showType2')">确定</button>
      </div>
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
          :class="{ 'active': timeText.id == item.id }"
          :key="idx">{{item.name}}</li>
        </div>
      </div>
    </div>
    <!-- 弹出层 版型 或 面料类型 -->
    <div class="modal_box" v-for="(item,idx) in type3Data" :key="idx" v-if="versionId === item.id">
      <div class="modal_time">
        <div class="top">
          <p class="cancel" @click="closeVersion(item.id)">取消</p>
          <p class="title">选择{{item.name}}</p>
          <p class="confirm" @click="selectName(type3Text, idx)">确定</p>
        </div>
        <div class="content">
          <!-- <li class="item" @click="select('type3Text','现货')" :class="[type3Text == '现货' && 'active']" >现货</li> -->
          <li class="item"
          v-for="(type, typeIndex) in item.type4Data"
          :key="idx"
          @click="selectItem(type, idx)"
          :class="{ active: item.checkedId == type.id }"
          >{{type.name}}</li>

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
    <view class="progress-item" v-show="showProgress">
      <i-progress :percent="progressValue" hide-info></i-progress>
    </view>
    <i-modal :visible="topTips" @ok="setTop('topTips')" @cancel="toClose('topTips')">
        <div class="m_tips">已有置顶商品，是否更换置顶商品？</div>
    </i-modal>
    <!-- <div>
      <i-modal :visible="backTips" @ok="toClose('backTips')" @cancel="toClose('backTips')">
          <div class="m_tips">您尚未完善商品信息，确认退出？</div>
      </i-modal>
    </div> -->

  </div>
</template>
<script>
import wx from "wx";
// import vbox from '@/components/chooseVideo'
// import ibox from '@/components/chooseImage'
import mixin from '@/mixin'
import config from '@/config'
import { $getUrl } from '@/utils'
import { mapState , mapGetters } from 'vuex'
export default {
  mixins: [mixin],
  components: {
    // vbox,
    // ibox
  },
  data() {
    return {
      footerContainerHeight: 0,
      isLoadmore: false,
      topTips: false,
      isTopBool: false,
      showProgress: false, // 上传进度条
      progressValue: 0, // 进度百分比
      videoSrc: '',
      uploadNum: 9,
      maxNum: 15,
      imgStr: '',
      imgList: [],
      versionId: '',//弹窗标题
      versionName: [],//选择的品种类型
      clickNum: 0, //品类选择点击次数记录
      editType: false,
      // backTips: false,
      showTime: false,
      showType: false,
      // showMaterial: false,
      showTag: false,
      sellType: true,
      showMarket: false,
      showType0: false,
      showType1: false,
      showType2: false,
      showType3: false,
      type1Data: [],
      type2Data: [],
      type3Data: [],
      type4Data: [],
      tagIds: '',
      tagText: '',
      // materialText: '',
      type0Text: '',
      type1Text: '',
      type2Text: '',
      type3Text: '',
      type4Text: '',
      timeText: {

      },
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
      otherData: [],
      otherData2: [],//品类二级专用数据
      groupData: [],
      groupVal: '',

      addTagText: '',
      tagData: '',
      goods: {
        isTop: 0, // 是否置顶
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
        isTransfer: 1, //'0不可转发 1可以转发',
        // parameter: '',//商品参数
        images: '', //轮播图片
        video: '',//商品视频
        content: '',//商品详情
        // sellPrice: this.costPrice+ this.profit,
        costPrice: '', //'成本价',
        profit: '', //'利润',
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
    ],
    hasEditGoods: false,
    goodsLabelValueIds: [],//面料，版型等值的ID拼接  格式:绵Id,紧身Id
    postLabelInfo: [], //商品分类 一级品类 上衣
    postLabelInfo2: [], //商品二级以下分类  女装,面料,棉,版型,紧身
    groupValue: [], //商品详情的分组信息
    };
  },
  computed: {
    sellPrice(){
      if(this.goods.costPrice && this.goods.profit) {
        this.goods.sellPrice = (Number(this.goods.costPrice) + Number(this.goods.profit)).toFixed(2)
        return this.goods.sellPrice + '元'
      }
      return '0.00元'
    },
    ...mapState([
      'addShopType',
      'shopGroup',
      'shopExplan'
    ]),
  },
  async mounted() {
    const { shopId } = this.$route.query;
    // this.hasGoodsthis.$route.query.shopId
    this.hasEditGoods = !!shopId;
    wx.setNavigationBarTitle({
      title: shopId ? '编辑商品' : '添加商品'
    })
    //get 排期 品类 版型 面料 分组 标签
    const { data: searchType } = await this.$API.searchType({
      types: '1,2,3,4'
    })
    
    console.log(searchType)

    this.otherData = searchType;

    this.type1Data = searchType.filter(item => {
      return parseInt(item.typeId) === 2
    })
    // this.type2Data = searchType.filter(item => parseInt(item.typeId) === 3);
    // this.type3Data = searchType.filter(item => parseInt(item.typeId) === 4);

    //get searchMarket
    this.getMarketData(0)
    if (shopId) {
      const response = await this.$API.L_selectGoodsDetail({
        goodsId: this.$route.query.shopId
      })

      this.$store.commit('ADD_GOODS_DETAIL', response.data);

      // this.goodsLabelValueIds
      let labelList = []
      let goodsLabel = response.data.goodsLabel;

      goodsLabel.forEach((item, index) => {
        this.versionName[index] = item.labelValue;
        this.goodsLabelValueIds.push(item.labelVId);
      })
      let skuList = response.data.sku.skuList
      skuList.forEach(item => {
        let skuList = []
        skuList.push({
          skuCode: item.skuCode,
          stock: item.stock,
          image: item.image,
          attrIds: item.attrIds
        })
      })

      this.$store.commit('ADDSHOPTYPE', skuList)
      
      this.videoSrc = response.data.video;
      this.imageList = response.data.images.split(',').filter(item => !!item).concat(response.data.content.split(',').filter(item => !!item))
      this.goods.state = response.data.state;
      this.goods.name = response.data.name //商品名称
      this.goods.stallInfo1 = response.data.stallInfo1//档口一级
      this.goods.stallInfo2 = response.data.stallInfo2//档口二级
      this.goods.stallInfo3 = response.data.stallInfo3//档口三级
      this.goods.content = response.data.content //商品详情
      this.goods.delivery = response.data.delivery//货期
      this.goods.labelInfo = response.data.labelInfo
      this.goods.labelInfo2 = response.data.labelInfo2
      this.goods.labelInfo3 = response.data.labelInfo3
      this.goods.deliveryId = response.data.deliveryId
      this.goods.labelIds = response.data.labelIds
      this.goods.buyExplan = response.data.buyExplan
      this.goods.buyExplanId = response.data.buyExplanId
      this.goods.tag = response.data.tag
      this.tagIds = response.data.tag
      this.goods.id = shopId;
      
      if(response.data.tagsList) {
        let tagsList = response.data.tagsList
        let ids = []
        let text = []
        tagsList.forEach(item => {
          ids.push(item.id)
          text.push(item.name)
          // if(item.id ===)
        })
        this.goods.tag = ids.toString()
        this.tagIds = ids.toString()
        this.tagText = text.toString()
      }
      this.clickNum = 1;
      response.data.labelList.forEach((item, index) => {
        this[`type${index + 1}Text`] = item;
      })

      const { data: type2Data } = await this.getShopClass(2, this.type1Text.id)
      this.type2Data = type2Data;
      const { data: type3Data } = await this.getShopClass(2, this.type2Text.id);
      console.log(goodsLabel);
      this.type3Data = type3Data.map((item, index) => {
        if (goodsLabel[index]) {
          item.selectedId = goodsLabel[index].labelVId;
        }
        return item;
      });
      // this.versionName =
      // this.goods.groupIds = response.data.groupList
      // response.data.labelList //分类
      this.groupValue = response.data.groupList // 分组
      this.goods.profit = response.data.profit //利润
      this.goods.costPrice = response.data.costPrice //成本
      // response.data.buyExplan //采购说明
      this.$store.commit("ADDSHOPEXPLAN", {value : response.data.buyExplan, id: response.data.buyExplanId});//采购说明
      let groupIds = [];
      let groupTexts = [];
      response.data.groupList.forEach(item => {
        groupIds.push(item.id);
        groupTexts.push(item.name)
      })// 商品分组
      
      this.$store.commit('ADDSHOPGROUP', {
        groupIds: groupIds.join(','),
        groupText: groupTexts.join(',')
      })
      this.$set(this.goods, 'isTransfer', response.data.isTransfer);
      this.$set(this.goods, 'isTop', response.data.isTop);
      // this.$store.commit("ADDSHOPEXPLAN", this.select)
      // response.data.
      // response.data.
      // response.data.

      //check editShop
      if(this.$route.query.id){
        //数据注入
        this.editType = true
        this.goods = this.$route.query
      }
      searchType.filter(item => item.typeId == 4).some(item => {
        if (item.id === this.goods.deliveryId) {
          this.timeText = Object.assign({}, item);
          return true;
        }
      })
    } else {
      searchType.filter(item => item.typeId == 1).some(item => {
        this.$store.commit('ADDSHOPGROUP', {
          groupIds: item.id,
          groupText: item.name
        });
        return true;
      });
      this.$store.commit('ADDSHOPTYPE', []);
      this.$store.commit('ADDSHOPEXPLAN', {});
      this.$store.commit('ADD_GOODS_DETAIL', {});
      this.goods.video = ''
      this.goods.imageList = []
      this.goods.images = ''
      this.imgList = [];
    }
    
    //过滤tagData
    let tagArr  = [];
    this.tagText = '';
    this.tagIds = '';
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
    this.tagData = tagArr;
  },
  onUnload() {
    Object.assign(this, this.$options.data());
  },
  methods: {
    handleLoadmoreClick() {
      this.isLoadmore = !this.isLoadmore;
    },
    // 添加规格或编辑规格
    handleTypeClick() {
      this.$router.push({
        path: '/pages/home/addShop/addType',
        query: {
          goodsId: this.$route.query.shopId
        }
      })
    },
    setTop(name) {
      this[name] = false
      this.setData({
        isTopBool: true
      });
      this.goods.isTop = 1;
    },
    selectTop(type) {
      this.$API.selectTopGoods()
        .then(res => {
          if (res.data) {
            this.topTips = true
          } else {
            console.log(type);
            this.$set(this.goods, 'isTop', type);
          }
        })
    },
    onChange({ mp: { detail } }) {
      if (this.isTopBool == false) {
        this.$API.selectTopGoods().then(response => {
          if(response.data) {
            this.topTips = true
          }
        })
      } else if (this.isTopBool == true) {
        this.setData({
          isTopBool: detail.value
        });
        this.goods.isTop = 0;
        console.log(this.goods.isTop);
      }
    },
    setData(data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key];
      });
    },
    toSelect (name, value) {
      this[name] = value
      this.clickNum = 2
    },
    //上传图片
    uploadImg(tempFilePath) {
      return new Promise((resolve) => {
        var location = tempFilePath.lastIndexOf('/') + 1;
        var that = this;
        const uploadTask = wx.uploadFile({
          url: config.uploadImageUrl,
          filePath: tempFilePath,
          name: "file",
          formData: {
            name: tempFilePath.slice(location).toString(),
            key: "img/${filename}",
            policy: config.imgPolicy,
            OSSAccessKeyId: config.OSSAccessKeyId,
            success_action_status: "200",
            signature: config.imgSignature
          },
          success: function(res) {
            if (parseInt(res.statusCode) == 400) {
              that.handleError("上传的图片大小不能超过2m!");
            } else if (parseInt(res.statusCode) == 200) {
              resolve(config.uploadImageUrl + "/img/" + tempFilePath.slice(location).toString())
              // that.imgList.push(
              //   config.uploadImageUrl + "/img/" + tempFilePath.slice(location).toString()
              // );
              // that.getImg(config.uploadImageUrl + "/img/" + tempFilePath.slice(location).toString())
              // that.$emit('getImg', config.uploadImageUrl + "/img" + tempFilePath.substring(10))
            }
          },
          fail: function(err) {
            reject();
          }
        })
      })
      // uploadTask.onProgressUpdate((res) => {
      //   if(res.progress === 100) {
      //     wx.showToast({
      //       title: '上传完成'
      //     })
      //   }
      // })
    },
    //控制添加图片张数
    bindButtonTapImage() {
      const maxNum = this.maxNum;
      // wx.showLoading({
      //   title: '加载中',
      // });
      var that = this;
      // if ( maxNum && this.imageList.length >= maxNum) {
      //   this.handleError(`不能超过${maxNum}张图片噢！`);
      //   wx.hideLoading();
      //   return;
      // }
      //选择图片
      wx.chooseImage({
        sizeType: "original",
        count: 15 - this.imageList.length,
        success: function(res) {
          var tempFilePath = res.tempFilePaths;
          let promiseAll = [];

          tempFilePath.forEach(item => {
            promiseAll.push(that.uploadImg(item));
          })
          wx.showLoading({
            title: '上传中'
          })
          Promise.all(promiseAll)
            .then(res => {
              that.imageList.push(
                ...res
              );
              // that.getImg(config.uploadImageUrl + "/img/" + tempFilePath.slice(location).toString())
            })
            .catch(err => {
              wx.showToast({
                title: '网络出错',
                icon: 'none'
              })
            })
            .finally(() => {
              wx.hideLoading();
            })
        },
        fail: function() {
          // wx.showLoading({
          //   title: '操作失败',
          // })
        },
        complete: function() {
          // wx.hideLoading();
        }
      });
    },
    // 报错信息
    handleError(msg) {
      this.$Message({
        content: msg,
        type: "error"
      })
    },
    //删除图片
    toCancel(start) {
      // this.imgList.splice(start, 1);
      this.imageList.splice(start, 1);
      console.log('this.imageList =========>', this.imageList);
      // this.$emit('changeImg',this.images)
    },
    //添加视频
    bindButtonTap() {
      wx.showLoading();
      console.log(111)
      var that = this;
      wx.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: ["front", "back"],
        success: function(res) {
          console.log(res);
          var tempFilePath = res.tempFilePath;
          var location = tempFilePath.lastIndexOf('/') + 1;
          const uploadTask = wx.uploadFile({
            url: config.uploadImageUrl,
            filePath: tempFilePath,
            name: "file",
            formData: {
              name: tempFilePath.slice(location).toString(),
              key: "video/${filename}",
              policy: config.videoPolicy,
              OSSAccessKeyId: config.OSSAccessKeyId,
              success_action_status: "200",
              signature: config.videoSignature
            },
            success: function(res) {
              console.log(res);
              if (res.statusCode == 400) {
                that.handleError("上传的视频大小不能超过20m!");
              } else if (res.statusCode == 200) {
                that.videoSrc = config.uploadImageUrl + "/video/" + tempFilePath.slice(location).toString();
                // that.emitSub();
                that.getVideo(that.videoSrc);
              }
            },
            fail: (err)=>{
              this.handleError('上传失败，错误原因： '+err.errMsg)
              console.log(err)
            }
          });
          // that.src =
          // setTimeout(()=>{
          //   that.src = config.uploadImageUrl + '/video' + tempFilePath.substring(10)
          //   console.log(that.src)
          // },3000)
          // that.src = res.tempFilePath
          that.toggleProgress()
          uploadTask.onProgressUpdate((res) => {
            console.log(res.progress);
            that.progressValue = res.progress
            if(that.progressValue === 100) {
              that.toggleProgress()
              wx.showToast({
                title: '上传完成'
              })
              that.progressValue = 0
            }
          })
        },
        fail: (err)=>{
          this.handleError('上传失败，错误原因： '+err.errMsg)
          console.log(err)
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    },
    // 关闭弹窗
    closeVersion(id) {
      this.versionId = 0
    },
    //获取版型或面料等内部选项
    async getNextLevlList(id, name, index) {

      // this.toOpen('showType3')
      // this.versionTitle = title
      this.versionId = id
      //get 4级分类
      const {data} = await this.getShopClass(2, id);
      this.$set(this.type3Data[index], 'type4Data', data);
      if (this.type3Data[index].selectedId) {
        this.$set(this.type3Data[index], 'checkedId', this.type3Data[index].selectedId);
      };
      this.postLabelInfo2[index] = name;
    },
    //选择的值
    selectItem(item, index) {
      console.log(item);
      this.select('type3Text', item);
      this.$set(this.type3Data[index], 'checkedId', item.id);
      // this.versionName[index] = item
    },
    selectName(item, index) {
      console.log('name' + item.name);
      this.versionName[index] = item.name
      this.goodsLabelValueIds[index] = item.id
      // this.labelInfo2[index] = item.name
      // console.log(this.versionName);
      this.$set(this.type3Data[index], 'selectedId', item.id);
      this.closeVersion(item.id)

      // console.log(this.goodsLabelValueIds);
      // console.log(this.labelInfo2);
    },
    //重选
    reSelect() {
      this.clickNum = 0
    },

    // 请求
    async save(state){
      var value = await wx.getStorageSync(`${process.env.NODE_ENV}_sessionId`)
      // if(this.goods.name.split('').length > 18) {
      //   this.handleError('标题最多不能超过18个字符')
      // }
      if( this.imageList.length > 0){
        this.goods.image = this.imageList[0];
        this.goods.images = this.imageList.slice(0, 3).join(',')
      }
      if(this.imageList.length > 3){
        this.goods.content = this.imageList.slice(3).join(',')
      }
      let labelIds = [];
      if(this.type1Text.id){
        labelIds.push(this.type1Text);
        this.goods.labelIds = this.type1Text.id + ','
      }
      if(this.type2Text.id){
        labelIds.push(this.type2Text);
        this.goods.labelIds += this.type2Text.id + ','
        console.log('this.goods.labelIds=>'+ this.goods.labelIds);
      }
      if(this.type3Text.id){
        labelIds.push(this.type3Text);
        this.goods.labelIds += this.type3Text.id + ','
      }
      this.goods.groupIds = this.shopGroup.groupIds
      //add buyExplan
      this.goods.buyExplanId = this.shopExplan.id
      //

      // const labelInfoCC = []
      // this.postLabelInfo2.forEach(item => {
      //   labelInfoCC.push(item)
      //   this.versionName.forEach(ite => {
      //     labelInfoCC.push()
      //   })
      // })

      // const obj = {
      //   goods: this.goods,
      //   skuList: this.addShopType,
      //   shopId: config.appId,
      //   sessionId: value
      // }
      
      const account = wx.getAccountInfoSync();
      const { miniProgram: { appId } } = account;
      const obj = {
        goodsLabelValueIds: this.goodsLabelValueIds.toString(),
        goods: {
          ...this.goods,
          video: this.videoSrc,
          state: this.hasEditGoods ? this.goods.state : state
        },
        skuList: this.addShopType,
        sessionId: value,
        shopId: appId,
      }

      obj.name = this.name
      obj.labelInfo = this.goods.labelInfo
      obj.labelInfo2 = [this.goods.labelInfo2].concat(this.versionName).concat(this.postLabelInfo2).join(',');
      obj.labelInfo3 = this.versionName.toString();
      obj.isTop = this.isTop;
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
        obj.attrIds = arr.filter(item => !!item).join(',');
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
        // this.toRoute('home/shopMgr/shopMgr')
        wx.setStorageSync('is-update-goods', true);
        this.$router.back(-1)
      }, 2000)

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
      console.log('选择后的tagdata ===========> ', this.tagData);

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
    // 点击确定请求
    async confirmType(type, item){
      // 请求一级品类, 获取二级品类
      if(type == 'showType1') {
        //恢复默认
        this.postLabelInfo2 = []
        this.versionName = []
        // this.toClose(type)
        this.select('type1Text', item)
        this.clickNum = 1;
        if(!this.type1Text.id) return
        this.goods.labelInfo = this.type1Text.name
        console.log('this.goods.labelInfo' + this.goods.labelInfo);
        // 获取2级分类
        const { data } = await this.getShopClass(2, this.type1Text.id);
        console.log(data);
        this.type2Data = data;
        this.type3Data = [];
      }
      // 请求一级品类, 获取三级品类, 判断是否有"版型"和"面料"
      if(type == 'showType2') {
        if(this.clickNum !== 2) {
          this.handleError('未选择二级分类')
          return
        }
        //恢复默认
        this.postLabelInfo2 = []
        this.versionName = []

        this.toClose('showType1')
        if(!this.type2Text.id) return
        this.goods.labelInfo2 = this.type2Text.name
        console.log('this.goods.labelInfo2' + this.goods.labelInfo2);
        //get 3级分类
        const {data} = await this.getShopClass(2, this.type2Text.id)
        this.type3Data = data
      }
      // if(type == 'showType3') {
      //   this.toClose(type)
      //   if(!this.type3Text.id) return
      //   this.goods.labelInfo3 = this.type3Text.name
      // //   //get 4级分类
      // //   const {data} = await this.getShopClass(2, this.type3Text.id)
      // //   this.type4Data = data
      // //   console.log(this.type4Data)
      // }
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
      console.log("imageList ===> ", this.imageList);
    },
    // 切换显示隐藏进度条
    toggleProgress() {
      this.showProgress = !this.showProgress
    },
    // changeImg(imgArr){
    //   this.imageList = imgArr
    // },
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
    },
    selectTransfer(type) {
      this.$set(this.goods, 'isTransfer', type);
    }
  },

};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.home
  padding-bottom: 149px;
.van-cell-group
  margin-top: 20px;
  &:first-child
    margin-top: 0;
.van-cell--sku
  .van-cell__title
    flex: none;
  .van-cell__value
    text-align: left;
    .sku-items
      padding-left: 15px;

.progress-item
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .3)
  position: fixed
  left: 0
  right: 0
  top: 0
  margin: auto
  z-index: 100
  ._i-progress
    width: 80%
    position: absolute
    left: 0
    right: 0
    top: 200px
    margin: auto

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
  button.ok
    width: 400px
    padding: 20px 0
    margin: 30px auto 42px
    border-radius: 35px
    color: #ffffff
    background-color: #F67C2F


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
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  height: 149px;
  // line-height: 90px;
  padding: 30px 70px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  p
    flex: 1;
    margin-right: 10px;
    color: #fff
    font-size: 32px
    background: #ccc
    text-align: center
    border-radius: 6px
    height: 90px;
    line-height: 90px;
    &:last-child
      margin-right: 0;
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
.a_title
  color: #666
  padding: 20px
  background: #fff
.add_video
  background: #fff
  padding: 20px
  .v_box
    .add
      background: #EAEAEA
      +icon(200px)
      line-height: 200px
      text-align: center
      margin: 0 20px 20px 0
      video
        +icon(200px)
    .show_pro
      +center
      width: 200px
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
.uploader__file
  float: left
  padding: 0 10px;
  width: 33.333333%;
  box-sizing: border-box;
  &-inner
    position: relative;
    z-index: 1;
    width: 100%;
    padding-top: 100%;
    margin-bottom: 20px;
  // margin: 0 20px 20px 0
.add_image
  background: #fff
  display: flex;
  padding: 20px 10px;
  &__bd
    width: 100%;
    margin-bottom: -20px;
    overflow: hidden;
  .add,.addBtn
    background-position: center
    background-repeat: no-repeat
    background-size: cover
  .addBtn
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #EAEAEA
    display: flex
    align-items: center
    justify-content: center
    font-size: 28px
  .add
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .cancel_shop
      position: absolute
      top: 10px
      right: 10px
      width: 50px
      height: 50px
      border-radius: 50%
      background: url("~@/assets/img/shopMgr/cancel.png") no-repeat center
      background-size: 100% 100%
</style>
