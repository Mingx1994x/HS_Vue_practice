<script setup>
import { useToast } from '@/composable/useToast'

const props = defineProps({
  cartLists: {
    type: Object,
    required: true,
  },
})

const { cartLists } = props

const emits = defineEmits(['remove-cart'])
const notification = useToast()
const removeCart = (product, id) => {
  notification.confirmModal(product.title).then((result) => {
    if (result.isConfirmed) {
      emits('remove-cart', id)
      notification.successState(product.title, 'deleteCart')
    }
  })
}
</script>
<template>
  <ul class="mb-3">
    <li
      v-for="(product, key) in cartLists"
      :key="key"
      class="text-slate-900 bg-gray-200 rounded-2 px-4 py-2 flex justify-between"
    >
      <div class="flex flex-col">
        <p>{{ product.title }}</p>
        <p>數量：{{ product.qty }}</p>
      </div>
      <div class="flex items-center">
        <span class="me-2">${{ product.price }}</span>
        <button type="button" class="btn-sm btn-danger rounded" @click="removeCart(product, key)">
          移除
        </button>
      </div>
    </li>
  </ul>
</template>
