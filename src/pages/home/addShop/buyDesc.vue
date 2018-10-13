<template>
  <div class="home">
    <div class="content" >
      <div class="adr-card"
      v-for="(item,idx) in shopData"
      :key="idx"
      @click="selectAct(item)">
        <div class="adr">
          <i class="select" :class="[select.id == item.id && 'active'] " ></i>
          <p class="adr-text">{{item.value}}</p>
        </div>
      </div>
      <!-- <div class="adr-card" @click="selectAct(2)">
        <div class="adr">
          <i class="select" :class="[select == 2 && 'active'] " ></i>
          <p class="adr-text">运送到上海、江苏、浙江山歌、安徽省和江西省；售件1kg，运费10.00元；续重1件，运费5.00元</p>
        </div>
      </div> -->
    </div>
    <p class="bottom"></p>
    <p class="save" @click="goback" :disabled="!select">保存</p>
  </div>
</template>
<script>
import wx from "wx";
import { $getUrl } from "@/utils";
export default {
  components: {},
  data() {
    return {
      select: {},
      shopData: []
    };
  },
  methods: {
    selectAct(item) {
      this.select = item;
    },
    goback() {
      //set group to vuex addshop
      this.$store.commit("ADDSHOPEXPLAN", this.select);
      this.$router.back(-1)
      // this.$router.push({
      //   path: "/" + $getUrl(),
      // });
    }
  },
  async mounted() {
    const { data } = await this.$API.searchBuyExplan({
      type: 3
    });
    this.shopData = data;
    if(this.$route.query.id) {
      // this.select.id = this.$route.query.id
      console.log(this.$route.query.id);
      this.select = {id: this.$route.query.id}
      // this.$store.commit("ADDSHOPEXPLAN", {id: this.$toute.query.id});
    }
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.content
  padding-bottom: 100px
  font-size: 28px
  color: #666
.save
  position: absolute
  bottom: 0
  left: 0
  right: 0
  color: #fff
  background: #F67C2F
  height: 98px
  line-height: 98px
  text-align: center
  letter-spacing: 1px
.adr-card
  padding: 38px 75px 38px 90px
  margin-bottom: 10px
  position: relative
  background: #fff
  .user
    color: #000
    padding-bottom: 20px
  .adr
    color: #666
    font-size: 28px
    position: relative
  .select
    +select(40px)
    left: -65px
    +center
  .active
    +select-active

</style>
