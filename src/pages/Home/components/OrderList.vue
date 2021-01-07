<template>
  <table class="table-list">
    <thead>
      <tr>
        <th>
          <div class="list-th-content">Name <SortTool :sortKey="SortKey.NAME" v-model:sort="sort" /></div>
        </th>
        <th><div class="list-th-content">Price <SortTool :sortKey="SortKey.PRICE" v-model:sort="sort" /></div></th>
        <th>Note</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order) in sortedOrderes" :key="order.id">
        <th>{{ order.name }}</th>
        <th>{{ order.price }}</th>
        <th>
          <ul>
            <li v-for="(note) in order.notes" :key="note.id">
              <input type="checkbox" :checked="note.isCompleted" @change="noteIsCompletedChange({ orderId: order.id, noteId: note.id } , $event)"/>
              {{ note.isCompleted }}
              {{ note.text }}
            </li>
          </ul>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { toRef, ref, computed } from 'vue';

import SortTool, { Sort } from '@/components/SortTool';

export default {
  name: 'OrderList',
  components: { SortTool },
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

    const noteIsCompletedChange = ({ orderId, noteId }, event) => {
      const newOrders = toRef(props, 'orders')
      const orderIndex = newOrders.value.findIndex(order => order.id === orderId);
      const noteIndex = newOrders.value[orderIndex].notes.findIndex(note => note.id === noteId);
      newOrders.value[orderIndex].notes[noteIndex].isCompleted = event.target.checked;
      emit('update:orders', newOrders.value)
    }

    return {
      SortKey,
      sort,
      sortedOrderes,
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
