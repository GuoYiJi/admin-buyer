<template>
  <div class="home">
    <div class="box_content">
      <div class="line b_line" @click="toOpen('showColor')">
        <p class="input">颜色：</p>
        <p class="blur">{{ selectColor.length > 0 ? selColor : '点击选择颜色'}}</p>
      </div>
      <div class="line b_line" @click="toOpen('showTag')" >
        <p class="input">尺码：</p>
        <p class="blur">{{ selectTag.length > 0 ? selTag : '点击选择尺码'}}</p>
      </div>
    </div>
      <div class="add_video">
        <div class="v_box">
          <div v-for="(item, index) in imgList" :key="index">
            <div class="add_videos">
              <div class="add img_list " v-if="item.img">
                <img class="item_img" :src="item.img" />
                <i class="cancel_shop" @click="toCancel(index)"></i>
                <div class="tips_bg">{{lineList[index].color + ' ' + lineList[index].tag}}</div>
              </div>
              <div class="add add_box" v-else>
                <div>
                  <p @tap="bindButtonTap(index)">{{lineList[index].color + ' ' + lineList[index].tag}}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="line_box">
        <div class="add_line b_line" v-for="(item, index) in lineList" :key="index">
          <p>{{item.color}}</p>
          <p>{{item.tag}}</p>
          <p class="num"><input v-model="item.num" min="0" class="input_num" /></p>
          <p class="del" @click="delLine(index)">删除</p>
        </div>
      </div>

      <!-- 弹出层  color标签-->
      <div class="modal_box"  v-if="showColor">
        <div class="modal_time">
          <div class="top">
            <p class="cancel" @click="toClose('showColor')">取消</p>
            <p class="title">选择颜色</p>
            <p class="confirm" @click="comfirmType('showColor')">确定</p>
          </div>
          <div class="content content_tag">
            <div class="tag_item"
              v-for="(item,index) in colorArr" :key="index"
              @click="selects(index,'colorArr')">
              <i class="select" :class="[item.select && 'select-active']"></i>
              <p>{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 弹出层  尺码标签-->
      <div class="modal_box" v-if="showTag">
        <div class="modal_time" >
        <div class="top">
          <p class="cancel" @click="toClose('showTag')">取消</p>
          <p class="title">选择尺码</p>
          <p class="confirm" @click="comfirmType('showTag')">确定</p>
        </div>
        <div class="content content_tag">
          <div class="tag_item"
            v-for="(item,index) in typeArr" :key="index"
            @click="selects(index,'typeArr')">
            <i class="select" :class="[item.select && 'select-active']"></i>
            <p>{{item.name}}</p>
          </div>
          <!-- <div class="tag_item">
            <i class="select"></i>
            <p>标签2标签1</p>
          </div>
          <div class="tag_item">
            <i class="select"></i>
            <p>标签1标签1</p>
          </div>
          <div class="tag_item">
            <i class="select"></i>
            <p>标签1标签1</p>
          </div> -->
        </div>
      </div>
      </div>

      <div class="bottom"></div>
      <div class="create">
        <p @click="confirm">确定</p>
      </div>
  </div>
</template>
<script>
import wx from "wx";
import ibox from "@/components/chooseImage";
import btn from "@/components/btn";
import mixin from "@/mixin";
import config from "@/config";
export default {
  mixins: [mixin],
  components: {
    ibox,
    btn
  },
  data() {
    return {
      typeText: "",
      colorText: "",
      showColor: false,
      showTag: false,
      selectColor: [],
      selectTag: [],
      imgList: [],
      lineList: [],
      colorArr: [
        // {
        //   color: "红色",
        //   select: false
        // },
      ],
      typeArr: [
        // {
        //   type: "s",
        //   select: false
        // },
      ]
    };
  },
  computed: {
    selColor(){
      return this.selectColor.join(',')
    },
    selTag(){
      return this.selectTag.join(',')
    }
  },
  methods: {
    comfirmType(type){
      this.toClose(type)
      if(type == 'showColor') {
        const corArr = []
        for(var i=0,l; l=this.colorArr[i++];){
          if(l.select) corArr.push(l.name)
        }
        this.selectColor = corArr
      }
      if(type == 'showTag'){
        const corArr = []
        for(var i=0,l; l=this.typeArr[i++];){
          if(l.select) corArr.push(l.name)
        }
        this.selectTag = corArr
      }
      this.addLine()
    },
    selects(start, name) {
      this.$set(this[name][start], "select", !this[name][start].select);
    },
    addLine() {
      if (this.selectColor.length > 0 && this.selectTag.length > 0) {
        let imgArr = [];
        let lineArr = [];
        for (var i = 0, j; (j = this.selectColor[i++]); ) {
          for (var k = 0, l; (l = this.selectTag[k++]); ) {
            const imgObj = {
              id: String(i) + String(k),
              img: ""
            };
            // add imgList
            imgArr.push(imgObj);
            const lineObj = {
              id: String(i) + String(k),
              color: j,
              tag: l,
              num: 100
            };
            lineArr.push(lineObj);
          }
        }
        this.imgList = imgArr;
        this.lineList = lineArr;
      }
    },
    delLine(id) {
      // console.log(this.imgList)
      // for(var i=0,j; j=this.imgList[i++];){
      //   if(j.id == id){
      //     console.log(j)
      this.lineList.splice(id, 1);
      this.imgList.splice(id, 1);

      // return
      //   }
      // }
    },
    bindButtonTap(index) {
      wx.showLoading();
      var that = this;
      wx.chooseImage({
        sizeType: "original",
        count: 1,
        success: function(res) {
          console.log(res);
          var tempFilePath = res.tempFilePaths;
          console.log(tempFilePath);
          for (var i = 0, l; (l = tempFilePath[i++]); ) {
            that.uploadImg(l, index);
          }
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    },
    toCancel(start) {
      // this.imgList.splice(start, 1);
      this.$set(this.imgList[start], "img", "");
    },
    uploadImg(tempFilePath, index) {
      var that = this;
      var location = tempFilePath.lastIndexOf('/') + 1;
      console.log(tempFilePath.slice(location).toString());
      wx.uploadFile({
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
          console.log(res);
          if (res.statusCode == 400) {
            that.handleError("上传的图片大小不能超过2m!");
          } else if (res.statusCode == 200) {
            const img = config.uploadImageUrl + "/img/" + tempFilePath.slice(location).toString();
            that.$set(that.imgList[index], "img", img);
          }
        },
        fail: function(err) {
          console.log(err);
        }
      });
    },
    confirm() {
      // console.log(this.imgList)
      // console.log(this.lineList)
      // 组合成skuList：[{
      //     skuCode:红,5cm
      //     stock:库存
      //     image:图片
      //     attrIds: colorId,sizeId
      //   }]
      //selectIds
      const colorIdFun = (color)=>{
        for(var i=0,l; l=this.colorArr[i++];){
          if(color == l.name) return l.id
        }
      }
      const sizeIdFun = (size)=>{
        for(var i=0,l; l=this.typeArr[i++];){
          if(size == l.name) return l.id
        }
      }
      let skuList = [];
      for (var i = 0, j; j = this.imgList[i++]; ) {
        // console.log(i)
        var obj = {
          skuCode: this.lineList[i - 1].color + "," + this.lineList[i - 1].tag,
          stock: this.lineList[i - 1].num,
          image: j.img,
          attrIds: colorIdFun(this.lineList[i - 1].color) + "," + sizeIdFun(this.lineList[i - 1].tag)
        };
        skuList.push(obj);
      }
      console.log(skuList)
      this.$store.commit("ADDSHOPTYPE", skuList);
      this.$router.back(-1);
      // this.toRoute("home/addShop/addShop");
      // console.log(skuList)
    }
  },
  async mounted() {
    const colorData = await this.$API.s_searchType({
      specId: 1
    })
    for(var i=0,l; l=colorData.data[i++];){
      l.select = false
    }
    this.colorArr = colorData.data
    const sizeData = await this.$API.s_searchType({
      specId: 2
    })
    for(var j=0,k; k=sizeData.data[j++];){
      k.select = false
    }
    this.typeArr = sizeData.data
    this.addLine();
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.modal_box
  +mask(#222222c7)
.input_num
  padding: 2px 4px
.line_box
  margin-top: 10px
  background: #fff
  .add_line
    display: flex
    padding: 25px
    p
      flex: 1
    .num
      +border(1px,all,#ccc)
      border-radius: 4px
    .del
      color: #F67C2F
      text-align: center
.v_box
  display: flex
  flex-wrap: wrap
  background: #fff
  padding: 20px
.add_videos
  padding: 5px 0px 5px 8px
  background: #fff
.create
  position: fixed
  bottom: 0
  left: 0
  right: 0
  z-index: 9
  p
    color: #fff
    background: #F67C2F
    text-align: center
    height: 98px
    line-height: 98px
    letter-spacing: 1px
.b_line
  +border(1px,bottom,#f5f5f5)
.box_content
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
    color: #000
    .red
      color: #FF0000
  .blur
    color: #999
    font-size: 28px
    +center
    left: 122px
    width: 100%
    text-align: left
    // height: 89px
    +singleFile()
  .input_text
    height: 68px
    line-height: 108px
    padding: 20px
.sel_box
  display: flex
  padding: 0 190px
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
  z-index: 999
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

.cancel_shop
  position: absolute
  +bg-img('shopMgr/cancel.png')
  right: 12px
  top: 12px
  +icon(50px)
  z-index: 1
  // background: #fff
  border-radius: 50px
.img_list
  margin-right: 20px
  margin-bottom: 20px
  position: relative
  .tips_bg
    position: absolute
    bottom: 0
    left: 0
    right: 0
    background: rgba(0,0,0,.5)
    color: #fff
    height: 46px
    line-height: 46px
    font-size: 24px


.item_img

.add_box
  background: #EAEAEA
  margin-right: 20px
  margin-bottom: 20px

.add
  +icon(200px)
  line-height: 200px
  text-align: center
  position: relative
  video
    +icon(200px)
.show_pro
  +center
  width: 200px
</style>
