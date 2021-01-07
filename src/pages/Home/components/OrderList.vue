<template>
  <table class="table-list">
    <thead>
      <tr>
        <th>
          <div class="list-th-content">Name <SortTool :sortKey="SortKey.NAME" v-model:sort="sort" /></div>
        </th>
        <th><div class="list-th-content">Price <SortTool :sortKey="SortKey.PRICE" v-model:sort="sort" /></div></th>
        <th>Note</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <OrderItem
        v-for="order in sortedOrderes"
        :key="order.id"
        :order="order"
        @noteIsCompletedChange="noteIsCompletedChange"
        @orderEdit="orderEdit"
        @orderDelete="orderDelete"/>
    </tbody>
  </table>
</template>

<script>
import { toRef, ref, computed } from 'vue';

import SortTool, { Sort } from '@/components/SortTool';
import OrderItem from './OrderItem'

export default {
  name: 'OrderList',
  components: { SortTool, OrderItem },
  props: ['orders'],
  emits: ['update:orders'],
  setup(props, { emit }) {
    const SortKey = {
      NAME: 'name',
      PRICE: 'price'
    }
    const sort = ref({
      key: SortKey.NAME,
      value: Sort.DESC
    });

    const sortedOrderes = computed(() => {
      const newOrders = toRef(props, 'orders');
      if (sort.value.key === SortKey.NAME) {
        newOrders.value.sort((a, b) => sort.value.value === Sort.ASC ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        return newOrders.value
      }
      
      newOrders.value.sort((a, b) => sort.value.value === Sort.ASC ? a.price - b.price : b.price - a.price);
      return newOrders.value
    });

    const noteIsCompletedChange = ({ orderId, noteId }, value) => {
      const newOrders = toRef(props, 'orders')
      const orderIndex = newOrders.value.findIndex(order => order.id === orderId);
      const noteIndex = newOrders.value[orderIndex].notes.findIndex(note => note.id === noteId);
      newOrders.value[orderIndex].notes[noteIndex].isCompleted = value;
      emit('update:orders', newOrders.value);
    }

    const orderEdit = (newOrder) => {
      const newOrders = toRef(props, 'orders')
      const orderIndex = newOrders.value.findIndex(order => order.id === newOrder.id);
      newOrders.value.splice(orderIndex, 1, newOrder);
      emit('update:orders', newOrders.value);
    }

    const orderDelete = (orderId) => {
      const newOrders = toRef(props, 'orders')
      const orderIndex = newOrders.value.findIndex(order => order.id === orderId);
      newOrders.value.splice(orderIndex, 1);
      emit('update:orders', newOrders.value);
    }

    return {
      SortKey,
      sort,
      sortedOrderes,
      orderEdit,
      orderDelete,
      noteIsCompletedChange
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-list {
    .list-th-content {
      display: flex;
      align-items: center;
    }
  }
</style>
