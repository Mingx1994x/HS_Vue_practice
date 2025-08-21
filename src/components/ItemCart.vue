<script setup>
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useToast } from '@/composable/useToast'

const notification = useToast()

const cart = useCartStore()
const { cartItems } = storeToRefs(cart)
const { isRemoveIdExist, removeCartById } = cart

const removeCart = (id, title) => {
  notification.confirmModal(title).then((result) => {
    if (result.isConfirmed) {
      if (!isRemoveIdExist(id)) {
        notification.errorState('deleteCart')
        return
      }
      // 刪除購物車
      removeCartById(id)
      notification.successState(title, 'deleteCart')
    }
  })
}
</script>
<template>
  <ul class="mb-3">
    <li
      v-for="(product, key) in cartItems"
      :key="key"
      class="text-slate-900 bg-gray-200 rounded-2 px-4 py-2 flex justify-between"
    >
      <div class="flex flex-col">
        <p>{{ product.title }}</p>
        <p>數量：{{ product.qty }}</p>
      </div>
      <div class="flex items-center">
        <span class="me-2">${{ product.price }}</span>
        <button
          type="button"
          class="btn-sm btn-danger rounded"
          @click="removeCart(key, product.title)"
        >
          移除
        </button>
      </div>
    </li>
  </ul>
</template>
