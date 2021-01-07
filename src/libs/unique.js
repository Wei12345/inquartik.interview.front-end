import { ORDER_LOCAL_STORAGE_KEY } from '@/constants/storage'

const orderData = JSON.parse(localStorage.getItem(ORDER_LOCAL_STORAGE_KEY)) || [];

const numberOrderIds = orderData.map(order => order.id)
const numberOrderNoteIds = orderData.map(order => order.notes.map(note => note.id)).flat();
const maxNumberId = Math.max(-1, ...numberOrderIds, ...numberOrderNoteIds);

let currentNumber = maxNumberId + 1;

export function uniqueNumber() {
  currentNumber += 1;
  return `${currentNumber}`;
}
