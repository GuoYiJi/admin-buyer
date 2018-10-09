<template>
<div class="nav">
  <p class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis
    dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
  <form>
    <input class="name" v-model.lazy="name" type="text" placeholder="请输入您的称呼">
    <input class="phone" v-model.lazy="phone" type="tel" placeholder="请输入您的电话">
    <!-- <input class="identity" v-model.lazy="identity" type="text" placeholder="请选择您的身份"> -->
    <div class="identity">
      <picker @change="onChange" :value="index" :range="selectList">
        <span class="picker">
          {{index !== -1 ? selectList[index] : '请选择您的身份'}}
        </span>
      </picker>
    </div>
    <input class="referrer" v-model.lazy="referrer" type="tel" placeholder="请输入推荐人电话">
    <span class="btn" @click="prosave()">申请小程序</span>
  </form>
</div>
</template>
<script>
import wx from "wx";
export default {
  components: {},
  data() {
    return {
      name: "",
      phone: "",
      identity: "",
      referrer: "",
      selectList: [],
      index: -1,
    };
  },
  methods: {
    onChange(e) {
      this.index = e.mp.detail.value
    },
    async prosave() {
      console.log(this);
      if (
        this.name != "" &&
        this.phone != "" &&
        this.identity != "" &&
        this.referrer != ""
      ) {
        var prosave = await this.$API.prosave({
          name: this.name,
          mobile: this.phone,
          formMetaId: this.identity,
          tmobile: this.referrer
        });
        wx.showToast({
          title: "申请成功",
          icon: "success",
          duration: 2000
        });
      } else if (
        this.name == "" &&
        this.phone == "" &&
        this.identity == "" &&
        this.referrer == ""
      ) {
        wx.showToast({
          title: "请填写内容",
          icon: "loading",
          duration: 2000
        });
      }
      console.log(prosave);
      // this.prosaveList = prosave.data.list;
    }
  },
  mounted() {
    this.$API.prometaList({
      type: 2
    }).then(response => {
      response.data.forEach(item => {
        this.selectList.push(item.name)
      })
      console.log(this.selectList);
    })
  }
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.nav
  padding: 39px 24px
  .text
    padding-bottom: 97px
    font-size: 30px
    color: #333
  .name
    height: 70px
    line-height: 70px
    border: 1px solid #999
    font-size: 28px
    padding: 0 20px
  .phone
    height: 70px
    line-height: 70px
    border: 1px solid #999
    font-size: 28px
    padding: 0 20px
    margin-top: 30px
  .identity
    height: 70px
    line-height: 70px
    border: 1px solid #999
    font-size: 28px
    padding: 0 20px
    margin-top: 30px
    .picker
      width: 100%
      height: 70px
      color: #888888
      line-height: 70px
  .referrer
    height: 70px
    line-height: 70px
    border: 1px solid #999
    font-size: 28px
    padding: 0 20px
    margin-top: 30px
  .btn
    display: inline-block
    position: fixed
    bottom: 80px
    left: 75px
    text-align: center
    line-height: 90px
    width: 600px
    height: 90px
    color: #fff
    background: #F67C2F
</style>
