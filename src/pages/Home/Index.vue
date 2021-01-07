<template>
  <OrderList class="order-list" v-model:orders="orders" @update:orders="updatedOrders"/>
</template>

<script>
import { ref } from 'vue'

import { ORDER_LOCAL_STORAGE_KEY } from '@/constants/storage'

import OrderList from './components/OrderList'

export default {
  name: 'HomePage',
  components: {
    OrderList
  },
  setup() {
    const orderData = JSON.parse(localStorage.getItem(ORDER_LOCAL_STORAGE_KEY)) || [];
    const orders = ref([...orderData]);

    const updatedOrders = () => {
      localStorage.setItem(ORDER_LOCAL_STORAGE_KEY, JSON.stringify(orders.value));
    }

    return {
      orders,
      updatedOrders
    }
  },
}
</script>

<style lang="scss" scoped>
  .order-list {
    margin: 0px auto;
  }
</style>
