<template>
  <div class="wrapper manage-adr">
    <scroll-view scroll-y style="height: 100vh;" @scrolltolower="lower" >
    <div class="content">
      <div class="adr-card" v-for="(item,index) in shopList" :key="index">
        <div class="user">
          <p class="name">{{item.name}}</p>
          <p class="iphone">{{item.mobile}}</p>
        </div>
        <div class="adr">
          <p class="adr-text">{{item.value + item.address}}</p>
        </div>
        <div class="adr-btn">
          <div class="text" @click.stop="selects(item,index)"><i class="select" :class="[item.isChoice == 1 && 'active']"></i>默认地址</div>
          <div class="btn-box">
            <p @click="toEdit(item)" ><i class="edit"></i>编辑</p>
            <p @click="confirmDel(item.id,index)"><i class="del"></i>删除</p>
          </div>
        </div>
      </div>
    </div>
    <i-modal :visible="visible2" @ok="handleDel" @cancel="toClose('visible2')">
      <div>确认删除？</div>
    </i-modal>
    <div class="loading" v-if="canLoad">
      <div v-if="showLoad"><loading  /></div>
    </div>
    <!-- <div class="v-else"></div> -->
    </scroll-view>
    <div class="footer">
      <p class="add-adr" @click="toRoute('home/storeMgr/storeAdr/addAdr')">添加退货地址</p>
    </div>
  </div>
</template>
<script>
import btn from "@/components/btn";
import loading from "@/commond/loading";
import mixin from "@/mixin";
export default {
  mixins: [mixin],
  data() {
    return {
      idx: false,
      visible2: false,
      shopNum: 0,
      shopList: [],
      showLoad: false,
      canLoad: true,
      selectAdr: "",
      delIndex: ''
    };
  },
  components: {
    btn,
    loading
  },
  methods: {
    selects(adr, index) {
      //set default adr
      if (adr.isChoice == 1) return;
      for (var i = 0, j; (j = this.shopList[i++]); ) {
        if (j.isChoice == 1) {
          j.isChoice = 0;
          break;
        }
      }
      adr.isChoice = 1;
      //set Adr
      this.$API.editAdr({
        addressId: adr.id,
        isChoice: 1
      });
    },
    toEdit(item){
      // this.$store.commit('EDITADR',item)
      this.$router.push({path: '/pages/home/storeMgr/storeAdr/editAdr', query: {addressInfo: JSON.stringify(item)}})
    },
    confirmDel(id,index) {
      this.selectAdr = id;
      this.visible2 = true;
      this.delIndex = index
    },
    async handleDel(index) {
      this.visible2 = false;
      console.log(this.selectAdr);
      //del
      await this.$API.delAdr({
        addressId: this.selectAdr
      });
      this.shopList.splice(this.delIndex, 1);
      this.$success("删除成功！");
    },
    getNextPage() {
      var obj = {
        pageSize: 8
      };
      this.shopNum++;
      obj.pageNumber = this.shopNum;
      return this.$API.getAdr(obj);
    },
    async lower(e) {
      // console.log(e);
      if (!this.canLoad) return;
      if (this.showLoad) return;
      this.showLoad = true;
      const listData = await this.getNextPage();
      setTimeout(() => {
        if (listData.data.list.length < 8) {
          this.canLoad = false;
        }
        this.shopList = this.shopList.concat(listData.data.list);
        this.showLoad = false;
      }, 2000);
    }
  },
  async mounted() {
    this.shopNum = 0;
    const listData = await this.getNextPage();
    this.shopList = listData.data.list;
    if (listData.data.list.length < 8) {
      this.canLoad = false;
    }
  },
  async onShow() {
    this.shopNum = 0;
    const listData = await this.getNextPage();
    this.shopList = listData.data.list;
    if (listData.data.list.length < 8) {
      this.canLoad = false;
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.loading
  height: 70px
.content
  padding: 20px 15px
  background: #f3f2f3
.adr-card
  background: #fff
  border-radius: 6px;/*no*/
  padding: 20px 24px
  font-weight: 600
  margin-bottom: 20px
  .adr-btn
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 20px
    .text
      display: flex
      align-items: center
      text-align: left
      width: 220px
      +singleFile
      .select
        display: inline-block
        width: 40px
        height: 40px
        border-radius: 50%
        border: 1px solid #CCCCCC
        margin-right: 20px
      .active
        background-image: url('~@/assets/img/storeMgr/select.png')
        background-size: 100% 100%
        border: none!important
    .btn-box
      display: flex
      justify-content: space-between
      align-items: center
      font-size: 27px
      color: #333
      p
        flex: 1
        display: flex
        align-items: center
        .edit
          +bg-img('storeMgr/edit-adr.png')
          +icon(24px)
          margin-right: 10px
        .del
          +bg-img('storeMgr/del-adr.png')
          +icon(24px)
          margin-right: 10px

  .user
    display: flex
    height: 60px
    line-height: 60px
    color: #000
    .iphone
      padding-left: 80px
  .adr
    position: relative
    font-size: 23px
    .adr-text
      letter-spacing: 1px
      text-align: left
      padding-bottom: 20px
      +border(1px,bottom)

.manage-adr
  background: #f3f2f3
.footer
  position: absolute
  bottom: 0
  left: 0
  right: 0
  height: 98px
  line-height: 98px
  color: #fff
  text-align: center
  background: #F67C2F

</style>
