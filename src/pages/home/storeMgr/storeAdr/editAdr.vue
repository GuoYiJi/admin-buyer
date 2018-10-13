<template>
  <div class="home">
    <div class="content">
      <div class="form">
        <div class="line">
          <div class="box border">
            <p>联系人</p>
            <input v-model.lazy="name" name="userName"  placeholder="请输入您的名字"/>
          </div>
        </div>
        <div class="line">
          <div class="box border">
            <p>手机号码</p>
            <input v-model.lazy="phone" name="iphone" type="number" placeholder="请输入您的手机号码"/>
          </div>
        </div>
        <div class="line">
          <div class="box">
            <p>退货地址</p>
            <picker mode="region" @change="bindRegionChange" :value="region">
              <view class="picker">
                {{region.length > 0 ? region[0] + '-' + region[1] + '-' + region[2] : '请选择您的退货地址' }}
              </view>
            </picker>
            <i class="goback"></i>
          </div>
        </div>
        <div class="line">
          <div class="box no-border">
            <p>详细地址</p>
            <input v-model.lazy="adrDetail" name="adrDetail"  placeholder="请填写详细地址"/>
          </div>
        </div>
      </div>
      <i-message id="message" />
      <!-- <div class="form">
        <div class="line">
          <div class="box ">
            <div class="set_default">设为默认退货地址</div>
            <i-switch :value="switch1" @change="onChange" slot="footer"></i-switch>
          </div>
        </div>
      </div> -->

    </div>
    <div class="footer">
      <p @click="save"><btn :title="'保存'"/></p>
    </div>
  </div>
</template>
<script>
import wx from "wx";
import btn from "@/components/btn.vue";
// import { $getUrl } from "@/utils";
// import { mapState } from "vuex";
export default {
  components: {
    btn
  },
  data() {
    return {
      region: [],
      name: "",
      phone: "",
      adrDetail: "",
      switch1: 0,
      type: "add",
      addressId: "",
      editAdr: {}
    };
  },
  // computed: {
  //   ...mapState(["editAdr"])
  // },
  methods: {
    save() {
      const arr = [
        {
          name: this.name,
          errMsg: "名字"
        },
        {
          name: this.phone,
          plan: "phone"
        },
        {
          name: this.region[0],
          errMsg: "退货地址"
        },
        {
          name: this.adrDetail,
          errMsg: "详细地址"
        }
      ];
      const msg = this.$check.all(arr);
      if (msg) {
        this.handleError(msg);
        return;
      }
      // if (msg) {
      //   wx.showToast({
      //     title: msg
      //   });
      //   return;
      // }
      const params = {
        name: this.name,
        // isChoice: this.switch1,
        mobile: this.phone,
        address: this.adrDetail,
        value: this.region.join(","),
        addressId: this.addressId
      };

      this.$API.editAdr(params).then(response => {
        wx.showToast({
          title: '编辑成功'
        })
        this.$router.back(-1)
      })

      // this.handleError('添加成功','success')
      // this.$router.push("/" + $getUrl());
    },
    bindRegionChange(e) {
      this.region = e.mp.detail.value;
    },
    onChange({ mp: { detail } }) {
      this.switch1 = detail.value ? 1 : 0;
    },
    handleError(msg, type = "error") {
      this.$Message({
        content: msg,
        type: type
      });
    }
  },
  mounted() {
    console.log(JSON.parse(this.$route.query.addressInfo));
    if(this.$route.query.addressInfo) {
      this.editAdr = JSON.parse(this.$route.query.addressInfo)
    }
    if (this.editAdr) {
      const data = this.editAdr;
      this.addressId = data.id;
      this.name = data.name;
      // this.switch1 = data.isChoice;
      this.phone = data.mobile;
      this.adrDetail = data.address;
      this.region = data.value.split(",");
      // this.$store.commit("EDITADR", "");
    } else {
      this.addressId = "";
      this.name = "";
      this.switch1 = 0;
      this.phone = "";
      this.adrDetail = "";
      this.region = ["广东省", "广州市", "海珠区"];
    }
  },
};
</script>
<style lang="sass" scoped>
@import '~@/assets/css/mixin'
.set_default
  width: 100%
.goback
  +goback(2px)
  +center
  right: 24px
.footer
  position: absolute
  bottom: 80px
  left: 0
  right: 0
  p
    padding: 0 75px
.form
  background: #fff
  margin-bottom: 20px
.line
  padding: 0 24px
  .box
    display: flex
    padding: 33px 0
    text-align: left
    position: relative
    p
      width: 25%
      color: #000
    input
      width: 75%
.border
  +border(1px,bottom, #f5f5f5)

</style>
