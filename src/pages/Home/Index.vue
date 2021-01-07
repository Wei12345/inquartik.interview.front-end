<template>
  <OrderList class="order-list" v-model:orders="orders"/>
</template>

<script>
import { ref } from 'vue'

import { ORDER_LOCAL_STORAGE_KEY } from '@/constants/storage'
import { uniqueNumber } from '@/libs/unique';

import OrderList from './components/OrderList'

const INIT_ORDER_DATA = [
  {
    id: uniqueNumber(),
    name: 'a我是一張訂單',
    price: 100,
    notes: [
      { id: uniqueNumber(), isCompleted: false, text: '我是第一個筆記' },
      { id: uniqueNumber(), isCompleted: true, text: '我是第二個筆記' }
    ]
  },
  {
    id: uniqueNumber(),
    name: 'b我是一張訂單',
    price: 101,
    notes: [
      { id: uniqueNumber(), isCompleted: false, text: '我是第一個筆記' },
      { id: uniqueNumber(), isCompleted: true, text: '我是第二個筆記' }
    ]
  }
]

export default {
  name: 'HomePage',
  components: {
    OrderList
  },
  setup() {
    const orderData = JSON.parse(localStorage.getItem(ORDER_LOCAL_STORAGE_KEY)) || INIT_ORDER_DATA;
    const orders = ref([...orderData]);

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
