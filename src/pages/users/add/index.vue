<style lang="scss" scoped>
  .navbar-b {
    margin-top: 20px;
  }
</style>
<template>
  <div>
    <div class="van-cell-group van-hairline--top-bottom">
      <div class="van-cell van-cell--required van-field">
        <div class="van-cell__title">
          <span>手机号码</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <input v-model="mobile" class="van-field__control" type="number" placeholder="输入手机号码" />
          </div>
        </div>
      </div>
    </div>
    <div class="navbar-b" @click="onSubmit">
      <div class="van-button van-button--warning van-button--normal van-button--bottom-action">
        <span class="van-button__text">确认添加</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mobile: ''
      }
    },
    methods: {
      async onSubmit() {
        const { code, desc } = await this.$API.addPrivilege({
          mobile: this.mobile
        })
        if (code === 1) {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 1500
          })
          setTimeout(() => {
            this.$router.back();
          }, 1500);
        } else {
          wx.showToast({
            title: desc,
            icon: 'none',
            duration: 1500
          })
        }
      }
    },
    onUnload() {
      Object.assign(this, this.$options.data());
    }
  }
</script>