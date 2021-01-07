<template>
  <OrderList class="order-list" v-model:orders="orders"/>
</template>

<script>
import { ref } from 'vue'

import { uniqueNumber } from '@/libs/unique';

import OrderList from './components/OrderList'

export default {
  name: 'HomePage',
  components: {
    OrderList
  },
  setup() {
    const orders = ref([
      {
        id: uniqueNumber(),
        name: '我是一張訂單',
        price: 100,
        notes: [
          { id: uniqueNumber(), isCompleted: false, text: '我是第一個筆記' },
          { id: uniqueNumber(), isCompleted: true, text: '我是第二個筆記' }
        ]
      }
    ]);

    return {
      orders
    }
  },
}
</script>

<style lang="scss" scoped>
  .order-list {
    margin: 0px auto;
  }
</style>
