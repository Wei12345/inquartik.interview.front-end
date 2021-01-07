<template>
  <tr>
    <th>
      <template v-if="isEdit"><input type="text" v-model="editForm.name" /></template>
      <template v-else>{{ order.name }}</template>
    </th>
    <th>
      <template v-if="isEdit"><input type="number" v-model.number="editForm.price" /></template>
      <template v-else>{{ order.price }}</template>
    </th>
    <th>
      <template v-if="isEdit"><textarea rows="5" placeholder="換行創建多選項" v-model="editForm.note"/></template>
      <template v-else>
        <ul>
          <li v-for="(note) in order.notes" :key="note.id">
            <label>
              <input type="checkbox" :checked="note.isCompleted" @change="noteIsCompletedChange({ orderId: order.id, noteId: note.id } , $event)"/>
              {{ note.text }}
            </label>
            
          </li>
        </ul>
      </template>
      
    </th>
    <th>
      <template v-if="isEdit">
        <button type="button" @click="orderConfirmEdit">confirm</button>
        <button type="button" @click="orderCancelEdit">cancel</button>
      </template>
      <template v-else>
        <button type="button" @click="orderEdit">edit</button>
      </template>
    </th>
    <th>
      <button type="button" @click="orderDelete(order.id)">delete</button>
    </th>
  </tr>
</template>

<script>
import { watch, computed, reactive, ref } from 'vue'

import { uniqueNumber } from '@/libs/unique';

export default {
  name: 'OrderItem',
  props: ['order'],
  emits: ['noteIsCompletedChange', 'orderEdit', 'orderDelete'],
  setup(props, { emit }) {
    const noteIsCompletedChange = (params, event) => {
      emit('noteIsCompletedChange', params, event.target.checked)
    }

    const isEdit = ref(false);
    const initForm = computed(() => ({
      name: props.order.name,
      price: props.order.price,
      note: props.order.notes.map(note => note.text).join('\n'),
    }))
    let editForm = reactive({...initForm.value})
    const orderEdit = () => {
      isEdit.value = true;
    }
    watch(initForm, (form) => {
      editForm.name = form.name;
      editForm.price = form.price;
      editForm.note = form.note;
    })
    const orderConfirmEdit = () => {
      isEdit.value = false;
      emit('orderEdit', {
        id: props.order.id,
        name: editForm.name,
        price: editForm.price,
        notes: editForm.note
          .split('\n')
          .map(noteText => ({
            id: uniqueNumber(),
            isCompleted: false,
            text: noteText,
          }))
      });
    }
    const orderCancelEdit = () => {
      isEdit.value = false;
    }

    const orderDelete = (orderId) => {
      emit('orderDelete', orderId);
    }

    return {
      noteIsCompletedChange,
      editForm,
      isEdit,
      orderEdit,
      orderConfirmEdit,
      orderCancelEdit,
      orderDelete
    }
  }
}
</script>
