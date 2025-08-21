import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore('Cart Store', () => {
  // data
  const cartItems = ref({})
  // computed
  const isCartEmpty = computed(() => (Object.keys(cartItems.value).length === 0))
  const totalPrice = computed(() =>
    Object.values(cartItems.value).reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  // methods
  const findCartId = (id) => {
    const cartId = Object.keys(cartItems.value).filter(item => (cartItems.value[item].id === id))

    if (cartId.length === 0) {
      return "newItem"
    }

    return cartId[0]
  }

  const isRemoveIdExist = (id) => {
    const removeId = Object.keys(cartItems.value).filter(item => (item === id))

    return removeId.length !== 0
  }

  const removeCartById = (id) => {
    delete cartItems.value[id]
  }

  return { cartItems, isCartEmpty, totalPrice, findCartId, isRemoveIdExist, removeCartById }
}) 