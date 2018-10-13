<template>
  <div class="component-wrapper">
    <div class="orderCard" v-for="(orderItem, orderItemIndex) in orderList" :key="orderItemIndex">
      <orderCard :orderItem="orderItem"></orderCard>
    </div>
  </div>
</template>

<script>
import orderCard from "@/components/s_orderCard"
export default {
  data() {
    return {
      orderList: []
    }
  },
  components: {
    orderCard
  },
  mounted() {
    if(this.$route.query.orderId) {
      this.orderId = this.$route.query.orderId
      this.$API.L_selectPingChildrenOrder({
        pingOrderId: this.orderId
      }).then(response => {
        this.orderList = response.data
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .component-wrapper
    padding: 20px 24px 0
    .orderCard
      width: 100%
      margin-bottom: 20px
</style>
