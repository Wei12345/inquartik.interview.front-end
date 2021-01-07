<template>
  <form @submit="sendForm">
    <div>
      <label>
        name:
        <input type="text" v-model="form.name"/>
      </label>
    </div>
    <div>
      <label>
        price:
        <input type="number" v-model.number="form.price"/>
      </label>
    </div>
    <div>
      <label>
        note(換行創建多選項):
        <textarea rows="5" v-model="form.note"/>
      </label>
    </div>
    <button type="submit">submit</button>
  </form>
</template>

<script>
import { reactive } from 'vue'

import router from '@/router/index'
import { uniqueNumber } from '@/libs/unique';
import { ORDER_LOCAL_STORAGE_KEY } from '@/constants/storage'

const INIT_FORM = {
  name: '',
  price: 0,
  note: ''
}

export default {
  name: 'AddPage',
  setup() {
    let form = reactive({...INIT_FORM});

    const sendForm = () => {
      const savedForm = {
        id: uniqueNumber(),
        name: form.name,
        price: form.price,
        notes: form.note
          .split('\n')
          .map(noteText => ({
            id: uniqueNumber(),
            isCompleted: false,
            text: noteText,
          }))
      }

      const orderData = JSON.parse(localStorage.getItem(ORDER_LOCAL_STORAGE_KEY)) || [];
      orderData.push(savedForm);

      localStorage.setItem(ORDER_LOCAL_STORAGE_KEY, JSON.stringify(orderData));
      router.push('/');
      return false;
    }

    return {
      form,
      sendForm
    }
  },
}
</script>
