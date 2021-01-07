<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Note</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(order, orderIndex) in orders" :key="order.id">
        <th>{{ order.name }}</th>
        <th>{{ order.price }}</th>
        <th>
          <ul>
            <li v-for="(note, noteIndex) in order.notes" :key="note.id">
              <input type="checkbox" :checked="note.isCompleted" @change="noteIsCompletedChange({ orderIndex, noteIndex } , $event)"/>
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
import { toRef } from 'vue';

export default {
  name: 'OrderList',
  props: ['orders'],
  emits: ['update:orders'],
  setup(props, { emit }) {
    const noteIsCompletedChange = ({ orderIndex, noteIndex }, event) => {
      const newOrders = toRef(props, 'orders')
      newOrders.value[orderIndex].notes[noteIndex].isCompleted = event.target.checked;
      emit('update:orders', newOrders.value)
    }
  
    return { 
      noteIsCompletedChange
    }
  }
}
</script>
