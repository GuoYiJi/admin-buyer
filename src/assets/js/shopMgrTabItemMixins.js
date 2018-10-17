import EventBus from '@/assets/js/EventBus';
export default {
  mounted() {
    EventBus.$on('onReachBottom', () => {
      this.lower();
    })
    EventBus.$on('onPullDownRefresh', () => {
      console.log(1)
    })
  },
  onShow() {
    if (wx.getStorageSync('is-update-goods')) {
      this.canLoad = true;
      this.shopNum = 0;
      this.shopList = [];
      this.lower();
    }
  },
  destroyed() {
    EventBus.$off('onReachBottom');
    EventBus.$off('onPullDownRefresh');
  }
}